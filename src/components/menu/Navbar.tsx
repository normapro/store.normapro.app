"use client";

import Link from "next/link";
import { useEffect, useState, FormEvent, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SolutionsDropdown from "@/components/menu/SolutionsDropdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faC, faCaretDown, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import NormaProAccessButton from "@/components/NormaproAccessButton";
import { faMagnifyingGlass, faSpinner, faXmark } from "@fortawesome/pro-duotone-svg-icons";
import { faMessageSmile } from "@fortawesome/pro-regular-svg-icons";
import AplicacionesDropdown from "./AplicationsDropDown";
import ConsultoriaDropdown from "./ConsultoriaDropdown";
import ModalDescubrir from "./ModalDescubrir";

type NavbarProps = {
  isChatHidden?: boolean;
  onShowChat?: () => void;
}

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
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [activeTab, setActiveTab] = useState("Resultados");


  const fetchResults = useCallback(async (query: string) => {
    if (query.length < 3) {
      setResults([]);
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`); // cambiar ENDPOINT
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error("Error en la búsqueda:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Debounce: Espera a que el usuario deje de escribir para llamar al backend
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchQuery) fetchResults(searchQuery);
    }, 500); // 500ms de espera

    return () => clearTimeout(timer);
  }, [searchQuery, fetchResults]);

  useEffect(() => {
    if (searchQuery.length >= 3 && results.length > 0) {
      setShowResults(true);
    } else if (searchQuery.length === 0) {
      setShowResults(false);
    }
  }, [results, searchQuery]);

  const handleSearchSubmit = (e: FormEvent) => {
    e.preventDefault();
  };


  return (
    <>
      {/* Barra superior */}
      <div className="bg-gradient-to-r from-[#b2e8f7] via-[#ede3f5] to-[#d0f3f0]  relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-2 text-sm text-gray-700">
            Encuentra productos específicos para tu empresa en 60 segundos.{" "}
            <a
              onClick={() => setIsModalOpen(true)}
              className="hover:underline"
            >
              <b>Descubrir →</b>
            </a>
          </div>
        </div>
      </div>

      {/* Navbar */}
      <nav className="relative bg-white sticky top-0 left-0 right-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            {/* Logo */}
            <div className="flex items-center">
              <Link href="/">
                <img src="/logos/NormaPro_Horizontal_Color@2x.png" alt="NormaPro" className="h-10 w-auto" />
              </Link>
            </div>

            {/* Menú principal */}
            <div className="hidden md:flex space-x-6 items-center">
              {/* Soluciones con Submenú */}
              <div
                className="relative"
                onMouseEnter={() => { setAllDropdownsToFalse(); setIsSolutionsOpen(true) }}
              //
              >
                <button className="text-gray-900 text-[16px] hover:text-blue-600">
                  Soluciones <FontAwesomeIcon icon={faChevronDown} className="text-[14px]" />
                </button>
              </div>
              <div
                className="relative"
                onMouseEnter={() => { setAllDropdownsToFalse(); setIsAplicacionesOpen(true) }}
              //
              >
                <button className="text-gray-900 text-[16px] hover:text-blue-600">
                  Aplicaciones <FontAwesomeIcon icon={faChevronDown} className="text-[14px]" />
                </button>
              </div>
              <div
                className="relative"
                onMouseEnter={() => { setAllDropdownsToFalse(); setIsConsultoriaOpen(true) }}
              //
              >
                <button className="text-gray-900 text-[16px] hover:text-blue-600">
                  Consultoría <FontAwesomeIcon icon={faChevronDown} className="text-[14px]" />
                </button>
              </div>


              <Link href="/formacion" className="text-gray-900 hover:text-blue-600">
                Formación
              </Link>
              <Link href="/historias" className="text-gray-900 hover:text-blue-600">
                Historias con Clientes
              </Link>
            </div>

            {/* Botón de chat, de búsqueda e inicio de sesión */}
            <div className="flex items-center space-x-4">
              {isChatHidden && (
                <button
                  onClick={onShowChat}
                  className="p-2 rounded-full hover:bg-gray-200"
                  title="Abrir chatbot"
                >
                  <FontAwesomeIcon icon={faMessageSmile} />
                </button>
              )}
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className={`p-2 w-10 h-10 rounded-full flex items-center justify-center transition-colors ${isSearchOpen ? 'bg-[#eceef5]' : 'hover:bg-gray-100'}`}
              >
                <FontAwesomeIcon icon={faMagnifyingGlass} />
              </button>
              <NormaProAccessButton></NormaProAccessButton>
            </div>
          </div>
        </div>
        <div className="break"></div>

        {/* Barra de busqueda */}
        <AnimatePresence>
          {isSearchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden pb-4"
            >
              <form
                onSubmit={handleSearchSubmit}
                className="max-w-7xl mx-auto relative flex items-center bg-[#eceef5] rounded-xl px-4 h-12"
              >
                <input
                  autoFocus
                  type="text"
                  placeholder="Busca en NormaPro"
                  className="bg-transparent w-full outline-none text-gray-700 font-medium"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    if (e.target.value === "") setShowResults(false);
                  }}
                />

                {searchQuery && (
                  <div className="flex items-center gap-4">
                    {/* Solo mostramos el contador si no está cargando */}
                    {!isLoading && (
                      <span className="text-xs text-gray-400 whitespace-nowrap">
                        {results.length} resultados
                      </span>
                    )}
                    <button
                      type="button"
                      onClick={() => {
                        setSearchQuery("");
                        setResults([]);
                        setShowResults(false);
                      }}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <FontAwesomeIcon icon={faXmark} />
                    </button>
                  </div>
                )}
              </form>
            </motion.div>
          )}
        </AnimatePresence>
        {/* Panel resultados de busqueda */}
        <AnimatePresence>
          {showResults && isSearchOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="absolute left-0 right-0 top-full bg-white border-t border-gray-100 shadow-2xl z-50 min-h-[400px]"
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <div className="flex space-x-8 border-b border-gray-100 mb-8">
                  {["Resultados 3", "Aplicaciones 3", "Soluciones 2", "Formación 7"].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`pb-2 px-1 text-sm font-bold transition-colors relative ${activeTab === tab ? "text-blue-900" : "text-gray-400 hover:text-gray-600"
                        }`}
                    >
                      {tab}
                      {activeTab === tab && (
                        <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-900" />
                      )}
                    </button>
                  ))}
                </div>
                <div className="space-y-8 max-w-4xl">
                  {[1, 2].map((i) => (
                    <div key={i} className="group cursor-pointer">
                      <h4 className="text-[17px] font-bold text-[#020a31] group-hover:text-blue-600 transition-colors mb-2">
                        Lorem ipsum {i === 2 && "dolor sit amet"}
                      </h4>
                      <p className="text-gray-600 leading-relaxed text-[15px]">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus nunc nunc, vehicula quis purus eget, convallis egestas risus. Nunc mattis tempus eleifend.
                      </p>
                    </div>
                  ))}
                </div><div className="mt-16 text-center pb-8">
                  <h3 className="text-xl font-bold text-[#020a31] mb-6">Descubre cómo podemos ayudar a tu empresa</h3>
                  <button className="bg-gradient-to-r from-[#00B2E3] to-[#CCA1DD] text-white px-8 py-3 rounded-xl font-bold hover:opacity-90 transition-opacity">
                    Reserva un diagnóstico gratuito
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {isSolutionsOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute left-0"
              onMouseLeave={() => setIsSolutionsOpen(false)}
            >
              <div className="top-0"><SolutionsDropdown /></div>
            </motion.div>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {isAplicacionesOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute left-0"
              onMouseLeave={() => setIsAplicacionesOpen(false)}
            >
              <div className="top-0"><AplicacionesDropdown /></div>
            </motion.div>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {isConsultoriaOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute left-0"
              onMouseLeave={() => setIsConsultoriaOpen(false)}
            >
              <div className="top-0"><ConsultoriaDropdown /></div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Modal de Descubrir */}
        <ModalDescubrir
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </nav>

    </>
  );
};

export default Navbar;
