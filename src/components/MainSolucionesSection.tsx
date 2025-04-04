// components/MainSolucionesSection.tsx
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {Pack} from "@/types/pack";
import API_ENDPOINTS from "@/config/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLaptop } from "@fortawesome/pro-duotone-svg-icons";



const MainSolucionesSection = () => {
  const [packs, setPacks] = useState<Pack[]>([]);

  useEffect(() => {
    const fetchPacks = async () => {
      const response = await fetch(`${API_ENDPOINTS.MAINPACKS}`);
      const data = await response.json();
      setPacks(data);
    };

    fetchPacks();
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-6 py-12">
      <h2 className="text-center text-[32px] font-bold text-[#010D3D] mb-4">Soluciones</h2>
      <p className="text-center text-[#010D3D] max-w-3xl mx-auto mb-6">
        Todo lo que necesitas para tener tu empresa o el área de la que eres responsable bajo control,
        agilizar procesos internos del negocio y cumplir con la normativa.
      </p>

      <div className="flex justify-center mb-10">
        <div className="flex gap-6 bg-[#f3f3f7] px-6 py-3 rounded-xl text-[#010D3D] font-bold items-center">
          <span className="flex items-center gap-2">
          <FontAwesomeIcon icon={faLaptop} className="text-[20px] text-blue-600" />
            Tecnología NormaPro
          </span>
          <span className="text-xl">+</span>
          <span className="flex items-center gap-2">
            <Image src="/icons/consultor.svg" width={20} height={20} alt="consultor" />
            Consultores expertos
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {packs.map((pack) => (
          <div
            key={pack.id_pack}
            className="bg-[#EAF8FE] p-6 rounded-xl text-[#010D3D] shadow-sm"
          >
            <Image
              src={pack.uriIcon ? `/main/${pack.uriIcon}` : "/main/default-icon.png"}
              alt={pack.description}
              width={120}
              height={100}
              className="mx-auto object-contain mb-4"
            />
            <h3 className="text-xl font-bold mb-2">{pack.description}</h3>
            <p className="text-sm mb-6">{pack.shortDescription}</p>
            <div className="flex justify-between items-center text-sm font-semibold">
              <Link href={`/soluciones/${pack.slug}`} className="underline">
                Saber más
              </Link>
              <Link
                href={`/contacto?pack=${pack.id_pack}`}
                className="bg-gradient-to-r from-[#00b2e3] to-[#cca1dd] text-white px-4 py-2 rounded-lg"
              >
                Contratar ahora
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MainSolucionesSection;
