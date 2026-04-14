'use client';
import InformesGridSection from "@/components/informes/InformesGridSection";
import MainAplicacionesSection from "@/components/MainAplicacionesSection";
import MainConsultoriaSection from "@/components/MainConsultoriaSection";
import MainFormacionSection from "@/components/MainFormacionSection";
import MainHeroCarousel from "@/components/MainHeroCarousel";
import MainSolucionesSection from "@/components/MainSolucionesSection";
import MainTestimoniosSection from "@/components/MainTestimoniosSection";
import ClientCarousel from "@/components/shared/ClientCarousel";
import FadeInOnScroll from "@/utils/FadeInOnScroll";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <section>
      <MainHeroCarousel />
      <ClientCarousel scope="all" claim={""}/>
      
      {/* Parallax visual con fondo fijo */}
      <section
        className="relative h-[100vh] bg-fixed bg-center bg-cover "
        style={{
          backgroundImage:
            'url("/main/parallax-bg.png")',
        }}
      >
        <div className="h-100 bg-[#11111100]">
          
          
        </div>
        
        <div className="sticky top-1/2 transform -translate-y-1/2 flex items-center justify-center h-0 mb-100">
        
          <motion.div
            className="z-10 text-white text-center px-4 p-6 rounded-xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <Image
                        src={"/main/parallax_person_computer.svg"} 
                        alt={"Descubre el poder de NormaPro"}
                        width={1000}
                        height={1000}
                        className="mx-auto object-contain mb-[-100px] h-[300px]"
          /> 
            <h2 className="text-4xl font-bold drop-shadow-md">
              Descubre el poder de NormaPro
            </h2>
            <p className="mt-4 text-lg drop-shadow-sm">
              Y cómo puede ayudar a tu empresa
            </p>
          </motion.div>
        </div>
      </section>

      <FadeInOnScroll>
        <MainSolucionesSection />
      </FadeInOnScroll>

      <FadeInOnScroll>
        <MainAplicacionesSection />
      </FadeInOnScroll>

      <FadeInOnScroll>
        <MainConsultoriaSection />
      </FadeInOnScroll>

      <FadeInOnScroll>
        <MainFormacionSection />
      </FadeInOnScroll>
      <FadeInOnScroll>
        <MainTestimoniosSection />
      </FadeInOnScroll>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <header className="pb-4 flex items-center justify-between gap-4">
                <h1 className="text-3xl font-extrabold text-[#010d3d]">Informes</h1>
                <Link
                  href="/informes"
                  className="text-l font-bold text-[#010d3d] underline underline-offset-4"
                >
                  Ver todos los informes
                </Link>
              </header>
      
              <InformesGridSection showOnlyLastThree />
            </section>
    </section>
  );
}
