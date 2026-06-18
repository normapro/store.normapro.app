'use client';

import React, { useState } from "react";
import Formulario from "@/components/Formulario";
import { useSiteRef } from "@/context/SiteContext";

type VideoSectionProps = {
  title: string;
  items: string[];
  url_video?: string;
  buttonText?: string;
  imgBackground?: string;
};

const VideoSection: React.FC<VideoSectionProps> = ({
  title,
  items,
  url_video,
  buttonText,
  imgBackground,
}) => {
  const ref = useSiteRef();
  const isInstituto = ref === "instituto";

  const [openModal, setOpenModal] = useState(false);

  const getEmbedUrl = (url: string) => {
    try {
      const parsedUrl = new URL(url);

      if (parsedUrl.hostname.includes("youtu.be")) {
        const videoId = parsedUrl.pathname.replace("/", "");
        return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
      }

      if (parsedUrl.hostname.includes("youtube.com")) {
        if (parsedUrl.pathname.includes("/embed/")) return url;

        const videoId = parsedUrl.searchParams.get("v");
        return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
      }

      return url;
    } catch {
      return url;
    }
  };

  const theme = {
    general: isInstituto ? "bg-[#010D3D] text-[#FFFFFF]" : "bg-[#FFFFFF] text-[#010D3D]",
    button: isInstituto ? "bg-gradient-to-r from-[#00b2e3] to-[#cca1dd]" : "bg-[#010D3D] hover:bg-[#04176f]",
  };
  
  return (
    <div className={theme.general + " w-full"}>
    <section className="relative w-full px-6 py-10 mb-5 overflow-hidden flex flex-col items-center">
      {imgBackground && (
        <img
          src={`/apps/${imgBackground}`}
          alt=""
          aria-hidden="true"
          className="hidden lg:block absolute right-[-120px] top-[-20px] w-[340px] xl:w-[460px] object-contain pointer-events-none select-none"
        />
      )}

      <div className="w-full max-w-6xl mx-auto flex flex-col items-center justify-center gap-10 text-center">
        <div className="w-full max-w-3xl mx-auto">
          <h2 className="text-[28px] md:text-[34px] font-black leading-tight">
            {title}
          </h2>

          <ul className="space-y-4 text-[17px] md:text-lg font-semibold mt-8">
            {items.map((item, index) => (
              <li key={index} className="leading-tight text-center">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
      
      {url_video && (
        <div className="w-full max-w-6xl mx-auto mt-20 md:mt-14 aspect-video rounded-xl overflow-hidden shadow-xl mb-20">
          <iframe
            className="w-full h-full"
            src={getEmbedUrl(url_video)}
            title="Video explicativo"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      )
      }

      {buttonText && (
        <button
          onClick={() => setOpenModal(true)}
          className={theme.button + " text-white font-bold px-6 py-3 rounded-xl shadow-md hover:bg-[#04176f] transition"}
        >
          {buttonText}
        </button>
      )}

      {/* Formulario contacto */}
      {openModal && (
        <Formulario onClose={() => setOpenModal(false)} />
      )}
    </section>
    </div>
  );
};

export default VideoSection;