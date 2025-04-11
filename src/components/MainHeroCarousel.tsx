"use client";

import Image from "next/image";
import HeroUserCount from "./HeroUserCount";

const heroImages = [
	{
	  src: "head_img1@2x.png",
	  size: "w-[300px] md:w-[350px] lg:w-[500px] xl:w-[700px]",
	  z: "z-[10]",
	  offsetY: "translate-y-[20px]",
	  fadeInOrder: 3,
	},
	{
	  src: "head_img2@2x.png",
	  size: "w-[400px] md:w-[450px] lg:w-[600px] xl:w-[720px]",
	  z: "z-[20]",
	  offsetY: "translate-y-[10px]",
	  fadeInOrder: 2,
	},
	{
	  src: "head_img3@2x.png",
	  size: "w-[550px] md:w-[600px] lg:w-[650px] xl:w-[750px]",
	  z: "z-[30]",
	  offsetY: "translate-y-0", // imagen del centro
	  fadeInOrder: 1,
	},
	{
	  src: "head_img4@2x.png",
	  size: "w-[400px] md:w-[450px] lg:w-[600px] xl:w-[720px]",
	  z: "z-[20]",
	  offsetY: "translate-y-[10px]",
	  fadeInOrder: 2,
	},
	{
	  src: "head_img5@2x.png",
	  size: "w-[300px] md:w-[350px] lg:w-[500px] xl:w-[700px]",
	  z: "z-[10]",
	  offsetY: "translate-y-[20px]",
	  fadeInOrder: 3,
	},
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
			<div className="absolute bottom-20 w-full flex justify-center items-end gap-4 z-20 px-4">
				{heroImages.map((img, i) => (
					<img
					key={img.src}
					src={`/main/${img.src}`}
					alt={`Hero ${i + 1}`}
					className={`${img.size} ${img.z} ${img.offsetY} fade-in-up mx-[-280]`}
					style={{
						animationDelay: `${img.fadeInOrder * 0.2}s`,
					}}
					/>
				))}
				<div className="absolute w-full h-[50px] bottom-[-20] bg-[#FFFFFF]  z-40"> 
					<HeroUserCount/>
				</div>
			</div>

		</section>
	);
};

export default MainHeroCarousel;
