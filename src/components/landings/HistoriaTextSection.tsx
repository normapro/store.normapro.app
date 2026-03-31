'use client'

import { FC } from 'react';

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
    return (
        <section className="w-full py-16 px-6 md:py-24 bg-white flex flex-col items-start text-left max-w-4xl mx-auto">
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
                <button className="self-center bg-[#010d3d] text-white font-bold px-6 py-3 rounded-xl shadow-md hover:bg-[#04176f] transition">
                    {buttonText}
                </button>
            )}
            
        </section>
    );
};

export default HistoriaTextSection;