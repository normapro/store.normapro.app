"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import API_ENDPOINTS from "../config/api"; // Importamos las APIs centralizadas
import { Solucion } from "../types/solucion";
import  PackHighlightedButton  from "./packHighlightedButton";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserTie } from "@fortawesome/free-solid-svg-icons"; // Import the icon

import { Ambito } from "../types/ambito";
import { Sector } from "../types/sector";




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
                <li key={ambito.id_ambito} className="text-[14px] text-[#010D3D] font-bold leading-[20px] mt-[-7.5px]">
                  <Link href={`/ambito/${ambito.id_ambito}`} className="hover:underline font-mulish text-[14px] text-[#010D3D] font-bold leading-[26px]" >
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
                <li key={sector.id_sector} className="text-[14px] text-[#010D3D] font-bold leading-[20px] mt-[-7.5px]">
                  <Link href={`/sector/${sector.id_sector}`} className="hover:underline font-mulish text-[14px] text-[#010D3D] font-bold leading-[26px]">
                    {sector.description}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Columna 3: Soluciones destacadas 60% */}
          <div className="col-span-23">
            <div className="grid grid-cols-2">
            <h3 className="mb-4 text-[14px] text-[#010D3D] opacity-50 font-mulish leading-[20px] ">
                Soluciones destacadas con servicio de consultoría
                
            </h3>
            <h3 className="mb-4 text-[14px] text-[#010D3D] opacity-50 font-mulish leading-[20px] text-right">                
                <span className="ml-2 text-gray-500 text-sm">  
                <FontAwesomeIcon icon={faUserTie} className="mr-2 text-[20px] text-[#010D3D] opacity-100" />  
                  Incluye consultoría
                </span>
            </h3>
            </div>

            {/* Grid con dos columnas */}
            <div className="grid grid-cols-2 gap-4">
            {soluciones.map((solucion, index) => (
              <PackHighlightedButton key={index} solucion={solucion} />
            ))}


            </div>
            <Link href="/todas-las-soluciones" className="block text-[#010D3D] text-[14px] font-mulish font-bold mt-4 text-right underline">
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
