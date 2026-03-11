'use client';

import React from "react";

type VideoSectionProps = {
  title: string;
  items: string[];
  url_video: string;
  buttonText?: string;
};

const VideoSection: React.FC<VideoSectionProps> = ({ title, items, url_video, buttonText }) => {
  return (
    <section className="w-full px-6 py-10 flex flex-col items-center justify-center gap-10 text-center mb-5">
      <h2 className="text-[28px] md:text-[30px] font-black text-[#010d3d]">
        {title}
      </h2>

      <ul className="space-y-5 text-[17px] md:text-lg text-[#010d3d] font-semibold max-w-2xl mx-auto mb-15">
        {items.map((item, index) => (
          <li key={index} className="text-left leading-tight">
            {item}
          </li>
        ))}
      </ul>

      <div className="w-full max-w-5xl aspect-video rounded-xl overflow-hidden shadow-xl mb-5">
        <iframe
          className="w-full h-full"
          src={url_video}
          title="Video explicativo"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>

      {buttonText && (
        <button className="bg-[#010d3d] text-white font-bold px-6 py-3 rounded-xl shadow-md hover:bg-[#04176f] transition">
          {buttonText}
        </button>
      )}
    </section>
  );
};

export default VideoSection;