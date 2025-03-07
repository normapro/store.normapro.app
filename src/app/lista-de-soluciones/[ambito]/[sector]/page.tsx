"use client";

import { useParams } from "next/navigation";
import SolutionsHeroSector from "@/components/SolutionsHeroSector";
import AmbitosTabs from "@/components/AmbitosTabs";

const ListaDeSoluciones = () => {
  const { ambito, sector } = useParams(); // Obtiene los parámetros de la URL

  return (
    <main>
      <SolutionsHeroSector sectorSlug={sector ? String(sector) : "non-specified"} />
      <section>
        <AmbitosTabs sectorSlug={sector ? String(sector) : "non-specified"} ambitoSlug={ambito ? String(ambito) : "all"} />
      </section>
    </main>
  );
};

export default ListaDeSoluciones;
