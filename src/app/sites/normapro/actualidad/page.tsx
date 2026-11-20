import type { Metadata } from "next";
import ActualidadListado from "@/components/actualidad/ActualidadListado";
import { pageMetadata } from "@/libs/seo";

export const metadata: Metadata = pageMetadata({ title: "Actualidad", path: "/actualidad" });

export default function ActualidadPage() {
	return <ActualidadListado />;
}
