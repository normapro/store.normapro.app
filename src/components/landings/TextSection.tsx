'use client';
import React, { useEffect, useState } from "react";
import Lottie from "lottie-react";
import Formulario from "@/components/Formulario";

type TextSectionProps = {
  background: string;
  level1?: string[];
  level2?: string[];
  level3?: string[];
  level4?: string[];
  level5?: string[];
  level6?: string[];
  level7?: string[];
  level8?: string[];
  buttonText?: string;
  remarkableText?: string;
};

const TextSection: React.FC<TextSectionProps> = ({
  background,
  level1,
  level2,
  level3,
  level4,
  level5,
  level6,
  level7,
  level8,
  buttonText,
  remarkableText,

}) => {
  const [openModal, setOpenModal] = useState(false);
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
            <h4 className="text-[26px] font-[900] text-gray-500 mb-10 whitespace-pre-line">
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
        {level7 && (
          <h4 className="text-[20px] font-[800] text-gray-500 mb-10 whitespace-pre-line">
            {level7.map((text, i) => (
              <span key={i} style={{ color: colors[i % colors.length] }}>
                {text + " "}
              </span>
            ))}
            </h4>
        )}
        {level8 && (
          <h4 className="text-[16px] text-gray-500 mb-10 whitespace-pre-line">
            {level8.map((text, i) => (
              <span key={i} style={{ color: colors[i % colors.length] }}>
                {text + " "}
              </span>
            ))}
            </h4>
        )}
        {buttonText && (
            <button
              onClick={() => setOpenModal(true)}
              className="bg-[#010d3d] text-white font-bold px-6 py-3 rounded-xl shadow-md hover:bg-[#04176f] transition"
            >
              {buttonText}
            </button>
        )}
        {remarkableText && (
          <div className="bg-white rounded-2xl px-8 py-6 mb-10 shadow-sm inline-block max-w-full">
            <h4 className="text-[36px] font-[800] text-[#010d3d] leading-tight">
              {remarkableText}
            </h4>
          </div>
        )}
      </div>
    </section>
    {/* Formulario contacto */}
      {openModal && (
        <Formulario onClose={() => setOpenModal(false)} />
      )}
    </div>
  );
};

export default TextSection;
