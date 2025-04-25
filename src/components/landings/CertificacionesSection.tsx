'use client';

import { FC } from 'react';

type Props = {
  title: string;
  subtitle: string;
  images: string[];
};

const CertificacionesSection: FC<Props> = ({ title, subtitle, images }) => {
  return (
    <section className="max-w-7xl mx-auto w-full flex flex-col items-center justify-center py-20 px-6 md:px-12">
      <div className="text-center mb-12">
        <h2 className="text-[50px] font-extrabold text-[#010d3d] mb-4">
          {title}
        </h2>
        <p className="text-[24px] font-black text-[#7F859D]">{subtitle}</p>
      </div>

      <div className="flex flex-wrap justify-center items-center gap-30">
        {images.map((src, i) => (
          <img
            key={i}
            src={`/certificaciones/${src}`}
            alt={`Certificación ${i + 1}`}
            className="h-auto max-h-[130px] w-auto object-contain"
        
          />
        ))}
      </div>
    </section>
  );
};

export default CertificacionesSection;
