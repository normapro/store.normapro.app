'use client';

import { FC } from 'react';

type Elemento = {
  image: string;
  title: string;
  claim: string;
};

type Props = {
  title: string;
  claim: string;
  pragma: string;
  listTitle: string;
  list: Elemento[];
};

const DesgraneSection: FC<Props> = ({ title, claim, pragma, listTitle, list }) => {
  return (
    <section className="max-w-7xl mx-auto w-full py-16 px-6 md:px-12 text-[#010d3d]">
      
      {/* Cabecera del Componente */}
      <div className="max-w-4xl mx-auto text-left mb-16 flex flex-col gap-8">
        <h2 className="text-4xl md:text-5xl text-center font-black tracking-tight leading-tight">
          {title}
        </h2>

        <p className="text-base md:text-lg font-medium leading-snug max-w-3xl mx-auto whitespace-pre-line">
          {claim}
        </p>

        <p className="text-lg md:text-xl font-bold max-w-3xl mx-auto whitespace-pre-line">
          {pragma}
        </p>

        <p className="text-xl md:text-2xl font-black text-[#797f98] max-w-3xl mx-auto whitespace-pre-line">
          {listTitle}
        </p>
      </div>

      {/* Lista de Tarjetas Desgranadas */}
      <div className="max-w-5xl mx-auto flex flex-col gap-8">
        {list.map((item, index) => (
          <div 
            key={index} 
            className="bg-[#f8f9fa] rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center gap-10"
          >
            {/* Imagen del elemento */}
            <div className="flex-shrink-0 w-full md:w-1/3 flex justify-center">
              <img 
                src={`/apps/${item.image}`} 
                alt={item.title} 
                className="max-h-[180px] object-contain"
              />
            </div>

            {/* Texto del elemento */}
            <div className="flex-1 flex flex-col justify-center">
              <h3 className="text-2xl md:text-4xl font-black mb-5 tracking-tight">
                {item.title}
              </h3>
              <p className="text-base font-bold leading-snug whitespace-pre-line">
                {item.claim}
              </p>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
};

export default DesgraneSection;