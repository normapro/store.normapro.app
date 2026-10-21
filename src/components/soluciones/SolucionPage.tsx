import type { Metadata } from "next";
import { redirect } from "next/navigation";
import JsonLd from "@/components/seo/JsonLd";
import SolucionDetalle from "@/components/soluciones/SolucionDetalle";
import { Solucion } from "@/types/solucion";
import { BreadcrumbStep, breadcrumbJsonLd, faqJsonLd, multimediaImage, pageMetadata, toBreadcrumbItem } from "@/libs/seo";
import { getAmbitoBySlug, getSectorBySlug, getSolucion, getTestimonios } from "@/services/storeService";

// Parámetros de las rutas /soluciones/[ambito]/[slugSolucion] y /soluciones/[ambito]/sector/[sector]/[slugSolucion].
export type SolucionRouteParams = {
	ambito: string;
	slugSolucion: string;
	sector?: string;
};

// Ruta canónica con los slugs que devuelve la API, no con los de la URL pedida (que puede traer "all" u otro ámbito).
const canonicalPath = (solucion: Solucion, params: SolucionRouteParams) => {
	const ambito = solucion.slug_ambito || params.ambito;
	const slug = solucion.slug || params.slugSolucion;
	if (!params.sector) return `/soluciones/${ambito}/${slug}`;
	return `/soluciones/${ambito}/sector/${solucion.slug_sector || params.sector}/${slug}`;
};

async function getBreadcrumbSteps(solucion: Solucion, params: SolucionRouteParams): Promise<BreadcrumbStep[]> {
	const ambitoSlug = solucion.slug_ambito || params.ambito;
	const ambito = await getAmbitoBySlug(ambitoSlug);
	const steps: BreadcrumbStep[] = [
		{ name: "Home", path: "/" },
		{ name: "Soluciones", path: "/soluciones" },
		{ name: ambito?.description?.trim() || ambitoSlug, path: `/soluciones/${ambitoSlug}` },
	];

	if (params.sector) {
		const sectorSlug = solucion.slug_sector || params.sector;
		const sector = await getSectorBySlug(sectorSlug).catch(() => null);
		steps.push({ name: sector?.description?.trim() || sectorSlug, path: `/soluciones/${ambitoSlug}/sector/${sectorSlug}` });
	}

	steps.push({ name: solucion.description, path: canonicalPath(solucion, params) });
	return steps;
}

export async function solucionMetadata(params: SolucionRouteParams): Promise<Metadata> {
	const solucion = await getSolucion(params.slugSolucion, params.sector);
	if (!solucion) return {};

	return pageMetadata({
		titleWeb: solucion.titleweb,
		title: solucion.title || solucion.description,
		description: solucion.subtitle,
		path: canonicalPath(solucion, params),
		image: multimediaImage(solucion.multimediaUri, solucion.multimediaTypeId),
	});
}

export default async function SolucionPage({ params }: { params: SolucionRouteParams }) {
	const solucion = await getSolucion(params.slugSolucion, params.sector);

	// Igual que las rutas desconocidas del sitio, una solución inexistente vuelve a la home.
	if (!solucion) redirect("/");

	let testimonios: Awaited<ReturnType<typeof getTestimonios>> = [];
	let error: string | null = null;
	try {
		testimonios = await getTestimonios(1);
	} catch (err) {
		console.error(err);
		error = "No se pudieron cargar los testimonios.";
	}

	const steps = await getBreadcrumbSteps(solucion, params);

	return (
		<>
			<JsonLd data={[breadcrumbJsonLd(steps), faqJsonLd(solucion.faqs)]} />
			<SolucionDetalle
				solucion={solucion}
				breadcrumbData={toBreadcrumbItem(steps)}
				testimonios={testimonios}
				error={error}
			/>
		</>
	);
}
