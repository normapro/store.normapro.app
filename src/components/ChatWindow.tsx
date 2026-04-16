"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faChevronDown, faPaperPlane } from "@fortawesome/pro-solid-svg-icons";
import { faMessageSmile } from "@fortawesome/pro-solid-svg-icons";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const ChatWindow = ({ isOpen, onClose }: Props) => {
  if (!isOpen) return null;

  return (
    <div className="fixed bottom-16 right-16 z-[110] w-[380px] h-[600px] bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-slate-100 animate-in slide-in-from-bottom-5 duration-300">
      
      {/* Cabecera */}
      <div className="bg-gradient-to-r from-[#00B2E3] via-[#CCA1DD] to-[#64D8CC] p-1 text-white flex justify-between items-start">
        <div className="flex gap-3">
          <div className="p-2">
            <FontAwesomeIcon icon={faMessageSmile} className="text-xl" />
          </div>
          <div>
            <h3 className="text-lg font-bold">¿Necesitas ayuda?</h3>
          </div>
        </div>
        <div className="flex gap-3">
          <button className="hover:bg-white/10 w-8 h-8 rounded-full transition-colors">
            <FontAwesomeIcon icon={faChevronDown} />
          </button>
          <button onClick={onClose} className="hover:bg-white/10 w-8 h-8 rounded-full transition-colors">
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>
      </div>

      {/* Cuerpo del chat */}
      <div className="flex-1 p-6 overflow-y-auto flex flex-col gap-4">
        <p className="text-gray-500 text-sm leading-relaxed">
          Cuéntanos tu caso. Utilizamos tecnología de inteligencia artificial para ofrecerte información útil.
        </p>

        {/* Botones de sugerencia */}
        <div className="flex flex-col gap-2 items-start mt-2">
          <button className="bg-[#020a31] text-white px-6 py-3 rounded-2xl font-bold text-sm hover:bg-[#051352] transition-colors">
            Quiero una demo
          </button>
          <button className="bg-[#020a31] text-white px-6 py-3 rounded-2xl font-bold text-sm hover:bg-[#051352] transition-colors">
            Necesito más información
          </button>
          <button className="bg-[#020a31] text-white px-6 py-3 rounded-2xl font-bold text-sm hover:bg-[#051352] transition-colors">
            ¿Lorem ipsum dolor?
          </button>
        </div>

        {/* Mensaje de ejemplo */}
        <div className="flex justify-end mt-4">
          <div className="bg-[#f0f4f8] text-[#020a31] px-4 py-2 rounded-2xl rounded-tr-none text-sm max-w-[80%]">
            ¿Lorem ipsum dolor sit amet?
          </div>
        </div>
        <div className="flex gap-1">
           <span className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce"></span>
           <span className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce [animation-delay:0.2s]"></span>
           <span className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce [animation-delay:0.4s]"></span>
        </div>
      </div>

      {/* Input */}
      <div className="p-4 border-t border-gray-100">
        <div className="relative flex items-center bg-[#f8fafc] rounded-2xl border border-gray-200 px-4 py-3 group focus-within:border-blue-400 transition-colors">
          <input 
            type="text" 
            placeholder="Escribe aquí tu mensaje" 
            className="bg-transparent w-full text-sm outline-none text-gray-700"
          />
          <button className="text-[#020a31] hover:text-blue-500 transition-colors">
            <FontAwesomeIcon icon={faPaperPlane} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;