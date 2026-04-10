'use client'

import { FC } from 'react';

type Props = {
  image: string;
  imgBackground?: string;
  title?: string;
  claim: string;
  plagma?: String;
};

const SideImgTextSection: FC<Props> = ({
  image,
  imgBackground,
  title,
  claim,
  plagma,
}) => {
  return (
    <section className="max-w-7xl mx-auto w-full flex flex-col md:flex-row items-center justify-between gap-1  py-10 px-6 md:px-12">
      {/* Imagen de cabecera */}
      <div className="relative w-[220px] md:w-[360px] overflow-visible ">
        {imgBackground && (
          <img
            src={`/apps/${imgBackground}`}
            alt=""
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[160%] max-w-none h-auto object-contain"
          />
        )}
        <img
          src={`/apps/${image}`}
          alt="Imagen cabecera"
          className="relative z-10 h-[120px] md:h-[300px] object-contain"
        />
      </div>
      {/* Título y claim */}
      <div className="max-w-xl">
        {title && 
        ( <h2 className="text-3xl md:text-[44px] font-black text-[#010d3d] mb-8">
            {title}
          </h2>
        )}
        {plagma && (
          <p className="text-sm md:text-lg text-[#010D3D] mb-4">
            {plagma}
          </p>
        )}
        <p className="text-sm md:text-lg font-bold text-[#010d3d]">
          {claim}
        </p>
      </div>

    </section>
  );
};

export default SideImgTextSection;