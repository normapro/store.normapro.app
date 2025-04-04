"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import SolutionsHero from "@/components/SolutionsHero";
import AmbitosTabs from "@/components/AmbitosTabs";
import Breadcrumb from "@/components/breadcrump";
import { Solucion } from "@/types/solucion";
import { BreadcrumbItem } from "@/types/breadcrumb";
import API_ENDPOINTS from "@/config/api";
import Link from "next/link";
import MultimediaPlayer from "@/components/MultimediaPlayer";
import Testimonios from "@/components/Testimonios";
import SolutionsRefered from "@/components/solutionsRefered";
import TestimonioCard from "@/components/TestimonioCard";
import { TestimonioConCliente } from "@/types/testimonio";

const SolucionPage = () => {
  const { slugsolucion } = useParams();
  const [solucion, setSolucion] = useState<Solucion | null>(null);
  const [breadcrumbData, setBreadcrumbData] = useState<BreadcrumbItem>({
    title: "Home",
    url: "/",
  });

  useEffect(() => {
    const fetchSolucion = async () => {
      try {
        const response = await fetch(`${API_ENDPOINTS.SOLUCION}/${slugsolucion}`);
        if (!response.ok) throw new Error("Error al obtener la solución");
        const data = await response.json();
        setSolucion(data);

        setBreadcrumbData({
          title: "Home",
          url: "/",
          children: {
            title: "Soluciones",
            url: "/soluciones",
            children: {
              title: data.description,
              url: `/soluciones/${slugsolucion}`,
            },
          },
        });
      } catch (error) {
        console.error(error);
      }
    };

    fetchSolucion();
  }, [slugsolucion]);


  const [testimonios, setTestimonios] = useState<TestimonioConCliente[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTestimonios = async () => {
      try {
        const response = await fetch(`${API_ENDPOINTS.TESTIMONIOS+"?maxItems=1"}`);
        if (!response.ok) throw new Error("Error al obtener testimonios");
        const data = await response.json();
        setTestimonios(data);
      } catch (err) {
        setError("No se pudieron cargar los testimonios.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTestimonios();
  }, []);

  const hasTestimonios = Array.isArray(testimonios) && testimonios.length > 0;

  return (
    <main>
      <section className="max-w-7xl mx-auto px-6 mt-[20px]">
        <Breadcrumb breadcrumb={breadcrumbData} />
      </section>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-8 mt-10">
  
  {/* Columna izquierda */}

  <div className="lg:col-span-2">
  <div className="col-span-8">
    <h1 className="text-[32px] font-black">{solucion?.title}</h1>
    <h2 className="text-[18px] text-[#7F859D] mt-2">{solucion?.subtitle}</h2>

    <div className="mt-8">
      <h3 className="text-[16px] font-bold">{solucion?.problemaTitle}</h3>
      <p className="mt-2 text-[15px] text-[#010D3D]">{solucion?.problemaPragma}</p>
    </div>

    <div className="mt-8">
      <MultimediaPlayer uri={solucion?.multimediaUri} typeId={solucion?.multimediaTypeId} />
    </div>


    <div className="mt-12 space-y-10">

  {/* Solución */}
  {solucion?.solucionTitle && (
    <h2 className="font-bold text-[18px] text-[#010D3D]">
      {solucion.solucionTitle}
    </h2>
  )}
  {solucion?.solucionPragma && (
    <p className="text-[15px] text-[#010D3D]">
      {solucion.solucionPragma}
    </p>
  )}

  {/* Características */}
  {solucion?.caracteristicasTitle && (
    <h2 className="font-bold text-[18px] text-[#010D3D] mt-8">
      {solucion.caracteristicasTitle}
    </h2>
  )}
  {solucion?.caracteristicasPragma && (
    <p className="text-[15px] text-[#010D3D]">
      {solucion.caracteristicasPragma}
    </p>
  )}
    {solucion?.caracteristicas!== undefined && solucion?.caracteristicas?.length > 0 && (
      <ul className="list-disc ml-5 text-[15px] text-[#010D3D]">
        {solucion.caracteristicas.map((caracteristica) => (
          <li key={caracteristica.id_caracteristica}>
            {caracteristica.description}
          </li>
        ))}
      </ul>
    )}

    {/* Casos de uso */}
    {solucion?.casosdeusoTitle && (
      <h2 className="font-bold text-[18px] text-[#010D3D] mt-8">
        {solucion.casosdeusoTitle}
      </h2>
    )}

    {solucion?.casosdeusoPragma && (
      <p className="text-[15px] text-[#010D3D]">
        {solucion.casosdeusoPragma}
      </p>
    )}

    {solucion?.casosdeuso!== undefined  && solucion?.casosdeuso?.length > 0 && (
      <ul className="list-disc ml-5 text-[15px] text-[#010D3D]">
        {solucion.casosdeuso.map((caso) => (
          <li key={caso.id_casosdeuso}>{caso.description}</li>
        ))}
      </ul>
    )}



    {/* Beneficios */}
    {solucion && solucion.beneficios && solucion.beneficios.length > 0 && (
      <div className="mt-10">
        {solucion.beneficiosTitle && (
          <h3 className="text-[18px] font-bold text-[#010D3D] mb-2">
            {solucion.beneficiosTitle}
          </h3>
        )}

        {solucion.beneficiosPragma && (
          <p className="text-[15px] text-[#010D3D] mb-4">
            {solucion.beneficiosPragma}
          </p>
        )}

        <ul className="list-disc ml-5 text-[15px] text-[#010D3D]">
          {solucion.beneficios.map((beneficio) => (
            <li key={beneficio.id_beneficio}>{beneficio.description}</li>
          ))}
        </ul>
      </div>
    )}


    
  </div>


  </div>

</div>



  {/* Columna derecha */}
  <div className="lg:col-span-1">
  <div className="sticky top-20">
    <div className="bg-[#f2f2f5] p-6 rounded-lg shadow">
      <h3 className="text-[16px] font-bold">{solucion?.firstCtaPragma}</h3>
      <p className="mt-2 text-[15px] text-[#010D3D]"></p>
      <Link href="/contacto">
        <button className="mt-4 w-full bg-gradient-to-r from-[#00b2e3] to-[#cca1dd] shadow-md text-white text-[16px] px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition">
          {solucion?.firstCtaTitle? solucion?.firstCtaTitle : "Solicita un diagnóstico gratuito"}
        </button>
      </Link>
    </div>

    {isLoading ? (
        <p className="text-center text-gray-500">Cargando testimonios...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : hasTestimonios ? (
        <div className="mt-[20px]">
          {testimonios.map((testimonio) => (
            <TestimonioCard key={testimonio.id_testimonio} {...testimonio} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-400">Aún no hay testimonios disponibles.</p>
      )}

    
    </div>
  </div>

</div>

{solucion && solucion.faqs && solucion.faqs.length > 0 && (
  <section className="bg-[#f8f8fa] py-12 mt-12">
    <div className="max-w-5xl mx-auto px-6">
      <h2 className="text-2xl font-extrabold text-[#010D3D] mb-8">
        No te quedes con dudas
      </h2>

      <div className="divide-y divide-gray-300">
        {solucion.faqs.map((faq) => (
          <details
            key={faq.id_faq}
            className="py-4 group"
            open={false}
          >
            <summary className="flex justify-between items-center cursor-pointer text-[16px] font-bold text-[#010D3D] list-none">
              {faq.question}
              <span className="ml-4 transform group-open:rotate-180 transition">
                &#x25BE;
              </span>
            </summary>
            <p className="mt-2 text-[#4B5563] text-[15px]">
              {faq.answer}
            </p>
          </details>
        ))}
      </div>
    </div>
  </section>
)}
    <section className="max-w-7xl mx-auto px-6 text-center min-h-[350px] flex justify-center items-center flex-col">
    <h3 className="text-[16px] font-bold">{solucion?.secondCtaTitle}</h3>
    <p className="mt-2 text-[15px] text-[#010D3D]">{solucion?.secondCtaPragma}</p>
    <Link href="/contacto">
        <button className="mt-4 bg-gradient-to-r from-[#00b2e3] to-[#cca1dd] shadow-md text-white text-[16px] px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition">
          {solucion?.firstCtaTitle? solucion?.firstCtaTitle : "Solicita un diagnóstico gratuito"}
        </button>
      </Link>
    </section>


    <section>
      <SolutionsRefered ambitoSlug={solucion?.slug_ambito}   />
    </section>

    </main>
  );
};

export default SolucionPage;
