'use client'

import { FC, useState } from 'react';
import Formulario from "@/components/Formulario";

type Props = {
    title: string;
    claim: string[];
    buttonText?: string;
    image?: string;
}

const HistoriaTextSection: FC<Props> = ({
    title,
    claim,
    buttonText,
    image
}) => {
    const [openModal, setOpenModal] = useState(false);

    return (
        <section className="w-full py-6 px-6 flex flex-col items-start text-left max-w-4xl mx-auto">
            {/* Title y claim */}
            <h2 className="text-3xl md:text-[45px] font-black text-[#010d3d] mb-10 leading-tight">
                {title}
            </h2>
            <div className="space-y-6 mb-12 w-full">
                {claim.map((paragraph, index) => (
                    <p
                        key={index}
                        className="text-lg md:text-xl text-[#010d3d] font-medium leading-relaxed"
                    >
                        {paragraph}
                    </p>
                ))}
            </div>

            {/* Botón */}
            {buttonText && (
                <button
                    onClick={() => setOpenModal(true)}
                    className="self-center bg-[#010d3d] text-white font-bold px-6 py-3 rounded-xl shadow-md hover:bg-[#04176f] transition"
                >
                    {buttonText}
                </button>
            )}

            {/* Imagen */}
            {image && (
                <div className="w-full">
                    <img
                        src={`/historiasclientes/${image}`}
                        alt={image}
                        className="w-full h-auto object-cover max-h-[600px] shadow-xl"
                    />
                </div>
            )}

            {/* Formulario contacto */}
            {openModal && (
                <Formulario onClose={() => setOpenModal(false)} />
            )}
        </section>
    );
};

export default HistoriaTextSection;