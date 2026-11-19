# 04 · Plan técnico SEO (qué cambiar en el código, en qué orden)

Fecha: 30/10/2026. Cada bloque dice qué fichero toca, qué receta de `../../../docs/RECETAS-DE-CAMBIO.md` aplica y cómo se comprueba. Orden de capas del proyecto: SQL → API → tipos → editor → store. Nada de esto se ha ejecutado; son instrucciones. Antes de tocar: `docs/ia-rules/`, ficha W10 y `INDICE-LOCALIZACION.md`.

Prioridad: **P0** antes de cualquier campaña de contenido; **P1** primer trimestre; **P2** después.

---

## 1. P0 · Sitemap y canónicos: dejar de enviar 2.684 copias de la home

**Fichero:** `src/app/sitemap.xml/route.ts`.

1. Quitar del sitemap las combinaciones ámbito × sector × solución (`combinaciones` y `solucionesPorCombinacion`). Dejar: estáticas, 12 ámbitos, 244 soluciones, 17 packs, 11 portadas de sector (`/soluciones/all/sector/{sector}`), aplicaciones, consultorías, historias, informes, actualidad, guías.
2. Añadir `lastmod` en todas las entradas con fecha: `fecha` en actualidad, `createdAt`/`updatedAt` donde exista (sin verificar qué entidades lo tienen; el glosario solo cita `createdAt` en destacados). Para soluciones sin fecha, no inventar `lastmod`.
3. Partir en índice de sitemaps cuando haya más de una fuente: `sitemap.xml` (índice) → `sitemap-paginas.xml`, `sitemap-soluciones.xml`, `sitemap-contenido.xml`. Next 16 lo soporta con `generateSitemaps`; como la ruta actual es un `route.ts` manual, basta con generar varios ficheros con el mismo patrón.
4. **Solución × sector (`[ambito]/sector/[sector]/[slugSolucion]/page.tsx`)**: mientras la API no devuelva contenido distinto por sector, hacer `redirect()` permanente (308 en Next) a `/soluciones/{ambito}/{solucion}` en lugar de a `/`. Si la API sí devuelve contenido por sector, mantener la página pero con `alternates.canonical` apuntando a la ficha base y `robots: { index: false }`.
5. **Ámbito × sector (`[ambito]/sector/[sector]/page.tsx`)**: `robots: { index: false, follow: true }` hasta que cada combinación tenga `textoweb` propio. Las 11 portadas `all/sector/{sector}` sí se indexan.

Comprobación: `curl -s https://www.normapro.es/sitemap.xml | grep -c "<loc>"` debe bajar de 3.129 a unas 330; `curl -I` de una URL solución × sector debe dar 308 a la ficha; Search Console → Páginas: «Página con redirección» debe caer en las semanas siguientes.

---

## 2. P0 · Redirecciones de la web antigua y 404 real

**Fichero nuevo:** `next.config.ts` → `redirects()` (o `vercel.json` si se prefiere fuera del build; `next.config.ts` es lo documentado en W15).

Mapa (URL antigua → nueva, 301 `permanent: true`). Las antiguas están indexadas en Google a 30/10/2026:

| Origen (con y sin barra final) | Destino |
|---|---|
| `/compliance-penal` | `/consultorias/compliance-penal` |
| `/canal-de-denuncias` | `/aplicaciones/canal-interno-comunicacion` |
| `/gestor-documental` | `/aplicaciones/gestor-documental` |
| `/bpm` | `/aplicaciones/bpm-suite` |
| `/portal-del-empleado` | `/aplicaciones/portal-del-empleado` |
| `/ticketing` | `/aplicaciones/ticketing` |
| `/formapro` | `/aplicaciones/formapro` |
| `/compliance-tecnico` | `/consultorias/cumplimiento-normativo` |
| `/programa-digitalizacion-de-procesos-internos` | `/consultorias/automatizacion-procesos` |
| `/todas-las-soluciones` | `/soluciones` |
| `/soluciones/null/packs/:slug`, `/soluciones/undefined/packs/:slug` | `/soluciones/:ambito/packs/:slug` no se puede resolver sin dato: corregir el origen (ST-WEB-21) y redirigir a `/soluciones` |

Completar el mapa con **todas** las URL antiguas: pedir a Juanma la exportación de Search Console (Páginas → «Página con redirección» y «No encontrada») y el sitemap de la web WordPress si se conserva (Wayback Machine estaba caído el 30/10/2026; reintentar `web.archive.org/web/2025*/normapro.es/*`). Candidatas por la estructura típica: `/blog/`, `/contacto/`, `/sobre-nosotros/`, `/aviso-legal/`, `/politica-de-privacidad/`, `/politica-de-cookies/`.

**404 real.** `src/app/sites/normapro/[...not-found]/page.tsx`: sustituir `redirect("/")` por una página 404 con `notFound()` de `next/navigation` y un `not-found.tsx` en `src/app/sites/normapro/` con buscador, enlaces a los 12 ámbitos y a las guías. Lo mismo en `SolucionPage.tsx`, ámbito, sector y pack cuando el dato no existe (hoy `redirect("/")`; ver `docs/ESTADO-ERRORES-TRAS-PR.md`, ST-WEB-17). Ojo: `[...not-found]` está dentro de `sites/normapro` porque el middleware reescribe; `notFound()` debe devolver estado 404 real, comprobar con `curl -I`.

Comprobación: `curl -I https://www.normapro.es/compliance-penal/` → 301 directo (sin pasar por 308 + 307); `curl -I https://www.normapro.es/esto-no-existe` → 404.

---

## 3. P0 · Páginas de ámbito y sector en servidor, sin «Lorem ipsum»

**Ficheros:** `components/SolutionsHero.tsx`, `components/SolutionsHeroSector.tsx`, `components/AmbitosTabs.tsx`, `app/sites/normapro/soluciones/[ambito]/page.tsx`, `[ambito]/sector/[sector]/page.tsx`.

1. Quitar el texto de relleno de los dos héroes. Pintar `ambito.textoweb` (ámbito) y `sector.textoweb` + `sector.descriptionweb` (sector) desde el servidor. Los campos existen en editor, API y BD (`SectoresPage.tsx`, `AmbitosPage.tsx` del editor; `storeAmbitos.textoweb`, `storeSectores.textoweb`).
2. H1 del sector: `sector.titleweb || sector.description` en lugar de «Sector».
3. Listado de soluciones del ámbito: hoy `AmbitosTabs` hace `fetch` en el navegador. Pasar la primera carga al servidor: la página ya es un componente de servidor y `storeService.ts` tiene `getListSoluciones(ambitoSlug, sectorSlug?)` (lo usa el sitemap). Pasar el listado como `initialData` a `AmbitosTabs` para que pinte en el primer HTML y conserve las pestañas en cliente. Patrón de la receta 10 (orden y filtro de la home) y ficha W3.
4. Añadir en la página de ámbito: packs del ámbito (`getPacksCategoria` filtrado por `slug_ambito`), un caso de éxito y FAQ del ámbito. Las FAQ de ámbito **no existen como dato**: o se crean con un campo `faq` JSON en `storeAmbitos` (receta 6/7, tres capas) o se escriben en código con un mapa por slug. Recomendación: campo en BD, porque se van a editar.
5. Añadir `titleweb` a ámbito: SQL (`ALTER TABLE storeAmbitos ADD titleweb VARCHAR(120) NULL`), `app/types/ambito.ts` (API y store), consulta en `storeModel.ts:212/237`, editor `AmbitosPage.tsx`, y `generateMetadata` del ámbito usar `titleWeb: ambito.titleweb`. Receta 6 aplicada a ámbito. Hasta entonces, usar en código el mapa de títulos de `03` §3.

Comprobación: `curl -A Googlebot https://www.normapro.es/soluciones/gestion-de-calidad | grep -c "Lorem"` → 0; el HTML contiene los nombres de las soluciones y supera 600 palabras.

---

## 4. P0 · Descriptions por defecto y títulos de páginas fijas

**Fichero:** `src/libs/seo.ts` y `app/sites/normapro/layout.tsx`.

- Cambiar la description del layout (eslogan) por la de la home propuesta en `03` §2 y hacer que `pageMetadata` exija `description`: si no llega, construir una automática («{título}: soluciones de NormaPro para el cumplimiento normativo de tu empresa») en lugar de heredar el eslogan.
- Páginas fijas con `export const metadata = pageMetadata({ title, path })` sin description (`/nosotros`, `/partners`, `/trabaja`, `/politicas`, legales, `/actualidad`, `/informes`, `/historias`): añadir description propia. Textos:
  - `/nosotros`: «NormaPro es la plataforma de cumplimiento normativo del Instituto de Innovación, Ciencia y Empresa. Más de 30 años, certificaciones ISO 9001, 27001 y 45001, y clientes como Bosch, Calidad Pascual y Emacsa.»
  - `/historias`: «Casos de éxito de empresas que gestionan su cumplimiento normativo con NormaPro: Bosch, Calidad Pascual, Emacsa.»
  - `/actualidad`: «Novedades legales y de normas ISO explicadas para empresas: canal de denuncias, compliance penal, CSRD, NIS2, PRL.»
  - `/informes`: «Guías e informes descargables sobre cumplimiento normativo: ENS frente a ISO 27001, CSRD, seguridad digital.»
  - `/partners`: «Programa de partners de NormaPro para consultoras de calidad, compliance, PRL y medio ambiente.»
- Título de la home y H1: `components/MainHeroCarousel.tsx:59-60` y `app/sites/normapro/page.tsx` (ver `03` §2).
- Añadir H1 en `/nosotros` (hoy `HeaderSection` pinta otro elemento) y en `/historias`.

---

## 5. P1 · Home, actualidad, informes e historias en servidor (rendimiento e indexación)

Hoy `page.tsx` de la home es `'use client'` y cada sección hace `fetch` en `useEffect` (W2). Consecuencia: LCP 18,6 s en móvil y noticias invisibles para Google en el listado.

1. Convertir `app/sites/normapro/page.tsx` en componente de servidor que pida en paralelo packs, aplicaciones, testimonios, eventos, noticias e informes con `storeService.ts` (caché 300 s ya existente) y pase los datos como props a los componentes actuales. Los componentes que necesiten estado (pestañas de packs, carrusel) siguen siendo de cliente pero reciben `initialData`.
2. Hero: las cinco imágenes `head_img*@2x.png` en `<img>` sin dimensiones son el LCP. Pasar a `next/image` con `priority` en la primera, tamaños explícitos y formato AVIF/WebP (`images.formats` en `next.config.ts`). Reducir a 3 imágenes en escritorio.
3. Vídeo de YouTube: cargar con fachada (miniatura + botón) en lugar de `iframe` directo; quita cookies de terceros y 1 MB de JS.
4. Font Awesome: el kit externo `kit.fontawesome.com` responde 403 (prueba del 22/10) y además ya se importan los iconos SVG por paquete. Quitar el `<Script>` del kit en los dos layouts.
5. `/actualidad`, `/informes`, `/historias`: listados en servidor con el mismo patrón. Noticia e informe ya se piden en servidor.
6. Carrusel de logos: enlaces a `localhost` (ST-API-05). Mientras la API no lo corrija, no pintar `<a>` cuando `url` contenga `localhost`.

Comprobación: PageSpeed Insights móvil de la home por encima de 80 y LCP por debajo de 2,5 s; `curl -A Googlebot /actualidad` contiene los títulos de las noticias.

---

## 6. P1 · Encabezados, alt, enlaces rastreables, `<main>`

- **Landings de bloques** (`components/landings/*`): solo `HeroSection`/`HeroSection2` pintan `<h1>`; el resto pasa a `<h2>`/`<h3>`. Hoy `/consultorias/cumplimiento-normativo` tiene 9 H1 y `/aplicaciones/bpm-suite` 2. Revisar `TextSection`, `PresentacionSection`, `ImgTextSection`, `SideImgTextSection` y los que usen `level1`/`title` como H1 (ficha W4, tabla 3.6 del catálogo).
- **Alt**: en los bloques con imagen, usar el campo de texto más cercano (`title`, `claim`) como `alt` cuando el editor no lo aporte; añadir campo `alt` en el editor de landings (receta 4) para los bloques de imagen. 16 imágenes sin alt en la consultoría, 2 en BPM.
- **Enlaces rastreables**: `Navbar.tsx` («Descubrir» es `<a onClick>` sin `href`), `Footer.tsx` («Contacto» ídem), tarjetas con `onClick`. Convertir a `<Link href>` o `<button>`. Es la única auditoría SEO que falla en Lighthouse (92).
- **Landmarks**: envolver el contenido de cada página en `<main>`; añadir «Saltar al contenido». Hoy no hay `<main>` en la home.
- `/formacion`: crear página o quitar enlaces (`Navbar.tsx:165,251`, `Footer.tsx:127`).
- Dos H1 en el hero de aplicaciones: hay un `<h1>` vacío (ver auditoría §2).

---

## 7. P1 · Datos estructurados

**Fichero:** `src/libs/seo.ts` (ampliar `organizationJsonLd`, añadir `websiteJsonLd`, `softwareApplicationJsonLd`, `articleJsonLd`, `itemListJsonLd`) y las páginas que los montan.

`Organization` completa (valores a confirmar con Juanma; no inventar):

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://www.normapro.es/#organization",
  "name": "NormaPro",
  "legalName": "Instituto de Innovación, Ciencia y Empresa, S.L.",
  "url": "https://www.normapro.es",
  "logo": "https://www.normapro.es/logos/NormaPro_Horizontal_Color@2x.png",
  "foundingDate": "<año, sin verificar>",
  "address": { "@type": "PostalAddress", "streetAddress": "<del aviso legal vigente>", "addressLocality": "<Jaén o Málaga: el aviso legal del repo dice Jaén y el PR #20 lo cambió a Málaga; confirmar>", "postalCode": "<cp>", "addressCountry": "ES" },
  "telephone": "<del aviso legal>",
  "email": "<correo público>",
  "sameAs": [
    "https://www.linkedin.com/company/normapro",
    "https://www.youtube.com/@normapro",
    "https://www.institutodeinnovacion.es/"
  ],
  "parentOrganization": { "@type": "Organization", "name": "Instituto de Innovación, Ciencia y Empresa", "url": "https://www.institutodeinnovacion.es/" },
  "hasCredential": [
    { "@type": "EducationalOccupationalCredential", "name": "ISO 27001", "recognizedBy": { "@type": "Organization", "name": "AENOR" } }
  ],
  "knowsAbout": ["cumplimiento normativo", "ISO 9001", "ISO 14001", "ISO 45001", "ISO 27001", "UNE 19601", "compliance penal", "canal de denuncias", "ESG", "CSRD"]
}
```

`SoftwareApplication` en ficha de solución (datos de `solucion`):

```json
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "<titleweb o title>",
  "description": "<subtitle>",
  "url": "<canónico>",
  "applicationCategory": "BusinessApplication",
  "applicationSubCategory": "Compliance management",
  "operatingSystem": "Web",
  "isPartOf": { "@type": "SoftwareApplication", "name": "NormaPro" },
  "provider": { "@id": "https://www.normapro.es/#organization" },
  "offers": { "@type": "Offer", "availability": "https://schema.org/InStock", "priceCurrency": "EUR", "price": "0", "description": "Precio bajo presupuesto" }
}
```

Si no hay precio, **no poner `price: 0`** (ST-WEB-12 ya se cerró por esto): omitir `offers` o usar `"priceSpecification": {"@type": "PriceSpecification", "description": "A consultar"}`.

`Article` en guías, noticias e informes con `author` (`Person` con `name` y `jobTitle`), `publisher` (`@id` de la organización), `datePublished`, `dateModified`, `image`.

Comprobación: validador de Schema.org (la herramienta de resultados enriquecidos de Google ya no valida `FAQPage`) y Search Console → Mejoras.

---

## 8. P1 · robots.txt, rastreadores de IA y hosts

**Fichero:** `src/app/robots.txt/route.ts`.

```
User-agent: *
Allow: /
Disallow: /api/
Disallow: /*?ref=
Disallow: /soluciones/*/sector/*/*

# Rastreadores de búsqueda con IA: permitidos (sirven para aparecer en respuestas)
User-agent: OAI-SearchBot
Allow: /
User-agent: PerplexityBot
Allow: /
User-agent: ClaudeBot
Allow: /
User-agent: Google-Extended
Allow: /

# Entrenamiento de modelos: decisión de Juanma. Permitir favorece que los modelos conozcan la marca; bloquear no afecta a la búsqueda
User-agent: GPTBot
Allow: /

Sitemap: https://www.normapro.es/sitemap.xml
```

Notas: `OAI-SearchBot` es el que decide si NormaPro aparece en la búsqueda de ChatGPT; `GPTBot` solo entrena (documentación de OpenAI, 30/10/2026). `PerplexityBot` indexa para Perplexity; `Perplexity-User` y `ChatGPT-User` ignoran robots. `Google-Extended` controla el uso en Gemini, no en AI Overviews. La línea `Disallow: /soluciones/*/sector/*/*` solo si se decide no servir esas páginas; si se redirigen a 308, no hace falta.

Vercel: comprobar en el panel que la protección contra bots («Bot Protection» / «Attack Challenge Mode») no bloquea a estos agentes. Vercel verifica a Googlebot y Bingbot; para los de IA, revisar la lista de bots verificados en el panel (sin verificar desde aquí).

`libs/seo.ts:221`: quitar `store.normapro.es` y `www.store.normapro.es` de `NORMAPRO_HOSTS` indexables y redirigirlos 301 al dominio principal en el middleware (o en Vercel → Domains → redirect).

Instituto: `www.institutodeinnovacion.es` da 500. Hasta que cargue, el sitemap de Instituto y `organizationJsonLd("instituto")` apuntan a un dominio caído. Arreglar en Vercel/DNS (fuera del repo).

---

## 9. P1 · Open Graph e imágenes sociales

- Generar `opengraph-image` por tipo de página (Next admite `opengraph-image.tsx` por ruta con `ImageResponse`): fondo de marca + título de la página + ámbito. Hoy todas usan el logo horizontal sobre blanco, que en LinkedIn se ve diminuto.
- Para soluciones con `multimediaUri` de imagen ya se usa; para las demás, imagen generada.

---

## 10. P2 · Guías: ruta y plantilla

Opción A (rápida): usar Actualidad con `categoria = "Guía"`. Requiere: plantilla de noticia con índice lateral, bloque «Cómo lo resuelve NormaPro» (enlaces a soluciones por `id_soluciones`, campo que ya existe en `storeActualidad`), FAQ (campo nuevo JSON o convención en el `content`), autor y `dateModified` visibles. `NewsArticle` → `Article`.

Opción B (buena): ruta `src/app/sites/normapro/guias/[slug]/page.tsx` + tabla `storeGuias` + módulo del editor (receta 8, entidad nueva con pantalla). Añadir al sitemap y al menú.

Decisión recomendada: A durante seis meses, B cuando se vea tracción en Search Console.

---

## 11. P2 · Búsqueda interna y navegación

- El buscador del menú enlaza a `/${item.slug}` (ruta inexistente para consultorías, `Navbar.tsx:296`) y rompe con «a» y dos espacios (ST-WEB-14). Corregir antes de promocionar el buscador como `SearchAction`.
- Desplegable de soluciones: pintar los enlaces en HTML inicial (hoy `fetch` en cliente) o, al menos, duplicarlos en el pie.

---

## 12. Medición técnica (configurar antes de empezar)

| Herramienta | Qué hacer | Quién |
|---|---|---|
| Google Search Console | Verificar `normapro.es` como **propiedad de dominio** (DNS TXT), no solo `https://www.`. Enviar sitemap. Activar el informe «Search Generative AI performance» (Search Console, junio de 2026; impresiones en AI Overviews y AI Mode, sin clics). Exportar 16 meses a `docs/seo/datos/` | Juanma |
| Bing Webmaster Tools | Importar desde Search Console. Activar IndexNow (Next no lo trae; se puede llamar al endpoint de IndexNow desde un script de despliegue). Bing alimenta ChatGPT | Juanma / desarrollo |
| Google Analytics 4 | No hay analítica hoy (prueba del 22/10: sin GA ni gestor de consentimiento). Instalar GA4 **con banner de consentimiento** (el PR #20 añade aviso de cookies; comprobar que bloquea GA hasta aceptar). Marcar como conversiones: envío de formulario de diagnóstico, descarga de informe, clic en «Entrar», clic en teléfono | Desarrollo |
| PageSpeed Insights / CrUX | Medición mensual de home, ámbito, solución, pack, guía. Guardar JSON en `docs/lighthouse/` (ver `../../../docs/FUTURO-LIGHTHOUSE-100.md`) | Desarrollo |
| Rastreo propio | Screaming Frog (gratis hasta 500 URL, suficiente tras limpiar el sitemap) una vez al mes: títulos duplicados, descriptions vacías, H1 múltiples, enlaces rotos, canónicos | Marketing / desarrollo |
| Vigilancia de IA | Ver `05-geo-ia.md` §6 | Marketing |

---

## 13. Orden de ejecución técnica (resumen)

| Semana | Bloque | Ficheros principales | Receta / ficha |
|---|---|---|---|
| 1 | §1 sitemap y canónicos; §2 redirecciones y 404; §8 robots y hosts | `sitemap.xml/route.ts`, `next.config.ts`, `[...not-found]`, `robots.txt/route.ts`, `libs/seo.ts` | W10, W1, receta 16 |
| 2 | §4 descriptions y home; §3 textos de ámbito y sector en servidor (sin campos nuevos) | `layout.tsx`, `libs/seo.ts`, `SolutionsHero*.tsx`, `AmbitosTabs.tsx`, `[ambito]/page.tsx` | W2, W3, recetas 1 y 10 |
| 3-4 | §3 campo `titleweb` en ámbito y FAQ de ámbito (tres capas); §6 encabezados, alt, enlaces | SQL, API `types/ambito.ts`, editor `AmbitosPage.tsx`, store `types/ambito.ts`, `components/landings/*`, `Navbar.tsx`, `Footer.tsx` | Recetas 6, 4, 2; W4, W11 |
| 5-6 | §5 home y listados en servidor, imágenes, vídeo, Font Awesome | `page.tsx` de home, `MainHeroCarousel.tsx`, `next.config.ts`, layouts | W2, W6, W7 |
| 7-8 | §7 datos estructurados; §9 Open Graph; §12 analítica | `libs/seo.ts`, páginas, `opengraph-image.tsx` | W10 |
| 9+ | §10 guías; §11 buscador | según opción A o B | Recetas 8, 15 |

Cada bloque: `npx tsc --noEmit`, `npm run build`, comprobación con `curl -A Googlebot`, actualización de la ficha W10 y de `INDICE-LOCALIZACION.md`, un commit por repo, sin `push` sin el «dale».
