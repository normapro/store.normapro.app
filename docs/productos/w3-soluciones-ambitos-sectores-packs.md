# W3 · Soluciones, ámbitos, sectores y packs

Repo: `store.normapro.app`. Ficha revisada contra el código el 21/10/2026. Rutas de fichero relativas a `src/`. Prefijo de página: `P = app/sites/normapro/`. Prefijo de API: `S = /v1/store`.

Correcciones frente a la propuesta (`docs/FICHAS-DEFINITIVAS.md` §6): `SolucionSeo` no está en esta ficha (es W10). Esta ficha incluye `CaracteristicaCard`, `SolucionCard` y `AmbitosTabsResutls`, que no tienen import.

## 1. Qué hace

Es el catálogo público. Lista soluciones y packs por ámbito y por sector, y pinta la ficha de una solución (con o sin sector) y la ficha de un pack. Cada ficha termina con un CTA que abre el formulario de diagnóstico y con una franja de «otras soluciones».

## 2. Dónde está

### Rutas (todas `'use client'`, línea 1)

| Ruta pública | Fichero |
|---|---|
| `/soluciones` | `P soluciones/page.tsx` (17 líneas) |
| `/todas-las-soluciones` | `P todas-las-soluciones/page.tsx` (19) |
| `/soluciones/[ambito]` | `P soluciones/[ambito]/page.tsx` (46) |
| `/soluciones/[ambito]/[slugSolucion]` | `P soluciones/[ambito]/[slugSolucion]/page.tsx` (321) |
| `/soluciones/[ambito]/packs/[slugPack]` | `P soluciones/[ambito]/packs/[slugPack]/page.tsx` (256) |
| `/soluciones/[ambito]/sector/[sector]` | `P soluciones/[ambito]/sector/[sector]/page.tsx` (45) |
| `/soluciones/[ambito]/sector/[sector]/[slugSolucion]` | `P soluciones/[ambito]/sector/[sector]/[slugSolucion]/page.tsx` (286) |

### Componentes

| Fichero | Papel | Estado |
|---|---|---|
| `components/AmbitosTabs.tsx` (305) | Pestañas de ámbito + listas de soluciones y packs | En uso (4 rutas) |
| `components/SolutionsHero.tsx` (99) | Cabecera con logos de clientes y CTA | En uso |
| `components/SolutionsHeroSector.tsx` (120) | Cabecera de sector con imagen de fondo | En uso |
| `components/solutionsRefered.tsx` (154) | «Otras soluciones que podrían interesarte» y packs | En uso (3 fichas) |
| `components/MultimediaPlayer.tsx` (38) | Vídeo incrustado o imagen | En uso (3 fichas) |
| `components/AmbitoSelectModal.tsx` (60) | Modal «¿En qué ámbito estás interesado?» | En uso: `menu/SolutionsDropdown.tsx:12,138,222` |
| `components/menu/packHighlightedButton.tsx` (37) | Tarjeta de pack destacado del menú | En uso: `menu/SolutionsDropdown.tsx:7,121,207` |
| `libs/icons.ts` (30) | Mapa de texto de icono a icono FontAwesome | En uso: `P …/packs/[slugPack]/page.tsx:19` |
| `components/AmbitosTabsResutls.tsx` (151) | Copia antigua de la lista de soluciones | **Sin import** (código muerto) |
| `components/SolucionCard.tsx` (36) | Tarjeta de pack | **Sin import** (código muerto) |
| `components/CaracteristicaCard.tsx` (0 bytes) | Fichero vacío | **Sin import** (código muerto) |
| `P …/sector/[sector]/[slugSolucion]/paqueteAmbitoSector.tsx` (0 bytes) | Fichero vacío | **Sin import** (código muerto) |

### Tipos

`types/ambito.ts` (5), `types/sector.ts` (9), `types/solucion.ts` (76), `types/pack.ts` (69).

## 3. Flujo

### 3.1 Render y caché

- Todas las rutas son componentes cliente. El `fetch` sale del navegador con `useEffect`. No hay `revalidate`, `cache` ni `generateMetadata`. No hay HTML de la ficha en el primer render del servidor: los títulos salen vacíos hasta que responde la API.
- Los parámetros de ruta se leen con `useParams` (`next/navigation`).

### 3.2 Listados: `AmbitosTabs`

Props (`AmbitosTabs.tsx:17-20`): `sectorSlug?`, `ambitoSlug`.

1. Al montar (`useEffect` con `[]`, `:33-64`) pide `GET S/ambitosWithSolCounter` (con `?sector=` si hay sector distinto de `non-specified`, `:36-40`).
2. Selecciona la pestaña cuyo `slug` coincide con `ambitoSlug`; si no hay, `all` (`:44-47`).
3. Pide `GET S/listsoluciones?ambito=&sector=` (`:78-95`) y `GET S/listpacks?ambito=&sector=` (`:97-114`).
4. Al pulsar una pestaña (`changeParams`, `:66-76`) repite las dos peticiones y cambia la URL con `window.history.pushState` sin navegar.
5. Los enlaces de las listas se construyen con la prop `ambitoSlug`, no con la pestaña activa: soluciones `:151-154,237`, packs `:253`. El `useEffect` de carga no depende de las props (`:64`).
6. Solución: icono por `uriIcon.split(" ")` (`:234-235`); si no son dos palabras usa un icono de reserva. Pack: imagen `/{uriIcon}` sobre `/aura@2x.png` (`:263-270`).
7. Estados: `Cargando soluciones...` (`:221`), `No hay soluciones disponibles.` (`:296`). Error de red: `console.error` y listas vacías (`:89-92,108-111`).

Quién monta `AmbitosTabs`:

| Ruta | Props que pasa | Línea |
|---|---|---|
| `/soluciones` | `sectorSlug={null}` y `ambitoIdSelected={null}` (prop que `Props` no declara; falta `ambitoSlug`) | `P soluciones/page.tsx:11` |
| `/todas-las-soluciones` | `sectorSlug` (estado local, siempre `null`), `ambitoSlug={null}` | `P todas-las-soluciones/page.tsx:7,13` |
| `/soluciones/[ambito]` | `sectorSlug={null}`, `ambitoSlug` de la URL | `P soluciones/[ambito]/page.tsx:19` |
| `/soluciones/[ambito]/sector/[sector]` | `sectorSlug` y `ambitoSlug` de la URL | `P soluciones/[ambito]/sector/[sector]/page.tsx:19` |

### 3.3 Cabeceras

- `SolutionsHero` (`:11-97`): `GET S/clientes?scope=todas-las-soluciones&limit=5` (`:20`). Cada logo enlaza a `cliente.url` (`:59`). Imagen `/logos/{logo}` (`:61`). Texto de presentación en latín de relleno (`:44-48`). Botón de diagnóstico abre `Formulario` (`:81-92`).
- `SolutionsHeroSector` (`:15-118`): `GET S/sector/{slug}` (`:25`) y `GET S/clientes?sector={slug}&maxItems=5` (`:37`). Fondo: `/{backgroundImage}` o `/default-sector.png` (`:55`). Título `titleweb`, texto `descriptionweb`, línea «Productos para {prefijo} {titleweb}» (`:113`).

### 3.4 Página de ámbito y de sector

`soluciones/[ambito]/page.tsx` y `…/sector/[sector]/page.tsx` apilan: cabecera (`SolutionsHero` o `SolutionsHeroSector`), `AmbitosTabs`, `MainTestimoniosSection soloOpiniones` (ficha W2), `HistoriasClientesSection soloUnaHistoria` (ficha W4) y un CTA «Reserva un diagnóstico gratuito» que abre `Formulario` (`:24-40` en las dos).

### 3.5 Ficha de solución sin sector

`P soluciones/[ambito]/[slugSolucion]/page.tsx`:

| Paso | Línea |
|---|---|
| Lee solo `slugSolucion` de `useParams`; el segmento `[ambito]` no se usa | `:30` |
| `GET S/solucion/{slugSolucion}` | `:42` |
| Construye datos de SEO y los pasa a `SolucionSeo` (ficha W10) si hay título, descripción, slug y ámbito | `:48-63`, `:114-117` |
| Migas de pan (`Breadcrumb`, ficha W11) | `:66-77`, `:121` |
| `GET S/testimonios?maxItems=1` | `:94` |
| Bloques: título, subtítulo, problema, multimedia, solución, características (+lista), casos de uso (+lista), beneficios (+lista) | `:130-222` |
| Columna derecha: CTA 1 (texto `firstCtaPragma`, botón `firstCtaTitle` o «Solicita un diagnóstico gratuito») y 1 testimonio | `:239-262` |
| FAQ (`<details>`) | `:270-296` |
| CTA 2 (`secondCtaTitle`, `secondCtaPragma`; el botón usa el texto de `firstCtaTitle`) | `:297-307` |
| `SolutionsRefered ambitoSlug={solucion?.slug_ambito}` | `:311` |
| `Formulario` modal | `:314` |

Imports que no se usan en el fichero: `SolutionsHero` (`:5`), `AmbitosTabs` (`:6`), `Link` (`:11`), `Testimonios` (`:13`), `stringify` (`:21`).

### 3.6 Ficha de solución con sector

`P soluciones/[ambito]/sector/[sector]/[slugSolucion]/page.tsx`. Misma estructura que 3.5, con estas diferencias:

- Lee `slugSolucion` y `sector` (`:22`); `sectorSlug = sector || 'non-specified'` (`:23`).
- `GET S/solucion/{slug}?sectorSlug={sector}` (`:34`). El `useEffect` depende solo de `slugSolucion` (`:57`).
- No monta `SolucionSeo`.
- Migas: último nivel con `data.description` y URL `/soluciones/{slugSolucion}` (`:39-50`).
- Testimonio `?maxItems=1` en `:67`; bloques `:94-233`; CTA 1 `:205-212`; testimonios `:220-223`; FAQ `:236-255`; CTA 2 `:264-271`; `SolutionsRefered` `:277`; `Formulario` `:280`.
- Imports sin uso: `SolutionsHero` (`:5`), `AmbitosTabs` (`:6`), `Link` (`:11`), `Testimonios` (`:13`).

### 3.7 Ficha de pack

`P soluciones/[ambito]/packs/[slugPack]/page.tsx`:

| Paso | Línea |
|---|---|
| `useParams` → `ambito`, `slugPack` | `:23` |
| `GET S/packs/{slugPack}?ambito={ambito}` | `:35` |
| Migas: Home > Soluciones > `{ambito}` (el slug, no el nombre) > título del pack | `:40-55` |
| `GET S/testimonios?maxItems=1` | `:67` |
| `SolucionSeo` con `price="0.00"` y una imagen fija | `:85-96` |
| Bloques (descripción, título, subtítulo, problema, multimedia, solución, características, casos de uso, beneficios) | `:105-149` |
| «Soluciones que incluye»: enlace a `/soluciones/{pack.slug_ambito}/{sol.slug}` y icono por `iconMap[sol.icon]` (reserva: engranaje) | `:150-176` |
| Bloque de consultoría (`consultoriaTitle`, `consultoriaDescription`) | `:179-185` |
| CTA 1 y 1 testimonio | `:191-210` |
| FAQ | `:215-232` |
| CTA 2 (`secondCtaTitle`/`secondCtaPragma`; el botón usa `firstCtaTitle`) | `:234-244` |
| `SolutionsRefered ambitoSlug={ambito}` | `:247` |
| `Formulario` | `:250` |

La API devuelve también `fraseCierre` (`api-store…/models/storeModel.ts:1215`). La ficha no lo pinta.

### 3.8 «Otras soluciones»: `solutionsRefered.tsx`

- Props: `sectorSlug?`, `ambitoSlug` (`:16-19`). Al montar y al cambiar las props pide `GET S/listsoluciones?ambito=&sector=` y `GET S/listpacks?ambito=&sector=` (`:32-73`).
- Enlaces: soluciones `/soluciones/{sol.slug_ambito}/{sol.slug}` (`:90`), packs `/soluciones/{pack.slug_ambito}/packs/{pack.slug}` (`:105`).
- Primer render: `ambitoSlug` aún no existe en las fichas, usa `all`; luego repite la petición con el ámbito real.

### 3.9 Cadena endpoint → tabla (API, solo lo abierto)

| Endpoint | Tablas | `storeModel.ts` |
|---|---|---|
| `GET /ambitosWithSolCounter` | `storeAmbitos` + `storeSolucionesAmbitos` (todos); con sector: `storeAmbitos` + `storeSolucionesAmbitosSectores` + `storeSectores` | `:186-212` |
| `GET /sector/:sectorSlug` | `storeSectores` (id, nombre, slug, prefijo, `descriptionweb`, `titleweb`, `backgroundImage`) | `:240-246` |
| `GET /listsoluciones` | `storeSoluciones` (+ `storeSolucionesAmbitos`, `storeAmbitos`, `storeSolucionesAmbitosSectores`, `storeSectores` según combinación) | `:611-671` |
| `GET /listpacks` | `storePacks` + `storeAmbitos` (+ `storePacksSectores`, `storeSectores`); `LIMIT` por `maxItems` (por defecto 6, `storeController.ts:551`) | `:686-765` |
| `GET /solucion/:slug` | `storeSoluciones` + `storeSolucionesAmbitos` (+ `…Sectores`) y los pivotes de problemas, FAQ, beneficios, características y casos de uso | `:813-1040` |
| `GET /packs/:slug` | `storePacks`, `storePacksSoluciones`, `storePacksFaq`, `storePacksCaracteristicas`, y las de beneficios y casos de uso | `:1164-1220`, `:1226-1262` |
| `GET /testimonios` | Ver ficha W7 | `:316-333` |
| `GET /clientes` | Ver ficha W7 | `:279-295` |

Qué campos devuelve `listsoluciones` según los parámetros (`storeModel.ts`):

| `ambito` / `sector` | Devuelve `uriIcon` | Devuelve `slug` | Devuelve `slug_ambito` |
|---|---|---|---|
| `all` / `non-specified` | Sí | Sí | No (`:619-623`) |
| otro ámbito / `non-specified` | Sí | Sí | Sí (`:624-640`) |
| otro ámbito / otro sector | Sí | Sí | Sí (`:647-669`) |
| `all` / `all` | No (devuelve `icon`) | No | No (`:613-618`) |
| `all` / otro sector | No (devuelve `icon`) | No | No (`:641-646`) |

## 4. Endpoints que consume

| Verbo | Ruta (tras `/v1/store`) | Fichero:línea |
|---|---|---|
| GET | `/ambitosWithSolCounter[?sector=]` | `components/AmbitosTabs.tsx:40` |
| GET | `/listsoluciones?ambito=&sector=` | `components/AmbitosTabs.tsx:82-85`; `components/solutionsRefered.tsx:36-39` |
| GET | `/listpacks?ambito=&sector=` | `components/AmbitosTabs.tsx:101-104`; `components/solutionsRefered.tsx:55-58` |
| GET | `/clientes?scope=todas-las-soluciones&limit=5` | `components/SolutionsHero.tsx:20` |
| GET | `/clientes?sector=&maxItems=5` | `components/SolutionsHeroSector.tsx:37` |
| GET | `/sector/:slug` | `components/SolutionsHeroSector.tsx:25` |
| GET | `/solucion/:slug` | `P soluciones/[ambito]/[slugSolucion]/page.tsx:42` |
| GET | `/solucion/:slug?sectorSlug=` | `P soluciones/[ambito]/sector/[sector]/[slugSolucion]/page.tsx:34` |
| GET | `/packs/:slug?ambito=` | `P soluciones/[ambito]/packs/[slugPack]/page.tsx:35` |
| GET | `/testimonios?maxItems=1` | `…/[slugSolucion]/page.tsx:94`; `…/sector/…/[slugSolucion]/page.tsx:67`; `…/packs/[slugPack]/page.tsx:67` |
| POST | `/leads` | vía `Formulario` (ficha W8), abierto desde todas las rutas de esta ficha |

Parámetros que la API no lee: `scope` y `limit` de `/clientes` (`storeController.ts:392-410` solo lee `maxItems` y `sector`; sin `maxItems` devuelve 5) y `ambito` de `/packs/:slug` (`storeController.ts:1303-1308` solo lee `slug`).

`AmbitoSelectModal`, `PackHighlightedButton` y `libs/icons.ts` no llaman a la API. `PackHighlightedButton` enlaza a `/soluciones/{slug_ambito}/packs/{slug}` (`:10`).

## 5. Datos

### Tipos de la store

- `Ambito` (`types/ambito.ts:1-5`): `id_ambito`, `description`, `slug`, `total_soluciones?`.
- `Sector` (`types/sector.ts:1-9`): `id_sector`, `description`, `slug`, `backgroundImage?`, `titleweb?`, `descriptionweb?`, `prefijo?`.
- `ItemListSolucion` (`types/solucion.ts:1-10`) y `Solucion` (`:12-50`): `Solucion` incluye 14 textos anulables (título, subtítulo, problema, solución, características, casos de uso, beneficios, CTA 1 y 2), `thread_id` y los arrays `problemas`, `faqs`, `beneficios` (anulable), `caracteristicas`, `casosdeuso`. Hijos: `Problema`, `Faq`, `Beneficio`, `Caracteristica` (`:52-71`) y `CasosDeUso` con la clave `id_casosdeuso` (`:73-76`).
- `ItemListPack` (`types/pack.ts:1-12`) y `Pack` (`:14-70`). `Pack.casosdeuso` usa `id_casodeuso` (`:67`).

### Contrato

Cada tipo tiene copia en API, editor y store, y las tres divergen (`docs/CONTRATOS.md` §1 y §1.1: Ámbito, Sector, Solución, Pack). Puntos que afectan a esta ficha:

- `id_casodeuso` es la columna real (`storeModel.ts:1024-1025`). `types/solucion.ts:74` de la store dice `id_casosdeuso`; la ficha de solución usa el índice como `key` (`…/[slugSolucion]/page.tsx:194`) y no lee ese campo.
- La API devuelve `uriIcon` en solución (`storeModel.ts:621`); el editor lo llama `icon`.
- `Pack.soluciones` está tipado como `{slug, descripcion}[]` (`types/pack.ts:45-48`). La API devuelve además `icon` (`storeModel.ts:1294`); la página lo lee como `sol.icon` (`…/packs/[slugPack]/page.tsx:161,163`).
- `Pack` de la store no declara `beneficiosTitle`, `beneficiosPragma`, `solucionTitle`, `solucionPragma`, `caracteristicasTitle`, `caracteristicasPragma`, `casosdeusoTitle`, `casosdeusoPragma` (la página los lee en `:123-146`); la API los devuelve (`storeModel.ts:1181-1205`). `Pack.titleweb` y `fraseCierre` tampoco están declarados.
- Las comprobaciones de tipos no frenan el build (`next.config.ts`, ficha W1).

### Props de los componentes

| Componente | Props |
|---|---|
| `AmbitosTabs` | `sectorSlug?: string \| undefined \| null`, `ambitoSlug: string \| null` |
| `SolutionsHeroSector` | `sectorSlug: string` |
| `SolutionsRefered` | `sectorSlug?`, `ambitoSlug: string \| undefined \| null` |
| `MultimediaPlayer` | `uri?`, `typeId?` (`typeId === 1` → iframe de vídeo; otro valor → `<img>`) (`MultimediaPlayer.tsx:1-4,16-33`) |
| `AmbitoSelectModal` | `isOpen`, `onClose`, `ambitos[]`, `onSelectAmbito(slug)` |
| `PackHighlightedButton` | `solucion: Solucion` |

## 6. Reglas de negocio y permisos

- Sin autenticación en todas las llamadas.
- La URL pública de una solución usa el `slug` de `storeSolucionesAmbitos` (`COALESCE(sa.slug, s.slug)`, `storeModel.ts:629-630`; `docs/GLOSARIO.md` §4 punto 9). El segmento `[ambito]` de la URL no se envía a la API en la ficha de solución.
- Una ficha de solución con `sectorSlug` distinto de `non-specified` lee `storeSolucionesAmbitosSectores` (`storeModel.ts:895-899`).
- La API no devuelve 404 propio en `/solucion/:slug` ni en `/packs/:slug` (`docs/CONTRATOS.md` §2.3). Con un slug que no existe, `/packs/:slug` falla al leer la fila (`storeModel.ts:1210-1216`) y la página queda vacía.
- Listas de packs: `listpacks` limita a 6 si no se envía `maxItems` (`storeController.ts:551-554`). `AmbitosTabs` y `SolutionsRefered` no lo envían.
- Multimedia: `typeId === 1` se trata como enlace de vídeo con `v=` en la URL (`MultimediaPlayer.tsx:6-9`); cualquier otro valor se pinta como imagen.
- CTA: el texto del botón sale de `firstCtaTitle`; si falta, «Solicita un diagnóstico gratuito».

## 7. Zonas de riesgo

- `AmbitosTabs` lo usan 4 rutas y `SolutionsRefered` 3 fichas. Un cambio de props o de parámetros de la API afecta a todas.
- Las fichas de solución (con y sin sector) son dos copias casi iguales. Un cambio de maquetación debe hacerse en las dos.
- Cambiar el esquema de la URL de pack o de solución obliga a tocar: `AmbitosTabs.tsx:151-154,237,253`, `solutionsRefered.tsx:90,105`, `packHighlightedButton.tsx:10`, `MainPacksSection.tsx:75` (ficha W2), las migas de pan de las tres fichas y la lógica de `Navbar`/menús (ficha W11).
- `listsoluciones` cambia de campos según los parámetros (tabla de §3.9). Un componente que lea `uriIcon`, `slug` o `slug_ambito` depende de la combinación que pida.
- Tipos de `Pack` y `Solucion`: ver «Contrato» en §5 y `docs/CONTRATOS.md`. Tocar uno exige tocar sus tres copias.
- Seguridad: regla de diseño que hoy no se cumple; detalle en el informe restringido. (Aplica a la URL de multimedia que llega de la base.)

## 8. Cómo probarlo

1. Arrancar la API y la store (`docs/ENTORNO.md`; `npm run dev` en la store).
2. `/soluciones`: deben salir las pestañas de ámbito, con contador. Pulsar una: cambia la URL a `/soluciones/{ámbito}` sin recargar y se repiten las dos listas.
3. `/soluciones/{ámbito}`: la pestaña del ámbito debe salir seleccionada.
4. `/soluciones/{ámbito}/sector/{sector}`: cabecera con imagen y título del sector, logos de clientes, listas filtradas.
5. Abrir una solución desde la lista: la ficha debe pintar título, bloques, FAQ, CTA 1 y 2 y «Otras soluciones».
6. Abrir una solución desde un sector: debe pedir `?sectorSlug=` (pestaña Red del navegador).
7. Abrir un pack: debe listar «Soluciones que incluye» con enlace y, si existe, el bloque de consultoría.
8. Pulsar cada CTA: debe abrir el modal `Formulario` (ficha W8).
9. Con slug inventado (`/soluciones/x/zzz` y `/soluciones/x/packs/zzz`): anotar qué pinta cada página (ver §9).
10. Comprobar en la pestaña Red cuántos packs trae `listpacks` en cada pestaña.
11. API caída: ver `docs/OBSERVABILIDAD.md` §3.1 (fichas vacías, `console.error`).

## 9. Dudas / no localizado

- `ambitoIdSelected` (`soluciones/page.tsx:11`): prop que `AmbitosTabs` no declara. No localizado quién la usaba.
- Texto de `SolutionsHero.tsx:44-48`: es texto de relleno. No localizado el texto definitivo.
- Botón del segundo CTA: usa `firstCtaTitle` (`…/[slugSolucion]/page.tsx:305`, `…/sector/…:271`, `…/packs/…:242`). No localizado si debe usar un texto propio.
- Para `ambito=all` con sector: la consulta de `storeModel.ts:643-644` usa `as` como alias de tabla. No se ha ejecutado contra MySQL; no localizado si funciona.
- `Pack` con `slug_ambito` nulo (pack sin ámbito): las páginas arman URLs con ese valor. No localizado el caso esperado.
- Los 4 ficheros sin import (`AmbitosTabsResutls`, `SolucionCard`, `CaracteristicaCard`, `paqueteAmbitoSector`): no localizado quién decide si se borran.
- `thread_id` (`types/solucion.ts:40`): ningún componente de esta ficha lo lee. No localizado su uso.
- Imágenes de `public/` citadas por las tablas (`/{uriIcon}`, `/logos/…`, fondos de sector): no se ha comprobado que existan.

## Correcciones de la revisión contra el código (21/10/2026)

### Afirmaciones incorrectas
- Dice: fondo de sector «`/{backgroundImage}` o `/default-sector.png`» → Correcto: el valor por defecto da `//default-sector.png`, una URL con protocolo implícito; con cadena vacía `??` no entra y queda `url('/')` (`SolutionsHeroSector.tsx:55`).
- Dice: la API devuelve `fraseCierre` en `storeModel.ts:1215` → Correcto: la columna se selecciona en `storeModel.ts:1205`; `:1215` es `pack.soluciones = …`. La página no la pinta.

### Cifras o líneas a unificar
- Unificar la línea de `fraseCierre` (ficha, línea 134) a `storeModel.ts:1205`.
- Tramo «`M:1210-1216`» → `1212-1216`. `ambitosWithSolCounter` 186-210; `sector/:slug` 240-244; `listsoluciones` 611-672; `packs/:slug` con auxiliares hasta :1284.
- «14 textos anulables» de `Solucion`: también son anulables `titleweb` (:24) y `beneficiosTitle/Pragma` (:45-46).
- En `AmbitosTabs` no existe botón «all»; solo los ámbitos de la API (:178-201). En :253 no hay `?? "all"`.

### Errores funcionales de esta ficha
- ST-API-14: `listsoluciones` con ámbito `all` y un sector falla (alias `as`) ([detalle](../../../docs/ERRORES-DETECTADOS.md)).
- ST-API-15: ficha de solución sin fila de ámbito devuelve `id_solucion` nulo ([detalle](../../../docs/ERRORES-DETECTADOS.md)).
- ST-API-16: slug o id inexistente responde 500 con cuerpo vacío ([detalle](../../../docs/ERRORES-DETECTADOS.md)).
- ST-WEB-21: enlaces de pack con `undefined` o `null` en `/soluciones` ([detalle](../../../docs/ERRORES-DETECTADOS.md)).
- ST-WEB-22: fondo de sector por defecto roto ([detalle](../../../docs/ERRORES-DETECTADOS.md)).
- ST-WEB-23: última miga de solución apunta a una ruta equivocada ([detalle](../../../docs/ERRORES-DETECTADOS.md)).
- ST-WEB-24: icono de reserva inválido y fallo si falta `uriIcon` ([detalle](../../../docs/ERRORES-DETECTADOS.md)).
- ST-WEB-25: enlaces transitorios `undefined` en «Otras soluciones» ([detalle](../../../docs/ERRORES-DETECTADOS.md)).
- ST-WEB-26: máximo 6 packs en los listados de ámbito ([detalle](../../../docs/ERRORES-DETECTADOS.md)).
- ST-WEB-27: `AmbitosTabs` y la ficha con sector no reaccionan a cambios de parámetros ([detalle](../../../docs/ERRORES-DETECTADOS.md)).
- ST-WEB-11: el SEO por página no funciona ([detalle](../../../docs/ERRORES-DETECTADOS.md)).

### Afirmaciones no verificables
- `SolucionSeo` va en W10, `Navbar` y menús en W11, las tres copias divergentes de tipos (`docs/CONTRATOS.md`), `uriIcon` del editor y las imágenes de `public/`.

- Hay reglas de diseño que hoy no se cumplen; detalle en el informe restringido.
