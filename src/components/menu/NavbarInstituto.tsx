"use client";

import Link from "next/link";
import { useEffect, useState, FormEvent, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import API_ENDPOINTS from "@/config/api";
import ConsultoriaDropdownInstituto from "./ConsultoriaDropdownInstituto";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import { Consultoria } from "@/types/consultoria";
import Formulario from "../Formulario";
import Image from "next/image";
import SobreNosotrosDropdownInstituto from "./SobreNosotrosDropdownInstituto";


type NavbarInstitutoProps = {
    isChatHidden?: boolean;
    onShowChat?: () => void;
};

const NavbarInstituto = ({ isChatHidden, onShowChat }: NavbarInstitutoProps) => {
    const [isConsultoriaOpen, setIsConsultoriaOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isMobileConsultoriaOpen, setIsMobileConsultoriaOpen] = useState(false);
    const [mobileConsultorias, setMobileConsultorias] = useState<Consultoria[]>([]);
    const [openModalContacto, setOpenModalContacto] = useState(false);
    const [isMobileSobreNosotrosOpen, setIsMobileSobreNosotrosOpen] = useState(false);
    const [isSobreNosotrosOpen, setIsSobreNosotrosOpen] = useState(false);
    const setAllDropdownsToFalse = () => {
        setIsConsultoriaOpen(false);
        setIsSobreNosotrosOpen(false);
    };




    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [isMobileMenuOpen]);


    return (
        <>

            {/* NavbarInstituto */}
            <nav className="relative bg-[#010D3D] sticky top-0 left-0 right-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-24 items-center">
                        <div className="flex items-center">
                            <Link href="/">
                                <Image src="/iconoInstituto.svg" alt="Instituto de Innovación Ciencia y Empresa" width={120} height={30} className="object-contain" />
                            </Link>
                        </div>
                        <div className="hidden md:flex space-x-6 items-center">
                            <div className="relative" onMouseEnter={() => { setAllDropdownsToFalse(); setIsConsultoriaOpen(true); }}>
                                <button className="text-white text-[16px] hover:text-[#00b2e3]">Consultoría <FontAwesomeIcon icon={faChevronDown} className="text-[14px]" /></button>
                                {isConsultoriaOpen && (
                                    <div onMouseLeave={() => setIsConsultoriaOpen(false)} className="absolute top-full left-1/2 -translate-x-1/2">
                                        <ConsultoriaDropdownInstituto />
                                    </div>
                                )}
                            </div>
                            
                            <Link href="/instituto/tecnologia" className="text-white text-[16px] hover:text-[#00b2e3]">Tecnología</Link>
                            <Link href="/instituto/formacion" className="text-white text-[16px] hover:text-[#00b2e3]">Formación</Link>
                            <Link
                                href="https://store.normapro.es/historias?ref=instituto"
                                target="_blank" rel="noopener noreferrer"
                                className="text-white text-[16px] hover:text-[#00b2e3]"
                            >
                                Historias con clientes
                            </Link>

                            <div className="relative" onMouseEnter={() => { setAllDropdownsToFalse(); setIsSobreNosotrosOpen(true); }}>
                                <button className="text-white text-[16px] hover:text-[#00b2e3]">Sobre nosotros <FontAwesomeIcon icon={faChevronDown} className="text-[14px]" /></button>
                                {isSobreNosotrosOpen && (
                                    <div onMouseLeave={() => setIsSobreNosotrosOpen(false)} className="absolute top-full left-1/2 -translate-x-1/2">
                                        <SobreNosotrosDropdownInstituto />
                                    </div>
                                )}
                            </div>

                            <Link
                                href="https://store.normapro.es/partners?ref=instituto"
                                target="_blank" rel="noopener noreferrer"
                                className="text-white text-[16px] hover:text-[#00b2e3]"
                            >
                                Hazte Partner
                            </Link>
                        </div>

                        <Link href="/contacto" className="bg-white text-[#010D3D] font-bold rounded-xl px-6 py-2 hover:bg-white/90 transition-colors">
                            Contacta
                        </Link>

                        <div className="md:hidden flex items-center gap-2">

                            <button onClick={() => setIsMobileMenuOpen((prev) => !prev)} className="p-2 w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-100" aria-label="Abrir menu movil">
                                <FontAwesomeIcon icon={isMobileMenuOpen ? faXmark : faBars} className="text-[#FFFFFF]" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Menú móvil */}
                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="md:hidden border-t border-gray-100 bg-[#010D3D] overflow-y-auto max-h-[calc(100vh-4rem)]">
                            <div className="px-4 py-4 flex flex-col gap-1 text-white">
                                <button onClick={() => setIsMobileConsultoriaOpen((prev) => !prev)} className="w-full py-2 flex items-center justify-between font-semibold">
                                    Consultoría
                                    <FontAwesomeIcon icon={faChevronDown} className={`transition-transform ${isMobileConsultoriaOpen ? "rotate-180" : ""}`} />
                                </button>
                                <AnimatePresence>
                                    {isMobileConsultoriaOpen && (
                                        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
                                            <ConsultoriaDropdownInstituto />
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                                <Link href="/instituto/tecnologia" onClick={() => setIsMobileMenuOpen(false)} className="py-2 font-semibold">Tecnología</Link>
                                <Link href="/instituto/formacion" onClick={() => setIsMobileMenuOpen(false)} className="py-2 font-semibold">Formación</Link>
                                <Link href="/instituto/historias" onClick={() => setIsMobileMenuOpen(false)} className="py-2 font-semibold">Historias con clientes</Link>
                                <button onClick={() => setIsMobileSobreNosotrosOpen((prev) => !prev)} className="w-full py-2 flex items-center justify-between font-semibold">
                                    Sobre nosotros
                                    <FontAwesomeIcon icon={faChevronDown} className={`transition-transform ${isMobileSobreNosotrosOpen ? "rotate-180" : ""}`} />
                                </button>
                                <AnimatePresence>
                                    {isMobileSobreNosotrosOpen && (
                                        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
                                            <SobreNosotrosDropdownInstituto />
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            <Link href="/instituto/partners" onClick={() => setIsMobileMenuOpen(false)} className="py-2 font-semibold">Hazte Partner</Link>
                            <button onClick={() => setOpenModalContacto(true)} className="mt-2 rounded-lg px-4 py-2 text-[#010D3D] bg-white font-bold">
                                Contacta
                            </button>
                        </div>
                        </motion.div>
                    )}
            </AnimatePresence>





            {openModalContacto && <Formulario onClose={() => setOpenModalContacto(false)} />}
        </nav >
        </>
    );
};

export default NavbarInstituto;