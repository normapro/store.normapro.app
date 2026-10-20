export type ChatRole = 'human' | 'assistant';

export interface StoreChatMessage {
  role: ChatRole;      // 'human' para el usuario, 'assistant' para el bot
  content: string;     // Máximo 1.000 caracteres en el último mensaje
}

export interface StoreChatMetadata {
  language?: string;   // Ej: 'es'
  device?: string;     // 'desktop' | 'mobile' | 'tablet'
}

export interface ChatbotClientRequest {
  messages: StoreChatMessage[];    // OBLIGATORIO: Array de 1 a 20 mensajes (historial)
  session_id?: string;             // OPCIONAL: Si no se envía, el backend genera un UUID
  current_url?: string;            // OPCIONAL: URL actual (ej. window.location.href)
  metadata?: StoreChatMetadata;    // OPCIONAL: Idioma y dispositivo
}

export interface StoreChatAction {
  type: 'REDIRECT' | string;
  payload: {
    url?: string;
    [key: string]: unknown;
  };
}

export interface StoreChatResponse {
  response: string;               // Markdown formateado con la respuesta del asistente
  session_id: string;             // ID de la sesión (persistir para mensajes siguientes)
  suggested_questions: string[];  // 2 o 3 preguntas rápidas (Quick Replies para botones)
  actions: StoreChatAction[];     // Acciones opcionales (ej. redirección automática)
}
