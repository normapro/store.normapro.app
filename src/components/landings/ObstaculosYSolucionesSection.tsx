'use client';

import { FC } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHourglass,
  faCommentSlash,
  faFaceFrownSlight,
  faChartLineDown,
  faCalendarClock,
  faCoins,
  faFaceSadSweat,
  faFileExclamation,
  faUserGraduate,
  faChartUser,
  faGem,
  faUsers,
} from '@fortawesome/pro-duotone-svg-icons';

const iconMap: Record<string, any> = {
  'fa-hourglass': faHourglass,
  'fa-comment-slash': faCommentSlash,
  'fa-face-frown-slight': faFaceFrownSlight,
  'fa-chart-line-down': faChartLineDown,
  'fa-calendar-clock': faCalendarClock,
  'fa-coins': faCoins,
  'fa-face-sad-sweat': faFaceSadSweat,
  'fa-file-exclamation': faFileExclamation,
  'fa-user-graduate': faUserGraduate,
  'fa-chart-user': faChartUser,
  'fa-gem': faGem,
  'fa-users': faUsers,
};

type Celda = {
  idcelda: number;
  icono: string;
  title: string;
  pragma: string;
};

type Props = {
  title: string;
  claim: string;
  table: Celda[];
  pragma: string[];
  buttonText?: string;
  background?: string;
};

const ObstaculosYSolucionesSection: FC<Props> = ({ title, claim, table, pragma, buttonText, background = "white" }) => {
  const bgcolors = ["#ffffff","#eaeaf2" ];
  let bgColor = bgcolors[1];
  if (background === "gray") {
     bgColor = bgcolors[1];
  }else{
     bgColor = bgcolors[0];
  }

  return (
    <div className="w-full" style={{ backgroundColor: bgColor }}>
    <section className="max-w-7xl mx-auto w-full flex flex-col items-center justify-center py-16 px-6 md:px-12">
      {/* Título y subtítulo */}
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-black text-[#010d3d] mb-12">{title}</h2>
        <p className="text-base text-[#010d3d] whitespace-pre-line">{claim}</p>
      </div>

      {/* Tabla horizontal sin separación entre columnas */}
      <div className="grid grid-cols-1 md:grid-cols-4 w-full border-2 border-gray-300 rounded-2xl overflow-hidden mb-12 divide-y md:divide-y-0 md:divide-x divide-2 divide-gray-300">
        {table.map((celda, index) => {
          const isFirst = index === 0;
          const isLast = index === table.length - 1;

          return (
            <div
              key={celda.idcelda}
              className={`flex flex-col p-6 border-l border-gray-300 last:border-r 
                ${isFirst ? 'rounded-l-2xl' : ''} 
                ${isLast ? 'rounded-r-2xl' : ''} 
                ${isFirst ? 'border-l-0' : ''}`}
            >
              <div className="text-[#010d3d] text-3xl mb-10">
                <FontAwesomeIcon icon={iconMap[celda.icono]} className="fa-duotone" />
              </div>
              <h3 className="text-lg font-black text-[#010d3d]">{celda.title}</h3>
              <p className="text-[#010d3d] text-sm font-medium">{celda.pragma}</p>
            </div>
          );
        })}
      </div>

      {/* Párrafos finales */}
      <div className="max-w-4xl text-center">
        {pragma.map((p, i) => (
          <p key={i} className="text-base md:text-lg text-gray-700 mb-4">
            {p}
          </p>
        ))}
        {buttonText && (
            <button className="bg-[#010d3d] text-white font-semibold px-6 py-3 rounded-xl mb-4 shadow-md hover:bg-[#04176f] transition">
              {buttonText}
            </button>
        )}
      </div>
    </section>
    </div>
  );
};

export default ObstaculosYSolucionesSection;
