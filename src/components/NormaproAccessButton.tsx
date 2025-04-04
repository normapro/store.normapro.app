"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

const NormaProAccessButton = () => {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    if (!clicked) {
      setClicked(true);
    }
  };

  return (
    <button
      onClick={handleClick}
      className="inline-flex items-center bg-[#010D3D] text-white rounded-xl py-[3px] px-[4px] shadow-md hover:shadow-lg transition h-[40px] cursor-pointer"
    >
      <motion.div
        animate={clicked ? { x: 65 } : { x: 0 }}
        whileHover={!clicked ? { x: 8 } : {}}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 15,
        }}
        onAnimationComplete={() => {
          if (clicked) {
            window.location.href = "https://www.normapro.app";
          }
        }}
        className="mr-2"
      >
        <Image
          src="/icononormapro.png"
          alt="NormaPro"
          width={35}
          height={35}
          className="rounded-md my-[2px] "
        />
      </motion.div>
      <span className="font-semibold text-[14px] leading-none px-[3px] mr-[10px]">Entrar</span>
    </button>
  );
};

export default NormaProAccessButton;
