import LandingBuilder from "@/components/LandingBuilder";
import API_ENDPOINTS from "@/config/api";// 🔁 Fetch server-side de la aplicación
async function getConsultoria(slug: string) {
  const res = await fetch(`${API_ENDPOINTS.CONSULTORIA}/${slug}`, {
    next: { revalidate: 60 }, // ISR cada 60 segundos
  });
  if (!res.ok) throw new Error("Error al cargar aplicación");
  return res.json();
  
}

// ✅ Tipos compatibles con Next.js 15+
type Params = { consultorias: string };
type SearchParams = { [key: string]: string | string[] | undefined };

export default async function Page({
  params,
  searchParams,
}: {
  params: Params;
  searchParams: SearchParams;
}) {
  const { consultorias } = await params; // 👈 Esto evita el warning oficial
  const data = await getConsultoria(consultorias);

  return (
    <> 
            
      <LandingBuilder bloques={data.contenidos} />
    </>
  )
  ;
}
