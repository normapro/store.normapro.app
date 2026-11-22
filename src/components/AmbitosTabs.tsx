"use client";

import { useEffect, useRef, useState } from "react";
import API_ENDPOINTS from "@/config/api";
import { Ambito } from "@/types/ambito";
import { Solucion } from "@/types/solucion";
import { ItemListPack } from "@/types/pack";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library, IconPrefix, IconName, IconProp } from "@fortawesome/fontawesome-svg-core";
import { fas, faChevronLeft, faChevronRight, faChevronDown, faUserTie } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { agruparSoluciones } from "@/libs/soluciones";
import { AnimatePresence, motion } from "framer-motion";

// Agregamos los iconos a la librería
library.add(fas, faChevronLeft, faChevronRight);

interface Props {
	sectorSlug?: string | undefined | null;
	ambitoSlug: string | null;
  }
  

const AmbitosTabs = ({ sectorSlug, ambitoSlug }: Props) => {
	const [ambitos, setAmbitos] = useState<Ambito[]>([]);
	const [soluciones, setSoluciones] = useState<Solucion[]>([]);
	const [packs, setPacks] = useState<ItemListPack[]>([]);
	const [selectedSlug, setSelectedSlug] = useState<string>("all");
	const [isLoading, setIsLoading] = useState(true);
	const [menuMas, setMenuMas] = useState(false);
	const menuMasRef = useRef<HTMLDivElement>(null);

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
				const slugToSelect = foundAmbito ? foundAmbito.slug : "all";

				setSelectedSlug(slugToSelect);
				fetchSoluciones(slugToSelect, sectorSlug);
				fetchPacks(slugToSelect, sectorSlug);
				/*
				setSelectedSlug(foundAmbito ? foundAmbito.slug : "all");
				if (data.length > 0) {
					fetchSoluciones(data[0]?.slug, sectorSlug);
				}
				*/
			} catch (error) {
				console.error(error);
				setIsLoading(false);
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
				? `${API_ENDPOINTS.LISTPACKS}?ambito=${ambitoSlug}&sector=${sectorSlug}&maxItems=500`
				: `${API_ENDPOINTS.LISTPACKS}?ambito=${ambitoSlug}&maxItems=500`;

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


	// Cierra el menú «Más ámbitos» al pulsar fuera o con Escape
	useEffect(() => {
		if (!menuMas) return;
		const alPulsar = (e: MouseEvent) => {
			if (menuMasRef.current && !menuMasRef.current.contains(e.target as Node)) setMenuMas(false);
		};
		const alTeclear = (e: KeyboardEvent) => {
			if (e.key === "Escape") setMenuMas(false);
		};
		document.addEventListener("mousedown", alPulsar);
		document.addEventListener("keydown", alTeclear);
		return () => {
			document.removeEventListener("mousedown", alPulsar);
			document.removeEventListener("keydown", alTeclear);
		};
	}, [menuMas]);

	// Prepara el enlace para las soluciones: cada una con su propio ámbito
	let slugSector: string = "";
	if (sectorSlug && sectorSlug !== "non-specified") {
		slugSector = `/sector/${sectorSlug}`;
	}

	const { carpetas, sueltas } = agruparSoluciones(soluciones);

	// Barra de ámbitos: 5 a la vista (el activo sustituye al quinto si no está) y el resto en «Más ámbitos». En móvil la fila se desliza de lado
	const ambitoActivo = ambitos.find((ambito) => ambito.slug === selectedSlug);
	const visibles = ambitos.slice(0, 5);
	if (ambitoActivo && !visibles.includes(ambitoActivo)) visibles[visibles.length - 1] = ambitoActivo;
	const resto = ambitos.filter((ambito) => !visibles.includes(ambito));

	const pestana = (ambito: Ambito) => (
		<div key={ambito.id_ambito} className="flex flex-col items-center shrink-0">
			<button
				onClick={() => changeParams(ambito.slug)}
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
	);

	const filaSolucion = (sol: Solucion) => {
		const iconParts = sol.uriIcon.split(" ");
		const icon: IconProp = iconParts.length === 2 ? (iconParts as [IconPrefix, IconName]) : (["fas", "fa-question"] as unknown as [IconPrefix, IconName]);
		return (
			<Link key={sol.id_solucion} href={`/soluciones/${sol.slug_ambito ?? ambitoSlug ?? "all"}${slugSector}/${sol.slug}`} rel="noopener noreferrer">
				<div className="py-2 px-3 bg-white shadow rounded-lg flex items-center mb-2">
					<FontAwesomeIcon icon={icon} className="w-6 h-6 text-[#010D3D] mr-4" />
					<div>
						<h3 className="font-bold text-[#010D3D]">{sol.description}</h3>
						<small>{sol.subtitle}</small>
					</div>
				</div>
			</Link>
		);
	};

	return (
		<div className="w-full">
			<div className="max-w-7xl mx-auto px-6">
				{/* Barra de ámbitos en una fila, sin desplazamiento: lo que no cabe va a «Más ámbitos» */}
				<div ref={menuMasRef} className="relative">
					<div className="flex w-full overflow-x-auto lg:overflow-visible" style={{ scrollbarWidth: "none" }}>
						{visibles.map(pestana)}
						{resto.length > 0 && (
							<div className="flex flex-col items-center shrink-0">
								<button
									type="button"
									aria-expanded={menuMas}
									onClick={() => setMenuMas(!menuMas)}
									className="px-4 py-3 font-bold text-[14px] rounded-t-lg whitespace-nowrap transition bg-white text-[#010D3D] hover:bg-[#f2f2f5]"
								>
									Más ámbitos ({resto.length})
									<FontAwesomeIcon icon={faChevronDown} className={`ml-2 w-3 h-3 transition ${menuMas ? "rotate-180" : ""}`} />
								</button>
								<div className="h-[3px] w-full bg-[#f2f2f5]"></div>
							</div>
						)}
					</div>
					{menuMas && (
						<div className="absolute right-0 top-full z-20 mt-1 w-full max-w-[360px] bg-white rounded-lg shadow-lg py-2">
							{resto.map((ambito) => (
								<button
									key={ambito.id_ambito}
									type="button"
									onClick={() => {
										setMenuMas(false);
										changeParams(ambito.slug);
									}}
									className="w-full flex justify-between items-center gap-4 px-4 py-2 text-left font-bold text-[14px] text-[#010D3D] hover:bg-[#f2f2f5]"
								>
									{ambito.description}
									<span className="text-[12px] text-[#7F859D] opacity-50">{ambito.total_soluciones}</span>
								</button>
							))}
						</div>
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
						<div className="grid grid-cols-1 md:grid-cols-2 md:gap-10">
							<div className="mt-8">
								<h3 className="mb-4 text-[#7F859D] font-semibold">Packs</h3>
								{packs.map((pack) => {
									return (
										<Link key={pack.id_pack} href={`/soluciones/${pack.slug_ambito ?? ambitoSlug ?? "all"}/packs/${pack.slug}`} rel="noopener noreferrer">
											<div className="py-2 px-3 bg-[#e4f6fc] shadow rounded-lg mb-2 cursor-pointer min-h-[200px] px-7 ">
												<div className="grid grid-cols-12">
													<div className="col-span-8 mt-7">
														<h3 className="font-bold text-[16px] text-[#010D3D] overflow-hidden text-ellipsis">{pack.description}</h3>
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
							<div className="mt-8">
								<h3 className="mb-4 text-[#7F859D] font-semibold">Soluciones <span className="font-normal">({soluciones.length})</span></h3>
								<div className="md:max-h-[520px] md:overflow-y-auto md:pr-2">
									{carpetas.map((carpeta, index) => (
										<details key={carpeta.titulo} open={index === 0} className="mb-2 group">
											<summary className="flex justify-between items-center cursor-pointer list-none py-2 px-3 font-bold text-[#010D3D]">
												<span><FontAwesomeIcon icon={carpeta.icono} className="mr-3 text-[#00aae0]" />{carpeta.titulo} <span className="ml-2 text-[12px] text-[#7F859D]">{carpeta.soluciones.length}</span></span>
												<FontAwesomeIcon icon={faChevronDown} className="ml-4 transform group-open:rotate-180 transition" />
											</summary>
											<div className="ml-[22px] pl-3 border-l-2 border-[#bfe8f6]">{carpeta.soluciones.map(filaSolucion)}</div>
										</details>
									))}
									{sueltas.map(filaSolucion)}
								</div>
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
