
"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import API_ENDPOINTS from "@/config/api";
import { Aplicacion } from "@/types/aplicacion";
import Link from "next/link";

const MainAplicacionesSection = () => {
  const [apps, setApps] = useState<Aplicacion[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchApps = async () => {
      try {
        const response = await fetch(API_ENDPOINTS.APLICACIONES);
        if (!response.ok) throw new Error("Error al obtener las aplicaciones");
        const data = await response.json();
        setApps(data);
      } catch (err) {
        console.error("Error al cargar las aplicaciones:", err);
        setApps([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchApps();
  }, []);

  return (
    <section className="w-full bg-gradient-to-r from-[#00B2E350] to-[#64D8CC50] py-12 px-4 sm:px-6 sm:py-14 lg:py-16">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl font-extrabold text-[#010D3D] sm:text-4xl mb-2">Aplicaciones</h2>
        <p className="mx-auto mb-8 max-w-3xl text-sm font-semibold text-[#010D3D] sm:mb-10 sm:text-base">
          NormaPro es un ecosistema completo de herramientas diseñadas para llevar tu negocio al siguiente nivel. Cada producto dentro de nuestra plataforma está interconectado para ofrecerte una experiencia fluida y resultados tangibles.
        </p>

        {isLoading ? (
          <p className="text-[#010D3D]">Cargando aplicaciones...</p>
        ) : (
          <div className="grid grid-cols-1 gap-4 rounded-xl bg-[#ffffff40] p-4 sm:grid-cols-2 sm:gap-6 sm:p-6 lg:grid-cols-3 lg:p-10">
            {apps.map((app) => {
              const iconSrc = app.uriIcon?.startsWith("/")
                ? app.uriIcon
                : `/${app.uriIcon || "default-icon.png"}`;

              return (
                <Link href={`/aplicaciones/${app.slug}`} key={app.id_app} className="block h-full">
                  <div className="flex h-full items-start gap-3 rounded-lg p-2 text-left transition-colors hover:bg-white/60 sm:items-center sm:gap-4">
                    <div className="shrink-0 rounded-xl bg-[#EAF8FE] p-2">
                      <Image
                        src={iconSrc}
                        alt={app.description}
                        width={36}
                        height={36}
                        className="h-9 w-9 sm:h-10 sm:w-10"
                      />
                    </div>
                    <div>
                      <p className="font-bold text-[#010D3D] text-sm sm:text-base">{app.description}</p>
                      <p className="text-[#4B4B4B] text-xs sm:text-sm">{app.shortDescription}</p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default MainAplicacionesSection;
