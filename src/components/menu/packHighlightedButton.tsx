"use client";

import Link from "next/link";
import { Solucion } from "../../types/solucion";

type Props = {
  solucion: Solucion;
  onNavigate?: () => void; // Callback para cerrar el menú móvil al navegar
};

/**
 * Tarjeta de una solución destacada del desplegable de Soluciones
 */
const PackHighlightedButton = ({ solucion, onNavigate }: Props) => {
  return (
    <Link
      key={solucion.id_solucion}
      href={`/soluciones/${solucion.slug_ambito}/packs/${solucion.slug}`}
      onClick={onNavigate}
      className="block bg-[#E4F6FC] p-1 pl-3 rounded-lg shadow hover:shadow-lg transition"
    >
      <div className="flex items-center space-x-4 relative">
        {/* Contenedor del Icono con Fondo */}
        <div className="relative w-20 h-20 flex items-center justify-center">
          {/* Imagen de fondo */}
          <img src="/aura@2x.png" alt="Fondo" className="absolute w-full h-full object-cover" />

          {/* Icono de la solución encima */}
          <img
            src={"/" + solucion.uriIcon}
            alt={solucion.description}
            className="w-30 h-30 mt-3 object-contain relative z-10"
          />
        </div>

        {/* Texto de la solución */}
        <div className="flex-1">
          <h4 className="font-mulish text-[14px] text-[#010D3D] font-bold leading-[20px]">
            {solucion.description}
          </h4>
        </div>
      </div>
    </Link>
  );
};

export default PackHighlightedButton;