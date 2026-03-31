'use client'

import { FC } from 'react';

type Elemento = {
    title?: string;
    claim: string;
}

type Props = {
    title?: string;
    list: Elemento[];
    image: string;
}

const ListColumnsSection: FC<Props> = ({
    title,
    list,
    image
}) => {
    return (
        <section className="w-full bg-white py-16 px-6 md:py-24">
            <div className="max-w-7xl mx-auto flex flex-col items-center">
                
                {/* Title */}
                {title && (
                    <h2 className="text-3xl md:text-[40px] font-black text-[#011640] text-center mb-16 leading-tight">
                        {title}
                    </h2>
                )}

                {/* Lista */}
                <div className="flex flex-col md:flex-row gap-12 md:gap-16 mb-20 w-full justify-center">
                    {list.map((item, index) => (
                        <div 
                            key={index} 
                            className="flex-1 flex flex-col space-y-4 min-w-[250px] max-w-none"
                        >
                            {item.title && (
                                <h3 className="text-xl md:text-2xl font-black text-[#011640]">
                                    {item.title}
                                </h3>
                            )}
                            <p className="text-base md:text-lg text-[#011640] font-medium leading-relaxed">
                                {item.claim}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Imagen */}
                <div className="w-full">
                    <img 
                        src={`/historiasclientes/${image}`}
                        alt={image} 
                        className="w-full h-auto object-cover max-h-[600px]"
                    />
                </div>
            </div>
        </section>
    );
};

export default ListColumnsSection;