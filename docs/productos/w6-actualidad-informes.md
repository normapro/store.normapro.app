# W6 · Actualidad e informes

Repo: `store.normapro.app`. Ficha revisada contra el código el 21/10/2026. Rutas de fichero relativas a `src/`. Prefijo de página: `P = app/sites/normapro/`. Prefijo de API: `S = /v1/store`. `M = api-store.normapro.app/app/models/storeModel.ts`.

## 1. Qué hace

- Actualidad: listado de noticias con filtro por pestaña y por tema (`/actualidad`) y detalle de una noticia con sus productos relacionados (`/actualidad/[noticia]`).
- Informes: listado de informes (`/informes`) y detalle de un informe con prólogo, índice, responsables y bloque de descarga (`/informes/[informe]`).
- Las dos rejillas (`ActualidadGridSection`, `InformesGridSection`) también salen en la home de NormaPRO y en la de Instituto.

## 2. Dónde está

| Pieza | Fichero | Líneas |
|---|---|---|
| Listado de noticias | `P actualidad/page.tsx` | 126 |
| Detalle de noticia | `P actualidad/[noticia]/page.tsx` | 347 |
| Rejilla de noticias | `components/ActualidadGridSection.tsx` | 253 |
| Listado de informes | `P informes/page.tsx` | 16 |
| Detalle de informe | `P informes/[informe]/page.tsx` | 375 |
| Rejilla de informes | `components/informes/InformesGridSection.tsx` | 128 |
| Tipos | `types/actualidad.ts` (11), `types/informe.ts` (38) | |

Quién monta las rejillas (búsqueda de `import`):

| Rejilla | Uso |
|---|---|
| `ActualidadGridSection` | `P page.tsx:93` (`onlyLatest`, `hideDescriptionAndReadMore`); `P actualidad/page.tsx:121`; `P actualidad/[noticia]/page.tsx:342`; `app/sites/instituto/page.tsx:51` (`isInstituto`, `temasDisponibles`) |
| `InformesGridSection` | `P page.tsx:114`; `P informes/page.tsx:12`; `app/sites/instituto/page.tsx:74` (`isInstituto`) |

Sin código muerto en esta ficha: todos los ficheros tienen import y uso. Dentro de `actualidad/[noticia]/page.tsx` hay código sin uso (ver §3.3).

## 3. Flujo

### 3.1 Render y caché

| Ruta | Render | Caché |
|---|---|---|
| `/actualidad` | Cliente (`'use client'`, `actualidad/page.tsx:2`) | Sin caché de Next; `fetch` del navegador |
| `/actualidad/[noticia]` | Cliente (`:3`) | Igual |
| `/informes` | Componente de servidor `async` sin `fetch` (`informes/page.tsx:4`) que monta la rejilla cliente | La rejilla pide en el navegador |
| `/informes/[informe]` | Servidor (`async`, `:202`) | `cache: "no-store"` en los dos `fetch` (`:161-163`, `:166-168`) |

### 3.2 Listado de noticias

`P actualidad/page.tsx`:
1. Pestañas `Todas las publicaciones`, `Destacadas`, `Temas`, `Servicios` (`:7`) y 8 temas con sus alias (`:9-18`).
2. Estado: pestaña activa, tema elegido y menú abierto (`:21-23`).
3. `filtrosTemas` (`:25-36`): `Destacadas` → `['Destacadas','Destacado']`; `Temas` con tema elegido → alias de ese tema; cualquier otro caso → sin filtro. `Servicios` no filtra.
4. Pasa `filtrosTemas` a `ActualidadGridSection onlyLatest={false}` (`:121`).

`components/ActualidadGridSection.tsx`:
1. `GET API_ENDPOINTS.ACTUALIDAD` al montar (`:93-113`). Error: texto «No se pudieron cargar las noticias.» (`:105`, `:135`).
2. Filtro en el navegador (`:115-128`): convierte a minúsculas el campo `categoria` de la noticia (`parseCategorias`, `:53-78`: acepta lista JSON o separadores `, | ;`) y comprueba si alguna coincide con los temas activos.
3. `onlyLatest` corta a 3 (`:127`).
4. Resumen: `content` convertido a texto (`:18-39`), 4 líneas (`:226`).
5. Imagen: `/main/no-image.png` si falta; se respeta `http(s)://` y `/` (`:41-51`).
6. Enlace: `/actualidad/{slug || id_noticia}` (`:181-183`). Con `isInstituto`: URL absoluta de producción con `?ref=instituto`, `<a target="_blank">` (`:181-182,186-199`).
7. `temasDisponibles` (solo lo pasa Instituto) dibuja una barra de temas con scroll horizontal (`:140-172`). La home y `/actualidad` no la usan.

### 3.3 Detalle de noticia

`P actualidad/[noticia]/page.tsx`:

| Paso | Línea |
|---|---|
| Slug de `useParams` (`:86-88`); intenta numérico para el segundo intento | `:86-88` |
| `GET S/actualidad/slug/{slug}` | `:105` |
| Si falla y el valor es numérico: `GET S/actualidad/{id}` | `:107-109` |
| `GET S/listpacks?ambito=all&sector=non-specified&maxItems=500` y busca el pack con `id_pack` de la noticia | `:118-123` |
| Si hay pack: `GET S/packs/{slug del pack}` para sacar el ámbito | `:125-132` |
| Dos peticiones a `S/listsoluciones`: la del ámbito (`ambito=all&sector=all` o `ambito={x}&sector=non-specified`) y siempre `ambito=all&sector=all` | `:134-141` |
| Resuelve cada `id_soluciones` primero en la lista del ámbito y luego en la global; arma `href` con `slug_ambito` y `slug` | `:146-168` |
| Cualquier fallo: «No se pudo cargar el detalle de la noticia.» | `:171-173` |
| Categorías con `parseCategorias` (sin pasar a minúsculas) | `:45-70`, `:183` |
| Contenido en párrafos: texto partido por saltos de línea, lista, o JSON como texto | `:22-43`, `:182` |
| Migas de pan escritas en el JSX | `:222-237` |
| Imagen `/{imagen}` | `:257-261` |
| Fecha tal como llega (`{noticia.fecha}`) | `:264` |
| Bloque «Productos relacionados»: pack (tarjeta) y soluciones (con o sin enlace) | `:275-333` |
| «Otras noticias relacionadas»: `ActualidadGridSection onlyLatest={false}` sin filtro | `:338-344` |

Código sin uso dentro del fichero: el `useMemo` `breadcrumbData` (`:184-198`) y los imports `Breadcrumb` (`:9`) y `BreadcrumbItem` (`:10`); la migas visibles son el `<nav>` de `:223-236`.

Iconos de las soluciones: se rotan de una lista fija por posición (`iconForSolution`, `:72-83`); no vienen de la base.

### 3.4 Listado de informes

`P informes/page.tsx`: título «Informes» y `InformesGridSection showOnlyLastThree={false}` (`:9-12`).

`components/informes/InformesGridSection.tsx`:
1. `GET API_ENDPOINTS.INFORMES` (`:40`). Respuesta no OK o error: lista vacía (`:41-44,55-57`). Texto sin datos: «Aun no hay informes disponibles.» (`:66`).
2. Imagen de portada: `imgPortada || img_portada` (`:51`), limpiada y resuelta bajo `/informes/` (`:18-32`).
3. `showOnlyLastThree` corta a 3 (`:54`).
4. Cada tarjeta: portada (`next/image`, `:82-88`), categoría o «SIN CATEGORIA» (`:70`), título o «Informe sin titulo» (`:71`).
5. Enlace: `/informes/{slug || id}` (`:74-75,109-115`). Con `isInstituto`: URL absoluta de producción con `?ref=` (`:101-107`). Sin slug ni id: título sin enlace (`:116-119`).

### 3.5 Detalle de informe

`P informes/[informe]/page.tsx` (servidor):
1. `getInformeBySlug` (`:159-200`): `GET S/informes/slug/{slug}`, y si falla y el valor son solo dígitos, `GET S/informes/{id}` (`:161-169`). Respuesta no OK o excepción: `null`.
2. Normaliza: prólogo en lista o en HTML (`normalizePrologoField`, `:46-71`); índice (`:73-103`); responsables (`:105-113`).
3. Comprueba en disco si existe la imagen bajo `public/informes/` (y `public/informes/personas/` para nombres sin carpeta) con `access` de `node:fs` (`:115-157`, ruta de `process.cwd()` en `:117`).
4. Sin dato: «Informe no encontrado» (`:206-212`).
5. Pinta: migas (`:224-239`), cabecera con título e imagen (`:242-273`), prólogo (`:281-312`), responsables (`:315-339`), índice (`:342-363`) y `InformeDescargaCtaSection` con `textoDescarga`, `tituloInforme`, `imagenInforme` (`:368-372`). Esa sección es de la ficha W4 y es la que envía el lead de descarga (A6/W8).
6. Textos de reserva visibles: «Contenido de prologo pendiente.» (`:289`), «Índice pendiente.» (`:346`), «Imagen del informe pendiente» (`:262`).

### 3.6 Cadena endpoint → tabla (API)

| Endpoint | Tabla y consulta | Fichero |
|---|---|---|
| `GET /actualidad` | `storeActualidad` (`id_noticia, imagen, fecha, title, content, categoria, id_pack, id_soluciones`), `ORDER BY id_noticia DESC` | `M:1441-1450` |
| `GET /actualidad/slug/:slug` | Misma tabla, lee todas las filas y compara el slug en memoria | `M:1482-1498` |
| `GET /actualidad/:id` | Misma tabla, `WHERE id_noticia = ?` | `M:1458-1475` |
| `GET /informes` | `storeInformes` (`id, categoria, titulo, textoDescarga, img_portada, img_informe, prologo, indice, responsables`), `ORDER BY id DESC` | `M:435-470` |
| `GET /informes/slug/:slug` | Misma tabla, lee todas y compara el slug en memoria | `M:515-543` |
| `GET /informes/:id` | Misma tabla, `WHERE id = ?` | `M:472-513` |

El `slug` de noticias e informes no está en la tabla: se calcula al leer con `toSlug` (minúsculas, sin tildes, guiones; si queda vacío usa prefijo e id) (`M:49-66`, `M:69-80`, `M:455`).

Rutas de la API: `api-store…/routes/v1/store.ts` (`/informes` :70, `/informes/slug/:slug` :73, `/informes/:id` :76, `/actualidad` :124, `/actualidad/slug/:slug` :127, `/actualidad/:id` :130).

## 4. Endpoints que consume

| Verbo | Ruta (tras `/v1/store`) | Fichero:línea |
|---|---|---|
| GET | `/actualidad` | `components/ActualidadGridSection.tsx:96` |
| GET | `/actualidad/slug/:slug` | `P actualidad/[noticia]/page.tsx:105` |
| GET | `/actualidad/:id` | `P actualidad/[noticia]/page.tsx:108` |
| GET | `/listpacks?ambito=all&sector=non-specified&maxItems=500` | `P actualidad/[noticia]/page.tsx:118` |
| GET | `/packs/:slug` | `P actualidad/[noticia]/page.tsx:127` |
| GET | `/listsoluciones?ambito=&sector=` (2 llamadas) | `P actualidad/[noticia]/page.tsx:134-141` |
| GET | `/informes` | `components/informes/InformesGridSection.tsx:40` |
| GET | `/informes/slug/:slug` (servidor) | `P informes/[informe]/page.tsx:161` |
| GET | `/informes/:id` (servidor) | `P informes/[informe]/page.tsx:166` |

`P informes/page.tsx` no llama a ninguna API.

## 5. Datos

### Tipos de la store

- `Actualidad` (`types/actualidad.ts:1-11`): `id_noticia: number`, `slug: string`, `imagen: string`, `fecha: string`, `title: string`, `content: unknown`, `categoria: string | null`, `id_pack: number | null`, `id_soluciones: number[] | null`.
- `Informe` (`types/informe.ts:25-38`): todo opcional. `id`, `slug`, `categoria`, `titulo`, `textoDescarga`, `imgPortada`/`img_portada`, `imgInforme`/`img_informe`, `prologo` (lista de `{title, content}` o texto), `indice` (lista de `{title, ul}` donde cada `ul` es texto o `{title, claim}`), `responsables` (lista de `{nombre, empresa, cargo, imagen}`). Tipos auxiliares `PrologoInformeItem`, `IndiceInformeClaim`, `IndiceInformeItem`, `ResponsableInforme` (`:1-23`).
- La página de detalle define además tipos locales `InformeDetalle`, `NormalizedIndiceItem`, `NormalizedResponsable` (`informes/[informe]/page.tsx:13-31`).

### Props

| Componente | Props |
|---|---|
| `ActualidadGridSection` | `onlyLatest: boolean` (obligatoria), `temas?: string[]`, `hideDescriptionAndReadMore?: boolean`, `temasDisponibles?: string[]`, `isInstituto?: boolean` (`:10-16`) |
| `InformesGridSection` | `showOnlyLastThree?: boolean`, `isInstituto?: boolean` (`:13-16`) |

### Contrato

Copias de cada tipo en API (`app/types/`), editor (`src/types/`) y store (`src/types/`). Divergencias que afectan a esta ficha (`docs/CONTRATOS.md` §1.1):
- `Actualidad`: `id_soluciones` es `number[] | null` en API y store y `string` en el editor; `content` es `unknown` en API y store y `string` en el editor. El detalle de noticia tolera texto, lista u objeto (`:22-43`).
- `Informe`: la API entrega `prologo`, `indice`, `responsables` ya convertidos (`M:435-470`), pero la store acepta también texto con JSON o HTML (`informes/[informe]/page.tsx:33-71`) y las dos formas de nombre de imagen.
- `categoria` de una noticia lo escribe el editor como lista o texto (`docs/CONTRATOS.md` §1.1). La store lo lee de las dos formas.

## 6. Reglas de negocio y permisos

- Sin autenticación.
- Orden: noticias e informes salen por id descendente (`M:1445`, `M:448`). La home y el listado dependen de ese orden para «últimas».
- «Últimas»: la home toma los 3 primeros (`ActualidadGridSection.tsx:127`; `InformesGridSection.tsx:54`).
- Filtro por tema: se hace en el navegador, sobre todas las noticias recibidas, sin paginación.
- Slugs: se generan desde el título; dos títulos iguales darían el mismo slug y gana el primero en orden de lectura (`M:1482-1498`). El `SELECT` de estas dos tablas no incluye ninguna columna `slug` (`M:1441-1450`, `M:435-448`).
- Acceso por id: el detalle acepta un id numérico si el slug no se encuentra (`actualidad/[noticia]/page.tsx:107-109`, `informes/[informe]/page.tsx:165-169`).
- Imagen de informe: se comprueba en disco del servidor; si no existe se devuelve igualmente la primera ruta candidata (`informes/[informe]/page.tsx:156`).
- Descarga de informe: pide datos de contacto en `InformeDescargaCtaSection` (ficha W4). Ese lead no se envía desde ficheros de esta ficha.
- Pack y soluciones relacionadas con una noticia: salen de `id_pack` e `id_soluciones` de la noticia (`actualidad/[noticia]/page.tsx:122,146-148`).

## 7. Zonas de riesgo

- `ActualidadGridSection` e `InformesGridSection` se reutilizan en 3 y 3 sitios (home NormaPRO, página propia, Instituto). Un cambio de props o de maquetación afecta a todos.
- Los temas del filtro están escritos en el código (`actualidad/page.tsx:9-18`) y deben coincidir con los textos de `categoria` guardados en `storeActualidad`. Un tema nuevo en el editor no sale en el menú sin tocar código.
- El detalle de noticia depende de que `listpacks` devuelva hasta 500 packs y de dos llamadas a `listsoluciones` con campos distintos según los parámetros (ver `w3-soluciones-ambitos-sectores-packs.md` §3.9).
- Cambiar `toSlug` en la API cambia todas las URLs de noticias e informes ya publicadas.
- El detalle de informe lee ficheros de `public/` con `node:fs`: depende de que el servidor tenga esa carpeta en `process.cwd()`.
- `Informe` y `Actualidad` tienen tres copias de tipo. Tocar un campo exige tocar las tres (`docs/CONTRATOS.md`).
- Seguridad: regla de diseño que hoy no se cumple; detalle en el informe restringido. (Aplica al HTML del prólogo.)

## 8. Cómo probarlo

1. Arrancar API y store (`docs/ENTORNO.md`; `npm run dev`).
2. `/actualidad`: cada pestaña y cada tema deben filtrar. Comparar el resultado con la categoría guardada en `storeActualidad`.
3. Abrir una noticia por slug y por id numérico: ambas deben cargar.
4. Noticia con `id_pack` e `id_soluciones`: debe salir la tarjeta del pack y las soluciones con enlace. Anotar las que salen sin enlace.
5. Noticia sin pack ni soluciones: el bloque «Productos relacionados» debe salir vacío.
6. `/informes`: rejilla completa. Home: solo 3.
7. Abrir un informe por slug y por id. Probar un informe sin prólogo, sin índice y sin responsables: deben salir los textos de reserva de §3.5.
8. Informe con prólogo en HTML y con prólogo en lista: los dos deben pintar.
9. Probar `?ref=instituto` y el host de Instituto: los enlaces de las rejillas deben ir a la URL absoluta (ver §9).
10. API caída: noticias: texto de error; informes: lista vacía; detalle de informe: «Informe no encontrado».

## 9. Dudas / no localizado

- Valor del parámetro `ref` en el enlace de informes de Instituto (`InformesGridSection.tsx:103`) frente al de noticias (`ActualidadGridSection.tsx:182`): no localizado cuál es el correcto ni quién lee `?ref=` en destino (`docs/MAPA.md` §3.2 y `docs/ERRORES-DETECTADOS.md`, ST-WEB-02).
- Qué debe mostrar la pestaña «Servicios» (`actualidad/page.tsx:7`): hoy no tiene filtro. No localizado el criterio.
- «Otras noticias relacionadas» (`actualidad/[noticia]/page.tsx:338-344`): pinta todas las noticias, sin excluir la actual ni filtrar por tema. No localizado el criterio.
- Zona horaria y formato de `fecha`: se muestra tal como llega (`noticia.fecha`). No se ha comprobado en ejecución el formato real.
- Enlaces absolutos de producción en `ActualidadGridSection.tsx:182` e `InformesGridSection.tsx:103`: no localizado si deben cambiar según el entorno.
- No localizado dónde se gestionan los alias de tema (`actualidad/page.tsx:9-18`) frente a los valores del selector de categoría del editor.
- `generateMetadata`, `sitemap` y `robots`: no existen para estas rutas (`docs/FICHAS-DEFINITIVAS.md` §6, W10). No localizado SEO propio para noticias e informes.
- Imágenes de `public/informes/*` y de las noticias: no se ha comprobado que existan.
