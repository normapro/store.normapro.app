'use client';
import React, { useEffect, useState } from "react";
import Lottie from "lottie-react";

type HeroSectionProps = {
  title: string;
  claim: string[];
  pragma: string;
  cta: string;
  imgType: "lottie" | "img";
  imgUrl: string;
};

const HeroSection: React.FC<HeroSectionProps> = ({
  title,
  claim,
  pragma,
  cta,
  imgType,
  imgUrl,
}) => {
  const colors = ["#010d3d", "#797f98"];
  const [animationData, setAnimationData] = useState<any>(null);

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

  return (
    <section className="max-w-7xl mx-auto w-full px-6 py-12 flex flex-col-reverse lg:flex-row items-center justify-between gap-8">
      <div className="flex-1">
        <h4 className="text-[30px] font-[900] text-gray-500 mb-2">{title}</h4>
        <h1 className="text-[43px] font-[900] leading-snug mb-4">
          {claim.map((text, i) => (
            <span key={i} style={{ color: colors[i % colors.length] }}>
              {text + " "}
            </span>
          ))}
        </h1>
        <p className="text-lg text-gray-700 mb-6">{pragma}</p>
        <button className="bg-[#010d3d] text-white px-6 py-3 rounded-xl shadow-lg font-semibold">
          {cta}
        </button>
      </div>

      <div className="flex-1 flex justify-center">
        {imgType === "lottie" && animationData ? (
          <Lottie animationData={animationData} loop={true} className="max-w-md w-full h-auto" />
        ) : imgType === "img" ? (
          <img src={finalUrl} alt="hero visual" className="max-w-md w-full h-auto" />
        ) : null}
      </div>
    </section>
  );
};

export default HeroSection;
