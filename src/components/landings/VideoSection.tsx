'use client';

import React from "react";

type VideoSectionProps = {
  title: string;
  items: string[];
  url_video: string;
};

const VideoSection: React.FC<VideoSectionProps> = ({ title, items, url_video }) => {
  return (
    <section className="w-full px-6 py-16 flex flex-col items-center justify-center gap-10 text-center">
      <h2 className="text-[28px] md:text-[36px] font-extrabold text-[#010d3d]">
        {title}
      </h2>

      <ul className="space-y-3 text-[17px] md:text-lg text-[#3f3f3f] max-w-3xl mx-auto">
        {items.map((item, index) => (
          <li key={index} className="leading-relaxed">
            {item}
          </li>
        ))}
      </ul>

      <div className="w-full max-w-5xl aspect-video rounded-xl overflow-hidden shadow-xl">
        <iframe
          className="w-full h-full"
          src={url_video}
          title="Video explicativo"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </section>
  );
};

export default VideoSection;