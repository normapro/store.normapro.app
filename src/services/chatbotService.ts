import API_ENDPOINTS from "@/config/api";
import {
  ChatbotClientRequest,
  StoreChatMessage,
  StoreChatResponse,
  StoreChatAction
} from "@/types/chatbot";

const SESSION_STORAGE_KEY = "normapro_chatbot_session_id";

/**
 * Recupera el session_id almacenado en sessionStorage si existe
 */
export function getStoredSessionId(): string | undefined {
  if (typeof window === "undefined") return undefined;
  try {
    return sessionStorage.getItem(SESSION_STORAGE_KEY) || undefined;
  } catch {
    return undefined;
  }
}

/**
 * Guarda o actualiza el session_id en sessionStorage
 */
export function storeSessionId(sessionId: string): void {
  if (typeof window === "undefined" || !sessionId) return;
  try {
    sessionStorage.setItem(SESSION_STORAGE_KEY, sessionId);
  } catch {
    // ignorar si almacenamiento no está disponible
  }
}

/**
 * Limpia el session_id actual
 */
export function clearSessionId(): void {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.removeItem(SESSION_STORAGE_KEY);
  } catch {
    // ignorar
  }
}

/**
 * Envía un mensaje al endpoint del Chatbot
 */
export async function sendChatMessage(
  content: string,
  history: StoreChatMessage[] = [],
  sessionId?: string
): Promise<StoreChatResponse> {
  const effectiveSessionId = sessionId || getStoredSessionId();

  const payload: ChatbotClientRequest = {
    session_id: effectiveSessionId,
    current_url: typeof window !== "undefined" ? window.location.href : undefined,
    messages: [
      ...history,
      { role: "human", content: content.trim() }
    ],
    metadata: {
      language: "es",
      device:
        typeof window !== "undefined" && window.innerWidth < 768
          ? "mobile"
          : "desktop"
    }
  };

  const response = await fetch(API_ENDPOINTS.CHATBOT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    if (response.status === 429) {
      throw new Error("Demasiadas consultas seguidas, espera un minuto.");
    }
    if (response.status === 504) {
      throw new Error("El asistente no responde actualmente. Inténtalo de nuevo en unos momentos.");
    }
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || `Error ${response.status}: No se pudo procesar la consulta.`);
  }

  const rawData: StoreChatResponse = await response.json();

  let formattedResponse = rawData.response;
  let suggestedQuestions: string[] = rawData.suggested_questions || [];
  let actions: StoreChatAction[] = rawData.actions || [];

  // Parseo defensivo por si el contenido de la respuesta llega serializado en JSON
  if (
    typeof formattedResponse === "string" &&
    (formattedResponse.trim().startsWith("{") || formattedResponse.trim().startsWith("["))
  ) {
    try {
      const parsed = JSON.parse(formattedResponse);
      if (typeof parsed.response === "string") {
        formattedResponse = parsed.response;
      }
      if (Array.isArray(parsed.suggested_questions) && suggestedQuestions.length === 0) {
        suggestedQuestions = parsed.suggested_questions;
      }
      if (Array.isArray(parsed.actions) && actions.length === 0) {
        actions = parsed.actions;
      }
    } catch {
      // Dejar tal cual si no es un JSON válido
    }
  }

  if (rawData.session_id) {
    storeSessionId(rawData.session_id);
  }

  return {
    response: formattedResponse,
    session_id: rawData.session_id,
    suggested_questions: suggestedQuestions,
    actions: actions
  };
}
