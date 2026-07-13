"use client";
import HeroUserCount from "./HeroUserCount";
import { useState } from "react";
import Formulario from "./Formulario";

const heroImages = [
	{ src: "head_img1@2x.png", size: "w-[300px] md:w-[350px] lg:w-[500px] xl:w-[700px]", z: "z-[10]", offsetY: "translate-y-[20px]", fadeInOrder: 3 },
	{ src: "head_img2@2x.png", size: "w-[400px] md:w-[450px] lg:w-[600px] xl:w-[720px]", z: "z-[20]", offsetY: "translate-y-[10px]", fadeInOrder: 2 },
	{ src: "head_img3@2x.png", size: "w-[550px] md:w-[600px] lg:w-[650px] xl:w-[750px]", z: "z-[30]", offsetY: "translate-y-0", fadeInOrder: 1 },
	{ src: "head_img4@2x.png", size: "w-[400px] md:w-[450px] lg:w-[600px] xl:w-[720px]", z: "z-[20]", offsetY: "translate-y-[10px]", fadeInOrder: 2 },
	{ src: "head_img5@2x.png", size: "w-[300px] md:w-[350px] lg:w-[500px] xl:w-[700px]", z: "z-[10]", offsetY: "translate-y-[20px]", fadeInOrder: 3 },
];

const heroImagesMobile = [
	{ src: "head_mobile1@2x.png", fadeInOrder: 1 },
	{ src: "head_mobile2@2x.png", fadeInOrder: 2 },
	{ src: "head_mobile3@2x.png", fadeInOrder: 3 },
];

const MainHeroCarousel = () => {
	const [openModal, setOpenModal] = useState(false);

	return (
		<section className="relative w-full md:h-screen md:min-h-[800px] flex flex-col items-center text-center text-[#010D3D] overflow-hidden bg-[#FFFFFF] pt-12 pb-8 md:pt-0 md:pb-0 md:justify-center">

			{/* Fondo decorativo izquierdo — Desktop */}
			<div
				className="hidden md:block absolute inset-0 z-0 bg-no-repeat bg-left bg-[length:25%] top-[-200px]"
				style={{ backgroundImage: "url(/main/hielo1.png)" }}
			/>
			{/* Fondo decorativo derecho — Desktop */}
			<div
				className="hidden md:block absolute inset-0 z-0 bg-no-repeat bg-right bg-[length:25%] top-[200px]"
				style={{ backgroundImage: "url(/main/hielo1.png)" }}
			/>

			{/* Fondo decorativo izquierdo — Móvil */}
			<div
				className="block md:hidden absolute top-0 -left-20 w-full h-[200px] z-0 bg-no-repeat bg-left bg-[length:45%]"
				style={{ backgroundImage: "url(/main/hielo1.png)" }}
			/>
			{/* Fondo decorativo derecho — Móvil */}
			<div
				className="block md:hidden absolute top-[100px] left-20 w-full h-[200px] z-0 bg-no-repeat bg-right bg-[length:45%]"
				style={{ backgroundImage: "url(/main/hielo1.png)" }}
			/>

			{/* Texto y CTA */}
			<div className="relative z-10 px-4 max-w-4xl md:mt-[-300px]">
				<h1 className="text-3xl md:text-5xl font-black">Digitalización sin límites</h1>
				<p className="text-base md:text-lg mt-2">
					Navegamos contigo hacia una evolución tecnológica accesible, segura y sin barreras.
				</p>
				<p className="mt-6 font-bold text-sm md:text-base">Descubre cómo podemos ayudar a tu empresa</p>
				<button
					onClick={() => setOpenModal(true)}
					className="mt-4 bg-gradient-to-r from-[#00b2e3] to-[#cca1dd] shadow-md text-white text-base md:text-lg px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition"
				>
					Solicita un diagnóstico gratuito
				</button>
			</div>

			{/* Composición de imágenes — Desktop */}
			<div className="hidden md:flex absolute bottom-20 w-full justify-center items-end gap-4 z-20 px-4">
				{heroImages.map((img, i) => (
					<img
						key={img.src}
						src={`/main/${img.src}`}
						alt={`Hero ${i + 1}`}
						className={`${img.size} ${img.z} ${img.offsetY} fade-in-up mx-[-280]`}
						style={{ animationDelay: `${img.fadeInOrder * 0.2}s` }}
					/>
				))}
				<div className="absolute w-full h-[50px] bottom-[-20px] bg-[#FFFFFF] z-40">
					<HeroUserCount />
				</div>
			</div>

			{/* Composición de imágenes — Móvil */}
			<div className="flex md:hidden relative w-full flex-col items-center z-20 px-4 mt-10 overflow-visible">
				<div className="relative w-full max-w-[340px] flex flex-col overflow-visible">
					{heroImagesMobile.map((img, i) => {
						const marginLeft = i === 0 ? '10px' : i === 1 ? '0px' : '-10px';
						return (
							<img
								key={img.src}
								src={`/main/${img.src}`}
								alt={`Hero móvil ${i + 1}`}
								className="w-full fade-in-up shadow-lg"
								style={{
									animationDelay: `${img.fadeInOrder * 0.2}s`,
									marginTop: i === 0 ? '0' : '-110px',
									marginLeft: marginLeft,
									zIndex: i + 1,
									position: 'relative',
								}}
							/>
						);
					})}
				</div>
				<div className="relative w-full h-[50px] bg-[#FFFFFF] z-40 mt-6">
					<HeroUserCount />
				</div>
			</div>

			{/* Formulario contacto */}
			{openModal && (
				<Formulario onClose={() => setOpenModal(false)} />
			)}
		</section>
	);
};

export default MainHeroCarousel;