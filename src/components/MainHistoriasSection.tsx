'use client';
import API_ENDPOINTS from "@/config/api";
import { TestimonioConCliente } from "@/types/testimonio";
import ImageLogoCliente from "@/components/shared/ImageLogoCliente";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const MainHistoriasSection = () => {
    const [testimonio, setTestimonio] = useState<TestimonioConCliente | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchTestimonios = async () => {
            try {
                const response = await fetch(`${API_ENDPOINTS.TESTIMONIOS}/2`);
                if (!response.ok) throw new Error("Error al obtener testimonio");
                const data = await response.json();
                setTestimonio(data);
            } catch (err) {
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchTestimonios();
    }, []);

    if (isLoading || !testimonio) return null;

    return (
        <div className="w-full bg-[#F2F2F5]">
            <section className="max-w-7xl mx-auto px-6 py-16 text-[#010D3D]">
                {/* Cabecera */}
                <div className="flex items-center justify-between mb-10">
                    <h2 className="text-3xl font-extrabold text-[#010d3d]">
                        Historias con clientes
                    </h2>
                    <Link
                        href="/historias"
                        className="text-base font-bold text-[#010d3d] underline underline-offset-4 hover:opacity-70 transition"
                    >
                        Ver todas las historiass
                    </Link>
                </div>

                <div className="relative flex items-center gap-4">
                    {/* Testimonio */}
                    <div className="max-w-5xl mx-auto bg-white rounded-2xl p-10">
                        {testimonio.description && (
                            <p className="text-xl font-bold italic leading-relaxed mb-8 text-[#010D3D]">
                                "{testimonio.description}"
                            </p>
                        )}

                        {/* Autor + Logo */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                {/* Foto autor */}
                                {(() => {
                                    const clientName = testimonio.cliente?.description;
                                    const imageSlug = clientName
                                        ? clientName.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, "")
                                        : "default";
                                    const imageSrc = testimonio.miniImg ?? `/testimonios/${imageSlug}.png`;
                                    console.log(imageSrc);
                                    return (
                                        <div className="w-20 h-20 relative rounded-full overflow-hidden flex-shrink-0">
                                            <Image
                                                src={imageSrc}
                                                alt={testimonio.persona ?? ''}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                    );
                                })()}
                                <div>
                                    {testimonio.persona && (
                                        <p className="font-bold text-base tracking-wide uppercase">
                                            {testimonio.persona}
                                        </p>
                                    )}
                                    {testimonio.cargo && (
                                        <p className="text-sm mt-1">
                                            {testimonio.cargo}
                                        </p>
                                    )}
                                    {testimonio.cliente?.description && (
                                        <p className="text-sm">
                                            {testimonio.cliente.description}
                                        </p>
                                    )}
                                </div>
                            </div>
                            {/* Logo cliente */}
                            {testimonio.cliente && (
                                <ImageLogoCliente
                                    logoName={testimonio.cliente.logo}
                                    logoType={testimonio.cliente.logoType}
                                    clienteName={testimonio.cliente.description}
                                />
                            )}
                        </div>
                    </div>
                </div>

                {/* Botón Ver caso completo */}
                <div className="flex justify-center mt-10">
                    <a
                        href="https://store.normapro.es/historias/emacsa?ref=instituto"
                        className="border-2 border-[#010D3D] text-[#010D3D] font-semibold px-8 py-3 rounded-xl hover:bg-[#010D3D] hover:text-white transition"
                    >
                        Ver caso completo
                    </a>
                </div>
            </section>
        </div>
    );
};

export default MainHistoriasSection;