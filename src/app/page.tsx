import MainAplicacionesSection from "@/components/MainAplicacionesSection";
import MainHeroCarousel from "@/components/MainHeroCarousel";
import MainSolucionesSection from "@/components/MainSolucionesSection";
import MainTestimoniosSection from "@/components/MainTestimoniosSection";
import { Main } from "next/document";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <section>
        <MainHeroCarousel />
        
        <MainSolucionesSection></MainSolucionesSection>
        <MainTestimoniosSection></MainTestimoniosSection>
        <MainAplicacionesSection></MainAplicacionesSection>

      </section>
    </>
  );
}
