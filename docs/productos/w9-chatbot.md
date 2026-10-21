# W9 · Chatbot

Repo: `store.normapro.app`. Rutas de fichero relativas a `src/` salvo indicación. Revisada contra el código el 21/10/2026.

## 1. Qué hace

Muestra un botón flotante y una ventana de chat con un asistente de IA en el sitio NormaPRO. Envía el historial a la API, pinta la respuesta en un Markdown reducido, ofrece preguntas sugeridas y ejecuta acciones que devuelve el asistente (abrir el formulario de contacto o redirigir).

No existe en el sitio Instituto: su layout no monta `ChatManager` (`app/sites/instituto/layout.tsx:24-39`).

## 2. Dónde está

| Pieza | Fichero | Líneas |
|---|---|---|
| Orquestador (estado abierto/visible, monta navbar, botón, ventana y modal) | `components/ChatManager.tsx` | 11-78 |
| Botón flotante | `components/ChatFloatingButton.tsx` | 12-42 |
| Ventana de chat | `components/ChatWindow.tsx` | 26-307 |
| Markdown reducido | `components/chat/MarkdownContent.tsx` | 9-69, 74-114 |
| Cliente HTTP y sesión | `services/chatbotService.ts` | 14-129 |
| Tipos | `types/chatbot.ts` | 1-33 |
| Montaje | `app/sites/normapro/layout.tsx` | 35-37 |
| URL del endpoint (clave `CHATBOT`) | `config/api.ts` | 32 |
| Lado API (para contraste) | `api-store.normapro.app/app/routes/v1/chatbotRoutes.ts:9`, `controllers/chatbotController.ts:68-123`, `facades/chatbotFacade.ts:17-70`, `middlewares/chatbotRateLimit.ts` | - |

`ChatManager` monta además `components/menu/Navbar.tsx` (`ChatManager.tsx:47-50`) y `components/Formulario.tsx` (`:70-75`). Ver fichas [W11](w11-cabecera-pie-menus.md) y [W8](w8-contacto-candidatura-formularios.md).

## 3. Flujo

Todo ocurre en el cliente (`"use client"` en los cinco componentes). Sin caché ni revalidación de Next.

1. `ChatManager` arranca con el botón visible (`useState(true)`, `:12`) y la ventana cerrada (`:13`). Al montar, si `sessionStorage` tiene la clave de «abierto», abre la ventana (`:16-24`).
2. Botón: `ChatFloatingButton` solo se pinta si `isOpen` (`:13`) y solo en pantallas `md` o mayores (`hidden md:flex`, `:16`). La X lo oculta (`ChatManager.tsx:64`); el `Navbar` ofrece un icono para volver a abrirlo cuando está oculto (`Navbar.tsx:169-174`, solo en escritorio).
3. Abrir: `handleOpenChat` (`ChatManager.tsx:26-34`) pone la ventana abierta y guarda la clave en `sessionStorage`. Cerrar: `handleCloseChat` (`:36-43`) la borra. No borra mensajes ni `session_id`.
4. Ventana al abrir (`ChatWindow.tsx:39-62`): recupera `session_id` y mensajes de `sessionStorage` y da foco al campo.
5. Enviar (`ChatWindow.tsx:82-128`): recorta el texto, rechaza vacío o `> 1000` caracteres (`:83-89`), añade el mensaje, llama a `sendChatMessage(trimmed, messages, sessionId)` (`:100`).
6. `sendChatMessage` (`chatbotService.ts:50-129`): monta `{session_id, current_url, messages: [...historial, nuevo], metadata:{language:"es", device}}` (`:57-71`), hace `POST` a `API_ENDPOINTS.CHATBOT` (`:73-79`).
7. Errores HTTP (`:81-90`): 429 y 504 con texto propio; el resto usa `error` del cuerpo o «Error <código>».
8. Respuesta (`:92-128`): si `response` es un texto que empieza por `{` o `[`, intenta leerlo como JSON y extrae `response`, `suggested_questions` y `actions` (`:98-117`). Guarda `session_id` (`:119-121`).
9. La ventana añade el mensaje del asistente (`ChatWindow.tsx:106-111`), reemplaza las sugerencias (`:113-117`) y ejecuta las acciones (`:119-121`).
10. Acciones (`:130-181`):
   - `OPEN_CONTACT_MODAL`: abre el formulario a los 1200 ms (`:133-138`).
   - `REDIRECT` con `payload.url`: a los 1500 ms; si la ruta es `/contacto`, `/contacto/` o `#contacto`, abre el formulario; si el host es el mismo, o contiene un dominio de NormaPRO, navega con `router.push`; en otro caso `window.location.href` (`:141-179`).
11. Persistencia de mensajes: cada cambio de `messages` se guarda en `sessionStorage` (`:65-73`).

## 4. Endpoints que consume

| Verbo | Ruta | Llamada | Router API |
|---|---|---|---|
| POST | `/v1/store/chat` | `services/chatbotService.ts:73` (clave `CHATBOT`, `config/api.ts:32`) | `api-store…/app/routes/v1/chatbotRoutes.ts:9`; montado en `app.ts:46` |

Sin cabecera de autenticación (`chatbotService.ts:75-77`). Detalle de la API: no se documenta aquí.

## 5. Datos

Tipos de `types/chatbot.ts`:

| Tipo | Campos |
|---|---|
| `ChatRole` | `'human' \| 'assistant'` (`:1`) |
| `StoreChatMessage` | `role`, `content` (`:3-6`) |
| `StoreChatMetadata` | `language?`, `device?` (`:8-11`) |
| `ChatbotClientRequest` | `messages`, `session_id?`, `current_url?`, `metadata?` (`:13-18`) |
| `StoreChatAction` | `type`, `payload: {url?, ...}` (`:20-26`) |
| `StoreChatResponse` | `response` (Markdown), `session_id`, `suggested_questions[]`, `actions[]` (`:28-33`) |

Contrato con la API: [CONTRATOS.md](../../../docs/CONTRATOS.md) lo marca como «Coincide» (campos iguales). La API añade `TalosChatRequest` y `ChatbotError`.

Claves de `sessionStorage` (solo nombres de constante): `CHAT_OPEN_KEY` (`ChatManager.tsx:9`), `SESSION_STORAGE_KEY` (`chatbotService.ts:9`), `MESSAGES_STORAGE_KEY` (`ChatWindow.tsx:24`).

Textos editables en código:
- Sugerencias por defecto: `DEFAULT_SUGGESTIONS` (`ChatWindow.tsx:18-22`).
- Cabecera «¿Necesitas ayuda?» (`ChatWindow.tsx:200`), aviso de IA (`:216`), marcador del campo (`:288`), título «Sugerencias» (`:261`).
- Burbuja del botón: `ChatFloatingButton.tsx:20`.
- Mensajes de error: `chatbotService.ts:83,86`; `ChatWindow.tsx:87,123`.

Markdown admitido (`MarkdownContent.tsx`): listas con `- ` o `* ` (`:37`), títulos `#`, `##`, `###` (`:43-54`), negrita `**`, código con acento grave y enlaces `[texto](url)` (`:76-110`). Todo lo demás sale como texto. Los enlaces abren en pestaña nueva (`:104`).

## 6. Reglas de negocio y permisos

1. Sin autenticación: cualquier visitante puede usarlo.
2. Último mensaje: máximo 1000 caracteres (`ChatWindow.tsx:86`, `maxLength={1000}` en `:292`; API: `chatbotController.ts:106-110`).
3. Historial: la API rechaza más de 20 mensajes (`chatbotController.ts:83-86`). La store no recorta (ver apartado 7).
4. Límite de la API: 30 envíos por minuto y por IP, con bloqueo de un minuto (`chatbotRateLimit.ts:9-11`). La store muestra «Demasiadas consultas seguidas, espera un minuto.» (`chatbotService.ts:82-84`).
5. La sesión dura lo que la pestaña (`sessionStorage`).
6. Solo existe en el sitio NormaPRO y su botón solo en pantallas `md` o mayores.
7. El chat no se abre solo: lo abre el visitante o una clave guardada en la sesión.

## 7. Zonas de riesgo

- Regla de diseño que hoy no se cumple; detalle en el informe restringido.
- **Error funcional nuevo (sin id):** la conversación se bloquea al 11.º mensaje del usuario. `ChatWindow.tsx:100` pasa todo el historial, `chatbotService.ts:60-63` lo envía entero más el mensaje nuevo, y la API rechaza más de 20 (`chatbotController.ts:83-86`). Los mensajes se guardan en `sessionStorage` (`ChatWindow.tsx:65-73`) y se recargan al abrir (`:46-53`): el bloqueo sigue hasta cerrar la pestaña. El usuario ve el texto de error de la API (`chatbotService.ts:88-89`).
- Sin botón para borrar la conversación ni `clearSessionId` en uso: `clearSessionId` (`chatbotService.ts:38-45`) no se llama desde ningún componente (ver apartado 9).
- Ventana fija de 380x600 px a `right-16 bottom-16` (`ChatWindow.tsx:191`) sin ajuste a móvil. Si `sessionStorage` la reabre en móvil, ocupa la pantalla.
- Las redirecciones se deciden por texto del host (`ChatWindow.tsx:158-162`).
- El formulario de contacto se abre con retardo fijo (`:136`, `:143-178`): si el usuario cierra el chat antes, el modal se abre igual.
- `Navbar` va dentro de `ChatManager`: un cambio en `ChatManager` puede romper la cabecera (ficha W11).

## 8. Cómo probarlo

1. Arrancar API (con el servicio externo del chatbot si se quiere respuesta real) y store (`npm run dev`).
2. Abrir NormaPRO en ancho `md` o mayor. Debe verse el botón abajo a la derecha.
3. Abrir, escribir «hola»: debe haber respuesta o, sin servicio externo, el texto de 504 (`chatbotService.ts:85-87`).
4. Recargar: la ventana sigue abierta y con mensajes (`sessionStorage`).
5. Enviar 11 mensajes seguidos: el 11.º debe fallar con el error de la API. Confirma el error del apartado 7.
6. Enviar más de 30 en un minuto: debe salir el texto de 429.
7. Sin API: el error de red cae en el `catch` de `ChatWindow.tsx:122-124`.
8. Instituto (host `.local`): no debe haber botón.

## 9. Dudas / no localizado

- Quién y cuándo devuelve `OPEN_CONTACT_MODAL` o `REDIRECT`: se define en el servicio externo, fuera de los tres repos. No localizado.
- `clearSessionId` (`chatbotService.ts:38-45`) no tiene llamadas en `src/` (búsqueda por nombre). Código sin uso.
- `Navbar` recibe `isChatHidden` y `onShowChat` (`Navbar.tsx:20-25`) y los pinta solo en escritorio. En móvil no hay entrada al chat. No hay nada en el código que lo explique.
- No localizado: registro (log) de conversaciones en la store.
- `chatbotService.ts:99-117`: el parseo defensivo asume que a veces `response` llega serializado. Sin documentación de cuándo ocurre.
- Spec del chatbot de la API: `api-store.normapro.app/docs/chatbot/specs/chatbot_integration_spec.md` (ficha A12). No leída para esta ficha.

## Correcciones de la revisión contra el código (21/10/2026)

### Afirmaciones incorrectas
- Ninguna afirmación incorrecta.

### Cifras o líneas a unificar
- En `MarkdownContent.tsx`, `target="_blank"` está en :103 y `rel` en :104.
- Cálculo del bloqueo: tras `n-1` turnos hay `2(n-1)` mensajes; con el nuevo son `2n-1`. Con n=11 son 21 y el límite de la API es 20.
- `clearSessionId` (`chatbotService.ts:38-45`) no se usa. Los temporizadores de `ChatWindow.tsx:136-178` no se cancelan al desmontar (ejecución pendiente).
- `Navbar.tsx:169` envuelve el botón de chat en `hidden md:flex`: en móvil no hay entrada para reabrir.

### Errores funcionales de esta ficha
- ST-WEB-10: el chat se bloquea al 11.º mensaje ([detalle](../../../docs/ERRORES-DETECTADOS.md)).
- ST-API-32: `session_id` que no es texto da 500 en el chat ([detalle](../../../docs/ERRORES-DETECTADOS.md)).
- ST-API-33: un 4xx del proveedor del chat sale como 504 ([detalle](../../../docs/ERRORES-DETECTADOS.md)).
- ST-API-34: el `Map` del limitador del chat crece sin límite ([detalle](../../../docs/ERRORES-DETECTADOS.md)).

### Afirmaciones no verificables
- Quién devuelve `OPEN_CONTACT_MODAL` y `REDIRECT` (servicio externo), cuándo llega la respuesta serializada, la spec del chatbot de la API (A12) y la sección `## 8`.
