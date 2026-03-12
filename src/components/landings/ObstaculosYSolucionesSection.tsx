'use client';

import { FC, useState } from 'react';
import Formulario from "@/components/Formulario";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHourglass,
  faCommentSlash,
  faFaceFrownSlight,
  faChartLineDown,
  faCalendarClock,
  faCoins,
  faFileExclamation,
  faUserGraduate,
  faChartUser,
  faGem,
  faUsers,
  faComment,
  faEnvelopeDot,
  faTimelineArrow,
  faFileCircleCheck,
} from '@fortawesome/pro-duotone-svg-icons';

const iconMap: Record<string, any> = {
  'fa-hourglass': faHourglass,
  'fa-comment-slash': faCommentSlash,
  'fa-face-frown-slight': faFaceFrownSlight,
  'fa-chart-line-down': faChartLineDown,
  'fa-calendar-clock': faCalendarClock,
  'fa-coins': faCoins,
  'fa-file-exclamation': faFileExclamation,
  'fa-user-graduate': faUserGraduate,
  'fa-chart-user': faChartUser,
  'fa-gem': faGem,
  'fa-users': faUsers,
  'fa-comment': faComment,
  'fa-envelope-dot': faEnvelopeDot,
  'fa-timeline-arrow': faTimelineArrow,
  'fa-file-circle-check': faFileCircleCheck
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
  tabletitle?: string;
  table: Celda[];
  pragma: string[];
  buttonText?: string;
  background?: string;
};

const ObstaculosYSolucionesSection: FC<Props> = ({ title, claim, tabletitle, table, pragma, buttonText, background = "white" }) => {
  const [openModal, setOpenModal] = useState(false);
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
      {/* Título, subtítulo y título tabla */}
      <div className="text-center">
        <h2 className="text-3xl md:text-4xl font-black text-[#010d3d] mb-12">{title}</h2>
        <p className="text-base text-[#010d3d] whitespace-pre-line mb-12">{claim}</p>
        {tabletitle && (
          <h3 className="text-xl md:text-2xl font-black text-[#010d3d] mb-12">
            {tabletitle}
          </h3>
        )}
      </div>

      {/* Tabla horizontal sin separación entre columnas */}
      <div
        className="grid grid-cols-1 md:[grid-template-columns:repeat(var(--cols),minmax(0,1fr))] w-full border-2 border-gray-300 rounded-2xl overflow-hidden mb-12 divide-y md:divide-y-0 md:divide-x divide-2 divide-gray-300"
        style={{ "--cols": table.length }}
      >
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
          <button
            onClick={() => setOpenModal(true)}
            className="bg-[#010d3d] text-white font-bold px-6 py-3 rounded-xl shadow-md hover:bg-[#04176f] transition"
          >
            {buttonText}
          </button>
        )}
      </div>
    </section>
    {/* Formulario contacto */}
      {openModal && (
        <Formulario onClose={() => setOpenModal(false)} />
      )}
    </div>
  );
};

export default ObstaculosYSolucionesSection;
