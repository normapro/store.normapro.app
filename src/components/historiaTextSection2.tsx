'use client'
import { FC, useState } from 'react';
import Formulario from "@/components/Formulario";
import { useSiteRef } from '@/context/SiteContext';

type Props = {
  title: string;
  claim: string[];
  buttonText?: string;
  image?: string;
}

const HistoriaTextSection2: FC<Props> = ({ title, claim, buttonText, image }) => {
  const [openModal, setOpenModal] = useState(false);
  const ref = useSiteRef();
  const isInstituto = ref === "instituto";

  const theme = {
    textColorTitle: isInstituto ? "text-[#FFFFFF]" : "text-[#010D3D]",
    textColorClaim: isInstituto ? "text-[#FFFFFF]" : "text-[#7F859D]",
  }

  return (
    <div
      className={isInstituto ? "relative" : ""}
      style={isInstituto ? { background: "linear-gradient(to bottom, #010D3D 70%, transparent 50%)" } : {}}
    >
      <section className="w-full py-6 px-6 flex flex-col items-center text-center max-w-4xl mx-auto">

        {/* Title y claim */}
        <div className={isInstituto
          ? "flex flex-row items-start gap-8 mb-12 w-full text-left"
          : "flex flex-col items-center mb-12 w-full"
        }>
          <h2 className={theme.textColorTitle + " text-2xl md:text-[32px] font-black leading-tight" + (isInstituto ? " flex-1" : " mb-8")}>
            {title}
          </h2>
          <div className={isInstituto ? "flex-1 space-y-6" : "space-y-6 w-full"}>
            {claim.map((paragraph, index) => (
              <p
                key={index}
                className={theme.textColorClaim + " text-xl md:text-2xl font-extrabold leading-relaxed"}
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        {/* Botón */}
        {buttonText && (
          <button
            onClick={() => setOpenModal(true)}
            className="self-center bg-[#010d3d] text-white font-bold px-6 py-3 rounded-xl shadow-md hover:bg-[#04176f] transition"
          >
            {buttonText}
          </button>
        )}

        {/* Imagen */}
        {image && (
          <div className="w-full">
            <img
              src={`/historiasclientes/${image}`}
              alt={image}
              className="w-full h-auto object-cover max-h-[600px] shadow-xl"
            />
          </div>
        )}

        {/* Formulario contacto */}
        {openModal && <Formulario onClose={() => setOpenModal(false)} />}
      </section>
    </div>
  );
};

export default HistoriaTextSection2;