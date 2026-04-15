"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SolutionsDropdown from "@/components/menu/SolutionsDropdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faC, faCaretDown, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import NormaProAccessButton from "@/components/NormaproAccessButton";
import { faMagnifyingGlass } from "@fortawesome/pro-duotone-svg-icons";
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
              <button className="p-2 rounded-full hover:bg-gray-200">
                <FontAwesomeIcon icon={faMagnifyingGlass} />
              </button>
              <NormaProAccessButton></NormaProAccessButton>
            </div>
          </div>
        </div>
        <div className="break"></div>
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
