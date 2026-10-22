# W11 · Cabecera, pie y menús (sitio NormaPRO)

Repo: `store.normapro.app`. Rutas de fichero relativas a `src/` salvo indicación. Revisada contra el código el 21/10/2026. El pie y el menú del sitio Instituto están en la ficha [W13](w13-sitio-instituto.md).

## 1. Qué hace

Pinta la barra de anuncio, la barra de navegación con tres menús desplegables, el buscador global, el menú móvil, el modal «Descubrir», el botón «Entrar», el pie con newsletter, las migas de pan y la cabecera de sección.

## 2. Dónde está

| Pieza | Fichero | Líneas |
|---|---|---|
| Barra de anuncio y navbar | `components/menu/Navbar.tsx` | 124-338 |
| Menú de escritorio | `components/menu/Navbar.tsx` | 140-167 |
| Menú móvil | `components/menu/Navbar.tsx` | 193-259 |
| Buscador y resultados | `components/menu/Navbar.tsx` | 50-80, 261-311 |
| Desplegable Soluciones (escritorio y móvil) | `components/menu/SolutionsDropdown.tsx` | 19-232 |
| Desplegable Aplicaciones | `components/menu/AplicationsDropDown.tsx` | 9-74 |
| Desplegable Consultoría | `components/menu/ConsultoriaDropdown.tsx` | 9-53 |
| Modal «Descubrir» | `components/menu/ModalDescubrir.tsx` | 16-165 |
| Botón de pack destacado | `components/menu/packHighlightedButton.tsx` | 5-35 |
| Botón «Entrar» | `components/NormaproAccessButton.tsx` | 7-49 |
| Pie | `components/Footer.tsx` | 10-228 |
| Migas de pan | `components/breadcrump.tsx` | 11-36 |
| Cabecera de sección | `components/HeaderSection.tsx` | 9-21 |
| Tipo de migas | `types/breadcrumb.ts` | 1-4 |
| Montaje del navbar | `components/ChatManager.tsx` | 47-50 |
| Montaje del pie | `app/sites/normapro/layout.tsx` | 38 |

El `Navbar` no está en el layout: lo monta `ChatManager` (ficha [W9](w9-chatbot.md)).

## 3. Flujo

Todo es cliente (`"use client"`). Sin caché ni revalidación de Next; los datos salen de `fetch` en el navegador.

### 3.1 Navbar

- Barra superior con texto fijo y enlace «Descubrir →» que abre `ModalDescubrir` (`Navbar.tsx:124-131`).
- Escritorio (`:140-167`): tres botones con desplegable que se abre con el ratón encima (`onMouseEnter`) y se cierra al salir (`onMouseLeave`, `:316,323,330`). Enlaces directos a `/formacion` y `/historias`.
- Móvil (`:181-188,193-259`): botón de menú que abre un panel a pantalla completa. Bloquea el scroll del `body` (`:108-117`). Aplicaciones y consultorías se piden la primera vez que se abre (`:82-106`).
- Buscador: se abre con la lupa (`:175-177,182`). Con 3 o más caracteres espera 500 ms y pide la búsqueda (`:50-67`). Agrupa por `category` y muestra pestañas fijas `Resultados`, `Aplicaciones`, `Soluciones` (`:69-75,283-293`). Cada resultado enlaza a `/<slug>` (`:296`).
- Botón «Reserva un diagnóstico gratuito» dentro de los resultados abre `Formulario` (`:302-306,337`).
- Botón de chat: solo si el chat está oculto (`:170-174`).

### 3.2 Desplegables

- `SolutionsDropdown`: pide ámbitos, sectores y packs destacados a la vez (`:32-36`). Muestra tres columnas en escritorio (`:154-217`) o una lista en móvil (`:61-148`). Elegir un sector abre `AmbitoSelectModal` (ficha [W3](w3-soluciones-ambitos-sectores-packs.md)) y navega con `window.location.href` a `/soluciones/<ámbito>/sector/<sector>` (`:138-146,222-229`). El enlace «Ver todas nuestras soluciones» va a `/soluciones/all` (`:128,211`).
- `AplicacionesDropdown`: pide aplicaciones (`:16`). Cada una enlaza a `/aplicaciones/<slug>` (`:50`). Icono: `uriIcon` o un icono por defecto (`:45-47`).
- `ConsultoriaDropdown`: pide consultorías (`:14`). Cada una enlaza a `/consultorias/<slug>` (`:32`). Icono bajo `/main/` (`:36`). Sin comprobación de `response.ok` (`:14-16`).
- `PackHighlightedButton`: enlace a `/soluciones/<slug_ambito>/packs/<slug>` (`:10`) con icono `"/" + uriIcon` (`:21`).

### 3.3 Modal «Descubrir»

Paso 1: dos botones («En otro momento», «Empezar»; `ModalDescubrir.tsx:67-87`). Paso 2: carga sectores y ámbitos (`:35-55`) y muestra dos listas (`:90-138`). «Ver productos» enlaza a `/soluciones/<ámbito>/sector/<sector>` o a `/soluciones/<ámbito>` (`:140-151`); sin ámbito está desactivado (`:153-158`). El sector es opcional.

### 3.4 Botón «Entrar»

Al pulsar, anima el icono y, al terminar la animación, cambia `window.location.href` a la dirección del acceso de NormaPRO (`NormaproAccessButton.tsx:10-14,29-33`). La dirección está escrita en el código (`:31`); no se copia aquí.

### 3.5 Pie

- Newsletter (`Footer.tsx:16-60`): valida solo que el email no esté vacío (`:20-23`), hace `POST` a `LEADS` con `email`, `acepta_marketing: true` y `origen_ruta` (`:28-38`). Muestra el mensaje de la API en error (`:40-47`) o «Suscripción realizada correctamente.» (`:49`).
- Enlaces (`:121-135`): Soluciones, Formación, Historias, Actualidad, Informes, Quiénes somos, Partners, Trabaja, Políticas y «Contacto» (abre `Formulario`, `:133-135,223-225`).
- Redes: dos enlaces externos a LinkedIn y YouTube (`:97-102`).
- Legales (`:211-213`): `/aviso-legal/`, `/politica-de-privacidad/`, `/politica-de-cookies-ue/`.
- Logos y certificaciones: imágenes de `public/footer/` (`:149,167-175,191,198`).
- Texto de marca registrada (`:216`).

### 3.6 Migas y cabecera de sección

`Breadcrumb` recibe un objeto anidado `{title, url, children?}` y lo pinta con `>` entre niveles (`breadcrump.tsx:12-35`). `HeaderSection` pinta un texto con una línea en variante `dark` o `light` (`HeaderSection.tsx:9-21`).

## 4. Endpoints que consume

| Verbo | Ruta (clave de `config/api.ts`) | Fichero:línea | Router API |
|---|---|---|---|
| GET | `/v1/store/globalsearch?q=` (`GLOBALSEARCH`) | `Navbar.tsx:54` | `routes/v1/store.ts:133` |
| GET | `/v1/store/aplicaciones` (`APLICACIONES`) | `Navbar.tsx:88`, `AplicationsDropDown.tsx:16` | `store.ts:82` |
| GET | `/v1/store/consultoria` (`CONSULTORIA`) | `Navbar.tsx:89`, `ConsultoriaDropdown.tsx:14` | `store.ts:94` |
| GET | `/v1/store/ambitos` (`AMBITOS`) | `SolutionsDropdown.tsx:33`, `ModalDescubrir.tsx:42` | `store.ts:15` |
| GET | `/v1/store/sectores` (`SECTORES`) | `SolutionsDropdown.tsx:34`, `ModalDescubrir.tsx:41` | `store.ts:24` |
| GET | `/v1/store/highlighted/packs` (`HIGLIGHTEDPACKS`) | `SolutionsDropdown.tsx:35` | `store.ts:30` |
| POST | `/v1/store/leads` (`LEADS`) | `Footer.tsx:28` | `store.ts:12` |

El formulario de contacto abierto desde el navbar y el pie es `Formulario.tsx` (ficha [W8](w8-contacto-candidatura-formularios.md)).

## 5. Datos

- `BreadcrumbItem`: `title`, `url`, `children?` (`types/breadcrumb.ts:1-4`).
- Resultado de búsqueda: sin tipo, `any[]` (`Navbar.tsx:44`). La API devuelve `name`, `description`, `category`, `slug` (`api-store…/models/storeModel.ts:1516-1561`). Valores de `category`: `Resultados`, `Aplicaciones`, `Soluciones`.
- Tipos usados: `Aplicacion` (`types/aplicacion.ts`), `Consultoria` (`types/consultoria.ts`), `Solucion` (`types/solucion.ts`), `Ambito`, `Sector`. Divergencias con la API: ver [CONTRATOS.md](../../../docs/CONTRATOS.md) §1.1.
- Lead del pie: `{email, acepta_marketing, origen_ruta}` sin tipo (`Footer.tsx:33-37`).
- Textos editables en código: barra superior (`Navbar.tsx:127`), nombres del menú (`:146,154,162,165,166`), pie (`Footer.tsx:72,88,96,122-135,216`), modal (`ModalDescubrir.tsx:70,77,83,100,106,124`).

## 6. Reglas de negocio y permisos

1. El menú público no tiene autenticación; «Entrar» envía al acceso externo.
2. La búsqueda empieza con 3 caracteres (`Navbar.tsx:51`) y espera 500 ms (`:65`).
3. Las pestañas de resultados son tres y fijas (`:75`). Un resultado con otra `category` no se muestra.
4. La newsletter envía siempre `acepta_marketing: true` (`Footer.tsx:35`). El usuario no ve ni marca una casilla.
5. Límite de envíos de leads: lo aplica la API (ficha A6), no la store.
6. Los desplegables de escritorio no existen en móvil: hay un menú aparte con las mismas fuentes de datos.

## 7. Zonas de riesgo

- Regla de diseño que hoy no se cumple; detalle en el informe restringido.
- **Error funcional nuevo (sin id):** el enlace «Formación» (`Navbar.tsx:165,251`; `Footer.tsx:123`; `MainFormacionSection.tsx:40`) apunta a `/formacion`, y no hay carpeta `formacion` en `app/sites/normapro/` (`find src/app -name page.tsx`). Cae en `[...not-found]/page.tsx:1-5`, que redirige a `/`. El visitante vuelve a la home.
- **Error funcional nuevo (sin id):** el buscador enlaza a `/<slug>` (`Navbar.tsx:296`). Para consultorías la API devuelve `consultoria/<slug>` (`storeModel.ts:1524`) y la ruta de la store es `/consultorias/<slug>`. El enlace cae en `[...not-found]` y redirige a la home. Las demás categorías coinciden con rutas existentes (`actualidad/`, `informes/`, `soluciones/`, `aplicaciones/`).
- `/soluciones/all` (`SolutionsDropdown.tsx:128,211`) entra en la ruta `[ambito]` con el valor `all` (`soluciones/[ambito]/page.tsx:19`, que usa `"all"` como valor por defecto). Existe también `todas-las-soluciones`; ningún menú ni pie enlaza a ella.
- `SolutionsDropdown` no comprueba `response.ok` (`:33-35`): una respuesta de error rompe `.json()` o deja listas con un objeto de error.
- `ConsultoriaDropdown` sin `try/catch` ni `ok` (`:12-20`): si la API falla, la promesa queda sin tratar.
- Navegación con `window.location.href` en vez de `router` (`SolutionsDropdown.tsx:144,227`): recarga completa de la página.
- `Navbar.tsx` ocupa 342 líneas con buscador, tres menús, menú móvil y modal: un cambio de estilo toca varias zonas. Sin tests.
- Las imágenes del menú se piden como `"/" + uriIcon` (`packHighlightedButton.tsx:21`) y `/main/<uriIcon>` (`ConsultoriaDropdown.tsx:36`): dependen de que el fichero exista en `public/`.
- Sin etiquetas de accesibilidad en la mayoría de botones (solo dos `aria-label`, `Navbar.tsx:182,185`).

## 8. Cómo probarlo

1. `npm run dev` con la API en marcha.
2. Escritorio: pasar el ratón por Soluciones, Aplicaciones y Consultoría. Deben salir listas con datos.
3. Pulsar «Formación» en navbar y en pie: debe volver a la home (error del apartado 7).
4. Buscar una palabra de una consultoría y pulsar el resultado: debe volver a la home (error del apartado 7).
5. Móvil (ancho `< md`): abrir el menú, desplegar cada bloque, elegir un sector.
6. «Descubrir →»: probar los dos pasos y «Ver productos» con y sin sector.
7. Pie: suscribir un email de prueba; debe salir el mensaje de éxito. Probar con vacío.
8. API caída: abrir el desplegable de Soluciones y anotar qué se ve.

## 9. Dudas / no localizado

- No localizado: la página `/formacion` en la store. `MainFormacionSection` y `types/formacion.ts` muestran datos de una API externa (ficha [W5](w5-consultorias-aplicaciones-formacion.md)). Decisión de producto: ¿existe la página o es un enlace roto?
- No localizado: dónde se declara `acepta_marketing` como condición legal. Por el código se envía siempre `true`.
- No localizado: por qué `NormaproAccessButton` espera a la animación antes de navegar (`:29-33`).
- `HeaderSection` lo usan seis páginas de Instituto (`apariciones-prensa`, `contacto`, `equipo`, `material-prensa`, `mision-vision-valores`, `que-hacemos`) y tres de NormaPRO (`nosotros`, `partners`, `politicas`). `Breadcrumb` lo usan `actualidad/[noticia]`, la solución con y sin sector, y el pack (búsqueda por nombre de componente).
- Sin documentación de cuándo se decidió que el sitio Instituto tuviera navbar y pie propios (W13).

## Correcciones de la revisión contra el código (21/10/2026)

### Afirmaciones incorrectas
- Dice: «`Navbar.tsx` ocupa 342 líneas» → Correcto: 343 líneas.

### Cifras o líneas a unificar
- `onMouseEnter` de los desplegables en `Navbar.tsx:143,151,159`; `onMouseLeave` en :316,323,330.
- `packHighlightedButton.tsx` ocupa 6-36. `HeaderSection.tsx` termina en :22. `types/breadcrumb.ts` tiene 5 líneas.
- `ConsultoriaDropdown.tsx:32` usa `<a>` en lugar de `Link`: recarga completa. La ficha no lo indica.
- `SolutionsDropdown` tiene `try/catch` (:31-43); un cuerpo de error válido llega a `ambitos.map` (:72,162) fuera del `try`.
- Rangos de `ModalDescubrir` (:140-151, :153-158) con desfase de 1-2 líneas.

### Errores funcionales de esta ficha
- ST-WEB-08: `/formacion` no existe; «Formación» vuelve a la home ([detalle](../../../docs/ERRORES-DETECTADOS.md)).
- ST-WEB-09: resultados de consultoría del buscador van a una ruta inexistente (`consultoria/<slug>` frente a `/consultorias/<slug>`) ([detalle](../../../docs/ERRORES-DETECTADOS.md)).
- ST-WEB-13: la newsletter envía `acepta_marketing: true` sin casilla ([detalle](../../../docs/ERRORES-DETECTADOS.md)).
- ST-WEB-14: una respuesta de error de la API tumba cabecera y desplegables ([detalle](../../../docs/ERRORES-DETECTADOS.md)).
- ST-API-18: `globalsearch` omite packs sin ámbito y repite resultados ([detalle](../../../docs/ERRORES-DETECTADOS.md)).

### Afirmaciones no verificables
- Imágenes de `uriIcon` en `public/`, el recuento de usos de `HeaderSection` y `Breadcrumb`, por qué `NormaproAccessButton` espera a la animación y la sección `## 8`.

## Actualización tras el PR del 21/10/2026

Código comparado: `main` `8dc6ec9` frente a `origin/main` `0817fe9` (PR #19). Estado de los ids en [ACT-store.md](../../../docs/revision/ACT-store.md). No probado en ejecución.

### Qué no cambia
`components/menu/*` (`Navbar.tsx`, `NavbarInstituto.tsx`, `SolutionsDropdown.tsx`, `ConsultoriaDropdown*.tsx`, `ModalDescubrir.tsx`, `AplicationsDropDown.tsx`, `packHighlightedButton.tsx`), `HeaderSection.tsx`, `ChatManager.tsx` y `NormaproAccessButton.tsx` no se tocan. Sus citas siguen vigentes (ST-WEB-08, -09, -14, -16, -39).

### Citas rotas
Ninguna.

### Citas desplazadas
| Antes | Ahora |
|---|---|
| `Footer.tsx:10-228` (componente) | `:11-232` |
| `Footer.tsx:16-60` (newsletter) | `:18-63` |
| `Footer.tsx:20-23` (validación del correo), `:28` (fetch), `:28-38`, `:33-37`, `:35` | `:22-25`, `:30`, `:30-40`, `:35-40`, `:37` |
| `Footer.tsx:40-47`, `:49` (mensajes) | `:43-50`, `:52` |
| `Footer.tsx:72,88,96,122-135,216` (textos editables del pie) | `:75,92,100,126-139,220` |
| `Footer.tsx:97-102` (redes) | `:101-106` |
| `Footer.tsx:123` (`/formacion`) | `:127` |
| `Footer.tsx:129`, `:131`, `:133-135` (`/nosotros`, `/trabaja`, contacto) | `:133`, `:135`, `:137-139` |
| `Footer.tsx:211-213` (legales) | `:215-217` |
| `breadcrump.tsx:11-36`, `:12-35` | `:11-37`, `:12-36` |
| `normapro/layout.tsx:38` (montaje del pie) | `:59` |
| `soluciones/[ambito]/page.tsx:19` (valor `all` por defecto) | `:18` (`esTodos`) y `:56` (`ambitoSlug={slug \|\| "all"}`) |

### Afirmaciones obsoletas
- «Legales (`:211-213`): `/aviso-legal/`, `/politica-de-privacidad/`, `/politica-de-cookies-ue/`» (§3.x): ahora sin barra final (`Footer.tsx:215-217`).
- «Newsletter: `POST` a `LEADS` con `email`, `acepta_marketing: true` y `origen_ruta`» (§3.x, §4, §5): además envía `website` (campo trampa, `Footer.tsx:38`). `acepta_marketing: true` sigue (`:37`, ST-WEB-13 VIGENTE). El formulario monta `HoneypotField` (`:77`).
- «Lead del pie: `{email, acepta_marketing, origen_ruta}` sin tipo» (§5): ahora con `website`.
- «Migas de pan: `<nav className="flex">`» (§3.x): ahora `<nav aria-label="Migas de pan">`, con `aria-current="page"` en el último nivel y `Fragment` con clave (`breadcrump.tsx:15-35`). La estructura anidada no cambia.
- «Error funcional nuevo (sin id): `/formacion` no existe» (§7, §9): ahora es ST-WEB-08 (VIGENTE): `Navbar.tsx:165,251`, `Footer.tsx:127`, `MainFormacionSection.tsx:40`.
- «Resultados de consultoría del buscador van a `/consultoria/...`»: ST-WEB-09 VIGENTE (`Navbar.tsx:296`).
- «`/soluciones/all` entra en la ruta `[ambito]` con `all` como valor por defecto» (§7): sigue; el ámbito `all` muestra el mismo listado que `/soluciones` y su canónico es `/soluciones` (`[ambito]/page.tsx:29`).
- «El navbar vive dentro de `ChatManager`»: sigue.

### Nuevo
- `Footer.tsx:77` y `FooterInstituto.tsx:80` montan `HoneypotField`.
- Cuatro enlaces de pie de Instituto cambian de forma: ver W13.

### Errores de esta ficha
VIGENTES: ST-WEB-08, -09, -13, -14. Sin cambio en el buscador (`Navbar.tsx:50-67,283-296`) ni en `ModalDescubrir`.

### Seguridad
La newsletter añade un campo trampa; sigue sin casilla de consentimiento (SEG-WEB-06 VIGENTE). Enlaces a redes con `target="_blank"` sin `rel` en `Footer.tsx:101,104` (SEG-WEB-18 VIGENTE). Detalle en [ACT-store.md](../../../docs/revision/ACT-store.md) §7.
