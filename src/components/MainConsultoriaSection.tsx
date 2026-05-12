// components/MainConsultoriaSection.tsx
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {Consultoria} from "@/types/consultoria";
import API_ENDPOINTS from "@/config/api";




const MainConsultoriaSection = () => {
  const [consultorias, setConsultorias] = useState<Consultoria[]>([]);

  useEffect(() => {
    const fetchConsultorias = async () => {
      const response = await fetch(`${API_ENDPOINTS.CONSULTORIA}`);
      const data = await response.json();
      setConsultorias(data);
    };

    fetchConsultorias();
  }, []);

  return (
    <div className="bg-[#F2F2F5]">
    <section className="max-w-7xl mx-auto px-6 py-12">
      <h2 className="text-center text-[32px] font-black text-[#010D3D] mb-4">Consultoría estratégica</h2>
      <p className="text-center text-[#010D3D] max-w-3xl mx-auto mb-6">
      Programas de Consultoría Estratégica basados en la Plataforma Digital NormaPro dirigidos por un equipo de profesionales con más de 20 años de experiencia y especializados en Ingeniería y Compliance.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {consultorias.map((consultoria) => (
          <div
            key={consultoria.id_consultoria}
            className="bg-[#FFFFFF] p-6 rounded-xl text-[#010D3D]  h-[500px] relative"
          >
            <Image
              src={consultoria.uriIcon ? `/main/${consultoria.uriIcon}` : "/main/default-icon.png"} 
              alt={consultoria.description}
              width={280}
              height={199}
              className="mx-auto object-contain mb-4 mt-4 h-[200px]"
            />  
            <h3 className="text-[24px] font-extrabold mb-2 ">{consultoria.description}</h3>
            <p className="text-sm mb-6">{consultoria.shortDescription}</p>
            <div className="absolute bottom-[20px] left-6 right-6 flex flex-col gap-3 text-sm font-semibold sm:flex-row sm:items-center sm:justify-between">
              <Link href={`/soluciones/${consultoria.slug}`} className="underline font-bold text-[#010D3D]">
                Saber más
              </Link>
              <Link
                href={`/contacto?consultoria=${consultoria.id_consultoria}`}
                className="bg-gradient-to-r from-[#00b2e3] to-[#cca1dd] text-white px-4 py-2 rounded-lg text-center"
              >
                Contratar ahora
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
    </div>
  );
};

export default MainConsultoriaSection;
