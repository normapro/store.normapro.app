# 05 · GEO: aparecer en las respuestas de la IA (AI Overviews, AI Mode, ChatGPT, Perplexity, Gemini, Claude)

Fecha: 30/10/2026. «GEO» aquí es *Generative Engine Optimization*: que cuando un director de calidad o un compliance officer pregunte a una IA «qué software uso para el canal de denuncias» o «cómo gestiono las inspecciones de equipos a presión», NormaPro salga citado. La parte de «geo» geográfica (Google Business Profile, Jaén/Málaga) está en `06-presencia-externa-local.md`.

---

## 1. Lo que dice Google y lo que dicen los datos (sin humo)

**Fuentes oficiales**
- Google, «AI features and your website» (actualizada el 10/12/2025, leída el 30/10/2026): no hay requisitos ni ficheros especiales para salir en AI Overviews o AI Mode. Basta con estar indexado y ser elegible para fragmento. Recomendaciones: rastreo permitido (también en CDN), contenido importante en texto, buena experiencia de página, datos estructurados que coincidan con lo visible, enlaces internos, Business Profile al día. Controles: `nosnippet`, `data-nosnippet`, `max-snippet`, `noindex`; `Google-Extended` solo afecta a Gemini, no a la búsqueda.
- Google Search Console, junio de 2026: informe «Search Generative AI performance» con impresiones en AI Overviews y AI Mode (sin clics por ahora). Hay que activarlo en la propiedad.
- OpenAI (documentación de bots, 30/10/2026): `OAI-SearchBot` decide si un sitio aparece en la búsqueda de ChatGPT; `GPTBot` solo entrena; `ChatGPT-User` ignora robots. La búsqueda de ChatGPT se apoya en el índice de Bing (afirmación de terceros, consistente con la práctica): **sin Bing Webmaster Tools no hay ChatGPT**.
- Perplexity (documentación, 30/10/2026): `PerplexityBot` indexa; `Perplexity-User` ignora robots.

**Datos de estudios de 2026** (blogs de proveedores; usar como indicio, no como cifra)
- Entre el 78 % de las fuentes citadas en AI Overviews ya estaban en el top 10 orgánico (Authoritas). Traducción: **primero SEO clásico, después GEO**.
- En consultas B2B de software, G2 es el dominio más citado (5,8 % de citas en un estudio de 1.260 prompts) y los directorios de reseñas suman alrededor del 23 % de las citas; las webs de las propias empresas, en torno al 50 %. Reddit pesa poco en B2B de nicho en español.
- Los «listicles» («mejores software de X») son entre el 37 % y el 55 % de las citas según plataforma. Cuando la marca cita su propio ranking, la IA la deja fuera el 69 % de las veces (Lily Ray). Traducción: **hay que estar en las listas de terceros**, no escribir la propia.
- Las citas favorecen contenido de los últimos 12 meses y páginas con fecha de actualización visible.
- Más del 90 % de las sesiones de AI Mode no generan clic (dato indirecto de Kevin Indig). Traducción: la métrica pasa a ser **ser citado** y **ser recordado**, más que el clic.
- El 33 % de las búsquedas en Google España muestran AI Overview (SE Ranking, 100.000 palabras clave).

---

## 2. Cómo decide una IA a quién citar (modelo mental para escribir)

Una IA que responde «qué software de compliance penal uso» hace tres cosas: (1) lanza varias búsquedas derivadas («software compliance penal», «une 19601 software», «mejor plataforma compliance pymes», «canal de denuncias integrado») —el *query fan-out*—; (2) lee las páginas que salen arriba y extrae afirmaciones concretas; (3) compone la respuesta citando las fuentes de las que sacó cada afirmación.

Por tanto una página se cita si:
1. **Posiciona** para alguna de las búsquedas derivadas (SEO clásico).
2. Contiene **afirmaciones extraíbles**: frases cortas, con sujeto, con datos («NormaPro cubre 12 áreas de cumplimiento», «activa el canal en un día», «modelo certificado por AENOR», «más de 30 años», «clientes: Bosch, Calidad Pascual, Emacsa»).
3. Responde **preguntas literales** con una respuesta directa en las primeras 50 palabras bajo el encabezado.
4. Está **confirmada por terceros**: directorios, comparativas, prensa, LinkedIn, YouTube. La IA desconfía de lo que solo dice la propia marca.
5. Es **reciente** y lo dice (fecha de actualización).
6. Se puede **leer sin JavaScript** (los bots de IA no ejecutan JS). Hoy la home y los listados de NormaPro son invisibles para ellos.

---

## 3. Plan GEO en seis frentes

### Frente 1 · Accesibilidad técnica para bots de IA (semana 1, va con `04` §8)
- robots.txt con `OAI-SearchBot`, `PerplexityBot`, `ClaudeBot`, `Google-Extended` permitidos de forma explícita.
- Comprobar en Vercel que ningún «bot challenge» les devuelve 403. Prueba: `curl -A "OAI-SearchBot/1.0; +https://openai.com/searchbot" https://www.normapro.es/soluciones/compliance-penal` → 200 y HTML con texto.
- Todo el contenido importante en el HTML del servidor (`04` §3 y §5).
- Bing Webmaster Tools verificado, sitemap enviado, IndexNow activo.
- Mantener `FAQPage`, `Article`, `Organization` completa y `SoftwareApplication`: no son obligatorios, pero las IA los usan para extraer entidades.

### Frente 2 · Entidad «NormaPro» clara y única (mes 1)
El autocompletado de «normapro» mezcla el software de NormaPro con **Norma PRO de Athenasoft** (presupuestos de construcción, Polonia y Chequia), «normapro euromat», «normapro france» y «normapro consulting». Para una IA, hoy «NormaPro» es ambiguo. Acciones:
- `Organization` con `@id`, `legalName`, `parentOrganization` (Instituto), dirección, `sameAs` (LinkedIn, YouTube, Instituto) y `knowsAbout` (`04` §7).
- Un párrafo de definición idéntico en la home, en `/nosotros`, en LinkedIn y en el Instituto: «NormaPro es la plataforma de software de cumplimiento normativo y sistemas de gestión (ISO 9001, 14001, 45001, 27001, UNE 19601, Ley 2/2023, ESG) desarrollada por el Instituto de Innovación, Ciencia y Empresa (Jaén, España) desde [año].» Las IA aprenden entidades por repetición consistente.
- Página «Qué es NormaPro» (puede ser `/nosotros` reescrita) con: qué es, quién lo hace, desde cuándo, qué cubre (12 áreas con enlaces), certificaciones, clientes con nombre, cifras (usuarios, empresas, años), equipo con nombres y cargos.
- Entrada en Wikidata (gratuita, cualquiera puede crearla) con el nombre, la empresa matriz, la web y el tipo «software». Es la fuente de entidades que más usan los modelos.
- Arreglar el Instituto (500): es la entidad matriz y hoy no existe para nadie.

### Frente 3 · Contenido «citable» (meses 1-6, va con `03` §8)
Para cada guía, página de categoría y ficha:
- Primer párrafo = respuesta directa (40-60 palabras) a la pregunta del H1.
- Un bloque «En resumen» con 3-5 viñetas de hechos con cifras y fechas (umbral de 50 trabajadores, plazo de 7 días para acuse, 3 meses para resolver, sanciones hasta 1.000.000 €, UNE 19601:2025 publicada el 24/4/2025, Ómnibus I: más de 1.000 empleados y 450 M€).
- FAQ de 5-8 preguntas con la pregunta literal como la busca la gente (`01` §6).
- Autor con nombre, cargo y enlace a LinkedIn; fecha de publicación y de última revisión visibles.
- Citas a fuentes primarias (BOE, UNE, AEPD, AIPI, EFRAG, INSST) con enlace. Las IA puntúan la página que cita bien.
- Comparativas honestas «NormaPro frente a ISOTools / Cumpleo / EticAlert» con tabla de funcionalidades; sin declarar ganador absoluto (las IA descartan la autopromoción).
- Tablas: las IA extraen tablas mejor que prosa. Ejemplo: «Obligaciones de inspección por tipo de instalación: norma, periodicidad, quién inspecciona».

### Frente 4 · Presencia en las fuentes que la IA ya cita (meses 1-3, va con `06`)
- Fichas en Capterra, GetApp, SoftwareDoit, Appvizer, Comparasoft, BlindaSoft, ComparaSST, G2 (en ese orden de esfuerzo/retorno para España). Con **reseñas reales**: pedir a 10 clientes (Bosch, Pascual, Emacsa y los 16 restantes del carrusel) una reseña en Capterra y en Google. Objetivo: 15 reseñas en 6 meses.
- Aparecer en las comparativas de terceros que ya posicionan: «Los 7 mejores software de canal de denuncias» (SoftwareDoit), «Mejores software de compliance para pymes» (Law&Trends, 4DLegal, Cumpleo), «Mejor software PRL» (BlindaSoft, focoenobra), «Plataformas CAE 2026» (Comparasoft, BlindaSoft). Contactar a cada editor con ficha de producto, capturas y 3 clientes referenciables. Muchas incluyen gratis; otras cobran: decidir caso a caso.
- LinkedIn de empresa activa (ya existe) con el mismo vocabulario que la web; artículos de LinkedIn republicando las guías (con canónico a la web).
- YouTube (ya existe): un vídeo por aplicación y por guía, con transcripción; las IA leen transcripciones.
- Prensa sectorial y asociaciones: AEC (son miembros, según el pie), ASCOM (ídem), Compliance Officers (ASCOM publica directorios de proveedores), colegios profesionales, Diputación de Jaén, Andalucía Emprende. Una nota de prensa por hito (certificación, cliente, versión).

### Frente 5 · Formato de respuesta en las fichas de producto (mes 2)
En las 244 fichas, 17 packs y 6 aplicaciones, añadir un bloque fijo en servidor «Ficha técnica» con pares clave-valor que una IA pueda extraer:

| Campo | Ejemplo |
|---|---|
| Qué es | Canal de denuncias anónimo y confidencial para empresas |
| Para quién | Empresas y entidades con 50 o más trabajadores, grupos y sector público |
| Normativa que cubre | Ley 2/2023, Directiva (UE) 2019/1937, UNE 19601:2025, ISO 37002 |
| Tiempo de puesta en marcha | 1 día |
| Modalidad | SaaS en la nube, acceso web y móvil |
| Integraciones | Gestor documental NormaPro, portal del empleado, BPM |
| Seguridad | ISO 27001 (AENOR), alojamiento en la UE (confirmar) |
| Precio | Bajo presupuesto (o el precio, si se decide publicarlo) |
| Proveedor | Instituto de Innovación, Ciencia y Empresa, S.L., España, desde [año] |

Es un campo nuevo o una convención de bloques en el editor (receta 6/7). Sin este bloque, la IA tiene que inferir, y suele inferir mal.

### Frente 6 · Medición (desde el mes 1)
- Search Console → informe «Search Generative AI performance»: impresiones en AI Overviews y AI Mode por página. Es la única fuente oficial.
- Panel de 30 prompts de control, ejecutados el día 1 de cada mes en ChatGPT (con búsqueda), Perplexity, Gemini, Claude y Google AI Mode. Anotar: ¿aparece NormaPro? ¿en qué posición? ¿qué URL cita? ¿qué dice? Hoja en `docs/seo/datos/seguimiento-ia.csv`. Prompts iniciales:
  1. ¿Qué software de canal de denuncias cumple la Ley 2/2023 para una pyme española?
  2. ¿Es obligatorio el canal de denuncias para una empresa de 40 trabajadores en España?
  3. Mejor software de compliance penal UNE 19601
  4. ¿Qué diferencia hay entre UNE 19601 e ISO 37301?
  5. Software para gestionar ISO 9001 en una pyme en España
  6. Software de gestión documental para ISO 9001
  7. ¿Cómo gestiono las no conformidades y acciones correctivas?
  8. Software PRL para una empresa industrial en Andalucía
  9. ¿Qué plataforma CAE elegir?
  10. Software para identificar requisitos legales ambientales (ISO 14001)
  11. ¿Cada cuánto hay que inspeccionar los equipos a presión?
  12. Software de cumplimiento normativo para clínicas dentales
  13. ¿Me afecta la CSRD tras el Ómnibus? ¿Qué es VSME?
  14. ENS o ISO 27001 para una empresa tecnológica
  15. ¿Qué es NormaPro? / ¿Quién está detrás de NormaPro? / Alternativas a NormaPro
  16. Alternativas a ISOTools en España
  17. Software de cumplimiento normativo para empresas de agua
  18. Portal del empleado con firma de nóminas y canal de denuncias
  19. Software para controlar la legionella según el RD 487/2022
  20. Plataforma todo en uno para calidad, medio ambiente y PRL
  (21-30: repetir las diez primeras en inglés y con «en Jaén / en Andalucía»).
- Objetivo a 6 meses: aparecer en 8 de 30; a 12 meses: 15 de 30, con la URL correcta.
- Herramientas de pago (Peec, Profound, Otterly, Semrush AI Toolkit) solo si el panel manual se queda corto.

---

## 4. Plantilla de página «citable» (para guías y categorías)

```
H1: [Pregunta o tema tal como se busca]
Párrafo 1 (40-60 palabras): respuesta directa. Sujeto + verbo + dato + fuente.
«En resumen» (3-5 viñetas con cifras y fechas)
H2 ¿A quién afecta?
H2 ¿Qué exige exactamente? (tabla si hay más de 3 requisitos)
H2 Plazos y sanciones (tabla)
H2 Cómo cumplir paso a paso (lista numerada)
H2 Cómo lo resuelve NormaPro (3-5 frases con enlaces a solución, pack y aplicación; sin adjetivos)
H2 Preguntas frecuentes (5-8, respuesta de 40-80 palabras cada una)
Fuentes (BOE, UNE, AEPD… con enlace)
Autor · cargo · fecha de publicación · última revisión
JSON-LD: Article + FAQPage + BreadcrumbList
```

---

## 5. Lo que NO hacer

- No crear ficheros `llms.txt` como sustituto de lo anterior: ningún motor confirma que lo use; Google dice explícitamente que no hace falta. Si se crea, que sea un índice de las 30 páginas clave y nada más (cuesta diez minutos; no cuenta como trabajo GEO).
- No generar cientos de páginas por sector × solución con plantilla: es exactamente lo que Google llama «scaled content abuse» desde marzo de 2024 y lo que hoy hace el sitemap.
- No escribir el propio «top 10 mejores software de compliance» con NormaPro en el número uno.
- No bloquear `GPTBot` por reflejo: no afecta a la búsqueda, pero sí a que los modelos futuros conozcan la marca. Decisión de Juanma; recomendación: permitir.
- No medir GEO por clics. Medir por impresiones en el informe de IA de Search Console, por citas en el panel mensual y por búsquedas de marca («normapro») en Search Console, que deben subir.
