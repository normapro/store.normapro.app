'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuoteLeft, faQuoteRight } from '@fortawesome/free-solid-svg-icons';

type Props = {
  title: string;
  claim: string;
  listIds: number[];
}

const CarouselPerceptionsSection: React.FC<Props> = ({
  title,
  claim,
  listIds,
}) => {
  const [testimonios, setTestimonios] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    const promesas = listIds.map(id => 
      fetch(`http://localhost:3010/v1/store/testimonios/${id}`).then(res => res.json())
    );

    Promise.all(promesas)
      .then((resultados) => {
        const validos = resultados.filter(t => t !== null);
        setTestimonios(validos);
      })
      .catch(err => console.error("Error cargando testimonios:", err));
  }, []); 

  useEffect(() => {
    if (!isPaused && testimonios.length > 0) {
      timerRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % testimonios.length);
      }, 5000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, testimonios.length]);

  const getIndex = (offset: number) => {
    const len = testimonios.length;
    if (len === 0) return 0;
    return (currentIndex + offset + len) % len;
  };

  // Si aún no hay testimonios cargados, no renderizamos el carrusel para evitar fallos de índice
  if (testimonios.length === 0) return null;

  const indicesAMostrar = [getIndex(-1), getIndex(0), getIndex(1)];

  return (
    <section className="w-full mx-auto py-20 px-4 overflow-hidden relative">
      {/* Curva superior */}
      <div className="w-full leadimg-[0] z-20 relative">
        <svg viewBox="0 0 1440 80" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
          <path fill="#f1f1f7" d="M0,0 C480,80 960,80 1440,0 L1440,80 L0,80 Z" />
        </svg>
        
      </div>
      <div className="w-full relative bg-[#f1f1f7] py-12 z-10">
        <h2 className="max-w-2xl mx-auto text-[28px] md:text-[40px] font-black text-[#010d3d] text-center whitespace-pre-line mb-15">
          {title}
        </h2>
        <p className="space-y-5 text-[17px] md:text-lg text-[#010d3d] text-center font-semibold max-w-2xl mx-auto mb-15 whitespace-pre-line">
          {claim}
        </p>
      {/* Testimonios */}
      <div 
        className="flex flex-row items-center justify-center gap-4 md:gap-8 min-h-[500px]"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {indicesAMostrar.map((idx, pos) => {
          const testimonio = testimonios[idx];
          if (!testimonio) return null;
          
          const isCenter = pos === 1;

          return (
            <div
              key={`${testimonio.id_testimonio}-${pos}`}
              className={`transition-all duration-700 ease-in-out flex flex-col items-center text-center
                ${isCenter 
                  ? 'z-20 w-full md:w-[450px]' 
                  : 'z-10 scale-90 opacity-50 hidden md:flex md:w-[350px]'}
              `}
            >
              {/* Testimonio */}
              {testimonio && (
                <div className="flex flex-col items-center text-center">
                  <Image
                    src={`/logos/${testimonio.cliente.logo}`}
                    alt={testimonio.cliente.descripcion}
                    width={100}
                    height={60}
                    className="object-contain -mb-12 z-10"
                  />
                  <div className="bg-white p-8 rounded-2xl shadow-xl">
                    <div className="text-[#d1d5db] text-4xl text-left mt-5">
                      <FontAwesomeIcon icon={faQuoteLeft} className="fa-duotone" />
                    </div>
                    <p className="text-[#010d3d] italic font-medium text-lg leading-relaxed max-w-lg">
                      {testimonio.description}
                    </p>
                    <div className="text-[#d1d5db] text-4xl text-right mb-5">
                      <FontAwesomeIcon icon={faQuoteRight} className="fa-duotone" />
                    </div>
                  </div>
                  <div className="w-20 h-20 rounded-full overflow-hidden shadow-sm mb-4 -mt-12">
                    <Image
                      src={`/testimonios/${testimonio.cliente.descripcion.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, "")}.png`}
                      alt={testimonio.persona || 'Foto'}
                      width={64}
                      height={64}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="text-sm text-[#010d3d] leading-snug">
                    <p>{testimonio.persona}</p>
                    <p className="font-bold">{testimonio.cargo}</p>
                    <p className="font-bold">{testimonio.cliente.descripcion}</p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
      {/* Puntos de navegación */}
      <div className="flex justify-center mt-12 gap-3">
        {testimonios.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-3 w-3 transition-all duration-300 rounded-full ${
              currentIndex === index ? 'bg-[#010d3d]' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
      </div>
      {/* Curva inferior */}
      <div className="w-full leadimg-[0] z-20 relative">
        <svg viewBox="0 0 1440 80" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
          <path fill="#f1f1f7" d="M0,80 C480,0 960,0 1440,80 L1440,0 L0,0 Z" />
        </svg>
      </div>
    </section>
  );
};

export default CarouselPerceptionsSection;