import type { Metadata } from "next";
import { redirect } from "next/navigation";
import SolutionsHero from "@/components/SolutionsHero";
import AmbitosTabs from "@/components/AmbitosTabs";
import MainTestimoniosSection from "@/components/MainTestimoniosSection";
import HistoriasClientesSection from "@/components/landings/HistoriasClientesSection";
import CtaDiagnosticoSection from "@/components/soluciones/CtaDiagnosticoSection";
import JsonLd from "@/components/seo/JsonLd";
import { breadcrumbJsonLd, pageMetadata } from "@/libs/seo";
import { getAmbitos } from "@/services/storeService";

type Props = {
  params: Promise<{ ambito: string }>;
};

// "all" muestra el mismo listado que /soluciones.
async function getAmbitoData(slug: string) {
  if (slug === "all") return { esTodos: true, ambito: null, existe: true };
  const ambitos = await getAmbitos();
  const ambito = ambitos.find((item) => item.slug === slug) ?? null;
  // Si la API no responde (lista vacía) no se considera inexistente.
  return { esTodos: false, ambito, existe: Boolean(ambito) || ambitos.length === 0 };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { ambito: slug } = await params;
  const { esTodos, ambito } = await getAmbitoData(slug);

  if (esTodos) return pageMetadata({ title: "Soluciones", path: "/soluciones" });

  return pageMetadata({
    title: ambito?.description,
    description: ambito?.textoweb,
    path: `/soluciones/${slug}`,
  });
}

const ListaDeSoluciones = async ({ params }: Props) => {
  const { ambito: slug } = await params;
  const { esTodos, ambito, existe } = await getAmbitoData(slug);

  // Igual que las rutas desconocidas del sitio, un ámbito inexistente vuelve a la home.
  if (!existe) redirect("/");

  const steps = [
    { name: "Home", path: "/" },
    { name: "Soluciones", path: "/soluciones" },
    ...(!esTodos && ambito ? [{ name: ambito.description.trim(), path: `/soluciones/${slug}` }] : []),
  ];

  return (
    <main>
      <JsonLd data={breadcrumbJsonLd(steps)} />
      <SolutionsHero />
      <section>
        <AmbitosTabs sectorSlug={null} ambitoSlug={slug || "all"} />
      </section>
      <MainTestimoniosSection soloOpiniones={true} />
      <HistoriasClientesSection soloUnaHistoria={true} />

      <CtaDiagnosticoSection />
    </main>
  );
};

export default ListaDeSoluciones;
