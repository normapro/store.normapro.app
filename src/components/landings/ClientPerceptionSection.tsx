'use client';

import React, { useEffect, useState } from 'react';
import Formulario from "@/components/Formulario";
import Image from 'next/image';
import { TestimonioConCliente } from '@/types/testimonio';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faQuoteLeft, faQuoteRight } from '@fortawesome/free-solid-svg-icons';



type Elemento = {
  title: string;
  claim: string;
}

type ClientPerceptionSectionProps = {
  title: string;
  items?: string | string[];
  list?: Elemento[];
  id_testimonio?: number;
  downtext?: string;
  supertitle?: string;
  image?: string;
  subtitle?: string;
};

const ClientPerceptionSection: React.FC<ClientPerceptionSectionProps> = ({
  title,
  items = [],
  list = [],
  id_testimonio,
  downtext,
  supertitle,
  image,
  subtitle
}) => {
  const [testimonio, setTestimonio] = useState<TestimonioConCliente | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const itemsList = Array.isArray(items) ? items : items ? [items] : [];

  useEffect(() => {
    if (!id_testimonio) return;

    fetch("http://localhost:3010/v1/store/testimonios?maxItems=100")
      .then(async (res) => {
        if (!res.ok) {
          throw new Error("No se pudieron cargar los testimonios");
        }
        return res.json();
      })
      .then((data) => {
        const testimonios = Array.isArray(data) ? data : [];
        const selected = testimonios.find(
          (t) => Number(t?.id_testimonio) === Number(id_testimonio)
        );

        if (selected && selected.cliente && selected.description) {
          setTestimonio(selected);
          return;
        }

        setTestimonio(null);
      })
      .catch(() => setTestimonio(null));
  }, [id_testimonio]);

  /*
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
          logo: 'Somajasa@2x.png',
          logoType: 'square'
        }
      });
    }, []);
  */

  const weights = ["bold", "semibold"];

  return (
    <section className="w-full relative py-24 overflow-hidden ">
      {/* Curva superior */}
      <div className="w-full leadimg-[0] z-20 relative">
        <svg viewBox="0 0 1440 80" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
          <path fill="#f1f1f7" d="M0,0 C480,80 960,80 1440,0 L1440,80 L0,80 Z" />
        </svg>
      </div>

      <div className="w-full relative bg-[#f1f1f7] py-12 z-10">
        {supertitle && (
          <h1 className="text-center text-[#010d3d] mb-20 mt-25 font-extrabold text-5xl md:text-5xl ">
            {supertitle}
          </h1>
        )}

        {subtitle && (
          <h2 className="text-[25px] font-[1000] text-[#797F98] mb-10 whitespace-pre-line mx-auto text-center max-w-3xl ">
            {subtitle}
          </h2>
        )}

        {image && (
          <div className="text-center mb-8 mt-20">
            <img
              src={`/${image}`}
              alt={`Imagen de presentación`}
              width="60%"
              className="mx-auto mb-30"
            />
          </div>
        )}

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
          {/* Texto izquierdo */}
          <div>
            <h2 className="text-3xl md:text-4xl font-black text-[#010d3d] mb-8">
              {title}
            </h2>
            <ul className="space-y-4 text-lg text-[#1a1a1a] mb-8 whitespace-pre-line">
              {itemsList.map((item, index) => (
                <li key={index} className="text-[#010d3d] flex items-start leading-tight">
                  <span key={index} style={{ fontWeight: weights[index % weights.length] }}>
                    {item + " "}
                  </span>
                </li>
              ))}
            </ul>
            <ul className="space-y-4 text-lg text-[#1a1a1a] ">
              {list.map((item, index) => (
                <li key={index} className="flex items-start leading-tight gap-2">
                  <div className="text-[#010d3d] text-2xl mt-1">
                    <FontAwesomeIcon icon={faCheckCircle} className="fa-duotone" />
                  </div>
                  <span className="font-bold">
                    {item.title} <span className="font-medium"> {item.claim} </span>
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Testimonio derecho */}
          {testimonio && (
            <div className="flex flex-col items-center text-center">
              {/** Soporta ambas variantes del backend: description/descripcion */}
              {(() => {
                const clientName = (testimonio.cliente as any).descripcion || testimonio.cliente.description;
                const imageSlug = clientName
                  ? clientName.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, "")
                  : "default";

                return (
                  <>
                    <Image
                      src={`/logos/${testimonio.cliente.logo}`}
                      alt={clientName}
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
                        src={`/testimonios/${imageSlug}.png`}
                        alt={testimonio.persona || 'Foto'}
                        width={64}
                        height={64}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div className="text-sm text-[#010d3d] leading-snug">
                      <p>{testimonio.persona}</p>
                      <p className="font-bold">{testimonio.cargo}</p>
                      <p className="font-bold">{clientName}</p>
                    </div>
                  </>
                );
              })()}
            </div>
          )}
        </div>
        <div className="flex justify-center mt-16">
          <button
            onClick={() => setOpenModal(true)}
            className="bg-[#010d3d] text-white font-bold px-6 py-3 rounded-xl shadow-md hover:bg-[#04176f] transition"
          >
            Quiero una demostración
          </button>

        </div>

        {/* Texto de debajo del boton*/}
        {downtext && (
          <p className="text-center text-[#010d3d] mt-4 max-w-2xl mx-auto text-lg font-extrabold max-w-3xl mt-20 mb-25">
            {downtext}
          </p>)}
      </div>

      {/* Curva inferior */}
      <div className="w-full leadimg-[0] z-20 relative">
        <svg viewBox="0 0 1440 80" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
          <path fill="#f1f1f7" d="M0,80 C480,0 960,0 1440,80 L1440,0 L0,0 Z" />
        </svg>
      </div>

      {/* Formulario contacto */}
      {openModal && (
        <Formulario onClose={() => setOpenModal(false)} />
      )}
    </section>
  );
};

export default ClientPerceptionSection;
