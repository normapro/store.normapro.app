"use client";

import { useEffect, useState } from "react";
import API_ENDPOINTS from "@/config/api";
import { TestimonioConCliente } from "@/types/testimonio";
import TestimonioCard from "./TestimonioCard";

const MainTestimoniosSection = () => {
  const [testimonios, setTestimonios] = useState<TestimonioConCliente[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTestimonios = async () => {
      try {
        const response = await fetch(`${API_ENDPOINTS.TESTIMONIOS}`);
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
    <section className="max-w-7xl mx-auto px-6 py-16">
      <h2 className="text-3xl font-extrabold text-center text-[#010D3D] mb-12">
        Opiniones de nuestros clientes
      </h2>

      {isLoading ? (
        <p className="text-center text-gray-500">Cargando testimonios...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : hasTestimonios ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonios.map((testimonio) => (
            <TestimonioCard key={testimonio.id_testimonio} {...testimonio} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-400">Aún no hay testimonios disponibles.</p>
      )}
    </section>
  );
};

export default MainTestimoniosSection;
