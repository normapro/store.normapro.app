# CLAUDE.md · store.normapro.app

Índice del repo para la IA. Lee esto, ve a la ficha y no releas el código. Revisado el 21/10/2026. Sin valores de configuración.

## 1. Qué es y cómo arrancarlo
- Web pública de NormaPRO e Instituto. Next.js 16 (App Router), React 19, Tailwind 4. Sin tests. Un proyecto, dos sitios.
- `npm run dev` (`next dev --turbopack`, puerto 3000 por defecto). También `npm run build` y `npm start`. `npm run lint` usa `next lint`, retirado en Next 16 (ST-WEB-01).
- Variable de entorno: `NEXT_PUBLIC_API_BASE_URL` (`src/config/api.ts:2`). Sin ella usa la API local en desarrollo.
- Necesita la API (`api-store.normapro.app`) en marcha. Orden y puertos: `../docs/ENTORNO.md`.
- Casi todos los datos se piden desde el navegador (`fetch` en `useEffect`). Piden en servidor: aplicaciones, consultorías, historias e informes.
- Instituto en local: host `.local` en el fichero `hosts`. `localhost` sirve NormaPRO (`src/middleware.ts:35`).

## 2. Funcionalidad → ficha
| Ficha | Funcionalidad |
|---|---|
| [W1](docs/productos/w1-multisitio-middleware-config.md) | Multisitio, middleware, layouts, configuración |
| [W2](docs/productos/w2-home-normapro.md) | Home NormaPRO |
| [W3](docs/productos/w3-soluciones-ambitos-sectores-packs.md) | Soluciones, ámbitos, sectores, packs |
| [W4](docs/productos/w4-motor-de-landings.md) | Motor de landings (`LandingBuilder`, 49 bloques) |
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
| [W15](docs/productos/w15-raiz-plantillas-trazas-zips.md) | Raíz: plantillas, trazas, zips, Storybook |

Fichas de 9 apartados fijos. Glosario `../docs/GLOSARIO.md`, mapa `../docs/MAPA.md`, errores en ejecución `../docs/OBSERVABILIDAD.md`.

## 3. Mapa de carpetas y rutas
- `src/app/sites/normapro/` y `src/app/sites/instituto/`: un sitio cada uno (`layout.tsx`, `page.tsx` y una carpeta por ruta). `src/app/` solo tiene `globals.css` y `providers.tsx`; no hay `layout.tsx` raíz.
- `src/components/`: componentes sueltos. Subcarpetas `menu/`, `landings/` (49 bloques), `informes/`, `seo/`, `shared/`, `chat/`.
- `src/config/api.ts` (endpoints), `src/context/SiteContext.tsx` (`ref`), `src/services/chatbotService.ts` (única capa de servicio), `src/libs/`, `src/utils/`, `src/types/` (15 tipos), `src/middleware.ts` (elige sitio por host).
- `public/` imágenes y lotties; `plantillas/` JSON de ejemplo (W15).
- Rutas NormaPRO: `/`, `soluciones[/<ámbito>[/<solución>|/packs/<pack>|/sector/<sector>[/<solución>]]]`, `todas-las-soluciones`, `aplicaciones/<slug>`, `consultorias/<slug>`, `actualidad[/<slug>]`, `informes[/<slug>]`, `historias[/<slug>]`, `partners`, `nosotros`, `trabaja`, `politicas`, `aviso-legal`, `politica-de-privacidad`, `politica-de-cookies-ue`, `[...not-found]` (redirige a `/`).
- Rutas Instituto: `/`, `que-hacemos`, `mision-vision-valores`, `equipo`, `apariciones-prensa`, `material-prensa`, `contacto`, `[...not-found]`.

## 4. Quiero cambiar… → fichero
| Quiero cambiar | Fichero:línea | Ficha |
|---|---|---|
| Botón «Solicita un diagnóstico gratuito» de la home | `src/components/MainHeroCarousel.tsx:59` | W2 |
| Título y vídeo de la home | `src/app/sites/normapro/page.tsx:40,44` | W2 |
| Barra de anuncio superior | `src/components/menu/Navbar.tsx:127` | W11 |
| Opciones del menú (escritorio / móvil) | `src/components/menu/Navbar.tsx:140-167` / `:251-252` | W11 |
| Desplegable de Soluciones | `src/components/menu/SolutionsDropdown.tsx:154-217` | W11 |
| Modal «Descubrir» | `src/components/menu/ModalDescubrir.tsx:67-87` | W11 |
| Enlaces y textos del pie | `src/components/Footer.tsx:121-135,211-216` | W11 |
| Newsletter del pie | `src/components/Footer.tsx:16-60` | W11 |
| Destino del botón «Entrar» | `src/components/NormaproAccessButton.tsx:29-33` | W11 |
| Migas de pan | `src/components/breadcrump.tsx:11-36` | W11 |
| Sugerencias, cabecera y aviso del chatbot | `src/components/ChatWindow.tsx:18-22,200,216` | W9 |
| Burbuja del botón del chatbot | `src/components/ChatFloatingButton.tsx:20` | W9 |
| Qué se envía al chatbot / qué hace con la respuesta | `src/services/chatbotService.ts:57-79` / `ChatWindow.tsx:130-181` | W9 |
| Dónde aparece el chatbot | `src/app/sites/normapro/layout.tsx:35` (Instituto no lo monta) | W9, W1 |
| Una ruta de la API o una clave nueva | `src/config/api.ts:7-33` | W14 |
| Host nuevo para un sitio | `src/middleware.ts:18,23` y `next.config.ts:20` | W1 |
| Dominio permitido para imágenes | `next.config.ts:4-12` | W1 |
| Título y descripción de un sitio | `src/app/sites/normapro/layout.tsx:20-23`; `instituto/layout.tsx:19-22` | W1, W10 |
| SEO por defecto / SEO de solución y pack | `src/libs/seo.config.ts:2-25` / `src/components/seo/SolucionSeo.tsx:15-44` | W10 |
| Un bloque de landing (tipo nuevo) | `src/components/LandingBuilder.tsx:47` (`sectionMap`) y `src/components/landings/index.ts` | W4 |
| Campos y texto del formulario de contacto | `src/components/Formulario.tsx:150-299` (envío `:65`) | W8 |
| Colores, fuente y animaciones globales | `src/app/globals.css:1-79`; fuente en `layout.tsx:14-18` de cada sitio | W1 |
| Tamaños de logos de clientes / iconos de pack | `src/libs/logovars.ts:7-20` / `src/libs/icons.ts:17-31` | W14 |
| Tabla de cookies | `src/components/Cookies.tsx:12` (datos de la API) | W12 |
| Landing de una aplicación o consultoría | datos de la API; render en `aplicaciones/[aplicacion]/page.tsx:29`, `consultorias/[consultorias]/page.tsx:29` | W5, W4 |

## 5. Reglas propias del repo
Generales: `../docs/ia-rules/01-reglas-de-sistema.md`, `02-anti-vibecoding.md`, `03-lista-de-comprobacion.md`.
1. Leer este fichero y la ficha antes de tocar nada. Si la ficha no localiza algo, añadir la fila a este índice.
2. No crear carpetas ni capas nuevas. Estructura: `src/{app,components,config,context,libs,services,types,utils}`.
3. Toda llamada a la API pasa por `API_ENDPOINTS` (`src/config/api.ts`). No componer direcciones a mano.
4. Un cambio en un tipo de `src/types/` toca también la API y el editor (apartado 6).
5. Un cambio en `middleware.ts` o en un layout de sitio afecta a todas las rutas del sitio.
6. El build no avisa de errores de tipos ni de lint (ST-WEB-06): ejecutar `npx tsc --noEmit` antes de dar algo por bueno.
7. Un cambio sin su ficha actualizada no se commitea. Un commit, un repo; nunca `push` sin petición.
8. No abrir `.env*`, `config*.json`, `trace.*`, `*.zip`, `*.log`, `storybook-static/`.

## 6. Contratos delicados
Campos exactos: `../docs/CONTRATOS.md` §1.1. Los tipos se escriben a mano en los tres repos.
- Solución y pack: `id_casosdeuso` (`types/solucion.ts:74`) está mal; la columna es `id_casodeuso`. `pack.ts` lo usa bien (ST-API-11).
- Pack destacado: la respuesta trae `uriIcon`; la API lo tipa como `iconUri` (ST-API-11).
- Cliente y testimonio: `miniImg?` no lo devuelve la API; `permisoweb` no llega a la store.
- Informe: acepta dos nombres por imagen (`imgPortada`, `img_portada`).
- Aplicación y consultoría: `contenidos` no está en el tipo; llega sin tipar.
- Landing: mismo contrato que el editor (E7) y `LandingBuilder` (W4); dos copias.
- `config/api.ts`: copia distinta en el editor con las mismas rutas compartidas (W14).
- Pack creado en el editor: se escribe `categoria` (texto) y la store filtra por `id_categoria` (ST-API-13).
- Solución: `price` e `imagenOg` se leen sin tipo y no existen en la API (W10).

## 7. Zonas de riesgo y errores conocidos
Detalle: `../docs/ERRORES-DETECTADOS.md`. Seguridad: regla de diseño que hoy no se cumple; detalle en el informe restringido.
- ST-WEB-01 opciones obsoletas en Next 16 (W1). ST-WEB-02 `?ref=` probablemente no llega al contexto (W1). ST-WEB-03 formularios de contacto y candidatura con envío simulado (W8). ST-WEB-04 parámetros que la API no lee (W14). ST-WEB-05 ruta inexistente `usersCount` (W2, W14). ST-WEB-06 el build ignora tipos y lint (W1). ST-WEB-07 testimonio con id fijo (W7).
- Sin id (ver ficha): el chat se bloquea al 11.º mensaje porque la API admite 20 (W9, `ChatWindow.tsx:100`). `/formacion` no existe y redirige a la home (W11, `Navbar.tsx:165,251`, `Footer.tsx:123`). Los resultados del buscador de consultorías enlazan a una ruta inexistente (W11, `Navbar.tsx:296`). Posible SEO inoperante por `next/head` en App Router; sin sitemap ni robots (W10).
- El navbar vive dentro de `ChatManager` (W9, W11). Con la API caída, la mayoría de componentes dejan huecos vacíos sin aviso. Un host desconocido sirve NormaPRO.

## 8. Código muerto conocido y dudas
- Sin ningún import: `components/AmbitosTabsResutls.tsx`, `CaracteristicaCard.tsx`, `MainClientesCarrousel.tsx`, `MainParallaxSection.tsx`, `MainSolucionesSection.tsx`, `SolucionCard.tsx`, `libs/fontawesome.ts`, `.../[slugSolucion]/paqueteAmbitoSector.tsx` (`../docs/FICHAS-DEFINITIVAS.md` §3). Sin uso por búsqueda: `clearSessionId` (W9). La clave `MAINPACKS` solo la usa código sin import (W14).
- `tailwind.config.ts` no está enlazado desde `globals.css` (sin `@config`); sin comprobar en ejecución (W1).
- Dudas abiertas, las decide Juanma: ¿existe la página de formación? ¿`?ref=instituto` funciona? ¿`next/head` emite algo? ¿qué precio va al JSON-LD? Lista general: `../docs/PREGUNTAS-ABIERTAS.md` (Fase 3, pendiente).
