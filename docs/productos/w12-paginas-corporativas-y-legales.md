# W12 · Páginas corporativas y legales

Repo: `store.normapro.app`. Ficha revisada contra el código el 21/10/2026. Rutas de fichero relativas a `src/`. Prefijos: `P = app/sites/normapro/`, `S = /v1/store`, `A = api-store.normapro.app/app/`.

Todas las rutas de esta ficha son del sitio NormaPRO. El sitio Instituto tiene otras páginas (ficha W13).

## 1. Qué hace

- `/nosotros` («Quiénes somos»): historia, misión, visión, valores, equipo, testimonios, certificaciones, enlace a ofertas de empleo y formulario de contacto.
- `/aviso-legal`: texto legal del sitio.
- `/politica-de-privacidad`: texto de protección de datos.
- `/politica-de-cookies-ue`: texto de la política de cookies y, en el apartado 6, la lista de tecnologías y cookies que lee de la API.
- `/politicas`: acordeón con la política del sistema integrado de gestión (con texto) y dos políticas más (sin texto).
- Cualquier ruta que no exista (`[...not-found]`): redirige a `/`.
- `AccordionSection`: componente de acordeón que usan `/politicas` y `/trabaja`.
- `Cookies`: componente que pinta la tabla de cookies de la API.

## 2. Dónde está

| Pieza | Fichero | Líneas | Tipo |
|---|---|---|---|
| `/nosotros` | `P nosotros/page.tsx` | 162 | Servidor (sin `'use client'`) |
| `/aviso-legal` | `P aviso-legal/page.tsx` | 99 | Servidor |
| `/politica-de-privacidad` | `P politica-de-privacidad/page.tsx` | 111 | Servidor |
| `/politica-de-cookies-ue` | `P politica-de-cookies-ue/page.tsx` | 102 | Cliente (`:1`) |
| `/politicas` | `P politicas/page.tsx` | 69 | Servidor |
| Comodín de rutas | `P [...not-found]/page.tsx` | 5 | Servidor |
| Acordeón | `components/AccordionSection.tsx` | 76 | Cliente (`:1`) |
| Tabla de cookies | `components/Cookies.tsx` | 117 | Sin `'use client'` (usa `useState` y `useEffect`; funciona porque su única página, `/politica-de-cookies-ue`, es cliente, `:1`) |

Quién usa cada pieza (búsqueda de `import` y de `<Componente`):

| Pieza | Uso |
|---|---|
| `AccordionSection` | `P politicas/page.tsx:7`, `P trabaja/page.tsx:23` (ficha W8) |
| `Cookies` | `P politica-de-cookies-ue/page.tsx:59` |
| `HeaderSection` (ficha W11) | `P nosotros/page.tsx:15`, `P politicas/page.tsx:6` |

Enlaces de entrada: el pie enlaza `/aviso-legal/`, `/politica-de-privacidad/` y `/politica-de-cookies-ue/` (`components/Footer.tsx:211-213`), y `/nosotros` y `/politicas` (`:129,132`). El pie de Instituto enlaza las mismas páginas con URL absoluta de producción y `?ref=instituto` (`components/FooterInstituto.tsx:161,274,280,286`).

`P nosotros/page.tsx` importa y no renderiza `TextSection` (`:3`), `HeroSection` (`:4`), `HistoriaTextSection` (`:6`) y `HistoriaTextSection2` (`:7`).

## 3. Flujo

### 3.1 `/nosotros`

`P nosotros/page.tsx` (servidor, sin `fetch` propio). Bloques en orden:

| Bloque | Línea | Origen |
|---|---|---|
| Cabecera «Quiénes somos» | `:15` | `HeaderSection` (W11) |
| Título e imagen `/historiasclientes/reunion.jpg` | `:17-33` | `<img>` (`:27`); el fichero existe en `public/` |
| Nuestra historia + logo `/InstitutoBlue.png` | `:35-60` | `next/image` (`:50`) |
| Misión y visión | `:62-86` | texto en el código |
| Valores | `:88-113` | `ListHistoriaSection` (W4) con 4 elementos |
| Nuestro equipo + imagen `/historiasclientes/Todos-sin-casco.jpg` | `:115-134` | texto e `<img>` (`:128`) |
| Testimonios | `:137` | `MainTestimoniosSection` (llama a `S/testimonios`, `components/MainTestimoniosSection.tsx:21`) |
| Certificaciones | `:138-142` | `CertificacionesSection` (W4), imágenes `9001.png`, `27001.png`, `45001.png`, `iqnet.png`, `qaec.png`, `ascom.png` de `public/certificaciones/` |
| «Únete a nuestro equipo» | `:144-157` | `Link` a `/trabaja` |
| Contacto | `:159` | `ContactoFormSection` (W8; envío simulado) |

### 3.2 Páginas legales

- `/aviso-legal`, `/politica-de-privacidad`: texto escrito en el código, sin datos de la API, sin estado. En las dos aparecen la razón social, el domicilio, el identificador fiscal, el registro, el teléfono y el correo de la empresa (`aviso-legal/page.tsx:34-44`; `politica-de-privacidad/page.tsx:19-22,78-85`). No se copian aquí.
- El componente de `politica-de-privacidad/page.tsx` se llama `AvisoLegal` (`:3`).
- Secciones de `aviso-legal`: datos identificativos (`:31-44`), objeto (`:47-58`), responsabilidad (`:61-72`), propiedad intelectual (`:75-86`), ley aplicable (`:89-94`).
- Secciones de `politica-de-privacidad`: tratamiento (`:18-48`), derechos (`:50-72`), contacto para ejercerlos (`:74-86`), carácter de la información (`:88-106`).

### 3.3 `/politica-de-cookies-ue`

`P politica-de-cookies-ue/page.tsx` (cliente):
1. Texto de 10 apartados escrito en el código (`:16-97`). Fecha de última actualización escrita en el texto (`:11`).
2. Apartado 6 «Cookies usadas»: `<Cookies />` (`:58-59`).
3. `components/Cookies.tsx`:
   - `useEffect` → `fetch(API_ENDPOINTS.COOKIES)` → `res.json()` → `setDatos(data)` (`:11-22`). No comprueba `res.ok`.
   - Mientras carga: «Cargando...» con icono (`:24-29`).
   - Una fila acordeón por tecnología: nombre y etiquetas (`:34-49`). Al abrir: «Uso» (`:56-60`), «Compartir datos» (`:62-66`) y una tabla por categoría con nombre, caducidad y función de cada cookie (`:69-109`).
4. API: `GET /v1/store/cookies` → `getCookies` (`A models/storeModel.ts:1333-1385`). Consulta: `storeTecnologiasCookies t LEFT JOIN storeCookies c`, ordenada por tecnología y categoría (`:1335-1343`). Agrupa en memoria: una entrada por tecnología con `etiquetas` (categorías únicas) y `tablas` (`titulo_categoria` + lista de `cookies`) (`:1346-1384`). Una tecnología sin cookies sale con `etiquetas` y `tablas` vacías.
5. Controlador y router de la ruta (`docs/MAPA.md` §1.3: `storeController.ts:1372`, `store.ts:109`, `storeFacade.ts:348`). No abiertos por este lote.

### 3.4 `/politicas`

`P politicas/page.tsx` (servidor): `HeaderSection` (`:6`) y `AccordionSection` con 3 elementos (`:7-68`):
- «Política del Sistema Integrado de Gestión»: texto (`:10-52`).
- «Política de Seguridad y Salud»: contenido vacío (`:53-59`).
- «Política de Compliance»: contenido vacío (`:60-66`).

### 3.5 `AccordionSection`

`components/AccordionSection.tsx` (cliente):
- Props: `title?`, `items` (`{title, content}`), `interpretHtmlStrings` (por defecto `false`) y `defaultOpenIndex` (por defecto `-1`, todo cerrado) (`:7-24`).
- Un solo elemento abierto a la vez (`:25`, `:42`).
- `content` es contenido React o texto (`:9`). Si `interpretHtmlStrings` es verdadero y `content` es texto, se pinta como HTML (`:58-62`). Ningún llamador activa esa opción (`politicas/page.tsx:7-67`, `trabaja/page.tsx:23-94`).
- La clase de fondo del contenedor lleva espacios dentro de los corchetes: `bg-[#f1f1f7  ]` (`:28`).

### 3.6 Comodín

`P [...not-found]/page.tsx:3-5`: `redirect("/")`. No existe `not-found.tsx` en `src/app` (`docs/OBSERVABILIDAD.md` §3.1). Ejemplo verificado: el pie enlaza `/formacion` (`components/Footer.tsx:123`); esa ruta no existe en `P` (listado de la carpeta) y cae en el comodín.

### 3.7 Caché y revalidación

Las páginas legales y `/nosotros` no hacen `fetch` de datos en el servidor. `Cookies` pide los datos desde el navegador, sin caché de Next.

## 4. Endpoints que consume

| Verbo | Ruta | Fichero:línea |
|---|---|---|
| GET | `S/cookies` | `components/Cookies.tsx:12` |
| GET | `S/testimonios` (vía `MainTestimoniosSection`, solo `/nosotros`) | `components/MainTestimoniosSection.tsx:21` |

`/nosotros` además incluye `ContactoFormSection` (sin llamada a la API; ficha W8). La URL de `COOKIES` sale de `config/api.ts:26`.

## 5. Datos

### Respuesta de `GET S/cookies` (según `A models/storeModel.ts:1346-1384`)

Lista de tecnologías:
- `id`, `nombre`, `uso`, `link_uso`, `compartir_datos`, `link_compartir_datos`.
- `etiquetas`: lista de categorías.
- `tablas`: lista de `{ titulo_categoria, cookies: [{ nombre, link_nombre, caducidad, funcion }] }`. Sin categoría, la API usa «Otros» (`:1365`).

`Cookies.tsx` los lee con `any` (`:7`, `:69`, `:82`). La store no tiene tipo para esta respuesta. Usa `tec.id` como clave (`:34`).

### Props

| Componente | Props |
|---|---|
| `AccordionSection` | `title?`, `items: AccordionItem[]`, `interpretHtmlStrings?`, `defaultOpenIndex?` (`:12-17`) |
| `Cookies` | Ninguna |
| Páginas | Ninguna |

Tipo exportado: `AccordionItem` (`AccordionSection.tsx:7-10`).

## 6. Reglas de negocio y permisos

- Sin autenticación.
- El texto legal es el que está escrito en el código. Cambiar un texto legal exige cambiar el fichero y desplegar.
- Los textos de `/politicas` dos y tres no existen (vacíos, `politicas/page.tsx:53-66`). Al abrir esos acordeones no aparece nada.
- La lista de cookies de la página de cookies sale de las tablas `storeTecnologiasCookies` y `storeCookies`. No hay módulo de edición en el editor (`docs/GLOSARIO.md` §2).
- La página de cookies afirma que al entrar por primera vez se muestra una ventana emergente con «Guardar preferencias» (`politica-de-cookies-ue/page.tsx:64`). No localizado código que la muestre (ver §9).
- Seguridad: regla de diseño que hoy no se cumple; detalle en el informe restringido.

## 7. Zonas de riesgo

- Los textos legales están en el código. Un cambio legal pasa por un despliegue de la store.
- `Cookies.tsx` toma lo que devuelva la API sin comprobar el estado (`:13-17`). Si la API responde un error con cuerpo objeto, `datos.map` falla (`:33`) y la página puede romperse en el navegador. No probado.
- `/nosotros` importa cuatro componentes sin uso (`:3,4,6,7`): confunden a quien lea el fichero.
- El comodín `[...not-found]` redirige todo lo desconocido a `/`: una URL mal escrita no devuelve 404 (`docs/MAPA.md` §3.3).
- Los textos de `/politica-de-cookies-ue` y de privacidad citan formularios y una ventana de consentimiento; el código de los formularios y de la ventana está en otras fichas (W8, W11) y no coincide con todo lo que dicen (ver §9).
- Seguridad: regla de diseño que hoy no se cumple; detalle en el informe restringido.

## 8. Cómo probarlo

1. Arrancar API y store (`docs/ENTORNO.md`; `npm run dev`).
2. `/nosotros`: deben salir los 10 bloques de §3.1, con las imágenes y los testimonios. Pulsar «Ver ofertas de empleo»: abre `/trabaja`.
3. `/aviso-legal` y `/politica-de-privacidad`: deben salir completos. Pulsar los enlaces del pie.
4. `/politica-de-cookies-ue`: debe mostrar «Cargando...» y después una fila por tecnología. Abrir una: tabla de cookies. Parar la API y recargar: anotar qué se ve.
5. `/politicas`: abrir el primer elemento (texto). Abrir el segundo y el tercero: vacíos.
6. Escribir una ruta que no existe, por ejemplo `/prueba`: debe redirigir a `/`.
7. Pulsar «Formación» del pie (`/formacion`): debe redirigir a `/`.
8. Con el navegador limpio (sin datos del sitio), entrar en la home y comprobar si aparece una ventana de consentimiento de cookies (ver §9).

## 9. Dudas / no localizado

- Ventana de consentimiento de cookies: el texto la describe (`politica-de-cookies-ue/page.tsx:64`). No localizado ningún componente, almacén o cookie de consentimiento en `src/` (búsqueda de «consent», «cookie» y «Guardar preferencias»). Confirma `docs/OBSERVABILIDAD.md` §3.4.
- Apartado 9 de la página de cookies: dice «Tienes los siguientes derechos con respecto a tus datos personales:» y no hay lista (`:79-81`). No localizado el texto previsto.
- Textos de «Política de Seguridad y Salud» y «Política de Compliance»: no localizados (acordeones vacíos).
- La política de privacidad afirma que todos los datos solicitados son obligatorios (`:102`). `Formulario` marca como obligatorios solo nombre, apellidos, correo y política (ficha W8). No localizado cuál es la regla correcta.
- La política de privacidad habla de formularios de contacto y descarga (`:93`). El formulario «Contáctanos» no guarda datos (ficha W8).
- Fecha de la política de cookies: «octubre 14, 2024» escrita en el texto (`:11`). No localizado quién la actualiza.
- La página de cookies muestra «Read more about» en inglés (`Cookies.tsx:58`). No localizado si es intencionado.
- Texto de `/nosotros`: el bloque de valores muestra el título de lista «Ejemplo con un solo elemento» (`nosotros/page.tsx:90`; se pinta en `ListHistoriaSection.tsx:79-83`). No localizado si es texto definitivo.
- Texto de `aviso-legal/page.tsx`: títulos «RESPONSAVILIDAD» (`:62`) y «OBJETO» repite la introducción (`:20-28` frente a `:50-58`). No localizado si es intencionado.
- En `politica-de-cookies-ue/page.tsx:18` el enlace lleva a un sitio de producción y el texto del enlace nombra otro dominio. No localizado cuál es el correcto.
- Si el comodín debe devolver 404 en lugar de redirigir: no localizado (decisión de producto).
- `AccordionSection.tsx:28`: clase `bg-[#f1f1f7  ]` con espacios. No verificado en el navegador si el fondo se aplica.

## Correcciones de la revisión contra el código (21/10/2026)

### Afirmaciones incorrectas
- Ninguna afirmación incorrecta.

### Cifras o líneas a unificar
- Políticas vacías confirmadas: `politicas/page.tsx:53-59` y `:60-66` son `content: (<></>)`.
- El enlace de cookies (:18) apunta a un sitio y el texto nombra otro.
- Pie de Instituto: la ruta de privacidad de `FooterInstituto.tsx:280` está mal escrita (`politica-de.privacidad`).
- `Cookies.tsx` no comprueba `res.ok` (:13-17); `datos.map` (:33) falla con un objeto de error.
- `/formacion` (`Footer.tsx:123`) no existe y cae en el comodín.

### Errores funcionales de esta ficha
- ST-WEB-18: enlaces de Instituto mal escritos ([detalle](../../../docs/ERRORES-DETECTADOS.md)).
- ST-WEB-37: la política de cookies describe una ventana de consentimiento que no existe ([detalle](../../../docs/ERRORES-DETECTADOS.md)).
- ST-WEB-14: una respuesta de error de la API tumba la página de cookies ([detalle](../../../docs/ERRORES-DETECTADOS.md)).
- ST-WEB-43: dos políticas se publican vacías ([detalle](../../../docs/ERRORES-DETECTADOS.md)).
- ST-WEB-08: `/formacion` no existe: el enlace del pie vuelve a la home ([detalle](../../../docs/ERRORES-DETECTADOS.md)).

### Afirmaciones no verificables
- `docs/OBSERVABILIDAD.md` §3.1 y §3.4, `docs/MAPA.md` §3.3, el título de lista de `ListHistoriaSection.tsx:79-83` (no abierto) y la sección `## 8`.

- Hay reglas de diseño que hoy no se cumplen; detalle en el informe restringido.

## Actualización tras el PR del 21/10/2026

Código comparado: `main` `8dc6ec9` frente a `origin/main` `0817fe9` (PR #19). Estado de los ids en [ACT-store.md](../../../docs/revision/ACT-store.md). No probado en ejecución. `P = app/sites/normapro/`.

### Citas rotas
Ninguna.

### Citas desplazadas
| Antes | Ahora |
|---|---|
| `P politica-de-cookies-ue/page.tsx:1` (`'use client'`) | ya no existe la directiva (la página es de servidor) |
| `…/politica-de-cookies-ue/page.tsx:18`, `:46`, `:59` (`Cookies`), `:64` (apartado 7), `:75`, `:78` | `:20`, `:48`, `:61`, `:66`, `:77`, `:80` |
| `P politicas/page.tsx:7-67` (acordeón), `:53-66` (dos vacías) | `:11-71`, `:57-70` |
| `P aviso-legal/page.tsx:31-94`, `:34-44`, `:62` | `:35-98`, `:38-48`, `:66` |
| `P politica-de-privacidad/page.tsx:18-106`, `:19-22`, `:78-85` | `:22-110`, `:23-26`, `:82-89` |
| `P trabaja/page.tsx:23-94` (acordeón de ofertas) | `:21-92` |
| `P nosotros/page.tsx` | sin desplazamiento de las líneas citadas (`:15`, `:88`, `:138`, `:152`, `:159`) |
| `components/Cookies.tsx:7`, `:12`, `:13-17`, `:33`, `:34`, `:58`, `:69`, `:82`, `:117` | `:9`, `:14`, `:15-19`, `:35`, `:36`, `:60`, `:71`, `:84`, `:119` |
| `Footer.tsx:211-213` (legales), `:129,132` | `:215-217`, `:133,136` |
| `FooterInstituto.tsx:161`, `:274`, `:280`, `:286` | `:165`, `:278`, `:284`, `:290` |

### Afirmaciones obsoletas
- «`/politica-de-cookies-ue`: Cliente (`:1`)» (§2): ahora es de servidor.
- «`Cookies.tsx`: sin `'use client'`… funciona porque su única página es cliente» (§2): `Cookies.tsx:1` ya declara `'use client'`.
- «`P nosotros/page.tsx` importa y no renderiza `TextSection`, `HeroSection`, `HistoriaTextSection`, `HistoriaTextSection2`» (§2): esos imports se quitaron (`nosotros/page.tsx:1-9`). Quedan `MainTestimoniosSection`, `CertificacionesSection`, `ListHistoriaSection`, `ContactoFormSection`, `HeaderSection`, `Image` y `Link`, todos usados.
- «El pie enlaza `/aviso-legal/`, `/politica-de-privacidad/` y `/politica-de-cookies-ue/`» (§2): sin barra final desde el PR (`Footer.tsx:215-217`).
- «El pie de Instituto enlaza privacidad con `politica-de.privacidad`» (§9, correcciones): corregido a `politica-de-privacidad` (`FooterInstituto.tsx:284`). Persiste `cumpliance-penal` en `:144` (ST-WEB-18 CAMBIADO).
- «`Cookies.tsx` toma lo que devuelva la API sin comprobar el estado (`:13-17`)» (§7): sigue en `:15-19` (ST-WEB-14 VIGENTE).
- «La página de cookies muestra “Read more about”» (§9): sigue en `Cookies.tsx:60` (ST-WEB-34).
- «Texto de consentimiento que describe una ventana que no existe» (ST-WEB-37): sigue en `politica-de-cookies-ue/page.tsx:66`.
- «Dos políticas vacías» (ST-WEB-43): siguen en `politicas/page.tsx:57-70`; la lista de derechos del apartado 9 de cookies sigue vacía (`:80-85`).
- «`AccordionSection` con `interpretHtmlStrings` ve contenido JSX fijo» (§7): sin cambios (`AccordionSection.tsx:61`; SEG-WEB-09 VIGENTE).
- «Ninguna de estas páginas tiene metadatos propios»: todas exportan `metadata` con `pageMetadata` (`nosotros/page.tsx:11`, `aviso-legal`, `politica-de-privacidad`, `politicas`, `politica-de-cookies-ue/page.tsx:5`, `trabaja/page.tsx:8`). Títulos: «Quiénes somos», «Política de cookies (UE)», etc.

### Nuevo
- `metadata` en las seis páginas de la ficha. Las legales y `/nosotros` entran en el sitemap (`sitemap.xml/route.ts:21-34`).
- Errata corregida en `/trabaja`: «revolución empresarials» (`trabaja/page.tsx:14`).

### Errores de esta ficha
VIGENTES: ST-WEB-14 (`Cookies.tsx:15-19`), ST-WEB-34 (`aviso-legal/page.tsx:66`, `nosotros/page.tsx:90`, `Cookies.tsx:60`, `AccordionSection.tsx:28`), ST-WEB-37, ST-WEB-43, ST-WEB-17. ST-WEB-18 CAMBIADO.

### Seguridad
`AccordionSection` mantiene `dangerouslySetInnerHTML` bajo `interpretHtmlStrings` (SEG-WEB-09 VIGENTE, latente). La tabla de cookies pinta enlaces de la API sin validar esquema (SEG-WEB-08 VIGENTE, `Cookies.tsx:60,66`). Detalle en [ACT-store.md](../../../docs/revision/ACT-store.md) §7.
