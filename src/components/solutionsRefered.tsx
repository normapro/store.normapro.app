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

// Agregamos los iconos a la librería
library.add(fas, faChevronLeft, faChevronRight);

interface Props {
	sectorSlug?: string | undefined | null;
	ambitoSlug: string | undefined | null;
  }
  

const SolutionsRefered = ({ sectorSlug, ambitoSlug }: Props) => {
	const [ambitos, setAmbitos] = useState<Ambito[]>([]);
	const [soluciones, setSoluciones] = useState<Solucion[]>([]);
	const [packs, setPacks] = useState<ItemListPack[]>([]);
	const [selectedSlug, setSelectedSlug] = useState<string>("all");
	const [isLoading, setIsLoading] = useState(false);
	const containerRef = useRef<HTMLDivElement>(null);

    

	const fetchSoluciones = async (ambitoSlug: string  | undefined | null= "all", sectorSlug: string | undefined | null = "non-specified") => {
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

	const fetchPacks = async (ambitoSlug: string | undefined | null = "all", sectorSlug: string | undefined | null = "non-specified") => {
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

    useEffect(() => {
        fetchSoluciones(ambitoSlug, sectorSlug);
        fetchPacks(ambitoSlug, sectorSlug);
    }, [ambitoSlug, sectorSlug]);
	return (
		<div className="w-full">
			{/* 🔥 Lista de Soluciones debajo de la TAB */}
			<div className="bg-[#f2f2f5]">
				<div className="max-w-7xl mx-auto px-6 min-h-[200px]">
					{isLoading ? (						
						<p className="text-center text-gray-500">Cargando soluciones...</p>
					) : soluciones.length > 0 ? (
						<div className="grid grid-cols-21 gap-10">
							<div className="col-span-11 mt-8">
								<h3 className="mb-4 text-[#7F859D] font-semibold">Otras soluciones que podrían interesarte</h3>

								{soluciones.map((sol) => {
									const iconParts = sol.uriIcon.split(" ") as [IconPrefix, IconName];
									const icon: IconProp | [IconPrefix, IconName] = iconParts.length === 2 ? (iconParts as [IconPrefix, IconName]) : ["fas", "fa-question"];
									return (
										<Link key={sol.id_solucion} href={`/solucion/${sol.slug}`} rel="noopener noreferrer">
											<div className="py-2 px-3 bg-white shadow rounded-lg flex items-center mb-2">
												<FontAwesomeIcon icon={icon} className="w-6 h-6 text-[#010D3D] mr-4" />
												<div>
													<h3 className="font-bold">{sol.description}</h3>
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
										<Link key={pack.id_pack} href={`/pack/${pack.slug}`} rel="noopener noreferrer">
											<div className="py-2 px-3 bg-[#e4f6fc] shadow rounded-lg mb-2 cursor-pointer h-[200px] px-7 ">
												<div className="grid grid-cols-12">
													<div className="col-span-8 mt-7">
														<h3 className="font-bold text-[16px] overflow-hidden text-ellipsis">{pack.description}</h3>
														<p className="text-[#7F859D] text-[15px] mt-7 overflow-hidden text-ellipsis">{pack.shortDescription}</p>
													</div>
													<div className="col-span-4 flex justify-end">
														<div className="relative w-[135px] flex items-center justify-center">
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
					) : (
						<p className="text-center text-gray-500 mt-10">No hay soluciones disponibles.</p>
					)}
				</div>
			</div>
		</div>
	);
};

export default SolutionsRefered;
