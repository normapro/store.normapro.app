# W4 · Motor de landings

Repo: `store.normapro.app`. Ficha revisada contra el código el 21/10/2026. Rutas de fichero relativas a `src/`. Prefijos: `L = components/landings/`, `S = /v1/store`, `P = app/sites/normapro/`.

## 1. Qué hace

- Convierte una lista de bloques `{id, tipo, data}` guardada en la base en una página. `LandingBuilder` busca el componente de cada `tipo` y lo pinta con `data` como props (`components/LandingBuilder.tsx:92-102`).
- Hay 42 tipos de bloque. Cada tipo es un componente de `L`.
- Quién llama al motor: detalle de aplicación, detalle de consultoría y detalle de historia (ver §3).
- Fuera del motor, en la misma carpeta, hay 6 ficheros que usan las páginas directamente o otros componentes (ver §2.2).

## 2. Dónde está

### 2.1 Los 42 tipos (tabla hecha desde el código)

Fuente: `sectionMap` en `components/LandingBuilder.tsx:47-90`. Las 42 entradas ocupan `:48-89`. Cada componente es `export default` de su fichero y todos tienen `'use client'` salvo `PresentacionHistoria` (no está en el mapa). Importación: `components/landings/index.ts:1-43` (`LandingBuilder.tsx:2-45`).

Leyenda de props: `*` obligatoria según el tipo TypeScript del fichero. La columna «Props» da la línea del `type Props`. «Modal» = abre `Formulario` (ficha W8) con la línea del render. Solo se listan los nombres de primer nivel; los tipos anidados están en el mismo fichero.

| # | `tipo` (clave del mapa) | Línea | Fichero (`L`) | Props (línea del tipo) | Datos externos / modal |
|---|---|---|---|---|---|
| 1 | `HeroSection` | 48 | `HeroSection.tsx` | `:8` title, claim, pragma, cta, imgType (`lottie`/`img`), imgUrl, backgroundImg, backgroundRepeat, backgroundSize, backgroundPositionX (todas opcionales) | Modal `:132`. `useSiteRef` `:34`. Con `imgType=lottie` pide `/lotties/{imgUrl}.json` `:50-57` |
| 2 | `ClientCarouselWrapper` | 49 | `ClientCarouselWrapper.tsx` | `:16` scope\*, claim\* (texto) | Delega en `shared/ClientCarousel` `:26` (ficha W7) |
| 3 | `TextSection` | 50 | `TextSection.tsx` | `:6` background\*, level1..level9, buttonText, remarkableText, remarkableText2, remarkableText3 | Modal `:169` |
| 4 | `VideoSection` | 51 | `VideoSection.tsx` | `:7` title\*, items\*, url_video, buttonText, imgBackground | Modal `:106`. `useSiteRef` `:22`. `iframe` `:84` con `getEmbedUrl` `:27-47` |
| 5 | `ClientPerceptionSection` | 52 | `ClientPerceptionSection.tsx` | `:31` tabla\*, title, items, list, secondtitle, pragma, id_testimonio, downtext, supertitle, image, subtitle, secondsupertitle | `GET S/testimonios?maxItems=100` `:69`. Modal `:299` |
| 6 | `CaracteristicasIncorporadas` | 53 | `CaracteristicasStorytellingSection.tsx` (el nombre del tipo no coincide con el del fichero) | `:87` data\* (lista de característica) | Modal `:262` |
| 7 | `ObstaculosYSolucionesSection` | 54 | `ObstaculosYSolucionesSection.tsx` | `:59` title\*, claim\*, table\*, pragma\* (lista), imgBackground, image, tabletitle, buttonText, background, backgroundtable | Modal `:168` |
| 8 | `MovilPortalSection` | 55 | `MovilPortalSection.tsx` | `:5` title\*, subtitle\*, images\* | Imágenes de `/apps/portalmovil/` `:29` |
| 9 | `CertificacionesSection` | 56 | `CertificacionesSection.tsx` | `:5` title\*, images\*, subtitle, pragma | Imágenes de `/certificaciones/` `:27` |
| 10 | `ResumenSection` | 57 | `ResumenSection.tsx` | `:28` imgCabecera\*, imgBackground\*, title\*, claim\*, titlelist\*, list\*, cta\* (`pretitle?`, title, buttonText, pragma) | Modal `:123` |
| 11 | `PresentacionSection` | 58 | `PresentacionSection.tsx` | `:5` imgBottom\*, title, claim | - |
| 12 | `ImgTextSection` | 59 | `ImgTextSection.tsx` | `:5` imgCabecera\*, title\*, imgBackground, subtitle, claim, pragma | - |
| 13 | `FaqSection` | 60 | `FaqSection.tsx` | `:13` faqs\* | Modal `:96` |
| 14 | `HeroSection2` | 61 | `HeroSection2.tsx` | `:5` claim\*, pragma\*, imgBottom\*, title | - |
| 15 | `ClientsMuralSection` | 62 | `ClientsMuralSection.tsx` | `:9` scope\*, claim\* (lista) | `GET S/clientes?maxItems=100&scope=` `:18` |
| 16 | `PresentacionSection2` | 63 | `PresentacionSection2.tsx` | `:5` images\*, title, claim, bottomText | - |
| 17 | `CarouselPerceptionsSection` | 64 | `CarouselPerceptionsSection.tsx` | `:9` title\*, listIds\* (lista de números), pragma, subtitle, claim | `GET S/testimonios/{id}` por cada id `:30-32` |
| 18 | `RazonesSection` | 65 | `RazonesSection.tsx` | `:29` imgCabecera\*, imgBackground\*, title\*, claim\*, titleList\*, list\*, buttonText\* | Modal `:128` |
| 19 | `SideImgTextSection` | 66 | `SideImgTextSection.tsx` | `:6` image\*, claim\*, imgBackground, title, `plagma` | `useSiteRef` `:21` |
| 20 | `SideLeftImgTextSection` | 67 | `SideLeftImgTextSection.tsx` | `:6` image\*, claim\*, imgBackground, title, paragraphs, `plagma` | Importa `Formulario` `:4` y declara el estado `:23`; no lo renderiza |
| 21 | `AportacionesSection` | 68 | `AportacionesSection.tsx` | `:15` title\*, claim\*, aportaciones\* | Modal `:86` |
| 22 | `RegaloSection` | 69 | `RegaloSection.tsx` | `:6` image\*, imageBackground\*, title\*, subtitle\*, claim\*, titleSection\*, claimSection\*, pragma\*, buttonText\* | Modal `:79` |
| 23 | `ServiciosSection` | 70 | `ServiciosSection.tsx` | `:19` title\*, basicTitle\*, extraTitle\*, basicServices\*, extraServices\*, buttonText\* | Modal `:130` |
| 24 | `VentajasSection` | 71 | `VentajasSection.tsx` | `:27` title\*, claim\*, items\*, highlightText, background (`white`/`gray`) | Importa `Formulario` `:4`; no lo usa |
| 25 | `EtapasSection` | 72 | `EtapasSection.tsx` | `:15` title\*, subtitle\*, claim\*, etapas\*, buttonText\* | Modal `:145` |
| 26 | `QuestionsSection` | 73 | `QuestionsSection.tsx` | `:6` title, intro, preQuestionsText, questions, bigMarkText, buttonText, background (todas opcionales) | Modal `:96` |
| 27 | `ClavesSection` | 74 | `ClavesSection.tsx` | `:10` title\*, claves\*, showDividers | - |
| 28 | `PorcentajesSection` | 75 | `PorcentajesSection.tsx` | `:10` title\*, subtitle\*, datos\*, claim\*, pragma\* | - |
| 29 | `SideTextSection` | 76 | `SideTextSection.tsx` | `:6` title\*, claim\*, pragma\*, buttonText\* | Modal `:60` |
| 30 | `OpcionesSeleccionesSection` | 77 | `OpcionesSeleccionesSection.tsx` | `:15` title\*, leftTitle\*, leftItems\*, rightTitle\*, rightItems\*, highlightedText, intro, paragraphs, buttonText, imgBackground | Modal `:140` |
| 31 | `EstudioSection` | 78 | `EstudioSection.tsx` | `:35` title\*, claim\* (lista), pragma\*, datos\* | Modal `:118` |
| 32 | `PasosSection` | 79 | `PasosSection.tsx` | `:9` title\*, subtitle\*, pasos\* | - |
| 33 | `DesgraneSection` | 80 | `DesgraneSection.tsx` | `:11` title\*, claim\*, pragma\*, listTitle\*, list\* | - |
| 34 | `SimpleClientPerceptionSection` | 81 | `SimpleClientPerceptionSection.tsx` | `:10` id_testimonio\*, title | `GET S/testimonios?maxItems=100` `:19` |
| 35 | `NecesidadesSection` | 82 | `NecesidadesSection.tsx` | `:5` imgBackground\*, image\*, title\*, subtitle\*, titlelist\*, list, claim | - |
| 36 | `AportacionesSection2` | 83 | `AportacionesSection2.tsx` | `:16` title\*, claim\*, aportaciones\*, buttonText\* | Modal `:103` |
| 37 | `MultipleEtapasSection` | 84 | `MultipleEtapasSection.tsx` | `:46` title\*, claim\*, options\*, subtitle, selectorTitle | Usa `EtapasMiddleHighlight` `:5,203`. Importa `Formulario` `:4` y declara el estado `:61`; no lo renderiza |
| 38 | `ListHistoriaSection` | 85 | `ListHistoriaSection.tsx` | `:24` title, claim, titlelist, list, image, pragma, listStyle (`numbered`), compact (todas opcionales) | - |
| 39 | `ListColumnsSection` | 86 | `ListColumnsSection.tsx` | `:10` list\*, image\*, title | - |
| 40 | `HistoriaTextSection` | 87 | `HistoriaTextSection.tsx` | `:6` title\*, claim\* (lista), buttonText, image | Modal `:61` |
| 41 | `HistoriaClienteSection` | 88 | `HistoriaClienteSection.tsx` | `:10` claim\* (lista), id_testimonio\* | `GET S/testimonios?maxItems=100` `:24` |
| 42 | `DescargaInformeSection` | 89 | `DescargaInformeSection.tsx` | `:8` title\*, claim\*, buttonText\* | Abre `DescargaInformeModal` `:39`; envía un lead (ver §4) |

Resumen de la tabla: 19 tipos abren el modal de contacto (filas 1, 3, 4, 5, 6, 7, 10, 13, 18, 21, 22, 23, 25, 26, 29, 30, 31, 36, 40). Cinco piden datos a la API (filas 5, 15, 17, 34, 41). Cuatro leen `useSiteRef` (filas 1, 4, 19 y, fuera del mapa, `HistoriasClientesSection`).

### 2.2 Ficheros de `L` que no son un tipo del mapa

| Fichero | Líneas de uso | Quién lo usa |
|---|---|---|
| `LandingBuilder.tsx` (`components/`) | 102 | `P aplicaciones/[aplicacion]/page.tsx:1,29`, `P consultorias/[consultorias]/page.tsx:1,29`, `P historias/[historia]/page.tsx:1,116` |
| `index.ts` | 43 exportaciones | `LandingBuilder.tsx:45`. También lo importa `app/sites/instituto/que-hacemos/page.tsx:3` (`CertificacionesSection`) |
| `CaracteristicasIncorporadasSection.tsx` | 128 | Solo `index.ts:6`. No está en el mapa y ningún otro fichero lo importa. Sin uso |
| `DescargaInformeModal.tsx` | 357 | `DescargaInformeSection.tsx:6,39`, `InformeDescargaCtaSection.tsx:4,48` |
| `InformeDescargaCtaSection.tsx` | 59 | `P informes/[informe]/page.tsx:6,368` (ficha W6) |
| `EtapasMiddleHighlight.tsx` | 89 | `MultipleEtapasSection.tsx:5,203` |
| `HistoriasClientesSection.tsx` | 165 | `P historias/page.tsx:4,14`, `P soluciones/[ambito]/page.tsx:8,22`, `P soluciones/[ambito]/sector/[sector]/page.tsx:8,22` |
| `PresentacionHistoria.tsx` | 51 | `P historias/[historia]/page.tsx:2,109` |

Total de ficheros en `L`: 49 (42 de tipos + 6 de la tabla + `index.ts`).

Otras páginas importan componentes de `L` sin pasar por el motor: `ListHistoriaSection` y `CertificacionesSection` en `/nosotros` (`nosotros/page.tsx:2,5,88,138`); `ListHistoriaSection` en `/trabaja` (`trabaja/page.tsx:1,96-136`).

## 3. Flujo

1. Una página de servidor pide el contenido a la API y pasa la lista a `LandingBuilder`.
   - Aplicación: `GET /v1/aplicaciones/:slug` → `data.contenidos` (ficha W5; `P aplicaciones/[aplicacion]/page.tsx:29`).
   - Consultoría: `GET S/consultoria/:slug` → `data.contenidos` (ficha W5; `P consultorias/[consultorias]/page.tsx:29`).
   - Historia: `GET S/historias/slug/:slug` → `componentes`, con `parseBloques` (ficha W7; `P historias/[historia]/page.tsx:91,116`).
2. `LandingBuilder` (`components/LandingBuilder.tsx:92-102`). Sin `'use client'`: es componente de servidor. Recorre la lista con `bloques.map` `:95`. Por cada bloque toma `sectionMap[bloque.tipo]` `:96`. Si no existe, devuelve `null` sin aviso `:97`. Si existe, renderiza `<Component key={bloque.id} {...bloque.data} />` `:98`. Envuelve todo en `<main>` con `py-12` `:94`.
3. Cada componente es de cliente. Pinta con las props que recibe. Los de §2.1 con «GET» llaman a la API desde el navegador (`useEffect`). Los de «Modal» abren `Formulario` (ficha W8), que envía `POST S/leads`.
4. Imágenes: cada componente compone la ruta con una carpeta fija de `public/` y el nombre que viene en `data`:
   - `/apps/` (la mayoría; `captures/` en `CaracteristicasStorytellingSection.tsx:160`, `portalmovil/` en `MovilPortalSection.tsx:29`).
   - `/certificaciones/` (`CertificacionesSection.tsx:27`).
   - `/historiasclientes/` (`HistoriaTextSection.tsx:52`, `ListHistoriaSection.tsx:115`, `ListColumnsSection.tsx:51`).
   - `/testimonios/{nombre-del-cliente-sin-espacios-ni-tildes}.png` (`HistoriaClienteSection.tsx:38-41,68`, `ClientPerceptionSection.tsx:250`, `CarouselPerceptionsSection.tsx:141`, `SimpleClientPerceptionSection.tsx:90`).
   - `/lotties/{nombre}.json` para `HeroSection` (`:50-53`). `public/lotties/` tiene 7 ficheros.
5. Caché: el motor no cachea. La caché de datos es la de la página que lo llama (aplicación y consultoría `revalidate: 60`; historia `revalidate: 0`; ver W5 y W7). Los `fetch` de componentes salen del navegador sin caché de Next.

## 4. Endpoints que consume

| Verbo | Ruta | Fichero:línea |
|---|---|---|
| GET | `S/testimonios?maxItems=100` | `L ClientPerceptionSection.tsx:69`, `L HistoriaClienteSection.tsx:24`, `L SimpleClientPerceptionSection.tsx:19` |
| GET | `S/testimonios/{id}` | `L CarouselPerceptionsSection.tsx:31` |
| GET | `S/clientes?maxItems=100&scope={scope}` | `L ClientsMuralSection.tsx:18` |
| GET | `S/historias?maxItems=100` | `L HistoriasClientesSection.tsx:39` |
| GET | `S/clientes?maxItems=100&scope=` (vía `shared/ClientCarousel`) | `L ClientCarouselWrapper.tsx:26`. La línea del `fetch` (`ClientCarousel.tsx:39`) la cita `docs/MAPA.md` §3.4; no la he abierto |
| GET | `/lotties/{imgUrl}.json` (fichero estático) | `L HeroSection.tsx:57` |
| POST | `S/leads` | `L DescargaInformeModal.tsx:115`. Y vía `Formulario.tsx:65` desde los 19 tipos con modal |

Las URLs salen de `config/api.ts` (`TESTIMONIOS :17`, `CLIENTES :13`, `HISTORIAS :18`, `LEADS :30`).

Comprobado en la API: `GET S/clientes` no lee `scope` (pasa `"all"` fijo, `api-store.normapro.app/app/controllers/storeController.ts:403`). El parámetro `scope` de `ClientsMuralSection.tsx:18` no tiene efecto. Confirma ST-WEB-04 para esta línea.

## 5. Datos

### Contrato del bloque

- Forma: `{ id, tipo, data }`. `LandingBuilder` no declara tipo: `bloques: any[]` (`LandingBuilder.tsx:92`).
- No hay un tipo compartido por tipo de bloque. Las props de cada tipo son el `type Props` de su fichero (columna «Props» de §2.1). El editor las define aparte (`docs/CONTRATOS.md` §2.4: `COMPONENT_SCHEMAS`; ficha E7).
- Las claves de `data` son los nombres de las props. Cambiar el nombre de una prop deja sin efecto el valor ya guardado en la base.
- Formato de muestra: `plantillas/*.json` son listas de `{id,tipo,data}` (clave de primer nivel del primer elemento de `plantillas/bpm.json`: `id`, `tipo`, `data`; 18 elementos). Ningún código las carga (ficha W15).
- Contrato de `contenidos`/`componentes` y su normalización en la API: `docs/CONTRATOS.md` §2.4.

### Tipos de la store usados por el motor

- `Cliente` (`types/cliente.ts`) en `ClientsMuralSection.tsx:6`.
- `TestimonioConCliente` (`types/testimonio.ts`) en `HistoriaClienteSection.tsx:5`, `SimpleClientPerceptionSection.tsx:5`, `ClientPerceptionSection.tsx`.
- `HistoriaCliente` (`types/historiaCliente.ts`) en `HistoriasClientesSection.tsx:6`.

### Contexto

- `useSiteRef()` (`context/SiteContext.tsx:13-15`) devuelve `"instituto"` o `null`. Lo leen `HeroSection.tsx:34`, `VideoSection.tsx:22`, `SideImgTextSection.tsx:21` y `HistoriasClientesSection.tsx:65`. Con `"instituto"` cambian colores de fondo y de botón (`HeroSection.tsx:66-69`, `VideoSection.tsx:49-52`, `SideImgTextSection.tsx:24-26`).

## 6. Reglas de negocio y permisos

- Sin autenticación ni permisos en el motor ni en sus llamadas.
- Un `tipo` que no está en el mapa no se pinta y no genera error (`LandingBuilder.tsx:97`).
- El orden de la lista es el orden de la página. No hay reordenación en la store.
- Los textos de varios tipos aceptan una lista o un texto suelto (por ejemplo `HeroSection.tsx:40-44`); otros solo una lista (`ClientsMuralSection.tsx:29` hace `claim.map`).
- Testimonios: 3 tipos descargan hasta 100 y buscan el `id_testimonio` en el navegador (`ClientPerceptionSection.tsx:69-80`, `HistoriaClienteSection.tsx:24-31`, `SimpleClientPerceptionSection.tsx:19-30`). Si el id no está entre los 100 devueltos, el bloque no muestra testimonio. `HistoriaClienteSection` no pinta nada (`:36`). `CarouselPerceptionsSection` pide cada id por separado (`:30-32`).
- Formulario de descarga de informe: pide nombre, apellidos, empresa, cargo, país, empleados, teléfono, correo y política (`DescargaInformeModal.tsx:65-79`). El tramo de empleados se envía como `n_empleados` (`:126`), `acepta_marketing` va en `false` (`:129`) y `acepta_contacto` toma el valor de la casilla «reunión demostrativa» (`:130`).
- Seguridad: regla de diseño que hoy no se cumple; detalle en el informe restringido.

## 7. Zonas de riesgo

- Contrato sin tipo compartido: cambiar una prop en `L` sin cambiar el editor y los datos guardados rompe páginas ya publicadas. No avisa.
- `bloques` se recorre sin comprobar que sea lista (`LandingBuilder.tsx:95`). Un valor que no sea lista lanza error en el servidor. Quien llama debe entregar siempre una lista (la API convierte el texto en lista en aplicación y consultoría; en historia lo hace `parseBloques`).
- Ids repetidos en la lista repiten `key` (`:98`).
- Un tipo nuevo exige tres cambios: fichero en `L`, línea en `index.ts` y línea en el mapa (`LandingBuilder.tsx:2-45` y `:47-90`), más el esquema del editor (E7).
- El nombre `CaracteristicasIncorporadas` apunta a otro componente (`LandingBuilder.tsx:53`). Hay un fichero con el nombre «incorporadas» que no se usa.
- `plagma` (con «l») es el nombre de la prop en `SideImgTextSection.tsx:11,19,53` y `SideLeftImgTextSection.tsx:12`. El resto de tipos usan `pragma`.
- 19 tipos abren el mismo `Formulario`. Un cambio en `Formulario.tsx` afecta a todos y a las páginas de ficha (ficha W8).
- Cuatro tipos piden testimonios al montarse el bloque. Un bloque repetido en una página repite la llamada.
- Nombres de imagen: si el nombre guardado no existe en `public/`, la imagen sale rota sin aviso.
- Seguridad: regla de diseño que hoy no se cumple; detalle en el informe restringido.

## 8. Cómo probarlo

1. Arrancar API y store (`docs/ENTORNO.md`; `npm run dev`).
2. Abrir `/aplicaciones/{slug}` o `/consultorias/{slug}` de un registro con `contenidos`. Debe salir una columna de bloques en el orden de la lista.
3. Cambiar un `tipo` por un texto inexistente en la base: el bloque desaparece y no hay error (esperado, `:97`).
4. Bloque `HeroSection` con `imgType: "lottie"` y `imgUrl` de uno de los 7 ficheros de `public/lotties/`: debe animarse.
5. Bloque con botón (tipos con «Modal» en §2.1): el botón abre el formulario de contacto. Enviar con datos de prueba y comprobar `POST S/leads` en la pestaña Red.
6. Bloque `DescargaInformeSection`: abre el formulario de descarga. Tras enviar, el modal se cierra; no se descarga ningún fichero (ver §9).
7. Bloques con testimonios (`id_testimonio`, `listIds`): usar ids que existan. Con un id inexistente, anotar qué pasa.
8. Para ver el modo Instituto de los 4 componentes con `useSiteRef`: `docs/MAPA.md` §3.2. Resultado esperado según código: no activa el modo (ver §9).
9. Los JSON de `plantillas/` sirven como ejemplo de la forma de los datos; nada los carga (ficha W15).

## 9. Dudas / no localizado

- Si el editor emite `plagma` o `pragma` para los tipos `SideImgTextSection` y `SideLeftImgTextSection`: no localizado (el editor queda fuera de esta ficha; ver E7).
- Qué tipos y datos hay hoy en las tablas de producción: no localizado (no se ha leído la base).
- Si `CaracteristicasIncorporadasSection.tsx` se dejó fuera del mapa a propósito: no localizado.
- `ClientCarouselWrapper` declara `claim` como texto (`:18`) y `ClientsMuralSection` como lista (`:11`). Qué envía el editor a cada uno: no localizado. `ClientCarouselWrapper` además importa y declara estado que no usa (`:3-6,22`).
- Qué hace `shared/ClientCarousel` con `claim` vacío: no localizado (ficha W7).
- `CarouselPerceptionsSection.tsx:36` filtra solo `null`. Si la API responde un error con cuerpo `{error}` para un id, ese objeto pasa al carrusel. No localizado qué pinta.
- `CarouselPerceptionsSection.tsx:40` ejecuta la carga una sola vez (dependencias vacías). Cambiar `listIds` sin recargar la página no recarga los datos. No probado.
- `DescargaInformeModal.tsx:206` dice «recibe en tu email este informe». El componente solo envía un lead y cierra (`:115-145`). No localizado ningún código que envíe o enlace el informe (en el modal, en `InformeDescargaCtaSection.tsx` ni en `informes/[informe]/page.tsx`). Confirmar con producto cómo se entrega.
- `ClientPerceptionSection.tsx:92-112` contiene un bloque de código en comentario con datos de ejemplo. No localizado si debe borrarse.
- Si las plantillas de `plantillas/` usan solo los 42 tipos del mapa: no comprobado (solo se abrió una lista de claves de un fichero).
- `docs/CONTRATOS.md` §2.4 cita el mapa en `LandingBuilder.tsx:49-91`. En el código las 42 entradas ocupan `:48-89`.

## Correcciones de la revisión contra el código (21/10/2026)

### Afirmaciones incorrectas
- Dice: «Otras páginas importan componentes de L sin pasar por el motor: ListHistoriaSection y CertificacionesSection en /nosotros; ListHistoriaSection en /trabaja» → Correcto: incompleto. También `ListHistoriaSection` en `partners/page.tsx:41` (import :1). `HistoriaTextSection` se importa en `partners/page.tsx:2` y `trabaja/page.tsx:2`. `nosotros/page.tsx:3,4,6` y `trabaja/page.tsx:7,8` importan `TextSection`, `HeroSection`, `HistoriaTextSection`, `FaqSection` sin renderizarlos.

### Cifras o líneas a unificar
- Las 42 entradas del mapa ocupan `LandingBuilder.tsx:48-89` (el bloque `sectionMap` va de :47 a :90).
- `CaracteristicasStorytellingSection.tsx` usa `captures/` también en :228. `HeroSection.tsx:50-57`: si `imgUrl` empieza por `http` se usa tal cual.
- Las 13 plantillas usan solo tipos del mapa (comprobado por las claves `"tipo"`). No se comprobaron sus props.
- El flujo de historia omite el reintento a `historias/{slug}` si falla el primero (`historias/[historia]/page.tsx:51`).

### Errores funcionales de esta ficha
- ST-WEB-41: el modal de informe promete un email que no se envía (`DescargaInformeModal.tsx:206`) ([detalle](../../../docs/ERRORES-DETECTADOS.md)).
- ST-WEB-04: parámetros que la API no lee (`scope` en `/clientes`); confirmado en parte ([detalle](../../../docs/ERRORES-DETECTADOS.md)).
- ST-WEB-02: `x-site-ref` no llega al layout; los temas de Instituto no se activan ([detalle](../../../docs/ERRORES-DETECTADOS.md)).

### Afirmaciones no verificables
- `docs/CONTRATOS.md` §2.4 (el rango real `:48-89` es correcto) y `docs/MAPA.md` §3.2.

- Hay reglas de diseño que hoy no se cumplen; detalle en el informe restringido.
