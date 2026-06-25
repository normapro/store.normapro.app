'use client';
import InformesGridSection from "@/components/informes/InformesGridSection";
import MainAplicacionesSection from "@/components/MainAplicacionesSection";
import MainConsultoriaSection from "@/components/MainConsultoriaSection";
import MainFormacionSection from "@/components/MainFormacionSection";
import MainHeroCarousel from "@/components/MainHeroCarousel";
import MainTestimoniosSection from "@/components/MainTestimoniosSection";
import MainEventosSection from "@/components/MainEventosSection";
import ClientCarousel from "@/components/shared/ClientCarousel";
import FadeInOnScroll from "@/utils/FadeInOnScroll";
import { motion } from "framer-motion";
import ActualidadGridSection from "@/components/ActualidadGridSection";
import Link from "next/link";
import MainPacksSection from "@/components/MainPacksSection";

export default function Home() {
  return (
    <section>
      <MainHeroCarousel />
      <ClientCarousel scope="all" claim={""} />

      {/* Parallax visual con fondo fijo */}
      <section
        className="relative h-[100vh] bg-fixed bg-center bg-cover bg-gradient-to-b from-[#63d7cc] to-[#02b2e2]"
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
            <h2 className="max-w-3xl text-4xl text-[#010d3d] font-bold">
              Descubre en este <strong>video</strong> como <strong>NormaPro</strong> puede ayudar a tu empresa
            </h2>
          </motion.div>
        </div>
      </section>

      <FadeInOnScroll>
        <MainPacksSection />
      </FadeInOnScroll>

      <FadeInOnScroll>
        <MainAplicacionesSection />
      </FadeInOnScroll>

      <FadeInOnScroll>
        <MainFormacionSection />
      </FadeInOnScroll>

      <FadeInOnScroll>
        <MainTestimoniosSection />
      </FadeInOnScroll>

      <FadeInOnScroll>
        <MainEventosSection />
      </FadeInOnScroll>

      <FadeInOnScroll >
        <div className="bg-[#F3F4F4] pt-2">
          <section className="max-w-7xl mx-auto px-6 mt-10">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-extrabold text-[#010d3d]">
                Actualidad
              </h1>
              <Link
                href="/actualidad"
                className="text-l font-bold text-[#010d3d] underline underline-offset-4"
              >
                Ver todas las noticias
              </Link>
            </div>
            <div className="mt-8">
              <ActualidadGridSection
                onlyLatest={true}
                hideDescriptionAndReadMore={true}
              />
            </div>
          </section>
        </div>
      </FadeInOnScroll>

      <FadeInOnScroll >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
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
        </div>
      </FadeInOnScroll>
    </section>
  );
}
