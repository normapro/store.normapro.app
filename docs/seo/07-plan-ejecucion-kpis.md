# 07 · Plan de ejecución, calendario y KPI

Fecha: 30/10/2026. Horizonte: 12 meses desde que se cierren los errores funcionales de la web. Los esfuerzos son estimaciones en horas-persona; validar con el equipo.

---

## 1. Principio: primero quitar el lastre, después construir

Hoy la web manda a Google 2.684 copias de la home, páginas de categoría con «Lorem ipsum» y URL antiguas que mueren. Ningún contenido nuevo compensa eso. Por eso la Fase 0 es técnica y corta, y no se publica ninguna guía hasta que termine.

---

## 2. Fases

### Fase 0 · Dejar de perder (semanas 1-2) · ~40 h desarrollo

| Tarea | Doc | Esfuerzo | Comprobación |
|---|---|---|---|
| Sitemap sin combinaciones sector × solución; `lastmod` | `04` §1 | 4 h | 3.129 → ~330 URL |
| Redirecciones 301 de WordPress y `/todas-las-soluciones`; 404 real | `04` §2 | 6 h | `curl -I` |
| robots.txt con bots de IA; quitar `store.` de hosts indexables; `Disallow` de sector × solución si no se redirige | `04` §8 | 2 h | `curl robots.txt` |
| Quitar «Lorem ipsum»; H1 de sector; `textoweb` en servidor; listado de ámbito en servidor | `04` §3 (sin campos nuevos) | 12 h | `curl -A Googlebot` |
| Descriptions por defecto y de páginas fijas; título y H1 de la home | `04` §4 | 4 h | Rastreo con Screaming Frog |
| Enlaces rastreables en menú y pie; `/formacion` | `04` §6 | 4 h | Lighthouse SEO 100 |
| Search Console (dominio), Bing, exportación de línea base | `06` §2-3 | 3 h (Juanma) | CSV en `datos/` |
| Arreglar Instituto (500) | `06` §7 | ? (alojamiento) | 200 |
| Sede real confirmada para JSON-LD y GBP | `06` §1 | 0,5 h (Juanma) | — |

### Fase 1 · Base sólida (semanas 3-8) · ~80 h desarrollo + ~30 h contenido

| Tarea | Doc | Esfuerzo |
|---|---|---|
| `titleweb` en ámbito (tres capas) y FAQ de ámbito | `04` §3.5 | 12 h |
| Rellenar en el editor: 12 ámbitos (título, textoweb, FAQ), 11 sectores (titleweb, descriptionweb, textoweb), slug del pack truncado | `03` §3, §7 | 16 h contenido |
| Renombrar `titleweb` y `subtitle` de las 244 soluciones según la regla; diferenciar las réplicas entre ámbitos | `03` §4 | 24 h contenido (10 min por ficha, por lotes) |
| Home, actualidad, informes, historias en servidor; imágenes; vídeo con fachada; quitar kit de Font Awesome | `04` §5 | 24 h |
| Encabezados y alt en bloques de landing; `<main>` | `04` §6 | 10 h |
| `Organization` completa, `WebSite`, `SoftwareApplication`, `Article`, `ItemList` | `04` §7 | 10 h |
| Open Graph por página | `04` §9 | 6 h |
| GA4 + consentimiento | `06` §4 | 6 h |
| Bloque «Ficha técnica» en soluciones y aplicaciones | `05` §3 frente 5 | 12 h + contenido |
| GBP creado o reclamado; 5 primeras reseñas | `06` §1 | 4 h (Juanma) |

### Fase 2 · Contenido que trae clientes (meses 3-6) · ~120 h contenido

| Tarea | Doc | Esfuerzo |
|---|---|---|
| Decidir ruta de guías (Actualidad con categoría o `/guias/`) y plantilla citable | `04` §10, `05` §4 | 8 h desarrollo |
| 10 guías de nivel 1 (1.500 palabras, FAQ, fuentes, autor) | `03` §8 | 8 h cada una = 80 h |
| Actualizar los 3 informes existentes (ENS vs ISO 27001, CSRD, seguridad digital) con fecha 2026 y FAQ | `03` §8 | 12 h |
| 2 comparativas honestas (ISOTools, EticAlert/Cumpleo en canal de denuncias) | `05` §3 frente 3 | 12 h |
| Altas en Capterra, GetApp, SoftwareDoit, Appvizer, Comparasoft, BlindaSoft; 15 reseñas | `06` §5 | 12 h + gestión de clientes |
| Wikidata, LinkedIn alineado, 6 vídeos con transcripción | `05` §3 frente 2 y 4 | 10 h |
| Panel mensual de 30 prompts de IA (primera medición en el mes 3) | `05` §3 frente 6 | 2 h/mes |

### Fase 3 · Ampliar y consolidar (meses 7-12) · ~100 h

| Tarea | Doc |
|---|---|
| 10 guías de nivel 2 (NIS2, legionella, revisión por la dirección, inspecciones por instalación, clínica dental, sector agua…) | `03` §8 |
| Landings de sector con contenido real (las 11) y 3 casos de éxito nuevos con cifras | `03` §7 |
| Activar ámbito × sector solo donde haya texto propio (quitar `noindex` una a una) | `04` §1.5 |
| Prensa y asociaciones: 10 menciones con enlace | `06` §6 |
| Migrar guías a `/guias/` si Actualidad se queda corta | `04` §10 |
| Revisión trimestral de títulos según Search Console (consultas con impresiones y CTR bajo) | — |

---

## 3. Qué hace cada cual

| Rol | Fases 0-1 | Fases 2-3 |
|---|---|---|
| Desarrollo (store, API, editor) | Todo `04` | Plantilla de guías, bloques nuevos, correcciones |
| Juanma | Search Console, Bing, GBP, sede, decisiones (precio público, GPTBot, Instituto) | Aprobación de guías, contacto con clientes para reseñas, prensa |
| Redactor con criterio normativo (interno o externo; idealmente alguien del Instituto que conozca las normas) | Títulos y textos de ámbitos, sectores y soluciones | Guías, comparativas, FAQ, fichas técnicas |
| Marketing / comunicación | Fotos, vídeo, LinkedIn | Directorios, reseñas, YouTube, prensa, panel de IA |

Si no hay redactor con criterio normativo, el cuello de botella son las guías: son el 60 % del valor del plan y no se pueden encargar a cualquiera sin revisión técnica. Es la primera contratación o subcontratación que conviene cerrar.

---

## 4. KPI y objetivos

Línea base: exportación de Search Console antes de la Fase 0 (hoy sin acceso; cifras a rellenar).

| KPI | Fuente | Hoy | 3 meses | 6 meses | 12 meses |
|---|---|---|---|---|---|
| URL válidas indexadas / URL en sitemap | Search Console → Páginas | ? / 3.129 | ≥ 300 / ~330 | ≥ 320 / ~340 | ≥ 350 / ~360 |
| Páginas con redirección o soft 404 | Search Console | miles (estimado) | < 100 | < 20 | < 20 |
| Impresiones orgánicas no de marca / mes | Search Console (excluir «normapro») | ? | +50 % | ×3 | ×8 |
| Clics orgánicos no de marca / mes | Search Console | ? | +30 % | ×2 | ×5 |
| Consultas en top 10 de nivel 1 (`01` §7) | Search Console / rastreo de posiciones | ~0 | 5 | 15 | 30 |
| Impresiones en AI Overviews / AI Mode | Search Console, informe de IA | ? | medir | +100 % | +300 % |
| Prompts del panel donde aparece NormaPro (de 30) | Panel manual | 0 (estimado) | 3 | 8 | 15 |
| Búsquedas de marca «normapro» / mes | Search Console | ? | +10 % | +30 % | +60 % |
| Reseñas (Google + Capterra) | Fichas | 0 | 8 | 15 | 30 |
| Leads orgánicos (formulario + descargas) / mes | GA4 | sin medir | medir | ×2 | ×4 |
| Lighthouse móvil home: rendimiento / SEO | PSI | 56 / 92 | 75 / 100 | 85 / 100 | 90 / 100 |
| LCP home móvil | PSI | 18,6 s | < 4 s | < 2,5 s | < 2,5 s |
| Dominios que enlazan | Search Console → Enlaces | ? | +5 | +12 | +25 |

Revisión mensual (1 h): Search Console, panel de IA, GA4, Screaming Frog. Revisión trimestral (medio día): títulos y descriptions con CTR bajo, contenido a actualizar (fecha), nuevas obligaciones normativas que generen guía.

---

## 5. Decisiones que solo puede tomar Juanma (bloquean partes del plan)

| Decisión | Afecta a | Recomendación |
|---|---|---|
| ¿Publicar precios (al menos «desde») en canal de denuncias, CAE e ISO 9001? | `01` §5, fichas, directorios | Sí, al menos «desde X €/mes» en canal de denuncias: sin precio no se entra en la comparación del comprador y los competidores lo publican todos |
| ¿Sede oficial Jaén o Málaga? | JSON-LD, GBP, aviso legal | La que sea real; una sola |
| ¿Permitir `GPTBot` (entrenamiento)? | robots.txt | Permitir |
| ¿Instituto como sitio propio o redirigir a NormaPro? | `06` §7 | Redirigir si no va a publicar contenido mensual |
| ¿Guías en Actualidad o ruta `/guias/`? | `04` §10 | Actualidad ahora, `/guias/` cuando haya 10 |
| ¿Quién redacta con criterio normativo? | Fase 2 | Alguien del Instituto + revisión; o freelance jurídico-técnico |
| ¿Renombrar «Soluciones/Packs/Ámbitos/Historias» en el menú? | `01` §3 | Sí: «Software por área», «Packs» → «Soluciones completas», «Historias» → «Casos de éxito» |
| ¿Agente digitalizador del Kit Digital? | `01` §4.9 | Si lo es, página y ficha en el catálogo; si no, descartar |

---

## 6. Cómo mantener vivo este plan

- Este directorio (`docs/seo/`) es el único lugar donde vive el plan. Cada cambio de código SEO actualiza `02` (auditoría, sección de correcciones fechada) y la ficha W10.
- Cada mes se añade una fila a `datos/seguimiento-kpi.csv` (crear en la primera medición) y, si aplica, a `datos/seguimiento-ia.csv`.
- Cada guía nueva se registra en `03` §8 con su URL real y su palabra clave.
- Cada trimestre se vuelve a ejecutar la recolección de autocompletado (`datos/harvest.py`, misma lista de semillas) y se comparan sugerencias nuevas: así se detectan obligaciones nuevas antes que la competencia.
- Las fechas normativas de este plan (Ley 2/2023, UNE 19601:2025, Ómnibus I, NIS2, AIPI) se verifican en BOE/DOUE antes de publicarlas en una guía.
