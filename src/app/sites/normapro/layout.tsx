import type { Metadata } from "next";
import "@/libs/fontawesome.config"; // Carga de configuración de iconos
import '@fortawesome/fontawesome-svg-core/styles.css';

import { Mulish } from "next/font/google";
import "../../globals.css";
import Footer from "@/components/Footer";
import Script from "next/script";
import ChatManager from "@/components/ChatManager";
import { SiteProvider, type SiteRef } from "@/context/SiteContext";
import { headers } from "next/headers";
import JsonLd from "@/components/seo/JsonLd";
import CookieBanner from "@/components/cookies/CookieBanner";
import GoogleAnalytics from "@/components/cookies/GoogleAnalytics";
import { NORMAPRO_SITE_NAME, NORMAPRO_SITE_URL, DEFAULT_OG_IMAGE, isIndexableHost, organizationJsonLd } from "@/libs/seo";

const mulish = Mulish({
  variable: "--font-mulish",
  subsets: ["latin"],
  weight: ["300", "400", "600", "700", "800", "900"],
});

export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const indexable = isIndexableHost(headerList.get("host"));

  return {
    metadataBase: new URL(NORMAPRO_SITE_URL),
    title: {
      default: NORMAPRO_SITE_NAME,
      template: `%s | ${NORMAPRO_SITE_NAME}`,
    },
    description: "Encuentra productos específicos para tu empresa en 60 segundos.",
    applicationName: NORMAPRO_SITE_NAME,
    // Fuera de los dominios de producción (previews, .local, IPs) no se indexa.
    robots: indexable ? { index: true, follow: true } : { index: false, follow: false },
    openGraph: {
      type: "website",
      locale: "es_ES",
      siteName: NORMAPRO_SITE_NAME,
      images: [{ url: DEFAULT_OG_IMAGE }],
    },
    twitter: { card: "summary_large_image" },
  };
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {


  const headerList = await headers();
  const siteRef : SiteRef = headerList.get("x-site-ref") === "instituto" ? "instituto" : null;

  return (
    <html lang="es" className={mulish.variable}>
      <body className="font-sans">
        <JsonLd data={organizationJsonLd("normapro")} />
        <SiteProvider siteRef={siteRef}>
          <ChatManager>
            {children}
          </ChatManager>
          <Footer />
        </SiteProvider>

        <CookieBanner policyHref={"/politica-de-cookies-ue"} />
        <GoogleAnalytics />
        <Script
          src="https://kit.fontawesome.com/0fe2009133.js"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
