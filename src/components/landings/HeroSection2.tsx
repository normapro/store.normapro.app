'use client'

import { FC } from 'react';

type Props = {
  title?: string[];
  claim: string[];
  pragma: string[]
  imgBottom: string;
};

const HeroSection2: FC<Props> = ({
  title,
  claim,
  pragma,
  imgBottom,
}) => {
  const colors = ["#010d3d", "#9a9fb2"];

  return (
    <section className="max-w-7xl mx-auto w-full flex flex-col items-center justify-center py-20 px-6 md:px-12 mb-[-250px]">
      {/* Título, claim y pragma*/}
      <div className="text-center max-w-2xl">
        {title && (
          <h2 className="text-2xl md:text-3xl font-extrabold mb-8">
            {title.map((text, i) => (
            <span key={i} style={{ color: colors[i % colors.length] }}>
              {text + " "}
            </span>
            ))}
          </h2>
        )}
        <h2 className="text-4xl md:text-5xl font-black mb-8">
          {claim.map((text, i) => (
            <span key={i} style={{ color: colors[i % colors.length] }}>
              {text + " "}
            </span>
          ))}
        </h2>
        <h2 className="text-base md:text-lg font-extrabold mb-8">
          {pragma.map((text, i) => (
            <span key={i} style={{ color: colors[i % colors.length] }}>
              {text + " "}
            </span>
          ))}
        </h2>
      </div>
      {/* Imagen final*/}
      <div className="">
        <img
          src={`/apps/${imgBottom}`}
          alt="Ilustración final"
          className={`up transition-opacity`}
        />
      </div>
    </section>
  );
};

export default HeroSection2;