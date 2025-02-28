"use client";

import { useEffect, useRef, useState } from "react";
import API_ENDPOINTS from "@/config/api";
import { Ambito } from "@/types/ambito";
import { Solucion } from "@/types/solucion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library, IconPrefix, IconName, IconProp } from "@fortawesome/fontawesome-svg-core";
import { fas, faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";

// Agregamos los iconos a la librería
library.add(fas, faChevronLeft, faChevronRight);

interface Props {
  sectorSlug?: string | undefined | null;
  ambitoIdSelected: number | null;
}

const AmbitosTabs = ({ sectorSlug, ambitoIdSelected }: Props) => {
  const [ambitos, setAmbitos] = useState<Ambito[]>([]);
  const [soluciones, setSoluciones] = useState<Solucion[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  useEffect(() => {
    const fetchAmbitos = async () => {
      try {
        const response = await fetch(API_ENDPOINTS.AMBITOS_SOLUCIONES);
        if (!response.ok) throw new Error("Error al obtener los ámbitos");
        const data = await response.json();
        setAmbitos(data);
        setSelected(ambitoIdSelected ?? data[0]?.id_ambito);
        if (data.length > 0) {
          fetchSoluciones(data[0]?.slug, sectorSlug);
        }
        // 🔥 Forzar revisión de scroll después de cargar datos
        setTimeout(checkScroll, 300);
      } catch (error) {
        console.error(error);
      }
    };

    fetchAmbitos();
  }, []);

  const fetchSoluciones = async (ambitoSlug: string = "all", sectorSlug: string | undefined | null = "non-specified") => {
    setIsLoading(true);
    try {
      const url = sectorSlug
        ? `${API_ENDPOINTS.LISTSOLUCIONES}?ambito=${ambitoSlug}&sector=${sectorSlug}`
        : `${API_ENDPOINTS.LISTSOLUCIONES}?ambito=${ambitoSlug}`;

      const response = await fetch(url);
      if (!response.ok) throw new Error("Error al obtener soluciones");
      const data = await response.json();
      setSoluciones(data);
    } catch (error) {
      console.error(error);
      setSoluciones([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Función para mover el scroll horizontalmente
  const scroll = (direction: "left" | "right") => {
    if (containerRef.current) {
      const scrollAmount = 200;
      containerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
      setTimeout(checkScroll, 300); // 🔥 Verificar después de hacer scroll
    }
  };

  // Verifica si se puede hacer scroll en cada dirección
  const checkScroll = () => {
    if (containerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth);
    }
  };

  useEffect(() => {
    checkScroll();
    if (containerRef.current) {
      containerRef.current.addEventListener("scroll", checkScroll);
    }
    return () => {
      if (containerRef.current) {
        containerRef.current.removeEventListener("scroll", checkScroll);
      }
    };
  }, [ambitos]); // 🔥 Se ejecuta cada vez que cambian los ámbitos

  return (
    <div className="w-full">
      {/* Contenedor de la TAB con los botones de desplazamiento */}
      <div className="relative w-full flex items-center">
        {/* Botón Izquierdo */}
        {canScrollLeft && (
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 z-10 bg-white shadow-lg p-3 rounded-full transform -translate-y-1/2 top-1/2"
          >
            <FontAwesomeIcon icon={faChevronLeft} className="text-gray-600 w-5 h-5" />
          </button>
        )}

        {/* Tabs con scroll horizontal */}
        <div
          ref={containerRef}
          className="overflow-x-auto flex w-full scrollbar-hide"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {ambitos
            //.filter((ambito) => (ambito.total_soluciones && ambito.total_soluciones > 0))
            .map((ambito) => (
            <div key={ambito.id_ambito} className="flex flex-col items-center">
              <button
                onClick={() => {
                  setSelected(ambito.id_ambito);
                  fetchSoluciones(ambito.slug, sectorSlug);
                }}
                className={`px-4 py-3 font-bold text-[14px] rounded-t-lg whitespace-nowrap transition ${
                  selected === ambito.id_ambito ? "bg-[#f2f2f5] text-[#010D3D]" : "bg-white text-[#010D3D] hover:bg-[#f2f2f5]"
                }`}
              >
                {ambito.description} <span className="text-[12px] text-[#7F859D] opacity-50">{ambito.total_soluciones}</span>
              </button>
              <div
                className={`h-[3px] w-full  ${
                  selected === ambito.id_ambito ? "bg-[#010D3D]" : "bg-transparent"
                }`}
              ></div>
            </div>
          ))}
        </div>

        {/* Botón Derecho */}
        {canScrollRight && (
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 z-10 bg-white shadow-lg p-3 rounded-full transform -translate-y-1/2 top-1/2"
          >
            <FontAwesomeIcon icon={faChevronRight} className="text-gray-600 w-5 h-5" />
          </button>
        )}
      </div>

      {/* 🔥 Lista de Soluciones debajo de la TAB */}
      <div className="mt-6">
        {isLoading ? (
          <p className="text-center text-gray-500">Cargando soluciones...</p>
        ) : soluciones.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {soluciones.map((sol) => {
              const iconParts = sol.uriIcon.split(" ");
              const icon: IconProp = iconParts.length === 2 ? (iconParts as [IconPrefix, IconName]) : ["fas", "fa-question"];
              return (
                <div key={sol.id_solucion} className="p-4 bg-white shadow rounded-lg flex items-center">
                  <FontAwesomeIcon icon={icon} className="w-6 h-6 text-blue-600 mr-4" />
                  <div>
                    <h3 className="font-semibold">{sol.description}</h3>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-center text-gray-500">No hay soluciones disponibles.</p>
        )}
      </div>
    </div>
  );
};

export default AmbitosTabs;
