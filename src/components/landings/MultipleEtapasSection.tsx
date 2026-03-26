'use client';

import { FC, useMemo, useRef, useState } from 'react';
import Formulario from "@/components/Formulario";

type EtapaListItem =
  | string
  | {
      title: string;
      content?: string;
    };

type Etapa = {
  imgBackground?: string;
  image: string;
  title: string;
  objective: string;
  claim?: string;
  list?: EtapaListItem[];
};

type Opcion = {
  pretitle?: string;
  title: string;
  claim?: string;
  image?: string;
  imgBackground?: string;
  cardButtonText?: string;
  introTitle?: string;
  introClaim?: string | string[];
  etapas: Etapa[];
};

type Props = {
  title: string;
  subtitle?: string;
  claim: string;
  selectorTitle?: string;
  options: Opcion[];
};

const MultipleEtapasSection: FC<Props> = ({
  title,
  subtitle,
  claim,
  selectorTitle = 'Elije la opción en la que mejor encaje tu caso:',
  options,
}) => {
  const [openModal, setOpenModal] = useState(false);
  const [activeOptionIndex, setActiveOptionIndex] = useState(0);
  const etapasRef = useRef<HTMLDivElement | null>(null);

  // Solo un desplegable abierto a la vez
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});
  const toggleItem = (key: string) => {
    setExpandedItems((prev) => (prev[key] ? {} : { [key]: true }));
  };

  const handleSelectOption = (index: number, scrollToLevels = false) => {
    setActiveOptionIndex(index);
    if (scrollToLevels && etapasRef.current) {
      const y = etapasRef.current.getBoundingClientRect().top + window.scrollY - 110;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const selectedOption = useMemo(() => {
    if (!options || options.length === 0) return null;
    return options[activeOptionIndex] || options[0];
  }, [activeOptionIndex, options]);

  const introClaimList = Array.isArray(selectedOption?.introClaim)
    ? selectedOption?.introClaim
    : selectedOption?.introClaim
      ? [selectedOption.introClaim]
      : [];

  if (!selectedOption) return null;

  return (
    <section className="max-w-7xl mx-auto w-full flex flex-col items-center justify-center py-10 px-6 md:px-12">
      {/* Títulos */}
      <div className="max-w-3xl mx-auto text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-black text-[#010d3d] mb-6 mt-10 whitespace-pre-line">
          {title}
        </h2>
        {subtitle && (
          <p className="text-xl md:text-2xl font-extrabold text-[#797f98] mb-6 whitespace-pre-line">
            {subtitle}
          </p>
        )}
        <p className="text-base text-[#010d3d] max-w-2xl mx-auto whitespace-pre-line mt-15 mb-6">
          {claim}
        </p>
      </div>

      <h3 className="text-lg md:text-2xl font-black text-[#010d3d] mb-15 text-center">
        {selectorTitle}
      </h3>

      {/* Tarjetas de opciones */}
      <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4 mb-30 text-center">
        {options.map((option, index) => {
          const isActive = index === activeOptionIndex;
          return (
            <div
              key={`${option.title}-${index}`}
              className="rounded-2xl p-5 transition-all duration-200 shadow-sm flex flex-col items-center bg-[#F5F5F7] h-full"
            >
              {option.pretitle && (
                <p className="text-md text-[#9098b3] font-extrabold mb-5 w-full">{option.pretitle}</p>
              )}
              <p className="text-3xl font-black text-[#010d3d] mb-15">{option.title}</p>

              {option.image && (
                <div className="h-[200px] flex items-center justify-center mb-6">
                  <div className="relative w-[200px] h-[180px] flex items-center justify-center mb-12">
                    {option.imgBackground && (
                      <img
                        src={`/apps/${option.imgBackground}`}
                        alt=""
                        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] max-w-none object-contain"
                      />
                    )}
                    <img
                      src={`/apps/${option.image}`}
                      alt={option.title}
                      className="relative z-10 max-h-[220px] w-auto object-contain"
                    />
                  </div>
                </div>
              )}

              {option.claim && (
                <p className="text-base text-[#010d3d] mb-10 leading-relaxed font-bold">{option.claim}</p>
              )}

              <button
                onClick={() => handleSelectOption(index, true)}
                className="mt-auto inline-block bg-[#010d3d] text-white text-base font-bold px-5 py-3 rounded-lg"
              >
                {option.cardButtonText || 'Ver etapas'}
              </button>
            </div>
          );
        })}
      </div>

      {/* Etapas de la opción seleccionada */}
      <div ref={etapasRef} className="w-full mb-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {options.map((option, index) => {
            const isActive = index === activeOptionIndex;
            return (
              <button
                key={`level-${option.title}-${index}`}
                onClick={() => handleSelectOption(index, true)}
                className={`rounded-2xl px-3 py-5 text-center border transition-all duration-200 ${isActive
                  ? 'bg-[#010d3d] text-white border-[#010d3d] shadow-md'
                  : 'bg-[#f3f4f8] text-[#010d3d] border-[#e4e6ef] hover:border-[#010d3d]/40'
                  }`}
              >
                {option.pretitle && (
                  <p className={`text-md font-extrabold mb-3 ${isActive ? 'text-[#c3cbe6]' : 'text-[#9098b3]'}`}>
                    {option.pretitle}
                  </p>
                )}
                <p className="text-3xl font-black">{option.title}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Sección de etapas */}
      <div className="w-full max-w-5xl mb-10 border-t border-[#d9dbe7] pt-8">
        <div className="mb-30 text-center">
          <h3 className="text-4xl md:text-5xl font-black text-[#010d3d] mb-15 mx-auto max-w-2xl mt-15">
            {selectedOption.introTitle || selectedOption.title}
          </h3>
          {introClaimList.length > 0 && (
            <div className="text-[#010d3d] text-lg md:text-2xl leading-relaxed whitespace-pre-line space-y-3 font-bold text-center">
              {introClaimList.map((claimText, index) => (
                <p key={index} className="mb-10">{claimText}</p>
              ))}
            </div>
          )}
        </div>

        <div className="relative max-w-6xl mx-auto w-full">
          {selectedOption.etapas.map((etapa, index) => {
            const isLeft = index % 2 === 0;
            const isFirst = index === 0;
            const isLast = index === selectedOption.etapas.length - 1;

            return (
              <div
                key={index}
                className={`relative flex flex-col mb-16 last:mb-0 md:items-start ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
              >
                {/* Línea central */}
                <div className="absolute left-3 md:left-1/2 -translate-x-1/2 h-full w-[10px]">
                  {!isLast && <div className="absolute top-0 bottom-0 left-0 right-0 bg-[#0a1a44]" />}
                  {!isFirst && <div className="absolute -top-16 h-16 left-0 right-0 bg-[#0a1a44]" />}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-10 h-10 bg-white border-10 border-[#0a1a44] rounded-full z-10" />
                </div>

                {/* Texto */}
                <div
                  className={`w-full pl-10 md:pl-0 md:w-1/2 flex flex-col justify-center text-left text-[#010d3d] ${isLeft ? 'md:pr-16' : 'md:pl-16'
                    }`}
                >
                  <p className="text-xl md:text-3xl font-semibold mb-2">Etapa {index + 1}</p>
                  <h4 className="text-3xl md:text-4xl font-black mb-4">{etapa.title}</h4>
                  <p className="text-base font-bold mb-3">{etapa.objective}</p>
                  {etapa.claim && (
                    <p className="text-lg leading-relaxed whitespace-pre-line mb-4">{etapa.claim}</p>
                  )}

                  {/* Desplegable con animación */}
                  {etapa.list && etapa.list.length > 0 && (
                    <div className="mb-8 border-t border-[#c5cada]">
                      {etapa.list.map((item, i) => {
                        const itemKey = `${activeOptionIndex}-${index}-${i}`;
                        const isOpen = !!expandedItems[itemKey];
                        const title = typeof item === 'string' ? item : item.title;
                        const content = typeof item === 'string' ? item : (item.content || '');

                        return (
                          <div key={itemKey} className="border-b border-[#c5cada]">
                            <button
                              type="button"
                              onClick={() => toggleItem(itemKey)}
                              className="w-full py-4 flex items-center justify-between text-left"
                            >
                              <span className="text-xl font-black text-[#010d3d] pr-4">{title}</span>
                              <span className={`text-[#010d3d] text-4xl transition-transform duration-500 ease-in-out font-bold ${isOpen ? 'rotate-180' : ''}`}>
                                ⌄
                              </span>
                            </button>

                            {/* Contenido animado */}
                            <div className={`overflow-hidden transition-[max-height,opacity,padding] duration-500 ease-in-out ${isOpen ? 'max-h-96 opacity-100 pb-5' : 'max-h-0 opacity-0 pb-0'}`}>
                              <p className="text-lg leading-relaxed text-[#010d3d] whitespace-pre-line">{content}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Imagen */}
                <div
                  className={`w-full md:w-1/2 flex justify-center mt-6 md:mt-0 ${isLeft ? 'md:justify-start md:pl-16' : 'md:justify-end md:pr-16'
                    }`}
                >
                  <div className="relative w-[380px] md:w-[480px] flex justify-center items-center">
                    {etapa.imgBackground && (
                      <img
                        src={`/apps/${etapa.imgBackground}`}
                        alt=""
                        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[100%] max-w-none"
                      />
                    )}

                    <img
                      src={`/apps/${etapa.image}`}
                      alt={etapa.title}
                      className="relative z-10 h-[400px] md:h-[700px] object-contain"
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default MultipleEtapasSection;