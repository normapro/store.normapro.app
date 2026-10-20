"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/menu/Navbar";
import ChatFloatingButton from "./ChatFloatingButton";
import ChatWindow from "./ChatWindow";
import Formulario from "./Formulario";

const CHAT_OPEN_KEY = "normapro_chatbot_is_open";

export default function ChatManager({ children }: { children: React.ReactNode }) {
  const [isChatVisible, setIsChatVisible] = useState(true);
  const [isWindowOpen, setIsWindowOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  useEffect(() => {
    try {
      if (sessionStorage.getItem(CHAT_OPEN_KEY) === "true") {
        setIsWindowOpen(true);
      }
    } catch {
      // Ignorar si sessionStorage no está disponible
    }
  }, []);

  const handleOpenChat = () => {
    setIsChatVisible(true);
    setIsWindowOpen(true);
    try {
      sessionStorage.setItem(CHAT_OPEN_KEY, "true");
    } catch {
      // Ignorar
    }
  };

  const handleCloseChat = () => {
    setIsWindowOpen(false);
    try {
      sessionStorage.removeItem(CHAT_OPEN_KEY);
    } catch {
      // Ignorar
    }
  };

  return (
    <>
      <Navbar 
        isChatHidden={!isChatVisible} 
        onShowChat={handleOpenChat} 
      />
      
      {children}

      {/* Si la ventana está abierta, ocultamos el botón flotante y mostramos la ventana */}
      {isWindowOpen ? (
        <ChatWindow 
          isOpen={isWindowOpen} 
          onClose={handleCloseChat} 
          onOpenContact={() => setIsContactModalOpen(true)}
        />
      ) : (
        <ChatFloatingButton 
          isOpen={isChatVisible} 
          onClose={() => setIsChatVisible(false)} 
          onClick={handleOpenChat} 
        />
      )}

      {/* Modal de contacto abierto desde el chatbot */}
      {isContactModalOpen && (
        <Formulario 
          onClose={() => setIsContactModalOpen(false)} 
          zIndexClass="z-[120]"
        />
      )}
    </>
  );
}