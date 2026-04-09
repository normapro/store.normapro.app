'use client'

import { FC } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import {
    faCircle1,
    faCircle2,
    faCircle3,
    faCircle4,
    faCircle5,
    faCircle6,
    faCircle7,
    faCircle8,
    faCircle9,
} from '@fortawesome/pro-solid-svg-icons';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

type Elemento = {
    title: string;
    claim?: string;
}

type Props = {
    title?: string;
    claim?: string[];
    titlelist?: string;
    list?: Elemento[],
    image?: string;
    pragma?: string[];
    listStyle?: 'numbered';
    compact?: boolean;
}

const ListHistoriaSection: FC<Props> = ({
    title,
    claim,
    titlelist,
    list,
    image,
    pragma,
    listStyle,
    compact = false
}) => {
    const showNumbers = !!listStyle;
    const numberedIcons: IconDefinition[] = [
        faCircle1,
        faCircle2,
        faCircle3,
        faCircle4,
        faCircle5,
        faCircle6,
        faCircle7,
        faCircle8,
        faCircle9,
    ];

    return (
        <section className={`w-full max-w-4xl mx-auto px-4 md:px-8 flex flex-col items-start text-left bg-white ${compact ? 'py-8 md:py-10' : 'py-12 md:py-16'}`}>
            {/* Title */}
            {title && (
                <h2 className={`text-3xl md:text-[40px] font-black text-[#011640] leading-tight ${compact ? 'mb-6' : 'mb-8'}`}>
                    {title}
                </h2>
            )}

            {/* Claim */}
            {claim && claim.length > 0 && (
                <div className={`space-y-4 w-full ${compact ? 'mb-8' : 'mb-10'}`}>
                    {claim.map((text, index) => (
                        <p key={index} className="text-lg md:text-xl text-[#011640] font-medium leading-relaxed">
                            {text}
                        </p>
                    ))}
                </div>
            )}

            {/* Titlelist */}
            {titlelist && (
                <p className={`text-base md:text-lg text-[#011640] font-extrabold leading-tight ${compact ? 'mb-8' : 'mb-10'}`}>
                    {titlelist}
                </p>
            )}

            {/* Lista */}
            {list && list.length > 0 && (
                <ul className={`w-full ${compact ? 'space-y-4 mb-10' : 'space-y-6 mb-16'}`}>
                    {list.map((item, index) => (
                        <li key={index} className="flex items-start gap-4">
                            <div className="text-[#011640] text-xl mt-1 shrink-0 flex-none">
                                {showNumbers ? (
                                    numberedIcons[index] ? (
                                        <FontAwesomeIcon icon={numberedIcons[index]} className="text-[32px] text-[#010d3d]" />
                                    ) : (
                                        <div className="flex h-8 min-h-8 w-8 min-w-8 max-w-8 items-center justify-center rounded-full bg-[#010d3d] text-sm font-black leading-none text-white shadow-sm">
                                            {index + 1}
                                        </div>
                                    )
                                ) : (
                                    <FontAwesomeIcon icon={faCheckCircle} className="text-[26px]" />
                                )}
                            </div>
                            <p className="text-base md:text-lg text-[#011640] font-medium leading-tight">
                                <span className="font-bold">{item.title}</span>
                                {item.claim && <span> {item.claim}</span>}
                            </p>
                        </li>
                    ))}
                </ul>
            )}

            {/* Imagen */}
            {image && (
                <img 
                    src={`/historiasclientes/${image}`}
                    alt="Imagen"
                    className={`w-full h-auto object-cover max-h-[500px] shadow-xl ${compact ? 'mb-8' : 'mb-12'}`}
                />
            )}

            {/* Pragma */}
            {pragma && pragma.length > 0 && (
                <div className={`w-full ${compact ? 'space-y-4' : 'space-y-6'}`}>
                    {pragma.map((text, index) => (
                        <p key={index} className="text-lg md:text-xl text-[#011640] font-medium">
                            {text}
                        </p>
                    ))}
                </div>
            )}
        </section>
    );
};

export default ListHistoriaSection;