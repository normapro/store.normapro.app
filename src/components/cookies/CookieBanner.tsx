"use client";

import { useEffect, useState } from "react";
import { onOpenCookieSettings, saveConsent, useCookieConsent } from "@/libs/cookieConsent";

interface Props {
  // URL de la política de cookies (absoluta desde el sitio del instituto).
  policyHref: string;
}

// Aviso de cookies de primera visita y panel de configuración.
// Aceptar y rechazar tienen el mismo peso visual, como pide la guía de cookies de la AEPD.
export default function CookieBanner({ policyHref }: Props) {
  const consent = useCookieConsent();
  const [mounted, setMounted] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [media, setMedia] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(
    () =>
      onOpenCookieSettings(() => {
        setAnalytics(consent?.analytics ?? false);
        setMedia(consent?.media ?? false);
        setShowSettings(true);
      }),
    [consent]
  );

  if (!mounted || (consent && !showSettings)) return null;

  const guardar = (choices: { analytics: boolean; media: boolean }) => {
    saveConsent(choices);
    setShowSettings(false);
  };

  const buttonClass =
    "px-5 py-2.5 rounded-lg text-[15px] font-bold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00b2e3]";

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-labelledby="cookie-banner-title"
      className="fixed inset-x-0 bottom-0 z-[1000] p-4 sm:p-6"
    >
      <div className="max-w-4xl mx-auto bg-white text-[#010d3d] rounded-2xl shadow-[0_10px_40px_rgba(1,13,61,0.25)] border border-gray-200 p-5 sm:p-6">
        <h2 id="cookie-banner-title" className="text-lg font-extrabold">
          {showSettings ? "Configurar cookies" : "Usamos cookies"}
        </h2>

        {!showSettings ? (
          <p className="mt-2 text-sm leading-relaxed">
            Usamos cookies propias necesarias para que la web funcione y, si nos das permiso, cookies de Google Analytics para
            obtener estadísticas de uso y contenido de YouTube y Google Maps. Puedes aceptarlas, rechazarlas o elegir cuáles
            permites. Más información en la{" "}
            <a href={policyHref} className="underline font-semibold">
              política de cookies
            </a>
            .
          </p>
        ) : (
          <div className="mt-3 space-y-3 text-sm">
            <label className="flex items-start gap-3 p-3 rounded-lg bg-[#f5f6f8]">
              <input type="checkbox" checked disabled className="mt-1 h-4 w-4" />
              <span>
                <span className="font-bold block">Necesarias (siempre activas)</span>
                Guardan tus preferencias de cookies y la conversación con el asistente virtual.
              </span>
            </label>
            <label className="flex items-start gap-3 p-3 rounded-lg bg-[#f5f6f8] cursor-pointer">
              <input
                id="cookie-analytics"
                type="checkbox"
                checked={analytics}
                onChange={(e) => setAnalytics(e.target.checked)}
                className="mt-1 h-4 w-4 accent-[#00b2e3]"
              />
              <span>
                <span className="font-bold block">Estadísticas</span>
                Google Analytics: nos permite saber de forma anónima cómo se usa la web.
              </span>
            </label>
            <label className="flex items-start gap-3 p-3 rounded-lg bg-[#f5f6f8] cursor-pointer">
              <input
                id="cookie-media"
                type="checkbox"
                checked={media}
                onChange={(e) => setMedia(e.target.checked)}
                className="mt-1 h-4 w-4 accent-[#00b2e3]"
              />
              <span>
                <span className="font-bold block">Contenido de terceros</span>
                Vídeos de YouTube y mapas de Google Maps, que instalan sus propias cookies.
              </span>
            </label>
            <p>
              Detalle de cada cookie en la{" "}
              <a href={policyHref} className="underline font-semibold">
                política de cookies
              </a>
              .
            </p>
          </div>
        )}

        <div className="mt-4 flex flex-col sm:flex-row sm:justify-end gap-3">
          {showSettings ? (
            <button
              type="button"
              onClick={() => guardar({ analytics, media })}
              className={`${buttonClass} border-2 border-[#010d3d] text-[#010d3d] hover:bg-[#010d3d] hover:text-white`}
            >
              Guardar preferencias
            </button>
          ) : (
            <button
              type="button"
              onClick={() => {
                setAnalytics(consent?.analytics ?? false);
                setMedia(consent?.media ?? false);
                setShowSettings(true);
              }}
              className={`${buttonClass} border-2 border-[#010d3d] text-[#010d3d] hover:bg-[#010d3d] hover:text-white`}
            >
              Configurar
            </button>
          )}
          <button
            type="button"
            onClick={() => guardar({ analytics: false, media: false })}
            className={`${buttonClass} bg-[#010d3d] text-white hover:opacity-90`}
          >
            Rechazar todas
          </button>
          <button
            type="button"
            onClick={() => guardar({ analytics: true, media: true })}
            className={`${buttonClass} bg-[#010d3d] text-white hover:opacity-90`}
          >
            Aceptar todas
          </button>
        </div>
      </div>
    </div>
  );
}
