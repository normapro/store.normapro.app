"use client";
import { useState } from "react";
import SolutionsHero from "@/components/SolutionsHero";
import AmbitosTabs from "@/components/AmbitosTabs";

const TodasLasSoluciones = () => {
  const [sectorSlug, setSectorSlug] = useState<string | null | undefined>(null);

  return (
    <main>
      <SolutionsHero />
      <section >
        <AmbitosTabs sectorSlug={sectorSlug} ambitoSlug={null} />
      </section>
    </main>
  );
};

export default TodasLasSoluciones;
