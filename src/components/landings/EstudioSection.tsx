'use client';

import { FC } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faDisplaySlash,
  faFileExcel,
  faFilePen,
  faCalendarClock,
  faArrowDownToBracket // Para el botón de descarga
} from '@fortawesome/pro-duotone-svg-icons';

const iconMap: Record<string, any> = {
  'fa-display-slash': faDisplaySlash,
  'fa-file-excel': faFileExcel,
  'fa-file-pen': faFilePen,
  'fa-calendar-clock': faCalendarClock,
};

// Colores de fondo de los iconos
const iconBgColors: Record<string, string> = {
  'fa-display-slash': 'bg-[#fbd1df]',
  'fa-file-excel': 'bg-[#b6ebdf]',
  'fa-file-pen': 'bg-[#89d6ee]',
  'fa-calendar-clock': 'bg-[#e5d4ef]',
};

type Dato = {
  icon: string;
  porcentaje: string;
  claim: string[];
};

type Props = {
  title: string;
  claim: string[];
  pragma: string;
  datos: Dato[];
};

const EstudioSection: FC<Props> = ({ title, claim, pragma, datos }) => {
  const weights = ["semibold", "bold"];

  return (
    <section className="max-w-7xl mx-auto w-full py-16 px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center text-[#010d3d]">
      
      {/* Columna izquierda */}
      <div className="lg:col-span-6 flex flex-col justify-between h-full py-4">
        <div>
          <h2 className="text-2xl md:text-[38px] font-black mb-10 leading-tight">
            {title}
          </h2>

          <div className="space-y-4 text-base md:text-lg text-[#010d3d] font-medium leading-tight max-w-lg">
            {claim.map((text, i) => (
            <span key={i} style={{ fontWeight: weights[i % weights.length] }}>
              {text + " "}
            </span>
          ))}
          </div>
        </div>

        {/* Caja de descarga */}
        <div className="mt-12 bg-[#f8f9fa] rounded-3xl p-8 md:p-10 flex flex-col items-start justify-center max-w-lg shadow-sm">
          <p className="text-lg md:text-xl font-bold mb-8 text-[#010d3d] leading-snug">
            {pragma}
          </p>
          
          <button className="flex items-center gap-3 bg-transparent border-2 border-[#010d3d] text-[#010d3d] font-bold px-6 py-3 rounded-xl hover:bg-[#010d3d] hover:text-white transition-all duration-300">
            <FontAwesomeIcon icon={faArrowDownToBracket} className="text-lg" />
            Descarga aquí el informe
          </button>
        </div>
      </div>

      {/* Columna Derecha: Métricas / Estadísticas */}
      <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-16">
        {datos.map((dato, index) => {
          const IconComponent = iconMap[dato.icon];
          const bgColor = iconBgColors[dato.icon] || 'bg-gray-200';

          return (
            <div key={index} className="flex flex-col items-start">
              {/* Icono con fondo circular-cuadrado */}
              <div className={`w-20 h-20 ${bgColor} rounded-2xl flex items-center justify-center mb-6`}>
                {IconComponent && (
                  <FontAwesomeIcon 
                    icon={IconComponent} 
                    className="text-4xl text-[#010d3d]" 
                  />
                )}
              </div>

              {/* Porcentaje */}
              <span className="text-4xl md:text-5xl font-black mb-4 tracking-tight">
                {dato.porcentaje}
              </span>

              {/* Texto descriptivo */}
              <p className="text-base text-[#010d3d] font-medium leading-normal">
                {dato.claim.map((text, i) => (
                  <span key={i} style={{ fontWeight: weights[i % weights.length] }}>
                    {text + " "}
                  </span>
                ))}
              </p>
            </div>
          );
        })}
      </div>

    </section>
  );
};

export default EstudioSection;