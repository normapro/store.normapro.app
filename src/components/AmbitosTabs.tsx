"use client";

import { useEffect, useState } from "react";
import API_ENDPOINTS from "@/config/api";
import { Ambito } from "@/types/ambito";
import { Solucion } from "@/types/solucion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library ,IconPrefix, IconName, IconProp} from "@fortawesome/fontawesome-svg-core";

import { fas } from "@fortawesome/free-solid-svg-icons"; // Importamos todos los iconos sólidos
import { relative } from "path";


// Agregamos todos los iconos sólidos a la librería
library.add(fas);



interface Props {
  sectorSlug?: string | undefined |null; // Si se filtra por sector
  ambitoIdSelected:number | null;
}





const AmbitosTabs = ({ sectorSlug, ambitoIdSelected}: Props) => {
  const [ambitos, setAmbitos] = useState<Ambito[]>([]);
  const [soluciones, setSoluciones] = useState<Solucion[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);



  useEffect(() => {
    const fetchAmbitos = async () => {
      try {
        const response = await fetch(API_ENDPOINTS.AMBITOS_SOLUCIONES);
        if (!response.ok) throw new Error("Error al obtener los ámbitos");
        const data = await response.json();
        setAmbitos(data);
        if (ambitoIdSelected){
          setSelected(ambitoIdSelected);          
        }else{
          setSelected(data[0].id_ambito);
        } 

      } catch (error) {
        console.error(error);
      }
    };

    fetchAmbitos();
  }, []);

  const fetchSoluciones = async (ambitoSlug: string='all',sectorSlug:string | undefined | null ='non-specified') => {
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

  return (
    <div className="w-full">
      {/* Tabs con scroll horizontal */}
      <div className="overflow-x-auto scrollbar-hide scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
        <div className="flex space-x-0  w-max">
          {ambitos
          //.filter((ambito) => ambito.total_soluciones && ambito.total_soluciones >= 0)
          .map((ambito) => (            
              <div>
              <button                 
                key={ambito.id_ambito}
                onClick={() => {
                  setSelected(ambito.id_ambito);
                  fetchSoluciones(ambito.slug,sectorSlug);
                }}
                className={`px-4 py-4 font-bold text-[14px] rounded-md whitespace-nowrap transition ${
                  selected === ambito.id_ambito
                    ? "bg-[#f2f2f5] text-[#010D3D]"
                    : "bg-white text-[#010D3D] hover:bg-[#f2f2f5]"
                }`}
              >              
             
              {ambito.description} <span className="text-[12px] text-[#7F859D] opacity-50">{ambito.total_soluciones}</span>
            </button>
            <div className={                
                `${
                  selected === ambito.id_ambito 
                  ? "border-b-3 border-[#010D3D]" 
                  : "border-b-3 border-transparent"
                }
            `}
            ></div>
            </div> 
          ))}
        </div>
      </div>

      {/* Lista de Soluciones, Paquetes y Cursos */}
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
            )}
            )}
          </div>
        ) : (
          <p className="text-center text-gray-500">No hay soluciones disponibles.</p>
        )}
      </div>
    </div>
  );
};

export default AmbitosTabs;
