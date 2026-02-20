'use client';

import { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faFileLines,
    faBullhorn,
    faFileSignature,
} from '@fortawesome/pro-duotone-svg-icons';

const iconMap = {
    'fa-file-lines': faFileLines,
    'fa-bullhorn': faBullhorn,
    'fa-file-signature': faFileSignature,
};

type Caracteristica = {
    id_data: number;
    title: string;
    icon: string;
    mainTitle: string;
    subtitle: string;
    description: string;
    img: string;
};

type Props = {
    data: Caracteristica[];
};

const CaracteristicasStorytellingSection = ({ data }: Props) => {
    const stickyRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [currentStep, setCurrentStep] = useState(0);

    useEffect(() => {
        const onScroll = () => {
            if (!containerRef.current || !stickyRef.current) return;

            const containerTop = containerRef.current.getBoundingClientRect().top;
            const stepHeight = window.innerHeight;
            const offset = -containerTop;
            const totalHeight = stepHeight * data.length;

            if (offset >= 0 && offset < totalHeight) {
                const newStep = Math.floor(offset / stepHeight);
                if (newStep !== currentStep) setCurrentStep(newStep);
            }
        };

        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, [data.length, currentStep]);

    return (
        <section className="max-w-7xl mx-auto w-full flex flex-col items-center justify-center py-12">


            <div ref={containerRef}
                className="relative w-full"
                style={{ height: `${data.length * 100}vh` }}
            >
                <div
                    ref={stickyRef}
                    className="sticky top-20 h-screen flex flex-col items-center justify-start z-10"
                >
                    {/* Tabs */}
                    <div className="w-full bg-white px-4 py-4 overflow-x-auto scrollbar-hide flex gap-4 justify-center z-20">
                        {data.map((item, i) => (
                            <div
                                key={item.id_data}
                                className={`flex flex-col items-center min-w-[135px] max-w-[135px] p-4  
                                    rounded-xl cursor-pointer
                                    transition-transform duration-300 font-extrabold 
                                    ${currentStep === i ? 
                                        ' text-white scale-105 bg-[#010d3d] border-[#010d3d]' 
                                    : 
                                        ' text-[#010d3d] text-gray-400'
                                    }`}
                            >
                                <FontAwesomeIcon
                                    icon={iconMap[item.icon]}
                                    size="3x"
                                    className={`${currentStep === i ? 'fa-duotone text-gray-300' : 'text-[#010d3d]'
                                        }`}
                                />
                                <span className="text-sm text-center mt-2">{item.title}</span>
                            </div>
                        ))}
                    </div>

                    {/* Bloque storytelling */}
                    <div className="w-full max-w-7xl px-6 py-10">
                        <div className="grid grid-cols-3 gap-6">
                            <div className="col-span-2 flex justify-center items-center">
                                <img
                                    src={`/apps/captures/${data[currentStep].img}`}
                                    alt={data[currentStep].mainTitle}
                                    className="w-full max-w-[800px] rounded-xl shadow-xl"
                                />
                            </div>

                            <div className="col-span-1 text-center lg:text-left flex flex-col justify-center">
                                <h2 className="text-[30px] font-bold text-[#010d3d]">
                                    {data[currentStep].mainTitle}
                                </h2>
                                {data[currentStep].subtitle && (
                                    <h3 className="text-xl text-gray-600 font-semibold mt-2 mb-4">
                                        {data[currentStep].subtitle}
                                    </h3>
                                )}
                                <p className="text-base text-gray-700 leading-relaxed">
                                    {data[currentStep].description}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="mt-8">
                        <button className="bg-[#010d3d] text-white px-6 py-3 rounded-xl font-semibold shadow-lg">
                            Quiero una demostración
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CaracteristicasStorytellingSection;
