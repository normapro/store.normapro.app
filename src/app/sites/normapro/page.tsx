import type { Metadata } from "next";
import HomeNormapro from "@/components/home/HomeNormapro";
import { pageMetadata } from "@/libs/seo";

// Título y descripción: el titular y el texto del hero (MainHeroCarousel).
// La portada comparte segmento con el layout y no hereda la plantilla de título, por eso va completo.
export const metadata: Metadata = pageMetadata({
  titleWeb: "Digitalización sin límites | NormaPro",
  description: "Navegamos contigo hacia una evolución tecnológica accesible, segura y sin barreras.",
  path: "/",
});

export default function Home() {
  return <HomeNormapro />;
}
