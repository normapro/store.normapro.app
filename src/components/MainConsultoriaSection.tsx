// components/MainConsultoriaSection.tsx
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {Consultoria} from "@/types/consultoria";
import API_ENDPOINTS from "@/config/api";
import Formulario from "@/components/Formulario";
import { Suspense } from "react";


const MainConsultoriaSectionContent = ({ isInstituto = false }: { isInstituto?: boolean }) => {
  const [consultorias, setConsultorias] = useState<Consultoria[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const consultoriaParam = searchParams.get("consultoria");

  useEffect(() => {
    setOpenModal(Boolean(consultoriaParam));
  }, [consultoriaParam]);

  useEffect(() => {
    const fetchConsultorias = async () => {
      const response = await fetch(`${API_ENDPOINTS.CONSULTORIA}`);
      const data = await response.json();
      setConsultorias(data);
    };

    fetchConsultorias();
  }, []);

  const handleOpenContact = (consultoriaId: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("consultoria", String(consultoriaId));
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const handleCloseContact = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("consultoria");
    const nextQuery = params.toString();
    const nextUrl = nextQuery ? `${pathname}?${nextQuery}` : pathname;
    router.push(nextUrl, { scroll: false });
    setOpenModal(false);
  };

  const theme = {
    general: isInstituto ? "bg-[#010D3D] text-[#FFFFFF]" : "bg-[#F2F2F5] text-[#010D3D]",
    cards: isInstituto ? "bg-[#343d64]" : "bg-[#FFFFFF]",
    title: isInstituto ? "Programas de consutoría" : "Consultoría estratégica",
    description: isInstituto ? "Completos programas de consultoría dirigidos por un equipo de prefesionales con más de 20 años de experiencia y especializados en Ingeniería y Compliance." : "Programas de Consultoría Estratégica basados en la Plataforma Digital NormaPro dirigidos por un equipo de profesionales con más de 20 años de experiencia y especializados en Ingeniería y Compliance."
  }

  return (
    <div className={theme.general}>
    <section className="max-w-7xl mx-auto px-6 py-12">
      <h2 className="text-center text-[32px] font-black mb-4">{theme.title}</h2>
      <p className="text-center max-w-3xl mx-auto mb-6">
        {theme.description}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {consultorias.map((consultoria) => (
          <div
            key={consultoria.id_consultoria}
            className={theme.cards + " p-6 rounded-xl flex flex-col"}
          >
            <Image
              src={consultoria.uriIcon ? `/main/${consultoria.uriIcon}` : "/main/default-icon.png"} 
              alt={consultoria.description}
              width={280}
              height={199}
              className="mx-auto object-contain mb-4 mt-4 h-[200px]"
            />  
            <h3 className="text-[24px] font-extrabold mb-2 ">{consultoria.description}</h3>
            <p className="text-sm flex-1">{consultoria.shortDescription}</p>
            <div className="flex flex-col gap-3 text-sm font-semibold sm:flex-row sm:items-center sm:justify-between mt-6">
              <Link
                href={`https://store.normapro.es/consultorias/${consultoria.slug}?ref=instituto`} className="underline font-bold"
                target="_blank" rel="noopener noreferrer"
              >
                Saber más
              </Link>
              <button
                type="button"
                onClick={() => handleOpenContact(consultoria.id_consultoria)}
                className="bg-gradient-to-r from-[#00b2e3] to-[#cca1dd] text-white px-4 py-2 rounded-lg text-center"
              >
                Contratar ahora
              </button>
            </div>
          </div>
        ))}
      </div>

      {openModal && <Formulario onClose={handleCloseContact} />}
    </section>
    </div>
  );
};

const MainConsultoriaSection = ({ isInstituto = false }: { isInstituto?: boolean}) => (
  <Suspense fallback={null}>
    <MainConsultoriaSectionContent isInstituto={isInstituto} />
  </Suspense>
);

export default MainConsultoriaSection;
