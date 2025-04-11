"use client";

import Image from "next/image";

const heroImages = [
  "head_img1@2x.png",
  "head_img2@2x.png",
  "head_img3@2x.png",
  "head_img4@2x.png",
  "head_img5@2x.png",
];

const MainHeroCarousel = () => {
  return (
    <section className="relative w-full h-screen min-h-[800px] flex flex-col items-center justify-center text-center text-[#010D3D] overflow-hidden bg-[#FFFFFF]">

      {/* Fondo decorativo izquierdo */}
      <div
        className="absolute inset-0 z-0 bg-no-repeat bg-left bg-[length:25%] top-[-200px]"
        style={{ backgroundImage: "url(/main/hielo1.png)" }}
      />

      {/* Fondo decorativo derecho */}
      <div
        className="absolute inset-0 z-0 bg-no-repeat bg-right bg-[length:25%] top-[200px]"
        style={{ backgroundImage: "url(/main/hielo1.png)" }}
      />

      {/* Texto y CTA */}
      <div className="relative z-10 mt-[-300px] px-4 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-black">Digitalización sin límites</h1>
        <p className="text-lg mt-2">
          Navegamos contigo hacia una evolución tecnológica accesible, segura y sin barreras.
        </p>
        <p className="mt-6 font-bold">Descubre cómo podemos ayudar a tu empresa</p>
        <button className="mt-4 bg-gradient-to-r from-[#00b2e3] to-[#cca1dd] shadow-md text-white text-lg px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition">
          Solicita un diagnóstico gratuito
        </button>
      </div>
      

      {/* Composición de imágenes con fadeIn desde abajo */}
      <div className="absolute bottom-0 w-full flex justify-center items-end gap-4 z-20 px-4">
        {heroImages.map((img, index) => (
          <img
            key={img}
            src={`/main/${img}`}
            alt={`Hero ${index + 1}`}
            className="w-[150px] md:w-[180px] lg:w-[220px] opacity-0 animate-fadeInUp"
            style={{ animationDelay: `${index * 0.3}s`, animationFillMode: 'forwards' }}
          />
        ))}
      </div>
    </section>
  );
};

export default MainHeroCarousel;
