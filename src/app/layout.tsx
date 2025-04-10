import type { Metadata } from "next";
import Navbar from "../components/menu/Navbar";
import "@/libs/fontawesome.config";
import '@fortawesome/fontawesome-svg-core/styles.css';

import { Mulish } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import Script from "next/script";
import { Providers } from './providers';

const mulish = Mulish({
  variable: "--font-mulish",
  subsets: ["latin"],
  weight: ["300", "400", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "NormaPro",
  description: "Encuentra productos específicos para tu empresa en 60 segundos.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={mulish.variable}>
      <body className="font-sans">
        <Navbar />
        <Providers>{children}</Providers>
        <Footer />

        {/* Carga de FontAwesome via script */}
        <Script
          src="https://kit.fontawesome.com/0fe2009133.js"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
