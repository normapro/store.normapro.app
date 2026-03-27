'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import API_ENDPOINTS from '@/config/api';
import { HistoriaCliente } from '@/types/historiaCliente';

const FALLBACK_IMAGE = '/main/sistema.png';

const HistoriasClientesSection = () => {
  const [historias, setHistorias] = useState<HistoriaCliente[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchHistorias = async () => {
      try {
        const response = await fetch(`${API_ENDPOINTS.HISTORIAS}?maxItems=100`);
        if (!response.ok) {
          throw new Error(`Error HTTP ${response.status}`);
        }

        const payload = await response.json();
        if (Array.isArray(payload)) {
          setHistorias(payload);
          return;
        }

        setHistorias([]);
      } catch (error) {
        console.error('No se pudieron cargar las historias:', error);
        setHistorias([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHistorias();
  }, []);

  return (
    <section className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-10">
        <h2 className="text-[34px] leading-tight md:text-[48px] font-black text-[#010d3d]">
          Exitos que inspiran
        </h2>
        <p className="mt-4 text-[24px] leading-tight md:text-[42px] font-black text-[#707a95]">
          Descubre como NormaPro contribuye
          <br />
          al exito de organizaciones.
        </p>
      </div>

      {isLoading ? (
        <p className="text-center text-gray-500">Cargando historias...</p>
      ) : historias.length === 0 ? (
        <p className="text-center text-gray-500">Aun no hay historias disponibles.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {historias.map((historia) => (
            <article
              key={historia.id}
              className="bg-[#e7e8ef] rounded-2xl overflow-hidden flex flex-col"
            >
              <div
                className="relative h-[190px] bg-cover bg-center"
                style={{
                  backgroundImage: `linear-gradient(rgba(16, 34, 83, 0.32), rgba(16, 34, 83, 0.32)), url(${historia.imagen || FALLBACK_IMAGE})`,
                }}
              >
                <h3 className="absolute bottom-6 left-6 right-6 text-white text-[30px] leading-none md:text-[40px] font-black">
                  {historia.nombre}
                </h3>
              </div>

              <div className="px-5 py-5 flex flex-col flex-1">
                <p className="text-[#071a4c] text-[19px] leading-snug">
                  {historia.descripcion || 'Proximamente mas detalles de esta historia.'}
                </p>

                <hr className="my-5 border-white" />

                <Link
                  href={`/historias/${historia.id}`}
                  className="text-left text-[#071a4c] font-black text-[28px] underline underline-offset-4"
                >
                  Saber mas
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
};

export default HistoriasClientesSection;
