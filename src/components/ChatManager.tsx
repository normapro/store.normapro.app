"use client";

import { useState } from "react";
import Navbar from "@/components/menu/Navbar";
import ChatFloatingButton from "./ChatFloatingButton";
import ChatWindow from "./ChatWindow"; // Importamos el nuevo componente

export default function ChatManager({ children }: { children: React.ReactNode }) {
  const [isChatVisible, setIsChatVisible] = useState(true);
  const [isWindowOpen, setIsWindowOpen] = useState(false); // Nuevo estado

  const handleOpenChat = () => {
    setIsChatVisible(true);
    setIsWindowOpen(true);
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
          onClose={() => setIsWindowOpen(false)} 
        />
      ) : (
        <ChatFloatingButton 
          isOpen={isChatVisible} 
          onClose={() => setIsChatVisible(false)} 
          // Agregamos una prop onClick al botón para abrir la ventana
          onClick={() => setIsWindowOpen(true)} 
        />
      )}
    </>
  );
}