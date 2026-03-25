'use client'

import { FC } from 'react';

type Props = {
  imgCabecera: string;
  imgBackground?: string;
  title: string;
  subtitle?: string;
  claim?: string;
  pragma?: string;
};

const ImgTextSection: FC<Props> = ({
  imgCabecera,
  imgBackground,
  title,
  subtitle,
  claim,
  pragma,
}) => {
  return (
    <section className="max-w-7xl mx-auto w-full flex flex-col items-center justify-center py-10 px-6 md:px-12">
      {/* Imagen de cabecera */}
      <div className="relative mb-10 flex items-center justify-center">
        {imgBackground && (
          <img
            src={`/apps/${imgBackground}`}
            alt=""
            className="absolute inset-0 w-full h-full object-contain -z-10 scale-300" 
          />
        )}
        <img
          src={`/apps/${imgCabecera}`}
          alt="Imagen cabecera"
          className="relative h-[180px] md:h-[300px] object-contain"
        />
      </div>
      {/* Título, subtitulo y claim */}
      <div className="text-center max-w-2xl">
        <h2 className="text-2xl md:text-[38px] font-black text-[#010d3d] mb-8">
          {title}
        </h2>
        {subtitle && (
          <h3 className="text-base md:text-2xl font-extrabold text-[#6F7F95] whitespace-pre-line mb-8">
            {subtitle}
          </h3>
        )}
        {claim && (
          <p className="text-xs md:text-base font-extrabold text-[#010d3d]">
            {claim}
          </p>
        )}
        {pragma && (
          <p className="text-base md:text-lg text-[#010d3d] text-left whitespace-pre-line">
            {pragma}
          </p>
        )}
      </div>

    </section>
  );
};

export default ImgTextSection;