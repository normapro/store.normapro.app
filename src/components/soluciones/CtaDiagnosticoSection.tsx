"use client";

import { useState } from "react";
import Formulario from "@/components/Formulario";

// Llamada a la acción final de los listados de soluciones, con el formulario en modal.
const CtaDiagnosticoSection = () => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <section className="py-14 px-6 mt-10">
        <div className="max-w-7xl mx-auto text-center">
          <h3 className="text-[#0a1b55] font-extrabold text-[25px] leading-tight mb-7">
            Descubre cómo podemos ayudar a tu empresa
          </h3>

          <button
            type="button"
            onClick={() => setOpenModal(true)}
            className="bg-gradient-to-r from-[#00b2e3] to-[#cca1dd] shadow-md text-white text-[17px] leading-none px-12 py-5 rounded-2xl font-bold hover:opacity-90 transition"
          >
            Reserva un diagnóstico gratuito
          </button>
        </div>
      </section>

      {openModal && <Formulario onClose={() => setOpenModal(false)} />}
    </>
  );
};

export default CtaDiagnosticoSection;
