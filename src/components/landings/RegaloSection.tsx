'use client'

import { FC } from 'react';

type Props = {
  image: string;
  imageBackground: string;
  title: string;
  subtitle: string;
  claim: string;
  titleSection: string;
  claimSection: string;
  pragma: string;
  buttonText: string;
};

const RegaloSection: FC<Props> = ({
  image,
  imageBackground,
  title,
  subtitle,
  claim,
  titleSection,
  claimSection,
  pragma,
  buttonText,
}) => {
  return (
    <section className="max-w-7xl mx-auto w-full flex flex-col items-center justify-center py-10 px-6 md:px-12 text-[#010d3d]">
      {/* Imagen de cabecera */}
      <div className="relative w-64 h-64 flex items-center justify-center mb-8">
        <img
          src={`/apps/${imageBackground}`}
          alt=""
          className="absolute inset-0 w-full h-full object-contain"
        />
        <img
          src={`/apps/${image}`}
          alt="Imagen cabecera"
          className="relative w-32 h-32 object-contain"
        />
      </div>
      {/* Título, subtitulo y claim */}
      <div className="text-center max-w-2xl mb-10">
        <h2 className="text-base md:text-lg font-bold mb-8">
          {title}
        </h2>
        <h3 className="text-2xl md:text-[38px] font-black mb-8">
          {subtitle}
        </h3>
        <p className="text-xl md:text-3xl font-extrabold text-[#6F7F95]">
          {claim}
        </p>
      </div>
      {/* Cuadro gris */ }
      <div className="bg-[#fafafb] rounded-xl p-10 max-w-3xl mb-10">
        <h4 className="text-xl md:text-2xl font-black mb-4">
          {titleSection}
        </h4>
        <p className="whitespace-pre-line">
          {claimSection}
        </p>
      </div>
      <p className="max-w-2xl text-center font-bold mb-10">
        {pragma}
      </p>
      <button className="bg-[#010d3d] text-white font-bold px-6 py-3 rounded-xl mb-4 shadow-md hover:bg-[#04176f] transition">
        {buttonText}
      </button>

    </section>
  );
};

export default RegaloSection;