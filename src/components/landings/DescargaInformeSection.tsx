'use client'

import { FC } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileDownload } from '@fortawesome/pro-duotone-svg-icons';

type Props = {
    title: string;
    claim: string;
    buttonText: string;
}

const DescargaInformeSection: FC<Props> = ({
    title,
    claim,
    buttonText
}) => {
    return (
        <section className="w-full bg-[#f1f1f7] py-24 px-6 flex flex-col items-center justify-center text-center text-[#010d3d]">
            <div className="max-w-4xl mx-auto flex flex-col items-center">
                
                {/* Title y claim */}
                <h2 className="text-3xl md:text-[40px] font-black leading-tight mb-8 max-w-2xl">
                    {title}
                </h2>
                <p className="text-lg md:text-xl font-extrabold mb-12 max-w-2xl">
                    {claim}
                </p>

                {/* Botón de Descarga */}
                <button className="flex items-center gap-3 bg-[#010d3d] text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-[#04176f] transition-all shadow-lg">
                    <FontAwesomeIcon icon={faFileDownload} className="text-xl" />
                    {buttonText}
                </button>
                
            </div>
        </section>
    );
};

export default DescargaInformeSection;