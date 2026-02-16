"use client";

import { useEffect, useRef, useState } from "react";
import API_ENDPOINTS from "@/config/api";
import { Ambito } from "@/types/ambito";
import { Solucion } from "@/types/solucion";
import { ItemListPack } from "@/types/pack";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library, IconPrefix, IconName, IconProp } from "@fortawesome/fontawesome-svg-core";
import { fas, faChevronLeft, faChevronRight, faUserTie } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";

// Agregamos los iconos a la librería
library.add(fas, faChevronLeft, faChevronRight);

interface Props {
	sectorSlug?: string | undefined | null;
	ambitoSlug: string;
  }
  

const AmbitosTabs = ({ sectorSlug, ambitoSlug }: Props) => {
	const [ambitos, setAmbitos] = useState<Ambito[]>([]);
	const [soluciones, setSoluciones] = useState<Solucion[]>([]);
	const [packs, setPacks] = useState<ItemListPack[]>([]);
	const [selectedSlug, setSelectedSlug] = useState<string>("all");
	const [isLoading, setIsLoading] = useState(false);
	const containerRef = useRef<HTMLDivElement>(null);
	const [canScrollLeft, setCanScrollLeft] = useState(false);
	const [canScrollRight, setCanScrollRight] = useState(false);

	useEffect(() => {
		const fetchAmbitos = async () => {
			try {
				let params = "";
				if (sectorSlug && sectorSlug !== "non-specified") {
					params = `?sector=${sectorSlug}`;
				} 
				const response = await fetch(API_ENDPOINTS.AMBITOS_SOLUCIONES+params);
				if (!response.ok) throw new Error("Error al obtener los ámbitos");
				const data = await response.json();
				setAmbitos(data);
				const foundAmbito = data.find((a: Ambito) => a.slug === ambitoSlug);
				/*
				setSelectedSlug(foundAmbito ? foundAmbito.slug : "all");
				if (data.length > 0) {
					fetchSoluciones(data[0]?.slug, sectorSlug);
				}
				*/
				changeParams(foundAmbito ? foundAmbito.slug : "all");
				// 🔥 Forzar revisión de scroll después de cargar datos
				setTimeout(checkScroll, 300);
			} catch (error) {
				console.error(error);
			}
		};

		fetchAmbitos();
	}, []);

	const changeParams = (ambitoSlug: string) => {
		if (ambitoSlug === selectedSlug) return;

		setSelectedSlug(ambitoSlug);
		fetchSoluciones(ambitoSlug, sectorSlug);
		fetchPacks(ambitoSlug, sectorSlug);
		//podemos cambiar la URL para que el ambito seleccionado se refleje en la URL
		if (sectorSlug) window.history.pushState(null, "", `/soluciones/${ambitoSlug}/sector/${sectorSlug}`);
		else window.history.pushState(null, "", `/soluciones/${ambitoSlug}`);

	};

	const fetchSoluciones = async (ambitoSlug: string = "all", sectorSlug: string | undefined | null = "non-specified") => {
		setIsLoading(true);
		try {
			const url = sectorSlug
				? `${API_ENDPOINTS.LISTSOLUCIONES}?ambito=${ambitoSlug}&sector=${sectorSlug}`
				: `${API_ENDPOINTS.LISTSOLUCIONES}?ambito=${ambitoSlug}`;

			const response = await fetch(url);
			if (!response.ok) throw new Error("Error al obtener soluciones");
			const data = await response.json();
			setSoluciones(data);
		} catch (error) {
			console.error(error);
			setSoluciones([]);
		} finally {
			setIsLoading(false);
		}
	};

	const fetchPacks = async (ambitoSlug: string = "all", sectorSlug: string | undefined | null = "non-specified") => {
		setIsLoading(true);
		try {
			const url = sectorSlug
				? `${API_ENDPOINTS.LISTPACKS}?ambito=${ambitoSlug}&sector=${sectorSlug}`
				: `${API_ENDPOINTS.LISTPACKS}?ambito=${ambitoSlug}`;

			const response = await fetch(url);
			if (!response.ok) throw new Error("Error al obtener soluciones");
			const data = await response.json();
			setPacks(data);
		} catch (error) {
			console.error(error);
			setPacks([]);
		} finally {
			setIsLoading(false);
		}
	};


	// Función para mover el scroll horizontalmente
	const scroll = (direction: "left" | "right") => {
		if (containerRef.current) {
			const scrollAmount = 200;
			containerRef.current.scrollBy({
				left: direction === "left" ? -scrollAmount : scrollAmount,
				behavior: "smooth",
			});
			setTimeout(checkScroll, 300); // 🔥 Verificar después de hacer scroll
		}
	};

	// Verifica si se puede hacer scroll en cada dirección
	const checkScroll = () => {
		if (containerRef.current) {
			const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
			setCanScrollLeft(scrollLeft > 0);
			setCanScrollRight(scrollLeft < scrollWidth - clientWidth);
		}
	};

	useEffect(() => {
		checkScroll();
		if (containerRef.current) {
			containerRef.current.addEventListener("scroll", checkScroll);
		}
		return () => {
			if (containerRef.current) {
				containerRef.current.removeEventListener("scroll", checkScroll);
			}
		};
	}, [ambitos]); // 🔥 Se ejecuta cada vez que cambian los ámbitos

	return (
		<div className="w-full">
			<div className="max-w-7xl mx-auto px-6">
				{/* Contenedor de la TAB con los botones de desplazamiento */}
				<div className="relative w-full flex items-center">
					{/* Botón Izquierdo */}
					{canScrollLeft && (
						<button
							onClick={() => scroll("left")}

							className="absolute left-0 z-10 bg-white shadow-lg p-3 rounded-full transform -translate-y-1/2 top-1/2"
						>
							<FontAwesomeIcon icon={faChevronLeft} className="text-gray-600 w-5 h-5" />
						</button>
					)}

					{/* Tabs con scroll horizontal */}
					<div
						ref={containerRef}
						className="overflow-x-auto flex w-full scrollbar-hide"
						style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
					>
						{ambitos
							//.filter((ambito) => (ambito.total_soluciones && ambito.total_soluciones > 0))
							.map((ambito) => (
								<div key={ambito.id_ambito} className="flex flex-col items-center">
									<button
										onClick={() => {
											changeParams(ambito.slug);
											/*
											setSelectedSlug(ambito.slug);
											fetchSoluciones(ambito.slug, sectorSlug);
											fetchPacks(ambito.slug, sectorSlug);
											*/
										}}
										className={`px-4 py-3 font-bold text-[14px] rounded-t-lg whitespace-nowrap transition ${selectedSlug === ambito.slug ? "bg-[#f2f2f5] text-[#010D3D]" : "bg-white text-[#010D3D] hover:bg-[#f2f2f5]"
											}`}
									>
										{ambito.description} <span className="text-[12px] text-[#7F859D] opacity-50 ml-[8px]">{ambito.total_soluciones}</span>
									</button>
									<div
										className={`h-[3px] w-full  ${selectedSlug === ambito.slug ? "bg-[#010D3D]" : "bg-[#f2f2f5]"
											}`}
									></div>
								</div>
							))}
					</div>

					{/* Botón Derecho */}
					{canScrollRight && (
						<button
							onClick={() => scroll("right")}
							className="absolute right-0 z-10 bg-white shadow-lg p-3 rounded-full transform -translate-y-1/2 top-1/2"
						>
							<FontAwesomeIcon icon={faChevronRight} className="text-gray-600 w-5 h-5" />
						</button>
					)}
				</div>
			</div>

			{/* 🔥 Lista de Soluciones debajo de la TAB */}
			
			<div className="bg-[#f2f2f5]">
				<div className="max-w-7xl mx-auto px-6 min-h-[800px]">
					{isLoading ? (						
						<p className="text-center text-gray-500">Cargando soluciones...</p>
					) : soluciones.length > 0 ? (
						<AnimatePresence>
							<motion.div
							initial={{ opacity: 0, y: -10 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -10 }}
							>
						<div className="grid grid-cols-21 gap-10">
							<div className="col-span-11 mt-8">
								<h3 className="mb-4 text-[#7F859D] font-semibold">Soluciones</h3>

								{soluciones.map((sol) => {
									const iconParts = sol.uriIcon.split(" ");
									const icon: IconProp = iconParts.length === 2 ? (iconParts as [IconPrefix, IconName]) : ["fas", "fa-question"];
									return (
										<Link key={sol.id_solucion} href={`/soluciones/${ambitoSlug}/${sol.slug}`} rel="noopener noreferrer">
											<div className="py-2 px-3 bg-white shadow rounded-lg flex items-center mb-2">
												<FontAwesomeIcon icon={icon} className="w-6 h-6 text-[#010D3D] mr-4" />
												<div>
													<h3 className="font-bold">{sol.description}</h3>
													<small>{sol.subtitle}</small>
												</div>
											</div>
										</Link>
									);
								})}
							</div>
							<div className="col-span-10 mt-8">
								<h3 className="mb-4 text-[#7F859D] font-semibold">Packs</h3>
								{packs.map((pack) => {
									return (
										<Link key={pack.id_pack} href={`/soluciones/${ambitoSlug}/packs/${pack.slug}`} rel="noopener noreferrer">
											<div className="py-2 px-3 bg-[#e4f6fc] shadow rounded-lg mb-2 cursor-pointer h-[200px] px-7 ">
												<div className="grid grid-cols-12">
													<div className="col-span-8 mt-7">
														<h3 className="font-bold text-[16px] overflow-hidden text-ellipsis">{pack.description}</h3>
														<p className="text-[#7F859D] text-[15px] mt-7 overflow-hidden text-ellipsis">{pack.shortDescription}</p>
													</div>
													<div className="col-span-4 flex justify-end">
														<div className="relative w-[135px] flex items-center justify-center max-h-[135px]">
															{/* Imagen de fondo */}
															<img src="/aura@2x.png" alt="Fondo" className="absolute w-full h-full object-cover" />

															{/* Icono de la solución encima */}
															<img
																src={"/" + pack.uriIcon}
																alt={pack.description}
																className="object-contain relative z-10"
															/>
														</div>
													</div>
												</div>
												<div className="mt-3 h-[2px] bg-[#d7e1e9]"></div>
												<div className="mt-4 grid grid-cols-2">													
													<div className="col-span-1  ">
														<span className="ml-2 text-gray-500 text-sm">  
														<FontAwesomeIcon icon={faUserTie} className="mr-2 text-[20px] text-[#010D3D] opacity-100" />  
															Incluye consultoría
														</span>
													</div>
													<div className="col-span-1 flex justify-end pr-4">
														<p className="text-[15px] underline font-extrabold text-[#00aae0]">Saber más</p>
													</div>
												</div>
											</div>											
										</Link>
									);
								}
								)}
							</div>
						</div>
						</motion.div>
						</AnimatePresence>
					) : (
						<p className="text-center text-gray-500 mt-10">No hay soluciones disponibles.</p>
					)}
				</div>
			</div>
			
		</div>
	);
};

export default AmbitosTabs;
