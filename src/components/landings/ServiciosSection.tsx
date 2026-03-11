'use client';

import { FC } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBracketCurly } from '@fortawesome/pro-duotone-svg-icons';

type BasicService = {
  image: string;
  title: string;
  claim: string;
};

type ExtraService = {
  image: string;
  claim: string[];
};

type Props = {
  title: string;
  basicTitle: string;
  extraTitle: string;
  basicServices: BasicService[];
  extraServices: ExtraService[];
  buttonText: string;
};

const ServiciosSection: FC<Props> = ({
  title,
  basicTitle,
  extraTitle,
  basicServices,
  extraServices,
  buttonText,
}) => {
  const weights = ["semibold","bold"];

  return (
    <section className="max-w-7xl mx-auto px-6 md:px-12 py-16 text-center">

      {/* Title */}
      <h2 className="text-2xl md:text-[38px] font-black text-[#010d3d] text-center mb-16">
        {title}
      </h2>

      <div className="grid md:grid-cols-2 gap-20 mb-10">
        {/* Servicios básicos */}
        <div className="flex flex-col items-center">
          <h3 className="text-center font-semibold text-gray-500 mb-6">
            {basicTitle}
          </h3>
          <div className="text-[#eaeaf2] text-8xl inline-block rotate-90 scale-y-500">
            <FontAwesomeIcon icon={faBracketCurly} className="fa-duotone" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full">
            {basicServices.map((service, index) => (
              <div
                key={index}
                className="bg-[#eaeaf2] rounded-2xl p-6 text-center flex flex-col items-center"
              >
                <div className="bg-white rounded-xl mb-4">
                  <img
                    src={`/apps/${service.image}`}
                    alt={service.title}
                    className="w-30 h-30 object-contain"
                  />
                </div>

                <h4 className="font-bold text-[#010d3d] mb-2">
                  {service.title}
                </h4>

                <p className="text-sm text-[#010d3d]">
                  {service.claim}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Servicios extra */}
        <div className="flex flex-col items-center">
          <h3 className="text-center font-semibold text-gray-500 mb-6">
            {extraTitle}
          </h3>
          <div className="text-[#f5f5f7] text-8xl inline-block rotate-90 scale-y-500">
            <FontAwesomeIcon icon={faBracketCurly} className="fa-duotone" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
            {extraServices.map((service, index) => (
              <div
                key={index}
                className="bg-[#f5f5f7] border-3 border-dashed border-[#eaeaf2] rounded-2xl p-6 text-center flex flex-col items-center"
              >
                <div className="bg-white rounded-xl mb-4">
                  <img
                    src={`/apps/${service.image}`}
                    alt="Imagen"
                    className="w-30 h-30 object-contain"
                  />
                </div>
                {service.claim.map((item, index) => (
                  <p 
                    className="text-sm text-[#010d3d]"
                    style={{ fontWeight: weights[index % weights.length] }}
                  >
                    {item + " "}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Botón */}
      <button className="bg-[#010d3d] text-white font-bold px-6 py-3 rounded-xl shadow-md hover:bg-[#04176f] transition">
        {buttonText}
      </button>
    </section>
  );
};

export default ServiciosSection