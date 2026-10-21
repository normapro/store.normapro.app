# W7 · Historias, clientes, testimonios y partners

Repo: `store.normapro.app`. Ficha revisada contra el código el 21/10/2026. Rutas de fichero relativas a `src/`. Prefijo de página: `P = app/sites/normapro/`. Prefijo de API: `S = /v1/store`. `M = api-store.normapro.app/app/models/storeModel.ts`.

## 1. Qué hace

- `/historias`: listado de casos de éxito (lo pinta una sección de landing de la ficha W4), contador de usuarios, carrusel de logos y botón de contacto.
- `/historias/[historia]`: detalle de un caso de éxito. Cabecera propia y cuerpo de bloques (`LandingBuilder`, ficha W4).
- `/partners`: página de contenido casi fija sobre el programa de partners.
- Componentes compartidos: carrusel de logos de clientes, imagen de logo según su forma, tarjeta de testimonio y bloque de historia de Instituto.

## 2. Dónde está

| Pieza | Fichero | Líneas | Estado |
|---|---|---|---|
| Página `/historias` | `P historias/page.tsx` | 34 | En uso |
| Página `/historias/[historia]` | `P historias/[historia]/page.tsx` | 119 | En uso |
| Página `/partners` | `P partners/page.tsx` | 109 | En uso |
| Bloque título + párrafos + botón + imagen | `components/historiaTextSection2.tsx` | 77 | En uso solo en `P trabaja/page.tsx:15` |
| Testimonio de Instituto | `components/MainHistoriasSection.tsx` | 123 | En uso: `app/sites/instituto/page.tsx:12,79` |
| Programas de partner | `components/PartnersProgramsSection.tsx` | 34 | En uso: `P partners/page.tsx:88` |
| Testimonios de partner | `components/PartnersTestimonialsSection.tsx` | 56 | En uso: `P partners/page.tsx:66` |
| Tarjeta de testimonio | `components/TestimonioCard.tsx` | 41 | En uso (ver §3.5) |
| Lista de testimonios simple | `components/Testimonios.tsx` | 29 | **Importada y nunca renderizada** (ver abajo) |
| Carrusel de logos | `components/shared/ClientCarousel.tsx` | 88 | En uso |
| Logo de cliente | `components/shared/ImageLogoCliente.tsx` | 44 | En uso |
| Dimensiones de logo | `libs/logovars.ts` | 19 | En uso |
| Tipos | `types/cliente.ts` (10), `types/historiaCliente.ts` (9), `types/testimonio.ts` (16) | | En uso |

Código sin uso de esta ficha (búsqueda de `import` y de `<Componente`):
- `components/Testimonios.tsx`: lo importan `P soluciones/[ambito]/[slugSolucion]/page.tsx:13` y `P soluciones/[ambito]/sector/[sector]/[slugSolucion]/page.tsx:13`, y ninguna de las dos lo renderiza. Sin render en todo `src/`.
- `components/historiaTextSection2.tsx` se importa en `P nosotros/page.tsx:7` y `P partners/page.tsx:3`; la búsqueda de `<HistoriaTextSection2` en `src/app` y `src/components` solo encuentra `P trabaja/page.tsx:15`.

## 3. Flujo

### 3.1 `/historias`

`P historias/page.tsx` (cliente, `:1`):
1. `HistoriasClientesSection` (`:14`, ficha W4): carga las historias.
2. `HeroUserCount` (`:15`, ficha W2): contador de usuarios (API externa).
3. `ClientCarousel scope="historias" claim=""` (`:16-19`).
4. Botón «Contacta ahora y analizaremos tu caso» → modal `Formulario` (`:20-31`, ficha W8).

### 3.2 `/historias/[historia]`

`P historias/[historia]/page.tsx` (servidor, `async`, `:79`):

| Paso | Línea |
|---|---|
| `GET S/historias/slug/{slug}` con `next: { revalidate: 0 }` | `:46-48` |
| Si no es OK y el valor son solo dígitos: `GET S/historias/{id}` con `revalidate: 0` | `:50-54` |
| 404 → `null`; otro fallo → `throw new Error('Error al cargar historia')` | `:56-59` |
| Sin datos: título «Historia no encontrada» | `:83-89` |
| `parseBloques(componentes)`: acepta lista o texto JSON; si falla, lista vacía | `:32-43`, `:91` |
| Si hay `id_cliente`: `GET S/clientes/{id}` con `revalidate: 0` (404 → `null`; otro fallo → `throw`) | `:64-77`, `:92` |
| Textos de reserva: «Historia demo», «Descripcion demo», «Cliente demo» y un logo por defecto | `:27-30`, `:93-96` |
| Sin bloques: título, y el texto «Esta historia aun no tiene componentes configurados , mete el json en la bd.» | `:98-105` |
| `PresentacionHistoria` (ficha W4) con logo, cliente, nombre y descripción; después `LandingBuilder` | `:109-116` |

Caché: `revalidate: 0` en los tres `fetch` (sin caché de datos).

API: `GET /historias/slug/:slug` → `getHistoriaBySlug` (`M:408-430`): lee todas las filas de `storeHistoriasClientes` (`id, id_cliente, nombre, descripcion, imagen, componentes`), calcula el slug de cada una con `toSlug(nombre)` y devuelve la que coincide. `GET /historias/:id` → `M:382-398`. `GET /clientes/:id` → `M:305-308` (`storeClientes`). `GET /historias` (listado, lo usa la ficha W4) → `M:362-370`, `ORDER BY id DESC LIMIT ?`.

### 3.3 `/partners`

`P partners/page.tsx` (sin `'use client'`: componente de servidor síncrono, `:9`; la función se llama `NosotrosPage`):
- Cabecera `HeaderSection` (`:11`, ficha W11), imagen fija `/historiasclientes/partners.png` (`:23-27`), texto fijo (`:13-38`).
- `ListHistoriaSection` con 4 beneficios escritos en el código (`:41-65`, ficha W4).
- `PartnersTestimonialsSection` con 2 testimonios escritos en el código (`:66-86`).
- `PartnersProgramsSection` con 3 programas escritos en el código (`:88-105`).
- `ContactoFormSection` (`:106`, ficha W8).
- No llama a la API. Imports sin uso: `HistoriaTextSection` (`:2`) y `HistoriaTextSection2` (`:3`).

`PartnersProgramsSection` (servidor, sin `'use client'`) y `PartnersTestimonialsSection` (cliente, `:1`) solo pintan lo que reciben por props. `P trabaja/page.tsx` (ficha W8) importa los dos (`:5-6`) y no los renderiza.

### 3.4 Carrusel de logos y logos

`components/shared/ClientCarousel.tsx` (cliente, `:1`):
1. `GET API_ENDPOINTS.CLIENTES?maxItems=100&scope={scope}` (`:39`). Acepta lista, `{data}` o `{items}` (`:22-31`). Error o no OK: aviso en consola y lista vacía (`:40-50`).
2. Repite la lista 5 veces (`Array(5).fill(clientes).flat()`, `:56`) y la anima en una caja de ancho 200 % (`:65`, clase `animate-slide`).
3. Cada logo es un enlace a `cliente.url` en pestaña nueva (`:67-73`) con `ImageLogoCliente`.
4. Props: `scope`, `claim`, `theme?` (`light` por defecto; `dark` cambia fondo y carpeta de logos) (`:16-20,58-61`).
5. Define un tipo `Cliente` propio (`:8-14`), igual en campos al de `types/cliente.ts`.
6. Lo montan: `P page.tsx:20` (`scope="all"`), `P historias/page.tsx:16` (`scope="historias"`), `app/sites/instituto/page.tsx:19` (`scope="all"`, `theme="dark"`) y `components/landings/ClientCarouselWrapper.tsx:26`.

`components/shared/ImageLogoCliente.tsx` (cliente, `:1`): busca el tamaño en `logoDimensions[logoType]` (`:14`). Con tipo válido: `next/image` con ancho y alto máximos (`:29-40`), carpeta `/logos/` o `/logos/white/` si el tema es oscuro (`:31`). Con tipo no válido: aviso en consola y 100×100 desde `/logos/` (`:16-27`). Lo usan: `ClientCarousel`, `TestimonioCard`, `MainHistoriasSection`, `landings/ClientCarouselWrapper.tsx`, `landings/ClientsMuralSection.tsx`.

`libs/logovars.ts`: `enum LogoType { SQUARE='square', WIDE='wide', ULTRAWIDE='ultrawide' }` (`:1-5`) y `logoDimensions` (`:7-20`): `square` 100×100, `wide` 150×60, `ultrawide` 150×40.

API de clientes: `GET /clientes` → `M:279-295`. Sin sector: `storeClientes` con `ORDER BY RAND() LIMIT ?`. Con sector: `LEFT JOIN storeClientesSectores` y los del sector primero, luego aleatorio (`:283-294`). La API solo lee `maxItems` y `sector` (`storeController.ts:392-410`); sin `maxItems` devuelve 5. Si `url` es nulo devuelve una URL de desarrollo por defecto (`M:281,285`).

### 3.5 Testimonios

- `TestimonioCard` (`:5-39`, sin `'use client'`; usa `next/image` vía `ImageLogoCliente`): logo del cliente (`:18-22`), texto con `whitespace-pre-line` (`:27-29`), persona, cargo y nombre del cliente en mayúsculas (`:32-36`). Lee `cliente.logo`, `cliente.logoType` y `cliente.description` sin comprobar si `cliente` existe.
- Quién lo usa: `MainTestimoniosSection.tsx:66` (home, `/nosotros`, ámbitos y sectores; ficha W2), las fichas de solución y pack (ficha W3: `[slugSolucion]/page.tsx:257`, `sector/…/[slugSolucion]/page.tsx:223`, `packs/[slugPack]/page.tsx:207`).
- API: `GET /testimonios` → `M:316-356`: `storeClientesTestimonios` con `LEFT JOIN storeClientes`, `ORDER BY RAND()`, `LIMIT ?` (9 por defecto, `storeController.ts:721-722`). Construye `cliente` anidado solo si `id_cliente` tiene valor; si no, `cliente` es `undefined` (`M:345-355`). `GET /testimonios/:id` → `M:560-575`.
- `MainHistoriasSection.tsx` (Instituto, cliente `:1`):
  1. `GET S/testimonios/2`, id escrito en el código (`:16`).
  2. Mientras carga o si no hay dato, no pinta nada (`:29`).
  3. Foto del autor: `miniImg` o `/testimonios/{nombre del cliente sin tildes ni espacios}.png` (`:61-66`).
  4. Enlace «Ver todas las historias» y botón «Ver caso completo»: URLs absolutas de producción con `?ref=instituto`, en pestaña nueva; el segundo apunta a un slug de historia escrito en el código (`:39-45`, `:111-117`).
  5. Hay un `console.log(imageSrc)` (`:67`).

### 3.6 Bloque de historia de Instituto

`components/historiaTextSection2.tsx` (cliente, `:1`): lee `useSiteRef()` (`:15`, contexto de la ficha W1). Si el sitio es `instituto` cambia colores y disposición (`:16-34`). Props: `title`, `claim: string[]`, `buttonText?`, `image?` (`:6-11`). Con `buttonText` abre `Formulario` (`:51-58,72`). Imagen desde `/historiasclientes/{image}` (`:64`).

## 4. Endpoints que consume

| Verbo | Ruta (tras `/v1/store`) | Fichero:línea |
|---|---|---|
| GET | `/historias/slug/:slug` (servidor) | `P historias/[historia]/page.tsx:46` |
| GET | `/historias/:id` (servidor) | `P historias/[historia]/page.tsx:51` |
| GET | `/clientes/:id` (servidor) | `P historias/[historia]/page.tsx:67` |
| GET | `/clientes?maxItems=100&scope=` | `components/shared/ClientCarousel.tsx:39` |
| GET | `/testimonios/2` | `components/MainHistoriasSection.tsx:16` |
| POST | `/leads` | vía `Formulario` (ficha W8), abierto desde `P historias/page.tsx:29`, `historiaTextSection2.tsx:72` |

Sin llamadas propias a la API: `PartnersProgramsSection`, `PartnersTestimonialsSection`, `TestimonioCard`, `Testimonios`, `ImageLogoCliente`, `logovars.ts`, `P partners/page.tsx`.

Rutas de la API: `routes/v1/store.ts` (`/clientes` :33, `/clientes/:id` :36, `/historias` :61, `/historias/slug/:slug` :64, `/historias/:id` :67, `/testimonios` :58, `/testimonios/:id` :79).

## 5. Datos

### Tipos de la store

- `Cliente` (`types/cliente.ts:5-10`): `id_cliente`, `description`, `url`, `logo`, `logoType: LogoType`.
- `Testimonio` (`types/testimonio.ts:3-11`): `id_testimonio`, `id_cliente: number | null`, `description`, `persona`, `cargo` (los tres anulables) y `miniImg?`. `TestimonioConCliente` añade `cliente: Cliente` (`:14-16`), obligatorio en el tipo.
- `HistoriaCliente` (`types/historiaCliente.ts:1-9`): `id`, `slug?`, `id_cliente?`, `nombre`, `descripcion`, `imagen`, `componentes`. Lo usa `components/landings/HistoriasClientesSection.tsx:6` (ficha W4). La página de detalle usa tipos locales `HistoriaPayload` y `ClientePayload` (`historias/[historia]/page.tsx:11-25`).
- `LogoType` y `logoDimensions` (`libs/logovars.ts`).

### Props

| Componente | Props |
|---|---|
| `ClientCarousel` | `scope: string`, `claim: string`, `theme?: string` |
| `ImageLogoCliente` | `logoName`, `logoType`, `clienteName`, `theme?` |
| `TestimonioCard` | `id_testimonio`, `description`, `persona`, `cargo`, `cliente` (se reciben extendidos con `{...testimonio}`) |
| `Testimonios` | `testimonios: {autor, cargo, empresa, mensaje, logo?}[]` (`Testimonios.tsx:1-11`) |
| `HistoriaTextSection2` | `title`, `claim: string[]`, `buttonText?`, `image?` |
| `PartnersProgramsSection` | `title`, `description`, `programs: {title, description}[]` |
| `PartnersTestimonialsSection` | `title`, `testimonials: {quote, name, details: string[]}[]` |

### Contrato

Copias de cada entidad en API, editor y store (`docs/CONTRATOS.md` §1 y §1.1):
- Cliente: el editor añade `permisoweb`; la API no lo devuelve en `GET /clientes`. `LogoType` existe en tres formas (enum en API, objeto `as const` en editor, `libs/logovars.ts` en store) con los mismos tres valores.
- Testimonio: la respuesta real lleva `cliente` anidado (`M:345-355`); el editor lo tipa plano. La store añade `miniImg?` y la consulta no lo devuelve.
- Historia: la API calcula `slug` al leer (`M:373`); el editor exige `slug` y la store lo declara opcional.
- `componentes`: lista `{id, tipo, data}` (`docs/CONTRATOS.md` §2.4). La API no lo convierte en historias; la página tolera lista o texto (`:32-43`).

## 6. Reglas de negocio y permisos

- Sin autenticación.
- El slug de una historia se genera desde `nombre` (`M:373`, `toSlug` en `M:49-66`); no es una columna de la tabla. Dos nombres iguales dan el mismo slug y gana la primera fila leída (`M:408-430`, orden `id DESC`).
- Acceso por id: el detalle acepta un id numérico si el slug no se encuentra (`:50-54`).
- Logos: la forma (`square`, `wide`, `ultrawide`) fija el tamaño máximo (`logovars.ts:7-20`). Un valor distinto cae en 100×100 con aviso en consola.
- Logos en fondo oscuro: se buscan en `/logos/white/{nombre}` (`ImageLogoCliente.tsx:31`); el fichero debe existir con el mismo nombre.
- Carrusel: el número de logos lo fija `maxItems=100`; el orden es aleatorio en cada carga.
- Testimonios: aleatorios en cada petición. En Instituto, siempre el de id 2.
- La cabecera del detalle de historia usa los datos del cliente solo si la historia tiene `id_cliente` (`:92`).
- Partners: el contenido (beneficios, testimonios, programas) está en el código de `P partners/page.tsx`, no en la base.

## 7. Zonas de riesgo

- `ClientCarousel` e `ImageLogoCliente` los usan la home, `/historias`, Instituto y 3 componentes de landing (ficha W4). Un cambio de props o de carpeta de logos afecta a todos.
- `TestimonioCard` lo usan 5 pantallas. Cambiar su estructura o sus campos obligatorios afecta a home, ámbitos, sectores, fichas y packs.
- `LogoType` tiene tres copias en tres repos con el mismo contenido. Un valor nuevo exige tocar las tres y `logoDimensions`.
- Borrar un cliente o un testimonio en el editor puede dejar una historia o un testimonio con referencias a datos que ya no existen.
- El slug de las historias depende del texto de `nombre`: renombrar una historia cambia su URL.
- `MainHistoriasSection` tiene un id de testimonio y un slug de historia escritos en el código.
- Seguridad: regla de diseño que hoy no se cumple; detalle en el informe restringido. (Aplica a los enlaces externos y al origen de las imágenes.)

## 8. Cómo probarlo

1. Arrancar API y store (`docs/ENTORNO.md`; `npm run dev`).
2. `/historias`: deben salir las historias, el contador, el carrusel de logos y el botón de contacto (abre el modal).
3. Abrir una historia por slug y por id numérico. Probar una sin bloques y una sin `id_cliente`: deben salir los textos de reserva de §3.2.
4. Pestaña Red: el `fetch` de la historia debe ir sin caché (`revalidate: 0`).
5. Logos: crear un cliente con cada `logoType` y comprobar el tamaño. Probar el tema oscuro en Instituto (carpeta `/logos/white/`).
6. `/partners`: contenido fijo; recargar y comprobar que no hay llamadas a la API (solo las del formulario al enviarlo).
7. Testimonio sin cliente: crear uno con `id_cliente` vacío y ver cómo se comporta una pantalla que use `TestimonioCard` (ver §9).
8. Instituto (host de Instituto): sección de historia con el testimonio de id 2; los dos enlaces abren otra pestaña.
9. API caída: carrusel vacío (aviso en consola); detalle de historia: error de servidor (ver `docs/OBSERVABILIDAD.md` §3.1).

## 9. Dudas / no localizado

- Qué debe pasar cuando un testimonio no tiene cliente: el tipo lo exige (`types/testimonio.ts:15`), la API puede no enviarlo (`M:345-355`) y `TestimonioCard.tsx:19-21,35` lee `cliente.*` sin comprobar. No se ha ejecutado el caso.
- Origen del id 2 y del slug fijo en `MainHistoriasSection.tsx:16,112`: no localizado quién los eligió ni cómo se actualizan.
- `partners/page.tsx`: nombre de función `NosotrosPage` y dos imports sin uso (`HistoriaTextSection`, `HistoriaTextSection2`). No localizado si hay una página «nosotros» antigua copiada.
- `Testimonios.tsx` y su import en las dos fichas de solución: no localizado si se prevé usarlo.
- `scope` de `ClientCarousel`: se envía (`:39`) y la API no lo lee. No localizado el criterio para mostrar logos distintos por página.
- Existencia de los ficheros de `public/logos/`, `public/logos/white/`, `public/testimonios/` y `public/historiasclientes/`: no comprobada.
- Texto de usuario con instrucción interna en `historias/[historia]/page.tsx:102`: no localizado el texto definitivo.

## Correcciones de la revisión contra el código (21/10/2026)

### Afirmaciones incorrectas
- Dice: «El slug no es una columna de la tabla» (`storeModel.ts:373`) → Correcto: `storeHistoriasClientes` tiene columna `slug`; el editor la inserta (`editorStoreModel.ts:1162`) y usa `payload.slug` antes que `toSlug` (:352). La API no la selecciona (`storeModel.ts:364,384,410`) y recalcula.

### Cifras o líneas a unificar
- Métodos de la API: `/historias` `storeModel.ts:362-375`; `/historias/:id` 382-401; `getHistoriaBySlug` 408-429; `clientes/:id` 305-309; `/testimonios/:id` 560-597.
- `/testimonios/:id` sin id existente lanza `TypeError`.
- Con dos nombres iguales gana la primera fila del orden `id DESC` (`storeModel.ts:408-429`).
- La errata «historiass» (`MainHistoriasSection.tsx:44`) y el `console.log(imageSrc)` (:67) siguen en el código.

### Errores funcionales de esta ficha
- ST-WEB-32: mensaje interno visible al público (`historias/[historia]/page.tsx:102`) ([detalle](../../../docs/ERRORES-DETECTADOS.md)).
- ST-WEB-33: un testimonio sin cliente tumba la página ([detalle](../../../docs/ERRORES-DETECTADOS.md)).
- ST-WEB-34: erratas visibles ([detalle](../../../docs/ERRORES-DETECTADOS.md)).
- ST-WEB-07: testimonio de Historias con id fijo ([detalle](../../../docs/ERRORES-DETECTADOS.md)).
- ST-WEB-04: `scope` se envía y la API no lo lee ([detalle](../../../docs/ERRORES-DETECTADOS.md)).
- ST-API-17: el slug guardado por el editor se ignora al leer ([detalle](../../../docs/ERRORES-DETECTADOS.md)).
- ST-API-16: slug o id inexistente responde 500 con cuerpo vacío (`testimonios/:id`) ([detalle](../../../docs/ERRORES-DETECTADOS.md)).

### Afirmaciones no verificables
- Existencia de los ficheros de `public/` citados.

- Hay reglas de diseño que hoy no se cumplen; detalle en el informe restringido.
