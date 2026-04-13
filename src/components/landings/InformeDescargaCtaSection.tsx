'use client'

import { useState } from 'react';
import DescargaInformeModal from './DescargaInformeModal';

type Props = {
    textoDescarga: string;
};

const InformeDescargaCtaSection = ({ textoDescarga }: Props) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [email, setEmail] = useState('');

    return (
        <>
            <section className="w-full bg-[#eff0f4] py-16 md:py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto text-center text-[#010d3d] mt-15 mb-15">
                    <h2 className="text-[34px] md:text-[46px] font-extrabold leading-tight mb-6">
                        Descarga el informe completo
                    </h2>

                    <p className="mx-auto max-w-3xl text-[18px] md:text-[22px] font-semibold leading-relaxed mb-10">
                        {textoDescarga}
                    </p>

                    <div className="mx-auto max-w-[760px] flex flex-col md:flex-row gap-3 md:gap-0">
                        <input
                            type="email"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            placeholder="Escribe tu email"
                            className="h-12 flex-1 rounded-xl md:rounded-r-none border border-[#d4d9e6] bg-white px-4 text-[16px] text-[#1a274e] outline-none focus:border-[#010d3d]"
                        />

                        <button
                            type="button"
                            onClick={() => setIsModalOpen(true)}
                            className="h-12 rounded-xl md:rounded-l-none bg-[#010d3d] px-6 text-white text-[16px] font-bold hover:bg-[#04176f] transition-colors"
                        >
                            Descarga el informe
                        </button>
                    </div>
                </div>
            </section>

            <DescargaInformeModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                initialEmail={email}
            />
        </>
    );
};

export default InformeDescargaCtaSection;
