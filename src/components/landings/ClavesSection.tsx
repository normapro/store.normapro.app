'use client';
 
import { FC } from 'react';

type Clave = {
  image: string;
  claim: string;
}

type Props = {
  title: string;
  claves: Clave[];
}

const ClavesSection: FC<Props> = ({
  title,
  claves,
}) => {
  return (
    <section className="max-w-7xl mx-auto w-full flex flex-col items-center justify-center py-12 px-6 md:px-12 text-[#010d3d]">
      <h2 className="max-w-3xl text-3xl md:text-[40px] font-black text-center mb-16 leading-tight">
        {title}
      </h2>
      
      {/* Claves */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 w-full max-w-6xl">
        {claves.map((clave, index) => (
          <div key={index} className="flex flex-col items-center text-center group">
            
            {/* Imagen */}
            <div className="h-40 w-full flex items-end justify-center mb-6">
              <img 
                src={`/apps/${clave.image}`}
                alt={"clave"}
                className="max-h-full object-contain"
              />
            </div>

            {/* Texto */}
            <p className="text-lg leading-tight font-bold text-left w-full">
              {clave.claim}
            </p>
            
          </div>
        ))}
      </div>
    </section>
  )
}

export default ClavesSection;