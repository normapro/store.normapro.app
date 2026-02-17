'use client';

import { FC } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFolderGear,
  faCommentsQuestionCheck,
  faShieldHalved,
  faArrowsUpDownLeftRight,
  faLightbulbOn,
} from '@fortawesome/pro-duotone-svg-icons';

const iconMap: Record<string, any> = {
  'fa-folder-gear': faFolderGear,
  'fa-comments-question-check': faCommentsQuestionCheck,
  'fa-shield-halved': faShieldHalved,
  'fa-arrows-up-down-left-right': faArrowsUpDownLeftRight,
  'fa-lightbulb-on': faLightbulbOn,
};

type Bloque = {
  icon: string;
  title: string;
  pragma: string;
};

type Props = {
  imgCabecera: string;
  title: string;
  claim: string;
  titlelist: string;
  list: Bloque[];
  cta: {
    pretitle?: string;
    title: string;
    buttonText: string;
    pragma: string;
  };
};

const ResumenSection: FC<Props> = ({
  imgCabecera,
  title,
  claim,
  titlelist,
  list,
  cta,
}) => {
  return (
    <section className="max-w-7xl mx-auto w-full flex flex-col items-center justify-center py-20 px-6 md:px-12">
      {/* Imagen de cabecera */}
      <div className="mb-10">
        <img
          src={`/apps/${imgCabecera}`}
          alt="Ilustración cabecera"
          className="h-[120px] md:h-[160px]"
        />
      </div>

      {/* Título y claim */}
      <div className="text-center max-w-3xl mb-10">
        <h2 className="text-3xl md:text-[40px] font-black text-[#010d3d] mb-6">
          {title}
        </h2>
        <p className="text-base md:text-lg text-gray-700">{claim}</p>
      </div>

      {/* Lista destacada */}
      <div className="w-full max-w-3xl mb-12">
        {titlelist.length > 0 && (
          <h3 className="text-xl text-[#010d3d] font-semibold mb-6">{titlelist}</h3>
        )}
        <div className="flex flex-col gap-8">
          {list.map((item, i) => (
            <div key={i} className="flex items-start gap-4">
              <div className="text-[#010d3d] text-2xl mt-1">
                <FontAwesomeIcon icon={iconMap[item.icon]} className="fa-duotone" />
              </div>
              <div>
                {item.title.length > 0 && (<h4 className="text-xl font-black text-[#010d3d] mb-2">
                  {item.title}
                </h4>)}
                <p className="text-base text-[#010d3d] leading-tight whitespace-pre-line">{item.pragma}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA final */}
      <div className="text-center max-w-xl">
        {cta.pretitle && (
          <p className="text-2xl font-black text-[#010d3d] mb-6">{cta.pretitle}</p>
        )}
        {cta.title && (
          <p className="text-2xl font-black text-[#6C6C91] mb-6">{cta.title}</p>
        )}
        {cta.buttonText && (
          <button className="bg-[#010d3d] text-white font-bold px-6 py-3 rounded-xl mb-4 shadow-md hover:bg-[#04176f] transition">
            {cta.buttonText}
          </button>
        )}
        <p className="text-[#010d3d] text-base">{cta.pragma}</p>
      </div>
    </section>
  );
};

export default ResumenSection;
