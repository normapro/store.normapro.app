'use client'

import { FC, useEffect, useState } from 'react';
import Image from 'next/image';
import { TestimonioConCliente } from '@/types/testimonio';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuoteLeft, faQuoteRight } from '@fortawesome/pro-solid-svg-icons';

type Props = {
    claim: string[];
    id_testimonio: number;
}

const HistoriaClienteSection: FC<Props> = ({
    claim,
    id_testimonio
}) => {
    const [testimonio, setTestimonio] = useState<TestimonioConCliente | null>(null);

    useEffect(() => {
        if (!id_testimonio) return;

        fetch("http://localhost:3010/v1/store/testimonios?maxItems=100")
            .then((res) => res.ok ? res.json() : [])
            .then((data) => {
                const testimonios = Array.isArray(data) ? data : [];
                const selected = testimonios.find(
                    (t) => Number(t?.id_testimonio) === Number(id_testimonio)
                );
                setTestimonio(selected || null);
            })
            .catch(() => setTestimonio(null));
    }, [id_testimonio]);

    if (!testimonio) return null;

    const clientName = (testimonio.cliente as any).descripcion || testimonio.cliente.description;
    const imageSlug = clientName
        ? clientName.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, "")
        : "default";

    return (
        <section className="w-full bg-[#f1f1f7] py-20 px-6 relative overflow-hidden flex flex-col items-center text-center mb-10">

            {/* Comilla izquierda */}
            <div className="absolute top-10 left-10 md:left-20 text-gray-300 text-7xl opacity-40 select-none">
                <FontAwesomeIcon icon={faQuoteLeft} />
            </div>

            <div className="max-w-4xl mx-auto relative z-10 flex flex-col items-center">

                {/* Claim */}
                <div className="space-y-4 mb-12 px-4 md:px-10">
                    {claim.map((paragraph, index) => (
                        <p
                            key={index}
                            className="text-[#010d3d] text-lg md:text-xl font-extrabold italic leading-relaxed"
                        >
                            {paragraph}
                        </p>
                    ))}
                </div>

                {/* Cliente */}
                <div className="w-24 h-24 rounded-full overflow-hidden mb-6">
                    <Image
                        src={`/testimonios/${imageSlug}.png`}
                        alt={testimonio.persona || 'Foto'}
                        width={64}
                        height={64}
                        className="object-cover w-full h-full"
                    />
                </div>
                <div className="text-base text-[#010d3d] leading-snug">
                    <p>{testimonio.persona}</p>
                    <p className="font-bold">{testimonio.cargo}</p>
                    <p className="font-bold">{clientName}</p>
                </div>
            </div>

            {/* Comilla derecha */}
            <div className="absolute bottom-10 right-10 md:right-20 text-gray-300 text-7xl opacity-40 select-none">
                <FontAwesomeIcon icon={faQuoteRight} />
            </div>

        </section>
    );
};

export default HistoriaClienteSection;