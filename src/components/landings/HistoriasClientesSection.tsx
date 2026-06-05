'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import API_ENDPOINTS from '@/config/api';
import { HistoriaCliente } from '@/types/historiaCliente';
import { useSiteRef } from '@/context/SiteContext';

const FALLBACK_IMAGE = '/main/sistema.png';

type HistoriasClientesSectionProps = {
  soloUnaHistoria?: boolean;
};

const resolveHistoriaImage = (image: string | null): string => {
  if (!image) return FALLBACK_IMAGE;

  // Permite URLs externas tal cual.
  if (image.startsWith('http://') || image.startsWith('https://')) {
    return image;
  }

  // Si ya viene como ruta absoluta del public, la usamos directamente.
  if (image.startsWith('/')) {
    return image;
  }

  // Si en BD se guarda solo el nombre del archivo, asumimos carpeta public/historiasclientes.
  return `/historiasclientes/${image}`;
};

const HistoriasClientesSection = ({ soloUnaHistoria = false }: HistoriasClientesSectionProps) => {
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

  const historiaPrincipal = historias[0];
  const historiaPrincipalPath = `/historias/${historiaPrincipal?.slug || historiaPrincipal?.id}`;

  const ref = useSiteRef();
  const isInstituto = ref === "instituto";

  const theme = {
    general: isInstituto ? "bg-[#010D3D] text-[#FFFFFF] flex flex-row justify-between items-center mb-10" : "bg-[#FFFFFF] text-[#010D3D] text-center mb-10",
    texto: isInstituto ? "text-[#FFFFFF] text-[16px] md:text-[22px]" : "text-[#707a95] text-[24px] md:text-[42px]",
  };

  return (
    <div className={isInstituto ? "relative" : ""}
    style={isInstituto ? {
      background: "linear-gradient(to bottom, #010D3D 50%, transparent 50%)"
    } : {}}>
    <section className={`mx-auto px-4 sm:px-6 lg:px-10 ${soloUnaHistoria ? 'max-w-[1280px] py-6' : 'max-w-[1600px] py-12'}`}>
      {!soloUnaHistoria && (
        <div className={`${theme.general} gap-2`}>
          <h2 className="text-[34px] md:text-[48px] leading-tight font-black">
            Exitos que inspiran
          </h2>
          <p className={`${theme.texto} leading-tight font-black ${isInstituto ? "max-w-[420px]" : "mt-4"}`}>
            Descubre como {isInstituto ? "Instituto de Innovación, Ciencia y Empresa" : "NormaPro"} contribuye
            {!isInstituto && <br />}
            {" "}al exito de organizaciones.
          </p>
        </div>
      )}

      {isLoading ? (
        <p className="text-center text-gray-500">Cargando historias...</p>
      ) : historias.length === 0 ? (
        <p className="text-center text-gray-500">Aun no hay historias disponibles.</p>
      ) : soloUnaHistoria ? (
        <article className="bg-[#e7e8ef] rounded-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-5 w-full">
          <div
            className="h-[240px] sm:h-[320px] lg:h-full lg:col-span-3 bg-cover bg-center"
            style={{
              backgroundImage: `url(${resolveHistoriaImage(historiaPrincipal.imagen)})`,
            }}
          />

          <div className="px-6 py-6 sm:px-8 sm:py-8 lg:col-span-2 flex flex-col justify-center">
            <p className="text-[#071a4c] text-[24px] leading-tight font-bold mb-8">
              {historiaPrincipal.nombre}
            </p>

            <h3 className="text-[#071a4c] text-[25px] leading-[1.1] font-black mt-8 mb-4">
              {historiaPrincipal.descripcion || 'Proximamente mas detalles de esta historia.'}
            </h3>

            <hr className="my-0 border-white border-1" />

            <Link
              href={historiaPrincipalPath}
              className="text-left text-[#071a4c] font-extrabold text-[15px] underline underline-offset-4 mt-6"
            >
              Saber mas
            </Link>
          </div>
        </article>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 w-full">
          {historias.map((historia) => (
            <article
              key={historia.id}
              className="bg-[#e7e8ef] rounded-2xl overflow-hidden flex flex-col"
            >
              <div
                className="relative h-[250px] bg-cover bg-center"
                style={{
                  backgroundImage: `linear-gradient(rgba(16, 34, 83, 0.32), rgba(16, 34, 83, 0.32)), url(${resolveHistoriaImage(historia.imagen)})`,
                }}
              >
                <h3 className="absolute bottom-6 left-6 right-6 text-white text-[30px] leading-none md:text-[35px] font-black">
                  {historia.nombre}
                </h3>
              </div>

              <div className="px-5 py-5 flex flex-col flex-1">
                <p className="text-[#071a4c] text-[20px] leading-snug mb-5 font-bold">
                  {historia.descripcion || 'Proximamente mas detalles de esta historia.'}
                </p>

                <hr className="my-5 border-white" />

                <Link
                  href={`/historias/${historia.slug || historia.id}`}
                  className="text-left text-[#071a4c] font-extrabold text-[20px] underline underline-offset-4 mt-3"
                >
                  Saber mas
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
    </div>
  );
};

export default HistoriasClientesSection;
