'use client'

import { FC } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

type Elemento = {
    title: string;
    claim?: string;
}

type Props = {
    title?: string;
    claim?: string[];
    titlelist?: string;
    list: Elemento[],
    image?: string;
    pragma?: string[];
}

const ListHistoriaSection: FC<Props> = ({
    title,
    claim,
    titlelist,
    list,
    image,
    pragma
}) => {
    return (
        <section className="w-full max-w-4xl mx-auto py-16 px-6 md:py-24 flex flex-col items-start text-left bg-white">
            {/* Title */}
            {title && (
                <h2 className="text-3xl md:text-[40px] font-black text-[#011640] mb-8 leading-tight">
                    {title}
                </h2>
            )}

            {/* Claim */}
            {claim && claim.length > 0 && (
                <div className="space-y-4 mb-10 w-full">
                    {claim.map((text, index) => (
                        <p key={index} className="text-lg md:text-xl text-[#011640] font-medium leading-relaxed">
                            {text}
                        </p>
                    ))}
                </div>
            )}

            {/* Titlelist */}
            {titlelist && (
                <p className="text-base md:text-lg text-[#011640] font-extrabold leading-tight mb-10">
                    {titlelist}
                </p>
            )}

            {/* Lista */}
            <ul className="space-y-6 mb-16 w-full">
                {list.map((item, index) => (
                    <li key={index} className="flex items-start gap-4">
                        <div className="text-[#011640] text-xl mt-1 shrink-0">
                            <FontAwesomeIcon icon={faCheckCircle} />
                        </div>
                        <p className="text-base md:text-lg text-[#011640] font-medium leading-tight">
                            <span className="font-bold">{item.title}</span> 
                            {item.claim && <span> {item.claim}</span>}
                        </p>
                    </li>
                ))}
            </ul>

            {/* Imagen */}
            {image && (
                <img 
                    src={`/historiasclientes/${image}`}
                    alt="Imagen"
                    className="w-full h-auto object-cover max-h-[500px] mb-12 shadow-xl"
                />
            )}

            {/* Pragma */}
            {pragma && pragma.length > 0 && (
                <div className="space-y-6 w-full">
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