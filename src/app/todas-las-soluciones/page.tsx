"use client";
import { useState } from "react";
import SolutionsHero from "@/components/SolutionsHero";
import AmbitosTabs from "@/components/AmbitosTabs";

const TodasLasSoluciones = () => {
  const [sectorId, setSectorId] = useState<number | null>(null);

  return (
    <main>
      <SolutionsHero />
      <section className="max-w-7xl mx-auto px-6">
        <AmbitosTabs sectorId={sectorId} />
      </section>
    </main>
  );
};

export default TodasLasSoluciones;
