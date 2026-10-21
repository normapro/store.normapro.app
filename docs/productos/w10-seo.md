# W10 · SEO

Repo: `store.normapro.app`. Rutas de fichero relativas a `src/` salvo indicación. Revisada contra el código el 21/10/2026. No se han inventado piezas: lo que falta se lista como «No existe».

## 1. Qué hace

Reúne todo lo que el código hace por el SEO. Hoy son cuatro cosas:

1. Título y descripción estáticos por sitio (`export const metadata` en los dos layouts).
2. Una configuración por defecto de `next-seo` (título, descripción, canonical, Open Graph, Twitter), pintada con `DefaultSeo`.
3. Un componente `SolucionSeo` con título, descripción y JSON-LD de producto, usado en dos páginas.
4. Un `favicon.ico` en el sitio NormaPRO.

No hay `sitemap`, `robots`, `generateMetadata` ni imágenes Open Graph propias (apartado 9).

## 2. Dónde está

| Pieza | Fichero | Líneas |
|---|---|---|
| Metadatos NormaPRO | `app/sites/normapro/layout.tsx` | 20-23 |
| Metadatos Instituto | `app/sites/instituto/layout.tsx` | 19-22 |
| `DefaultSeo` | `app/providers.tsx` | 5-6, 17 |
| Configuración por defecto | `libs/seo.config.ts` | 2-25 |
| Componente `SolucionSeo` | `components/seo/SolucionSeo.tsx` | 3-44 |
| Uso en solución | `app/sites/normapro/soluciones/[ambito]/[slugSolucion]/page.tsx` | 17, 20, 32, 48-63, 114-117 |
| Uso en pack | `app/sites/normapro/soluciones/[ambito]/packs/[slugPack]/page.tsx` | 14, 85-96 |
| Favicon | `app/sites/normapro/favicon.ico` | (fichero) |
| Dependencia | `package.json` | `next-seo ^6.6.0`, `next ^16.2.0` |

Búsquedas hechas en `src/` y `public/`: `generateMetadata`, `sitemap`, `robots`, `<title`, `<meta`, `next/head`, `opengraph-image`, `manifest`. Solo hay resultados en los ficheros de la tabla. `export const metadata` solo existe en los dos layouts.

## 3. Flujo

### 3.1 Metadatos de layout (servidor)

Los dos layouts exportan `metadata` fijo. NormaPRO: título «NormaPro» y una descripción (`normapro/layout.tsx:20-23`). Instituto: título «Instituto» y descripción vacía (`instituto/layout.tsx:19-22`). Ninguna página hija sobrescribe `metadata`: todas las páginas de un sitio comparten título y descripción.

### 3.2 `DefaultSeo` (cliente)

`Providers` (`providers.tsx:8-21`) es un componente cliente. Pinta `<DefaultSeo {...SEO} />` solo cuando `isClient` es verdadero, y `isClient` pasa a verdadero en un `useEffect` tras montar (`:9-13,17`). Los dos layouts envuelven la página con `Providers` (`normapro/layout.tsx:36`, `instituto/layout.tsx:29`).

`seo.config.ts` define las claves `title`, `description`, `canonical`, `openGraph` (`type`, `locale`, `url`, `site_name`, `images[]` con `url`, `width`, `height`, `alt`) y `twitter` (`handle`, `site`, `cardType`). `canonical` y `openGraph.url` son una sola dirección fija para todo el sitio (`seo.config.ts:5,9`), también para Instituto, que usa los mismos `Providers`.

### 3.3 `SolucionSeo` (cliente)

1. La página de solución es un componente cliente que pide la solución en `useEffect` y llama a `setSeoData` con los datos (`[ambito]/[slugSolucion]/page.tsx:39-63`).
2. Solo pinta `SolucionSeo` cuando hay `title`, `description`, `slug` y `ambito` (`:114-117`).
3. La página de pack pinta `SolucionSeo` cuando `pack` ya está cargado (`packs/[slugPack]/page.tsx:85-96`).
4. `SolucionSeo` devuelve `null` si faltan `title` o `description` (`SolucionSeo.tsx:16-19`). Si no, pinta con `next/head`: `<title>`, `<meta name="description">` y un `<script type="application/ld+json">` con un `Product` y una `Offer` (`:21-42`).

Caché y revalidación: ninguna de Next. Los datos SEO salen de un `fetch` en el navegador, después de hidratar.

## 4. Endpoints que consume

`SolucionSeo` y `seo.config.ts` no llaman a la API. Los datos llegan por props desde:

| Verbo | Ruta | Fichero:línea |
|---|---|---|
| GET | `/v1/store/solucion/:slug` | `[ambito]/[slugSolucion]/page.tsx:42` |
| GET | `/v1/store/packs/:slug` (con `?ambito=`, que la API ignora) | `packs/[slugPack]/page.tsx:35` |

## 5. Datos

`SolucionSeoProps` (`SolucionSeo.tsx:3-13`): `title?`, `description?`, `slug?`, `ambito?`, `sector?`, `image?`, `price?`, `currency?`, `faqs?[]`.

Los usa realmente (`SolucionSeo.tsx:21-41`): `title`, `description`, `price` y `currency`. **No usa** `slug`, `ambito`, `sector`, `image` ni `faqs`: se reciben y se descartan.

Origen de los valores:

| Prop | Solución (`[slugSolucion]/page.tsx`) | Pack (`packs/[slugPack]/page.tsx`) |
|---|---|---|
| `title` | `data.title` (`:49`) | `pack.title` (`:87`) |
| `description` | `data.subtitle`, si no `data.descripcion`, si no vacío (`:50`) | `pack.subtitle` o vacío (`:88`) |
| `price` | `data.price`, si no `"0.00"` (`:55`) | fijo `"0.00"` (`:92`) |
| `currency` | `"EUR"` (`:56`) | `"EUR"` (`:91`) |
| `image` | `data.imagenOg` o una imagen por defecto de un host externo (`:54`) | imagen por defecto de un host externo (`:93`) |

Contrato: el tipo `Solucion` de la store no declara `price`, `imagenOg` ni `descripcion` (`types/solucion.ts:12-50`). Esos tres campos se leen de `data` sin tipo.

## 6. Reglas de negocio y permisos

1. Una página sin título o sin descripción no emite SEO (`SolucionSeo.tsx:16-19`).
2. El JSON-LD declara siempre `availability: InStock` y un precio (`:26-31`). Si la API no manda precio, sale `0.00`.
3. Solo solución y pack emiten SEO propio. El resto de páginas (home, packs por categoría, aplicaciones, consultorías, actualidad, informes, historias, partners, legales, todo Instituto) usan el título del layout.
4. El sitio Instituto comparte configuración por defecto con NormaPRO.

## 7. Zonas de riesgo

- Regla de diseño que hoy no se cumple; detalle en el informe restringido.
- **Posible SEO inoperante (sin id, por verificar):** `SolucionSeo` y `next-seo` v6 usan `next/head`, una API del Pages Router. El proyecto usa App Router (`src/app`). Si el `<head>` de la página renderizada no contiene el título ni el JSON-LD, ni `SolucionSeo` ni `DefaultSeo` hacen nada. No se ha comprobado en ejecución.
- Aunque funcionase, los datos se piden en el cliente tras hidratar (`useEffect`): el HTML inicial no lleva título ni descripción de la solución.
- JSON-LD con `price: "0.00"` por defecto (`SolucionSeo.tsx:29`) y packs siempre con `"0.00"` (`packs/[slugPack]/page.tsx:92`): se publicaría un precio inventado.
- `DefaultSeo` solo se pinta tras montar (`providers.tsx:9-17`): nunca está en el HTML del servidor.
- `canonical` fijo para todo el sitio (`seo.config.ts:5`): todas las páginas apuntarían a la misma dirección.
- La imagen Open Graph de `seo.config.ts:13` y la imagen por defecto de las páginas (`:54`, `:93`) apuntan a un host externo. No existen ni `public/og-image.jpg` ni `public/images/` en este repo. Si el host externo no las sirve, las vistas previas salen sin imagen. No verificable desde el repo.
- `[ambito]/[slugSolucion]/page.tsx:64` deja un `console.log("SEO generado", seoData)` en producción; imprime el estado anterior, no el nuevo.
- `typescript.ignoreBuildErrors` (`next.config.ts:16-18`, ST-WEB-06): un error de tipos en las props de SEO no rompe el build.

## 8. Cómo probarlo

1. `npm run dev` y abrir una solución y un pack (rutas `/soluciones/<ámbito>/<slug>` y `/soluciones/<ámbito>/packs/<slug>`).
2. Ver el código fuente de la página (no el inspector): comprobar si llega `<title>` propio. El inspector muestra el DOM tras hidratar.
3. En el inspector: buscar `<title>`, `meta[name=description]` y `script[type="application/ld+json"]`. Anotar si existen y qué `price` llevan.
4. Con el JSON-LD, validar la estructura con una herramienta externa de datos estructurados (manual).
5. Abrir `/sitemap.xml` y `/robots.txt`: hoy no existen; resultado esperado: el 404 de Next (las rutas con punto no pasan por el rewrite, `middleware.ts:6-12`).
6. Instituto (host `.local`): comprobar que el título es el del layout.

## 9. Dudas / no localizado

- **No existe:** `sitemap` (ni `app/sitemap.ts` ni `public/sitemap.xml`), `robots` (ni `app/robots.ts` ni `public/robots.txt`), `generateMetadata`, `opengraph-image`, `manifest`.
- **No existe:** metadatos propios por página (historias, informes, actualidad, aplicaciones, consultorías, partners, legales, Instituto).
- **No existe:** `favicon.ico` en el sitio Instituto (solo `app/sites/normapro/favicon.ico`). Sin comprobar en ejecución qué muestra el navegador.
- **No existe:** datos estructurados de organización, migas de pan o FAQ. `faqs` llega a `SolucionSeo` y no se emite.
- No localizado: el campo `price` en `app/types/solucion.ts`, `app/types/pack.ts`, `app/models/storeModel.ts` ni `sqls/store.sql` de la API (búsqueda por nombre). El precio del JSON-LD no tiene origen en los datos.
- Para crear `sitemap` o `robots`: el middleware no reescribe rutas con punto (`middleware.ts:6-12`). Un `sitemap.ts` dentro de `app/sites/normapro/` no respondería en `/sitemap.xml`; haría falta `public/` o la raíz de `app/`. Deducido del código, sin probar.
- El `favicon.ico` está en `app/sites/normapro/` y `/favicon.ico` queda fuera del matcher (`middleware.ts:39`). Sin probar qué URL de icono emite Next.
- Por verificar en ejecución: si `next/head` emite algo en App Router con Next 16 (apartado 7).
- `Providers` pinta `DefaultSeo` en Instituto con datos de NormaPRO: decisión de producto pendiente.
- Para Lighthouse hay un documento de futuro: [FUTURO-LIGHTHOUSE-100.md](../../../docs/FUTURO-LIGHTHOUSE-100.md). No leído para esta ficha.

## Correcciones de la revisión contra el código (21/10/2026)

### Afirmaciones incorrectas
- Ninguna afirmación incorrecta.

### Cifras o líneas a unificar
- La guarda de `SolucionSeo` es `[slugSolucion]/page.tsx:114-117` (`title && description && slug && ambito`). Una `description` vacía (:50 pone `''`) bloquea todo el SEO.
- `SolucionSeo` deja un `console.warn` cuando devuelve `null`.
- `next-seo` 6.8.0 y `next/head` no emiten nada en App Router: leído en el código, ejecución pendiente (`node_modules/next-seo/lib/next-seo.js:2`, `node_modules/next/dist/client/app-index.js:266`).
- Ni `public/og-image.jpg` ni `public/images/` existen. Tampoco hay `favicon` en `public/`.
- `/sitemap.xml` y `/robots.txt` darían 404 por `middleware.ts:6-12` (ejecución pendiente).

### Errores funcionales de esta ficha
- ST-WEB-11: el SEO por página no funciona ([detalle](../../../docs/ERRORES-DETECTADOS.md)).
- ST-WEB-12: JSON-LD con precio `0.00` inventado ([detalle](../../../docs/ERRORES-DETECTADOS.md)).
- ST-WEB-04: la API ignora `ambito` en `packs/:slug` ([detalle](../../../docs/ERRORES-DETECTADOS.md)).

### Afirmaciones no verificables
- Si el host externo sirve las imágenes OG, qué URL de icono emite Next para `/favicon.ico`, `FUTURO-LIGHTHOUSE-100.md` y la sección `## 8`.
