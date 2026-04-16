'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import API_ENDPOINTS from '@/config/api';
import { Informe } from '@/types/informe';

type InformeWithResolvedImage = Informe & {
  resolvedImagePath?: string | null;
};

type InformesGridSectionProps = {
  showOnlyLastThree?: boolean;
};

function resolveInformeImagePath(imagePath?: string): string | null {
  if (!imagePath) return null;

  const cleanPath = imagePath
    .trim()
    .replace(/\\/g, "/")
    .replace(/^['\"]+|['\"]+$/g, "");

  if (!cleanPath) return null;
  if (cleanPath.startsWith('http://') || cleanPath.startsWith('https://')) return cleanPath;
  if (cleanPath.startsWith('/')) return cleanPath;
  if (cleanPath.startsWith('informes/')) return `/${cleanPath}`;

  return `/informes/${cleanPath}`;
}

export default function InformesGridSection({ showOnlyLastThree = false }: InformesGridSectionProps) {
  const [informes, setInformes] = useState<InformeWithResolvedImage[]>([]);

  useEffect(() => {
    const fetchInformes = async () => {
      try {
        const response = await fetch(API_ENDPOINTS.INFORMES);
        if (!response.ok) {
          setInformes([]);
          return;
        }

        const data = await response.json();
        const parsed: Informe[] = Array.isArray(data) ? data : [];

        const normalizedInformes = parsed.map((informe) => ({
          ...informe,
          resolvedImagePath: resolveInformeImagePath(informe.imgPortada || informe.img_portada),
        }));

        setInformes(showOnlyLastThree ? normalizedInformes.slice(0, 3) : normalizedInformes);
      } catch {
        setInformes([]);
      }
    };

    fetchInformes();
  }, [showOnlyLastThree]);

  return (
    <div className="pt-10">
      {informes.length === 0 ? (
        <p className="text-lg text-[#6e7692]">Aun no hay informes disponibles.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-12">
          {informes.map((informe, index) => {
            const categoria = informe.categoria?.trim() || "SIN CATEGORIA";
            const titulo = informe.titulo?.trim() || "Informe sin titulo";
            const imagePath = informe.resolvedImagePath;
            const informeId = typeof informe.id === "number" ? informe.id : null;
            const key = informe.id ?? `informe-${index}`;

            return (
              <article key={key} className="flex flex-col">
                <div className="relative w-full aspect-[16/9] overflow-hidden bg-[#d7deea]">
                  {imagePath ? (
                    <Image
                      src={imagePath}
                      alt={imagePath}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="h-full w-full grid place-items-center text-[#6e7692] font-semibold px-4 text-center">
                      Imagen de portada pendiente
                    </div>
                  )}
                </div>

                <p className="mt-5 text-[16px] font-bold uppercase text-[#77809d] leading-tight">
                  {categoria}
                </p>

                <h2 className="mt-3 text-[21px] font-bold text-[#010d3d] leading-tight min-h-[7.25rem]">
                  {titulo}
                </h2>

                {informeId ? (
                  <Link
                    href={`/informes/${informeId}`}
                    className="mt-8 w-fit rounded-xl bg-[#010d3d] px-4 py-2 text-white text-[16px] font-bold"
                  >
                    Mas informacion
                  </Link>
                ) : (
                  <button
                    type="button"
                    disabled
                    className="mt-8 w-fit rounded-xl bg-[#8c94ac] px-4 py-2 text-white text-[16px] font-bold cursor-not-allowed"
                  >
                    Mas informacion
                  </button>
                )}
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
