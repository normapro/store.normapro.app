import Image from "next/image";
import Link from "next/link";
import { access } from "node:fs/promises";
import path from "node:path";
import API_ENDPOINTS from "@/config/api";
import InformeDescargaCtaSection from "@/components/landings/InformeDescargaCtaSection";
import { IndiceInformeChild, IndiceInformeItem, Informe, PrologoInformeItem, ResponsableInforme } from "@/types/informe";

type InformeDetallePageProps = {
	params: Promise<{ informe: string }>;
};

type InformeDetalle = Informe & {
	resolvedImgInforme: string | null;
	prologoSafe: PrologoInformeItem[];
	prologoHtmlSafe: string | null;
	indiceSafe: NormalizedIndiceItem[];
	responsablesSafe: NormalizedResponsable[];
};

type NormalizedIndiceItem = {
	title: string;
	ul: string[];
};

type NormalizedResponsable = {
	nombre: string;
	empresa: string;
	cargo: string;
	imagen: string | null;
};

function parseArrayField<T>(field: unknown): T[] {
	if (Array.isArray(field)) return field as T[];
	if (typeof field === "string") {
		try {
			const parsed = JSON.parse(field);
			return Array.isArray(parsed) ? (parsed as T[]) : [];
		} catch {
			return [];
		}
	}
	return [];
}

function normalizePrologoField(field: unknown): { items: PrologoInformeItem[]; html: string | null } {
	// Soporta prologo como array de bloques o HTML directo.
	if (Array.isArray(field)) {
		return { items: field as PrologoInformeItem[], html: null };
	}

	if (typeof field === "string") {
		const trimmed = field.trim();
		if (!trimmed) {
			return { items: [], html: null };
		}

		try {
			const parsed = JSON.parse(trimmed);
			if (Array.isArray(parsed)) {
				return { items: parsed as PrologoInformeItem[], html: null };
			}
		} catch {
			return { items: [], html: trimmed };
		}

		return { items: [], html: trimmed };
	}

	return { items: [], html: null };
}

function normalizeIndiceChild(child: IndiceInformeChild): string {
	if (typeof child === "string") {
		return child.trim();
	}

	const title = child?.title?.trim() || "";
	const claim = child?.claim?.trim() || "";

	if (!title && !claim) return "";
	if (!claim) return title;
	if (!title) return claim;

	return `${title} ${claim}`;
}

function normalizeIndiceField(field: unknown): NormalizedIndiceItem[] {
	// Convierte el indice en formato uniforme: titulo + lista opcional.
	const source = parseArrayField<IndiceInformeItem>(field);

	return source
		.map((item) => {
			const title = item?.title?.trim() || "";
			const ulSource = Array.isArray(item?.ul) ? item.ul : [];
			const ul = ulSource
				.map((entry) => normalizeIndiceChild(entry))
				.filter((entry) => entry.length > 0);

			return { title, ul };
		})
		.filter((item) => item.title.length > 0 || item.ul.length > 0);
}

function normalizeResponsablesField(field: unknown): ResponsableInforme[] {
	return parseArrayField<ResponsableInforme>(field).filter((item) => {
		const nombre = item?.nombre?.trim();
		const empresa = item?.empresa?.trim();
		const cargo = item?.cargo?.trim();
		const imagen = item?.imagen?.trim();
		return Boolean(nombre || empresa || cargo || imagen);
	});
}

async function fileExistsInPublic(publicRelativePath: string): Promise<boolean> {
	const relativePath = publicRelativePath.replace(/^\/+/, "");
	const absolutePath = path.join(process.cwd(), "public", relativePath);

	try {
		await access(absolutePath);
		return true;
	} catch {
		return false;
	}
}

async function resolveInformeImagePath(imagePath?: string): Promise<string | null> {
	if (!imagePath) return null;
	const cleanPath = imagePath
		.trim()
		.replace(/\\/g, "/")
		.replace(/^['\"]+|['\"]+$/g, "");

	if (!cleanPath) return null;
	if (cleanPath.startsWith("http://") || cleanPath.startsWith("https://")) {
		return cleanPath;
	}

	if (cleanPath.startsWith("/")) {
		return cleanPath;
	}

	const relativePath = cleanPath.replace(/^\.\//, "").replace(/^informes\//, "");
	const candidates = [`/informes/${relativePath}`];

	if (!relativePath.includes("/")) {
		candidates.push(`/informes/personas/${relativePath}`);
	}

	for (const candidate of candidates) {
		if (await fileExistsInPublic(candidate)) {
			return candidate;
		}
	}

	return candidates[0];
}

async function getInformeById(id: string): Promise<InformeDetalle | null> {
	try {
		const response = await fetch(`${API_ENDPOINTS.INFORMES}/${id}`, {
			cache: "no-store",
		});

		if (!response.ok) {
			return null;
		}

		const data = (await response.json()) as Informe;
		const normalizedPrologo = normalizePrologoField(data.prologo);
		const rawResponsables = normalizeResponsablesField(data.responsables);
		const responsables = await Promise.all(
			rawResponsables.map(async (item) => ({
				nombre: item.nombre?.trim() || "Sin nombre",
				empresa: item.empresa?.trim() || "",
				cargo: item.cargo?.trim() || "",
				imagen: await resolveInformeImagePath(item.imagen),
			}))
		);

		return {
			...data,
			resolvedImgInforme: await resolveInformeImagePath(
				data.imgInforme || data.img_informe || data.imgPortada || data.img_portada
			),
			prologoSafe: normalizedPrologo.items,
			prologoHtmlSafe: normalizedPrologo.html,
			indiceSafe: normalizeIndiceField(data.indice),
			responsablesSafe: responsables,
		};
	} catch {
		return null;
	}
}

export default async function InformeDetallePage({ params }: InformeDetallePageProps) {
	const { informe } = await params;
	const data = await getInformeById(informe);

	if (!data) {
		return (
			<main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
				<h1 className="text-3xl font-bold text-[#010d3d]">Informe no encontrado</h1>
			</main>
		);
	}

	const titulo = data.titulo?.trim() || "Informe sin titulo";
	const prologoItems = data.prologoSafe;
	const prologoHtml = data.prologoHtmlSafe;
	const indiceItems = data.indiceSafe;
	const responsables = data.responsablesSafe;
	const textoDescarga = data.textoDescarga?.trim() || "";

	return (
		<main className="w-full">
			{/* Migas de pan */}
			<section className="bg-white border-y border-[#d6dae4]">
				<nav
					aria-label="Migas de pan"
					className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 text-[12px] text-[#24335f]"
				>
					<Link href="/" className="font-bold hover:underline">
						Home
					</Link>
					<span className="mx-1 text-[#6e7692]">&gt;</span>
					<Link href="/informes" className="font-bold hover:underline">
						Informes
					</Link>
					<span className="mx-1 text-[#6e7692]">&gt;</span>
					<span className="text-[#24335f]">{titulo}</span>
				</nav>
			</section>

			{/* Cabecera del informe  */}
			<section className="bg-[#eff0f4]">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 md:pt-12 pb-4 lg:pb-2 relative">
					<div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_320px] gap-10 lg:gap-12 items-start">
						<div>
							<p className="text-2xl font-extrabold text-[#010d3d] mb-12">Informe</p>
							<h1 className="text-[32px] md:text-[45px] font-extrabold leading-[1.08] text-[#010d3d]">
								{titulo}
							</h1>
						</div>

						<aside className="relative z-20 lg:translate-y-16">
							<div >
								{data.resolvedImgInforme ? (
									<img
										src={data.resolvedImgInforme}
										alt={titulo}
										className="w-full w-[2000px]"
									/>
								) : (
									<div className="h-full w-full grid place-items-center px-6 text-center text-white text-lg font-semibold">
										Imagen del informe pendiente
									</div>
								)}
							</div>
						</aside>
					</div>

					<div className="absolute left-1/2 bottom-2 -translate-x-1/2 z-30 h-10 w-10 rounded-full bg-[#c4c8d4] text-white flex items-center justify-center text-2xl leading-none">
						<span aria-hidden="true" className="-mt-1">⌄</span>
					</div>
				</div>
			</section>

			{/* Contenido principal  */}
			<section className="bg-white">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 lg:pt-28 pb-14">
					<div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_320px] gap-10 lg:gap-12 items-start">
						<div>
							{/*  prologo */}
							<section>
								<h2 className="text-[42px] font-extrabold text-[#010d3d] mb-4">Prologo</h2>
								{prologoHtml ? (
									<div
										className="text-[#283452] text-[22px] leading-relaxed [&_br]:block [&_br]:my-1 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:my-3 [&_ul]:space-y-2 [&_li]:leading-relaxed"
										dangerouslySetInnerHTML={{ __html: prologoHtml }}
									/>
								) : prologoItems.length === 0 ? (
									<p className="text-[#283452] text-[22px] leading-relaxed">Contenido de prologo pendiente.</p>
								) : (
									<div className="space-y-6">
										{prologoItems.map((item, index) => {
											const title = item.title?.trim();
											const content = item.content?.trim();

											return (
												<article key={`prologo-${index}`}>
													{title ? <h3 className="text-[26px] font-bold text-[#010d3d] mb-2">{title}</h3> : null}
													{content && /<\/?[a-z][\s\S]*>/i.test(content) ? (
														<div
															className="text-[#283452] text-[18px] leading-relaxed pr-40 [&_br]:block [&_br]:my-1 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:my-3 [&_ul]:space-y-2 [&_li]:leading-relaxed"
															dangerouslySetInnerHTML={{ __html: content }}
														/>
													) : (
														<p className="text-[#283452] text-[22px] leading-relaxed">{content || "Texto pendiente."}</p>
													)}
												</article>
											);
										})}
									</div>
								)}
							</section>

							{/* responsables */}
							{responsables.length > 0 ? (
								<section className="mt-10 space-y-6">
									{responsables.map((persona, index) => (
										<article key={`responsable-${index}`} className="flex items-center gap-4">
											<div className="relative h-14 w-14 rounded-full overflow-hidden bg-[#d3d8e3] shrink-0">
												{persona.imagen ? (
													<Image
														src={persona.imagen}
														alt={persona.nombre}
														fill
														className="object-cover"
														sizes="56px"
													/>
												) : null}
											</div>

											<div className="text-[#1a274e] leading-tight">
												<p className="font-bold text-[18px]">{persona.nombre}</p>
												{persona.empresa ? <p className="text-[16px]">{persona.empresa}</p> : null}
												{persona.cargo ? <p className="text-[16px]">{persona.cargo}</p> : null}
											</div>
										</article>
									))}
								</section>
							) : null}
						</div>

						<aside className="lg:pt-10">
							{/* índice */}
							<h2 className="text-[42px] font-extrabold text-[#010d3d] mb-5">Índice</h2>
							{indiceItems.length === 0 ? (
								<p className="text-[#283452] text-[22px] leading-relaxed">Índice pendiente.</p>
							) : (
								<div className="space-y-6">
									{indiceItems.map((grupo, index) => (
										<section key={`indice-${index}`}>
											{grupo.title ? <h3 className="text-[20px] font-bold text-[#010D3D] mb-2">{grupo.title}</h3> : null}
											{grupo.ul.length > 0 ? (
												<ul className="list-disc pl-6 space-y-1 text-[#283452] text-[21px] leading-snug">
													{grupo.ul.map((entry, childIndex) => (
														<li key={`claim-${index}-${childIndex}`}>{entry}</li>
													))}
												</ul>
											) : null}
										</section>
									))}
								</div>
							)}
						</aside>
					</div>
				</div>
			</section>

			<InformeDescargaCtaSection textoDescarga={textoDescarga} />
		</main>
	);
}
