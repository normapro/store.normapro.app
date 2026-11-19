# 02 · Auditoría SEO de producción (www.normapro.es)

Fecha: 30/10/2026. Comprobado contra el HTML que sirve Vercel a Googlebot (petición con user-agent de Googlebot, sin JavaScript) y contra el código de la rama `docs/escaner-documentacion` (`0817fe9`, PR #19 de SEO). Sin valores de configuración. Lo que no se pudo comprobar se marca «sin verificar».

Esta auditoría no repite el diagnóstico de errores funcionales (`../../../docs/ERRORES-DETECTADOS.md`). Solo recoge lo que afecta a que Google y los motores de IA encuentren, entiendan y muestren la web.

---

## 1. Resumen en diez líneas

1. **El 86 % del sitemap (2.684 de 3.129 URL) devuelve la home.** Las rutas `/soluciones/{ámbito}/sector/{sector}/{solución}` redirigen a `/` con 307 y canónico `https://www.normapro.es`. Google recibe 2.684 veces la misma página. Es el problema número uno: desperdicia el presupuesto de rastreo y manda la señal de que el sitio está roto.
2. **Las 12 páginas de ámbito y las 143 de sector llevan «Lorem ipsum» en el HTML servido** y el listado de soluciones no está («No hay soluciones disponibles»: se carga en el navegador). Son las páginas que deberían posicionar para «software ISO 9001», «software compliance penal», «software PRL». Hoy pesan 120-150 palabras y no dicen nada.
3. **Las 244 fichas de solución están bien construidas** (título, descripción, canónico, H1, 1.100 palabras, migas, FAQ en JSON-LD). Es la base sobre la que se construye todo. No hay que rehacerlas, hay que ordenarlas y enlazarlas.
4. **Las URL antiguas de la web WordPress siguen indexadas en Google y mueren en la home.** `normapro.es/compliance-penal/`, `/canal-de-denuncias/`, `/gestor-documental/`, `/bpm/`, `/portal-del-empleado/`, `/formapro/`, `/ticketing/`, `/compliance-tecnico/`, `/programa-digitalizacion-de-procesos-internos/`: 308 a `www`, 307 a `/`. Toda la autoridad acumulada durante años se tira. Hay destino natural para cada una en `/aplicaciones/...` y `/consultorias/...`.
5. **No existe 404.** Cualquier URL inventada redirige a la home (307). Google lo trata como «soft 404» masivo y confunde el canónico.
6. **La meta description por defecto es un eslogan** («Encuentra productos específicos para tu empresa en 60 segundos») y se repite en `/soluciones`, `/actualidad`, `/informes`, `/nosotros`, legales y ámbitos sin `textoweb`.
7. **El sitio Instituto (`www.institutodeinnovacion.es`) devuelve 500.** Es el canónico declarado en el código para el segundo sitio. Si lleva tiempo así, Google lo está desindexando.
8. **La home, `/actualidad`, `/historias` e `/informes` se pintan en el navegador.** Sin JavaScript solo llega el esqueleto (87-268 palabras). Lighthouse móvil de la home: 56, con LCP de 18,6 s (medición del 22/10/2026).
9. **Datos estructurados mínimos.** `Organization` sin dirección, teléfono, `sameAs` ni fundador; no hay `Product`/`SoftwareApplication` ni `Service`; `FAQPage` ya no da resultados enriquecidos en Google desde el 7/5/2026 (sigue siendo útil para IA).
10. **robots.txt no dice nada a los rastreadores de IA** (ni permite ni bloquea). Hoy pasan, pero conviene declararlo y vigilar que Vercel no los filtre.

---

## 2. Inventario de lo que sirve el servidor por tipo de página

Medido el 30/10/2026 con `curl` y user-agent de Googlebot. «Palabras» es el texto visible sin menú ni pie contado de forma aproximada.

| Tipo de página | URL de muestra | Título servido | Description | H1 | Palabras | JSON-LD | Veredicto |
|---|---|---|---|---|---|---|---|
| Home | `/` | Digitalización sin límites \| NormaPro | «Navegamos contigo hacia una evolución tecnológica…» | Digitalización sin límites | 268 (resto en navegador) | Organization | Título y H1 sin ninguna palabra que busque un cliente |
| Listado soluciones | `/soluciones` y `/todas-las-soluciones` | Soluciones \| NormaPro | Eslogan genérico | Soluciones NormaPro | 134, con **Lorem ipsum** | Organization | Dos URL con el mismo contenido; canónico correcto a `/soluciones` |
| Ámbito (12) | `/soluciones/compliance-penal` | Compliance Penal \| NormaPro | Eslogan genérico (sin `textoweb`) | Soluciones NormaPro | 154, con **Lorem ipsum** y «No hay soluciones disponibles» | Organization + Breadcrumb | **Página de categoría vacía para Google** |
| Sector (11 + 132 combinaciones) | `/soluciones/all/sector/industria` | Industria \| NormaPro | «Tu producción no se detiene…» | **Sector** | 123, con «Descripción del sector en detalle. Lorem ipsum…» | Organization + Breadcrumb | H1 literal «Sector». Vacía |
| Ámbito × sector | `/soluciones/compliance-penal/sector/industria` | Compliance Penal \| Industria \| NormaPro | la del sector | **Sector** | 126 | Organization + Breadcrumb | Igual que la anterior; 132 copias |
| **Solución (244)** | `/soluciones/compliance-penal/canal-de-denuncias` | Canal de denuncias Compliance Penal \| NormaPro | Subtítulo real | Canal de denuncias NormaPro para Compliance Penal | **1.101** | Organization + Breadcrumb + FAQPage | **Bien.** Es el activo |
| Solución × sector (2.684) | `/soluciones/compliance-penal/sector/industria/canal-de-denuncias` | **Digitalización sin límites** (la home) | la de la home | la de la home | 268 | Organization | **307 a `/`.** El 86 % del sitemap |
| Pack (17) | `/soluciones/compliance-penal/packs/digitalizacion-une-19601` | Digitalización UNE 19601 \| Compliance penal eficaz | Real | Digitalización UNE 19601 | 1.127 | Organization + Breadcrumb + FAQPage | Bien. Un pack tiene el slug truncado (`…/packs/modelo-avanzado-normapro-de-gest`) |
| Aplicación (6) | `/aplicaciones/bpm-suite` | BPM Suite \| NormaPro | «Procesos operativos eficaces» (demasiado corta) | Optimiza y automatiza tus procesos… (+ un H1 vacío) | 3.584 | Organization + Breadcrumb | Contenido largo. Dos H1, 2 imágenes sin alt, sin FAQ |
| Consultoría (3) | `/consultorias/cumplimiento-normativo` | Programa avanzado de Cumplimiento normativo Técnico \| NormaPro | Real | 9 H1 (varios vacíos) | 7.360 | Organization + Breadcrumb | Landing de ventas larga, 16 imágenes sin alt, estructura de encabezados rota |
| Historia (4) | `/historias/emacsa` | Emacsa \| NormaPro | Real | Emacsa | 534 | Organization + Breadcrumb | Correcta pero sin contexto de búsqueda (título «Emacsa» solo) |
| Listados editoriales | `/actualidad`, `/informes`, `/historias` | «Actualidad \| NormaPro»… | Eslogan genérico | Actualidad / Informes / ninguno | 87-112 | Organization | Se pintan en navegador |
| Corporativas | `/nosotros` | Quiénes somos \| NormaPro | Eslogan genérico | **ninguno** | 397 | Organization | Sin H1 |
| URL antiguas WP | `/compliance-penal`, `/bpm`… | la home | la home | la home | 268 | — | 307 a `/` |
| URL inexistente | `/esto-no-existe` | la home | — | — | — | — | 307 a `/`. **No hay 404** |

Dominio sin `www`: `normapro.es` → 308 a `www.normapro.es`. Correcto.
`store.normapro.es` responde 200 con el mismo sitio (canónico a `www.normapro.es`, así que no duplica, pero no debería ser accesible; mejor 301).
`canaldedenuncias.normapro.es` responde 200: es la aplicación del canal, no la web. Comprobar que lleve `noindex` (sin verificar).

---

## 3. Hallazgos técnicos, con causa en el código

| # | Hallazgo | Dónde está la causa | Gravedad |
|---|---|---|---|
| SEO-01 | 2.684 URL de solución × sector del sitemap redirigen a `/` | `src/app/sitemap.xml/route.ts` genera las combinaciones ámbito × sector × solución; `components/soluciones/SolucionPage.tsx` hace `redirect("/")` cuando `getSolucion(slug, sector)` devuelve nulo. En producción la API no resuelve esas combinaciones (sin verificar si es dato o consulta). Independientemente de la causa, esas páginas **no deben existir como URL indexables** mientras sean la misma ficha con otra miga | Crítica |
| SEO-02 | Ámbito y sector sirven «Lorem ipsum» y sin listado | `components/SolutionsHero.tsx` y `SolutionsHeroSector.tsx` llevan el texto de relleno en el código; `AmbitosTabs.tsx` carga el listado con `fetch` en el navegador | Crítica |
| SEO-03 | URL antiguas de WordPress sin redirección específica | No hay `redirects()` en `next.config.ts` ni `vercel.json`. El comodín `[...not-found]/page.tsx` redirige todo a `/` | Crítica |
| SEO-04 | No existe 404 | `src/app/sites/normapro/[...not-found]/page.tsx` hace `redirect("/")`; `SolucionPage`, ámbito, sector y pack hacen lo mismo cuando no encuentran el dato | Alta |
| SEO-05 | Description genérica repetida | `libs/seo.ts` no tiene description por defecto; `app/sites/normapro/layout.tsx` fija el eslogan como description del layout y las páginas sin `description` la heredan | Alta |
| SEO-06 | Home sin palabras clave en título ni H1 | `components/MainHeroCarousel.tsx:59-60` («Digitalización sin límites»); `app/sites/normapro/page.tsx` | Alta |
| SEO-07 | Home, actualidad, informes, historias se pintan en navegador | `page.tsx` de esas rutas son `'use client'` o cargan con `useEffect` (fichas W2, W6, W7) | Alta (rendimiento + indexación de noticias) |
| SEO-08 | Sitemap sin `lastmod`, sin índice de sitemaps, sin imágenes | `src/app/sitemap.xml/route.ts` | Media |
| SEO-09 | `Organization` incompleta | `libs/seo.ts:357-363` solo `name`, `url`, `logo` | Media |
| SEO-10 | No hay `Product`/`SoftwareApplication`/`Service` en fichas | `SolucionPage.tsx`, `PackDetalle.tsx`, páginas de aplicación | Media |
| SEO-11 | Encabezados rotos en landings de bloques | `components/landings/*` usan `<h1>` en varios bloques (HeroSection, TextSection…) | Media |
| SEO-12 | Imágenes sin alt en landings | Bloques de landing que pintan `alt=""` o sin alt (16 en consultoría) | Media |
| SEO-13 | «Los enlaces no son rastreables» (Lighthouse SEO 92) | Elementos `<a onClick>` sin `href` en `Navbar.tsx` («Descubrir») y `Footer.tsx` («Contacto»); tarjetas con `onClick` | Media |
| SEO-14 | `/formacion` en menú y pie lleva a una ruta inexistente | `Navbar.tsx:165,251`, `Footer.tsx:127` (ST-WEB-08) | Media |
| SEO-15 | 19 de 19 clientes enlazan a `localhost:3000` (95 enlaces en la home) | Dato de la API (ST-API-05) | Media (señal de calidad) |
| SEO-16 | `store.normapro.es` accesible con 200 | `libs/seo.ts:221` lo incluye en `NORMAPRO_HOSTS` como indexable | Baja |
| SEO-17 | Instituto devuelve 500 | Fuera del repo (DNS/Vercel; sin verificar) | Alta para el Instituto |
| SEO-18 | `og:image` único (logo horizontal sobre blanco) en todo el sitio | `DEFAULT_OG_IMAGE` en `libs/seo.ts:210` | Baja |
| SEO-19 | Sin `hreflang`/idioma alternativo; `lang="es"` correcto | — | Ninguna (solo España) |
| SEO-20 | robots.txt sin reglas para rastreadores de IA ni bloqueo de rutas internas | `src/app/robots.txt/route.ts` | Baja hoy, media en 2027 |

---

## 4. Lo que ya está bien (no tocar, replicar)

- Metadatos en servidor con `generateMetadata` y `pageMetadata()` en `libs/seo.ts`: plantilla de título, canónico, Open Graph, Twitter. Es la pieza que hace posible todo el plan.
- `noindex` automático fuera de los hosts de producción (`isIndexableHost`).
- Fichas de solución y pack: título propio (`titleweb` con prioridad), description real (`subtitle`), H1, migas con JSON-LD, FAQ con JSON-LD, 1.100 palabras, enlaces internos a otras soluciones.
- `sitemap.xml` y `robots.txt` generados por la app, revalidación cada hora.
- JSON-LD serializado con escape de `<`.
- Campos ya existentes en editor y base de datos para SEO: `titleweb` (solución, solución-ámbito, solución-ámbito-sector, pack), `textoweb` (ámbito, sector), `descriptionweb` y `backgroundImage` (sector). **Faltan por rellenar, no por crear.**

---

## 5. Mediciones de partida (para comparar dentro de seis meses)

| Métrica | Valor | Fuente | Fecha |
|---|---|---|---|
| URL en sitemap | 3.129 | `sitemap.xml` | 30/10/2026 |
| URL del sitemap que sirven contenido propio | 445 (14 %) | Cálculo sobre la tabla del §2 | 30/10/2026 |
| Páginas de normapro.es que muestra un buscador para `site:` | 10, de las cuales 8 son URL antiguas de WordPress | Búsqueda del 30/10/2026 | 30/10/2026 |
| Lighthouse móvil home: rendimiento / accesibilidad / buenas prácticas / SEO | 56 / 89 / 73 / 92 | PageSpeed Insights (`../../../docs/PRUEBA-PRODUCCION-2026-10-21.md` §5) | 22/10/2026 |
| LCP home móvil | 18,6 s | Ídem | 22/10/2026 |
| Lighthouse móvil ficha de solución | 78 / 92 / 96 / 92 | Ídem | 22/10/2026 |
| Datos de campo (CrUX) | Sin datos (tráfico insuficiente) | Ídem | 22/10/2026 |
| Search Console: impresiones, clics, consultas | **Sin acceso desde aquí.** Pedir a Juanma exportación de los últimos 16 meses | — | — |
| Reseñas en Capterra / GetApp / G2 / SoftwareDoit | **0 fichas encontradas** para NormaPro | Búsqueda del 30/10/2026 | 30/10/2026 |
| Ficha de Google Business Profile | **No localizada** en búsqueda; sin verificar en Maps | Búsqueda del 30/10/2026 | 30/10/2026 |

---

## 6. Qué no se ha podido comprobar y cómo cerrarlo

| Pendiente | Cómo cerrarlo | Quién |
|---|---|---|
| Qué consultas traen tráfico hoy y qué páginas reciben impresiones | Exportar Search Console (Rendimiento, 16 meses, por consulta y por página) a CSV y guardarlo en `docs/seo/datos/` | Juanma |
| Por qué la API no resuelve solución × sector en producción (¿datos vacíos o consulta?) | Pedir a la API `solucion/:slug?sector=:sectorSlug` (nombre exacto en `config/api.ts`) con una combinación del sitemap y ver la respuesta | Desarrollo |
| Si `canaldedenuncias.normapro.es` lleva `noindex` | `curl -A Googlebot` y buscar `<meta name="robots"` | Desarrollo |
| Estado real del dominio del Instituto (500) | Panel de Vercel y DNS | Quien lleve el alojamiento |
| Backlinks actuales (quién enlaza a normapro.es y a las URL antiguas) | Search Console → Enlaces; opcionalmente Ahrefs Webmaster Tools (gratuito con verificación) | Juanma |
| Volúmenes de búsqueda reales por palabra clave | Google Keyword Planner (cuenta de Google Ads, sin gastar) filtrado por España; ver `01-investigacion-mercado-keywords.md` §2 | Juanma / marketing |
