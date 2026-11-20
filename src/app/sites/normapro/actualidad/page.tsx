import type { Metadata } from "next";
import ActualidadListado from "@/components/actualidad/ActualidadListado";
import { pageMetadata } from "@/libs/seo";

export const metadata: Metadata = pageMetadata({ title: "Actualidad", path: "/actualidad" });

type Props = {
	searchParams: Promise<{ tema?: string }>;
};

export default async function ActualidadPage({ searchParams }: Props) {
	const { tema } = await searchParams;
	return <ActualidadListado tema={tema} />;
}
