import type { Metadata } from "next";
import { cache } from "react";
import API_ENDPOINTS from "@/config/api";
import NoticiaDetalle from "@/components/actualidad/NoticiaDetalle";
import { formatContentParagraphs } from "@/components/actualidad/actualidadUtils";
import JsonLd from "@/components/seo/JsonLd";
import { Actualidad } from "@/types/actualidad";
import { STORE_REVALIDATE_SECONDS } from "@/services/storeService";
import { NORMAPRO_SITE_NAME, absoluteUrl, breadcrumbJsonLd, pageMetadata, resolvePublicImage, truncateText } from "@/libs/seo";

type Props = {
	params: Promise<{ noticia: string }>;
};

// Busca la noticia por slug y, si no existe y es numérico, por id (mismo orden que antes en cliente).
const getNoticia = cache(async (noticiaSlug: string): Promise<Actualidad | null> => {
	const slug = noticiaSlug.trim();
	if (!slug) return null;

	try {
		let response = await fetch(`${API_ENDPOINTS.ACTUALIDAD}/slug/${encodeURIComponent(slug)}`, {
			next: { revalidate: STORE_REVALIDATE_SECONDS },
		});

		if (!response.ok && /^\d+$/.test(slug)) {
			response = await fetch(`${API_ENDPOINTS.ACTUALIDAD}/${slug}`, {
				next: { revalidate: STORE_REVALIDATE_SECONDS },
			});
		}

		if (!response.ok) return null;
		return (await response.json()) as Actualidad;
	} catch (err) {
		console.error(err);
		return null;
	}
});

// La API guarda la fecha como "YYYY-MM-DD HH:mm:ss".
const toIsoDate = (fecha?: string | null) => {
	if (!fecha) return undefined;
	const iso = fecha.trim().replace(" ", "T");
	return Number.isNaN(new Date(iso).getTime()) ? undefined : iso;
};

const canonicalPath = (noticia: Actualidad, slug: string) => `/actualidad/${noticia.slug || slug}`;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { noticia: slug } = await params;
	const noticia = await getNoticia(slug);
	if (!noticia) return { robots: { index: false, follow: true } };

	const primerParrafo = formatContentParagraphs(noticia.content)[0];

	return pageMetadata({
		title: noticia.title,
		description: primerParrafo ? truncateText(primerParrafo) : undefined,
		path: canonicalPath(noticia, slug),
		image: resolvePublicImage(noticia.imagen),
		type: "article",
		publishedTime: toIsoDate(noticia.fecha),
	});
}

export default async function NoticiaPage({ params }: Props) {
	const { noticia: slug } = await params;
	const noticia = await getNoticia(slug);

	if (!noticia) {
		return (
			<main className="w-full py-12">
				<section className="max-w-7xl mx-auto px-6">
					<p className="text-red-600">No se encontro la noticia.</p>
				</section>
			</main>
		);
	}

	const path = canonicalPath(noticia, slug);
	const image = resolvePublicImage(noticia.imagen);
	const steps = [
		{ name: "Home", path: "/" },
		{ name: "Actualidad", path: "/actualidad" },
		{ name: noticia.title, path },
	];

	return (
		<>
			<JsonLd
				data={[
					breadcrumbJsonLd(steps),
					{
						"@context": "https://schema.org",
						"@type": "NewsArticle",
						headline: noticia.title,
						mainEntityOfPage: absoluteUrl(path),
						...(image ? { image: [absoluteUrl(image)] } : {}),
						...(toIsoDate(noticia.fecha) ? { datePublished: toIsoDate(noticia.fecha) } : {}),
						publisher: { "@type": "Organization", name: NORMAPRO_SITE_NAME, url: absoluteUrl("/") },
					},
				]}
			/>
			<NoticiaDetalle noticia={noticia} />
		</>
	);
}
