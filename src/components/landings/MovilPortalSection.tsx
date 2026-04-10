'use client';

import { FC } from 'react';

type Props = {
  title: string;
  subtitle: string;
  images: string[];
};

const MovilPortalSection: FC<Props> = ({ title, subtitle, images }) => {
  return (
    <section className="relative max-w-7xl mx-auto w-full flex flex-col items-center justify-center py-24 px-6 md:px-12 overflow-hidden">
      {/* Títulos */}
      <div className="text-center text-[#010d3d] max-w-md mb-12 z-10">
        <h2 className="text-3xl md:text-4xl font-black mb-10 leading-tight">
          {title}
        </h2>
        <p className="text-sm font-semibold">{subtitle}</p>
      </div>

      {/* Composición de imágenes escalonadas con animación */}
      <div className="relative w-full flex justify-center items-end gap-1 z-10">
       
            {images.map((src, i) => (
                <div className="relative" key={src}>
                <img
                key={src}
                src={`/apps/portalmovil/${src}`}
                alt={`Captura móvil ${i + 1}`}
                className={`fade-in-up h-auto max-h-[550px] w-auto transition-opacity`}
                style={{
                    
                    marginBottom: `${i * 35}px`,
                    animationDelay: `${i * 0.2}s`,
                }}
                />
                 </div>
            ))}
        </div>
   

      {/* Suaviza el corte inferior con fondo blanco si fuera necesario */}
      <div className="absolute w-full h-[50px] bottom-[-20px] bg-white z-0" />
    </section>
  );
};

export default MovilPortalSection;
