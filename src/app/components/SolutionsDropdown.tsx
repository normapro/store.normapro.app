"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import API_ENDPOINTS from "../config/api"; // Importamos las APIs centralizadas

interface Ambito {
  id_ambito: number;
  description: string;
}

interface Sector {
  id_sector: number;
  description: string;
}

interface Solucion {
  id_pack: number;
  description: string;
  uriIcon: string;
}

const SolutionsDropdown = () => {
  const [ambitos, setAmbitos] = useState<Ambito[]>([]);
  const [sectores, setSectores] = useState<Sector[]>([]);
  const [soluciones, setSoluciones] = useState<Solucion[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [ambitosRes, sectoresRes, solucionesRes] = await Promise.all([
          fetch(API_ENDPOINTS.AMBITOS).then((res) => res.json()),
          fetch(API_ENDPOINTS.SECTORES).then((res) => res.json()),
          fetch(API_ENDPOINTS.SOLUCIONES).then((res) => res.json()),
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

  return (
    <div className="absolute w-screen bg-[#f8f8fa] shadow-md z-50 p-8 w-full rounded-lg">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {isLoading ? (
        <p className="text-center text-gray-700">Cargando...</p>
      ) : error ? (
        <p className="text-center text-red-600">{error}</p>
      ) : (
        <div className="grid grid-cols-40 gap-8">
          {/* Columna 1: Ámbitos .... 20% de width */}
          <div className="col-span-9">
            {/*mulish regular 14px lef #010D3D alfa 50%*/ }
            <h3 className="mb-4 text-[14px] text-[#010D3D] opacity-50 font-mulish leading-[20px]">Elige tu ámbito</h3>
            <ul className="space-y-2 ml-[10px]">
              {ambitos.map((ambito) => (
                <li key={ambito.id_ambito} className="text-[14px] text-[#010D3D] font-bold leading-[20px]">
                  <Link href={`/ambito/${ambito.id_ambito}`} className="hover:text-blue-600 font-mulish text-[14px] text-[#010D3D] font-bold leading-[26px]" >
                    {ambito.description}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Columna 2: Sectores 20%width*/}
          <div className="col-span-8">
            <h3 className="mb-4 text-[14px] text-[#010D3D] opacity-50 font-mulish leading-[20px]">Elige tu sector</h3>
            <ul className="space-y-2  ml-[10px]">
              {sectores.map((sector) => (
                <li key={sector.id_sector} className="text-[14px] text-[#010D3D] font-bold leading-[20px]">
                  <Link href={`/sector/${sector.id_sector}`} className="hover:text-blue-600 font-mulish text-[14px] text-[#010D3D] font-bold leading-[26px]">
                    {sector.description}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Columna 3: Soluciones destacadas 60% */}
          <div className="col-span-23">
            <h3 className="mb-4 text-[14px] text-[#010D3D] opacity-50 font-mulish leading-[20px]">
                Soluciones destacadas con servicio de consultoría
                <span className="ml-2 text-gray-500 text-sm">🧑‍💼 Incluye consultoría</span>
            </h3>

            {/* Grid con dos columnas */}
            <div className="grid grid-cols-2 gap-4">
                {soluciones.map((solucion) => (
                <Link
                    key={solucion.id_pack}
                    href={`/solucion/${solucion.id_pack}`}
                    className="block bg-[#E4F6FC] p-4 rounded-lg shadow hover:shadow-lg transition"
                >
                    <div className="flex items-center space-x-4">
                    <img src={"/" + solucion.uriIcon} alt={solucion.description} className="w-16 h-16 object-contain" />
                    <div>
                        <h4 className="font-mulish text-[14px] text-[#010D3D] font-bold leading-[20px]">
                        {solucion.description}
                        </h4>
                    </div>
                    </div>
                </Link>
                ))}
            </div>
            <Link href="/todas-las-soluciones" className="block text-blue-600 mt-4 text-right hover:underline">
              Ver todas nuestras soluciones
            </Link>
          </div>
        </div>
      )}
    </div>
    </div>
  );
};

export default SolutionsDropdown;
