import type { Metadata } from "next";
import SolucionPage, { solucionMetadata } from "@/components/soluciones/SolucionPage";

type Props = {
	params: Promise<{ ambito: string; sector: string; slugSolucion: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	return solucionMetadata(await params);
}

export default async function SolucionAmbitoSectorPage({ params }: Props) {
	return <SolucionPage params={await params} />;
}
