"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SolutionsDropdown from "./SolutionsDropdown";

const Navbar = () => {
  const [isSolutionsOpen, setIsSolutionsOpen] = useState(false);

  return (
    <>
      {/* Barra superior */}
      <div className="bg-gradient-to-r from-[#b2e8f7] via-[#ede3f5] to-[#d0f3f0] shadow-md relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-2 text-sm text-gray-700">
            Encuentra productos específicos para tu empresa en 60 segundos.{" "}
            <b>Descubrir →</b>
          </div>
        </div>
      </div>

      {/* Navbar */}
      <nav className="relative bg-white shadow-md">
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
                onMouseEnter={() => setIsSolutionsOpen(true)}
                //
              >
                <button className="text-gray-900 hover:text-blue-600">
                  Soluciones ▼
                </button>                
              </div>

              <Link href="/aplicaciones" className="text-gray-900 hover:text-blue-600">
                Aplicaciones
              </Link>
              <Link href="/consultoria" className="text-gray-900 hover:text-blue-600">
                Consultoría
              </Link>
              <Link href="/formacion" className="text-gray-900 hover:text-blue-600">
                Formación
              </Link>
              <Link href="/historias" className="text-gray-900 hover:text-blue-600">
                Historias con Clientes
              </Link>
            </div>

            {/* Botón de búsqueda e inicio de sesión */}
            <div className="flex items-center space-x-4">
              <button className="p-2 rounded-full hover:bg-gray-200">🔍</button>
              <Link href="/login">
                <button className="bg-blue-700 text-white px-4 py-2 rounded-lg hover:bg-blue-800">
                  Entrar
                </button>
              </Link>
            </div>
          </div>
        </div>
      </nav>
      <AnimatePresence>
        {isSolutionsOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute left-0"
            onMouseLeave={() => setIsSolutionsOpen(false)}
          >
            <SolutionsDropdown  />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
