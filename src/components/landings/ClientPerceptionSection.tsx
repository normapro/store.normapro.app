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
      .catch(()=>{
        return ({
            "id_testimonio": 3,
            "id_cliente": 1,
            "description": "Una plataforma en evolución continua...",
            "persona": "José María Comas Hermoso",
            "cargo": "Director RRHH y Compliance Officer",
            "miniImg": "/testimonios/jose-comas.jpg",
            "cliente": {
              "id_cliente": 1,
              "description": "SOMAJASA",
              "url": "https://www.somajasa.es",
              "logo": "somajasa.svg",
              "logoType": "square"
            }
          });
        
        console.error;

    }


        
      );


  }, [id_testimonio]);*/
  useEffect(() => {
    // modo sin API para desarrollo o pruebas
    setTestimonio({
      id_testimonio: 3,
      id_cliente: 1,
      description: "Una plataforma en evolución continua...",
      persona: "José María Comas Hermoso",
      cargo: "Director RRHH y Compliance Officer",
      miniImg: "/testimonios/jose-comas.jpg",
      cliente: {
        id_cliente: 1,
        description: "SOMAJASA",
        url: "https://www.somajasa.es",
        logo: "somajasa.svg",
        logoType: "square"
      }
    });
  }, []);

  return (
    <section className="w-full bg-[#f1f1f7] py-16 px-6 flex flex-col gap-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-[30px] md:text-[36px] font-extrabold text-[#010d3d] mb-6">
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
          <div className="mt-8 flex gap-4">
            <button className="bg-gradient-to-r from-[#00b2e3] to-[#cca1dd] text-white px-6 py-3 rounded-xl font-semibold shadow-md">
              Contratar ahora
            </button>
            <button className="border-2 border-[#010d3d] text-[#010d3d] px-6 py-3 rounded-xl font-semibold">
              Quiero una demostración
            </button>
          </div>
        </div>

        {testimonio && (
          <div className="bg-white p-8 rounded-xl shadow-xl relative">
            <div className="mb-4">
              <Image
                src={`/logos/${testimonio.cliente.logo}`}
                alt={testimonio.cliente.description}
                width={120}
                height={60}
                className="mb-4 object-contain h-auto"
              />
              <p className="italic text-gray-700 mb-4">
                <strong className="block mb-2 text-lg text-[#010d3d]">
                  {testimonio.description}
                </strong>
                {testimonio.persona && (
                  <>
                    <span>{testimonio.persona}</span>
                    <br />
                    <span className="text-sm text-gray-500">
                      {testimonio.cargo}
                    </span>
                  </>
                )}
              </p>
              {testimonio.miniImg && (
                <div className="w-16 h-16 mt-4 rounded-full overflow-hidden border-2 border-gray-300">
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
          </div>
        )}
      </div>
    </section>
  );
};

export default ClientPerceptionSection;
