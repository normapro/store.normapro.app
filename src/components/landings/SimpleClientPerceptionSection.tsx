'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { TestimonioConCliente } from '@/types/testimonio';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuoteLeft, faQuoteRight } from '@fortawesome/free-solid-svg-icons';

type ClientPerceptionSectionProps = {
    title?: string;
    id_testimonio: number;
};

const SimpleClientPerceptionSection: React.FC<ClientPerceptionSectionProps> = ({ title, id_testimonio }) => {
    const [testimonio, setTestimonio] = useState<TestimonioConCliente | null>(null);

    useEffect(() => {
        fetch("http://localhost:3010/v1/store/testimonios?maxItems=100")
            .then(async (res) => {
                if (!res.ok) {
                    throw new Error("No se pudieron cargar los testimonios");
                }
                return res.json();
            })
            .then((data) => {
                const testimonios = Array.isArray(data) ? data : [];
                const selected = testimonios.find(
                    (t) => Number(t?.id_testimonio) === Number(id_testimonio)
                );

                if (selected && selected.cliente && selected.description) {
                    setTestimonio(selected);
                    return;
                }

                setTestimonio(null);
            })
            .catch(() => setTestimonio(null));
    }, [id_testimonio]);

    return (
        <section className="w-full relative py-24 overflow-hidden">
            {/* Curva superior */}
            <div className="w-full leadimg-[0] z-20 relative">
                <svg viewBox="0 0 1440 80" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
                    <path fill="#f1f1f7" d="M0,0 C480,80 960,80 1440,0 L1440,80 L0,80 Z" />
                </svg>
            </div>

            <div className="w-full relative bg-[#f1f1f7] py-12 z-10 pb-30 pt-30">
                {title && (
                    <div className="flex justify-center mb-16 px-6">
                        <h2 className="max-w-4xl text-center text-4xl font-black text-[#011442] tracking-tight leading-snug">
                            {title}
                        </h2>
                    </div>
                )}
                <div className="max-w-3xl mx-auto px-6 flex justify-center">
                    {testimonio && (
                        <div className="flex flex-col items-center text-center">
                            {(() => {
                                const clientName = (testimonio.cliente as any).descripcion || testimonio.cliente.description;
                                const imageSlug = clientName
                                    ? clientName.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, "")
                                    : "default";

                                return (
                                    <>
                                        <Image
                                            src={`/logos/${testimonio.cliente.logo}`}
                                            alt={clientName}
                                            width={110}
                                            height={66}
                                            className="object-contain -mb-12 z-10"
                                        />
                                        <div className="bg-white p-8 rounded-2xl shadow-xl w-full">
                                            <div className="text-[#d1d5db] text-4xl text-left mt-5">
                                                <FontAwesomeIcon icon={faQuoteLeft} className="fa-duotone" />
                                            </div>
                                            <p className="text-[#010d3d] italic font-medium text-lg leading-relaxed max-w-lg mx-auto">
                                                {testimonio.description}
                                            </p>
                                            <div className="text-[#d1d5db] text-4xl text-right mb-5">
                                                <FontAwesomeIcon icon={faQuoteRight} className="fa-duotone" />
                                            </div>
                                        </div>
                                        <div className="w-20 h-20 rounded-full overflow-hidden shadow-sm mb-4 -mt-12">
                                            <Image
                                                src={`/testimonios/${imageSlug}.png`}
                                                alt={testimonio.persona || 'Foto'}
                                                width={64}
                                                height={64}
                                                className="object-cover w-full h-full"
                                            />
                                        </div>
                                        <div className="text-sm text-[#010d3d] leading-snug">
                                            <p>{testimonio.persona}</p>
                                            <p className="font-bold">{testimonio.cargo}</p>
                                            <p className="font-bold">{clientName}</p>
                                        </div>
                                    </>
                                );
                            })()}
                        </div>
                    )}
                </div>
            </div>

            {/* Curva inferior */}
            <div className="w-full leadimg-[0] z-20 relative">
                <svg viewBox="0 0 1440 80" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
                    <path fill="#f1f1f7" d="M0,80 C480,0 960,0 1440,80 L1440,0 L0,0 Z" />
                </svg>
            </div>
        </section>
    );
};

export default SimpleClientPerceptionSection;
