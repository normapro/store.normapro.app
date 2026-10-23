// Inventario de cookies y almacenamiento local de la web. Se muestra en la política de cookies.
// Si se añade una herramienta que guarde datos en el navegador, hay que añadirla aquí.

export type CookieItem = {
  nombre: string;
  tipo: "Cookie" | "sessionStorage";
  caducidad: string;
  funcion: string;
};

export type TecnologiaCookies = {
  id: string;
  nombre: string;
  categoria: "Necesarias" | "Estadísticas" | "Contenido de terceros";
  uso: string;
  titular: string;
  linkPrivacidad?: string;
  cookies: CookieItem[];
};

export const INVENTARIO_COOKIES: TecnologiaCookies[] = [
  {
    id: "propias",
    nombre: "NormaPro",
    categoria: "Necesarias",
    uso: "recordar tus preferencias de cookies y mantener la conversación con el asistente virtual mientras navegas",
    titular: "Propias. No se comparten con terceros.",
    cookies: [
      {
        nombre: "normapro_cookie_consent",
        tipo: "Cookie",
        caducidad: "6 meses",
        funcion: "Guarda las categorías de cookies que has aceptado o rechazado.",
      },
      {
        nombre: "normapro_chatbot_session_id",
        tipo: "sessionStorage",
        caducidad: "Al cerrar la pestaña",
        funcion: "Identifica tu conversación con el asistente virtual.",
      },
      {
        nombre: "normapro_chatbot_messages",
        tipo: "sessionStorage",
        caducidad: "Al cerrar la pestaña",
        funcion: "Conserva los mensajes del asistente virtual al cambiar de página.",
      },
      {
        nombre: "normapro_chatbot_is_open",
        tipo: "sessionStorage",
        caducidad: "Al cerrar la pestaña",
        funcion: "Recuerda si tenías abierta la ventana del asistente virtual.",
      },
    ],
  },
  {
    id: "google-analytics",
    nombre: "Google Analytics",
    categoria: "Estadísticas",
    uso: "obtener estadísticas anónimas sobre cómo se usa la web (páginas visitadas, tiempo de visita, origen del tráfico) y mejorarla",
    titular: "Google Ireland Limited. Solo se activan si aceptas las cookies de estadísticas.",
    linkPrivacidad: "https://policies.google.com/privacy",
    cookies: [
      { nombre: "_ga", tipo: "Cookie", caducidad: "2 años", funcion: "Distingue a los usuarios de forma anónima." },
      { nombre: "_ga_<ID>", tipo: "Cookie", caducidad: "2 años", funcion: "Mantiene el estado de la sesión de Google Analytics." },
    ],
  },
  {
    id: "youtube",
    nombre: "YouTube",
    categoria: "Contenido de terceros",
    uso: "mostrar los vídeos insertados en la web",
    titular: "Google Ireland Limited. Solo se cargan si aceptas el contenido de terceros.",
    linkPrivacidad: "https://policies.google.com/privacy",
    cookies: [
      { nombre: "YSC", tipo: "Cookie", caducidad: "Sesión", funcion: "Registra un identificador para las estadísticas de los vídeos vistos." },
      { nombre: "VISITOR_INFO1_LIVE", tipo: "Cookie", caducidad: "6 meses", funcion: "Estima el ancho de banda para ajustar la calidad del vídeo." },
      { nombre: "VISITOR_PRIVACY_METADATA", tipo: "Cookie", caducidad: "6 meses", funcion: "Guarda el estado de consentimiento de YouTube." },
      { nombre: "PREF", tipo: "Cookie", caducidad: "8 meses", funcion: "Guarda las preferencias del reproductor." },
    ],
  },
  {
    id: "google-maps",
    nombre: "Google Maps",
    categoria: "Contenido de terceros",
    uso: "mostrar los mapas de nuestras oficinas",
    titular: "Google Ireland Limited. Solo se cargan si aceptas el contenido de terceros.",
    linkPrivacidad: "https://policies.google.com/privacy",
    cookies: [
      { nombre: "NID", tipo: "Cookie", caducidad: "6 meses", funcion: "Guarda preferencias e información de Google Maps." },
    ],
  },
];
