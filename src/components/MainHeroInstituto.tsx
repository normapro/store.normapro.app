'use client'
import API_ENDPOINTS from '@/config/api';
import { Actualidad } from '@/types/actualidad';
import { Informe } from '@/types/informe';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilePdf } from '@fortawesome/pro-regular-svg-icons';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';

type InformeWithResolvedImage = Informe & {
    resolvedImagePath?: string | null;
};

function resolveInformeImagePath(imagePath?: string): string | null {
    if (!imagePath) return null;
    const cleanPath = imagePath.trim().replace(/\\/g, "/").replace(/^['\"]+|['\"]+$/g, "");
    if (!cleanPath) return null;
    if (cleanPath.startsWith('http://') || cleanPath.startsWith('https://')) return cleanPath;
    if (cleanPath.startsWith('/')) return cleanPath;
    if (cleanPath.startsWith('informes/')) return `/${cleanPath}`;
    return `/informes/${cleanPath}`;
}

const MainHeroInstituto = () => {
    const [informe, setInforme] = useState<InformeWithResolvedImage | null>(null);
    const [actualidad, setActualidad] = useState<Actualidad | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [informeRes, actualidadRes] = await Promise.all([
                    fetch(API_ENDPOINTS.INFORMES),
                    fetch(API_ENDPOINTS.ACTUALIDAD),
                ]);

                if (informeRes.ok) {
                    const data = await informeRes.json();
                    const parsed: Informe[] = Array.isArray(data) ? data : [];
                    const first = parsed[0];
                    if (first) {
                        setInforme({
                            ...first,
                            resolvedImagePath: resolveInformeImagePath(first.imgPortada || first.img_portada),
                        });
                    }
                }

                if (actualidadRes.ok) {
                    const data: Actualidad[] = await actualidadRes.json();
                    setActualidad(Array.isArray(data) ? data[0] ?? null : null);
                }
            } catch (err) {
                console.error('Error al cargar datos:', err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    return (
        <section className="relative w-full bg-[#010d3d]">
            {/* Burbujas de fondo */}
            <img
                src='/main/hielo_1_instituto.png'
                className="absolute top-0 left-0 w-[600px] h-[600px] pointer-events-none opacity-80"
                style={{ transform: "translate(-20%, -10%)" }}
            />
            {/* Burbuja derecha */}
            <img
                src='/main/hielo_2_instituto.png'
                className="absolute top-0 right-0 w-[600px] h-[600px] pointer-events-none opacity-80"
                style={{ transform: "translate(20%, -10%)" }}
            />

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
                <h2 className="text-white text-4xl md:text-6xl font-black text-center mb-24">
                    La excelencia es un hábito
                </h2>

                {isLoading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[0, 1].map((i) => (
                            <div key={i} className="h-40 rounded-2xl animate-pulse" style={{ background: "rgba(255,255,255,0.08)" }} />
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                        {/* Card Actualidad */}
                        {actualidad && (
                            <div className="flex flex-col gap-3">
                                <Link href={`/actualidad/${actualidad.slug || actualidad.id_noticia}`}>
                                    <div className="flex rounded-2xl overflow-hidden" style={{ background: "rgba(255,255,255,0.08)" }}>
                                        <div className="w-[220px] flex-shrink-0 relative min-h-[160px]">
                                            <Image
                                                src={actualidad.imagen?.startsWith('/') ? actualidad.imagen : `/${actualidad.imagen}`}
                                                alt={actualidad.title}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <div className="flex flex-col justify-between p-6 flex-1">
                                            <span className="text-white text-[13px] font-extrabold uppercase">
                                                Actualidad
                                            </span>
                                            <div>
                                                <p className="text-white text-xs mb-2">{actualidad.fecha}</p>
                                                <p className="text-white font-bold text-base leading-snug">{actualidad.title}</p>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                                <div className="text-right">
                                    <Link href="/actualidad" className="text-white font-bold text-sm underline underline-offset-4 hover:opacity-70 transition">
                                        Ver toda la actualidad
                                    </Link>
                                </div>
                            </div>
                        )}

                        {/* Card Informe */}
                        {informe && (
                            <div className="flex flex-col gap-3">
                                <Link href={informe.slug ? `/informes/${informe.slug}` : '/informes'}>
                                    <div className="flex rounded-2xl overflow-hidden" style={{ background: "rgba(255,255,255,0.08)" }}>
                                        <div className="w-[220px] flex-shrink-0 relative min-h-[160px]">
                                            {informe.resolvedImagePath ? (
                                                <Image
                                                    src={informe.resolvedImagePath}
                                                    alt={informe.titulo ?? 'Informe'}
                                                    fill
                                                    className="object-cover"
                                                />
                                            ) : (
                                                <div className="w-full h-full bg-white/10" />
                                            )}
                                        </div>
                                        <div className="flex flex-col justify-between p-6 flex-1">
                                            <div className="flex items-start justify-between text-white">
                                                <span className="text-[13px] font-extrabold uppercase">
                                                    Informe
                                                </span>
                                                <FontAwesomeIcon icon={ faFilePdf } className="text-xl"/>
                                            </div>
                                            <p className="text-white font-bold text-base leading-snug">
                                                {informe.titulo}
                                            </p>
                                        </div>
                                    </div>
                                </Link>
                                <div className="text-right">
                                    <Link href="/informes" className="text-white font-bold text-sm underline underline-offset-4 hover:opacity-70 transition">
                                        Ver todos los informes
                                    </Link>
                                </div>
                            </div>
                        )}

                    </div>
                )}
            </div>
        </section>
    );
};

export default MainHeroInstituto;