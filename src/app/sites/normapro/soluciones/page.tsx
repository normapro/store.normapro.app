import type { Metadata } from "next";
import SolutionsHero from "@/components/SolutionsHero";
import AmbitosTabs from "@/components/AmbitosTabs";
import { pageMetadata } from "@/libs/seo";

export const metadata: Metadata = pageMetadata({ title: "Soluciones", path: "/soluciones" });

const ListaDeSoluciones = () => {
  return (
    <main>
      <SolutionsHero />
      <section>
        <AmbitosTabs sectorSlug={null} ambitoSlug={null} />
      </section>
    </main>
  );
};

export default ListaDeSoluciones;
