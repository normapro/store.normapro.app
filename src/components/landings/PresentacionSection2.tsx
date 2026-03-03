'use client'

import { FC } from 'react';

type Props = {
  title?: string;
  claim?: string;
  images: string[];
  bottomText?: string;
};

const PresentacionSection2: FC<Props> = ({
  title,
  claim,
  images,
  bottomText,
}) => {
  return (
    <section className="max-w-7xl mx-auto w-full flex flex-col items-center justify-center py-20 px-6 md:px-12 mb-[-250px]">
      {/* Título y claim */}
      {title && claim && (
        <div className="text-center max-w-3xl mb-15">
          <h2 className="text-2xl md:text-3xl font-black text-[#010d3d] mb-8">
            {title}
          </h2>
          <p className="text-base md:text-lg font-semibold">{claim}</p>
        </div>
      )}
      {/* Imagenes con animación*/}
      <div className="relative flex items-center justify-center h-[600px] w-full">
        {images.map((src, i) => {
          const isCenter = i === 1;
          return (
            <img
              key={src}
              src={`/apps/${src}`}
              alt={`Imagen ${i + 1}`}
              className={`up absolute h-auto max-h-[550px] w-auto`}
              style={{
                left: `${i * 250}px`,
                zIndex: isCenter ? -1 : -2,
                marginBottom: isCenter ? "60px" : "0px",
                animationDelay: isCenter ? "0s" : "0.3s",
              }}
            />
          );
        })}
      </div>
    </section>
  );
};

export default PresentacionSection2;