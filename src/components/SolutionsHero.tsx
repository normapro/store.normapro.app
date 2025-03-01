"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import API_ENDPOINTS from "@/config/api";
import { Cliente } from "@/types/cliente";


const SolutionsHero = () => {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const response = await fetch(`${API_ENDPOINTS.CLIENTES}?scope=todas-las-soluciones&limit=5`);
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

    fetchClientes();
  }, []);

  return (
    <>
   
    <section className="max-w-7xl mx-auto px-6 py-12 text-[#010D3D] ">
    <h1 className="font-black text-[#010D3D] mb-10 text-[40px]">Soluciones NormaPro</h1>
    <div className="grid grid-cols-10 gap-8">
        <div className="col-span-5">
        {/* Título y Descripción */}
        
        <p className="text-[16px] max-w-2xl text-[#010D3D]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque tempor, 
            dui sit amet pellentesque lacinia, purus leo ultrices mi, nec vestibulum risus 
            leo nec metus. Etiam nec eros interdum, finibus ante in, maximus urna.
        </p>

        {/* Sección de Clientes */}
        <div className="my-8">
            {isLoading ? (
            <p className="text-center text-gray-500">Cargando clientes...</p>
            ) : error ? (
            <p className="text-center text-red-500">{error}</p>
            ) : clientes.length > 0 ? (
            <div className="grid grid-cols-5 justify-center gap-4">
                {clientes.map((cliente) => (
                <Link key={cliente.id_cliente} href={cliente.url} target="_blank" rel="noopener noreferrer">
                    <Image
                    src={"/logos/"+cliente.logo}
                    alt={cliente.description}
                    width={100}
                    height={40}
                    className="object-contain h-10"
                    />
                </Link>
                ))}
            </div>
            ) : (
            <p className="text-center text-gray-500">No hay clientes disponibles.</p>
            )}
        </div>
        </div>
        <div className="col-span-1"></div>
        <div className="col-span-4">

        {/* Caja CTA */}
        <div className="bg-gray-100 p-6 pt-[50px] pb-[50px] rounded-lg text-center max-w-2xl mx-auto">
            <h3 className="text-[15px] font-bold mb-2">Descubre cómo podemos ayudar a tu empresa</h3>
            <Link href="/contacto">
            <button className="bg-gradient-to-r from-[#00b2e3] to-[#cca1dd] shadow-md relative text-white text-[16px] px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition">
                Solicita un diagnóstico gratuito
            </button>
            </Link>
        </div>
        </div>
    </div>
    </section>
   
    </>
  );
};

export default SolutionsHero;
