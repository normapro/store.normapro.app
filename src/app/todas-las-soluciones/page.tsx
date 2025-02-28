"use client";
import { useState } from "react";
import SolutionsHero from "@/components/SolutionsHero";
import AmbitosTabs from "@/components/AmbitosTabs";

const TodasLasSoluciones = () => {
  const [sectorSlug, setSectorSlug] = useState<string | null | undefined>(null);

  return (
    <main>
      <SolutionsHero />
      <section className="max-w-7xl mx-auto px-6">
        <AmbitosTabs sectorSlug={sectorSlug} ambitoIdSelected={null} />
      </section>
    </main>
  );
};

export default TodasLasSoluciones;
