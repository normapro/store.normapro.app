// Archivo: PackPage.tsx
"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Pack } from "@/types/pack";
import Breadcrumb from "@/components/breadcrump";
import { BreadcrumbItem } from "@/types/breadcrumb";
import API_ENDPOINTS from "@/config/api";
import Link from "next/link";
import MultimediaPlayer from "@/components/MultimediaPlayer";
import TestimonioCard from "@/components/TestimonioCard";
import { TestimonioConCliente } from "@/types/testimonio";
import SolucionSeo from "@/components/seo/SolucionSeo";
import SolutionsRefered from "@/components/solutionsRefered";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { iconMap } from "@/libs/icons";

const PackPage = () => {
  const { ambito, slugPack } = useParams() as { ambito: string; slugPack: string };

  const [pack, setPack] = useState<Pack | null>(null);
  const [testimonios, setTestimonios] = useState<TestimonioConCliente[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [breadcrumbData, setBreadcrumbData] = useState<BreadcrumbItem>({ title: "Home", url: "/" });

  useEffect(() => {
    const fetchPack = async () => {
      try {
        const response = await fetch(`${API_ENDPOINTS.PACKS}/${slugPack}?ambito=${ambito}`);
        if (!response.ok) throw new Error("Error al obtener el pack");
        const data = await response.json();
        setPack(data);

        setBreadcrumbData({
          title: "Home",
          url: "/",
          children: {
            title: "Soluciones",
            url: "/soluciones",
            children: {
              title: ambito,
              url: `/soluciones/${ambito}`,
              children: {
                title: data.title,
                url: `/soluciones/${ambito}/packs/${slugPack}`,
              },
            },
          },
        });
      } catch (e) {
        console.error(e);
      }
    };

    fetchPack();
  }, [slugPack, ambito]);

  useEffect(() => {
    const fetchTestimonios = async () => {
      try {
        const response = await fetch(`${API_ENDPOINTS.TESTIMONIOS}?maxItems=1`);
        if (!response.ok) throw new Error("Error al obtener testimonios");
        const data = await response.json();
        setTestimonios(data);
      } catch (err) {
        setError("No se pudieron cargar los testimonios.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchTestimonios();
  }, []);

  const hasTestimonios = Array.isArray(testimonios) && testimonios.length > 0;

  return (
    <>
      {pack && (
        <SolucionSeo
          title={pack.title}
          description={pack.subtitle ?? ""}
          slug={pack.slug}
          ambito={ambito}
          currency="EUR"
          price="0.00"
          image="https://www.normapro.es/images/og-default.jpg"
          faqs={pack.faqs?.map(f => ({ question: f.question, answer: f.answer })) ?? []}
        />
      )}

      <main>
        <section className="max-w-7xl mx-auto px-6 mt-[20px]">
          <Breadcrumb breadcrumb={breadcrumbData} />
        </section>

        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-8 mt-10">
          <div className="lg:col-span-2">
            <h1 className="text-[32px] font-black">{pack?.description}</h1>
            <h2 className="text-[24px] font-bold">{pack?.title}</h2>
            <h3 className="text-[18px] text-[#7F859D] mt-2">{pack?.subtitle}</h3>

            {pack?.problemaTitle && (
              <div className="mt-8">
                <h3 className="text-[16px] font-bold">{pack.problemaTitle}</h3>
                <p className="mt-2 text-[15px] text-[#010D3D]">{pack.problemaPragma}</p>
              </div>
            )}

            {pack?.multimediaUri && (
              <div className="mt-8">
                <MultimediaPlayer uri={pack.multimediaUri} typeId={pack.multimediaTypeId} />
              </div>
            )}

            <div className="mt-12 space-y-10">
              {pack?.solucionTitle && <h2 className="font-bold text-[18px] text-[#010D3D]">{pack.solucionTitle}</h2>}
              {pack?.solucionPragma && <p className="text-[15px] text-[#010D3D]">{pack.solucionPragma}</p>}

              {pack?.caracteristicasTitle && <h2 className="font-bold text-[18px] text-[#010D3D] mt-8">{pack.caracteristicasTitle}</h2>}
              {pack?.caracteristicasPragma && <p className="text-[15px] text-[#010D3D]">{pack.caracteristicasPragma}</p>}
              {pack?.caracteristicas?.length > 0 && (
                <ul className="list-disc ml-5 text-[15px] text-[#010D3D]">
                  {pack.caracteristicas.map(c => <li key={c.id_caracteristica}>{c.description}</li>)}
                </ul>
              )}              
              {pack?.casosdeusoTitle && <h2 className="font-bold text-[18px] text-[#010D3D] mt-8">{pack.casosdeusoTitle}</h2>}
              {pack?.casosdeusoPragma && <p className="text-[15px] text-[#010D3D]">{pack.casosdeusoPragma}</p>}
              {pack?.casosdeuso?.length > 0 && (
                <ul className="list-disc ml-5 text-[15px] text-[#010D3D]">
                  {pack.casosdeuso.map(c => <li className="mt-4" key={c.id_casodeuso}>{c.description}</li>)}
                </ul>
              )}

              {pack?.beneficios?.length > 0 && (
                <div className="mt-10">
                  {pack.beneficiosTitle && <h3 className="text-[18px] font-bold text-[#010D3D] mb-2">{pack.beneficiosTitle}</h3>}
                  {pack.beneficiosPragma && <p className="text-[15px] text-[#010D3D] mb-4">{pack.beneficiosPragma}</p>}
                  <ul className="list-disc ml-5 text-[15px] text-[#010D3D]">
                    {pack.beneficios.map(b => <li key={b.id_beneficio}>{b.description}</li>)}
                  </ul>
                </div>
              )}
                {pack?.soluciones?.length > 0 && (
                    <div className="mt-12">
                        <h3 className="text-[18px] font-bold text-[#010D3D] mb-4">Soluciones que incluye</h3>
                        <ul className="space-y-2">
                        {pack.soluciones.map(sol => (
                            <li
                            key={sol.slug}
                            className="flex items-center justify-between border border-[#cde6f7] rounded-md px-4 py-3 bg-white shadow-sm"
                            >
                            <div className="flex items-center gap-3">
                                {/* Aquí se renderiza el icono si existe */}
                                {sol.icon && (
                                <FontAwesomeIcon
                                    icon={iconMap[sol.icon] ?? faCogs}
                                    className="w-5 h-5 text-[#00b2e3]"
                                />
                                )}
                                <Link href={`/soluciones/${sol.slug}`} className="text-[#010D3D] font-medium">
                                {sol.descripcion}
                                </Link>
                            </div>
                            <span className="text-blue-500 font-bold">✓</span>
                            </li>
                        ))}
                        </ul>
                    </div>
                    )}


              {pack?.consultoriaTitle && (
                <div className="mt-12 p-6 border-l-4 border-blue-400 bg-[#f4faff] rounded-md relative">
                  <div className="absolute right-6 top-6 text-2xl">👔</div>
                  <h4 className="font-bold text-[#010D3D] text-[16px]">{pack.consultoriaTitle}</h4>
                  <p className="text-[15px] text-[#010D3D] mt-2">{pack.consultoriaDescription}</p>
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-20 space-y-6">
              <div className="bg-[#f2f2f5] p-6 rounded-lg shadow">
                <h3 className="text-[16px] font-bold">{pack?.firstCtaPragma}</h3>
                <Link href="/contacto">
                  <button className="mt-4 w-full bg-gradient-to-r from-[#00b2e3] to-[#cca1dd] text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition">
                    {pack?.firstCtaTitle ?? "Solicita un diagnóstico gratuito"}
                  </button>
                </Link>
              </div>

              {isLoading ? (
                <p className="text-center text-gray-500">Cargando testimonios...</p>
              ) : error ? (
                <p className="text-center text-red-500">{error}</p>
              ) : hasTestimonios ? (
                <TestimonioCard {...testimonios[0]} />
              ) : (
                <p className="text-center text-gray-400">Aún no hay testimonios disponibles.</p>
              )}
            </div>
          </div>
        </div>

        {pack?.faqs?.length > 0 && (
          <section className="bg-[#f8f8fa] py-12 mt-12">
            <div className="max-w-5xl mx-auto px-6">
              <h2 className="text-2xl font-extrabold text-[#010D3D] mb-8">No te quedes con dudas</h2>
              <div className="divide-y divide-gray-300">
                {pack.faqs.map(faq => (
                  <details key={faq.id_faq} className="py-4 group">
                    <summary className="flex justify-between items-center cursor-pointer text-[16px] font-bold text-[#010D3D] list-none">
                      {faq.question}
                      <span className="ml-4 transform group-open:rotate-180 transition">▼</span>
                    </summary>
                    <p className="mt-2 text-[#4B5563] text-[15px]">{faq.answer}</p>
                  </details>
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="max-w-7xl mx-auto px-6 text-center min-h-[350px] flex justify-center items-center flex-col">
          <h3 className="text-[16px] font-bold">{pack?.secondCtaTitle}</h3>
          <p className="mt-2 text-[15px] text-[#010D3D]">{pack?.secondCtaPragma}</p>
          <Link href="/contacto">
            <button className="mt-4 bg-gradient-to-r from-[#00b2e3] to-[#cca1dd] text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition">
              {pack?.firstCtaTitle ?? "Solicita un diagnóstico gratuito"}
            </button>
          </Link>
        </section>

        <section>
          <SolutionsRefered ambitoSlug={ambito} />
        </section>
      </main>
    </>
  );
};

export default PackPage;
