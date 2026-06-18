'use client';

import HeaderInstitutoSection from "@/components/HeaderInstitutoSection";
import API_ENDPOINTS from "@/config/api";
import { faArrowUpRight } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useEffect, useState } from "react";

type Noticia = {
    title: string;
    subtitle: string;
    link: string;
}

export default function AparicionesPrensaPage() {
    const [noticias, setNoticias] = useState<Noticia[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchNoticias = async () => {
            try {
                const response = await fetch(API_ENDPOINTS.PRENSA);
                if (!response.ok) throw new Error('Error al obtener apariciones en prensa');
                const data = await response.json();
                setNoticias(Array.isArray(data) ? data : []);
            } catch (err) {
                console.error('Error al cargar apariciones en prensa:', err);
                setNoticias([]);
            } finally {
                setIsLoading(false);
            }
        };
        fetchNoticias();
    }, []);

    if (isLoading || noticias.length === 0) return null;

    return (
        <>
            <HeaderInstitutoSection text="Apariciones en prensa" variant="light" />

            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-3">
                    {noticias.map((noticia, index) => (
                        <div
                            key={index}
                            className="flex flex-col justify-between py-10 px-8"
                        >
                            <div>
                                <h3 className="text-[#010D3D] font-extrabold text-2xl leading-snug mb-4">
                                    {noticia.title}
                                </h3>
                                <p className="text-[#010D3D] text-base leading-relaxed">
                                    {noticia.subtitle}
                                </p>
                            </div>

                            <div className="mt-8 pt-4 border-t border-gray-200 flex items-center justify-between">
                                <Link
                                    href={noticia.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-[#010D3D] font-bold text-base underline underline-offset-4 hover:opacity-60 transition"
                                >
                                    Ver noticia
                                </Link>
                                <FontAwesomeIcon icon={faArrowUpRight} className="text-[#010D3D] text-2xl" />
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
};