import type { Metadata } from "next";
import "@/libs/fontawesome.config"; // Carga de configuración de iconos
import '@fortawesome/fontawesome-svg-core/styles.css';

import { Mulish } from "next/font/google";
import "../../globals.css";
import Footer from "@/components/Footer";
import Script from "next/script";
import { Providers } from "../../providers";
import ChatManager from "@/components/ChatManager";
import { SiteProvider, type SiteRef } from "@/context/SiteContext";
import { headers } from "next/headers";

const mulish = Mulish({
  variable: "--font-mulish",
  subsets: ["latin"],
  weight: ["300", "400", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "NormaPro",
  description: "Encuentra productos específicos para tu empresa en 60 segundos.",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {


  const headerList = await headers();
  const ref : SiteRef = headerList.get("instituto") === "true" ? "instituto" : null;

  return (
    <html lang="es" className={mulish.variable}>
      <body className="font-sans">
        <SiteProvider ref={ref}>
          <ChatManager>
            <Providers>{children}</Providers>
          </ChatManager>
          <Footer />
        </SiteProvider>

        <Script
          src="https://kit.fontawesome.com/0fe2009133.js"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
