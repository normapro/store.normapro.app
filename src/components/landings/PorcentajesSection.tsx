'use client';

import { FC } from 'react';

type Dato = {
  porcentaje: string;
  claim: string[]; // El texto descriptivo que acompaña al porcentaje
}

type Props = {
  title: string;
  subtitle: string;
  datos: Dato[];
  claim: string;  // El párrafo del problema (el texto largo antes del final)
  pragma: string; // El párrafo final de cierre en negrita
}

const PorcentajesSection: FC<Props> = ({
  title,
  subtitle,
  datos,
  claim,
  pragma
}) => {
  const weights = ["semibold","bold"];

  return (
    <section className="max-w-4xl mx-auto w-full flex flex-col items-center justify-center py-16 px-6 md:px-12 text-[#010d3d]">
      
      {/* Title y subtitle */}
      <h1 className="max-w-3xl text-3xl md:text-[40px] font-black text-center mb-6">
        {title}
      </h1>
      <h2 className="max-w-3xl text-2xl text-center font-extrabold text-[#797f98] mb-12">
        {subtitle}
      </h2>

      {/* Tarjeta con los porcentajes */}
      <div className="w-full bg-[#fafafb] rounded-2xl p-8 md:p-12 mb-10">
        <span className="text-xl font-medium block mb-4">Por ejemplo:</span>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
          {datos.map((dato, index) => (
            <div key={index} className="flex flex-col gap-4">
              <p className="text-4xl md:text-5xl font-black">
                {dato.porcentaje}
              </p>
              <p className="text-[#010d3d] whitespace-pre-line">
                    {dato.claim.map((text, i) => (
                      <span key={i} style={{ fontWeight: weights[i % weights.length] }}>
                        {text + " "}
                      </span>
                    ))}
                  </p>
            </div>
          ))}
        </div>
      </div>

      {/* Claim y pragma */}
      <div className="max-w-3xl flex flex-col gap-8">
        <p>{claim}</p>
        <p className="font-bold text-lg">
          {pragma}
        </p>
      </div>

    </section>
  )
}

export default PorcentajesSection;