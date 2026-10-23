"use client";

import { ReactNode } from "react";
import { getConsent, openCookieSettings, saveConsent, useCookieConsent } from "@/libs/cookieConsent";

interface Props {
  provider: "YouTube" | "Google Maps";
  // Clases del hueco que ocupa el iframe, para que el aviso tenga el mismo tamaño.
  className?: string;
  children: ReactNode;
}

// Muestra un iframe de terceros solo si el usuario ha aceptado el contenido de terceros.
// Mientras tanto, ocupa su hueco con un aviso para cargarlo.
export default function ConsentEmbed({ provider, className = "", children }: Props) {
  const consent = useCookieConsent();
  if (consent?.media) return <>{children}</>;

  const aceptar = () => saveConsent({ analytics: getConsent()?.analytics ?? false, media: true });

  return (
    <div className={`${className} flex flex-col items-center justify-center gap-3 bg-[#eef1f6] text-[#010d3d] text-center p-4`}>
      <p className="text-sm max-w-md">
        Este contenido se carga desde <span className="font-bold">{provider}</span>, que instala sus propias cookies.
      </p>
      <div className="flex flex-wrap justify-center gap-2">
        <button
          type="button"
          onClick={aceptar}
          className="px-4 py-2 rounded-lg bg-[#010d3d] text-white text-sm font-bold hover:opacity-90"
        >
          Aceptar y ver
        </button>
        <button
          type="button"
          onClick={openCookieSettings}
          className="px-4 py-2 rounded-lg border-2 border-[#010d3d] text-sm font-bold hover:bg-[#010d3d] hover:text-white"
        >
          Configurar cookies
        </button>
      </div>
    </div>
  );
}
