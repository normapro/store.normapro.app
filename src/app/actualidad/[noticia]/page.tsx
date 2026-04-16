

'use client';

import API_ENDPOINTS from '@/config/api';
import { Actualidad } from '@/types/actualidad';
import { ItemListPack } from '@/types/pack';
import { ItemListSolucion } from '@/types/solucion';
import Breadcrumb from '@/components/breadcrump';
import { BreadcrumbItem } from '@/types/breadcrumb';
import { faBookOpen, faCircleDot, faFolderOpen, faGear, faMicrochip, faUserTie, faXmarkCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import ActualidadGridSection from '@/components/ActualidadGridSection';

type SolucionRelacionada = ItemListSolucion & {
	href: string | null;
};

const formatContentParagraphs = (content: unknown): string[] => {
	if (!content) {
		return [];
	}

	if (typeof content === 'string') {
		return content
			.split('\n')
			.map((line) => line.trim())
			.filter((line) => line.length > 0);
	}

	if (Array.isArray(content)) {
		return content.map((item) => String(item)).filter((line) => line.trim().length > 0);
	}

	if (typeof content === 'object') {
		return [JSON.stringify(content)];
	}

	return [String(content)];
};

const parseCategorias = (categoria: string | null): string[] => {
	if (!categoria) {
		return [];
	}

	const trimmed = categoria.trim();
	if (!trimmed) {
		return [];
	}

	if (trimmed.startsWith('[') && trimmed.endsWith(']')) {
		try {
			const parsed = JSON.parse(trimmed);
			if (Array.isArray(parsed)) {
				return parsed.map((item) => String(item).trim()).filter((item) => item.length > 0);
			}
		} catch {
			// Continua con el parseo por separadores
		}
	}

	return trimmed
		.split(/[,|;]+/)
		.map((item) => item.trim())
		.filter((item) => item.length > 0);
};

const iconForSolution = (index: number) => {
	const iconSet = [
		faBookOpen,
		faFolderOpen,
		faCircleDot,
		faXmarkCircle,
		faGear,
		faMicrochip,
	];

	return iconSet[index % iconSet.length];
};

export default function NoticiaPage() {
	const params = useParams();
	const noticiaId = Number(params?.noticia);

	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [noticia, setNoticia] = useState<Actualidad | null>(null);
	const [packRelacionado, setPackRelacionado] = useState<ItemListPack | null>(null);
	const [solucionesRelacionadas, setSolucionesRelacionadas] = useState<SolucionRelacionada[]>([]);

	useEffect(() => {
		const fetchData = async () => {
			if (!Number.isFinite(noticiaId)) {
				setError('Id de noticia invalido.');
				setIsLoading(false);
				return;
			}

			try {
				const noticiaResponse = await fetch(`${API_ENDPOINTS.ACTUALIDAD}/${noticiaId}`);
				if (!noticiaResponse.ok) {
					throw new Error('No se pudo cargar la noticia.');
				}

				const noticiaData: Actualidad = await noticiaResponse.json();
				setNoticia(noticiaData);

				const packsResponse = await fetch(`${API_ENDPOINTS.LISTPACKS}?ambito=all&sector=non-specified&maxItems=500`);

				const packsData: ItemListPack[] = packsResponse.ok ? await packsResponse.json() : [];

				const foundPack = packsData.find((pack) => pack.id_pack === noticiaData.id_pack) ?? null;
				setPackRelacionado(foundPack);

				let ambitoSoluciones = foundPack?.slug_ambito ?? 'all';
				if (foundPack?.slug) {
					const packDetailResponse = await fetch(`${API_ENDPOINTS.PACKS}/${foundPack.slug}`);
					if (packDetailResponse.ok) {
						const packDetail = await packDetailResponse.json();
						ambitoSoluciones = packDetail?.slug_ambito ?? ambitoSoluciones;
					}
				}

				const [solucionesAmbitoResponse, solucionesAllResponse] = await Promise.all([
					fetch(
						ambitoSoluciones === 'all'
							? `${API_ENDPOINTS.LISTSOLUCIONES}?ambito=all&sector=all`
							: `${API_ENDPOINTS.LISTSOLUCIONES}?ambito=${ambitoSoluciones}&sector=non-specified`,
					),
					fetch(`${API_ENDPOINTS.LISTSOLUCIONES}?ambito=all&sector=all`),
				]);

				const solucionesAmbitoData: any[] = solucionesAmbitoResponse.ok ? await solucionesAmbitoResponse.json() : [];
				const solucionesAllData: any[] = solucionesAllResponse.ok ? await solucionesAllResponse.json() : [];

				const idsSoluciones = Array.isArray(noticiaData.id_soluciones)
					? noticiaData.id_soluciones
					: [];

				const solucionesFiltradas = idsSoluciones
					.map((idSolucion) => {
						const fromAmbito = solucionesAmbitoData.find((solucion) => solucion.id_solucion === idSolucion);
						const fromAll = solucionesAllData.find((solucion) => solucion.id_solucion === idSolucion);
						const solucion = fromAmbito ?? fromAll;

						if (!solucion) {
							return null;
						}

						const slugAmbitoForHref = solucion.slug_ambito ?? (ambitoSoluciones !== 'all' ? ambitoSoluciones : 'all');

						return {
							...solucion,
							uriIcon: solucion.uriIcon ?? solucion.icon ?? 'fas fa-circle-question',
							href: solucion.slug ? `/soluciones/${slugAmbitoForHref}/${solucion.slug}` : null,
						};
					})
					.filter(Boolean) as SolucionRelacionada[];

				setSolucionesRelacionadas(solucionesFiltradas);
			} catch (err) {
				console.error(err);
				setError('No se pudo cargar el detalle de la noticia.');
			} finally {
				setIsLoading(false);
			}
		};

		fetchData();
	}, [noticiaId]);

	const paragraphs = useMemo(() => formatContentParagraphs(noticia?.content), [noticia?.content]);
	const categorias = useMemo(() => parseCategorias(noticia?.categoria ?? null), [noticia?.categoria]);
	const breadcrumbData = useMemo<BreadcrumbItem>(
		() => ({
			title: 'Home',
			url: '/',
			children: {
				title: 'Actualidad',
				url: '/actualidad',
				children: {
					title: noticia?.title ?? 'Noticia',
					url: `/actualidad/${noticiaId}`,
				},
			},
		}),
		[noticia?.title, noticiaId],
	);

	if (isLoading) {
		return (
			<main className="w-full py-12">
				<section className="max-w-7xl mx-auto px-6">
					<p className="text-[#010D3D]">Cargando noticia...</p>
				</section>
			</main>
		);
	}

	if (error || !noticia) {
		return (
			<main className="w-full py-12">
				<section className="max-w-7xl mx-auto px-6">
					<p className="text-red-600">{error ?? 'No se encontro la noticia.'}</p>
				</section>
			</main>
		);
	}

	return (
		<>
			<section className="bg-white border-y border-[#d6dae4]">
				<nav
					aria-label="Migas de pan"
					className="w-[80%] mx-auto px-4 sm:px-6 lg:px-8 py-2 text-[12px] text-[#24335f] mt-2 mb-2"
				>
					<Link href="/" className="font-extrabold hover:underline">
						Home
					</Link>
					<span className="mx-1 text-[#6e7692]">&gt;</span>
					<Link href="/actualidad" className="font-extrabold hover:underline">
						Actualidad
					</Link>
					<span className="mx-1 text-[#6e7692]">&gt;</span>
					<span className="text-[#24335f]">{noticia.title}</span>
				</nav>
			</section>

			<main className="relative w-full py-10 md:py-12">
				<div className="absolute inset-x-0 top-0 h-[360px] bg-[#e9eaee]" />

				<section className="relative max-w-[80%] mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
					<article className="lg:col-span-7">
						<h1 className="text-[35px] leading-[1.05] font-black text-[#0B1D4D] w-[85%]">
							{noticia.title}
						</h1>

						<div className="mt-5 flex flex-wrap items-center gap-5 text-sm font-bold text-[#0B1D4D]">
							{categorias.map((categoria) => (
								<span key={categoria} className="underline underline-offset-2">
									{categoria}
								</span>
							))}
						</div>

						<div className="mt-8">
							<img
								src={noticia.imagen?.startsWith('/') ? noticia.imagen : `/${noticia.imagen}`}
								alt={noticia.title}
								className="w-[85%]  max-h-[620px] object-cover"
							/>
						</div>

						<p className="mt-8 text-[15px] text-[#0B1D4D] ">{noticia.fecha}</p>

						<div className="mt-4 space-y-6 text-[15px] leading-[1.4] text-[#0B1D4D] w-[85%]">
							{paragraphs.length > 0 ? (
								paragraphs.map((paragraph, index) => <p key={`${noticia.id_noticia}-${index}`}>{paragraph}</p>)
							) : (
								<p>Sin contenido disponible para esta noticia.</p>
							)}
						</div>
					</article>

					<aside className="lg:col-span-5">
						<div className="bg-[#F8F8FA] rounded-xl p-5 mt-10">
							<h2 className="text-[25px] font-extrabold text-[#0B1D4D] mb-4">Productos relacionados</h2>

							{packRelacionado ? (
								<Link href={`/soluciones/${packRelacionado.slug_ambito ?? 'all'}/packs/${packRelacionado.slug}`}>
									<div className="py-2 px-3 bg-[#e4f6fc] shadow rounded-lg mb-3 cursor-pointer h-[200px] px-7">
										<div className="grid grid-cols-12">
											<div className="col-span-8 mt-7">
												<h3 className="font-bold text-[16px] overflow-hidden text-ellipsis text-[#0B1D4D]">{packRelacionado.description}</h3>
												<p className="text-[#0B1D4D] text-[15px] mt-7 overflow-hidden text-ellipsis">
													{packRelacionado.shortDescription}
												</p>
											</div>
											<div className="col-span-4 flex justify-end">
												<div className="relative w-[135px] flex items-center justify-center max-h-[135px]">
													<img src="/aura@2x.png" alt="Fondo" className="absolute w-full h-full object-cover" />
													<img
														src={`/${packRelacionado.uriIcon}`}
														alt={packRelacionado.description}
														className="object-contain relative z-10"
													/>
												</div>
											</div>
										</div>
										<div className="mt-3 h-[2px] bg-[#d7e1e9]" />
										<div className="mt-4 grid grid-cols-2">
											<div className="col-span-1">
												<span className="ml-2 text-gray-500 text-sm">
													<FontAwesomeIcon icon={faUserTie} className="mr-2 text-[20px] text-[#010D3D] opacity-100" />
													Incluye consultoría
												</span>
											</div>
											<div className="col-span-1 flex justify-end pr-4">
												<p className="text-[15px] underline font-extrabold text-[#00aae0]">Saber más</p>
											</div>
										</div>
									</div>
								</Link>
							) : null}

							<div className="space-y-2 mt-10">
								{solucionesRelacionadas.map((sol, index) => (
									sol.href ? (
										<Link key={sol.id_solucion} href={sol.href} className="block">
											<div className="py-2 px-3 bg-white shadow rounded-lg flex items-center hover:bg-[#f7fbff] transition-colors">
												<FontAwesomeIcon icon={iconForSolution(index)} className="w-5 h-5 text-[#010D3D] mr-3" />
												<p className="font-bold text-[#0B1D4D] text-[15px] leading-tight">{sol.description}</p>
											</div>
										</Link>
									) : (
										<div key={sol.id_solucion} className="py-2 px-3 bg-white shadow rounded-lg flex items-center">
											<FontAwesomeIcon icon={iconForSolution(index)} className="w-5 h-5 text-[#010D3D] mr-3" />
											<p className="font-bold text-[#0B1D4D] text-[15px] leading-tight">{sol.description}</p>
										</div>
									)
								))}
							</div>
						</div>
					</aside>


				</section>
				<section className="w-[80%] mx-auto px-6 mt-40">
					<h1 className="text-xl font-extrabold text-[#0B1D4D]">Otras noticias relacionadas</h1>

					<div className="mt-8">
						<ActualidadGridSection onlyLatest={false} />
					</div>
				</section>
			</main>
		</>
	);
}