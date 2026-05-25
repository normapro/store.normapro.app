"use client";

import Link from "next/link";
import { useEffect, useState, FormEvent, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SolutionsDropdown from "@/components/menu/SolutionsDropdown";
import API_ENDPOINTS from "@/config/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faBars } from "@fortawesome/free-solid-svg-icons";
import NormaProAccessButton from "@/components/NormaproAccessButton";
import { faMagnifyingGlass, faXmark } from "@fortawesome/pro-duotone-svg-icons";
import { faMessageSmile } from "@fortawesome/pro-regular-svg-icons";
import AplicacionesDropdown from "./AplicationsDropDown";
import ConsultoriaDropdown from "./ConsultoriaDropdown";
import ModalDescubrir from "./ModalDescubrir";
import { Aplicacion } from "@/types/aplicacion";
import { Consultoria } from "@/types/consultoria";
import Formulario from "../Formulario";

type NavbarProps = {
  isChatHidden?: boolean;
  onShowChat?: () => void;
};

const Navbar = ({ isChatHidden, onShowChat }: NavbarProps) => {
  const [isSolutionsOpen, setIsSolutionsOpen] = useState(false);
  const [isAplicacionesOpen, setIsAplicacionesOpen] = useState(false);
  const [isConsultoriaOpen, setIsConsultoriaOpen] = useState(false);
  const setAllDropdownsToFalse = () => {
    setIsSolutionsOpen(false);
    setIsAplicacionesOpen(false);
    setIsConsultoriaOpen(false);
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileSolutionsOpen, setIsMobileSolutionsOpen] = useState(false);
  const [isMobileAppsOpen, setIsMobileAppsOpen] = useState(false);
  const [isMobileConsultoriaOpen, setIsMobileConsultoriaOpen] = useState(false);
  const [mobileApps, setMobileApps] = useState<Aplicacion[]>([]);
  const [mobileConsultorias, setMobileConsultorias] = useState<Consultoria[]>([]);
  const [isMobileMenuLoading, setIsMobileMenuLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [activeTab, setActiveTab] = useState("Resultados");
  const [openModalContacto, setOpenModalContacto] = useState(false);

  const fetchResults = useCallback(async (query: string) => {
    if (query.length < 3) { setResults([]); return; }
    setIsLoading(true);
    try {
      const response = await fetch(`${API_ENDPOINTS.GLOBALSEARCH}?q=${encodeURIComponent(query)}`);
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error("Error en la búsqueda:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => { if (searchQuery) fetchResults(searchQuery); }, 500);
    return () => clearTimeout(timer);
  }, [searchQuery, fetchResults]);

  const groupedResults = results.reduce((acc: any, item: any) => {
    const cat = item.category;
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(item);
    return acc;
  }, {});
  const tabOrder = ["Resultados", "Aplicaciones", "Soluciones"];

  useEffect(() => {
    if (searchQuery.length >= 3 && results.length > 0) setShowResults(true);
    else if (searchQuery.length === 0) setShowResults(false);
  }, [results, searchQuery]);

  useEffect(() => {
    const fetchMobileMenuData = async () => {
      if (!isMobileMenuOpen || (mobileApps.length > 0 && mobileConsultorias.length > 0)) return;
      setIsMobileMenuLoading(true);
      try {
        const [appsRes, consultoriasRes] = await Promise.all([
          fetch(API_ENDPOINTS.APLICACIONES),
          fetch(API_ENDPOINTS.CONSULTORIA),
        ]);

        const appsData = appsRes.ok ? await appsRes.json() : [];
        const consultoriasData = consultoriasRes.ok ? await consultoriasRes.json() : [];

        setMobileApps(Array.isArray(appsData) ? appsData : []);
        setMobileConsultorias(Array.isArray(consultoriasData) ? consultoriasData : []);
      } catch (error) {
        console.error("Error al cargar menu movil:", error);
        setMobileApps([]);
        setMobileConsultorias([]);
      } finally {
        setIsMobileMenuLoading(false);
      }
    };
    fetchMobileMenuData();
  }, [isMobileMenuOpen, mobileApps.length, mobileConsultorias.length]);

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

  const handleSearchSubmit = (e: FormEvent) => { e.preventDefault(); };

  return (
    <>
      {/* Barra superior */}
      <div className="bg-gradient-to-r from-[#b2e8f7] via-[#ede3f5] to-[#d0f3f0] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-2 text-sm text-gray-700">
            Encuentra productos específicos para tu empresa en 60 segundos.{" "}
            <a onClick={() => setIsModalOpen(true)} className="hover:underline"><b>Descubrir →</b></a>
          </div>
        </div>
      </div>

      {/* Navbar */}
      <nav className="relative bg-white sticky top-0 left-0 right-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <Link href="/"><img src="/logos/NormaPro_Horizontal_Color@2x.png" alt="NormaPro" className="h-10 w-auto" /></Link>
            </div>
            <div className="hidden md:flex space-x-6 items-center">
              <div className="relative" onMouseEnter={() => { setAllDropdownsToFalse(); setIsSolutionsOpen(true); }}>
                <button className="text-[#010d3d] text-[16px] hover:text-blue-600">Soluciones <FontAwesomeIcon icon={faChevronDown} className="text-[14px]" /></button>
              </div>
              <div className="relative" onMouseEnter={() => { setAllDropdownsToFalse(); setIsAplicacionesOpen(true); }}>
                <button className="text-[#010d3d] text-[16px] hover:text-blue-600">Aplicaciones <FontAwesomeIcon icon={faChevronDown} className="text-[14px]" /></button>
              </div>
              <div className="relative" onMouseEnter={() => { setAllDropdownsToFalse(); setIsConsultoriaOpen(true); }}>
                <button className="text-[#010d3d] text-[16px] hover:text-blue-600">Consultoría <FontAwesomeIcon icon={faChevronDown} className="text-[14px]" /></button>
              </div>
              <Link href="/formacion" className="text-[#010d3d] hover:text-blue-600">Formación</Link>
              <Link href="/historias" className="text-[#010d3d] hover:text-blue-600">Historias con Clientes</Link>
            </div>

            <div className="hidden md:flex items-center space-x-4">
              {isChatHidden && (
                <button onClick={onShowChat} className="p-2 rounded-full hover:bg-gray-200" title="Abrir chatbot">
                  <FontAwesomeIcon icon={faMessageSmile} />
                </button>
              )}
              <button onClick={() => setIsSearchOpen(!isSearchOpen)} className={`p-2 w-10 h-10 rounded-full flex items-center justify-center transition-colors ${isSearchOpen ? "bg-[#eceef5]" : "hover:bg-gray-100"}`}>
                <FontAwesomeIcon icon={faMagnifyingGlass} />
              </button>
              <NormaProAccessButton />
            </div>

            <div className="md:hidden flex items-center gap-2">
              <button onClick={() => { setIsSearchOpen((prev) => !prev); setIsMobileMenuOpen(false); }} className={`p-2 w-10 h-10 rounded-full flex items-center justify-center transition-colors ${isSearchOpen ? "bg-[#eceef5]" : "hover:bg-gray-100"}`} aria-label="Abrir buscador">
                <FontAwesomeIcon icon={faMagnifyingGlass} className="text-[#010d3d]" />
              </button>
              <button onClick={() => setIsMobileMenuOpen((prev) => !prev)} className="p-2 w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-100" aria-label="Abrir menu movil">
                <FontAwesomeIcon icon={isMobileMenuOpen ? faXmark : faBars} className="text-[#010d3d]" />
              </button>
            </div>
          </div>
        </div>
        <div className="break" />

        {/* Menú móvil */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="md:hidden border-t border-gray-100 bg-white overflow-y-auto max-h-[calc(100vh-4rem)]">
              <div className="px-4 py-4 flex flex-col gap-1 text-[#010d3d]">

                {/* Soluciones */}
                <button onClick={() => { setIsMobileSolutionsOpen((prev) => !prev); setIsMobileAppsOpen(false); setIsMobileConsultoriaOpen(false); }} className="w-full py-2 flex items-center justify-between font-semibold">
                  Soluciones
                  <FontAwesomeIcon icon={faChevronDown} className={`transition-transform ${isMobileSolutionsOpen ? "rotate-180" : ""}`} />
                </button>
                <AnimatePresence>
                  {isMobileSolutionsOpen && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}>
                      <SolutionsDropdown mobile onNavigate={() => setIsMobileMenuOpen(false)} />
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Aplicaciones */}
                <button onClick={() => { setIsMobileAppsOpen((prev) => !prev); setIsMobileSolutionsOpen(false); setIsMobileConsultoriaOpen(false); }} className="w-full py-2 flex items-center justify-between font-semibold">
                  Aplicaciones
                  <FontAwesomeIcon icon={faChevronDown} className={`transition-transform ${isMobileAppsOpen ? "rotate-180" : ""}`} />
                </button>
                <AnimatePresence>
                  {isMobileAppsOpen && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
                      <div className="pl-3 pb-2 flex flex-col gap-2 text-sm">
                        {isMobileMenuLoading ? <span className="py-1 text-gray-500">Cargando...</span> : mobileApps.map((app) => (
                          <Link key={app.id_app} href={`/aplicaciones/${app.slug}`} onClick={() => setIsMobileMenuOpen(false)} className="py-1">{app.description}</Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Consultoría */}
                <button onClick={() => { setIsMobileConsultoriaOpen((prev) => !prev); setIsMobileSolutionsOpen(false); setIsMobileAppsOpen(false); }} className="w-full py-2 flex items-center justify-between font-semibold">
                  Consultoría
                  <FontAwesomeIcon icon={faChevronDown} className={`transition-transform ${isMobileConsultoriaOpen ? "rotate-180" : ""}`} />
                </button>
                <AnimatePresence>
                  {isMobileConsultoriaOpen && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
                      <div className="pl-3 pb-2 flex flex-col gap-2 text-sm">
                        {isMobileMenuLoading ? <span className="py-1 text-gray-500">Cargando...</span> : mobileConsultorias.map((consultoria) => (
                          <Link key={consultoria.id_consultoria} href={`/consultorias/${consultoria.slug}`} onClick={() => setIsMobileMenuOpen(false)} className="py-1">{consultoria.description}</Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <Link href="/formacion" onClick={() => setIsMobileMenuOpen(false)} className="py-2 font-semibold">Formación</Link>
                <Link href="/historias" onClick={() => setIsMobileMenuOpen(false)} className="py-2 font-semibold">Historias con Clientes</Link>
                <button onClick={() => { setIsMobileMenuOpen(false); setIsModalOpen(true); }} className="mt-2 rounded-lg px-4 py-2 text-white bg-gradient-to-r from-[#00B2E3] to-[#CCA1DD]">
                  Descubrir
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Barra de búsqueda */}
        <AnimatePresence>
          {isSearchOpen && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden pb-4">
              <form onSubmit={handleSearchSubmit} className="max-w-7xl mx-auto relative flex items-center bg-[#eceef5] rounded-xl px-4 h-12">
                <input autoFocus type="text" placeholder="Busca en NormaPro" className="bg-transparent w-full outline-none text-gray-700 font-medium" value={searchQuery} onChange={(e) => { setSearchQuery(e.target.value); if (e.target.value === "") setShowResults(false); }} />
                {searchQuery && (
                  <div className="flex items-center gap-4">
                    {!isLoading && <span className="text-xs text-gray-400 whitespace-nowrap">{results.length} resultados</span>}
                    <button type="button" onClick={() => { setSearchQuery(""); setResults([]); setShowResults(false); }} className="text-gray-500 hover:text-gray-700"><FontAwesomeIcon icon={faXmark} /></button>
                  </div>
                )}
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Panel resultados */}
        <AnimatePresence>
          {showResults && isSearchOpen && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="absolute left-0 right-0 top-full bg-white shadow-2xl z-50 border-t border-gray-100 overflow-y-auto max-h-[85vh]">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex space-x-8 border-b border-gray-100 mb-8">
                  {tabOrder.map((tab) => {
                    const count = groupedResults[tab]?.length || 0;
                    return (
                      <button key={tab} onClick={() => setActiveTab(tab)} className={`pb-3 text-sm font-bold transition-all relative ${activeTab === tab ? "text-[#020a31]" : "text-gray-400 hover:text-gray-600"}`}>
                        {tab} {count}
                        {activeTab === tab && <motion.div layoutId="underline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#020a31]" />}
                      </button>
                    );
                  })}
                </div>
                <div className="space-y-10 max-w-4xl min-h-[200px]">
                  {groupedResults[activeTab]?.length > 0 ? groupedResults[activeTab].map((item: any, idx: number) => (
                    <Link key={idx} href={`/${item.slug}`} className="group block" onClick={() => setIsSearchOpen(!isSearchOpen)}>
                      <h4 className="text-[18px] font-bold text-[#020a31] group-hover:text-blue-600 transition-colors mb-1">{item.name}</h4>
                      <p className="text-gray-600 leading-relaxed text-[15px]">{item.description || "Haz clic para ver los detalles de este recurso."}</p>
                    </Link>
                  )) : <div className="text-gray-400 py-10">No hay resultados en esta categoría.</div>}
                </div>
                <div className="mt-20 text-center border-t border-gray-50 pt-12 pb-6">
                  <h3 className="text-xl font-bold text-[#020a31] mb-6">Descubre cómo podemos ayudar a tu empresa</h3>
                  <button className="bg-gradient-to-r from-[#00B2E3] to-[#CCA1DD] text-white px-10 py-3.5 rounded-xl font-bold hover:scale-105 transition-transform shadow-lg" onClick={() => setOpenModalContacto(true)}>
                    Reserva un diagnóstico gratuito
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Dropdowns desktop */}
        <AnimatePresence>
          {isSolutionsOpen && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="absolute left-0" onMouseLeave={() => setIsSolutionsOpen(false)}>
              <div className="top-0"><SolutionsDropdown /></div>
            </motion.div>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {isAplicacionesOpen && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="absolute left-0" onMouseLeave={() => setIsAplicacionesOpen(false)}>
              <div className="top-0"><AplicacionesDropdown /></div>
            </motion.div>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {isConsultoriaOpen && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="absolute left-0" onMouseLeave={() => setIsConsultoriaOpen(false)}>
              <div className="top-0"><ConsultoriaDropdown /></div>
            </motion.div>
          )}
        </AnimatePresence>

        <ModalDescubrir isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        {openModalContacto && <Formulario onClose={() => setOpenModalContacto(false)} />}
      </nav>
    </>
  );
};

export default Navbar;