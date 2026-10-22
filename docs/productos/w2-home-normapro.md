# W2 · Home NormaPRO

Repo: `store.normapro.app`. Ruta pública: `/`. Ficha revisada contra el código el 21/10/2026. Rutas de fichero relativas a `src/`.

## 1. Qué hace

Pinta la página de inicio del sitio NormaPRO. Es una pila de secciones: hero con diagnóstico gratuito, carrusel de logos de clientes, vídeo, packs por categoría, aplicaciones, formación, testimonios, eventos, últimas noticias y últimos informes.

No hay lógica de negocio propia. Cada sección pide sus datos al navegador.

## 2. Dónde está

| Pieza | Fichero | Líneas |
|---|---|---|
| Página (ruta `/`) | `app/sites/normapro/page.tsx` | 16-119 |
| Hero + CTA | `components/MainHeroCarousel.tsx` | 20-112 |
| Contador de usuarios | `components/HeroUserCount.tsx` | 5-29 |
| Packs por categoría | `components/MainPacksSection.tsx` | 11-101 |
| Eventos | `components/MainEventosSection.tsx` | 7-98 |
| Testimonios | `components/MainTestimoniosSection.tsx` | 13-81 |
| Tipo `Evento` | `types/evento.ts` | 1-5 |
| Sin import (código muerto) | `components/MainClientesCarrousel.tsx`, `components/MainParallaxSection.tsx`, `components/MainSolucionesSection.tsx` | ver §3.3 |

Secciones de la home que pertenecen a otras fichas: `MainAplicacionesSection` y `MainFormacionSection` (W5), `ActualidadGridSection` y `InformesGridSection` (W6), `ClientCarousel` (W7), `Formulario` (W8), `FadeInOnScroll` (W14).

## 3. Flujo

### 3.1 Render

- `page.tsx:1` es `'use client'`. Toda la home se renderiza en el cliente (hidratación). No hay `fetch` en el servidor para esta ruta.
- Sin caché ni revalidación de Next: todos los datos salen de `fetch` en el navegador. Aplica la caché HTTP del navegador.
- El layout lo pone `app/sites/normapro/layout.tsx` (ficha W1).

### 3.2 Orden de las secciones (`page.tsx`)

| Orden | Sección | Línea |
|---|---|---|
| 1 | `MainHeroCarousel` | 19 |
| 2 | `ClientCarousel scope="all" claim=""` | 20 |
| 3 | Bloque de vídeo incrustado (iframe de vídeo, con `framer-motion`) | 23-56 (iframe 44-52) |
| 4 | `MainPacksSection` | 59 |
| 5 | `MainAplicacionesSection` | 63 |
| 6 | `MainFormacionSection` | 67 |
| 7 | `MainTestimoniosSection` | 71 |
| 8 | `MainEventosSection` | 75 |
| 9 | Actualidad: `ActualidadGridSection onlyLatest hideDescriptionAndReadMore` | 93-96 |
| 10 | Informes: `InformesGridSection showOnlyLastThree` | 114 |

Cada bloque 4-10 va envuelto en `FadeInOnScroll`. El texto del vídeo, el título «Actualidad» y el título «Informes» están escritos en `page.tsx` (líneas 39-41, 82-84, 105).

### 3.3 Sección → fetch → endpoint → tabla

| Sección | Componente:línea del fetch | Endpoint (`/v1/store`) | Tabla (consulta) |
|---|---|---|---|
| Hero: contador de usuarios | `HeroUserCount.tsx:9` | API externa distinta (no es la API de la store) | No aplica |
| Hero: botón «Solicita un diagnóstico gratuito» | `MainHeroCarousel.tsx:55-60` abre `Formulario` (`:107-109`) | `POST /leads` (ficha W8) | `leads` |
| Carrusel de logos | `shared/ClientCarousel.tsx:39` | `GET /clientes?maxItems=100&scope=all` | `storeClientes`, orden `RAND()` (`api-store…/models/storeModel.ts:279-283`) |
| Packs | `MainPacksSection.tsx:17` | `GET /packscategoria` | `storePacks` + `storeAmbitos` + `storeCategoriasPacks` (`storeModel.ts:779-796`) |
| Testimonios | `MainTestimoniosSection.tsx:21` | `GET /testimonios` (sin `maxItems`: la API usa 9, `storeController.ts:721-722`) | `storeClientesTestimonios` + `storeClientes`, `RAND()` (`storeModel.ts:316-333`) |
| Eventos | `MainEventosSection.tsx:14` | `GET /eventos` | `storeEventos` con `fecha >= NOW()`, orden ascendente (`storeModel.ts:1392-1397`) |
| Noticias | `ActualidadGridSection.tsx:96` | `GET /actualidad` | Ver ficha W6 |
| Informes | `informes/InformesGridSection.tsx:40` | `GET /informes` | Ver ficha W6 |
| Aplicaciones | `MainAplicacionesSection.tsx:16` | `GET /aplicaciones` | Ver ficha W5 |
| Formación | `MainFormacionSection.tsx:15` | API externa distinta | Ver ficha W5 |

URLs: todas salen de `config/api.ts` (`API_ENDPOINTS`, ficha W14). No se copia ningún valor a esta ficha.

### 3.4 Detalles de cada componente propio

- `MainHeroCarousel`: dos juegos de imágenes de `public/main/` (escritorio `:6-12`, móvil `:14-18`). Estado local `openModal` (`:21`). Pinta `HeroUserCount` dos veces: escritorio `:75`, móvil `:102`.
- `HeroUserCount`: pide el número de usuarios (`:9-20`), lo formatea con `toLocaleString("es-ES")` (`:15`). Si el `fetch` falla, muestra el valor fijo escrito en el código (`:19`). Si responde sin el campo `users`, se queda en «...» (`:13`, `:25`). También lo usa `app/sites/normapro/historias/page.tsx:15`.
- `MainPacksSection`: estado `packs` y `selectedCategoria` (`:12-13`). Las pestañas salen de los valores distintos de `categoria` más «Todos» (`:25`). Filtra en el cliente (`:28-31`). Cada tarjeta enlaza a `/soluciones/{slug_ambito}/packs/{slug}` (`:75`). Icono: `/main/{uriIcon}` o `/main/default-icon.png` (`:89`).
- `MainEventosSection`: prop `isInstituto` (`:7`; la usa `app/sites/instituto/page.tsx`). Calcula día, mes y hora con `Date` del navegador (`:30-36`). Devuelve `null` mientras carga (`:38`). Sin eventos: texto «No hay eventos programados en este momento.» (`:55-58`). El botón «Reserva tu plaza» está en `:85-87`; no tiene manejador de clic.
- `MainTestimoniosSection`: prop `soloOpiniones` (`:9-11`). Con `true` muestra 3 (`:37`) y titular a la izquierda. Con `false` muestra todos los recibidos, en `Masonry` de 3, 2 o 1 columnas (`:39-43`), y un enlace a `/historias` (`:72-78`). La usan también `/nosotros` (`nosotros/page.tsx:1`) y las rutas de ámbito y sector (ficha W3). La tarjeta es `TestimonioCard` (ficha W7).

### 3.5 Código muerto de esta ficha (sin ningún `import` en `src/`)

Comprobado con búsqueda de `import` en todo `src/`.

| Fichero | Qué es | Detalle |
|---|---|---|
| `components/MainClientesCarrousel.tsx` | Carrusel de logos antiguo con contador de usuarios | Define su propia constante de URL base (`:6`). Pide `GET /v1/store/clientes` y `GET /v1/store/usersCount` (`:17-18`). La ruta `usersCount` no existe en `api-store…/routes/v1/store.ts`. Imagen: `/clientes/{logo}` (`:50`). |
| `components/MainParallaxSection.tsx` | Sección parallax con título | Usa `react-scroll-parallax` y una imagen remota fija (`:7-12`). Lo que se ve hoy en esa franja está inline en `page.tsx:23-56`. |
| `components/MainSolucionesSection.tsx` | Versión anterior de la sección de packs, con botón «Contratar ahora» y modal por `?pack=` | `GET /mainpacks` (`:32`). Era el único consumidor de ese endpoint. |

Además, `page.tsx:4` importa `MainConsultoriaSection` y no la renderiza. La sección de consultoría no sale en la home (sí en Instituto; ficha W5).

## 4. Endpoints que consume

| Verbo | Ruta (tras `/v1/store`) | Fichero:línea |
|---|---|---|
| GET | `/packscategoria` | `components/MainPacksSection.tsx:17` |
| GET | `/testimonios` | `components/MainTestimoniosSection.tsx:21` |
| GET | `/eventos` | `components/MainEventosSection.tsx:14` |
| GET | `/clientes?maxItems=100&scope=all` | `components/shared/ClientCarousel.tsx:39` (ficha W7) |
| GET | `/actualidad` | `components/ActualidadGridSection.tsx:96` (ficha W6) |
| GET | `/informes` | `components/informes/InformesGridSection.tsx:40` (ficha W6) |
| GET | `/aplicaciones` | `components/MainAplicacionesSection.tsx:16` (ficha W5) |
| POST | `/leads` | vía `Formulario.tsx` (ficha W8) |
| GET | API externa de contador de usuarios | `components/HeroUserCount.tsx:9` |
| GET | API externa de formación | `components/MainFormacionSection.tsx:15` (ficha W5) |
| GET (sin import) | `/clientes`, `/usersCount` | `components/MainClientesCarrousel.tsx:17-18` |
| GET (sin import) | `/mainpacks` | `components/MainSolucionesSection.tsx:32` |

Rutas de la API: `api-store…/routes/v1/store.ts` (`/packscategoria` :48, `/testimonios` :58, `/eventos` :118).

## 5. Datos

### Props

| Componente | Props |
|---|---|
| `MainEventosSection` | `isInstituto?: boolean` (por defecto `false`) |
| `MainTestimoniosSection` | `soloOpiniones?: boolean` (por defecto `false`) |
| `MainHeroCarousel`, `MainPacksSection`, `HeroUserCount` | Ninguna |

### Tipos

- `Evento` (`types/evento.ts:1-5`): `id_evento: number`, `title: string`, `description: string`, `fecha: string`. El comentario del fichero fija el formato `2026-04-13T13:15:00`.
- `ItemListPack` (`types/pack.ts:1-12`): lo usa `MainPacksSection.tsx:6`. Campos: `id_pack`, `description`, `shortDescription`, `uriIcon`, `slug`, `id_ambito?`, `id_sector?`, `slug_ambito?`, `slug_sector?`, `categoria?`. La API devuelve además `descriptionForHighLight` (`storeModel.ts:787`), que este tipo no declara.
- `TestimonioConCliente` (`types/testimonio.ts:14-16`): lo usa `MainTestimoniosSection.tsx:6`. Ficha W7.
- Tipo local sin `types/`: `MainClientesCarrousel.tsx:9` (sin import).

### Contrato

- Copias de `Evento`: API `app/types/evento.ts`, editor `src/types/evento.ts`, store `src/types/evento.ts`. El editor añade `hora?`. Detalle en `docs/CONTRATOS.md` §1.1 («Evento»).
- Copias de `ItemListPack`: `docs/CONTRATOS.md` §1.1 («Pack»). La de la store no tiene `descriptionForHighLight`.
- La categoría del pack que ve la home sale de `storeCategoriasPacks` (join por `id_categoria`, `storeModel.ts:792`). El editor escribe `storePacks.categoria` como texto (`docs/GLOSARIO.md` §4, punto 3). Las dos no están conectadas.

## 6. Reglas de negocio y permisos

- Sin autenticación: todas las llamadas son públicas.
- Packs: los que salen son todos los de `storePacks`, sin filtro de publicación ni orden (`storeModel.ts:779-796`, sin `ORDER BY`). La pestaña «Todos» es fija; el resto depende de los textos de `storeCategoriasPacks`.
- Packs sin categoría: aparecen en «Todos» y en ninguna otra pestaña (`MainPacksSection.tsx:25,28-31`).
- Eventos: solo los futuros o en curso (`fecha >= NOW()`, `storeModel.ts:1396`). El filtrado es del servidor, no del componente.
- Testimonios: orden aleatorio en cada petición. Cantidad por defecto 9 (la home no envía `maxItems`).
- Contador de usuarios: valor de reserva fijo en el código cuando falla la llamada (`HeroUserCount.tsx:19`). No es un dato de la base.
- Noticias e informes de la home: los 3 primeros que entregue la API (`ActualidadGridSection.tsx:127`, `InformesGridSection.tsx:54`). El orden de la API es por id descendente (`storeModel.ts:1445`, `:448`).
- Textos de marketing (hero, títulos de sección) están escritos en el código: `MainHeroCarousel.tsx:50-54`, `MainPacksSection.tsx:35-38,45-50`, `page.tsx:39-41`.

## 7. Zonas de riesgo

- Cambiar el nombre de una categoría en el editor cambia las pestañas de la home sin tocar código. Un pack sin `id_categoria` no sale en ninguna pestaña.
- `MainTestimoniosSection` y `MainEventosSection` se reutilizan fuera de la home (ámbitos, `/nosotros`, Instituto). Un cambio de props o de estilo afecta a esas páginas.
- Los tres componentes sin import no deben borrarse sin acuerdo de Juanma; tampoco deben tomarse como referencia del diseño actual.
- Los textos de enlace a otros dominios y los identificadores fijos (vídeo, valor de reserva) están en el código, no en configuración.
- Seguridad: regla de diseño que hoy no se cumple; detalle en el informe restringido. (Aplica a las dos llamadas a la API externa y al iframe.)

## 8. Cómo probarlo

1. Arrancar la API y la store en local (`docs/ENTORNO.md` en la carpeta padre). La store: `npm run dev` (`package.json`, script `dev`).
2. Abrir `/`. Debe verse el hero, los logos, el vídeo y las secciones 4-10 de §3.2.
3. Packs: pulsar cada pestaña de categoría. La tarjeta debe enlazar a `/soluciones/{ámbito}/packs/{slug}`.
4. Eventos: con un evento futuro en `storeEventos`, comprobar día, mes y hora. Sin eventos futuros, debe salir el texto de «No hay eventos programados».
5. Testimonios: recargar varias veces. El orden debe cambiar.
6. API caída: parar la API y recargar. Anotar qué secciones quedan vacías y si la página sigue pintándose (ver §9 y `docs/OBSERVABILIDAD.md` §3.1).
7. Hero: pulsar el botón. Debe abrir el modal `Formulario`.
8. Comprobar con `npm run build` que compila (el build no falla por tipos ni lint, `next.config.ts`; ficha W1).

## 9. Dudas / no localizado

- Destino del botón «Reserva tu plaza» (`MainEventosSection.tsx:85`): el botón no tiene acción. No localizado qué debe hacer.
- Zona horaria de `fecha`: el componente construye `new Date(evento.fecha)` en el navegador (`:31`). No se ha comprobado en ejecución en qué formato llega la fecha desde MySQL ni si la hora mostrada coincide con la guardada.
- Fuente del contador de usuarios: es una API externa a este proyecto. No localizado quién la mantiene ni qué devuelve exactamente.
- `MainClientesCarrousel`, `MainParallaxSection` y `MainSolucionesSection`: no localizado quién decidió dejarlos sin uso ni si hay que recuperarlos.
- `page.tsx:4` importa `MainConsultoriaSection` sin renderizarla: no localizado si la consultoría debe volver a la home de NormaPRO.
- Imágenes de la home (`public/main/*`, `public/logos/*`): no se ha comprobado que existan todos los ficheros que citan los datos.

## Correcciones de la revisión contra el código (21/10/2026)

### Afirmaciones incorrectas
- Dice: «Todas las URLs salen de `config/api.ts`» → Correcto: dos no; `HeroUserCount.tsx:9` y `MainFormacionSection.tsx:15` llevan la URL escrita en el código.
- Dice: «Cambiar el nombre de una categoría en el editor cambia las pestañas de la home» → Correcto: el editor no gestiona `storeCategoriasPacks`; las pestañas salen de `storeCategoriasPacks.description` y solo se cambian en BD (`storeModel.ts:788,792`).
- Dice: «Un pack sin `id_categoria` no sale en ninguna pestaña» → Correcto: sale en «Todos» (`MainPacksSection.tsx:29-30`); no sale en ninguna otra.

### Cifras o líneas a unificar
- Función `Home` en `page.tsx:16-118` (la ficha dice 16-119). `types/evento.ts` 1-6. `MainEventosSection.tsx` 7-98, con `export default` en :100.
- `RAND()` de clientes en `storeModel.ts:281`. Joins de packs en 790-792; la consulta acaba en :803. `WHERE` de eventos en :1396.
- El componente sin uso se llama `MainClienteCarrousel` (sin «s»); tipo local en :9.
- `MainConsultoriaSection` está importada en `page.tsx:4` y no se renderiza ahí; sí se renderiza en `instituto/page.tsx:22`.
- `HeroUserCount`: el `catch` solo cubre fallo de red o JSON roto. Una respuesta HTTP de error con JSON válido sin `users` deja «...».

### Errores funcionales de esta ficha
- ST-WEB-20: texto invisible sin eventos en Instituto ([detalle](../../../docs/ERRORES-DETECTADOS.md)).
- ST-WEB-14: una respuesta de error de la API tumba listados; aquí en `MainPacksSection`, `MainConsultoriaSection` y `MainFormacionSection` ([detalle](../../../docs/ERRORES-DETECTADOS.md)).
- ST-API-13: el editor guarda `categoria` como texto y la store filtra por `id_categoria` ([detalle](../../../docs/ERRORES-DETECTADOS.md)).
- ST-WEB-42: «Reserva tu plaza» no tiene acción (`MainEventosSection.tsx:85-87`) ([detalle](../../../docs/ERRORES-DETECTADOS.md)).
- ST-API-03: `e.status | 500` y `{error: e}` vacío en los controladores ([detalle](../../../docs/ERRORES-DETECTADOS.md)).

### Afirmaciones no verificables
- `docs/CONTRATOS.md` y `docs/GLOSARIO.md`, zona horaria de `fecha`, API externa del contador y de formación, imágenes de `public/` y pasos 2-7 de `## 8`.

- Hay reglas de diseño que hoy no se cumplen; detalle en el informe restringido.

## Actualización tras el PR del 21/10/2026

Código comparado: `main` `8dc6ec9` frente a `origin/main` `0817fe9` (PR #19). Estado de todos los ids en [ACT-store.md](../../../docs/revision/ACT-store.md). No probado en ejecución.

### Citas rotas
- `components/MainSolucionesSection.tsx` ya no existe (§2, §3.5, §4, §9, correcciones). La clave `MAINPACKS` de `config/api.ts:20` queda sin ningún uso.

### Citas desplazadas
| Antes | Ahora |
|---|---|
| `app/sites/normapro/page.tsx:16-119` (la página) | `components/home/HomeNormapro.tsx:16-118`. Misma numeración que antes desde la línea 16 |
| `page.tsx:1` (`'use client'`) | `HomeNormapro.tsx:1`. El `page.tsx` actual es de servidor y ocupa `:13-15` |
| `page.tsx:19`, `:20`, `:23-56`, `:44-52`, `:59`, `:63`, `:67`, `:71`, `:75`, `:93-96`, `:114` | las mismas líneas en `HomeNormapro.tsx` |
| `page.tsx:39-41`, `:82-84`, `:105` (textos) | las mismas líneas en `HomeNormapro.tsx` |
| `page.tsx:4` (import de `MainConsultoriaSection` sin render) | `HomeNormapro.tsx:4` |
| `HeroUserCount.tsx:5-29`, `:15`, `:19` | `:5-28`, `:14`, `:18` (se quitó un `console.log`). `:9` no cambia |
| `app/sites/normapro/historias/page.tsx:15` (usa `HeroUserCount`) | `components/historias/HistoriasListado.tsx:15` |
| `app/sites/normapro/nosotros/page.tsx:1` (usa `MainTestimoniosSection`) | `:3` |
| `app/sites/instituto/page.tsx` (usa `MainEventosSection isInstituto`, `MainConsultoriaSection` en `:22`) | `components/home/HomeInstituto.tsx` (mismas líneas: `:22`, `:32`) |

### Afirmaciones obsoletas
- «`page.tsx:1` es `'use client'`; toda la home se renderiza en el cliente» (§3.1): la ruta `/` es ahora un `page.tsx` de servidor (`normapro/page.tsx:13-15`) que monta `HomeNormapro` (cliente). Los metadatos van en servidor (`page.tsx:7-11`: título «Digitalización sin límites \| NormaPro» y descripción del hero). Las secciones siguen pidiendo sus datos desde el navegador.
- «Código muerto: tres ficheros» (§3.5): quedan dos sin import, `MainClientesCarrousel.tsx` (con `usersCount`, `:17-18`) y `MainParallaxSection.tsx`. `MainSolucionesSection.tsx` se borró.
- «`MainConsultoriaSection` importada y sin renderizar» sigue cierto en `HomeNormapro.tsx:4`.
- «Todas las URLs salen de `config/api.ts`» (corrección previa): siguen las dos excepciones (`HeroUserCount.tsx:9`, `MainFormacionSection.tsx:15`).
- El título principal de la home está en `MainHeroCarousel.tsx:50` como `h1`.

### Nuevo
| Pieza | Fichero:línea |
|---|---|
| Home de NormaPRO (cliente) | `components/home/HomeNormapro.tsx` |
| Metadatos de la home | `app/sites/normapro/page.tsx:7-11` |

### Errores de esta ficha
ST-WEB-20 VIGENTE (`MainEventosSection.tsx:55-57`). ST-WEB-42 VIGENTE (`:85-87`). ST-WEB-14 VIGENTE (`MainPacksSection.tsx:17`, `MainFormacionSection.tsx:15`, `MainConsultoriaSection.tsx:29`). ST-WEB-05 VIGENTE (`MainClientesCarrousel.tsx:17-18`). ST-API-13: `MainPacksSection.tsx:29-30` sin cambios.

### Seguridad
Sin cambios de seguridad en esta ficha. El iframe de vídeo (`HomeNormapro.tsx:44`) y las llamadas externas de `HeroUserCount.tsx:9` y `MainFormacionSection.tsx:15` siguen: SEG-WEB-15 VIGENTE (ver [ACT-store.md](../../../docs/revision/ACT-store.md) §7).
