"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMessageSmile, faXmark } from "@fortawesome/pro-solid-svg-icons";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onClick?: () => void;
}

const ChatFloatingButton = ({ isOpen, onClose, onClick }: Props) => {
  if (!isOpen) return null;

  return (
    <div className="fixed bottom-16 right-16 z-[100] flex items-center group">
      {/* Burbuja de texto */}
      <div className="mr-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-4 group-hover:translate-x-0 pointer-events-none">
        <div className="bg-white text-[#010d3d] px-5 py-3 rounded-2xl shadow-xl border border-slate-100 relative">
          <p className="text-[14px] font-medium whitespace-nowrap">Hola, ¿en qué podemos ayudarte?</p>
          <div className="absolute right-[-6px] top-1/2 -translate-y-1/2 w-3 h-3 bg-white rotate-45 border-r border-t border-slate-100"></div>
        </div>
      </div>

      <div className="relative">
        <button
          onClick={onClose}
          className="absolute -top-1 -right-1 bg-[#020a31] text-white w-6 h-6 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10"
        >
          <FontAwesomeIcon icon={faXmark} className="text-[10px]" />
        </button>

        <button 
          onClick={onClick}
          className="w-16 h-16 rounded-full bg-gradient-to-br from-[#00B2E3] to-[#CCA1DD] shadow-lg flex items-center justify-center text-white cursor-pointer hover:scale-105 transition-transform"
        >
          <FontAwesomeIcon icon={faMessageSmile} className="text-2xl" />
        </button>
      </div>
    </div>
  );
};

export default ChatFloatingButton;