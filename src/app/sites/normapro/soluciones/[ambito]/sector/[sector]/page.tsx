import type { Metadata } from "next";
import { redirect } from "next/navigation";
import SolutionsHeroSector from "@/components/SolutionsHeroSector";
import AmbitosTabs from "@/components/AmbitosTabs";
import MainTestimoniosSection from "@/components/MainTestimoniosSection";
import HistoriasClientesSection from "@/components/landings/HistoriasClientesSection";
import CtaDiagnosticoSection from "@/components/soluciones/CtaDiagnosticoSection";
import JsonLd from "@/components/seo/JsonLd";
import { BreadcrumbStep, breadcrumbJsonLd, pageMetadata, resolvePublicImage } from "@/libs/seo";
import { getAmbitoBySlug, getSectorBySlug } from "@/services/storeService";

type Props = {
  params: Promise<{ ambito: string; sector: string }>;
};

async function getDatos(ambitoSlug: string, sectorSlug: string) {
  const [sector, ambito] = await Promise.all([
    getSectorBySlug(sectorSlug),
    ambitoSlug === "all" ? Promise.resolve(null) : getAmbitoBySlug(ambitoSlug),
  ]);
  return { sector, ambito };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { ambito: ambitoSlug, sector: sectorSlug } = await params;
  const { sector, ambito } = await getDatos(ambitoSlug, sectorSlug);
  if (!sector) return {};

  // Título del sector (titleweb) precedido del ámbito cuando la página está filtrada por uno.
  const sectorTitle = sector.titleweb?.trim() || sector.description;
  const ambitoName = ambito?.description?.trim();

  return pageMetadata({
    title: ambitoName ? `${ambitoName} | ${sectorTitle}` : sectorTitle,
    description: sector.descriptionweb,
    path: `/soluciones/${ambitoSlug}/sector/${sector.slug || sectorSlug}`,
    image: resolvePublicImage(sector.backgroundImage),
  });
}

const ListaSolucionesSector = async ({ params }: Props) => {
  const { ambito: ambitoSlug, sector: sectorSlug } = await params;
  const { sector, ambito } = await getDatos(ambitoSlug, sectorSlug);

  // Igual que las rutas desconocidas del sitio, un sector inexistente vuelve a la home.
  if (!sector) redirect("/");

  const steps: BreadcrumbStep[] = [
    { name: "Home", path: "/" },
    { name: "Soluciones", path: "/soluciones" },
    ...(ambito ? [{ name: ambito.description.trim(), path: `/soluciones/${ambitoSlug}` }] : []),
    { name: sector.description, path: `/soluciones/${ambitoSlug}/sector/${sectorSlug}` },
  ];

  return (
    <main>
      <JsonLd data={breadcrumbJsonLd(steps)} />
      <SolutionsHeroSector sectorSlug={sectorSlug || "non-specified"} />
      <section>
        <AmbitosTabs sectorSlug={sectorSlug || "non-specified"} ambitoSlug={ambitoSlug || "all"} />
      </section>
      <MainTestimoniosSection soloOpiniones={true} />
      <HistoriasClientesSection soloUnaHistoria={true} />

      <CtaDiagnosticoSection />
    </main>
  );
};

export default ListaSolucionesSector;
