'use client';
import MainAplicacionesSection from "@/components/MainAplicacionesSection";
import MainConsultoriaSection from "@/components/MainConsultoriaSection";
import MainHeroCarousel from "@/components/MainHeroCarousel";
import MainSolucionesSection from "@/components/MainSolucionesSection";
import MainTestimoniosSection from "@/components/MainTestimoniosSection";
import FadeInOnScroll from "@/utils/FadeInOnScroll";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <section>
      <MainHeroCarousel />

      {/* Parallax visual con fondo fijo */}
      <section
        className="relative h-[100vh] bg-fixed bg-center bg-cover "
        style={{
          backgroundImage:
            'url("https://imagenes.20minutos.es/uploads/imagenes/2024/05/15/una-imagen-creada-por-la-herramienta-imagen-3-de-google.jpeg")',
        }}
      >
        <div className="sticky top-1/2 transform -translate-y-1/2 flex items-center justify-center h-0 mb-100">
          <motion.div
            className="z-10 text-white text-center px-4 bg-black/40 p-6 rounded-xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
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
        <MainTestimoniosSection />
      </FadeInOnScroll>
    </section>
  );
}
