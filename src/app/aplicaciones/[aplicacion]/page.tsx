import LandingBuilder from "@/components/LandingBuilder";

// 🔁 Fetch server-side de la aplicación
async function getAplicacion(slug: string) {
  const res = await fetch(`http://localhost:3010/v1/aplicaciones/${slug}`, {
    next: { revalidate: 60 }, // ISR cada 60 segundos
  });
  if (!res.ok) throw new Error("Error al cargar aplicación");
  return res.json();
}

// ✅ Tipos compatibles con Next.js 15+
type Params = { aplicacion: string };
type SearchParams = { [key: string]: string | string[] | undefined };

export default async function Page({
  params,
  searchParams,
}: {
  params: Params;
  searchParams: SearchParams;
}) {
  const { aplicacion } = await params; // 👈 Esto evita el warning oficial
  const data = await getAplicacion(aplicacion);

  return <LandingBuilder bloques={data.contenidos} />;
}
