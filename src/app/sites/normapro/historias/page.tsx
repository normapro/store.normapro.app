import type { Metadata } from "next";
import HistoriasListado from "@/components/historias/HistoriasListado";
import { pageMetadata } from "@/libs/seo";

// Título y descripción: los textos de cabecera de HistoriasClientesSection.
export const metadata: Metadata = pageMetadata({
	title: "Éxitos que inspiran",
	description: "Descubre cómo NormaPro contribuye al éxito de organizaciones.",
	path: "/historias",
});

export default function HistoriasPage() {
	return <HistoriasListado />;
}
