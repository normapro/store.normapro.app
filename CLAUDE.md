# CLAUDE.md · store.normapro.app

Índice del repo para la IA. Lee esto, ve a la ficha y no releas el código. Revisado el 21/10/2026 contra el código `0817fe9` (PR #19, SEO). Sin valores de configuración.

## 1. Qué es y cómo arrancarlo
- Web pública de NormaPRO e Instituto. Next.js 16 (App Router), React 19, Tailwind 4. Sin tests. Un proyecto, dos sitios.
- `npm run dev` (`next dev --turbopack`, puerto 3000 por defecto). También `npm run build` y `npm start`. `npm run lint` usa `next lint`, retirado en Next 16 (ST-WEB-15). El build ya no ignora errores de tipos ni de lint (`next.config.ts:3-14`).
- Variables de entorno (solo nombres): `NEXT_PUBLIC_API_BASE_URL` (`src/config/api.ts:1-5`; sin ella usa la API local en desarrollo), `NEXT_PUBLIC_SITE_URL` y `NEXT_PUBLIC_INSTITUTO_SITE_URL` (`src/libs/seo.ts:5-6`; con valor por defecto), `FONTAWESOME_NPM_TOKEN` (solo `npm install`, `README.md:45`).
- Necesita la API (`api-store.normapro.app`) en marcha. Orden y puertos: `../docs/ENTORNO.md`.
- Piden datos en servidor: soluciones, packs, ámbitos, sectores, noticias, historias, informes, aplicaciones, consultorías, prensa y sitemap (`src/services/storeService.ts`, caché 300 s, o `fetch` propio de la página). El resto de secciones (home, listados, menú, pie) piden desde el navegador (`fetch` en `useEffect`).
- Instituto en local: host `.local` en el fichero `hosts`. `localhost` sirve NormaPRO (`src/middleware.ts:44-45`).

## 2. Funcionalidad → ficha
| Ficha | Funcionalidad |
|---|---|
| [W1](docs/productos/w1-multisitio-middleware-config.md) | Multisitio, middleware, layouts, configuración |
| [W2](docs/productos/w2-home-normapro.md) | Home NormaPRO |
| [W3](docs/productos/w3-soluciones-ambitos-sectores-packs.md) | Soluciones, ámbitos, sectores, packs |
| [W4](docs/productos/w4-motor-de-landings.md) | Motor de landings (`LandingBuilder`, 42 tipos) |
| [W5](docs/productos/w5-consultorias-aplicaciones-formacion.md) | Consultorías, aplicaciones, formación |
| [W6](docs/productos/w6-actualidad-informes.md) | Actualidad e informes |
| [W7](docs/productos/w7-historias-clientes-testimonios-partners.md) | Historias, clientes, testimonios, partners |
| [W8](docs/productos/w8-contacto-candidatura-formularios.md) | Contacto, candidatura, formularios |
| [W9](docs/productos/w9-chatbot.md) | Chatbot |
| [W10](docs/productos/w10-seo.md) | SEO |
| [W11](docs/productos/w11-cabecera-pie-menus.md) | Navbar, pie, menús, buscador, migas |
| [W12](docs/productos/w12-paginas-corporativas-y-legales.md) | Páginas corporativas y legales, cookies |
| [W13](docs/productos/w13-sitio-instituto.md) | Sitio Instituto |
| [W14](docs/productos/w14-config-libs-utils.md) | `config/api.ts`, libs, utils, tipos |
| [W15](docs/productos/w15-raiz-plantillas-trazas-zips.md) | Raíz: plantillas, README, `next.config.ts` |

Fichas de 9 apartados fijos. Glosario `../docs/GLOSARIO.md`, mapa `../docs/MAPA.md`, errores en ejecución `../docs/OBSERVABILIDAD.md`, estado de errores `../docs/ESTADO-ERRORES-TRAS-PR.md`.

## 3. Mapa de carpetas y rutas
- `src/app/sites/normapro/` y `src/app/sites/instituto/`: un sitio cada uno (`layout.tsx`, `page.tsx` y una carpeta por ruta). `src/app/` tiene además `globals.css`, `sitemap.xml/route.ts` y `robots.txt/route.ts`; no hay `layout.tsx` raíz.
- `src/components/`: componentes sueltos. Subcarpetas `menu/`, `landings/` (48 bloques), `informes/`, `seo/` (`JsonLd.tsx`), `shared/`, `chat/`, `actualidad/`, `historias/`, `home/`, `soluciones/`.
- `src/config/api.ts` (endpoints), `src/context/SiteContext.tsx` (`ref`), `src/services/` (`storeService.ts` en servidor; `chatbotService.ts` en navegador), `src/libs/` (`seo.ts`, `logovars.ts`, `icons.ts`), `src/utils/`, `src/types/` (15 tipos), `src/middleware.ts` (elige sitio por host).
- `public/` imágenes y lotties; `plantillas/` JSON de ejemplo (W15).
- Rutas NormaPRO: `/`, `soluciones[/<ámbito>[/<solución>|/packs/<pack>|/sector/<sector>[/<solución>]]]`, `todas-las-soluciones`, `aplicaciones/<slug>`, `consultorias/<slug>`, `actualidad[/<slug>]`, `informes[/<slug>]`, `historias[/<slug>]`, `partners`, `nosotros`, `trabaja`, `politicas`, `aviso-legal`, `politica-de-privacidad`, `politica-de-cookies-ue`, `sitemap.xml`, `robots.txt`, `[...not-found]` (redirige a `/`).
- Rutas Instituto: `/`, `que-hacemos`, `mision-vision-valores`, `equipo`, `apariciones-prensa`, `material-prensa`, `contacto`, `[...not-found]`.

## 4. Quiero cambiar… → fichero:línea
| Quiero cambiar | Fichero:línea | Ficha |
|---|---|---|
| Botón «Solicita un diagnóstico gratuito» de la home | `src/components/MainHeroCarousel.tsx:59` | W2 |
| Título y vídeo de la home | `src/components/home/HomeNormapro.tsx:39-52` (`page.tsx` solo trae los metadatos, `:7-11`) | W2 |
| Barra de anuncio superior | `src/components/menu/Navbar.tsx:124-131` | W11 |
| Opciones del menú (escritorio / móvil) | `src/components/menu/Navbar.tsx:140-167` / `:193-259` | W11 |
| Desplegable de Soluciones | `src/components/menu/SolutionsDropdown.tsx:154-217` | W11 |
| Modal «Descubrir» | `src/components/menu/ModalDescubrir.tsx:67-87` | W11 |
| Enlaces y textos del pie | `src/components/Footer.tsx:126-136,215-217` | W11 |
| Newsletter del pie | `src/components/Footer.tsx:18-40` | W11 |
| Destino del botón «Entrar» | `src/components/NormaproAccessButton.tsx:29-33` | W11 |
| Migas de pan | `src/components/breadcrump.tsx:11-37` | W11 |
| Sugerencias, cabecera y aviso del chatbot | `src/components/ChatWindow.tsx:18-22,200,216` | W9 |
| Burbuja del botón del chatbot | `src/components/ChatFloatingButton.tsx:20` | W9 |
| Qué se envía al chatbot / qué hace con la respuesta | `src/services/chatbotService.ts:57-79` / `ChatWindow.tsx:130-181` | W9 |
| Dónde aparece el chatbot (y `SiteProvider`) | `src/app/sites/normapro/layout.tsx:55-60` (Instituto no lo monta) | W9, W1 |
| Una ruta de la API o una clave nueva | `src/config/api.ts:7-33` | W14 |
| Host nuevo para un sitio | `src/libs/seo.ts:16-23` (los lee `src/middleware.ts:2`) y `next.config.ts:13` | W1 |
| `?ref` (cabecera `x-site-ref`) | `src/middleware.ts:5-17`; lectura en `normapro/layout.tsx:47-48` | W1 |
| Dominio permitido para imágenes | `next.config.ts:4-12` | W1 |
| Título y descripción de un sitio | `generateMetadata`: `src/app/sites/normapro/layout.tsx:21-43`; `instituto/layout.tsx:21-42` | W1, W10 |
| SEO de una página | `pageMetadata` `src/libs/seo.ts:81-120`; solución `src/components/soluciones/SolucionPage.tsx:43-54`; pack `…/packs/[slugPack]/page.tsx:16-28` | W10 |
| JSON-LD, sitemap y robots | `src/components/seo/JsonLd.tsx`; `src/app/sitemap.xml/route.ts`; `src/app/robots.txt/route.ts:4-15` | W10 |
| Ficha de solución / de pack | `src/components/soluciones/SolucionDetalle.tsx`, `PackDetalle.tsx`; datos `SolucionPage.tsx:56-84`, `…/packs/[slugPack]/page.tsx:30-66` | W3 |
| Un bloque de landing (tipo nuevo) | `src/components/LandingBuilder.tsx:47` (`sectionMap`) y `src/components/landings/index.ts` | W4 |
| Campos y texto del formulario de contacto | `src/components/Formulario.tsx:144-300` (envío `:67-72`; trampa `components/shared/HoneypotField.tsx`) | W8 |
| Colores, fuente y animaciones globales | `src/app/globals.css:1-79`; fuente en `layout.tsx:15-19` de cada sitio | W1 |
| Tamaños de logos de clientes / iconos de pack | `src/libs/logovars.ts:7-20` / `src/libs/icons.ts:17-31` | W14 |
| Tabla de cookies | `src/components/Cookies.tsx:14` (datos de la API) | W12 |
| Landing de una aplicación o consultoría | datos de la API; render en `aplicaciones/[aplicacion]/page.tsx:53`, `consultorias/[consultorias]/page.tsx:53` | W5, W4 |

## 5. Reglas propias del repo
Generales: `../docs/ia-rules/01-reglas-de-sistema.md`, `02-anti-vibecoding.md`, `03-lista-de-comprobacion.md`.
1. Leer este fichero y la ficha antes de tocar nada. Si la ficha no localiza algo, añadir la fila a este índice.
2. No crear carpetas ni capas nuevas. Estructura: `src/{app,components,config,context,libs,services,types,utils}`.
3. Toda llamada a la API pasa por `API_ENDPOINTS` (`src/config/api.ts`). No componer direcciones a mano.
4. Un cambio en un tipo de `src/types/` toca también la API y el editor (apartado 6).
5. Un cambio en `middleware.ts`, en `libs/seo.ts` (hosts) o en un layout de sitio afecta a todas las rutas del sitio.
6. El build ya falla con errores de tipos, pero ejecutar `npx tsc --noEmit` antes de dar algo por bueno. El lint no se ejecuta (ST-WEB-15).
7. Un cambio sin su ficha actualizada no se commitea. Un commit, un repo; nunca `push` sin petición.
8. No abrir `.env*`, `config*.json`, `.npmrc`, `trace.*`, `*.zip`, `*.log`, `storybook-static/`.

## 6. Contratos delicados
Campos exactos: `../docs/CONTRATOS.md` §1.1. Los tipos se escriben a mano en los tres repos.
- Solución: `id_casosdeuso` (`types/solucion.ts:74`) está mal; la columna es `id_casodeuso`. `pack.ts` lo usa bien (`:79`, ST-API-11).
- Pack: `types/pack.ts` ya declara `titleweb`, `fraseCierre` y los bloques de detalle; `fraseCierre` no se pinta. Ámbito: `textoweb?` (`types/ambito.ts:5`).
- Pack destacado: la respuesta trae `uriIcon`; la API lo tipa como `iconUri` (ST-API-11).
- Cliente y testimonio: `miniImg?` no lo devuelve la API; `permisoweb` no llega a la store.
- Informe: acepta dos nombres por imagen (`imgPortada`, `img_portada`).
- Aplicación y consultoría: `contenidos` no está en el tipo; llega sin tipar.
- Landing: mismo contrato que el editor (E7) y `LandingBuilder` (W4); dos copias.
- `config/api.ts`: copia distinta en el editor con las mismas rutas compartidas (W14).
- Pack creado en el editor: se escribe `categoria` (texto) y la store filtra por `id_categoria` (ST-API-13).
- Leads: la API admite `website` (trampa) y exige `acepta_politica` en contacto; la store lo envía con `HoneypotField` (W8).

## 7. Zonas de riesgo y errores conocidos
Detalle: `../docs/ERRORES-DETECTADOS.md`; estado actual: `../docs/ESTADO-ERRORES-TRAS-PR.md`. Seguridad: regla de diseño que hoy no se cumple; detalle en el informe restringido.
- Resueltos por el PR: ST-WEB-02 (`?ref` por cabecera), 06 (build), 11 (SEO), 12 (JSON-LD sin precio), 23 (miga), 28 (404 de aplicación/consultoría). Cambiados: 01, 18, 25, 27.
- Vigentes: ST-WEB-03 contacto y candidatura con envío simulado (W8). 04 parámetros que la API no lee (W14). 05 ruta inexistente `usersCount` (W2, W14). 07 testimonio con id fijo (W7). 10 el chat se bloquea al 11.º mensaje (`ChatWindow.tsx:100`; la API responde un texto fijo, W9). 15 `next lint`. 17 toda URL o ficha inexistente redirige a `/` (no hay 404).
- Sin id (ver ficha): `/formacion` no existe y redirige a la home (ST-WEB-08, `Navbar.tsx:165,251`, `Footer.tsx:127`). Los resultados del buscador de consultorías enlazan a una ruta inexistente (`Navbar.tsx:296`). Home, `/historias` y `/actualidad` son de cliente: metadatos en servidor, contenido en navegador (W10). Dominio indexable `store.normapro.es` con canónico en otro dominio: decisión pendiente.
- El navbar vive dentro de `ChatManager` (W9, W11). Con la API caída, la mayoría de componentes dejan huecos vacíos sin aviso. Un host desconocido sirve NormaPRO. `noindex` y `Disallow` dependen de la cabecera `Host` (`libs/seo.ts:38-40`).

## 8. Código muerto conocido y dudas
- Sin ningún import: `components/CaracteristicaCard.tsx`, `MainClientesCarrousel.tsx`, `MainParallaxSection.tsx`, `Testimonios.tsx`, `libs/fontawesome.ts`. Importado y sin render: `MainConsultoriaSection` en `home/HomeNormapro.tsx:4`. Sin uso: `clearSessionId` (W9) y la clave `MAINPACKS` (`config/api.ts:20`). Borrados por el PR: `app/providers.tsx`, `libs/seo.config.ts`, `components/seo/SolucionSeo.tsx`, `AmbitosTabsResutls`, `MainSolucionesSection`, `SolucionCard`, `paqueteAmbitoSector`, `next-seo`.
- `tailwind.config.ts` no está enlazado desde `globals.css` (sin `@config`); sin comprobar en ejecución (W1).
- Dudas abiertas, las decide Juanma: ¿existe la página de formación? ¿`?ref=instituto` funciona en el navegador (no probado)? ¿`.npmrc` ya no contiene el token antiguo (rotarlo)? Lista general: `../docs/PREGUNTAS-ABIERTAS.md`.
