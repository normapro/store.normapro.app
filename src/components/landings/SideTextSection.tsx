'use client'

import { FC, useState } from 'react';
import Formulario from "@/components/Formulario";

type Props = {
  title: string;
  claim: string;
  pragma: string;
  buttonText: string;
};

const SideTextSection: FC<Props> = ({
  title,
  claim,
  pragma,
  buttonText
}) => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <section className="w-full bg-[#eaeaf2] py-16 px-6 md:px-12">
      <div className="max-w-7xl mx-auto flex flex-col gap-10">
        <div className="flex flex-col md:flex-row justify-between gap-10">
          {/* Columna izquierda */}
          <div className="md:w-1/2 max-w-xl">
            {title && (
              <h2 className="text-xl md:text-2xl font-black text-[#010d3d] leading-tight">
                {title}
              </h2>
            )}
          </div>
          {/* Columna derecha */}
          <div className="md:w-1/2 max-w-xl">
            {pragma && (
              <p className="text-sm md:text-base text-[#010d3d] mb-6 leading-tight">
                {pragma}
              </p>
            )}
            {claim && (
              <p className="text-sm md:text-base font-bold text-[#010d3d] leading-tight">
                {claim}
              </p>
            )}
          </div>
        </div>

        {/* Botón */}
        <div className="flex justify-center">
          <button
              onClick={() => setOpenModal(true)}
              className="bg-[#010d3d] text-white font-bold px-6 py-3 rounded-xl shadow-md hover:bg-[#04176f] transition"
            >
              {buttonText}
            </button>
        </div>
      </div>
      {/* Formulario contacto */}
      {openModal && (
        <Formulario onClose={() => setOpenModal(false)} />
      )}
    </section>
  );
};

export default SideTextSection;