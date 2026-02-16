'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { TestimonioConCliente } from '@/interfaces/testimonio';

type ClientPerceptionSectionProps = {
  title: string;
  items: string[];
  id_testimonio: number;
};

const ClientPerceptionSection: React.FC<ClientPerceptionSectionProps> = ({
  title,
  items,
  id_testimonio
}) => {
  const [testimonio, setTestimonio] = useState<TestimonioConCliente | null>(null);
  /*
  useEffect(() => {
    fetch(`http://localhost:3010/v1/getTestimonio?id=${id_testimonio}`)
      .then((res) => res.json())
      .then(setTestimonio)
      .catch(console.error)
    });
  }, [id_testimonio]);
  */


  useEffect(() => {
    // Demo estático (puedes cambiar por fetch real)
    setTestimonio({
      id_testimonio: 3,
      id_cliente: 1,
      description:
        'Una plataforma en evolución continua con muchas posibilidades de adaptación.',
      persona: 'José María Comas Hermoso',
      cargo: 'Director RRHH y Compliance Officer',
      miniImg: '/testimonios/josecomas.png',
      cliente: {
        id_cliente: 1,
        description: 'SOMAJASA',
        url: 'https://www.somajasa.es',
        logo: 'somajasa.svg',
        logoType: 'square'
      }
    });
  }, []);

  return (
    <section className="w-full relative py-24 overflow-hidden">
      {/* Curva superior */}
      <div className="absolute top-0 left-0 w-full">
        <svg viewBox="0 0 1440 80" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
          <path fill="#f1f1f7" d="M0,0 C480,80 960,80 1440,0 L1440,80 L0,80 Z" />
        </svg>
        
      </div>
      <div className="w-full relative bg-[#f1f1f7] py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
        {/* Texto izquierdo */}
        <div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#010d3d] mb-8">
            {title}
          </h2>
          <ul className="space-y-4 text-lg text-[#1a1a1a]">
            {items.map((item, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-[#00b2e3] mt-1">✔</span>
                <span className="font-semibold">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Testimonio derecho */}
        {testimonio && (
          <div className="bg-white p-8 rounded-2xl shadow-xl flex flex-col items-center text-center">
            <Image
              src={`/logos/${testimonio.cliente.logo}`}
              alt={testimonio.cliente.description}
              width={100}
              height={60}
              className="object-contain mb-6"
            />
            <p className="text-[#010d3d] italic font-medium text-lg mb-4 leading-relaxed max-w-lg">
              “{testimonio.description}”
            </p>
            <div className="text-sm text-gray-700 leading-snug">
              <strong className="block text-[#010d3d]">{testimonio.persona}</strong>
              {testimonio.cargo}
            </div>
            {testimonio.miniImg && (
              <div className="w-16 h-16 mt-6 rounded-full overflow-hidden border-2 border-gray-300 shadow-sm">
                <Image
                  src={testimonio.miniImg}
                  alt={testimonio.persona || 'Foto'}
                  width={64}
                  height={64}
                  className="object-cover w-full h-full"
                />
              </div>
            )}
          </div>
        )}
      </div>
      <div className="flex justify-center mt-16">
        <button className="bg-[#010d3d] text-white py-3 px-6 rounded-xl font-bold">
          Quiero una demostración
        </button>
      </div>
      </div>
      {/* Curva inferior */}
      <div className="absolute bottom-0 left-0 w-full">
        <svg viewBox="0 0 1440 80" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
          <path fill="#f1f1f7" d="M0,80 C480,0 960,0 1440,80 L1440,0 L0,0 Z" />
        </svg>
      </div>
    </section>
  );
};

export default ClientPerceptionSection;
