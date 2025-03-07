"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import API_ENDPOINTS from "@/config/api";
import { Cliente } from "@/types/cliente";
import { Sector } from "@/types/sector";

interface SolutionsHeroSectorProps {
  sectorSlug: string;
}

const SolutionsHeroSector = ({ sectorSlug }: SolutionsHeroSectorProps) => {
  const [sector, setSector] = useState<Sector | null>(null);
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSectorData = async () => {
      try {
        const response = await fetch(`${API_ENDPOINTS.SECTOR_INFO}/${sectorSlug}`);
        if (!response.ok) throw new Error("Error al obtener el sector");
        const data = await response.json();
        setSector(data);
      } catch (err) {
        console.error(err);
        setError("No se pudo cargar la información del sector.");
      }
    };

    const fetchClientes = async () => {
      try {
        const response = await fetch(`${API_ENDPOINTS.CLIENTES}?scope=${sectorSlug}&limit=5`);
        if (!response.ok) throw new Error("Error al obtener los clientes");
        const data = await response.json();
        setClientes(data);
      } catch (err) {
        setError("No se pudieron cargar los clientes.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSectorData();
    fetchClientes();
  }, [sectorSlug]);
//backgroundImage: `url('/${sector?.backgroundImagea ?? "/default-sector.png"}')`,
  return (
    <>
      <section className="relative w-full h-[400px] flex items-center bg-center bg-no-repeat bg-cover" style={{ backgroundImage: `url('/${sector?.backgroundImage ?? "/default-sector.png"}')` }}>

        
        {/* Fondo oscuro con desenfoque */}
        <div className="absolute inset-0"></div>
        <div className="w-full">
          <div className="container max-w-7xl mx-auto px-6">
          <div className="relative max-w-2xl p-8 bg-[#ffffff50] backdrop-blur-md shadow-lg rounded-lg text-[#010D3D]">
            <h1 className="text-[32px] font-extrabold">{sector?.titleweb || "Sector"}</h1>
            <p className="mt-4 text-[16px] text-[#010D3D] font-bold">
              {sector?.descriptionweb || "Descripción del sector en detalle. Lorem ipsum dolor sit amet..."}
            </p>
            <Link href="/contacto">
              <button className="mt-6 bg-gradient-to-r from-[#00b2e3] to-[#cca1dd] text-white text-[16px] px-6 py-2  rounded-lg font-semibold hover:opacity-50 transition">
                Solicita un diagnóstico gratuito
              </button>
            </Link>
          </div>
          </div>
        </div>
      </section>

      {/* Sección de clientes */}
      <div className="max-w-7xl mx-auto px-6 mt-10">
       
        {isLoading ? (
          <p className="text-center text-gray-500">Cargando clientes...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : clientes.length > 0 ? (
          <>
          
          <div className="grid grid-cols-7 gap-2">
          <h3 className="text-[#7F859D] font-bold mb-4 justify-left col-span-2">Ya confían en nosotros</h3>
            {clientes.map((cliente) => (
              <Link key={cliente.id_cliente} href={cliente.url} target="_blank" rel="noopener noreferrer">
                <Image
                  src={`/logos/${cliente.logo}`}
                  alt={cliente.description}
                  width={120}
                  height={40}
                  className="object-contain h-10"
                />
              </Link>

            ))}
          </div>
          </>
        ) : (
          <> </>
        )}
      </div>
      <div className="h-[1px] bg-[#7F859D50] max-w-7xl mx-auto px-6 mt-8 mb-6"></div>
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-[#010D3D] font-bold mb-4 text-[20px] font-mulish mb-6">Productos para {sector?.prefijo} {sector?.titleweb?.toLowerCase()}</h2>
      </div>
      
    </>
  );
};

export default SolutionsHeroSector;
