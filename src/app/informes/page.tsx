
import Image from "next/image";
import Link from "next/link";
import { access } from "node:fs/promises";
import path from "node:path";
import API_ENDPOINTS from "@/config/api";
import { Informe } from "@/types/informe";

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

async function getInformes(): Promise<Informe[]> {
	try {
		const response = await fetch(API_ENDPOINTS.INFORMES, {
			next: { revalidate: 120 },
		});

		if (!response.ok) {
			return [];
		}

		const data = await response.json();
		return Array.isArray(data) ? data : [];
	} catch {
		return [];
	}
}

export default async function InformesPage() {
	const informes = await getInformes();
	const informesConImagen = await Promise.all(
		informes.map(async (informe) => ({
			...informe,
			resolvedImagePath: await resolveInformeImagePath(informe.imgPortada || informe.img_portada),
		}))
	);

	return (
		<main className="w-full py-10 md:py-12">
			<section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<header className="border-b border-gray-300 pb-4">
					<h1 className="text-3xl font-extrabold text-[#010d3d]">Informes</h1>
				</header>

				<div className="pt-10">
					{informesConImagen.length === 0 ? (
						<p className="text-lg text-[#6e7692]">Aun no hay informes disponibles.</p>
					) : (
						<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-12">
							{informesConImagen.map((informe, index) => {
								const categoria = informe.categoria?.trim() || "SIN CATEGORIA";
								const titulo = informe.titulo?.trim() || "Informe sin titulo";
								const imagePath = informe.resolvedImagePath;
								const informeId = typeof informe.id === "number" ? informe.id : null;
								const key = informe.id ?? `informe-${index}`;

								return (
									<article key={key} className="flex flex-col">
										<div className="relative w-full aspect-[16/9] overflow-hidden bg-[#d7deea]">
											{imagePath ? (
												<Image
													src={imagePath}
													alt={imagePath}
													fill
													className="object-cover"
													sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
												/>
											) : (
												<div className="h-full w-full grid place-items-center text-[#6e7692] font-semibold px-4 text-center">
													Imagen de portada pendiente
												</div>
											)}
										</div>

										<p className="mt-5 text-[16px] font-bold uppercase text-[#77809d] leading-tight">
											{categoria}
										</p>

										<h2 className="mt-3 text-[21px] font-bold text-[#010d3d] leading-tight min-h-[7.25rem]">
											{titulo}
										</h2>

										{informeId ? (
											<Link
												href={`/informes/${informeId}`}
												className="mt-8 w-fit rounded-xl bg-[#010d3d] px-4 py-2 text-white text-[16px] font-bold"
											>
												Mas informacion
											</Link>
										) : (
											<button
												type="button"
												disabled
												className="mt-8 w-fit rounded-xl bg-[#8c94ac] px-4 py-2 text-white text-[16px] font-bold cursor-not-allowed"
											>
												Mas informacion
											</button>
										)}
									</article>
								);
							})}
						</div>
					)}
				</div>
			</section>
		</main>
	);
}
