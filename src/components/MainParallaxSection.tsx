'use client';
import { Parallax } from 'react-scroll-parallax';

const MainParallaxSection = () => {
  return (
    <section className="relative h-[100vh] flex items-center justify-center overflow-hidden">
      <Parallax speed={-20}>
        <div
          className="absolute top-0 left-0 w-full h-full bg-cover bg-center"
          style={{ backgroundImage: 'url("https://imagenes.20minutos.es/uploads/imagenes/2024/05/15/una-imagen-creada-por-la-herramienta-imagen-3-de-google.jpeg")' }}
        ></div>
      </Parallax>

      <div className="relative z-10 text-white text-center px-4">
        <h2 className="text-4xl font-bold drop-shadow-[0_2px_2px_rgba(0,0,0,0.7)]">
          Descubre el poder de NormaPro
        </h2>
        <p className="mt-4 text-lg drop-shadow-[0_1px_1px_rgba(0,0,0,0.6)]">
          Y cómo puede ayudar a tu empresa
        </p>
      </div>
    </section>
  );
};

export default MainParallaxSection;