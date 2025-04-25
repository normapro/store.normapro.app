'use client';
import { useEffect, useState, useRef } from 'react';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFileLines,
  faBullhorn,
  faFileSignature,
} from '@fortawesome/pro-duotone-svg-icons';

const iconMap: Record<string, IconDefinition> = {
  'fa-file-lines': faFileLines,
  'fa-bullhorn': faBullhorn,
  'fa-file-signature': faFileSignature,
};

type Caracteristica = {
  id_data: number;
  title: string;
  icon: string;
  mainTitle: string;
  subtitle: string;
  description: string;
  img: string;
};

type Props = {
  data: Caracteristica[];
};

const CaracteristicasIncorporadasSection = ({ data }: Props) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const steps = data.length;
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute('data-index'));
            setActiveIndex(index);
          }
        });
      },
      {
        root: null,
        threshold: 0.6,
      }
    );

    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      sectionRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, [data]);

  return (
    <section className="w-full">
      {/* Tabs */}
      <div className="sticky top-0 z-30 bg-white shadow-md flex gap-4 overflow-x-auto px-4 py-4 scrollbar-hide justify-start lg:justify-center">
        {data.map((item, i) => (
          <button
            key={item.id_data}
            className={`flex flex-col items-center min-w-[140px] transition-all duration-300 ${
              activeIndex === i ? 'text-[#010d3d] font-extrabold scale-105' : 'text-gray-400'
            }`}
          >
            <FontAwesomeIcon
              icon={iconMap[item.icon] || faFileLines}
              size="2x"
              className={`${
                activeIndex === i ? 'fa-duotone text-[#010d3d]' : 'text-gray-300'
              }`}
            />
            <span className="text-sm text-center mt-2">{item.title}</span>
          </button>
        ))}
      </div>

      {/* Step sections fullscreen */}
      {data.map((item, i) => (
        <div
          key={item.id_data}
          ref={(el) => (sectionRefs.current[i] = el)}
          data-index={i}
          className="h-screen w-full flex flex-col lg:flex-row items-center justify-center px-6 py-10 scroll-mt-20"
        >
          <div className="w-full lg:w-1/2 flex justify-center">
            <img
              src={`/apps/captures/${item.img}`}
              alt={item.mainTitle}
              className="w-full max-w-[500px] rounded-xl shadow-xl"
            />
          </div>
          <div className="w-full lg:w-1/2 mt-8 lg:mt-0 px-6 text-center lg:text-left">
            <h2 className="text-[30px] font-bold text-[#010d3d]">{item.mainTitle}</h2>
            {item.subtitle && <h3 className="text-xl text-gray-600 font-semibold mt-2 mb-4">{item.subtitle}</h3>}
            <p className="text-base text-gray-700 leading-relaxed">{item.description}</p>
            <button className="mt-6 bg-[#010d3d] text-white py-3 px-6 rounded-xl font-semibold">
              Quiero una demostración
            </button>
          </div>
        </div>
      ))}
    </section>
  );
};

export default CaracteristicasIncorporadasSection;
