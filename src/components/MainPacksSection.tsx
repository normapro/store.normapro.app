"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ItemListPack } from "@/types/pack";
import API_ENDPOINTS from "@/config/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLaptop, faPlusLarge, faUserTie } from "@fortawesome/pro-duotone-svg-icons";

const MainPacksSection = () => {
    const [packs, setPacks] = useState<ItemListPack[]>([]);
    const [selectedCategoria, setSelectedCategoria] = useState<string>("Todos");

    useEffect(() => {
        const fetchPacks = async () => {
            const response = await fetch(`${API_ENDPOINTS.PACKSCATEGORIA}`);
            const data = await response.json();
            setPacks(data);
        };
        fetchPacks();
    }, []);

    // Extraer categorías únicas
    const categorias = ["Todos", ...Array.from(new Set(packs.map((p) => p.categoria).filter((c): c is string => Boolean(c))))];

    // Filtrar packs según categoría seleccionada
    const packsFiltrados =
        selectedCategoria === "Todos"
            ? packs
            : packs.filter((p) => p.categoria === selectedCategoria);

    return (
        <section className="max-w-7xl mx-auto px-6 py-12">
            <h2 className="text-center text-[32px] font-black text-[#010D3D] mb-4">Packs</h2>
            <p className="text-center text-[#010D3D] max-w-3xl mx-auto mb-6">
                Todo lo que necesitas para tener tu empresa o el área de la que eres responsable bajo control, agilizar procesos internos del negocio y cumplir con la normativa.
            </p>

            <div className="flex justify-center mb-10">
                <div className="flex gap-6 bg-[#f3f3f7] px-6 py-3 rounded-xl text-[#010D3D] font-bold items-center">
                    <span className="flex items-center gap-2 text-[20px]">
                        <FontAwesomeIcon icon={faLaptop} className="text-[26px]" />
                        Tecnología NormaPro
                    </span>
                    <span className="text-xl"><FontAwesomeIcon icon={faPlusLarge} /></span>
                    <span className="flex items-center gap-2 text-[20px]">
                        <FontAwesomeIcon icon={faUserTie} className="text-[26px]" />
                        Consultores expertos
                    </span>
                </div>
            </div>

            {/* Tabs de categorías */}
            <div className="flex flex-wrap gap-2 mb-8 border-b border-gray-200 pb-4">
                {categorias.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setSelectedCategoria(cat)}
                        className={`px-4 py-2 rounded-full text-sm font-semibold transition ${selectedCategoria === cat
                                ? "bg-[#010D3D] text-white"
                                : "text-[#010D3D] hover:bg-[#f3f3f7]"
                            }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* Grid de packs filtrados */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {packsFiltrados.map((pack) => (
                    <div
                        key={pack.id_pack}
                        className="bg-[#EAF8FE] p-6 rounded-xl text-[#010D3D] shadow-sm flex items-center justify-between gap-4"
                    >
                        {/* Texto izquierda */}
                        <div className="flex flex-col gap-3">
                            <p className="text-[16px] font-bold text-[#010D3D]">{pack.description}</p>
                            <Link
                                href={`/soluciones/${pack.slug_ambito}/packs/${pack.slug}`}
                                className="underline font-bold text-[#00aae0] text-sm"
                            >
                                Saber más
                            </Link>
                        </div>

                        {/* Imagen derecha */}
                        <div className="shrink-0">
                            <Image
                                src={pack.uriIcon ? `/main/${pack.uriIcon}` : "/main/default-icon.png"}
                                alt={pack.description}
                                width={120}
                                height={100}
                                className="object-contain"
                            />
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default MainPacksSection;