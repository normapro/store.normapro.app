'use client';

import { FC, useState } from 'react';
import Formulario from '@/components/Formulario';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

type ListaItem =
    | string
    | {
        title?: string;
        claim?: string;
    };

type Props = {
    title: string;
    highlightedText?: string;
    intro?: string;
    leftTitle: string;
    leftItems: ListaItem[];
    rightTitle: string;
    rightItems: ListaItem[];
    paragraphs?: string[];
    buttonText?: string;
    imgBackground?: string;
};

const normalizeItem = (item: ListaItem): { title: string; claim: string } => {
    if (typeof item === 'string') {
        return { title: item, claim: '' };
    }

    return {
        title: item.title || '',
        claim: item.claim || '',
    };
};

const OpcionesSeleccionesSection: FC<Props> = ({
    title,
    intro,
    leftTitle,
    leftItems,
    rightTitle,
    rightItems,
    paragraphs = [],
    buttonText = 'Reserva una reunión con nosotros',
    imgBackground,
}) => {
    const [openModal, setOpenModal] = useState(false);



    return (
        <section className="w-full py-16 px-6 md:px-12 relative overflow-hidden">
            {imgBackground && (
                <img
                    src={`/apps/${imgBackground}`}
                    alt=""
                    aria-hidden="true"
                    className="hidden lg:block absolute right-0 top-0 translate-x-1/2 w-[280px] xl:w-[380px] object-contain pointer-events-none select-none"
                />
            )}

            <div className="max-w-5xl mx-auto relative z-10">
                <div className="text-center mb-10">
                    <h2 className="text-4xl md:text-4xl font-black leading-tight text-[#010d3d] whitespace-pre-line max-w-2xl mx-auto text-center">
                        {title}
                    </h2>
                    {intro && (
                        <p className="mt-6 text-sm md:text-base text-[#010d3d] max-w-4xl mx-auto whitespace-pre-line font-semi-bold max-w-2xl mx-auto text-center">
                            {intro}
                        </p>
                    )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-10 md:gap-12 mt-16  mb-20 items-stretch ">
                    <div className="rounded-2xl  p-6 md:p-8 h-full bg-[#fafafb] shadow-[0_-4px_24px_rgba(1,13,61,0.15),0_8px_24px_rgba(1,13,61,0.15)]">
                        <h3 className="text-2xl font-black text-[#8e95a9] mb-6">{leftTitle}</h3>
                        <ul className="space-y-4">
                            {leftItems.map((item, index) => {
                                const normalized = normalizeItem(item);
                                if (!normalized.title && !normalized.claim) return null;

                                return (
                                    <li key={index} className="flex items-start gap-3 text-[#010d3d]">
                                        <FontAwesomeIcon icon={faCheckCircle} className="text-[#52d3c5] mt-1" />
                                        <p className="leading-snug text-lg">
                                            <span className="font-bold">{normalized.title}</span>
                                            {normalized.claim ? <span className="font-medium"> {normalized.claim}</span> : null}
                                        </p>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>

                    <div className="flex md:flex-col items-center justify-center gap-4 text-[#b9becb] text-5xl">
                        <img src="/arrow-right-arrow-left.svg" alt="Arrow Both sides" className="hidden md:block" />
                    </div>

                    <div className="rounded-2xl p-6 md:p-8 h-full bg-[#fafafb] shadow-[0_-4px_24px_rgba(1,13,61,0.15),0_8px_24px_rgba(1,13,61,0.15)]">
                        <h3 className="text-2xl font-black text-[#8e95a9] mb-6">{rightTitle}</h3>
                        <ul className="space-y-4">
                            {rightItems.map((item, index) => {
                                const normalized = normalizeItem(item);
                                if (!normalized.title && !normalized.claim) return null;

                                return (
                                    <li key={index} className="flex items-start gap-3 text-[#010d3d]">
                                        <FontAwesomeIcon icon={faCheckCircle} className="text-[#52d3c5] mt-1" />
                                        <p className="leading-snug text-lg">
                                            <span className="font-bold">{normalized.title}</span>
                                            {normalized.claim ? <span className="font-medium"> {normalized.claim}</span> : null}
                                        </p>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </div>

                {paragraphs.length > 0 && (
                    <div className="max-w-4xl mx-auto text-[#010d3d] text-sm md:text-xl space-y-4 mb-10 whitespace-pre-line">
                        {paragraphs.map((paragraph, index) => (
                            <p key={index}>{paragraph}</p>
                        ))}
                    </div>
                )}

                <div className="flex justify-center mt-20">
                    <button
                        onClick={() => setOpenModal(true)}
                        className="bg-[#010d3d] text-white font-bold px-6 py-3 rounded-xl shadow-md hover:bg-[#04176f] transition"
                    >
                        {buttonText}
                    </button>
                </div>
            </div>

            {openModal && <Formulario onClose={() => setOpenModal(false)} />}
        </section>
    );
};

export default OpcionesSeleccionesSection;
