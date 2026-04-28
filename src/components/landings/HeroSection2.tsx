'use client'

import { FC } from 'react';

type Props = {
  title?: string[] | string;
  claim: string[] | string;
  pragma: string[] | string;
  imgBottom: string;
};

const HeroSection2: FC<Props> = ({
  title,
  claim,
  pragma,
  imgBottom,
}) => {
  const colors = ["#010d3d", "#9a9fb2"];

  const normalizeTextList = (value: string[] | string | undefined): string[] => {
    if (Array.isArray(value)) return value;
    if (typeof value === "string" && value.trim().length > 0) return [value];
    return [];
  };

  const titleList = normalizeTextList(title);
  const claimList = normalizeTextList(claim);
  const pragmaList = normalizeTextList(pragma);

  return (
    <section className="max-w-7xl mx-auto w-full flex flex-col items-center justify-center py-20 px-6 md:px-12 mb-[-250px]">
      {/* Título, claim y pragma*/}
      <div className="text-center max-w-2xl">
        {titleList.length > 0 && (
          <h2 className="text-2xl md:text-3xl font-extrabold mb-8">
            {titleList.map((text, i) => (
            <span key={i} style={{ color: colors[i % colors.length] }}>
              {text + " "}
            </span>
            ))}
          </h2>
        )}
        <h2 className="text-4xl md:text-5xl font-black mb-8">
          {claimList.map((text, i) => (
            <span key={i} style={{ color: colors[i % colors.length] }}>
              {text + " "}
            </span>
          ))}
        </h2>
        <h2 className="text-base md:text-lg font-extrabold mb-8">
          {pragmaList.map((text, i) => (
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