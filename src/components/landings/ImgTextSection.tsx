'use client'

import { FC } from 'react';

type Props = {
  imgCabecera: string;
  title: string;
  subtitle: string;
  claim?: string;
};

const ImgTextSection: FC<Props> = ({
  imgCabecera,
  title,
  subtitle,
  claim,
}) => {
  return (
    <section className="max-w-7xl mx-auto w-full flex flex-col items-center justify-center py-10 px-6 md:px-12">
      {/* Imagen de cabecera */}
      <div className="mb-6">
        <img
          src={`/apps/${imgCabecera}`}
          alt="Ilustración cabecera"
          className="h-[120px] md:h-[300px]"
        />
      </div>
      {/* Título, subtitulo y claim */}
      <div className="text-center max-w-2xl">
        <h2 className="text-2xl md:text-[38px] font-black text-[#010d3d] mb-8">
          {title}
        </h2>
        <h3 className="text-base md:text-2xl font-extrabold text-[#6F7F95] whitespace-pre-line mb-8">
          {subtitle}
        </h3>
        {claim && (
          <p className="text-xs md:text-base font-extrabold text-[#010d3d]">
            {claim}
          </p>
        )}
      </div>

    </section>
  );
};

export default ImgTextSection;