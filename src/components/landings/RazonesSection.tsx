'use client';

import React, { FC, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChartLineUp,
  faComments,
  faGavel,
  faPeoplePants,
  faScaleBalanced,
  faChevronDown,
} from '@fortawesome/pro-duotone-svg-icons';

const iconMap: Record<string, any> = {
  'fa-chart-line-up': faChartLineUp,
  'fa-people-pants': faPeoplePants,
  'fa-scale-balanced': faScaleBalanced,
  'fa-gavel': faGavel,
  'fa-comments': faComments
};

type Bloque = {
  icon: string;
  title: string;
  pragma: string;
};

type Props = {
  imgCabecera: string;
  imgBackground: string;
  title: string;
  claim: string;
  titleList: string;
  list: Bloque[];
  buttonText: string;
};

const RazonesSection: FC<Props> = ({
  imgCabecera,
  imgBackground,
  title,
  claim,
  titleList,
  list,
  buttonText,
}) => {
  const [openIndex, setOpenIndex] = useState<number|null>(null);

  return (
    <section className="max-w-7xl mx-auto w-full flex flex-col items-center justify-center py-20 px-6 md:px-12">
      {/* Imagen de cabecera */}
       <div className="relative mb-10">
        <img
          src={`/apps/${imgBackground}`}
          alt=""
          className="absolute inset-0 w-full h-full object-contain"
        />
        <img
          src={`/apps/${imgCabecera}`}
          alt="Imagen cabecera"
          className="relative h-[120px] md:h-[160px] object-contain"
        />
      </div>

      {/* Título y claim */}
      <div className="text-center max-w-3xl mb-10">
        <h2 className="text-3xl md:text-[40px] font-black text-[#010d3d] mb-6">
          {title}
        </h2>
        <p className="text-left text-base md:text-lg text-[#010d3d] whitespace-pre-line">{claim}</p>
      </div>
    
      {/* Lista destacada */}
      <div className="bg-[#fafafb] w-full max-w-3xl mb-12 p-8 md:p-12 rounded-3xl">
        <h3 className="text-2xl text-[#797f98] font-black mb-6">
          {titleList}
        </h3>
        <div className="flex flex-col gap-8">
          <div className="space-y-2">
            {list.map((item, i) => {
              const isOpen = openIndex === i;
              return (
                <div key={i} className="border-b border-[#010d3d]">
                  <button
                    className="w-full py-6 flex justify-between items-center text-left font-extrabold focus:outline-none group"
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                  >
                    <div className="flex items-center gap-4">
                      <div className="text-[#010d3d] text-4xl">
                        <FontAwesomeIcon icon={iconMap[item.icon]} className="fa-duotone" />
                      </div>
                      <span className="text-[#010d3d] text-xl font-bold">
                        {item.title}
                      </span>
                    </div>
                    {/* Flecha de estado */}
                    <FontAwesomeIcon 
                      icon={faChevronDown} 
                      className={`text-[#010d3d] transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                    />
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      isOpen ? 'max-h-96 pb-6' : 'max-h-0'
                    }`}
                  >
                    <p className="text-[#010d3d] leading-relaxed pl-[44px] whitespace-pre-line">
                      {item.pragma}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <button className="bg-[#010d3d] text-white font-bold px-6 py-3 rounded-xl shadow-md hover:bg-[#04176f] transition">
        {buttonText}
      </button>
    </section>
  );
};

export default RazonesSection;