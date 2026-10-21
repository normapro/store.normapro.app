import type { Metadata } from "next";
import { redirect } from "next/navigation";
import JsonLd from "@/components/seo/JsonLd";
import PackDetalle from "@/components/soluciones/PackDetalle";
import { Pack } from "@/types/pack";
import { BreadcrumbStep, breadcrumbJsonLd, faqJsonLd, multimediaImage, pageMetadata, toBreadcrumbItem } from "@/libs/seo";
import { getAmbitoBySlug, getPack, getTestimonios } from "@/services/storeService";

type Props = {
  params: Promise<{ ambito: string; slugPack: string }>;
};

const canonicalPath = (pack: Pack, ambito: string, slugPack: string) =>
  `/soluciones/${pack.slug_ambito || ambito}/packs/${pack.slug || slugPack}`;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { ambito, slugPack } = await params;
  const pack = await getPack(slugPack, ambito);
  if (!pack) return {};

  return pageMetadata({
    titleWeb: pack.titleweb,
    title: pack.title || pack.description,
    description: pack.subtitle || pack.shortDescription,
    path: canonicalPath(pack, ambito, slugPack),
    image: multimediaImage(pack.multimediaUri, pack.multimediaTypeId),
  });
}

export default async function PackPage({ params }: Props) {
  const { ambito, slugPack } = await params;
  const pack = await getPack(slugPack, ambito);

  // Igual que las rutas desconocidas del sitio, un pack inexistente vuelve a la home.
  if (!pack) redirect("/");

  let testimonios: Awaited<ReturnType<typeof getTestimonios>> = [];
  let error: string | null = null;
  try {
    testimonios = await getTestimonios(1);
  } catch (err) {
    console.error(err);
    error = "No se pudieron cargar los testimonios.";
  }

  const ambitoSlug = pack.slug_ambito || ambito;
  const ambitoData = await getAmbitoBySlug(ambitoSlug);
  const steps: BreadcrumbStep[] = [
    { name: "Home", path: "/" },
    { name: "Soluciones", path: "/soluciones" },
    { name: ambitoData?.description?.trim() || ambitoSlug, path: `/soluciones/${ambitoSlug}` },
    { name: pack.title, path: canonicalPath(pack, ambito, slugPack) },
  ];

  return (
    <>
      <JsonLd data={[breadcrumbJsonLd(steps), faqJsonLd(pack.faqs)]} />
      <PackDetalle
        pack={pack}
        ambito={ambito}
        breadcrumbData={toBreadcrumbItem(steps)}
        testimonios={testimonios}
        error={error}
      />
    </>
  );
}
