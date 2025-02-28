"use client";

import { useEffect, useState } from "react";
import API_ENDPOINTS from "@/config/api";
import { Ambito } from "@/types/ambito";


interface Solucion {
  id: number;
  tipo: "solucion" | "paquete" | "curso"; // Tipo de contenido
  titulo: string;
  descripcion: string;
  icono: string;
}

interface Props {
  sectorId?: number | null; // Si se filtra por sector
}

const AmbitosTabs = ({ sectorId }: Props) => {
  const [ambitos, setAmbitos] = useState<Ambito[]>([]);
  const [soluciones, setSoluciones] = useState<Solucion[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchAmbitos = async () => {
      try {
        const response = await fetch(API_ENDPOINTS.AMBITOS);
        if (!response.ok) throw new Error("Error al obtener los ámbitos");
        const data = await response.json();
        setAmbitos(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchAmbitos();
  }, []);

  const fetchSoluciones = async (ambitoId: number) => {
    setIsLoading(true);
    try {
      const url = sectorId
        ? `${API_ENDPOINTS.SOLUCIONES}?ambito=${ambitoId}&sector=${sectorId}`
        : `${API_ENDPOINTS.SOLUCIONES}?ambito=${ambitoId}`;

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

  return (
    <div className="w-full">
      {/* Tabs con scroll horizontal */}
      <div className="overflow-x-auto scrollbar-hide">
        <div className="flex space-x-4 border-b pb-2 w-max">
          {ambitos.map((ambito) => (
            <button
              key={ambito.id_ambito}
              onClick={() => {
                setSelected(ambito.id_ambito);
                fetchSoluciones(ambito.id_ambito);
              }}
              className={`px-4 py-2 rounded-md whitespace-nowrap transition ${
                selected === ambito.id_ambito
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {ambito.description} <span className="font-bold">({ambito.total_soluciones})</span>
            </button>
          ))}
        </div>
      </div>

      {/* Lista de Soluciones, Paquetes y Cursos */}
      <div className="mt-6">
        {isLoading ? (
          <p className="text-center text-gray-500">Cargando soluciones...</p>
        ) : soluciones.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {soluciones.map((sol) => (
              <div key={sol.id} className="p-4 bg-white shadow rounded-lg flex items-center">
                <img src={sol.icono} alt={sol.titulo} className="w-10 h-10 mr-4" />
                <div>
                  <h3 className="font-semibold">{sol.titulo}</h3>
                  <p className="text-sm text-gray-500">{sol.descripcion}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No hay soluciones disponibles.</p>
        )}
      </div>
    </div>
  );
};

export default AmbitosTabs;
