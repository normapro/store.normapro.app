// app/aplicaciones/[aplicacion]/page.tsx

import HeroSection from "@/components/landings/HeroSection";
import ClientCarouselWrapper from "@/components/landings/ClientCarouselWrapper";
import TextSection from "@/components/landings/TextSection";
import VideoSection from "@/components/landings/VideoSection";
import ClientPerceptionSection from "@/components/landings/ClientPerceptionSection";
import CaracteristicasIncorporadasSection from "@/components/landings/CaracteristicasIncorporadasSection";
import CaracteristicasStorytellingSection from "@/components/landings/CaracteristicasStorytellingSection";
import ObstaculosYSolucionesSection from "@/components/landings/ObstaculosYSolucionesSection";
import MovilPortalSection from "@/components/landings/MovilPortalSection";
import CertificacionesSection from "@/components/landings/CertificacionesSection";
import ResumenSection from "@/components/landings/ResumenSection";



// 🔁 Importante para páginas totalmente dinámicas


const sectionMap: Record<string, any> = {
  HeroSection,
  ClientCarouselWrapper,
  TextSection,
  VideoSection,
  ClientPerceptionSection,
  CaracteristicasIncorporadas: CaracteristicasStorytellingSection,
  ObstaculosYSolucionesSection: ObstaculosYSolucionesSection,
  MovilPortalSection: MovilPortalSection,
  CertificacionesSection: CertificacionesSection,
  ResumenSection: ResumenSection,
};

async function getAplicacion(slug: string) {
  const res = await fetch(`http://localhost:3010/v1/aplicaciones/${slug}`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) throw new Error("Error al cargar aplicación");
  return res.json();
}

export const dynamic = "force-dynamic";
export const dynamicParams = true;

export default async function AplicacionPage({
  params: { aplicacion },
}: {
  params: { aplicacion: string };
}) {
  const data = await getAplicacion(aplicacion);

  return (
    <main className="w-full flex flex-col items-center justify-center py-12">
      {data.contenidos.map((bloque: any) => {
        const Component = sectionMap[bloque.tipo];
        if (!Component) return null;
        return <Component key={bloque.id} {...bloque.data} />;
      })}
    </main>
  );
}
