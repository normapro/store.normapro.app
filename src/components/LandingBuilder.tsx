// src/components/LandingBuilder.tsx
import {
    HeroSection,
    ClientCarouselWrapper,
    TextSection,
    VideoSection,
    ClientPerceptionSection,
    CaracteristicasStorytellingSection,
    ObstaculosYSolucionesSection,
    MovilPortalSection,
    CertificacionesSection,
    ResumenSection,
  } from "@/components/landings"; // si tienes un index.ts que los agrupe
  
  const sectionMap: Record<string, React.ComponentType<any>> = {
    HeroSection,
    ClientCarouselWrapper,
    TextSection,
    VideoSection,
    ClientPerceptionSection,
    CaracteristicasIncorporadas: CaracteristicasStorytellingSection,
    ObstaculosYSolucionesSection,
    MovilPortalSection,
    CertificacionesSection,
    ResumenSection,
  };
  
  export default function LandingBuilder({ bloques }: { bloques: any[] }) {
    return (
      <main className="w-full flex flex-col items-center justify-center py-12">
        {bloques.map((bloque) => {
          const Component = sectionMap[bloque.tipo];
          if (!Component) return null;
          return <Component key={bloque.id} {...bloque.data} />;
        })}
      </main>
    );
  }
  