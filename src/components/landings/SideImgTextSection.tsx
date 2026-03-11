'use client'

import { FC } from 'react';

type Props = {
  image: string;
  imgBackground: string;
  title: string;
  claim: string;
};

const SideImgTextSection: FC<Props> = ({
  image,
  imgBackground,
  title,
  claim,
}) => {
  return (
    <section className="max-w-7xl mx-auto w-full flex flex-col md:flex-row items-center justify-center gap-10 py-10 px-6 md:px-12">
      {/* Imagen de cabecera */}
      <div className="relative">
        <img
          src={`/apps/${imgBackground}`}
          alt=""
          className="absolute inset-0 w-full h-full object-contain"
        />
        <img
          src={`/apps/${image}`}
          alt="Imagen cabecera"
          className="relative h-[120px] md:h-[300px] object-contain"
        />
      </div>
      {/* Título y claim */}
      <div className="max-w-2xl">
        <h2 className="text-2xl md:text-[38px] font-black text-[#010d3d] mb-8">
          {title}
        </h2>
        <p className="text-xs md:text-base font-extrabold text-[#010d3d]">
          {claim}
        </p>
      </div>

    </section>
  );
};

export default SideImgTextSection;