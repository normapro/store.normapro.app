import type { Metadata } from "next";
import "@/libs/fontawesome.config";
import "@fortawesome/fontawesome-svg-core/styles.css";
 
import { Mulish } from "next/font/google";
import "../../globals.css";
import NavbarInstituto from "@/components/menu/NavbarInstituto";
import FooterInstituto from "@/components/FooterInstituto";

import Script from "next/script";
import { headers } from "next/headers";
import JsonLd from "@/components/seo/JsonLd";
import { INSTITUTO_SITE_NAME, INSTITUTO_SITE_URL, INSTITUTO_LOGO, isIndexableHost, organizationJsonLd } from "@/libs/seo";
 
const mulish = Mulish({
  variable: "--font-mulish",
  subsets: ["latin"],
  weight: ["300", "400", "600", "700", "800", "900"],
});
 
export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const indexable = isIndexableHost(headerList.get("host"));

  return {
    metadataBase: new URL(INSTITUTO_SITE_URL),
    title: {
      default: INSTITUTO_SITE_NAME,
      template: `%s | ${INSTITUTO_SITE_NAME}`,
    },
    applicationName: INSTITUTO_SITE_NAME,
    // Fuera de los dominios de producción (previews, .local, IPs) no se indexa.
    robots: indexable ? { index: true, follow: true } : { index: false, follow: false },
    openGraph: {
      type: "website",
      locale: "es_ES",
      siteName: INSTITUTO_SITE_NAME,
      images: [{ url: INSTITUTO_LOGO }],
    },
    twitter: { card: "summary_large_image" },
  };
}
 
export default function InstitutoLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={mulish.variable}>
      <body className="font-sans">
        <JsonLd data={organizationJsonLd("instituto")} />
        <NavbarInstituto />
        {children}
        <FooterInstituto />
        <Script
          src="https://kit.fontawesome.com/0fe2009133.js"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
