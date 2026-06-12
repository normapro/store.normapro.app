import API_ENDPOINTS from '@/config/api';
import { Actualidad } from '@/types/actualidad';
import { Informe } from '@/types/informe';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';

type CardItem = {
    tipo: string;
    imagen: string;
    fecha?: string;
    titulo: string;
    verTodosText: string;
    verTodosHref: string;
    isPdf?: boolean;
}

type Props = {
    items: [CardItem, CardItem];
}

type InformeWithResolvedImage = Informe & {
    resolvedImagePath?: string | null;
};

function resolveInformeImagePath(imagePath?: string): string | null {
    if (!imagePath) return null;

    const cleanPath = imagePath
        .trim()
        .replace(/\\/g, "/")
        .replace(/^['\"]+|['\"]+$/g, "");

    if (!cleanPath) return null;
    if (cleanPath.startsWith('http://') || cleanPath.startsWith('https://')) return cleanPath;
    if (cleanPath.startsWith('/')) return cleanPath;
    if (cleanPath.startsWith('informes/')) return `/${cleanPath}`;

    return `/informes/${cleanPath}`;
}

const MainHeroInstituto = ({ items }: Props) => {
    const [informe, setInforme] = useState<InformeWithResolvedImage | null>(null);
    const [actualidad, setActualidad] = useState<Actualidad | null>(null);

    useEffect(() => {
        const fetchInforme = async () => {
            try {
                const response = await fetch(API_ENDPOINTS.INFORMES);
                if (!response.ok) {
                    setInforme(null);
                    return;
                }
                const data = await response.json();
                const parsed: Informe[] = Array.isArray(data) ? data : [];
                const first = parsed[0];
                if (first) {
                    setInforme({
                        ...first,
                        resolvedImagePath: resolveInformeImagePath(first.imgPortada || first.img_portada),
                    });
                }
            } catch {
                setInforme(null);
            }
        };
        fetchInforme();
    }, []);
/*
    useEffect(() => {
		const fetchActualidad = async () => {
			try {
				const response = await fetch(API_ENDPOINTS.ACTUALIDAD);
				if (!response.ok) {
					throw new Error('Error al obtener actualidad');
				}

				const data: Actualidad[] = await response.json();
				setActualidad(Array.isArray(data) ? data : []);
			} catch (err) {
				console.error('Error al cargar actualidad:', err);
				
				setActualidad([]);
			} finally {
				setIsLoading(false);
			}
		};

		fetchActualidad();
	}, []);
*/
    return (
        <section
            className="relative w-full overflow-hidden bg-[#010d3d]"
        >
            {/* Burbujas de fondo */}
            <div
                className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full opacity-30 blur-3xl pointer-events-none"
                style={{ background: "radial-gradient(circle, #0ea5e9, transparent 70%)", transform: "translate(-30%, -20%)" }}
            />
            <div
                className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full opacity-30 blur-3xl pointer-events-none"
                style={{ background: "radial-gradient(circle, #06b6d4, transparent 70%)", transform: "translate(30%, -20%)" }}
            />

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
                {/* Título */}
                <h2 className="text-white text-4xl md:text-6xl font-black text-center mb-16">
                    La excelencia es un hábito
                </h2>

                {/* Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {items.map((item) => (
                        <div key={item.tipo} className="flex flex-col gap-3">
                            {/* Card */}
                            <div
                                className="flex rounded-2xl overflow-hidden"
                                style={{ background: "rgba(255,255,255,0.08)" }}
                            >
                                {/* Imagen izquierda */}
                                <div className="w-[220px] flex-shrink-0 relative">
                                    <Image
                                        src={item.imagen}
                                        alt={item.titulo}
                                        fill
                                        className="object-cover"
                                    />
                                </div>

                                {/* Contenido derecha */}
                                <div className="flex flex-col justify-between p-6 flex-1">
                                    <div className="flex items-start justify-between">
                                        <span className="text-white/60 text-xs font-bold tracking-widest uppercase">
                                            {item.tipo}
                                        </span>
                                        {item.isPdf && (
                                            <svg className="w-6 h-6 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                                                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                            </svg>
                                        )}
                                    </div>
                                    <div>
                                        {item.fecha && (
                                            <p className="text-white/50 text-sm mb-2">{item.fecha}</p>
                                        )}
                                        <p className="text-white font-bold text-base leading-snug">
                                            {item.titulo}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Ver todos */}
                            <div className="text-center">
                                <Link
                                    href={item.verTodosHref}
                                    className="text-white font-bold text-sm underline underline-offset-4 hover:opacity-70 transition"
                                >
                                    {item.verTodosText}
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default MainHeroInstituto;