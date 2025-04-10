import HeroSection from "@/components/landings/HeroSection";
import ClientCarousel from "@/components/shared/ClientCarousel";

const sectionMap: Record<string, any> = {
  HeroSection,
  ClientCarousel,
};

async function getAplicacion(slug: string) {
  const res = await fetch(`http://localhost:3010/v1/aplicaciones/${slug}`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) throw new Error("Error al cargar aplicación");
  return res.json();
}

export default async function AplicacionPage({
  params,
}: {
  params: { aplicacion: string };
}) {
  const data = await getAplicacion(params.aplicacion);

  return (
    <main className="w-full flex flex-col items-center justify-center gap-8 px-6 py-12 lg:px-24">
      {data.contenidos.map((bloque: any) => {
        const Component = sectionMap[bloque.tipo];
        if (!Component) return null;
        return <Component key={bloque.id} {...bloque.data} />;
      })}
    </main>
  );
}
