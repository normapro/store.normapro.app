import type { Metadata } from "next";
import Navbar from "../components/Navbar";
import "../libs/fontawesome"; 

import { Mulish } from "next/font/google";
import "./globals.css";

const mulish = Mulish({
  variable: "--font-mulish",
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"], 
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
        {/* Main content */}
        {/* <main className="container mx-auto p-4">{children}</main> */}
        <main className="">{children}</main>
      </body>
    </html>
  );
}
