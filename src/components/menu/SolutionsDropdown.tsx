"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import API_ENDPOINTS from "@/config/api";
import { Solucion } from "@/types/solucion";
import PackHighlightedButton from "@/components/menu/packHighlightedButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserTie } from "@fortawesome/free-solid-svg-icons";
import { Ambito } from "@/types/ambito";
import { Sector } from "@/types/sector";
import AmbitoSelectModal from "@/components/AmbitoSelectModal";

type Props = {
  mobile?: boolean;
  onNavigate?: () => void; // Callback para cerrar el menú móvil al navegar
};

const SolutionsDropdown = ({ mobile = false, onNavigate }: Props) => {
  const [ambitos, setAmbitos] = useState<Ambito[]>([]);
  const [sectores, setSectores] = useState<Sector[]>([]);
  const [soluciones, setSoluciones] = useState<Solucion[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedSector, setSelectedSector] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [ambitosRes, sectoresRes, solucionesRes] = await Promise.all([
          fetch(API_ENDPOINTS.AMBITOS).then((res) => res.json()),
          fetch(API_ENDPOINTS.SECTORES).then((res) => res.json()),
          fetch(API_ENDPOINTS.HIGLIGHTEDPACKS).then((res) => res.json()),
        ]);

        setAmbitos(ambitosRes);
        setSectores(sectoresRes);
        setSoluciones(solucionesRes);
      } catch (err) {
        console.error("Error al cargar los datos:", err);
        setError("No se pudieron cargar los datos. Inténtalo de nuevo.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <p className={mobile ? "py-2 text-sm text-gray-500" : "text-center text-gray-700"}>Cargando...</p>;
  }

  if (error) {
    return <p className={mobile ? "py-2 text-sm text-red-600" : "text-center text-red-600"}>{error}</p>;
  }

  // Vista móvil
  if (mobile) {
    return (
      <>
        <div className="flex flex-col gap-4 pl-3 pb-3">

          {/* Ámbitos */}
          <div>
            <p className="text-[12px] text-[#010D3D] opacity-50 font-mulish mb-2">
              Elige tu ámbito
            </p>
            <ul className="flex flex-col gap-1">
              {ambitos.map((ambito) => (
                <li key={ambito.id_ambito}>
                  <Link
                    href={`/soluciones/${ambito.slug}`}
                    onClick={onNavigate}
                    className="block py-1 text-[14px] font-bold text-[#010D3D] font-mulish hover:underline"
                  >
                    {ambito.description}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Sectores */}
          <div>
            <p className="text-[12px] text-[#010D3D] opacity-50 font-mulish mb-2">
              Elige tu sector
            </p>
            <ul className="flex flex-col gap-1">
              {sectores.map((sector) => (
                <li key={sector.id_sector}>
                  <span
                    onClick={() => {
                      setSelectedSector(sector.slug);
                      setModalOpen(true);
                    }}
                    className="block py-1 text-[14px] font-bold text-[#010D3D] font-mulish hover:underline cursor-pointer"
                  >
                    {sector.description}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Soluciones destacadas */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <p className="text-[12px] text-[#010D3D] opacity-50 font-mulish">
                Soluciones destacadas con servicio de consultoría
              </p>
              <span className="text-[12px] text-gray-500 whitespace-nowrap ml-2 shrink-0">
                <FontAwesomeIcon icon={faUserTie} className="mr-1 text-[#010D3D]" />
                Incluye consultoría
              </span>
            </div>
            <div className="flex flex-col gap-2">
              {soluciones.map((solucion, index) => (
                <PackHighlightedButton
                  key={index}
                  solucion={solucion}
                />
              ))}
            </div>
            <Link
              href="/soluciones/all"
              onClick={onNavigate}
              className="block text-[#010D3D] text-[13px] font-mulish font-bold mt-3 underline text-right"
            >
              Ver todas nuestras soluciones
            </Link>
          </div>

        </div>

        <AmbitoSelectModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          ambitos={ambitos}
          onSelectAmbito={(ambitoSlug) => {
            onNavigate?.();
            window.location.href = `/soluciones/${ambitoSlug}/sector/${selectedSector}`;
          }}
        />
      </>
    );
  }

  // Vista desktop
  return (
    <>
      <div className="absolute w-screen bg-[#f8f8fa] shadow-md z-50 p-8 w-full rounded-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-40 gap-8">

            {/* Columna 1: Ámbitos */}
            <div className="col-span-9">
              <h3 className="mb-4 text-[14px] text-[#010D3D] opacity-50 font-mulish leading-[20px]">Elige tu ámbito</h3>
              <ul className="space-y-2 ml-[10px]">
                {ambitos.map((ambito) => (
                  <li key={ambito.id_ambito} className="text-[14px] text-[#010D3D] font-bold leading-[20px] mt-[-7.5px]">
                    <Link
                      href={`/soluciones/${ambito.slug}`}
                      className="hover:underline font-mulish text-[14px] text-[#010D3D] font-bold leading-[26px]"
                    >
                      {ambito.description}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Columna 2: Sectores */}
            <div className="col-span-8">
              <h3 className="mb-4 text-[14px] text-[#010D3D] opacity-50 font-mulish leading-[20px]">Elige tu sector</h3>
              <ul className="space-y-2 ml-[10px]">
                {sectores.map((sector) => (
                  <li key={sector.id_sector} className="text-[14px] text-[#010D3D] font-bold leading-[20px] mt-[-7.5px]">
                    <span
                      onClick={() => {
                        setSelectedSector(sector.slug);
                        setModalOpen(true);
                      }}
                      className="hover:underline font-mulish text-[14px] text-[#010D3D] font-bold leading-[26px] cursor-pointer"
                    >
                      {sector.description}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Columna 3: Soluciones destacadas */}
            <div className="col-span-23">
              <div className="grid grid-cols-2">
                <h3 className="mb-4 text-[14px] text-[#010D3D] opacity-50 font-mulish leading-[20px]">
                  Soluciones destacadas con servicio de consultoría
                </h3>
                <h3 className="mb-4 text-[14px] text-[#010D3D] opacity-50 font-mulish leading-[20px] text-right">
                  <span className="ml-2 text-gray-500 text-sm">
                    <FontAwesomeIcon icon={faUserTie} className="mr-2 text-[20px] text-[#010D3D] opacity-100" />
                    Incluye consultoría
                  </span>
                </h3>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {soluciones.map((solucion, index) => (
                  <PackHighlightedButton key={index} solucion={solucion} />
                ))}
              </div>
              <Link
                href="/soluciones/all"
                className="block text-[#010D3D] text-[14px] font-mulish font-bold mt-4 text-right underline"
              >
                Ver todas nuestras soluciones
              </Link>
            </div>

          </div>
        </div>
      </div>

      <AmbitoSelectModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        ambitos={ambitos}
        onSelectAmbito={(ambitoSlug) => {
          window.location.href = `/soluciones/${ambitoSlug}/sector/${selectedSector}`;
        }}
      />
    </>
  );
};

export default SolutionsDropdown;