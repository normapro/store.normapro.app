'use client';
import InformesGridSection from "@/components/informes/InformesGridSection";
import MainConsultoriaSection from "@/components/MainConsultoriaSection";
import MainFormacionSection from "@/components/MainFormacionSection";
import MainEventosSection from "@/components/MainEventosSection";
import ClientCarousel from "@/components/shared/ClientCarousel";
import FadeInOnScroll from "@/utils/FadeInOnScroll";
import ActualidadGridSection from "@/components/ActualidadGridSection";
import Link from "next/link";
import MainTecnologiaInstituto from "@/components/MainTecnologiaInstituto";
import MainHeroInstituto from "@/components/MainHeroInstituto";
import MainTestimoniosSection from "@/components/MainTestimoniosSection";
import MainHistoriasSection from "@/components/MainHistoriasSection";

export default function Home() {
  return (
    <section>
      <MainHeroInstituto />

      <ClientCarousel scope="all" claim={"Estas empresas trabajan con nosotros"} theme="dark" />

      <FadeInOnScroll>
        <MainConsultoriaSection isInstituto={true} />
      </FadeInOnScroll>

      <MainTecnologiaInstituto />

      <FadeInOnScroll>
        <MainFormacionSection isInstituto={true} />
      </FadeInOnScroll>

      <FadeInOnScroll>
        <MainEventosSection isInstituto={true} />
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
                temasDisponibles={["Salud", "Medioambiente", "Digitalización", "Industria", "Formación", "Seguridad alimentaria"]}
              />
            </div>
          </section>
        </div>
      </FadeInOnScroll>

      <FadeInOnScroll >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
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

      <FadeInOnScroll>
        <MainHistoriasSection />
      </FadeInOnScroll>
    </section>
  );
}
