'use client';

import { FC } from 'react';

type Paso = {
  claim: string[];
};

type Props = {
  title: string;
  subtitle: string;
  pasos: Paso[];
};

const PasosSection: FC<Props> = ({ title, subtitle, pasos }) => {
  return (
    <section className="max-w-7xl mx-auto w-full py-16 px-6 md:px-12 text-[#010d3d]">
      
      {/* Title y subtitle */}
      <div className="max-w-3xl mx-auto text-center mb-20">
        <h2 className="text-4xl md:text-5xl font-black mb-8 tracking-tight leading-tight">
          {title}
        </h2>
        <p className="text-2xl md:text-3xl font-extrabold text-[#797f98]">
          {subtitle}
        </p>
      </div>

      {/* Pasos */}
      <div className="relative mx-auto flex flex-col gap-16 md:gap-4">
        {pasos.map((paso, index) => {
          const isEven = index % 2 === 0;

          return (
            <div
              key={index}
              className={`flex flex-col md:flex-row items-start md:items-center w-full ${
                isEven ? 'justify-start' : 'justify-end'
              }`}
            >
              <div
                className={`flex flex-col md:flex-row items-start gap-6 max-w-xl md:max-w-2xl w-full ${
                  isEven ? 'md:pr-12' : 'md:pl-12'
                }`}
              >
                {/* Círculo con el número */}
                <div className="flex-shrink-0 w-16 h-16 md:w-20 md:h-20 bg-[#f4f5f8] rounded-full flex items-center justify-center">
                  <span className="text-3xl md:text-4xl font-black text-[#010d3d]">
                    {index + 1}
                  </span>
                </div>

                {/* Texto */}
                <div className="flex-1 flex flex-col gap-4 text-base text-[#010d3d] text-left font-semibold leading-tight">
                  {paso.claim.map((paragraph, pIdx) => (
                    <p key={pIdx}>{paragraph}</p>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default PasosSection;