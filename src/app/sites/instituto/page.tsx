import type { Metadata } from "next";
import HomeInstituto from "@/components/home/HomeInstituto";
import { pageMetadata } from "@/libs/seo";

// Título: el titular del hero (MainHeroInstituto).
// La portada comparte segmento con el layout y no hereda la plantilla de título, por eso va completo.
export const metadata: Metadata = pageMetadata({
  titleWeb: "La excelencia es un hábito | Instituto de Innovación, Ciencia y Empresa",
  path: "/",
  site: "instituto",
});

export default function Home() {
  return <HomeInstituto />;
}
