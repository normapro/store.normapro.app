'use client'

import { FC } from 'react';

type Props = {
  imgCabecera: string;
  title: string;
  subtitle: string;
};

const ImgTextSection: FC<Props> = ({
  imgCabecera,
  title,
  subtitle,
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
          <p className="text-base md:text-2xl font-black text-[#6F7F95]">{subtitle}</p>
      </div>

    </section>
  );
};

export default ImgTextSection;