import { NextRequest } from "next/server";
import { SiteKey, absoluteUrl, siteForHost } from "@/libs/seo";
import {
	getActualidad,
	getAmbitos,
	getAmbitosConSoluciones,
	getAplicaciones,
	getConsultorias,
	getHistorias,
	getInformes,
	getListSoluciones,
	getPacksCategoria,
	getSectores,
} from "@/services/storeService";

export const revalidate = 3600;

type SitemapEntry = { path: string; lastModified?: string };

// Páginas fijas de cada sitio (las mismas rutas que existen en src/app/sites).
const NORMAPRO_STATIC_PATHS = [
	"/",
	"/soluciones",
	"/historias",
	"/informes",
	"/actualidad",
	"/nosotros",
	"/partners",
	"/trabaja",
	"/politicas",
	"/aviso-legal",
	"/politica-de-privacidad",
	"/politica-de-cookies-ue",
];

const INSTITUTO_STATIC_PATHS = [
	"/",
	"/que-hacemos",
	"/equipo",
	"/mision-vision-valores",
	"/apariciones-prensa",
	"/material-prensa",
	"/contacto",
];

// Ejecuta las tareas con un máximo de peticiones simultáneas para no saturar la API.
async function mapWithLimit<T, R>(items: T[], limit: number, task: (item: T) => Promise<R>): Promise<R[]> {
	const results: R[] = new Array(items.length);
	let next = 0;
	const workers = Array.from({ length: Math.min(limit, items.length) }, async () => {
		while (next < items.length) {
			const index = next++;
			results[index] = await task(items[index]);
		}
	});
	await Promise.all(workers);
	return results;
}

// La API guarda "YYYY-MM-DD HH:mm:ss" sin zona horaria: se publica solo el día.
const toIsoDate = (value?: string | null) => {
	const day = value?.trim().slice(0, 10);
	return day && /^\d{4}-\d{2}-\d{2}$/.test(day) ? day : undefined;
};

async function getNormaproEntries(): Promise<SitemapEntry[]> {
	const entries: SitemapEntry[] = NORMAPRO_STATIC_PATHS.map((path) => ({ path }));

	const [ambitos, sectores, packs, historias, informes, actualidad, aplicaciones, consultorias] = await Promise.all([
		getAmbitos(),
		getSectores(),
		getPacksCategoria(),
		getHistorias(),
		getInformes(),
		getActualidad(),
		getAplicaciones(),
		getConsultorias(),
	]);

	// Ámbitos y soluciones de cada ámbito.
	const solucionesPorAmbito = await mapWithLimit(ambitos, 6, (ambito) => getListSoluciones(ambito.slug));
	ambitos.forEach((ambito, index) => {
		entries.push({ path: `/soluciones/${ambito.slug}` });
		solucionesPorAmbito[index].forEach((solucion) => {
			if (solucion.slug) entries.push({ path: `/soluciones/${solucion.slug_ambito || ambito.slug}/${solucion.slug}` });
		});
	});

	// Sectores: portada del sector, sector × ámbito y soluciones de cada combinación.
	const ambitosPorSector = await mapWithLimit(sectores, 6, (sector) => getAmbitosConSoluciones(sector.slug));
	const combinaciones: { ambito: string; sector: string }[] = [];
	sectores.forEach((sector, index) => {
		if (!sector.slug) return;
		entries.push({ path: `/soluciones/all/sector/${sector.slug}` });
		ambitosPorSector[index]
			.filter((ambito) => ambito.slug && Number(ambito.total_soluciones ?? 0) > 0)
			.forEach((ambito) => combinaciones.push({ ambito: ambito.slug, sector: sector.slug }));
	});

	const solucionesPorCombinacion = await mapWithLimit(combinaciones, 6, (combinacion) =>
		getListSoluciones(combinacion.ambito, combinacion.sector)
	);
	combinaciones.forEach((combinacion, index) => {
		entries.push({ path: `/soluciones/${combinacion.ambito}/sector/${combinacion.sector}` });
		solucionesPorCombinacion[index].forEach((solucion) => {
			if (solucion.slug) {
				entries.push({ path: `/soluciones/${combinacion.ambito}/sector/${combinacion.sector}/${solucion.slug}` });
			}
		});
	});

	packs.forEach((pack) => {
		if (pack.slug && pack.slug_ambito) entries.push({ path: `/soluciones/${pack.slug_ambito}/packs/${pack.slug}` });
	});

	historias.forEach((historia) => {
		const slug = historia.slug || String(historia.id);
		entries.push({ path: `/historias/${slug}` });
	});

	informes.forEach((informe) => {
		const slug = informe.slug || (informe.id ? String(informe.id) : "");
		if (slug) entries.push({ path: `/informes/${slug}` });
	});

	actualidad.forEach((noticia) => {
		const slug = noticia.slug || String(noticia.id_noticia);
		entries.push({ path: `/actualidad/${slug}`, lastModified: toIsoDate(noticia.fecha) });
	});

	aplicaciones.forEach((aplicacion) => {
		if (aplicacion.slug) entries.push({ path: `/aplicaciones/${aplicacion.slug}` });
	});

	consultorias.forEach((consultoria) => {
		if (consultoria.slug) entries.push({ path: `/consultorias/${consultoria.slug}` });
	});

	return entries;
}

const escapeXml = (value: string) =>
	value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");

function renderSitemap(entries: SitemapEntry[], site: SiteKey) {
	const seen = new Set<string>();
	const urls = entries
		.map((entry) => ({ ...entry, loc: absoluteUrl(entry.path, site) }))
		.filter((entry) => (seen.has(entry.loc) ? false : (seen.add(entry.loc), true)))
		.map(
			(entry) =>
				`  <url><loc>${escapeXml(entry.loc)}</loc>${entry.lastModified ? `<lastmod>${entry.lastModified}</lastmod>` : ""}</url>`
		);

	return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join("\n")}\n</urlset>\n`;
}

export async function GET(request: NextRequest) {
	const site = siteForHost(request.headers.get("host"));
	const entries = site === "instituto" ? INSTITUTO_STATIC_PATHS.map((path) => ({ path })) : await getNormaproEntries();

	return new Response(renderSitemap(entries, site), {
		headers: { "Content-Type": "application/xml; charset=utf-8" },
	});
}
