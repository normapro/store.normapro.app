"use client";

import Image from "next/image";

const images = [
 
  "/main/main@2x.png"
];

const MainHeroCarousel = () => {
  return (
    <section
      className="relative w-full h-[85vh] mh-[800px]  flex flex-col items-center justify-center text-center text-[#010D3D] overflow-hidden"
      
    >

      <div className="absolute w-[100%] h-[100%] top-[-200px] left-0 bg-no-repeat z-0 bg-left bg-[length:25%]"
           style={{ backgroundImage: "url(/main/hielo1.png)" }}
      > </div>
      <div className="absolute w-[100%] h-[100%] top-[200px] right-0 bg-no-repeat z-0 bg-right bt-bottom bg-[length:25%]"
           style={{ backgroundImage: "url(/main/hielo1.png)" }}
      > </div>

      {/* Contenedor del texto y CTA */}
      <div className="relative z-10 mt-[-300px]">
        <h1 className="text-5xl font-black">Digitalización sin límites</h1>
        <p className="text-lg mt-2">
          Navegamos contigo hacia una evolución tecnológica accesible, segura y sin barreras.
        </p>
        <p className="mt-6 font-bold">Descubre cómo podemos ayudar a tu empresa</p>
        <button className="mt-4 bg-gradient-to-r from-[#00b2e3] to-[#cca1dd] shadow-md text-white text-lg px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition">
          Solicita un diagnóstico gratuito
        </button>
      </div>

      {/* Contenedor de imágenes estáticas en la misma disposición del diseño */}
      <div className="absolute bottom-[-10%] w-[80%]">
        <div className="relative ">
          <img src="/main/main@2x.png" className="w-[100%]"></img>
        </div>
      </div>
    </section>
  );
};

export default MainHeroCarousel;
