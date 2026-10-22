# W5 · Consultorías, aplicaciones y formación

Repo: `store.normapro.app`. Ficha revisada contra el código el 21/10/2026. Rutas de fichero relativas a `src/`. Prefijo de página: `P = app/sites/normapro/`. Prefijo de API: `S = /v1/store`.

## 1. Qué hace

- Páginas de detalle de una aplicación (`/aplicaciones/[slug]`) y de una consultoría (`/consultorias/[slug]`). Las dos pintan una landing de bloques guardada en la base.
- Secciones de listado para la home y para el sitio Instituto: tarjetas de aplicaciones, de consultoría y de formación.

La formación no sale de la API de la store: viene de una API externa.

## 2. Dónde está

| Pieza | Fichero | Líneas |
|---|---|---|
| Página `/aplicaciones/[aplicacion]` | `P aplicaciones/[aplicacion]/page.tsx` | 33 |
| Página `/consultorias/[consultorias]` | `P consultorias/[consultorias]/page.tsx` | 33 |
| Listado de aplicaciones | `components/MainAplicacionesSection.tsx` | 75 |
| Listado de consultoría | `components/MainConsultoriaSection.tsx` | 113 |
| Listado de formación | `components/MainFormacionSection.tsx` | 59 |
| Tarjeta de formación | `components/formacionCard.tsx` | 62 |
| Tipos | `types/aplicacion.ts` (7), `types/consultoria.ts` (7), `types/formacion.ts` (6) | |

No existen `/aplicaciones` ni `/consultorias` sin slug (`docs/MAPA.md` §3.3). No existe ninguna ruta `/formacion` (búsqueda en `src/app`, sin resultados).

Quién usa cada listado (búsqueda de `import` en `src/`):

| Componente | Sitio y línea |
|---|---|
| `MainAplicacionesSection` | Solo NormaPRO: `P page.tsx:3` (render `:63`). `docs/MAPA.md` §3.4 dice «Home, Instituto»: Instituto no la importa. |
| `MainConsultoriaSection` | Solo Instituto: `app/sites/instituto/page.tsx:3` (render `:22`). `P page.tsx:4` la importa y no la renderiza. |
| `MainFormacionSection` | NormaPRO: `P page.tsx:5` (render `:67`). Instituto: `instituto/page.tsx:4` (render `:28`, `isInstituto`). |
| `FormacionCard` | Solo `MainFormacionSection.tsx:8,50` |

Sin código muerto en esta ficha: todos los ficheros tienen al menos un `import` con uso, salvo el caso de `MainConsultoriaSection` en la home descrito arriba.

## 3. Flujo

### 3.1 Detalle de aplicación

`P aplicaciones/[aplicacion]/page.tsx`

- Componente de servidor (sin `'use client'`; función `async`, `:16`).
- `getAplicacion(slug)` (`:3-10`): `fetch` a `API_ENDPOINTS.APLICACION/{slug}` con `next: { revalidate: 60 }` (`:4-6`). ISR de 60 s.
- Si la respuesta no es OK: `throw new Error("Error al cargar aplicación")` (`:7`). El servidor lanza el error; no hay `error.tsx` (`docs/OBSERVABILIDAD.md` §3.1).
- `params` se espera con `await` (`:23`). `searchParams` se declara y no se usa (`:14,19`).
- Renderiza `<LandingBuilder bloques={data.contenidos} />` (`:29`). `LandingBuilder` es la ficha W4.

API: `GET /v1/aplicaciones/:slug` → `getAplicacionHandler` (`api-store…/controllers/aplicacionesController.ts:25-34`) → `fetchAplicacionConContenido` (`facades/aplicacionesFacade.ts:3-16`; convierte `contenidos` de texto a lista) → `SELECT * FROM storeAplicaciones WHERE slug = ? LIMIT 1` (`models/aplicacionesModel.ts:3-9`). Montaje: `app.ts:49`. Cualquier fallo responde 404 `{error:"Aplicación no encontrada"}` (`aplicacionesController.ts:30-33`).

### 3.2 Detalle de consultoría

`P consultorias/[consultorias]/page.tsx`

- Mismo código que 3.1, con `params.consultorias` (`:13,23`).
- `fetch` a `API_ENDPOINTS.CONSULTORIA/{slug}` con `revalidate: 60` (`:4-6`).
- Si no es OK: `throw new Error("Error al cargar aplicación")` (`:7`; el texto dice «aplicación»).
- `<LandingBuilder bloques={data.contenidos} />` (`:29`).

API: `GET /v1/store/consultoria/:slug` (`api-store…/routes/v1/store.ts:91`) → `StoreFacade.getConsultoriaBySlug` (`facades/storeFacade.ts:272-284`; convierte `contenidos` de texto a lista) → `SELECT … FROM storeConsultoria WHERE slug = ?` (`models/storeModel.ts:1093-1102`). Slug que no existe: 404 `{error}` (`controllers/storeController.ts:1197`).

### 3.3 Listado de aplicaciones

`components/MainAplicacionesSection.tsx` (cliente, `:2`):
1. `useEffect` → `GET API_ENDPOINTS.APLICACIONES` (`:13-29`). Error: `console.error` y lista vacía (`:20-22`).
2. Tarjeta por aplicación con enlace a `/aplicaciones/{slug}` (`:49`). Icono: `uriIcon` tal cual si empieza por `/`; si no, `/{uriIcon}` o `/default-icon.png` (`:44-46`).
3. API: `storeModel.ts:1046-1051`, tabla `storeAplicaciones`, `ORDER BY id_app ASC`. El listado no trae `contenidos`.

### 3.4 Listado de consultoría

`components/MainConsultoriaSection.tsx` (cliente, `:2`):
1. Envuelta en `Suspense` (`:107-111`) porque lee `useSearchParams` (`:19`).
2. `useEffect` → `GET API_ENDPOINTS.CONSULTORIA` (`:27-35`), sin comprobar `response.ok` y sin `try/catch`.
3. Prop `isInstituto` (`:14`) cambia colores, título y descripción (`:52-57`). Los textos están escritos en el código.
4. Cada tarjeta: icono `/main/{uriIcon}` (`:74`); enlace «Saber más» (`:83-88`) a una URL absoluta de producción con `?ref=instituto`, en pestaña nueva, en las dos variantes (la URL no depende de `isInstituto`); botón «Contratar ahora» (`:89-95`).
5. «Contratar ahora» añade `?consultoria={id}` a la URL con `router.push` (`:37-41`), y un `useEffect` abre `Formulario` si el parámetro existe (`:23-25`, `:101`). Al cerrar, quita el parámetro (`:43-50`). `Formulario` es la ficha W8.
6. API: `storeModel.ts:1079-1085`, tabla `storeConsultoria`, `ORDER BY id_consultoria ASC`.

### 3.5 Listado de formación

`components/MainFormacionSection.tsx` (cliente, `:1`):
1. `useEffect` → `fetch` a una API externa (URL escrita en el código, `:15`), sin `try/catch`. Toma los 4 primeros (`:17`).
2. Prop `isInstituto` (`:10`) cambia el fondo (`:24-27`).
3. Botón «Explora nuestros cursos» con `Link href="/formacion"` (`:39-44`). No existe esa ruta (ver §2 y §9).
4. Cada curso: `FormacionCard` (`:49-51`).

`components/formacionCard.tsx` (cliente): imagen de fondo `public_url` o `/main/default-icon.png` (`:17`), logo `/iconoInstituto.svg` (`:29`), icono de play (`:38`), título (`:44`), icono `/iconopinguino@2x.png` (`:51`). Tamaño fijo 303×180 (`:14`). No es un enlace: la tarjeta no navega a ninguna parte.

### 3.6 Caché y revalidación

| Zona | Estrategia |
|---|---|
| Detalle de aplicación y de consultoría | ISR, `revalidate: 60` (`:5` en cada página) |
| Listados | `fetch` en el navegador, sin caché de Next |

Un cambio hecho en el editor aparece en el detalle hasta 60 s después, y en los listados al recargar.

## 4. Endpoints que consume

| Verbo | Ruta | Fichero:línea |
|---|---|---|
| GET | `/v1/aplicaciones/:slug` (servidor) | `P aplicaciones/[aplicacion]/page.tsx:4` |
| GET | `/v1/store/consultoria/:slug` (servidor) | `P consultorias/[consultorias]/page.tsx:4` |
| GET | `/v1/store/aplicaciones` | `components/MainAplicacionesSection.tsx:16` |
| GET | `/v1/store/consultoria` | `components/MainConsultoriaSection.tsx:29` |
| GET | API externa de formación | `components/MainFormacionSection.tsx:15` |
| POST | `/v1/store/leads` | vía `Formulario` (ficha W8), abierto desde `MainConsultoriaSection.tsx:101` |

## 5. Datos

### Tipos de la store

- `Aplicacion` (`types/aplicacion.ts:1-7`): `id_app`, `description`, `uriIcon`, `shortDescription`, `slug`. No declara `contenidos`.
- `Consultoria` (`types/consultoria.ts:1-7`): `id_consultoria`, `description`, `uriIcon`, `shortDescription`, `slug`. No declara `contenidos`.
- `ItemListFormacion` (`types/formacion.ts:1-6`): `id_curse`, `title`, `description`, `public_url`. Describe la API externa, no la base de la store.

### Contrato

- `contenidos`: la API lo devuelve en el detalle de las dos (`aplicacionesFacade.ts:11-13`, `storeFacade.ts:272-284`). Las páginas lo leen como `data.contenidos` sin tipo (`aplicaciones/…/page.tsx:29`, `consultorias/…/page.tsx:29`). El editor lo declara en su `types/aplicacion.ts`. Detalle: `docs/CONTRATOS.md` §1.1 («Consultoría», «Aplicación») y §2.4.
- Formato de `contenidos`: lista `{id, tipo, data}` pintada por `LandingBuilder` (ficha W4; `docs/CONTRATOS.md` §2.4).
- Copias: API `app/types/{aplicacion,consultoria}.ts`, editor `src/types/…`, store `src/types/…`. `formacion.ts` solo existe en la store.
- Hay dos rutas de API que devuelven aplicaciones: `/v1/store/aplicaciones[/:id]` (listados) y `/v1/aplicaciones/:slug` (detalle con `contenidos`) (`docs/CONTRATOS.md` §1.1).

### Props

| Componente | Props |
|---|---|
| `MainConsultoriaSection` | `isInstituto?: boolean` (por defecto `false`) |
| `MainFormacionSection` | `isInstituto?: boolean` (por defecto `false`) |
| `FormacionCard` | `formacion: ItemListFormacion` |
| `MainAplicacionesSection` | Ninguna |

## 6. Reglas de negocio y permisos

- Sin autenticación en todas las llamadas.
- La URL pública de una consultoría usa el slug de `storeConsultoria`; la ruta de la store es `/consultorias/` (plural) y la de la API `/consultoria` (singular) (`docs/GLOSARIO.md` §4 punto 16).
- Formación: se muestran como máximo 4 cursos, los 4 primeros que devuelva la API externa (`MainFormacionSection.tsx:17`).
- Contratación de consultoría: no crea ningún pedido. Solo abre el formulario de contacto con el parámetro `?consultoria={id}` en la URL. `Formulario.tsx` no contiene la palabra «consultoria» (búsqueda de texto). No se ha leído el fichero entero: no se afirma qué hace con el parámetro.
- Las tarjetas de aplicaciones y consultoría no tienen filtro de publicación: salen todas las filas de la tabla.
- Instituto muestra textos propios de consultoría (`MainConsultoriaSection.tsx:55-56`).

## 7. Zonas de riesgo

- `MainConsultoriaSection` y `MainFormacionSection` se reutilizan en dos sitios con la prop `isInstituto`. Un cambio de maquetación afecta a los dos.
- El `slug` de aplicación o consultoría es la clave de la URL y de los menús (`menu/AplicationsDropDown.tsx:50`, `menu/ConsultoriaDropdown.tsx:32`, ficha W11). Cambiar un slug rompe esos enlaces.
- Las dos páginas de detalle son casi idénticas. Un cambio en una pide revisar la otra.
- `contenidos` es el contrato más frágil entre repos (editor escribe, `LandingBuilder` pinta; `docs/CONTRATOS.md` §2.4). Un tipo de bloque nuevo toca editor y store.
- La API externa de formación no es de este proyecto: un cambio de su formato afecta a `MainFormacionSection` y a `FormacionCard`.

## 8. Cómo probarlo

1. Arrancar API y store (`docs/ENTORNO.md`; `npm run dev`).
2. Home `/`: deben salir las tarjetas de aplicaciones y los 4 cursos de formación. Pulsar una aplicación: abre `/aplicaciones/{slug}`.
3. `/aplicaciones/{slug}` con un slug que tenga `contenidos`: debe pintar la landing. Con un slug inexistente: pantalla de error de Next (ver §3.1).
4. `/consultorias/{slug}`: igual.
5. Editar `contenidos` en el editor y recargar el detalle antes y después de 60 s para comprobar el ISR.
6. Instituto: acceder por el host de Instituto (`docs/MAPA.md` §3.2) y revisar la sección de consultoría: «Saber más» abre otra pestaña, «Contratar ahora» añade `?consultoria=` a la URL y abre el formulario.
7. Pulsar «Explora nuestros cursos» y anotar a dónde lleva (ver §9).
8. API externa caída: anotar qué se ve en formación (ver §9).

## 9. Dudas / no localizado

- Destino de «Explora nuestros cursos» (`MainFormacionSection.tsx:40`): `/formacion` no existe en `src/app`; en los dos sitios la ruta desconocida cae en el comodín que redirige a `/` (`P [...not-found]/page.tsx`). No localizado el destino pretendido.
- Uso del parámetro `?consultoria=`: la búsqueda de texto no lo encuentra en `Formulario.tsx` (ficha W8, no leído entero). No localizado quién debería leerlo.
- Qué hace `LandingBuilder` cuando `contenidos` es `null` o no es una lista: no localizado (ficha W4).
- Quién mantiene la API externa de formación y qué devuelve si falla: no localizado.
- `searchParams` sin uso en las dos páginas (`:14,19`): no localizado el motivo.
- Enlaces absolutos de producción en `MainConsultoriaSection.tsx:84` y `menu/ConsultoriaDropdownInstituto.tsx:25`: no localizado si deben cambiar según el entorno.
- Imágenes (`public/main/*`, `public/iconoInstituto.svg`, `public/iconopinguino@2x.png`): no se ha comprobado que existan.

## Correcciones de la revisión contra el código (21/10/2026)

### Afirmaciones incorrectas
- Ninguna afirmación incorrecta.

### Cifras o líneas a unificar
- `storeFacade.ts:272-285` (la ficha dice 272-284). Método de consultoría en `storeModel.ts:1093-1105`. El texto del error 404 está en `aplicacionesController.ts:32`.
- Los textos de Instituto tienen faltas: «consutoría» y «prefesionales» (`MainConsultoriaSection.tsx:55-56`).
- «Explora nuestros cursos» cae en `[...not-found]/page.tsx:4`, que hace `redirect("/")`.
- No existe ningún `error.tsx`, `global-error.tsx` ni `not-found.tsx` en `src/app`.
- `searchParams` sin uso en `aplicaciones/[aplicacion]/page.tsx:14,19` (verificado).

### Errores funcionales de esta ficha
- ST-WEB-08: `/formacion` no existe; «Explora nuestros cursos» vuelve a la home ([detalle](../../../docs/ERRORES-DETECTADOS.md)).
- ST-WEB-38: «Contratar ahora» no identifica la consultoría ([detalle](../../../docs/ERRORES-DETECTADOS.md)).
- ST-WEB-28: slug inexistente en aplicación o consultoría muestra el error de Next ([detalle](../../../docs/ERRORES-DETECTADOS.md)).
- ST-WEB-14: una respuesta de error de la API tumba listados (`MainConsultoriaSection`, `MainFormacionSection`) ([detalle](../../../docs/ERRORES-DETECTADOS.md)).
- ST-WEB-34: erratas visibles ([detalle](../../../docs/ERRORES-DETECTADOS.md)).

### Afirmaciones no verificables
- Tipos del editor (`types/aplicacion.ts`), qué hace `LandingBuilder` con `contenidos` nulo (W4), API externa de formación e imágenes de `public/`.

## Actualización tras el PR del 21/10/2026

Código comparado: `main` `8dc6ec9` frente a `origin/main` `0817fe9` (PR #19). Estado de los ids en [ACT-store.md](../../../docs/revision/ACT-store.md). No probado en ejecución. `P = app/sites/normapro/`.

### Citas rotas
Ninguna. Los componentes de esta ficha existen.

### Citas desplazadas
| Antes | Ahora |
|---|---|
| `P aplicaciones/[aplicacion]/page.tsx:3-10` (`getAplicacion`), `:4` (fetch), `:5-6` (`revalidate`) | `:13-20`, `:14`, `:15` |
| `…/aplicaciones/[aplicacion]/page.tsx:7` (`throw`) | `:17-18` (404 → `null`; otro error → `throw`) |
| `…/aplicaciones/[aplicacion]/page.tsx:14,19,23,29,33` (`searchParams`, `params`, uso de `contenidos`, función) | `:22-24` (solo `params`), `:39`, `:53`, `:38` |
| `P consultorias/[consultorias]/page.tsx:3-10`, `:4`, `:7`, `:29`, `:33` | `:13-20`, `:14`, `:17-18`, `:53`, `:38` |
| `P page.tsx:3` y render `:63` (`MainAplicacionesSection`) | `components/home/HomeNormapro.tsx:3`, `:63` |
| `P page.tsx:4` (`MainConsultoriaSection`, sin render) | `HomeNormapro.tsx:4` (sigue sin render) |
| `P page.tsx:5` y render `:67` (`MainFormacionSection`) | `HomeNormapro.tsx:5`, `:67` |
| `app/sites/instituto/page.tsx:3` y render `:22` (`MainConsultoriaSection`); `:4` y `:28` (`MainFormacionSection`) | `components/home/HomeInstituto.tsx:3`, `:22`; `:4`, `:28` |
| `Formulario.tsx` (varias) | +2 a +3 líneas (ver W8) |

### Afirmaciones obsoletas
- «Si la respuesta no es OK: `throw new Error("Error al cargar aplicación")`» (§3.1, §3.2): ahora un 404 devuelve `null` y la página hace `redirect("/")` (`aplicaciones/…/page.tsx:17,43`; `consultorias/…/page.tsx:17,43`). Otros errores siguen lanzando (`:18`), con textos «Error al cargar la aplicación» y «…la consultoría». El texto equivocado de la consultoría está corregido. ST-WEB-28 RESUELTO con matiz: un 5xx sigue mostrando la pantalla de error de Next.
- «`searchParams` se declara y no se usa» (§3.1, §9, correcciones): ya no se declara (`Props` solo tiene `params`, `:22-24`).
- «Cada página: función `async`, `revalidate: 60`» sigue; se añaden `generateMetadata` (`aplicaciones/…:26-36`, `consultorias/…:26-36`) con título, descripción y canónico, y `BreadcrumbList` en JSON-LD (`:45-52`). Los dos fetch comparten caché con `React.cache` entre metadatos y página.
- «ISR, `revalidate: 60`» (§6): sigue. La URL llega ahora con `encodeURIComponent(slug)` (`aplicaciones/…:14`, `consultorias/…:14`).
- «`/formacion` no existe» (§9): sigue (ST-WEB-08 VIGENTE: `MainFormacionSection.tsx:40`, `Navbar.tsx:165,251`, `Footer.tsx:127`).
- «Contratar ahora no identifica la consultoría» (ST-WEB-38): sigue (`MainConsultoriaSection.tsx:37-41,101`; `Formulario.tsx:66`).
- Errata «consutoría» y «prefesionales» (`MainConsultoriaSection.tsx:55-56`): sigue (ST-WEB-34).

### Nuevo
- Sitemap: aplicaciones y consultorías entran en `app/sitemap.xml/route.ts:131-137` con `/aplicaciones/{slug}` y `/consultorias/{slug}`. Las cargan `getAplicaciones` y `getConsultorias` (`services/storeService.ts:90,92`).
- Las dos páginas importan `JsonLd` y `pageMetadata` (`:6,8`).

### Errores de esta ficha
ST-WEB-08, ST-WEB-14 (`MainConsultoriaSection.tsx:29`, `menu/ConsultoriaDropdownInstituto.tsx:12`, `MainFormacionSection.tsx:15`), ST-WEB-34 y ST-WEB-38 VIGENTES. ST-WEB-28 RESUELTO. ST-API-16: depende de la API; la de este árbol responde 404 para aplicación y consultoría.

### Seguridad
La petición de servidor codifica el slug (SEG-WEB-11 CAMBIADO). Sin otros cambios de seguridad en la ficha. Detalle en [ACT-store.md](../../../docs/revision/ACT-store.md) §7.
