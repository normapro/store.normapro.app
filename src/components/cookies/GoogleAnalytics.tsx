"use client";

import Script from "next/script";
import { useCookieConsent } from "@/libs/cookieConsent";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

// Google Analytics 4. Solo se descarga si hay ID configurado y el usuario ha aceptado las cookies de estadísticas.
export default function GoogleAnalytics() {
  const consent = useCookieConsent();
  if (!GA_ID || !consent?.analytics) return null;

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
      <Script id="ga4-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_ID}');`}
      </Script>
    </>
  );
}
