import type { Metadata } from "next";
import "@/libs/fontawesome.config";
import "@fortawesome/fontawesome-svg-core/styles.css";
 
import { Mulish } from "next/font/google";
import "../../globals.css";
import NavbarInstituto from "@/components/menu/NavbarInstituto";
import FooterInstituto from "@/components/FooterInstituto";

import Script from "next/script";
import { Providers } from "../../providers";
 
const mulish = Mulish({
  variable: "--font-mulish",
  subsets: ["latin"],
  weight: ["300", "400", "600", "700", "800", "900"],
});
 
export const metadata: Metadata = {
  title: "Instituto",
  description: "",
};
 
export default function InstitutoLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={mulish.variable}>
      <body className="font-sans">
        <NavbarInstituto />
        <Providers>{children}</Providers>
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
