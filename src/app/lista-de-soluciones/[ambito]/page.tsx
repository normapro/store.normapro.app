"use client";

import { useParams } from "next/navigation";
import SolutionsHero from "@/components/SolutionsHero";
import AmbitosTabs from "@/components/AmbitosTabs";

const ListaDeSoluciones = () => {
  const { ambito } = useParams();

  return (
    <main>
      <SolutionsHero />
      <section>
        <AmbitosTabs sectorSlug={null} ambitoSlug={ambito ? String(ambito) : "all"} />
      </section>
    </main>
  );
};

export default ListaDeSoluciones;
