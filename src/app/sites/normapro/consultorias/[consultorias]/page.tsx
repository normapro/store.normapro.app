import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { cache } from "react";
import LandingBuilder from "@/components/LandingBuilder";
import API_ENDPOINTS from "@/config/api";
import JsonLd from "@/components/seo/JsonLd";
import { Consultoria } from "@/types/consultoria";
import { breadcrumbJsonLd, pageMetadata } from "@/libs/seo";

type ConsultoriaLanding = Consultoria & { contenidos: any[] };

// Fetch server-side de la consultoría. Devuelve null si la API responde 404.
const getConsultoria = cache(async (slug: string): Promise<ConsultoriaLanding | null> => {
  const res = await fetch(`${API_ENDPOINTS.CONSULTORIA}/${encodeURIComponent(slug)}`, {
    next: { revalidate: 60 }, // ISR cada 60 segundos
  });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error("Error al cargar la consultoría");
  return res.json();
});

type Props = {
  params: Promise<{ consultorias: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { consultorias } = await params;
  const data = await getConsultoria(consultorias);
  if (!data) return {};

  return pageMetadata({
    title: data.description,
    description: data.shortDescription,
    path: `/consultorias/${data.slug || consultorias}`,
  });
}

export default async function Page({ params }: Props) {
  const { consultorias } = await params;
  const data = await getConsultoria(consultorias);

  // Igual que las rutas desconocidas del sitio, si no existe vuelve a la home.
  if (!data) redirect("/");

  const steps = [
    { name: "Home", path: "/" },
    { name: data.description, path: `/consultorias/${data.slug || consultorias}` },
  ];

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(steps)} />
      <LandingBuilder bloques={data.contenidos} />
    </>
  );
}
