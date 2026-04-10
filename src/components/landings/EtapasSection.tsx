'use client';

import { FC, useState } from 'react';
import Formulario from "@/components/Formulario";

type Etapa = {
  imgBackground?: string;
  image: string;
  title: string;
  objective: string;
  claim?: string;
  list?: string[];
};

type Props = {
  title: string;
  subtitle: string;
  claim: string;
  etapas: Etapa[];
  buttonText: string;
};

const EtapasSection: FC<Props> = ({
  title,
  subtitle,
  claim,
  etapas,
  buttonText,
}) => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <section className="max-w-7xl mx-auto w-full flex flex-col items-center justify-center py-10 px-6 md:px-12">
      <div className="max-w-xl mx-auto text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-black text-[#010d3d] mb-8">
          {title}
        </h2>
        <p className="text-xl md:text-2xl font-extrabold text-[#797f98] mb-8">
          {subtitle}
        </p>
        <p className="text-base text-[#010d3d] max-w-2xl mx-auto whitespace-pre-line">
          {claim}
        </p>
      </div>

      {/* Etapas */}
      <div className="relative max-w-6xl mx-auto w-full">
        {etapas.map((etapa, index) => {
          const isLeft = index % 2 === 0;
          const isFirst = index === 0;
          const isLast = index === etapas.length - 1;

          return (
            <div
              key={index}
              className={`relative flex flex-col mb-16 last:mb-0 md:items-start ${
                isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
            >
              {/* Línea por tramos */}
              <div className="absolute left-3 md:left-1/2 -translate-x-1/2 h-full w-[10px]">
                {!isLast && (
                  <div className="absolute top-0 bottom-0 left-0 right-0 bg-[#0a1a44]" />
                )}
                {!isFirst && (
                  <div className="absolute -top-16 h-16 left-0 right-0 bg-[#0a1a44]" />
                )}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-10 h-10 bg-white border-10 border-[#0a1a44] rounded-full z-10" />
              </div>

              {/* Contenido*/}
              <div
                className={`w-full pl-10 md:pl-0 md:w-1/2 flex flex-col justify-center md:items.start md:text-left text-[#010d3d]' ${
                  isLeft ? 'md:pr-16' : 'md:pl-16'
                }`}
              >
                <p className="text-3xl font-semibold mb-6">
                  Etapa {index + 1}
                </p>

                <h3 className="text-2xl md:text-4xl font-black mb-4">
                  {etapa.title}
                </h3>

                <p className="text-base font-bold mb-3">
                  {etapa.objective}
                </p>

                {etapa.claim && (
                  <p className="text-base">
                    {etapa.claim}
                  </p>
                )}

                {etapa.list && etapa.list.length > 0 && (
                  <ul className="list-disc list-outside ml-5 space-y-4 text-base font-bold text-[#010d3d] mb-10">
                    {etapa.list.map((item, i) => (
                      <li key={i} className="pl-2">
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Imagen*/}
              <div
                className={`hidden md:flex md:w-1/2 justify-center mt-6 md:mt-0 ${
                  isLeft ? 'md:justify-start md:pl-16' : 'md:justify-end md:pr-16'
                }`}
              >
                <div className="relative w-[300px] flex justify-center items-center">
                  {etapa.imgBackground && (
                    <img
                      src={`/apps/${etapa.imgBackground}`}
                      alt=""
                      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] max-w-none"
                    />
                  )}

                  <img
                    src={`/apps/${etapa.image}`}
                    alt={etapa.title}
                    className="relative z-10 h-[240px] object-contain"
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Botón */}
      <div className="text-center mt-10">
        <button
          onClick={() => setOpenModal(true)}
          className="bg-[#010d3d] text-white font-bold px-6 py-3 rounded-xl shadow-md hover:bg-[#04176f] transition"
        >
          {buttonText}
        </button>
      </div>

      {/* Formulario contacto */}
      {openModal && (
        <Formulario onClose={() => setOpenModal(false)} />
      )}
    </section>
  );
};

export default EtapasSection;