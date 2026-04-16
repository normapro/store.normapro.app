"use client";

import { useParams } from "next/navigation";
import SolutionsHero from "@/components/SolutionsHero";
import AmbitosTabs from "@/components/AmbitosTabs";
import MainTestimoniosSection from "@/components/MainTestimoniosSection";
import HistoriasClientesSection from "@/components/landings/HistoriasClientesSection";

const ListaDeSoluciones = () => {
  const { ambito } = useParams();

  return (
    <main>
      <SolutionsHero />
      <section>
        <AmbitosTabs sectorSlug={null} ambitoSlug={ambito ? String(ambito) : "all"} />
      </section>
      <MainTestimoniosSection soloOpiniones={true} />
      <HistoriasClientesSection soloUnaHistoria={true} />

      <section className="py-14 px-6 mt-10">
        <div className="max-w-7xl mx-auto text-center">
          <h3 className="text-[#0a1b55] font-extrabold text-[25px] leading-tight mb-7">
            Descubre cómo podemos ayudar a tu empresa
          </h3>

          <button
            type="button"
            className="bg-gradient-to-r from-[#00b2e3] to-[#cca1dd] shadow-md text-white text-[17px] leading-none px-12 py-5 rounded-2xl font-bold hover:opacity-90 transition"
          >
            Reserva un diagnóstico gratuito
          </button>
        </div>
      </section>

    </main>
  );
};

export default ListaDeSoluciones;
