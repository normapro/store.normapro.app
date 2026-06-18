"use client";
import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin, faYoutube } from "@fortawesome/free-brands-svg-icons";
import { useState } from "react";
import Formulario from "@/components/Formulario";
import API_ENDPOINTS from "@/config/api";

const Footer = () => {
    const [openModal, setOpenModal] = useState(false);
    const [newsletterEmail, setNewsletterEmail] = useState("");
    const [isSubmittingNewsletter, setIsSubmittingNewsletter] = useState(false);
    const [newsletterMessage, setNewsletterMessage] = useState<string | null>(null);

    const handleNewsletterSubmit = async () => {
        const email = newsletterEmail.trim();
        setNewsletterMessage(null);

        if (!email) {
            setNewsletterMessage("Introduce un email válido.");
            return;
        }

        setIsSubmittingNewsletter(true);
        try {
            const origen_ruta = `${window.location.pathname}${window.location.search}`;
            const response = await fetch(API_ENDPOINTS.LEADS, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    acepta_marketing: true,
                    origen_ruta,
                }),
            });

            if (!response.ok) {
                const errorBody = await response.json().catch(() => null);
                const apiMessage =
                    typeof errorBody?.error === "string"
                        ? errorBody.error
                        : "No se pudo completar la suscripción";
                throw new Error(apiMessage);
            }

            setNewsletterMessage("Suscripción realizada correctamente.");
            setNewsletterEmail("");
        } catch (error) {
            const message =
                error instanceof Error
                    ? error.message
                    : "No se pudo completar la suscripción. Inténtalo más tarde.";
            setNewsletterMessage(message);
        } finally {
            setIsSubmittingNewsletter(false);
        }
    };

    return (
        <footer className="mt-20 font-[Mulish]">
            {/* Bloque azul */}
            <div className="bg-[#010D3D] text-white">
                <div className="max-w-7xl mx-auto px-6 py-8">
                    {/* Newsletter + RRSS */}
                    <div className="flex flex-col md:flex-row justify-between items-center border-b border-white/20 pb-8 gap-6">
                        <div className="w-full md:w-full">

                            <div className="flex items-center gap-8">
                                <p className="text-base w-[500px] leading-relaxed">
                                    Suscríbete a nuestra newsletter y mantente informado de las
                                    novedades de Instituto de Innovación, Ciencia y Empresa.
                                </p>
                                <div className="flex flex-1">
                                    <input
                                        type="email"
                                        placeholder="Escribe tu email"
                                        value={newsletterEmail}
                                        onChange={(e) => setNewsletterEmail(e.target.value)}
                                        disabled={isSubmittingNewsletter}
                                        className="px-4 rounded-l-md w-full text-black placeholder:text-gray-500 text-[15px] bg-white h-[40px]"
                                    />
                                    <button
                                        type="button"
                                        onClick={handleNewsletterSubmit}
                                        disabled={isSubmittingNewsletter}
                                        className="bg-gradient-to-r from-[#00b2e3] to-[#cca1dd] px-6 py-2 rounded-r-md text-white text-[15px] font-bold h-[40px] whitespace-nowrap disabled:opacity-70"
                                    >
                                        {isSubmittingNewsletter ? "Enviando..." : "Suscribirme a la newsletter"}
                                    </button>
                                </div>
                            </div>
                            {newsletterMessage && (
                                <p className="mt-2 text-sm text-white/90">{newsletterMessage}</p>
                            )}
                        </div>

                    </div>

                    {/* Navegación y logos */}
                    <div className="grid grid-cols-12 gap-6 py-10">
                        {/* Logo Instituto y Siguenos */}
                        <div className="col-span-12 md:col-span-2 flex flex-col justify-start items-start gap-6">
                            <Image
                                src="/institutoLogo.png"
                                alt="Logo Instituto"
                                width={80}
                                height={80}
                                className="rounded-xl"
                            />
                            <div className="flex flex-col mt-auto gap-3">
                                <span className="text-sm">Síguenos en</span>
                                <div className="flex items-center gap-4">
                                    <Link href="https://www.linkedin.com/company/normapro" target="_blank">
                                        <FontAwesomeIcon icon={faLinkedin} className="text-[30px]" />
                                    </Link>
                                    <Link href="https://www.youtube.com/@normapro" target="_blank">
                                        <FontAwesomeIcon icon={faYoutube} className="text-[30px]" />
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {/* Menú navegación */}
                        <div className="col-span-12 md:col-span-10 grid grid-cols-3 gap-10 text-base">
                            {/* Columna 1 */}
                            <div className="flex flex-col gap-8">
                                <div className="flex flex-col gap-2">
                                    <span className="font-normal text-white/60">Consultoría</span>
                                    <Link
                                        href="https://store.normapro.es/consultorias/cumplimiento-normativo?ref=instituto"
                                        target="_blank" rel="noopener noreferrer"
                                        className="font-bold"
                                    >
                                        Cumplimiento normativo técnico
                                    </Link>
                                    <Link
                                        href="https://store.normapro.es/consultorias/cumpliance-penal?ref=instituto"
                                        target="_blank" rel="noopener noreferrer"
                                        className="font-bold"
                                    >
                                        Compliance penal
                                    </Link>
                                    <Link
                                        href="https://store.normapro.es/consultorias/automatizacion-procesos?ref=instituto"
                                        target="_blank" rel="noopener noreferrer"
                                        className="font-bold"
                                    >
                                        Automatización de procesos
                                    </Link>
                                    <Link href="/ingenieria" className="font-bold">Ingeniería y Medioambiente</Link>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <span className="font-normal text-white/60">Sobre Instituto de Innovación Ciencia y Empresa</span>
                                    <Link href="/que-hacemos" className="font-bold">Sobre nosotros</Link>
                                    <Link href="/mision-vision-valores" className="font-bold">Misión, Visión y valores</Link>
                                    <Link href="/equipo" className="font-bold">El equipo</Link>
                                    <Link
                                        href="https://store.normapro.es/politicas?ref=instituto"
                                        target="_blank" rel="noopener noreferrer"
                                        className="font-bold"
                                    >
                                        Política
                                    </Link>
                                </div>
                            </div>

                            {/* Columna 2 */}
                            <div className="flex flex-col gap-8">
                                <div className="flex flex-col gap-2">
                                    <span className="font-normal text-white/60">Tecnología</span>
                                    <Link href="/universe" className="font-bold">NormaPro Universe</Link>
                                    <Link href="/canal-denuncias" className="font-bold">Canal interno de denuncias</Link>
                                    <Link href="/portal-empleado" className="font-bold">Portal del empleado</Link>
                                    <Link href="/formapro" className="font-bold">FormaPro</Link>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <span className="font-normal text-white/60">Sala de prensa</span>
                                    <Link href="/apariciones-prensa" className="font-bold">Apariciones en prensa</Link>
                                    <Link href="/material-prensa" className="font-bold">Material para prensa</Link>
                                </div>
                            </div>

                            {/* Columna 3 */}
                            <div className="flex flex-col gap-8">
                                <div className="flex flex-col gap-2">
                                    <span className="font-normal text-white/60">Formación</span>
                                    <Link href="/academia" className="font-bold">Academia NormaPro</Link>
                                    <Link href="/cursos-normativa" className="font-bold">Cursos sobre Normativa Técnica</Link>
                                    <Link href="/cursos-compliance" className="font-bold">Cursos sobre Compliance Penal</Link>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <span className="font-normal text-white/60">Contacto</span>
                                    <Link href="/contacto" className="font-bold">Contacta con nosotros</Link>
                                    <Link
                                        href="https://store.normapro.es/partners?ref=instituto"
                                        target="_blank" rel="noopener noferrer"
                                        className="font-bold"
                                    >
                                        Hazte Partner NormaPro
                                    </Link>
                                    <Link
                                        href="https://store.normapro.es/trabaja?ref=instituto"
                                        target="_blank" rel="noopener noreferrer"
                                        className="font-bold"
                                    >
                                        Ofertas de trabajo
                                    </Link>
                                </div>
                            </div>
                    </div>

                    
                </div>
            </div>
        </div>

            {/* Bloque blanco */ }
    <div className="bg-white text-[#171717] text-sm">
        <div className="max-w-7xl mx-auto px-6 py-8">
            {/* Certificaciones + miembros */}
            <div className="flex flex-wrap justify-between items-center gap-6 mx-17">
                {/* Certificaciones */}
                <div className="grid grid-cols-2 place-items-center gap-6 md:flex md:flex-wrap md:items-center md:gap-15">
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
                    © Instituto de Innovación y Empresa
                </p>
                <p className="grid grid-cols-3 gap-10">
                    <Link
                        href="https://store.normapro.es/aviso-legal?ref=instituto"
                        className="hover:underline"
                    >
                        Aviso Legal
                    </Link>
                    <Link
                        href="https://store.normapro.es/politica-de.privacidad?ref=instituto"
                        className="hover:underline"
                    >
                        Política de privacidad
                    </Link>
                    <Link
                        href="https://store.normapro.es/politica-de-cookies-ue?ref=instituto"
                        className="hover:underline"
                    >
                        Política de cookies
                    </Link>
                </p>
            </div>
        </div>
    </div>

    {/* Formulario de contacto */ }
    {
        openModal && (
            <Formulario onClose={() => setOpenModal(false)} />
        )
    }

        <div className="h-[15px] bg-gradient-to-r from-[#64d8cc] via-[#cca1dd] to-[#00b2e3] " />
        </footer >
    );
};

export default Footer;
