"use client";

import SolutionsHero from "@/components/SolutionsHero";
import AmbitosTabs from "@/components/AmbitosTabs";

const ListaDeSoluciones = () => {
  return (
    <main>
      <SolutionsHero />
      <section>
        <AmbitosTabs sectorSlug={null} ambitoIdSelected={null} />
      </section>
    </main>
  );
};

export default ListaDeSoluciones;
