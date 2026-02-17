'use client';
import React, { useEffect, useState } from "react";
import Lottie from "lottie-react";

type TextSectionProps = {
  background: string;
  level1?: string[];
  level2?: string[];
  level3?: string[];
  level4?: string[];
  level5?: string[];
  level6?: string[];
  buttonText?: string;
};

const TextSection: React.FC<TextSectionProps> = ({
  background,
  level1,
  level2,
  level3,
  level4,
  level5,
  level6,
  buttonText
}) => {
  const colors = ["#010d3d", "#797f98"];
  const bgcolors = ["#ffffff","#eaeaf2" ]
  let bgColor =  bgcolors[1];

  if (background === "gray") {
     bgColor = bgcolors[1];
  }else{
     bgColor = bgcolors[0];
  }

  return (
    <div className="w-full" style={{ backgroundColor: bgColor }}>
    <section className={`max-w-7xl mx-auto w-full px-25 py-12 flex flex-col-reverse lg:flex-row items-center justify-center text-center gap-8 `}>
      <div className="flex-1">
        {level1 && (
          <h4 className="text-[50px] font-[900] text-gray-500 mb-10">
            {level1.map((text, i) => (
              <span key={i} style={{ color: colors[i % colors.length] }}>
                {text + " "}
              </span>
            ))}
          </h4>
        )}
        {level2 && (
          <h4 className="text-[24px] font-[900] text-gray-500 mb-10 whitespace-pre-line">
            {level2.map((text, i) => (
              <span key={i} style={{ color: colors[i % colors.length] }}>
                {text + " "}
              </span>
            ))}
          </h4>
        )}
        {level3 && (
          <h4 className="text-[20px] font-[800] text-gray-500 mb-10 whitespace-pre-line">
            {level3.map((text, i) => (
              <span key={i} style={{ color: colors[i % colors.length] }}>
                {text + " "}
              </span>
            ))}
            </h4>
        )}
        {level4 && (
            <h4 className="text-[25px] font-[900] text-gray-500 mb-10 whitespace-pre-line">
            {level4.map((text, i) => (
              <span key={i} style={{ color: colors[i % colors.length] }}>
                {text + " "}
              </span>
            ))}
            </h4>
        )}
        {level5 && (
          <h4 className="text-[40px] font-[900] text-gray-500 mb-10 whitespace-pre-line">
            {level5.map((text, i) => (
              <span key={i} style={{ color: colors[i % colors.length] }}>
                {text + " "}
              </span>
            ))}
            </h4>
        )}
        {level6 && (
            <h4 className="text-[22px] font-[800] text-gray-500 mb-10 whitespace-pre-line">
            {level6.map((text, i) => (
              <span key={i} style={{ color: colors[i % colors.length] }}>
                {text + " "}
              </span>
            ))}
            </h4>
        )}
        {buttonText && (
            <button className="bg-[#010d3d] text-white font-semibold px-6 py-3 rounded-xl mb-4 shadow-md hover:bg-[#04176f] transition">
              {buttonText}
            </button>
        )}
      </div>
    </section>
    </div>
  );
};

export default TextSection;
