# 06 · Presencia externa y local: Google Business Profile, Search Console, Bing, directorios, redes

Fecha: 30/10/2026. Todo lo que está fuera del código y sin lo cual el SEO de la web no llega al techo. Son tareas de Juanma o de marketing, no de desarrollo, salvo donde se indica.

---

## 1. Google Business Profile (la «ficha de Google Maps»)

**¿Merece la pena para un SaaS B2B?** Sí, con matices. Google solo admite fichas de empresas con sede física que atienden clientes (en persona o con desplazamiento). El Instituto tiene sede (Centro Tecnológico Nuevo Jaén según el aviso legal del repo; Málaga según el PR #20 de producción: **confirmar cuál es la sede real antes de crear nada**). La ficha no va a traer tráfico de «software iso 9001», pero sí:
- Aparece en las búsquedas de marca («normapro», «instituto de innovación ciencia y empresa») con teléfono, web, horario y reseñas. Hoy «normapro» en Google puede mostrar a la competencia polaca; el panel de conocimiento lo evita.
- Las reseñas de Google son la prueba social más visible en España y las IA las leen.
- Google lo cita como señal para las funciones de IA («mantén tu Business Profile actualizado»).

**Qué hacer**
1. Buscar si ya existe una ficha de «Instituto de Innovación, Ciencia y Empresa» o «NormaPro» en Maps (no localizada en búsqueda el 30/10/2026; comprobar en Maps). Si existe, reclamarla; si no, crearla con el nombre legal + marca: «Instituto de Innovación, Ciencia y Empresa · NormaPro».
2. Categoría principal: «Empresa de software». Secundarias: «Consultoría», «Asesoría de empresas».
3. Dirección y teléfono idénticos a los del aviso legal y al JSON-LD `Organization` (NAP consistente). Horario real.
4. Descripción (750 caracteres máximo; propuesta): «NormaPro es la plataforma de software de cumplimiento normativo del Instituto de Innovación, Ciencia y Empresa. Más de 30 años ayudando a empresas a gestionar ISO 9001, ISO 14001, ISO 45001, ISO 27001, compliance penal UNE 19601, canal de denuncias (Ley 2/2023), PRL, seguridad alimentaria, protección de datos y sostenibilidad ESG. Gestor documental, BPM, portal del empleado y consultoría. Clientes como Bosch, Calidad Pascual y Emacsa. Sede en [ciudad], servicio en toda España.»
5. Servicios: uno por ámbito (12) con enlace a su página.
6. Fotos: sede, equipo (ya hay fotos en `/public/historiasclientes/`), capturas del producto, logotipo.
7. Reseñas: pedir a 10 clientes con un enlace corto; responder a todas.
8. Publicaciones: una al mes (guía nueva, evento, certificación).
9. Repetir para el Instituto si tiene actividad propia (formación, eventos). Si es la misma sede, **una sola ficha**: dos fichas en la misma dirección se penalizan.

**Lo que no hacer:** crear fichas en ciudades donde no hay oficina (Málaga, Granada, Sevilla) «para salir». Google las suspende y arrastra a la principal.

---

## 2. Google Search Console (obligatorio, es la fuente de verdad)

1. Verificar `normapro.es` como propiedad de dominio (registro TXT en DNS). Cubre `www`, `store.`, `canaldedenuncias.` y http/https. Añadir también `institutodeinnovacion.es`.
2. Enviar `https://www.normapro.es/sitemap.xml` (y el del Instituto cuando cargue).
3. Exportar ahora, antes de cambiar nada: Rendimiento (16 meses) por consulta, por página, por país y por dispositivo. Guardar en `docs/seo/datos/2026-MM-DD_gsc_*.csv`. Es la línea base.
4. Páginas → revisar «Página con redirección», «No encontrada (404)», «Rastreada: actualmente sin indexar», «Duplicada». Exportar la lista de URL: es el mapa de redirecciones que falta en `04` §2.
5. Enlaces → exportar sitios que enlazan y páginas más enlazadas (incluye las URL antiguas de WordPress: son las que no se pueden perder).
6. Activar el informe «Search Generative AI performance» (Rendimiento → pestaña de IA; desplegado globalmente desde agosto de 2026 según terceros; comprobar en la cuenta).
7. Dar acceso de lectura a quien vaya a hacer el seguimiento mensual.

---

## 3. Bing Webmaster Tools e IndexNow

- Bing es el índice que usa la búsqueda de ChatGPT y, en parte, Copilot, DuckDuckGo y Perplexity. Sin Bing no hay ChatGPT.
- Importar la propiedad desde Search Console (un clic), enviar sitemap.
- IndexNow: obtener la clave en Bing Webmaster, publicar el fichero `{clave}.txt` en la raíz (`public/`) y llamar al endpoint en cada despliegue o cuando se publique contenido (script en el despliegue; desarrollo).
- Revisar en Bing el informe «SEO» (tiene auditoría propia) y «Rastreo».

---

## 4. Analítica y consentimiento

- Hoy no hay GA4 ni gestor de consentimiento en producción (prueba del 22/10/2026). El PR #20 añade aviso de cookies; comprobar que bloquea scripts hasta aceptar.
- GA4 con conversiones: formulario de diagnóstico, descarga de informe, clic en «Entrar», clic en teléfono/correo, reproducción de vídeo. Enlazar GA4 con Search Console.
- Alternativa sin cookies para no depender del consentimiento: Plausible o Matomo (decisión de Juanma).

---

## 5. Directorios y comparadores de software (orden recomendado)

| Directorio | Por qué | Coste | Qué subir |
|---|---|---|---|
| **Capterra / GetApp / Software Advice** (Gartner Digital Markets) | Los más citados por las IA en B2B; el alta es gratuita; «software gestión de calidad gratis» lo ganan ellos | Alta gratis; pago por clic opcional | Ficha en categorías: Compliance, Gestión de la calidad, Gestión documental, EHS/PRL, Canal de denuncias (Whistleblowing), ESG. 10 capturas, vídeo, 15 reseñas |
| **SoftwareDoit** | Posiciona «Los 7 mejores software de X» para calidad, canal de denuncias, PRL en España | Alta gratuita; destacado de pago | Ficha + solicitud de inclusión en sus comparativas |
| **Appvizer** | Fichas en español, posiciona en «conformidad» | Gratis | Ficha |
| **Comparasoft, BlindaSoft, ComparaSST** | Comparativas españolas de CAE y PRL que ya salen en Google | Gratis o patrocinio | Ficha + petición de revisión |
| **G2** | Internacional; citado por ChatGPT | Gratis | Ficha, aunque las reseñas en español sean pocas |
| **Directorios de ASCOM y AEC** | Son miembros; ASCOM publica proveedores de compliance | Incluido en la cuota (comprobar) | Ficha de proveedor |
| **Catálogo de agentes digitalizadores (Kit Digital)** | Solo si NormaPro es agente; posiciona «kit digital gestión de procesos» | — | Sin verificar |
| **Capterra de canal de denuncias específicos** (tucanaldedenuncias.com, ayudaleyprotecciondatos.es) | Posicionan «mejores apps canal de denuncias» | Variable | Contacto editorial |

Regla: una ficha con 0 reseñas no sirve. Antes del alta, tener 5 clientes comprometidos a dejar reseña la misma semana.

---

## 6. LinkedIn, YouTube y prensa

- **LinkedIn** (`linkedin.com/company/normapro`, ya existe): descripción idéntica a la del JSON-LD y GBP; ámbitos como «especialidades»; una publicación semanal (guía, cliente, dato normativo); artículos largos republicando las guías con enlace canónico a la web. Perfiles del equipo con «NormaPro» en el cargo: las IA cruzan personas y empresas.
- **YouTube** (`youtube.com/@normapro`, ya existe): títulos con la palabra clave («Canal de denuncias Ley 2/2023: cómo activarlo en un día con NormaPro»), descripción con enlace a la página, capítulos, subtítulos en español (transcripción automática revisada). Incrustar cada vídeo en su página con `VideoObject`.
- **Prensa y asociaciones**: Diario Jaén, Ideal, Andalucía Económica, El Economista (sección pymes), Compliance Journal, Economist & Jurist, Legaltoday; AEC, ASCOM, Confederación de Empresarios de Jaén, Cámara de Comercio, Universidad de Jaén (OTRI). Una nota de prensa por hito. Objetivo: 10 menciones con enlace al año. Es el canal de autoridad que las IA y Google más valoran y el que menos cuesta a una empresa con 30 años de historia.
- **Wikidata**: entrada para «NormaPro» (instancia de: software; desarrollador: Instituto de Innovación, Ciencia y Empresa; sitio web; país). Gratis y permanente.

---

## 7. El sitio Instituto (`institutodeinnovacion.es`)

- Devuelve 500 el 30/10/2026. Arreglar antes que nada: es la entidad matriz, el canónico del segundo sitio y una de las pocas URL con historia (`/normapro/` está indexada).
- Cuando cargue: `Organization` matriz con `subOrganization` NormaPro; página «NormaPro» que enlace a `www.normapro.es` con texto descriptivo; prensa y equipo con nombres.
- Decisión pendiente: si el Instituto no tiene actividad propia relevante, valorar redirigirlo íntegro a `www.normapro.es/nosotros` y concentrar la autoridad en un solo dominio. Recomendación: mantener los dos solo si el Instituto publica contenido propio (formación, estudios) al menos una vez al mes; si no, redirigir.

---

## 8. Lo local, en su justa medida

NormaPro vende en toda España. El SEO local (Jaén, Andalucía) solo aporta en dos casos:
1. Búsquedas «consultoría compliance Jaén», «consultora ISO 9001 Jaén/Granada/Córdoba/Málaga»: pocas pero muy cualificadas. Una página «Consultoría de cumplimiento normativo en Andalucía» en `/consultorias/` con sedes, clientes andaluces (Emacsa, Calidad Pascual si procede) y el mapa, basta. No crear una página por ciudad.
2. Ecosistema de Jaén (Diputación, Geolit, UJA, Andalucía Emprende): enlaces y menciones que dan autoridad local y de dominio.
