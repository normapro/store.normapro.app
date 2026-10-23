"use client";

import { openCookieSettings } from "@/libs/cookieConsent";

// Enlace del pie y de la política para volver a abrir la configuración de cookies.
export default function CookieSettingsLink({ className = "" }: { className?: string }) {
  return (
    <button type="button" onClick={openCookieSettings} className={className}>
      Configurar cookies
    </button>
  );
}
