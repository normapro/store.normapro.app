import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { cache } from "react";
import LandingBuilder from "@/components/LandingBuilder";
import API_ENDPOINTS from "@/config/api";
import JsonLd from "@/components/seo/JsonLd";
import { Aplicacion } from "@/types/aplicacion";
import { breadcrumbJsonLd, pageMetadata } from "@/libs/seo";

type AplicacionLanding = Aplicacion & { contenidos: any[] };

// Fetch server-side de la aplicación. Devuelve null si la API responde 404.
const getAplicacion = cache(async (slug: string): Promise<AplicacionLanding | null> => {
  const res = await fetch(`${API_ENDPOINTS.APLICACION}/${encodeURIComponent(slug)}`, {
    next: { revalidate: 60 }, // ISR cada 60 segundos
  });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error("Error al cargar la aplicación");
  return res.json();
});

type Props = {
  params: Promise<{ aplicacion: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { aplicacion } = await params;
  const data = await getAplicacion(aplicacion);
  if (!data) return {};

  return pageMetadata({
    title: data.description,
    description: data.shortDescription,
    path: `/aplicaciones/${data.slug || aplicacion}`,
  });
}

export default async function Page({ params }: Props) {
  const { aplicacion } = await params;
  const data = await getAplicacion(aplicacion);

  // Igual que las rutas desconocidas del sitio, si no existe vuelve a la home.
  if (!data) redirect("/");

  const steps = [
    { name: "Home", path: "/" },
    { name: data.description, path: `/aplicaciones/${data.slug || aplicacion}` },
  ];

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(steps)} />
      <LandingBuilder bloques={data.contenidos} />
    </>
  );
}
