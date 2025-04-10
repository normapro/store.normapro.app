
"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import API_ENDPOINTS from "@/config/api";
import { Aplicacion } from "@/types/aplicacion";
import Link from "next/link";

const AplicacionesDropdown = () => {
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
    <div className="absolute w-screen bg-[#f8f8fa] shadow-md z-50 p-8 w-full rounded-lg">

      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-2xl font-bold text-[#010D3D] mb-4">
          Tecnología
          </h2>
        

        {isLoading ? (
          <p className="text-white">Cargando aplicaciones...</p>
        ) : (
          <div className="bg-[#ffffff40] rounded-xl p-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ">
            {apps.map((app) => {
              const iconSrc = app.uriIcon?.startsWith("/")
                ? app.uriIcon
                : `/${app.uriIcon || "default-icon.png"}`;

              return (
                <Link href={`/aplicaciones/${app.slug}`} key={app.id_app}>
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
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default AplicacionesDropdown;
