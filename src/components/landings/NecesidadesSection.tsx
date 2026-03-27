'use client'

import { FC } from 'react'

type Props = {
  imgBackground: string;
  image: string;
  title: string;
  subtitle: string;
  titlelist: string;
  list?: string[];
  claim?: string;
}

const NecesidadesSection: FC<Props> = ({
  imgBackground,
  image,
  title,
  subtitle,
  titlelist,
  list,
  claim
}) => {
  // Función para convertir un índice numérico en letras (0 -> a, 1 -> b, etc.)
  const getLetter = (index: number) => String.fromCharCode(97 + index) + ')'

  return (
    <section className="mx-auto flex max-w-4xl flex-col items-center px-6 py-12 text-[#010d3d]">
      
      {/* Imagen */}
      <div className="relative overflow-visible mb-10">
				<img
				  src={`/apps/${imgBackground}`}
					alt=""
					className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[300%] max-w-none h-auto object-contain"
				/>
				<img
					src={`/apps/${image}`}
					alt="Imagen cabecera"
					className="relative z-10 h-[120px] md:h-[180px] object-contain"
				/>
			</div>

      {/* Title, subtitle, titlelist */}
      <h3 className="mb-4 text-center text-3xl font-bold tracking-tight">
        {title}
      </h3>
      <h2 className="mb-10 text-center text-4xl font-black leading-snug tracking-tight md:text-5xl">
        {subtitle}
      </h2>
      <div className="w-full max-w-3xl space-y-8">
        <p className="text-2xl font-extrabold text-[#797f98]">
          {titlelist}
        </p>
        {claim && (
          <p className="text-base">
            {claim}
          </p>
        )}

        {/* Lista */}
        {list && (
          <ul className="space-y-8">
            {list.map((item, index) => (
              <li key={index} className="flex items-start space-x-6">
                <span className="text-4xl font-black tracking-tight">
                  {getLetter(index)}
                </span>
                <p className="pt-2 text-base font-bold">
                  {item}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div> 
    </section>
  )
}

export default NecesidadesSection;