
"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import API_ENDPOINTS from "@/config/api";
import { Aplicacion } from "@/types/aplicacion";

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
    <section className="w-full bg-gradient-to-r from-[#00B2E350] to-[#64D8CC50] py-16 px-6">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-[38px] font-extrabold color-[#010D3D] mb-[10px]">Aplicaciones</h2>
        <p className="text-[#010D3D] text-[16px] mb-10 px-79 font-semibold">
        NormaPro es un ecosistema completo de herramientas diseñadas para llevar tu negocio al siguiente nivel. Cada producto dentro de nuestra plataforma está interconectado para ofrecerte una experiencia fluida y resultados tangibles.
        </p>

        {isLoading ? (
          <p className="text-white">Cargando aplicaciones...</p>
        ) : (
          <div className="bg-[#ffffff40] rounded-xl p-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ">
            {apps.map((app) => {
              const iconSrc = app.uriIcon?.startsWith("/")
                ? app.uriIcon
                : `/${app.uriIcon || "default-icon.png"}`;

              return (
                <div key={app.id_app} className="flex items-center gap-4 text-left">
                  <div className="bg-[#EAF8FE] rounded-xl">
                    <Image
                      src={iconSrc}
                      alt={app.description}
                      width={36}
                      height={36}
                      className="w-10 h-10"
                    />
                  </div>
                  <div>
                    <p className="font-bold text-[#010D3D]">{app.description}</p>
                    <p className="text-[#4B4B4B] text-sm">{app.shortDescription}</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default MainAplicacionesSection;
