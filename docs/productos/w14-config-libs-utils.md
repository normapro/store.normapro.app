# W14 · Config, libs, utils y tipos

Repo: `store.normapro.app`. Rutas de fichero relativas a `src/`. Revisada contra el código el 21/10/2026. Sin URLs ni valores: solo nombres de clave y la ruta de la API que representa cada una (sin dirección base).

## 1. Qué hace

Reúne lo transversal: la tabla de endpoints de la API (`config/api.ts`), la carga de iconos (`libs/fontawesome*.ts`, `libs/icons.ts`), las dimensiones de logos (`libs/logovars.ts`), la animación de entrada por scroll (`utils/FadeInOnScroll.tsx`) y los tipos TypeScript (`types/*.ts`, 15 ficheros).

`libs/seo.config.ts` se documenta en [W10](w10-seo.md).

## 2. Dónde está

| Pieza | Fichero | Líneas |
|---|---|---|
| Base de la API y tabla `API_ENDPOINTS` | `config/api.ts` | 1-35 |
| Desactivar CSS automático de FontAwesome | `libs/fontawesome.config.ts` | 1-3 |
| Biblioteca global de iconos (sin uso) | `libs/fontawesome.ts` | 1-6 |
| Mapa de iconos de pack | `libs/icons.ts` | 17-31 |
| Dimensiones de logos | `libs/logovars.ts` | 1-20 |
| Animación por scroll | `utils/FadeInOnScroll.tsx` | 8-37 |
| Tipos | `types/*.ts` | 15 ficheros, 301 líneas |

## 3. Flujo

### 3.1 `config/api.ts`

- Base: variable `NEXT_PUBLIC_API_BASE_URL`; si falta, una dirección local en desarrollo o una fija de producción (`:1-5`).
- Cada clave es la base más una ruta (`:7-33`). Se importa como `API_ENDPOINTS` por defecto.
- Los componentes la usan con `fetch` en el navegador y los `page.tsx` de servidor de aplicaciones, consultorías, historias e informes (`aplicaciones/[aplicacion]/page.tsx:4`, `consultorias/[consultorias]/page.tsx:4`, `historias/[historia]/page.tsx:46-67`, `informes/[informe]/page.tsx:161-166`). No hay capa de servicio salvo `services/chatbotService.ts`.

### 3.2 Iconos

- `libs/fontawesome.config.ts` pone `config.autoAddCss = false` (`:3`). Lo importan los dos layouts (`normapro/layout.tsx:2`, `instituto/layout.tsx:2`). Los estilos se importan a mano (`layout.tsx:3`).
- `libs/fontawesome.ts` registra `fas`, `far`, `fab` con `library.add` (`:7`). Nadie lo importa (búsqueda `libs/fontawesome` en `src/`: solo aparece `fontawesome.config`).
- `libs/icons.ts` exporta `iconMap` (12 iconos regulares de pago, clave tipo `"fas fa-map"`). Lo usa solo `soluciones/[ambito]/packs/[slugPack]/page.tsx:19,163`. Hay otros ocho `iconMap` locales dentro de componentes de `components/landings/` (ficha [W4](w4-motor-de-landings.md)).

### 3.3 `libs/logovars.ts`

`enum LogoType` con `square`, `wide`, `ultrawide` (`:1-5`) y `logoDimensions` con ancho y alto máximos por tipo (`:7-20`). Lo usan `ImageLogoCliente.tsx:4`, `ClientCarousel.tsx:5`, `ClientCarouselWrapper.tsx:5`, `ClientsMuralSection.tsx:5` y `types/cliente.ts:1`.

### 3.4 `utils/FadeInOnScroll.tsx`

Componente cliente: `framer-motion` + `react-intersection-observer`. Aparece una vez al 10 % de visibilidad, con desplazamiento de 100 px y 0,7 s (`:10,18-25`). Lo usan `app/sites/normapro/page.tsx` y `app/sites/instituto/page.tsx`.

## 4. Endpoints que consume

Esta ficha define la tabla, no llama. Claves de `API_ENDPOINTS` (nombre, ruta de la API sin base, uso real en `src/`):

| Clave | Ruta de la API | Usada en |
|---|---|---|
| `AMBITOS` | `/v1/store/ambitos` | `SolutionsDropdown.tsx:33`, `ModalDescubrir.tsx:42` |
| `AMBITOS_SOLUCIONES` | `/v1/store/ambitosWithSolCounter` | `AmbitosTabs.tsx:40` |
| `LISTSOLUCIONES` | `/v1/store/listsoluciones` | `AmbitosTabs.tsx:82`, `solutionsRefered.tsx:36`, `actualidad/[noticia]/page.tsx:137` |
| `SECTORES` | `/v1/store/sectores` | `SolutionsDropdown.tsx:34`, `ModalDescubrir.tsx:41` |
| `HIGLIGHTEDPACKS` | `/v1/store/highlighted/packs` | `SolutionsDropdown.tsx:35` |
| `CLIENTES` | `/v1/store/clientes` | `ClientCarousel.tsx:39`, `ClientsMuralSection.tsx:18`, `SolutionsHero.tsx:20`, `SolutionsHeroSector.tsx:37`, `historias/[historia]/page.tsx:67` |
| `LISTPACKS` | `/v1/store/listpacks` | `AmbitosTabs.tsx:101`, `solutionsRefered.tsx:55`, `actualidad/[noticia]/page.tsx:118` |
| `SECTOR_INFO` | `/v1/store/sector` | `SolutionsHeroSector.tsx:25` |
| `SOLUCION` | `/v1/store/solucion` | `[ambito]/[slugSolucion]/page.tsx:42` |
| `TESTIMONIOS` | `/v1/store/testimonios` | `MainTestimoniosSection.tsx:21` y 8 sitios más |
| `HISTORIAS` | `/v1/store/historias` | `historias/[historia]/page.tsx:46,51`, `HistoriasClientesSection.tsx:39` |
| `INFORMES` | `/v1/store/informes` | `InformesGridSection.tsx:40`, `informes/[informe]/page.tsx:161`, `MainHeroInstituto.tsx:34` |
| `MAINPACKS` | `/v1/store/mainpacks` | **Solo** `MainSolucionesSection.tsx:32` (sin import: código sin uso) |
| `PACKSCATEGORIA` | `/v1/store/packscategoria` | `MainPacksSection.tsx:17` |
| `APLICACIONES` | `/v1/store/aplicaciones` | `Navbar.tsx:88`, `AplicationsDropDown.tsx:16`, `MainAplicacionesSection.tsx:16` |
| `CONSULTORIA` | `/v1/store/consultoria` | `Navbar.tsx:89`, `ConsultoriaDropdown.tsx:14`, `MainConsultoriaSection.tsx:29`, `consultorias/[consultorias]/page.tsx:4` |
| `PACKS` | `/v1/store/packs` | `packs/[slugPack]/page.tsx:35`, `actualidad/[noticia]/page.tsx:127` |
| `APLICACION` | `/v1/aplicaciones` (router distinto del resto) | `aplicaciones/[aplicacion]/page.tsx:4` |
| `COOKIES` | `/v1/store/cookies` | `Cookies.tsx:12` |
| `EVENTOS` | `/v1/store/eventos` | `MainEventosSection.tsx:14` |
| `ACTUALIDAD` | `/v1/store/actualidad` | `ActualidadGridSection.tsx:96`, `actualidad/[noticia]/page.tsx:105`, `MainHeroInstituto.tsx:35` |
| `GLOBALSEARCH` | `/v1/store/globalsearch` | `Navbar.tsx:54` |
| `LEADS` | `/v1/store/leads` | `Footer.tsx:28`, `FooterInstituto.tsx:28`, `Formulario.tsx:65`, `landings/DescargaInformeModal.tsx:115` |
| `PRENSA` | `/v1/store/prensa` | `instituto/apariciones-prensa/page.tsx:23` |
| `CHATBOT` | `/v1/store/chat` | `services/chatbotService.ts:73` |

Resumen: 25 claves. 24 tienen uso en código vivo. `MAINPACKS` solo se usa en código sin import. Ninguna clave está sin referencias.

Rutas de `api-store…/app/routes/v1/store.ts` que la store no tiene como clave: `ambitos/:id`, `sectores/:id`, `eventos/:id`, `packs/:slug/soluciones`, las rutas `*-editor` y las de beneficios, problemas, casos de uso, características y FAQ. Las de detalle `clientes/:id`, `testimonios/:id`, `historias/:id` e `informes/:id` se componen con la clave de la lista.

### Llamadas fuera de `API_ENDPOINTS`

| Fichero:línea | Qué llama |
|---|---|
| `components/HeroUserCount.tsx:9` | API externa distinta (contador de usuarios) |
| `components/MainFormacionSection.tsx:15` | API externa distinta (formación) |
| `components/MainClientesCarrousel.tsx:6,17-18` | Base propia escrita en el fichero y `/v1/store/usersCount`, que no existe (ST-WEB-05). Sin import |
| `components/landings/HeroSection.tsx:57` | Un JSON de animación Lottie de `public/lotties/` o una dirección externa |

## 5. Datos

### Tipos de `types/` y su copia en la API y en el editor

| Tipo (store) | Importado desde | Estado frente a API/editor ([CONTRATOS.md](../../../docs/CONTRATOS.md) §1.1) |
|---|---|---|
| `ambito.ts` (5 líneas) | 5 ficheros | DIVERGE: el editor añade `textoweb` y `prefijo`; la API no los devuelve |
| `sector.ts` | 3 | DIVERGE: el editor añade `textoweb`; la store no lo tiene |
| `solucion.ts` (76) | 8 | DIVERGE. `CasosDeUso.id_casosdeuso` (`:74`) está mal: la columna es `id_casodeuso`. `Solucion` carece de `fraseCierre`, `consultoriaTitle`, `consultoriaDescription` |
| `pack.ts` (69) | 8 | DIVERGE. Aquí `casosdeuso` usa `id_casodeuso` (`:66-67`), distinto de `solucion.ts` |
| `cliente.ts` | 3 | DIVERGE: el editor añade `permisoweb`. `LogoType` viene de `libs/logovars.ts` |
| `testimonio.ts` | 9 | DIVERGE: la store añade `miniImg?` (`:9`), que la consulta no devuelve; el editor lo tipa plano |
| `historiaCliente.ts` | 1 | DIVERGE menor (`slug?` opcional) |
| `informe.ts` | 3 | DIVERGE: acepta dos nombres para cada imagen (`imgPortada`/`img_portada`, `:31-34`) |
| `actualidad.ts` | 3 | DIVERGE: `id_soluciones`, `content` y `categoria` con tipos distintos al editor |
| `evento.ts` | 1 | DIVERGE menor: el editor añade `hora?` |
| `consultoria.ts` | 5 | DIVERGE: `contenidos` no declarado aquí |
| `aplicacion.ts` | 3 | DIVERGE: `contenidos` no declarado aquí, aunque `GET /v1/aplicaciones/:slug` lo devuelve |
| `chatbot.ts` | 2 | Coincide con la API |
| `breadcrumb.ts` | 5 | Solo store |
| `formacion.ts` | 2 | Solo store; describe una API externa |

«Importado desde» es el número de ficheros de `src/` con `import … types/<nombre>` (búsqueda por texto).

### Copia de `config/api.ts` entre repos

El editor tiene su propia `src/config/api.ts` (ficha E9). Las claves comunes con la store (`AMBITOS`, `AMBITOS_SOLUCIONES`, `LISTSOLUCIONES`, `SECTORES`, `HIGLIGHTEDPACKS`, `CLIENTES`, `LISTPACKS`, `SECTOR_INFO`, `SOLUCION`, `TESTIMONIOS`, `HISTORIAS`, `INFORMES`, `APLICACIONES`, `CONSULTORIA`, `PACKS`, `COOKIES`, `EVENTOS`, `ACTUALIDAD`) tienen la misma ruta en los dos ficheros (comparadas). **Solo en la store:** `MAINPACKS`, `PACKSCATEGORIA`, `APLICACION`, `GLOBALSEARCH`, `LEADS`, `PRENSA`, `CHATBOT`. **Solo en el editor:** las claves `*_EDITOR`, `*_EDITOR_READ`, `BENEFICIOS`, `PROBLEMAS`, `CASOS_DE_USO`, `CARACTERISTICAS`, `FAQ` y `EDITOR_LOGIN`. La base de la API se resuelve distinto: la store con `NEXT_PUBLIC_API_BASE_URL`; el editor con una constante según `import.meta.env.DEV`. Un endpoint nuevo hay que declararlo en cada copia que lo necesite.

## 6. Reglas de negocio y permisos

1. Toda llamada a la API de la store pasa por `API_ENDPOINTS`, salvo las cuatro del apartado 4.
2. Una ruta nueva de la API se añade como clave nueva; no se compone la dirección a mano.
3. Las rutas del catálogo público no llevan autenticación.
4. Los tipos se escriben a mano; ninguno se genera desde la API.
5. `LogoType` solo admite tres valores; otro valor de la base no tiene dimensiones (`logoDimensions[logo.logoType]` sería `undefined`).

## 7. Zonas de riesgo

- Regla de diseño que hoy no se cumple; detalle en el informe restringido.
- Copias de contrato divergentes (apartado 5): un cambio en un campo toca API, editor y store a mano. Ver ST-API-11 para los nombres que no coinciden con la columna (`id_casosdeuso`).
- Cambiar una clave de `API_ENDPOINTS` rompe todos los usos de la tabla del apartado 4. Buscar por nombre de clave antes de renombrar.
- Dos llamadas a APIs externas escritas en el componente (`HeroUserCount.tsx:9`, `MainFormacionSection.tsx:15`): si cambian de dirección hay que editar el componente.
- `libs/icons.ts` solo traduce 12 nombres; un icono no listado en una solución cae en `faCogs` (`packs/[slugPack]/page.tsx:163`).
- `FadeInOnScroll` envuelve secciones enteras con `y: 100` (`FadeInOnScroll.tsx:19`); pensado para la home.
- ST-WEB-04 y ST-WEB-05 afectan a claves de esta tabla: ST-WEB-04 (parámetros que la API no lee, usados con `CLIENTES` y `PACKS`) y ST-WEB-05 (`usersCount`, fuera de la tabla).

## 8. Cómo probarlo

1. Con la API en marcha, abrir `/` y comprobar en la pestaña de red que cada petición va a la base de `NEXT_PUBLIC_API_BASE_URL`.
2. Cambiar la variable (en entorno local, no en el repo) y reiniciar: las peticiones cambian de base.
3. Para una clave concreta: buscar su nombre en `src/` (tabla del apartado 4) y abrir la página que la usa.
4. Tipos: `npx tsc --noEmit` en el repo. El build no falla por tipos (ST-WEB-06), por eso hay que ejecutarlo a mano.
5. `FadeInOnScroll`: bajar por la home; cada bloque debe aparecer una vez.

## 9. Dudas / no localizado

- `libs/fontawesome.ts` sin import: código sin uso (`libs/fontawesome.config.ts` sí se carga).
- `components/MainSolucionesSection.tsx` es el único uso de `MAINPACKS` y no tiene import (ficha [W2](w2-home-normapro.md)).
- Tipos `Solucion`/`Pack` con campos que la API no declara (`price`, `imagenOg`, `descripcion` se leen de `data` sin tipo; ver W10).
- No localizado: tests de los tipos o de `API_ENDPOINTS`.
- No localizado: quién decide qué iconos entran en `iconMap` ni por qué no se usa `libs/icons.ts` en los componentes de landings (cada uno tiene el suyo).
- No localizado: la versión de Node requerida por la store (`package.json` sin `engines`).

## Correcciones de la revisión contra el código (21/10/2026)

### Afirmaciones incorrectas
- Ninguna afirmación incorrecta.

### Cifras o líneas a unificar
- Usos incompletos: `LISTSOLUCIONES` también en `AmbitosTabsResutls.tsx:36`; `LISTPACKS` también en :55; `CONSULTORIA` también en `components/menu/ConsultoriaDropdownInstituto.tsx:12`; `SOLUCION` también en `sector/[sector]/[slugSolucion]/page.tsx:34`.
- `TESTIMONIOS`: `MainTestimoniosSection.tsx:21` y 8 sitios más.
- `libs/fontawesome.ts` tiene 7 líneas (la ficha dice 6). `types/pack.ts` usa `id_casodeuso` en :67. `types/solucion.ts:74` usa `id_casosdeuso`.
- Las 25 claves de `API_ENDPOINTS` están en `config/api.ts:8-32`; 24 tienen uso en código vivo.
- Las cuatro llamadas fuera de `API_ENDPOINTS`: `HeroUserCount.tsx:9`, `MainFormacionSection.tsx:15`, `MainClientesCarrousel.tsx:6,17-18`, `landings/HeroSection.tsx:57`.

### Errores funcionales de esta ficha
- ST-WEB-05: `MainClientesCarrousel` llama a `usersCount`, que no existe ([detalle](../../../docs/ERRORES-DETECTADOS.md)).
- ST-WEB-04: parámetros que la API no lee; no contrastado en esta ficha ([detalle](../../../docs/ERRORES-DETECTADOS.md)).
- ST-API-11: nombres de tipo distintos de la columna o la consulta (`id_casosdeuso` frente a `id_casodeuso`) ([detalle](../../../docs/ERRORES-DETECTADOS.md)).

### Afirmaciones no verificables
- Divergencias de tipos con el editor, si `consultoria.ts` y `aplicacion.ts` deben declarar `contenidos`, ST-WEB-04 y la sección `## 8`.

## Actualización tras el PR del 21/10/2026

Código comparado: `main` `8dc6ec9` frente a `origin/main` `0817fe9` (PR #19). Estado de los ids en [ACT-store.md](../../../docs/revision/ACT-store.md). No probado en ejecución. `config/api.ts`, `context/SiteContext.tsx`, `libs/fontawesome*.ts`, `libs/icons.ts`, `libs/logovars.ts` y los tipos (salvo dos) no cambian.

### Citas rotas
- `libs/seo.config.ts` (§1, línea 9: «se documenta en W10»): borrado. Lo sustituye `libs/seo.ts` (W10, sección de actualización).
- `components/MainSolucionesSection.tsx:32` (clave `MAINPACKS`, §4, §9) y `components/AmbitosTabsResutls.tsx:36,55` (usos de `LISTSOLUCIONES` y `LISTPACKS`, §9): borrados.

### Citas desplazadas
| Antes | Ahora |
|---|---|
| `aplicaciones/[aplicacion]/page.tsx:4` (`APLICACION`) | `:14` |
| `consultorias/[consultorias]/page.tsx:4` (`CONSULTORIA`) | `:14` |
| `historias/[historia]/page.tsx:46-67`, `:46,51`, `:67` (`HISTORIAS`, `CLIENTES`) | `:51-72`, `:51,56`, `:72` |
| `informes/[informe]/page.tsx:161-166` (`INFORMES`) | `:165-170` |
| `soluciones/[ambito]/packs/[slugPack]/page.tsx:35` (`PACKS`, con `?ambito=`) | `services/storeService.ts:74` |
| `soluciones/[ambito]/[slugSolucion]/page.tsx:42` y `sector/…/[slugSolucion]/page.tsx:34` (`SOLUCION`) | `services/storeService.ts:65` |
| `soluciones/[ambito]/packs/[slugPack]/page.tsx:19,163` (`iconMap`, reserva `faCogs`) | `components/soluciones/PackDetalle.tsx:15,99` |
| `actualidad/[noticia]/page.tsx:105,108,118,127,134-141` (`ACTUALIDAD`, `LISTPACKS`, `PACKS`, `LISTSOLUCIONES`) | `…/[noticia]/page.tsx:21,26`; `components/actualidad/NoticiaDetalle.tsx:74,83,93-96` |
| `instituto/apariciones-prensa/page.tsx:23` (`PRENSA`) | `:20` |
| `Cookies.tsx:12` (`COOKIES`) | `:14` |
| `Footer.tsx:28`, `FooterInstituto.tsx:28` (`LEADS`) | `:30`, `:30` |
| `Formulario.tsx:65`, `DescargaInformeModal.tsx:115` (`LEADS`) | `:67`, `:117` |
| `types/ambito.ts` (5 líneas), `types/pack.ts` (69 líneas) | 7 y 81 líneas (campos nuevos, ver abajo) |
| `utils/FadeInOnScroll.tsx:8-37` | sin desplazamiento; solo cambia `ease: "easeOut" as const` (`:22`) |

### Afirmaciones obsoletas
- «Los componentes la usan con `fetch` en el navegador y los `page.tsx` de servidor de aplicaciones, consultorías, historias e informes» (§3.1): ahora también piden en servidor las rutas de ámbito, sector, solución, pack, noticia y prensa. La mayoría de esas consultas pasan por `services/storeService.ts` (`getJson`/`getList`/`React.cache`, `revalidate` de 300 s) y codifican los parámetros con `encodeURIComponent`. La regla «toda llamada pasa por `API_ENDPOINTS`» se mantiene (`storeService.ts:2`).
- «`services/` solo tiene `chatbotService.ts`» (implícito en el CLAUDE.md y en §1): hay también `services/storeService.ts` (92 líneas): `getAmbitos`, `getAmbitoBySlug`, `getSectores`, `getSectorBySlug`, `getAmbitosConSoluciones`, `getSolucion`, `getListSoluciones`, `getPack`, `getPacksCategoria`, `getTestimonios`, `getHistorias`, `getInformes`, `getActualidad`, `getAplicaciones`, `getConsultorias`. Contrato: devuelve `null` en 404 o cuerpo vacío, lanza en otro error de estado; los listados de apoyo devuelven `[]` si fallan.
- «`MAINPACKS`: solo `MainSolucionesSection.tsx:32` (sin import)» (§4) y «25 claves. 24 tienen uso. `MAINPACKS` solo se usa en código sin import» (§4): ahora `MAINPACKS` (`config/api.ts:20`) no tiene ningún uso. 24 claves con uso vivo.
- «`LISTSOLUCIONES` también en `AmbitosTabsResutls.tsx:36`; `LISTPACKS` también en :55» (§9): ese fichero ya no existe.
- «`libs/icons.ts` lo usa solo `…/packs/[slugPack]/page.tsx:19,163`» (§3.2): ahora solo `PackDetalle.tsx:15,99`.
- Nuevo uso de `SECTOR_INFO` y `AMBITOS_SOLUCIONES` en servidor (`storeService.ts:56,60`).
- «`libs/seo.config.ts`»: la configuración de SEO es ahora `libs/seo.ts`; no depende de `next-seo`.
- «Variables de entorno»: ver W1 (también `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_INSTITUTO_SITE_URL`; `libs/seo.ts:5-6`).
- Tipos (§5): `Ambito.textoweb?` (`types/ambito.ts:5`); en `Pack`: `titleweb`, `fraseCierre`, `solucionTitle/Pragma`, `caracteristicasTitle/Pragma`, `casosdeusoTitle/Pragma`, `beneficiosTitle/Pragma` y `soluciones[].icon` (`types/pack.ts:30-31,39-46,59`). Siguen sin declarar: `Solucion.price`/`imagenOg` (ya no se leen en ninguna parte) y `id_casosdeuso` sigue mal (`types/solucion.ts:74`).
- Errores de contrato `ST-WEB-04` (parámetros que la API no lee): VIGENTE (`SolutionsHero.tsx:20`, `ClientsMuralSection.tsx:18`, `ClientCarousel.tsx:39`, `storeService.ts:74`).

### Nuevo
| Pieza | Fichero |
|---|---|
| Base de SEO, hosts y utilidades de URL | `libs/seo.ts` |
| Capa de consulta en servidor | `services/storeService.ts` |
| Serialización segura de JSON-LD | `components/seo/JsonLd.tsx` |
| Campo trampa de formularios | `components/shared/HoneypotField.tsx` |

### Errores de esta ficha
VIGENTES: ST-WEB-04, ST-WEB-05 (`MainClientesCarrousel.tsx:17-18`; sin import), ST-WEB-14 en los clientes. Sin cambios en `libs/fontawesome.ts` (sin import).

### Seguridad
Las llamadas de servidor codifican los segmentos de ruta (SEG-WEB-11 CAMBIADO). Se mantiene la URL de producción de la API como valor por defecto (`config/api.ts:1-5`, SEG-WEB-20 VIGENTE) y ahora los dominios canónicos también tienen valor por defecto escrito (`seo.ts:5-6`). Detalle en [ACT-store.md](../../../docs/revision/ACT-store.md) §7.
