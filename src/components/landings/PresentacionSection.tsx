'use client'

import { FC } from 'react';

type Props = {
  title: string;
  claim: string;
  imgBottom: string;
};

const PresentacionSection: FC<Props> = ({
  title,
  claim,
  imgBottom,
}) => {
  return (
    <section className="max-w-7xl mx-auto w-full flex flex-col items-center justify-center py-20 px-6 md:px-12">
      {/* Título y claim */}
      <div className="text-center max-w-3xl mb-15">
        <h2 className="text-2xl md:text-3xl font-black text-[#010d3d] mb-8">
          {title}
        </h2>
        <p className="text-base md:text-lg font-semibold">{claim}</p>
      </div>
      {/* Imagen final*/}
      <div className="">
        <img
          src={`/apps/${imgBottom}`}
          alt="Ilustración final"
          className=""
        />
      </div>
    </section>
  );
};

export default PresentacionSection;