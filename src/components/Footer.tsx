"use client";
import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin, faYoutube } from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
	return (
		<footer className="mt-20 font-[Mulish]">
			{/* Bloque azul */}
			<div className="bg-[#010D3D] text-white">
				<div className="max-w-7xl mx-auto px-6 py-8">
					{/* Newsletter + RRSS */}
					<div className="flex flex-col md:flex-row justify-between items-center border-b border-white/20 pb-8 gap-6">
						<div className="w-full md:w-2/3">

							<div className="flex">
								<label className="text-base block mb-1 w-[400px] justify-center item-center py-2">Mantente informado</label>
								<input
									type="email"
									placeholder="Escribe tu email"
									className="px-4 rounded-l-md w-full text-black placeholder:text-gray-500 text-[15px] bg-white h-[40px]"
								/>
								<button className="bg-gradient-to-r from-[#00b2e3] to-[#cca1dd] px-4 py-2 rounded-r-md text-white text-15px font-extrabold h-[40px] w-[600px] ">
									Suscribirme a la newsletter
								</button>
							</div>
						</div>
						<div className="flex items-center gap-8 text-base">
							<span>Síguenos en</span>
							<Link href="https://www.linkedin.com/company/normapro" target="_blank">
								<FontAwesomeIcon icon={faLinkedin} className="text-[30px]" />
							</Link>
							<Link href="https://www.youtube.com/@normapro" target="_blank">
								<FontAwesomeIcon icon={faYoutube} className="text-[30px]" />
							</Link>
						</div>
					</div>

					{/* Navegación y logos */}
					<div className="grid grid-cols-12 gap-6 py-10">
						{/* Logo Pingüino */}
						<div className="col-span-12 md:col-span-2 flex justify-start items-end">
							<Image
								src="/iconopinguino@2x.png"
								alt="Logo NormaPro"
								width={80}
								height={80}
								className="rounded-xl"
							/>
						</div>

						{/* Menú navegación */}
						<div className="col-span-12 md:col-span-6 grid grid-cols-2 gap-50 text-base font-extrabold">
							<div className="space-y-5">
								<Link href="/soluciones">Soluciones</Link><br />
								<Link href="/formacion">Formación</Link><br />
								<Link href="/historias">Historias con clientes</Link><br />
								<Link href="/actualidad">Actualidad</Link><br />
								<Link href="/informes">Informes</Link><br />
							</div>
							<div className="space-y-5">
								<Link href="/nosotros">Quiénes somos</Link><br />
								<Link href="/partners">Programa de Partners</Link><br />
								<Link href="/trabaja">Trabaja en NormaPro</Link><br />
								<Link href="/politicas">Políticas</Link><br />
								<Link href="/contacto">Contacto</Link><br />
							</div>
						</div>

						{/* Logo Instituto */}
						<div className="col-span-12 md:col-span-4 flex justify-end items-end">
							<Image
								src="/footer/iconoInstituto.svg"
								alt="Instituto de Innovación Ciencia y Empresa"
								width={160}
								height={80}
							/>
						</div>
					</div>
				</div>
			</div>

			{/* Bloque blanco */}
			<div className="bg-white text-[#171717] text-sm">
				<div className="max-w-7xl mx-auto px-6 py-8">
					{/* Certificaciones + miembros */}
					<div className="flex flex-wrap justify-between items-center gap-6 mx-17">
						{/* Certificaciones */}
						<div className="flex flex-wrap items-center gap-15">
							{[
								"Grupo 4494@2x.png",
								"Grupo 4506@2x.png",
								"Grupo 4502@2x.png",
								"Grupo 4498@2x.png"
							].map((img, i) => (
								<Image
									key={i}
									src={`/footer/${img}`}
									alt={`Certificación ${i}`}
									width={104}
									height={87}
								/>
							))}
						</div>

						{/* Separador vertical */}
						<div className="hidden md:block w-[2px] h-[95px] bg-gray-300" />

						{/* Miembros de */}
						<div className="flex flex-col items-start">
							<span className="font-extralight text-[11px] text-gray-600 ">Somos miembros de</span><br />
							<div className="flex items-center gap-10">

								<Image
									src="/footer/Grupo 4492@2x.png"
									alt="ASCOM"
									width={128}
									height={47}
								/>
								<Image
									src="/footer/Grupo 4490@2x.png"
									alt="AEC"
									width={128}
									height={47}
								/>
							</div>
						</div>
					</div>

					{/* Texto legal */}
					<div className="mt-6 flex flex-row text-center justify-between text-xs text-gray-500">
						<p>
							NormaPro® es una marca registrada por Instituto de Innovación, Ciencia y Empresa
						</p>
						<p className="grid grid-cols-3 gap-10">
							<Link href="https://normapro.es/aviso-legal/" className="hover:underline">Aviso Legal</Link>
							<Link href="https://normapro.es/politica-de-privacidad/" className="hover:underline">Política de privacidad</Link>
							<Link href="https://normapro.es/politica-de-cookies-ue/" className="hover:underline">Política de cookies</Link>
						</p>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
