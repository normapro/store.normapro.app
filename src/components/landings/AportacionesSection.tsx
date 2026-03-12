'use client';

import React, { useEffect, useState } from "react";
import Formulario from "@/components/Formulario";

type Aportacion = {
  image: string;
  imageBackground: string;
  title: string;
  claim: string;
  items: string[];
  buttonText: string;
}

type Props = {
  title: string;
  claim: string;
  aportaciones: Aportacion[];
}

const AportacionesSection: React.FC<Props> = ({
  title,
  claim,
  aportaciones
}) => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <section className="max-w-7xl mx-auto w-full flex flex-col items-center justify-center py-10 px-6 md:px-12">
      <h2 className="max-w-5xl text-2xl md:text-[38px] font-black text-[#010d3d] text-center mb-8">
        {title}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start w-full">
        <p className="text-xs md:text-base font-extrabold text-[#010d3d] self-center">
          {claim}
        </p>

        {/* Tatjetas */}
        {aportaciones.map((tarjeta, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-center"
          >
            {/* Imagen */}
            <div className="relative w-64 h-64 flex items-center justify-center -mb-10">
              <img
                src={`/apps/${tarjeta.imageBackground}`}
                alt=""
                className="absolute inset-0 w-full h-full object-contain"
              />
              <img
                src={`/apps/${tarjeta.image}`}
                alt={tarjeta.title}
                className="relative w-64 h-64 object-contain z-2"
              />
            </div>
            <div className="bg-[#f5f5f7] rounded-2xl p-8 text-left z-1">
            {/* Texto */}
            <h3 className="text-2xl font-black text-[#010d3d] mb-6">
              {tarjeta.title}
            </h3>
            <p className="text-base text-[#010d3d] font-bold mb-6">
              {tarjeta.claim}
            </p>
            <ul className="text-sm text-[#010d3d] space-y-2 mt-2">
              {tarjeta.items.map((item, i) => (
                <li key={i} className="flex gap-2 mb-4">
                  <span>•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <button
              onClick={() => setOpenModal(true)}
              className="mt-4 border border-[#010d3d] bg-white rounded-lg px-6 py-2 font-semibold text-[#010d3d] hover:bg-[#010d3d] hover:text-white transition"
            >
              {tarjeta.buttonText}
            </button>
            </div>
          </div>
        ))}
      </div>
      {/* Formulario contacto */}
      {openModal && (
        <Formulario onClose={() => setOpenModal(false)} />
      )}
    </section>
  )
}
 export default AportacionesSection;