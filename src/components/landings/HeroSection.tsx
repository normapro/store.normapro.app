'use client';
import React, { useEffect, useState } from "react";
import Formulario from "@/components/Formulario";
import Lottie from "lottie-react";

type HeroSectionProps = {
  title?: string;
  claim?: string[] | string;
  pragma?: string[] | string;
  cta?: string;
  imgType?: "lottie" | "img";
  imgUrl?: string;
  backgroundImg?: string;
  backgroundRepeat?: string;
  backgroundSize?: string;
  backgroundPositionX?: string;
};

const HeroSection: React.FC<HeroSectionProps> = ({
  title,
  claim = [],
  pragma = [],
  cta,
  imgType = "img",
  imgUrl = "",
  backgroundImg,
  backgroundRepeat = "no-repeat",
  backgroundSize = "cover",
  backgroundPositionX = "center",
}) => {
  const colors = ["#010d3d", "#797f98"];
  const weights = ["semibold", "bold"];
  const [animationData, setAnimationData] = useState<any>(null);

  const normalizeTextList = (value: string[] | string | undefined) => {
    if (Array.isArray(value)) return value;
    if (typeof value === "string" && value.trim().length > 0) return [value];
    return [];
  };

  const claimList = normalizeTextList(claim);
  const pragmaList = normalizeTextList(pragma);

  const isExternal = imgUrl.startsWith("http");
  const finalUrl =
    imgType === "lottie" && !isExternal
      ? `/lotties/${imgUrl}.json`
      : imgUrl;

  useEffect(() => {
    if (imgType === "lottie") {
      fetch(finalUrl)
        .then((res) => res.json())
        .then(setAnimationData)
        .catch(console.error);
    }
  }, [finalUrl, imgType]);

  const [openModal, setOpenModal] = useState(false);

  return (
    <section className="max-w-7xl mx-auto w-full px-6 py-12 flex flex-col-reverse lg:flex-row items-center justify-between gap-8">
      <div className="flex-1">
        {title && <h4 className="text-[30px] font-[900] text-gray-500 mb-2">{title}</h4>}
        {claimList.length > 0 && (
          <h1 className="text-[43px] font-[900] leading-snug mb-4">
            {claimList.map((text, i) => (
              <span key={i} style={{ color: colors[i % colors.length] }}>
                {text + " "}
              </span>
            ))}
          </h1>
        )}
        {pragmaList.length > 0 && (
          <p className="text-lg text-[#010d3d] mb-6">
            {pragmaList.map((text, i) => (
              <span key={i} style={{ fontWeight: weights[i % weights.length] }}>
                {text + " "}
              </span>
            ))}
          </p>
        )}
        {cta && (
          <button
            onClick={() => setOpenModal(true)}
            className="bg-[#010d3d] text-white font-bold px-6 py-3 rounded-xl shadow-md hover:bg-[#04176f] transition"
          >
            {cta}
          </button>
        )}
      </div>

      <div className="flex-1 flex justify-center " >
        {imgType === "lottie" && animationData ? (
          <div className="max-w-md w-full h-auto" 
            style={{ backgroundImage: `url(/apps/${backgroundImg})`, backgroundSize: backgroundSize, backgroundPositionX: backgroundPositionX, backgroundRepeat: backgroundRepeat }}
          >
            <Lottie animationData={animationData} loop={true}  />
          </div>
        ) : imgType === "img" && finalUrl ? (
          <div
            className="max-w-md w-full h-auto"
            style={
              backgroundImg
                ? {
                    backgroundImage: `url(/${backgroundImg})`,
                    backgroundSize,
                    backgroundPositionX,
                    backgroundRepeat,
                  }
                : undefined
            }
          >
            <img src={finalUrl} alt="hero visual" className="max-w-md w-full h-auto" />
          </div>
        ) : null}
      </div>

      {/* Formulario contacto */}
      {openModal && (
        <Formulario onClose={() => setOpenModal(false)} />
      )}
    </section>
  );
};

export default HeroSection;
