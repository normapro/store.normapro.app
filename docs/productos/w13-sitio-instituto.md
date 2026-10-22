# W13 · Sitio Instituto

Repo: `store.normapro.app`. Ficha revisada contra el código el 21/10/2026. Rutas de fichero relativas a `src/`. Prefijos: `I = app/sites/instituto/`, `P = app/sites/normapro/`, `S = /v1/store`, `A = api-store.normapro.app/app/`.

Instituto es el segundo sitio de la misma aplicación Next. Se sirve por otro host (ver §3.1). La página `I contacto/page.tsx` está en la ficha W8.

## 1. Qué hace

- `/` (home de Instituto): portada con la última actualidad y el último informe, logos de clientes, consultoría, tecnología NormaPro, formación, eventos, actualidad, informes y un testimonio.
- `/que-hacemos`, `/mision-vision-valores`, `/equipo`: páginas de texto fijo.
- `/apariciones-prensa`: lista de apariciones en prensa que lee de la API.
- `/material-prensa`: tres descargas (manual de identidad y dos juegos de logotipos).
- Rutas desconocidas (`[...not-found]`): redirigen a `/`.
- Barra superior, menús desplegables y pie propios de Instituto.

## 2. Dónde está

| Pieza | Fichero | Líneas | Tipo |
|---|---|---|---|
| Home | `I page.tsx` | 83 | Cliente (`:1`) |
| `/apariciones-prensa` | `I apariciones-prensa/page.tsx` | 75 | Cliente (`:1`) |
| `/equipo` | `I equipo/page.tsx` | 70 | Servidor |
| `/material-prensa` | `I material-prensa/page.tsx` | 34 | Servidor |
| `/mision-vision-valores` | `I mision-vision-valores/page.tsx` | 89 | Servidor |
| `/que-hacemos` | `I que-hacemos/page.tsx` | 165 | Servidor |
| Comodín | `I [...not-found]/page.tsx` | 5 | Servidor |
| Portada con actualidad e informe | `components/MainHeroInstituto.tsx` | 180 | Cliente (`:1`) |
| Bloque «Tecnología NormaPro» | `components/MainTecnologiaInstituto.tsx` | 95 | Servidor (sin `'use client'` ni hooks) |
| Barra superior | `components/menu/NavbarInstituto.tsx` | 160 | Cliente (`:1`) |
| Desplegable «Consultoría» | `components/menu/ConsultoriaDropdownInstituto.tsx` | 40 | Cliente (`:1`) |
| Desplegable «Sobre nosotros» | `components/menu/SobreNosotrosDropdownInstituto.tsx` | 28 | Cliente (`:1`) |
| Pie | `components/FooterInstituto.tsx` | 308 | Cliente (`:1`) |
| Layout del sitio | `I layout.tsx` (ficha W1) | 39 | Servidor |

Quién monta cada pieza:
- `NavbarInstituto` y `FooterInstituto`: solo `I layout.tsx:28,30`.
- `MainHeroInstituto` y `MainTecnologiaInstituto`: solo `I page.tsx:17,25`.
- `ConsultoriaDropdownInstituto`: `NavbarInstituto.tsx:66` (escritorio) y `:124` (móvil).
- `SobreNosotrosDropdownInstituto`: `NavbarInstituto.tsx:85` (escritorio) y `:138` (móvil).

Rutas existentes del sitio (carpetas de `I`): `/`, `/apariciones-prensa`, `/contacto`, `/equipo`, `/material-prensa`, `/mision-vision-valores`, `/que-hacemos` y el comodín. Coincide con `docs/MAPA.md` §3.3.

Piezas de otras fichas que usa la home (`I page.tsx:2-12`): `InformesGridSection` (W6), `MainConsultoriaSection` (W5), `MainFormacionSection` (W5), `MainEventosSection` (W2), `ClientCarousel` (W7), `FadeInOnScroll` (W14), `ActualidadGridSection` (W6), `MainHistoriasSection` (W7), `HeaderSection` (W11, en las páginas de texto).

## 3. Flujo

### 3.1 Cómo se llega a este sitio

- `src/middleware.ts:18-21`: si el host es el de Instituto (uno de desarrollo y dos públicos), reescribe la ruta a `/sites/instituto{ruta}`. Los hosts están escritos en el código; no se copian aquí.
- Rutas `/_next`, `/api` y las que contienen un punto no se reescriben (`:6-12`).
- `allowedDevOrigins` de `next.config.ts:20` lista los dos hosts de desarrollo.
- `I layout.tsx:24-38`: `<html>` propio, `NavbarInstituto`, `Providers`, la página y `FooterInstituto`. Título de la pestaña «Instituto», descripción vacía (`:19-22`). **No incluye `SiteProvider`** ni `ChatManager`: en Instituto no hay chatbot y `useSiteRef()` devuelve siempre `null` (valor por defecto, `context/SiteContext.tsx:11`).

### 3.2 Home

`I page.tsx` (cliente). Orden de los bloques:

| Bloque | Línea | Datos |
|---|---|---|
| `MainHeroInstituto` | `:17` | `S/informes`, `S/actualidad` (ver 3.3) |
| `ClientCarousel scope="all" theme="dark"` | `:19` | Ver W7 |
| `MainConsultoriaSection isInstituto` | `:22` | `S/consultoria` (W5) |
| `MainTecnologiaInstituto` | `:25` | Texto fijo (ver 3.4) |
| `MainFormacionSection isInstituto` | `:28` | API externa (W5) |
| `MainEventosSection isInstituto` | `:32` | `S/eventos` (W2) |
| Actualidad | `:35-59` | `ActualidadGridSection onlyLatest isInstituto` con 6 temas escritos en el código (`:53`) |
| Informes | `:61-76` | `InformesGridSection showOnlyLastThree isInstituto` |
| `MainHistoriasSection` | `:79` | `S/testimonios/2` (W7; `docs/MAPA.md` §3.4) |

Los enlaces «Ver todas las noticias» y «Ver todos los informes» (`:43,66`) llevan a la tienda NormaPRO con URL absoluta de producción y `?ref=instituto`, en pestaña nueva.

### 3.3 `MainHeroInstituto`

`components/MainHeroInstituto.tsx`:
1. `useEffect` → `Promise.all` de `GET API_ENDPOINTS.INFORMES` y `GET API_ENDPOINTS.ACTUALIDAD` (`:30-36`).
2. Toma el primer elemento de cada lista (`:41,52`). El orden lo da la API. Para el informe resuelve la ruta de la imagen con `resolveInformeImagePath` (`:15-23`, uso `:45`) y acepta `imgPortada` o `img_portada` (`:45`).
3. Mientras carga: dos tarjetas de esqueleto (`:83-88`). Si falla: `console.error` (`:55`) y no se pintan tarjetas; queda el título «La excelencia es un hábito» (`:79-81`).
4. Tarjeta de actualidad: enlace absoluto a la tienda con `slug` o `id_noticia` (`:96`). Imagen con `next/image`: `actualidad.imagen` con `/` delante si no lo trae (`:102`).
5. Tarjeta de informe: enlace absoluto con `slug` o a la lista (`:134`).
6. Dos imágenes de fondo `hielo_1_instituto.png` y `hielo_2_instituto.png` (`:66-76`). Existen en `public/main/`.

### 3.4 `MainTecnologiaInstituto`

Componente de servidor sin datos. Título «Tecnología NormaPro» (`:57-59`), texto (`:62-64`), botón «Conoce más» a la tienda con URL absoluta (`:67-74`) y cinco imágenes `head_img1..5@2x.png` de `public/main/` (`:1-37,78-90`). Existen.

### 3.5 `NavbarInstituto`

`components/menu/NavbarInstituto.tsx`:
- Escritorio (`:61-97`): «Consultoría» (desplegable al pasar el ratón, `:62-69`), «Tecnología» (`:71`), «Formación» (`:72`), «Historias con clientes» (`:73-79`), «Sobre nosotros» (desplegable, `:81-88`), «Hazte Partner» (`:90-96`). Botón «Contacta» a `/contacto` (`:99-101`).
- Móvil (`:112-149`): menú con las mismas entradas. «Contacta» abre `Formulario` (`:143`, `:155`; ficha W8).
- Enlaces internos que no existen en `I`: `/instituto/tecnologia` (`:71,128`), `/instituto/formacion` (`:72,129`), `/instituto/historias` (`:130`), `/instituto/partners` (`:142`). Con el host de Instituto, `/instituto/...` se reescribe a `/sites/instituto/instituto/...`, que cae en el comodín y redirige a `/` (`middleware.ts:18-21`, `I [...not-found]/page.tsx:3-5`). Es lectura del código; no ejecutado.
- «Historias con clientes» y «Hazte Partner» de escritorio van a la tienda con URL absoluta y `?ref=instituto` (`:74,91`). En el menú móvil los mismos textos van a las rutas internas inexistentes (`:130,142`).
- Código sin uso dentro del fichero: props `isChatHidden` y `onShowChat` (`:16-21`), estado `mobileConsultorias` (`:25`, sin `setMobileConsultorias` en uso) e importaciones `FormEvent`, `useCallback` (`:4`) y `API_ENDPOINTS` (`:6`).

### 3.6 Desplegables

- `ConsultoriaDropdownInstituto`: al montarse pide `GET API_ENDPOINTS.CONSULTORIA` y guarda la respuesta (`:10-17`), sin comprobar `ok` ni capturar error. Pinta un enlace por consultoría: `description`, `shortDescription` y enlace absoluto a la tienda `/consultorias/{slug}?ref=instituto` en pestaña nueva (`:22-34`).
- `SobreNosotrosDropdownInstituto`: 4 enlaces fijos. `/que-hacemos`, `/mision-vision-valores` y `/equipo` existen; «Políticas» va a la tienda con URL absoluta (`:8-23`).

### 3.7 `FooterInstituto`

`components/FooterInstituto.tsx`:
- Newsletter (`:16-60`, `:76-97`): `POST API_ENDPOINTS.LEADS` con `email`, `acepta_marketing: true` y `origen_ruta` (`:28-38`). Muestra el `error` de la API o un texto fijo (`:40-47,95-97`). Solo valida que el correo no esté vacío (`:20-23`).
- Columnas de enlaces (`:127-213`):
  - Existen en `I`: `/que-hacemos` (`:157`), `/mision-vision-valores` (`:158`), `/equipo` (`:159`), `/apariciones-prensa` (`:181`), `/material-prensa` (`:182`), `/contacto` (`:196`).
  - No existen en `I` (caen en el comodín y redirigen a `/`): `/ingenieria` (`:153`), `/universe` (`:174`), `/canal-denuncias` (`:175`), `/portal-empleado` (`:176`), `/formapro` (`:177`), `/academia` (`:190`), `/cursos-normativa` (`:191`), `/cursos-compliance` (`:192`).
  - Absolutos a la tienda: tres consultorías (`:133,140,147`), políticas (`:161`), partners (`:198`), trabajo (`:205`).
- Pie legal (`:268-292`): enlaces absolutos a aviso legal (`:274`), privacidad (`:280`) y cookies (`:286`).
- Diferencias entre enlaces: la consultoría de «compliance» se escribe `compliance-penal` en `I que-hacemos/page.tsx:13` y `cumpliance-penal` en `:140` del pie. La privacidad se escribe `politica-de.privacidad` en `:280`; la ruta real es `politica-de-privacidad` (`P politica-de-privacidad/page.tsx`).
- `rel="noopener noferrer"` en `:199`.
- `Formulario` se importa y se declara su estado (`:7,11`), y se renderiza si `openModal` (`:296-301`); nada pone `openModal` en verdadero.
- Imágenes: `/institutoLogo.png`, `/footer/Grupo 44xx@2x.png` (6 ficheros) (`:107,228-262`). Existen en `public/`.

### 3.8 Páginas de texto

- `/que-hacemos` (`I que-hacemos/page.tsx`): cabecera, bloque con imagen `/instituto/que-hacemos/que-hacemos.jpg` (`:76`), dos párrafos (`:86-91`), «Soluciones» con 2 tarjetas y enlaces (`:5-26,95-132`), `CertificacionesSection` con 6 logos (`:135-139`) y «3 pilares» (`:28-53,142-163`).
- `/mision-vision-valores`: misión (`:24-58`, imagen `/instituto/mision-vision-valores/mision.jpg`), visión (`:61-69`) y 3 valores (`:6-19,72-86`). El enlace «Leer más» va a `/` (`:42`).
- `/equipo`: texto, imagen `/historiasclientes/Todos-sin-casco.jpg` (`:25`) y una cita (`:58-68`).
- `/material-prensa`: lista de 3 recursos con `href: ""` en los tres (`:5-9`); el enlace lleva el atributo `download` (`:21-24`).
- `/apariciones-prensa` (`:16-76`): `GET API_ENDPOINTS.PRENSA` (`:23`) → lista; si la carga falla o la lista está vacía, la página devuelve `null` y no se ve ni la cabecera (`:37`).
- Todas las imágenes citadas existen en `public/`.

### 3.9 Caché y revalidación

Sin caché de Next. Los `fetch` de Instituto salen del navegador. Las páginas de texto son contenido del código.

## 4. Endpoints que consume

| Verbo | Ruta | Fichero:línea |
|---|---|---|
| GET | `S/informes` | `components/MainHeroInstituto.tsx:34` |
| GET | `S/actualidad` | `components/MainHeroInstituto.tsx:35` |
| GET | `S/prensa` | `I apariciones-prensa/page.tsx:23` |
| GET | `S/consultoria` | `components/menu/ConsultoriaDropdownInstituto.tsx:12` |
| POST | `S/leads` (newsletter) | `components/FooterInstituto.tsx:28` |
| POST | `S/leads` (modal de contacto móvil) | vía `Formulario.tsx:65`, abierto desde `NavbarInstituto.tsx:143` (ficha W8) |

Endpoints que llaman los componentes de otras fichas montados en la home (según `docs/MAPA.md` §3.4, no abiertos por este lote): `S/consultoria`, `S/eventos`, `S/actualidad`, `S/informes`, `S/clientes`, `S/testimonios/2`, y una API externa de formación.

URLs desde `config/api.ts` (`INFORMES :19`, `ACTUALIDAD :28`, `PRENSA :31`, `CONSULTORIA :23`, `LEADS :30`).

Comprobado en la API: `GET S/prensa` ejecuta `SELECT title, subtitle, link FROM storePrensa` (`A models/storeModel.ts:1806-1815`). Coincide con el tipo `Noticia` de la página (`apariciones-prensa/page.tsx:10-14`).

## 5. Datos

- `Noticia` (`apariciones-prensa/page.tsx:10-14`): `title`, `subtitle`, `link`. Tipo local.
- `Informe`, `Actualidad` (`types/informe.ts`, `types/actualidad.ts`) en `MainHeroInstituto.tsx:3-4`. `InformeWithResolvedImage` añade `resolvedImagePath` (`:11-13`).
- `Consultoria` (`types/consultoria.ts`) en los dos menús de Instituto (`ConsultoriaDropdownInstituto.tsx:3`).
- `NavbarInstituto` recibe `isChatHidden?` y `onShowChat?` (`:16-19`); `I layout.tsx:28` no se las pasa.
- Datos escritos en el código: pilares (`I que-hacemos/page.tsx:28-53`), valores (`I mision-vision-valores/page.tsx:6-19`), recursos de prensa (`I material-prensa/page.tsx:5-9`), temas de actualidad (`I page.tsx:53`), enlaces de menús y pie.
- Parámetro `?ref=instituto`: lo llevan todos los enlaces a la tienda (pie, barra, desplegables, portada). Cómo se interpreta: `docs/MAPA.md` §3.2.

## 6. Reglas de negocio y permisos

- Sin autenticación.
- El sitio Instituto solo funciona de forma independiente por host. Con otro host (incluido `localhost`) el middleware sirve el sitio NormaPRO (`middleware.ts:35`).
- Los enlaces a la tienda llevan `?ref=instituto` para que la tienda se muestre en modo Instituto. El modo lo activa `x-site-ref`, que el middleware escribe en la respuesta (`middleware.ts:27-30`) y el layout de NormaPRO lee de la petición (`P layout.tsx:28-29`). Por lectura del código, la cabecera no llega al layout. Confirma el hallazgo provisional ST-WEB-02. No ejecutado.
- Efecto: los 4 componentes que leen `useSiteRef` (ficha W4) no cambian de aspecto en la tienda a la que entra un visitante de Instituto. En el propio sitio Instituto tampoco: no hay `SiteProvider` (`I layout.tsx`).
- Newsletter: la API trata un envío sin nombre ni apellidos como suscripción (`A controllers/storeController.ts:79-93`) y responde 409 si el correo ya existe (`:81-88`). El pie muestra ese texto (`FooterInstituto.tsx:40-47`).
- Seguridad: regla de diseño que hoy no se cumple; detalle en el informe restringido.

## 7. Zonas de riesgo

- Enlaces rotos en barra y pie: 4 rutas en la barra y 8 en el pie llevan a `/` sin aviso (§3.5 y §3.7). Hay dos más con la dirección mal escrita en el pie (`:140,280`).
- Los enlaces de descarga de `/material-prensa` están vacíos (`:6-8`). El botón no descarga ninguno de los tres ficheros.
- Todos los enlaces a la tienda tienen la URL de producción escrita en el código. En desarrollo o en un entorno de pruebas llevan a producción.
- `ConsultoriaDropdownInstituto` guarda la respuesta de la API sin comprobar el estado (`:12-14`). Si la API responde un error con cuerpo objeto, `consultorias.map` falla al abrir el menú (`:22`). No probado.
- `/apariciones-prensa` devuelve página vacía si la lista está vacía o falla la carga (`:37`).
- Dependencia de `MainConsultoriaSection`, `MainFormacionSection`, `MainEventosSection`, `ActualidadGridSection`, `InformesGridSection` y `ClientCarousel`, compartidos con NormaPRO (fichas W2, W5-W7). Un cambio en ellos afecta a la home de Instituto.
- Datos de contacto y textos de empresa escritos en el código.
- Seguridad: regla de diseño que hoy no se cumple; detalle en el informe restringido.

## 8. Cómo probarlo

1. Arrancar API y store (`docs/ENTORNO.md`; `npm run dev`).
2. Acceder por el host de desarrollo de Instituto (`docs/MAPA.md` §3.2; exige entrada en el fichero de hosts del sistema). Con `localhost` se ve el sitio NormaPRO.
3. Home: deben salir los bloques de §3.2. Revisar la portada: una tarjeta de actualidad y otra de informe.
4. Barra: pasar el ratón sobre «Consultoría» y «Sobre nosotros». Pulsar «Tecnología» y «Formación»: anotar a dónde llevan (esperado: `/`).
5. Pie: pulsar cada enlace de las tres columnas y anotar los que redirigen a `/`. Escribir un correo de prueba en la newsletter y enviar. Pestaña Red: `POST /v1/store/leads` con 201; repetir el mismo correo: 409.
6. `/material-prensa`: pulsar cada «Descargar»: anotar qué ocurre.
7. `/apariciones-prensa`: con filas en `storePrensa` sale la lista. Con la tabla vacía, la página queda en blanco.
8. Vista móvil: abrir el menú y pulsar «Contacta» (abre el modal de contacto, W8).
9. API parada: recargar la home y abrir «Consultoría» de la barra: anotar qué se ve.

## 9. Dudas / no localizado

- Destino previsto de `/instituto/tecnologia`, `/instituto/formacion`, `/instituto/historias`, `/instituto/partners`, `/ingenieria`, `/universe`, `/canal-denuncias`, `/portal-empleado`, `/formapro`, `/academia`, `/cursos-normativa`, `/cursos-compliance`: no localizado (no existen páginas ni redirecciones).
- Ficheros de `/material-prensa`: no localizados. No hay ficheros de descarga en `public/` citados por el código.
- Slug correcto de la consultoría de compliance (`compliance-penal` o `cumpliance-penal`): no localizado; depende de la tabla `storeConsultoria`, que no se ha leído.
- Si `/politica-de.privacidad` (`FooterInstituto.tsx:280`) responde algo: no probado. La ruta contiene un punto y el middleware no la reescribe (`middleware.ts:9`).
- Qué hace `actualidad.imagen` vacío en `MainHeroInstituto.tsx:102`: genera la ruta `/null`. No probado.
- Si el sitio Instituto debe tener chatbot: no localizado (`I layout.tsx` no monta `ChatManager`).
- Si la home de Instituto debe usar `useSiteRef`: no localizado. Hoy `SiteProvider` solo está en `P layout.tsx:34`.
- `I que-hacemos/page.tsx:87` escribe «ESMPRESA» en el texto. No localizado si es una errata a corregir.
- Título de página «Instituto» y descripción vacía (`I layout.tsx:19-22`): no localizado si es definitivo.
- Los 3 mapas de `/contacto` pertenecen a la ficha W8.
- Los enlaces del pie «Sobre nosotros» llevan a `/que-hacemos`; el texto del desplegable dice «Qué hacemos» (`SobreNosotrosDropdownInstituto.tsx:9`). No localizado si hay otra página prevista.

## Correcciones de la revisión contra el código (21/10/2026)

### Afirmaciones incorrectas
- Ninguna afirmación incorrecta.

### Cifras o líneas a unificar
- Enlaces rotos de Instituto: 4 en la barra (`NavbarInstituto.tsx:71,72,128-130,142`) y 8 en el pie (`FooterInstituto.tsx:153,174-177,190-192`). Más el mal escrito de :280 y el slug `cumpliance-penal` de :140.
- En `app/sites/instituto/` solo existen 7 carpetas y el comodín.
- `Formulario` en el pie: render en `FooterInstituto.tsx:298-300`.
- Falta en la ficha: `actualidad.imagen` vacío genera `/null` (:102) y `/apariciones-prensa` también devuelve `null` mientras carga.
- «Contacta» va a `/contacto` en escritorio (:99) y abre el modal en móvil (:155).

### Errores funcionales de esta ficha
- ST-WEB-02: `x-site-ref` no llega al layout; los `?ref=instituto` son decorativos ([detalle](../../../docs/ERRORES-DETECTADOS.md)).
- ST-WEB-16: enlaces de Instituto a páginas que no existen ([detalle](../../../docs/ERRORES-DETECTADOS.md)).
- ST-WEB-18: enlaces de Instituto mal escritos (`politica-de.privacidad`, `cumpliance-penal`) ([detalle](../../../docs/ERRORES-DETECTADOS.md)).
- ST-WEB-39: «Contacta» va a sitios distintos en escritorio y móvil ([detalle](../../../docs/ERRORES-DETECTADOS.md)).
- ST-WEB-40: `/material-prensa` no descarga nada ([detalle](../../../docs/ERRORES-DETECTADOS.md)).

### Afirmaciones no verificables
- Endpoints de los componentes de otras fichas (según `docs/MAPA.md`) y la sección `## 8`. El menú móvil no se abrió línea a línea.

- Hay reglas de diseño que hoy no se cumplen; detalle en el informe restringido.

## Actualización tras el PR del 21/10/2026

Código comparado: `main` `8dc6ec9` frente a `origin/main` `0817fe9` (PR #19). Estado de los ids en [ACT-store.md](../../../docs/revision/ACT-store.md). No probado en ejecución. `I = app/sites/instituto/`.

### Citas rotas
- `I layout.tsx` ya no monta `Providers` (§3.x): `Providers` se borró.
- `I page.tsx` (79 líneas) ya no contiene la portada: ahora tiene 15 líneas y monta `components/home/HomeInstituto.tsx`.

### Citas desplazadas
| Antes | Ahora |
|---|---|
| `I page.tsx:17-79`, `:12`, `:19`, `:22`, `:28`, `:51`, `:74`, `:79` | `components/home/HomeInstituto.tsx`, las mismas líneas (`:17-76` el contenido; `:12`, `:19`, `:22`, `:28`, `:51`, `:74`, `:79`). `I page.tsx` actual: `metadata` `:7-11`, componente `:13-15` |
| `I page.tsx:43`, `:66` (enlaces «Ver todas…», «Ver todos…») | `HomeInstituto.tsx:43`, `:66` |
| `I layout.tsx:24-39`, `:24-38` | `:44-60` |
| `I layout.tsx:28,30` (`NavbarInstituto`, `FooterInstituto`) | `:49`, `:51` |
| `I layout.tsx:19-22` (título, descripción) | `:21-42` (`generateMetadata`) |
| `middleware.ts:18-21` (rama Instituto), `:9` (ruta con punto), `:27-30` (`ref`) | `:35-38`, `:26`, `:11-14` |
| `next.config.ts:20` (`allowedDevOrigins`) | `:13` |
| `I apariciones-prensa/page.tsx:16-76`, `:23`, `:37`, `:75` | `:16-72`; la petición está en `:20`; `return null` si no hay datos en `:33`; 72 líneas. Tipo `Noticia` `:10-14` sin cambio |
| `I que-hacemos/page.tsx:3`, `:13`, `:87` | `:5`, `:17`, `:91` |
| `I material-prensa/page.tsx:5-9`, `:21-24` | `:9-13`, `:25-28` |
| `I equipo/page.tsx`, `I mision-vision-valores/page.tsx` | +2 a +4 líneas (import y `metadata`) |
| `I contacto/page.tsx:6-25`, `:36`, `:44-53`, `:62-81` | `:10-29`, `:40`, `:48-57`, `:66-85` |
| `FooterInstituto.tsx:11`, `:28`, `:40-47`, `:140`, `:153`, `:161` | `:12`, `:30`, `:43-50`, `:144`, `:157`, `:165` |
| `FooterInstituto.tsx:174-177`, `:190-192`, `:199`, `:205`, `:268-292`, `:274`, `:280`, `:286` | `:178-181`, `:194-196`, `:203`, `:209`, `:272-296`, `:278`, `:284`, `:290` |
| `FooterInstituto.tsx:298-300`, `:299`, `:308` | `:302-304`, `:303`, `:312` |
| `MainHeroInstituto.tsx` (`:34`, `:96`, `:102`, `:134`) | sin desplazamiento |
| `MainHistoriasSection.tsx:112` | `:111` |
| `NavbarInstituto.tsx` | sin cambios |

### Afirmaciones obsoletas
- «Instituto se sirve en el host del instituto y en `inicie…`; los hosts están en `middleware.ts:18`» (§3.x): los hosts están en `libs/seo.ts:16-23` (`instituto.local`, `institutodeinnovacion.es`, `www.institutodeinnovacion.es`, `inicie.normapro.es`, `www.inicie.normapro.es`). El canónico del sitio es `https://www.institutodeinnovacion.es` (`seo.ts:6`).
- «Título de la pestaña “Instituto”, descripción vacía» (§3.x): título con plantilla `%s | Instituto de Innovación, Ciencia y Empresa`; portada «La excelencia es un hábito \| Instituto…» (`I page.tsx:7-11`); robots por host (`I layout.tsx:21-42`). Sin descripción por defecto.
- «`/apariciones-prensa`: Cliente (`:1`)… `GET PRENSA` (`:23`)» (§2, §3, §4): ahora es página de servidor `async` que pide con `revalidate` de 300 s (`:20`) y devuelve `[]` ante cualquier fallo (`:21-27`). Si la lista está vacía devuelve `null` y no se ve ni la cabecera (`:33`). Hay `metadata` (`:16`).
- Cambio de encabezados (si la ficha cita el nivel): el título de la portada es ahora `h1` (`MainHeroInstituto.tsx:79`) y el de `MainTecnologiaInstituto.tsx:56` pasa a `h2`.
- «La privacidad se escribe `politica-de.privacidad` en `:280`» (§3.7, §9): corregido (`FooterInstituto.tsx:284`: `politica-de-privacidad`). Queda `cumpliance-penal` (`:144`). El enlace de informes con `?ref=instittuo` también está corregido (`informes/InformesGridSection.tsx:103`). ST-WEB-18 CAMBIADO.
- «Ningún código pone `openModal` en verdadero» (§3.7): sigue.
- «Newsletter: `{email, acepta_marketing, origen_ruta}`» (§3.7, §4): añade `website` (`FooterInstituto.tsx:38`) y monta `HoneypotField` (`:80`). Sigue `acepta_marketing: true` (`:37`).
- «El modo Instituto lo activa `x-site-ref`, que el middleware escribe en la respuesta» (§9): ahora va en la petición (`middleware.ts:16`) y el layout de NormaPRO lo lee (`normapro/layout.tsx:49`). `?ref=instituto` deja de ser decorativo por código; sin probar. ST-WEB-02 RESUELTO.
- «Los enlaces rotos: 4 en la barra y 8 en el pie» (§9): siguen los 12 (ST-WEB-16 VIGENTE: `NavbarInstituto.tsx:71,72,128-130,142`; `FooterInstituto.tsx:157,178-181,194-196`).
- «`/material-prensa`: los tres `href` vacíos» (ST-WEB-40): siguen (`material-prensa/page.tsx:10-12,26-27`).
- «`actualidad.imagen` vacío genera `/null`» (§9): sigue (`MainHeroInstituto.tsx:102`, ST-WEB-30).
- Erratas: «ESMPRESA» sigue (`que-hacemos/page.tsx:91`); `noferrer` sigue (`FooterInstituto.tsx:203`).
- ST-WEB-20 (texto invisible sin eventos), ST-WEB-39 (Contacta distinto en escritorio y móvil: `NavbarInstituto.tsx:99,155`), ST-WEB-42 y ST-WEB-07 (`MainHistoriasSection.tsx:16,111`): VIGENTES.

### Nuevo
| Pieza | Fichero |
|---|---|
| Portada (cliente) | `components/home/HomeInstituto.tsx` |
| Sitemap de Instituto (7 rutas fijas) | `app/sitemap.xml/route.ts:36-44,160` |
| `robots.txt` por host | `app/robots.txt/route.ts` |
| `Organization` JSON-LD | `I layout.tsx:48` |
| `metadata` en las siete páginas | una línea por `page.tsx` con `site: "instituto"` |

### Seguridad
El `noindex` por host y el campo trampa de la newsletter son nuevos. Los iframes de mapas de `/contacto` y los enlaces de prensa (`apariciones-prensa/page.tsx:57`) siguen igual (SEG-WEB-08). Estado de SEG-WEB-06, -12, -14, -18 en [ACT-store.md](../../../docs/revision/ACT-store.md) §7.
