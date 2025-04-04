import type { Metadata } from "next";
import Navbar from "../components/Navbar";
import "@/libs/fontawesome.config";
import '@fortawesome/fontawesome-svg-core/styles.css';

import { Mulish } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import Head from "next/head";

const mulish = Mulish({
  variable: "--font-mulish",
  subsets: ["latin"],
  weight: ["300", "400", "600", "700","800","900"], 
});

export const metadata: Metadata = {
  title: "NormaPro",
  description: "Encuentra productos específicos para tu empresa en 60 segundos.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={mulish.variable}>
      <Head>
        <script
          src="https://kit.fontawesome.com/0fe2009133.js"
          crossOrigin="anonymous"
          defer
        ></script>
      </Head>
      <body className="font-sans">
        <Navbar />
        {/* Main content */}
        {/* <main className="container mx-auto p-4">{children}</main> */}
        <main className="">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
