"use client";
import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin, faYoutube } from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
	return (
		<footer className="mt-20">
			{/* Bloque azul */}
			<div className="bg-[#010D3D] text-white">
				<div className="max-w-7xl mx-auto px-6 py-8">
					{/* Newsletter + RRSS */}
					<div className="flex flex-col md:flex-row justify-between items-center border-b border-white/20 pb-8 gap-6">
						<div className="w-full md:w-2/3">

							<div className="flex">
								<label className="text-sm block mb-1 w-[300px] justify-center item-center py-2">Mantente informado</label>
								<input
									type="email"
									placeholder="Escribe tu email"
									className="px-4 rounded-l-md w-full text-black placeholder:text-gray-500 text-sm bg-white h-[40px]"
								/>
								<button className="bg-gradient-to-r from-[#00b2e3] to-[#cca1dd] px-4 py-2 rounded-r-md text-white text-sm font-semibold h-[40px] w-[400px] ">
									Suscribirme a la newsletter
								</button>
							</div>
						</div>
						<div className="flex items-center gap-4 text-sm">
							<span>Síguenos en</span>
							<Link href="https://www.linkedin.com/company/normapro" target="_blank">
								<FontAwesomeIcon icon={faLinkedin} className="w-5 h-5" />
							</Link>
							<Link href="https://www.youtube.com/@normapro" target="_blank">
								<FontAwesomeIcon icon={faYoutube} className="w-5 h-5" />
							</Link>
						</div>
					</div>

					{/* Navegación y logos */}
					<div className="grid grid-cols-12 gap-6 py-10">
						{/* Logo Pingüino */}
						<div className="col-span-12 md:col-span-2">
							<Image
								src="/iconopinguino@2x.png"
								alt="Logo NormaPro"
								width={64}
								height={64}
								className="rounded-xl"
							/>
						</div>

						{/* Menú navegación */}
						<div className="col-span-12 md:col-span-6 grid grid-cols-2 gap-6 text-sm font-semibold">
							<div className="space-y-1">
								<Link href="/soluciones">Soluciones</Link><br />
								<Link href="/formacion">Formación</Link><br />
								<Link href="/historias">Historias con clientes</Link><br />
								<Link href="/actualidad">Actualidad</Link><br />
								<Link href="/informes">Informes</Link><br />
							</div>
							<div className="space-y-1">
								<Link href="/nosotros">Quiénes somos</Link><br />
								<Link href="/partners">Programa de Partners</Link><br />
								<Link href="/trabaja">Trabaja en NormaPro</Link><br />
								<Link href="/politicas">Políticas</Link><br />
								<Link href="/contacto">Contacto</Link><br />
							</div>
						</div>

						{/* Logo Instituto */}
						<div className="col-span-12 md:col-span-4 flex justify-end">
							<Image
								src="/footer/iconoInstituto.svg"
								alt="Instituto de Innovación Ciencia y Empresa"
								width={180}
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
					<div className="flex flex-wrap justify-between items-center gap-6">
						{/* Certificaciones */}
						<div className="flex flex-wrap items-center gap-6">
							{[
								"Grupo 4494@2x.png",
								"Grupo 4506@2x.png",
								"Grupo 4502@2x.png",
							].map((img, i) => (
								<Image
									key={i}
									src={`/footer/${img}`}
									alt={`Certificación ${i}`}
									width={150}
									height={150}
								/>
							))}
						</div>

						{/* Separador vertical */}
						<div className="hidden md:block w-[1px] h-10 bg-gray-300" />

						{/* Miembros de */}
						<div className="flex flex-col items-center">
							<span className="text-xs text-gray-600 ">Somos miembros de</span><br />
							<div className="flex items-center gap-4">

								<Image
									src="/footer/Grupo 4492@2x.png"
									alt="ASCOM"
									width={150}
									height={150}
								/>
								<Image
									src="/footer/Grupo 4490@2x.png"
									alt="AEC"
									width={150}
									height={150}
								/>
							</div>
						</div>
					</div>

					{/* Texto legal */}
					<div className="mt-6 text-center text-xs text-gray-500 space-y-1">
						<p>
							NormaPro® es una marca registrada por Instituto de Innovación, Ciencia y Empresa
						</p>
						<p className="space-x-4">
							<Link href="/aviso-legal" className="hover:underline">Aviso Legal</Link>
							<Link href="/privacidad" className="hover:underline">Política de privacidad</Link>
							<Link href="/cookies" className="hover:underline">Política de cookies</Link>
						</p>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
