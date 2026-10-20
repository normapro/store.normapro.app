"use client";

import { useState, useEffect, useRef, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faChevronDown, faPaperPlane, faMessageSmile } from "@fortawesome/pro-solid-svg-icons";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { StoreChatMessage, StoreChatAction } from "@/types/chatbot";
import { sendChatMessage, getStoredSessionId } from "@/services/chatbotService";
import MarkdownContent from "./chat/MarkdownContent";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onOpenContact?: () => void;
}

const DEFAULT_SUGGESTIONS = [
  "Quiero una demo",
  "Necesito más información",
  "¿Cómo me ayuda NormaPro en una auditoría de PRL?"
];

const MESSAGES_STORAGE_KEY = "normapro_chatbot_messages";

const ChatWindow = ({ isOpen, onClose, onOpenContact }: Props) => {
  const router = useRouter();
  const [messages, setMessages] = useState<StoreChatMessage[]>([]);
  const [suggestedQuestions, setSuggestedQuestions] = useState<string[]>(DEFAULT_SUGGESTIONS);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [sessionId, setSessionId] = useState<string | undefined>(undefined);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Cargar sesión y mensajes persistidos en sessionStorage al abrir
  useEffect(() => {
    if (isOpen) {
      const stored = getStoredSessionId();
      if (stored) {
        setSessionId(stored);
      }

      try {
        const savedMessages = sessionStorage.getItem(MESSAGES_STORAGE_KEY);
        if (savedMessages) {
          const parsed = JSON.parse(savedMessages);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setMessages(parsed);
          }
        }
      } catch {
        // Ignorar
      }

      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  // Persistir mensajes al actualizarse
  useEffect(() => {
    if (messages.length > 0) {
      try {
        sessionStorage.setItem(MESSAGES_STORAGE_KEY, JSON.stringify(messages));
      } catch {
        // Ignorar
      }
    }
  }, [messages]);

  // Auto-scroll al final del chat
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isLoading, isOpen, suggestedQuestions]);

  const handleSendMessage = async (textToSend: string) => {
    const trimmed = textToSend.trim();
    if (!trimmed || isLoading) return;

    if (trimmed.length > 1000) {
      setErrorMessage("El mensaje no puede superar los 1.000 caracteres.");
      return;
    }

    setErrorMessage(null);
    setInputValue("");

    const userMessage: StoreChatMessage = { role: "human", content: trimmed };
    const updatedHistory = [...messages, userMessage];
    setMessages(updatedHistory);
    setIsLoading(true);

    try {
      const result = await sendChatMessage(trimmed, messages, sessionId);

      if (result.session_id) {
        setSessionId(result.session_id);
      }

      const botMessage: StoreChatMessage = {
        role: "assistant",
        content: result.response
      };

      setMessages((prev) => [...prev, botMessage]);

      if (result.suggested_questions && result.suggested_questions.length > 0) {
        setSuggestedQuestions(result.suggested_questions);
      } else {
        setSuggestedQuestions([]);
      }

      if (result.actions && result.actions.length > 0) {
        executeActions(result.actions);
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Error al conectar con el asistente.";
      setErrorMessage(msg);
    } finally {
      setIsLoading(false);
    }
  };

  const executeActions = (actions: StoreChatAction[]) => {
    actions.forEach((action) => {
      // Acción directa para abrir el formulario de contacto
      if (action.type === "OPEN_CONTACT_MODAL") {
        setTimeout(() => {
          onOpenContact?.();
        }, 1200);
        return;
      }

      // Redirección con intercepción de URLs de contacto
      if (action.type === "REDIRECT" && action.payload?.url) {
        const rawUrl = action.payload.url as string;
        setTimeout(() => {
          try {
            const parsed = new URL(rawUrl, window.location.origin);
            const isContact =
              parsed.pathname === "/contacto" ||
              parsed.pathname === "/contacto/" ||
              parsed.hash === "#contacto";

            if (isContact) {
              onOpenContact?.();
              return;
            }

            // Si la URL apunta a un dominio de NormaPro o al mismo host, se navega con el router interno de Next.js
            // para no salir de localhost ni perder el estado del chat
            if (
              parsed.hostname === window.location.hostname ||
              parsed.hostname.includes("normapro.es") ||
              parsed.hostname.includes("normapro.app")
            ) {
              const relativePath = parsed.pathname + parsed.search + parsed.hash;
              router.push(relativePath);
              return;
            }
          } catch {
            if (rawUrl === "/contacto" || rawUrl === "/contacto/" || rawUrl === "#contacto") {
              onOpenContact?.();
              return;
            }
            if (rawUrl.startsWith("/")) {
              router.push(rawUrl);
              return;
            }
          }
          window.location.href = rawUrl;
        }, 1500);
      }
    });
  };

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    handleSendMessage(inputValue);
  };

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
          <button onClick={onClose} className="hover:bg-white/10 w-8 h-8 rounded-full transition-colors flex items-center justify-center">
            <FontAwesomeIcon icon={faChevronDown} />
          </button>
          <button onClick={onClose} className="hover:bg-white/10 w-8 h-8 rounded-full transition-colors flex items-center justify-center">
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>
      </div>

      {/* Cuerpo del chat */}
      <div className="flex-1 p-6 overflow-y-auto flex flex-col gap-4">
        <p className="text-gray-500 text-sm leading-relaxed">
          Cuéntanos tu caso. Utilizamos tecnología de inteligencia artificial para ofrecerte información útil.
        </p>

        {/* Mensajes de la conversación */}
        {messages.map((msg, index) => {
          const isUser = msg.role === "human";

          return (
            <div
              key={index}
              className={`flex ${isUser ? "justify-end mt-2" : "justify-start mt-2"}`}
            >
              {isUser ? (
                <div className="bg-[#f0f4f8] text-[#020a31] px-4 py-2 rounded-2xl rounded-tr-none text-sm max-w-[80%] whitespace-pre-wrap break-words">
                  {msg.content}
                </div>
              ) : (
                <div className="bg-white border border-gray-100 text-[#020a31] px-4 py-3 rounded-2xl rounded-tl-none text-sm max-w-[85%] shadow-xs">
                  <MarkdownContent content={msg.content} />
                </div>
              )}
            </div>
          );
        })}

        {/* Indicador de carga */}
        {isLoading && (
          <div className="flex gap-1 py-1">
            <span className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce"></span>
            <span className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce [animation-delay:0.2s]"></span>
            <span className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce [animation-delay:0.4s]"></span>
          </div>
        )}

        {/* Mensaje de error si ocurre */}
        {errorMessage && (
          <div className="text-red-600 text-xs bg-red-50 p-3 rounded-xl border border-red-100">
            {errorMessage}
          </div>
        )}

        {/* Botones de sugerencia */}
        {!isLoading && suggestedQuestions.length > 0 && (
          <div className="flex flex-col gap-2 items-start mt-2 w-full">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider pl-1">
              Sugerencias
            </span>
            {suggestedQuestions.map((question, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(question)}
                className="group w-full flex items-center justify-between gap-2.5 text-left bg-white hover:bg-slate-50/80 border border-dashed border-slate-300 hover:border-[#00B2E3] text-slate-700 hover:text-[#00B2E3] px-3.5 py-2 rounded-xl text-xs font-medium transition-all duration-200 cursor-pointer"
              >
                <span className="leading-snug">{question}</span>
                <FontAwesomeIcon
                  icon={faArrowRight}
                  className="text-slate-300 group-hover:text-[#00B2E3] text-[11px] transition-colors shrink-0"
                />
              </button>
            ))}
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-gray-100">
        <form onSubmit={handleFormSubmit} className="relative flex items-center bg-[#f8fafc] rounded-2xl border border-gray-200 px-4 py-3 group focus-within:border-blue-400 transition-colors">
          <input 
            ref={inputRef}
            type="text" 
            placeholder="Escribe aquí tu mensaje" 
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            disabled={isLoading}
            maxLength={1000}
            className="bg-transparent w-full text-sm outline-none text-gray-700 placeholder-gray-400"
          />
          <button 
            type="submit" 
            disabled={isLoading || !inputValue.trim()}
            className="text-[#020a31] hover:text-blue-500 disabled:opacity-40 transition-colors cursor-pointer disabled:cursor-not-allowed"
            title="Enviar mensaje"
          >
            <FontAwesomeIcon icon={faPaperPlane} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatWindow;