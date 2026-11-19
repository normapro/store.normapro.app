# 01 · Investigación de mercado: cómo nos busca la gente

Fecha: 30/10/2026. Mercado: España, idioma español. Producto: NormaPro (plataforma de cumplimiento normativo y sistemas de gestión de Instituto de Innovación, Ciencia y Empresa, S.L.).

Este documento responde a tres preguntas: **con qué palabras busca un cliente lo que vende NormaPro**, **qué palabras usa NormaPro que nadie busca**, y **dónde hay hueco**. El mapa palabra → página está en `03-arquitectura-keyword-pagina.md`.

---

## 1. Método y fuentes

| Fuente | Qué aporta | Límite |
|---|---|---|
| **Autocompletado de Google España** (`hl=es`, `gl=es`), 30/10/2026. 225 semillas + expansión alfabética y por modificador de 28 términos clave (~1.400 consultas). Datos brutos en `datos/2026-10-30_autocompletado_semillas.json` y `datos/2026-10-30_autocompletado_expansion.json`; tabla plana en `datos/2026-10-30_keywords.csv` | Lo que la gente **teclea de verdad**, con el orden de popularidad que Google les da. Es la mejor señal gratuita de demanda real | No da volúmenes numéricos. Mezcla LATAM cuando el término es genérico |
| Búsquedas web sobre comparativas, directorios y competidores (30/10/2026) | Quién posiciona hoy y con qué vocabulario | Casi todas las comparativas están escritas por vendedores |
| Lectura de títulos y descripciones de 15 competidores | Cómo se nombran ellos mismos para Google | Una foto de un día |
| Normativa vigente (Ley 2/2023, UNE 19601:2025, ISO 37301, Ómnibus I / CSRD, NIS2, AIPI) | Qué obligación empuja cada búsqueda y cuándo | Las fechas de transposición cambian; verificar en BOE antes de publicar |
| Catálogo real de NormaPro: 12 ámbitos, 244 soluciones, 17 packs, 6 aplicaciones, 3 consultorías, 11 sectores | Qué podemos ofrecer de verdad para cada búsqueda | — |

**Sobre los volúmenes.** No hay acceso a Semrush ni Ahrefs desde aquí. Las cifras de este documento son **niveles estimados** (A: miles de búsquedas al mes en España; B: cientos; C: decenas; D: casi nadie) construidos con la presencia y el orden en autocompletado, la competencia en la SERP y la experiencia del sector. **Antes de invertir en contenido para un término de nivel A o B, validarlo en Google Keyword Planner** (gratis con una cuenta de Google Ads sin campaña activa, filtro España) y guardar el CSV en `datos/`. El plan de ejecución (`07`) incluye esa validación como primera tarea.

---

## 2. Los cinco modos en que un cliente llega a NormaPro

Esto es lo más importante del documento. La web actual está construida para el modo 4 y casi todo el tráfico está en los modos 1 y 2.

| Modo | Cómo busca | Ejemplo real de autocompletado | Qué quiere | Dónde está NormaPro hoy |
|---|---|---|---|---|
| **1. Por obligación o norma** | Nombra la ley o la norma, no el software | «canal de denuncias obligatorio empresas», «canal de denuncias empresas de menos de 50 trabajadores», «une 19601 2025», «iso 37301 que es y para que sirve», «doble materialidad csrd», «revisión por la dirección iso 9001 ejemplos», «procedimientos obligatorios iso 9001» | Saber si le afecta, qué le piden, qué pasa si no cumple, y después cómo hacerlo | **Ausente.** No hay contenido informativo. Es el canal que lleva al cliente de 50-300 empleados |
| **2. Por categoría de software** | «software» + norma o área | «software iso 9001», «software prl», «software gestión documental», «software canal de denuncias», «plataforma cae», «software bpm», «software control horario», «software gestión de riesgos» | Comparar 3-5 opciones y pedir demo | Fichas de solución bien hechas pero **las páginas de categoría (ámbito) están vacías** para Google |
| **3. Por proceso o problema** | Nombra la tarea | «gestión de no conformidades y acciones correctivas», «control de documentos iso 9001», «homologación de proveedores», «investigación de accidentes», «entrega de epis», «registro de jornada» | Una forma de hacerlo (plantilla, procedimiento, software) | Las 244 soluciones encajan aquí de forma natural. Hay que titularlas como la gente busca |
| **4. Por marca de competidor** | Nombra a otro | «isotools que es», «isotools alternativas» (sin sugerencias: poca gente), «plataforma cae metacontratas / dokify / ctaima / twins», «6conecta software prl», «pirani software de gestión de riesgos», «evisane control de plagas» | Comparar | Ausente. Oportunidad moderada: páginas «NormaPro frente a X» solo para 3-4 marcas |
| **5. Por marca propia** | «normapro», «normapro app», «normapro descargar», «normapro app login», «norma pro app» | Entrar en la aplicación | La home no tiene enlace visible y rastreable a la app (el botón «Entrar» existe). Riesgo: que el usuario acabe en un resultado erróneo («normoprost») |

**Conclusión operativa:** el contenido que falta no son más fichas de producto, es la **capa informativa sobre obligaciones** (modo 1) y las **páginas de categoría** (modo 2). Las fichas (modo 3) ya existen y solo hay que renombrarlas y enlazarlas.

---

## 3. Qué palabras usa NormaPro que nadie busca

Comprobado en autocompletado: estas expresiones no generan ninguna sugerencia o solo la literal. Son vocabulario interno. En títulos, H1, menú y descripciones hay que sustituirlas por la forma en que busca el cliente. Se pueden mantener en el cuerpo del texto como marca.

| Expresión de NormaPro | Cómo lo busca el cliente | Dónde aparece hoy |
|---|---|---|
| «Digitalización sin límites» | «software cumplimiento normativo», «software gestión ISO», «plataforma compliance» | Título y H1 de la home |
| «Compliance técnico» / «cumplimiento normativo técnico» | «requisitos legales medio ambiente», «cumplimiento legal PRL», «legislación aplicable empresa», «software requisitos legales» | Consultoría, aplicación |
| «Modelo avanzado NormaPro de gestión del cumplimiento…» | «software compliance penal», «sistema de gestión de compliance», «programa de compliance» | Nombres de 6 packs |
| «Mapa documental» / «plantilla mapa documental ISO 9001» | «documentación iso 9001», «documentación obligatoria iso 9001», «procedimientos iso 9001 ejemplos», «control de documentos iso 9001» | Varias soluciones |
| «Biblioteca de normas» / «identificación de requisitos normativos» | «identificación y evaluación de requisitos legales», «legislación aplicable», «requisitos legales iso 14001» | 10 soluciones (una por ámbito) |
| «Packs» | «software» / «plataforma» / «solución» | Menú, home |
| «Ámbitos» | «áreas», o directamente la norma («ISO 9001», «PRL») | Estructura de URL (mantener el slug, cambiar la etiqueta) |
| «Soluciones» (como listado de 244 módulos) | «funcionalidades», «módulos» | Menú |
| «Canal interno de comunicación» (nombre de la aplicación) | «canal de denuncias», «canal interno de información», «sistema interno de información» (los tres términos salen en autocompletado; el legal es «sistema interno de información») | Aplicación `/aplicaciones/canal-interno-comunicacion` |
| «Pragma», «claim», «level2»… | Nada: son nombres de campos; no deben salir nunca en la web | Editor (campos) |
| «Historias con clientes» | «casos de éxito», «clientes» | Menú y pie |
| «Diagnóstico gratuito» | «demo», «prueba gratis», «presupuesto» | Botón principal |

---

## 4. Mapa de demanda por ámbito de NormaPro

Niveles: **A** miles/mes, **B** cientos/mes, **C** decenas/mes, **D** residual. Intención: **I** informativa, **C** comercial (comparar), **T** transaccional (pedir demo o comprar), **N** navegacional. «Quién gana hoy» según las SERP y comparativas revisadas el 30/10/2026.

### 4.1 Compliance penal y canal de denuncias (la mayor demanda del catálogo)

| Palabra clave | Nivel | Intención | Quién gana hoy | Oportunidad |
|---|---|---|---|---|
| canal de denuncias | A | I/C | Despachos (Legalitas, Garrigues), AIPI, vendedores (EticAlert, Ithikios, Whistleblower Software, Cumpleo) | Alta con contenido de obligación + producto |
| canal de denuncias obligatorio / empresas obligadas / requisitos / 2025 | A | I | Despachos, blogs legales | **Muy alta**: pregunta directa, respuesta clara, lleva a demo |
| canal de denuncias empresas de menos de 50 trabajadores | B | I | Blogs legales | Alta: pregunta que nadie responde bien (no obligatorio, pero recomendable; grupos de empresas; sectores regulados) |
| software canal de denuncias / canal de denuncias software / gratis / precio | B | C/T | EticAlert (desde 9 €/mes), Ithikios, Cumpleo, Whistleblower Software, Factorial | Media: competir con precio visible o con «integrado en el compliance penal» |
| canal interno de información / sistema interno de información ley 2/2023 | B | I | Administraciones públicas, grandes empresas (sus propias políticas) | Alta: término legal exacto, poca competencia comercial |
| sanciones canal de denuncias / sanciones por no tener canal de denuncias | B | I | Blogs legales | Alta |
| responsable del sistema interno de información / AIPI comunicación 2026 | C | I | AIPI, despachos | Media (actualidad) |
| software compliance penal / software compliance | B | C | icloudCompliance («software compliance» es su título), Cumpleo, 4DLegal, ISOTools | Media |
| une 19601 / une 19601 2025 / pdf / aenor / sistema de gestión de compliance penal | B | I | UNE, AENOR, Legaltoday | Alta: NormaPro tiene un pack «Digitalización UNE 19601» y certificación AENOR del modelo |
| iso 37301 / que es y para que sirve / sistemas de gestión de compliance | B | I | UNE, consultoras | Alta |
| programa de compliance / plan de compliance penal / ejemplo / para empresas | B | I/C | Despachos | Alta |
| mapa de riesgos penales / modelo de prevención de delitos | B | I | Despachos (mucho LATAM) | Media |
| responsabilidad penal personas jurídicas españa | B | I | Despachos, universidades | Media (apoyo) |
| compliance officer / funciones / externalizar | B | I | Despachos | Baja-media (apoyo) |

### 4.2 Gestión de calidad ISO 9001 (demanda enorme, muy informativa)

| Palabra clave | Nivel | Intención | Quién gana hoy | Oportunidad |
|---|---|---|---|---|
| software iso 9001 / software gestion iso 9001 / software de calidad iso 9001 | A | C | ISOTools, ISOwin (59 €/mes), KMKey, SoftwareDoit, Capterra, icloudCompliance | Alta si la página de categoría existe de verdad |
| software iso 9001 gratis / software gestión calidad gratis | A | C (bajo valor) | Capterra, GetApp | Media: página «gratis frente a profesional» o plantillas gratuitas como imán |
| software gestión documental iso 9001 / control de documentos iso 9001 / software control de documentos | A | C/I | ISOTools, blogs | **Muy alta**: NormaPro tiene «Gestor documental» + 10 soluciones de gestión documental |
| software gestión de calidad / qms / sistema de gestión de calidad | A | C | ISOTools, KMKey, SoftwareDoit | Alta |
| gestión de no conformidades / acciones correctivas / procedimiento / software | A | I/C | Blogs de calidad, ISOTools | Alta: solución existente en 7 ámbitos |
| procedimientos iso 9001 ejemplos / documentación obligatoria iso 9001 / plantilla iso 9001 | A | I | Blogs, Nueva ISO 9001, ISOTools | Alta como imán de leads (plantillas descargables a cambio de email: ya existe el mecanismo de «informes») |
| revisión por la dirección iso 9001 ejemplos / informe | B | I | Blogs | Alta: solución «Informe anual para la dirección» |
| auditoría interna iso 9001 / software auditorías internas | B | I/C | Blogs, ISOTools | Alta |
| que es un sistema de gestión de calidad | A | I | Wikipedia, blogs | Baja (demasiado genérico) |
| satisfacción del cliente / indicadores de calidad / cuadro de mando calidad | B | I | Blogs | Media |
| homologación de proveedores / evaluación de proveedores software | B | I/C | Blogs, CAE | Alta: 3 soluciones |
| isotools alternativas | D | C | Capterra | Baja volumen, alta intención: una página comparativa honesta |

### 4.3 Prevención de riesgos laborales, ISO 45001 y CAE

| Palabra clave | Nivel | Intención | Quién gana hoy | Oportunidad |
|---|---|---|---|---|
| software prl / software gestión prl / precio / mejor | A | C | 6conecta, Prevengos, Prodity, Nextprevención, BlindaSoft, focoenobra | Alta |
| software iso 45001 | B | C | ISOTools, ISOwin | Alta (pack existente) |
| plataforma cae / coordinación de actividades empresariales software | A | C | Twind (ex e-coordina + CTAIMA), Nalanda, Dokify, Metacontratas, 6conecta, UCAE, DocuPRL | Media-alta: mercado maduro con precios públicos (desde 34-80 €/mes). NormaPro tiene pack CAE y «Portal de contratistas» |
| software de gestión de seguridad y salud en el trabajo | B | C | LATAM | Media |
| investigación de accidentes / inspecciones de seguridad / permisos de trabajo / entrega de epis | B | I | Blogs PRL, INSST | Alta como contenido de proceso |
| vigilancia de la salud / formación prl / app prl | B | I/C | Servicios de prevención | Media |

### 4.4 Medio ambiente, ISO 14001 y cumplimiento legal ambiental

| Palabra clave | Nivel | Intención | Quién gana hoy | Oportunidad |
|---|---|---|---|---|
| software iso 14001 / software gestión ambiental | B | C | ISOTools, Manglai, Quentic | Alta |
| requisitos legales medio ambiente / identificación y evaluación de requisitos legales iso 14001 | B | I/C | Ecoiuris (Aranzadi), EcoGestor (Eurofins), RELE HSE (Tandem) | **Alta**: es el núcleo histórico de NormaPro (Emacsa, residuos, vertidos, emisiones) |
| software gestión residuos / gestión del cumplimiento de residuos | B | C | Software de gestores de residuos (otro mercado) | Media: hay que distinguir «gestor de residuos» de «productor de residuos» |
| autorización ambiental integrada / vertidos / emisiones / ruidos | C | I | Administraciones | Media: una guía por obligación, enlazada a su solución |
| compliance ambiental | C | I | Despachos | Media |

### 4.5 Sostenibilidad y ESG

| Palabra clave | Nivel | Intención | Quién gana hoy | Oportunidad |
|---|---|---|---|---|
| software esg / esg reporting / software sostenibilidad | B | C | Manglai, APlanet, Dcycle, Workiva | Media: competidores muy financiados |
| csrd / doble materialidad / esrs / vsme | A | I | Consultoras, EFRAG, CNMV | Alta en 2026-2027 por el Ómnibus I: las pymes buscan «¿me afecta?» y «VSME». NormaPro tiene un informe («Guía práctica CSRD») que ya existe: actualizarlo |
| software huella de carbono / calculadora huella de carbono empresas | A | C/I | MITECO, Dcycle, Manglai | Media (solución «Automatización de huella de carbono») |

### 4.6 Seguridad de la información, ISO 27001, ENS, NIS2 y protección de datos

| Palabra clave | Nivel | Intención | Quién gana hoy | Oportunidad |
|---|---|---|---|---|
| software iso 27001 / isms software / grc software iso 27001 | B | C | Vanta, Drata, Formalize, ISOTools, icloudCompliance | Media (muy internacional) |
| ens vs iso 27001 | B | I | Blogs, INCIBE | **Alta**: NormaPro ya tiene el informe «ENS vs ISO 27001» |
| nis2 españa / transposición / empresas obligadas | A | I | Despachos, INCIBE | Alta mientras dure la transposición (2026-2027) |
| software rgpd / software protección de datos | B | C | Conversia, Signo, OneTrust | Baja-media (saturado por consultoras de LOPD) |
| registro de actividades de tratamiento / brechas de seguridad rgpd | B | I | AEPD | Media (apoyo) |

### 4.7 Instalaciones, equipos, sanitario y seguridad alimentaria (nichos sin «software» en la búsqueda)

Aquí casi nadie teclea «software». Se busca la obligación. Por tanto el contenido debe ser una guía de la obligación con la solución al final.

| Palabra clave | Nivel | Intención | Quién gana hoy | Oportunidad |
|---|---|---|---|---|
| inspección periódica equipos a presión / instalaciones eléctricas / contraincendios / APQ / instalaciones térmicas (RITE) | B | I | Organismos de control (Applus, Bureau Veritas, Eurofins), Junta de Andalucía | Alta: 15 soluciones de «gestión del cumplimiento en…» sin competencia de software |
| legionella normativa / rd 487/2022 / control legionella | B | I | Eurofins, laboratorios | Alta (2 soluciones) |
| software appcc / appcc gratis / iso 22000 / ifs brc | B | C/I | Consultoras alimentarias | Media (pack Seguridad alimentaria) |
| software control de plagas | B | C | Evisane | Baja (es software para empresas de plagas, no para el cliente) |
| software gestión clínicas dentales / registros de esterilización / control de temperaturas | B/C | C/I | Software de gestión de pacientes (otro mercado) | Media: nicho «cumplimiento normativo clínica dental» (sector de NormaPro) sin competencia |
| software gestión laboratorios / radiaciones ionizantes | C | C/I | LIMS | Baja |

### 4.8 Recursos humanos, portal del empleado, BPM, ticketing (mercados grandes y saturados)

| Palabra clave | Nivel | Intención | Quién gana hoy | Oportunidad |
|---|---|---|---|---|
| software control horario / precio / pymes / registro jornada | A | C | Factorial, Sesame, a3, Bizneo, Woffu | **Baja como objetivo principal**: imposible ganar a corto. Solo como funcionalidad dentro de «portal del empleado» |
| portal del empleado / software portal del empleado | A | N/C | Administraciones públicas (portal del empleado público), a3, Factorial | Media: término ya asociado al producto en la web antigua (`/portal-del-empleado/` indexada) |
| software bpm / bpm gratis / bizagi | A | C | Bizagi, AuraQuantic, Appian | Baja-media: posicionar «BPM para cumplimiento normativo», no «BPM» |
| software gestión de procesos / automatización de procesos | B | C | Ídem | Media |
| software ticketing / gestión de incidencias | A | C | Zendesk, Freshdesk, Jira | Baja: no es el negocio |
| software gestión de formación / plataforma lms para empresas | B | C | Moodle, LMS comerciales | Baja-media (FormaPro) |
| onboarding digital / evaluación del desempeño / clima laboral | B | I/C | RRHH SaaS | Baja |

### 4.9 Transversales y de marca

| Palabra clave | Nivel | Intención | Oportunidad |
|---|---|---|---|
| cumplimiento normativo / cumplimiento normativo empresarial / ejemplos / de una empresa | A | I | Alta como pilar: «qué es, obligaciones por área, cómo gestionarlo». Es el término paraguas de NormaPro |
| software cumplimiento normativo / plataforma de cumplimiento normativo | C | C | Media: poca demanda pero exacta; hoy no la gana nadie claro |
| software sistema de gestión integrado / software gestión integrada | B | C | Alta: encaja con el catálogo de 12 ámbitos |
| software gestión de riesgos empresariales | B | C | Media (Pirani manda) |
| digitalización pymes / kit digital gestión de procesos | A | I | Baja-media: solo si NormaPro es agente digitalizador (sin verificar) |
| normapro / normapro app / login / descargar | B | N | Obligatoria: asegurar que la home y un resultado «Acceso a la app» aparezcan primeros |
| instituto de innovación ciencia y empresa | C | N | Obligatoria: que el Instituto cargue (hoy 500) |

---

## 5. Lo que hemos aprendido de los competidores

Títulos reales de su home (30/10/2026). Todos usan la fórmula «[Categoría de software] + [norma] + [beneficio o precio]». Ninguno usa un eslogan.

| Competidor | Título de la home | Lección |
|---|---|---|
| ISOTools | Software con IA para Sistemas de Gestión | Categoría + «IA» como gancho de 2026 |
| KMKey | Software QMS multinorma \| QmKey | «multinorma» = lo mismo que los 12 ámbitos de NormaPro |
| ISOwin | El Software ISO 9001 por sólo 59 €/mes… | Precio en el título |
| icloudCompliance | software compliance (description: «canal ético, compliance penal, CSRD, ISO 27001 y NIS2 en un solo sistema») | Lista de normas en la description |
| Cumpleo | Auditoría y software de compliance (H1: «…desde 5 €/mes») | Precio y auditoría gratuita como gancho |
| EticAlert | Canal de Denuncias para Empresas (H1: «…que te protege de sanciones en solo 5 minutos») | Miedo a la sanción + rapidez |
| Twind | Software de Coordinación Actividades Empresariales | Categoría exacta en título y H1 |
| Whistleblower Software | Canal de Denuncias \| Mejor / 2025 | Palabra clave + año |
| Manglai | La plataforma ambiental impulsada por IA | Categoría + IA |
| SoftwareDoit | Software de Gestión de Calidad 2026: Compara los 7 Mejores | Los directorios ganan las búsquedas «mejor software X»: hay que estar listados |

Patrones de mercado:
- **Precio público** en canal de denuncias (9-199 €/mes), CAE (34-80 €/mes) e ISO (49-79 €/mes). NormaPro no publica precios. Para «software canal de denuncias» sin precio no se entra en la comparación del comprador. Decisión de negocio, no de SEO; se anota.
- **Rapidez de activación** («en 5 minutos», «en días, no en meses»). NormaPro ya dice «en un solo día» en el canal de denuncias y «en semanas» en gestor documental. Mantener.
- **Lista de normas en la description.** NormaPro cubre más normas que cualquiera de ellos (12 ámbitos). Es la ventaja a explotar en la home.
- **Directorios y comparativas** (SoftwareDoit, Capterra, GetApp, Appvizer, Comparasoft, BlindaSoft, ComparaSST) ocupan la mitad de los primeros resultados de «mejor software X» y son las fuentes que citan ChatGPT y Perplexity. NormaPro no está en ninguno.

---

## 6. Preguntas que hace la gente (base para FAQ, contenido y respuestas de IA)

Extraídas del autocompletado y de las SERP. Cada una debería tener una respuesta de 40-80 palabras en la página correspondiente (ver `05-geo-ia.md` §4).

**Canal de denuncias**
- ¿Es obligatorio el canal de denuncias para una empresa de menos de 50 trabajadores?
- ¿Qué empresas están obligadas por la Ley 2/2023?
- ¿Cuáles son las sanciones por no tener canal de denuncias?
- ¿Qué requisitos debe cumplir un canal de denuncias (anonimato, plazos de 7 días y 3 meses, responsable del sistema)?
- ¿Canal de denuncias, canal interno de información y sistema interno de información son lo mismo?
- ¿Se puede externalizar la gestión del canal? ¿Qué debe comunicar la empresa a la AIPI?
- ¿Cuánto cuesta un canal de denuncias?

**Compliance penal**
- ¿Qué es la UNE 19601 y qué cambia en la versión de 2025?
- ¿UNE 19601 o ISO 37301? ¿Cuál certificar?
- ¿Qué debe incluir un programa de compliance penal? ¿Un mapa de riesgos penales?
- ¿Puede una pyme tener compliance penal sin compliance officer interno?

**ISO 9001 / calidad**
- ¿Qué documentación es obligatoria en ISO 9001:2015?
- ¿Cómo se gestionan las no conformidades y acciones correctivas?
- ¿Qué debe incluir el informe de revisión por la dirección?
- ¿Se puede implantar ISO 9001 con un software gratuito?
- ¿Qué es un sistema de gestión integrado (calidad, medio ambiente, PRL)?

**PRL / CAE**
- ¿Qué es una plataforma CAE y cuándo es obligatoria la coordinación de actividades empresariales?
- ¿Qué documentación hay que pedir a una contrata?
- ¿Cómo se investiga un accidente de trabajo?

**Medio ambiente / instalaciones**
- ¿Cómo identificar los requisitos legales ambientales que aplican a mi empresa?
- ¿Cada cuánto hay que inspeccionar los equipos a presión, las instalaciones eléctricas de baja tensión, los sistemas contraincendios, las instalaciones térmicas?
- ¿Qué obliga el RD 487/2022 de legionella a una empresa?

**ESG / CSRD**
- ¿Me afecta la CSRD tras el Ómnibus I (más de 1.000 empleados y 450 M€)? ¿Qué es el estándar VSME para pymes?
- ¿Qué es la doble materialidad?

**Seguridad de la información**
- ¿ENS o ISO 27001?
- ¿Qué empresas obliga la NIS2 en España y cuándo?

---

## 7. Prioridades de palabras clave (resumen ejecutivo)

**Nivel 1: donde ganar en 6-12 meses** (demanda alta o media, producto existente, competencia media)
1. canal de denuncias (obligatorio, empresas, <50 trabajadores, sanciones, ley 2/2023, sistema interno de información)
2. software iso 9001 / software gestión de calidad / software gestión documental iso 9001 / control de documentos
3. gestión de no conformidades (procedimiento + software)
4. une 19601 / iso 37301 / programa de compliance penal
5. requisitos legales medio ambiente / iso 14001 (cumplimiento legal ambiental)
6. software prl / iso 45001 / plataforma cae
7. cumplimiento normativo (pilar)
8. normapro (marca)

**Nivel 2: construir en 12-24 meses**
9. inspecciones reglamentarias por tipo de instalación (equipos a presión, eléctricas, contraincendios, APQ, RITE, legionella)
10. csrd / vsme / doble materialidad / huella de carbono
11. ens vs iso 27001 / nis2 / software iso 27001
12. software sistema de gestión integrado
13. homologación de proveedores / portal de contratistas
14. cumplimiento normativo por sector (agroalimentario, agua, residuos, clínicas dentales, construcción, administración pública)

**Nivel 3: solo como apoyo, no como objetivo**
15. portal del empleado, control horario, bpm, ticketing, lms, rrhh (mercados dominados por SaaS generalistas; posicionar como «para cumplimiento normativo», no en abierto)
16. software rgpd / protección de datos (saturado por consultoras LOPD)
17. kit digital / digitalización pymes (solo si hay condición de agente digitalizador)

**Descartar como palabra objetivo**: «digitalización sin límites», «compliance técnico», «modelo avanzado», «mapa documental», «packs», «ámbitos».

---

## 8. Hallazgos de la expansión alfabética (1.400 consultas, 3.028 palabras únicas)

Fichero: `datos/2026-10-30_keywords.csv` (columna `posible_latam_o_ruido` marca 145 entradas de otros países o sin relación).

1. **La marca está contaminada.** «normapro» sugiere, además de «normapro app», «normapro app login», «normapro descargar», «normapro portal del empleado» y «normapro es», decenas de resultados de **Norma PRO de Athenasoft** (software de presupuestos de construcción en Polonia y Chequia: «norma pro cena», «norma pro download», «norma pro expert»), «normapro euromat», «normapro france», «normapro consulting» y «normapro doo». Para Google y para una IA, hoy NormaPro no es una entidad única. Acciones en `05` §3 frente 2. Y las búsquedas de acceso a la app («login», «descargar») exigen que la home muestre el enlace «Entrar» en HTML y que exista una página `/acceso` indexable que lleve a la app.
2. **«Compliance penal» es un término maduro y muy informativo**: «compliance penal es obligatorio», «qué es», «ejemplo», «empresas», «aenor», «ambiental», «modelo», «manual», «programa», «política», «novedades», «jurisprudencia», «curso», «máster», «abogado». Casi todo es modo 1 (obligación). Los dos proveedores de software que aparecen pegados al término son **GlobalSuite** y **Centinela**: son los competidores directos en la SERP de compliance penal, no ISOTools.
3. **«Cumplimiento normativo»** se expande por área («ambiental», «ciberseguridad», «ESG», «recursos humanos», «fiscal», «financiero») y por formato («ejemplos», «guía», «de una empresa», «y gestión de riesgos»). Confirma la estructura de 12 áreas y la guía pilar «qué es el cumplimiento normativo». Un competidor local aparece por nombre: **Audidat** (Albacete).
4. **«ISOTools»** se busca con «gestor documental», «precio», «opiniones», «demo», «iso 9001 / 14001 / 27001», «españa» y «login». Es el competidor de referencia en ISO y la gente compara precio y opiniones. Página «NormaPro frente a ISOTools» justificada.
5. **«Software gestión documental»** trae «precio», «cuánto cuesta», «mejor», «los 10 mejores», «ejemplos», «para empresas», «gratis» y la pregunta «qué es gestión documental CAE». Es la aplicación de NormaPro con más demanda transversal; su landing debe responder a precio y a «para qué sirve».
6. **«Software PRL»** nombra a **6conecta** y **Prevengos**, y pide «precio», «mejor» y «gratis». **«Software gestión de riesgos»** nombra a **Pirani**. **«Software control de plagas»** nombra a **Evisane**. Son los nombres contra los que hay que comparar en cada área.
7. **«Software ESG», «software CAE» y «software calidad»** son términos ambiguos en autocompletado (ESG en alemán e inglés; CAE como ingeniería asistida; calidad de imagen y vídeo). No usarlos solos en títulos: siempre «software ESG para empresas españolas», «plataforma CAE coordinación de actividades empresariales», «software de gestión de calidad ISO 9001».
8. **«Software ISO 9001»** en España se concreta en «control de documentos», «gestión documental», «gratis», «para implementar». La página de categoría de calidad debe tener una sección «ISO 9001 gratis frente a NormaPro» que responda a la objeción sin esconderla.
9. **«Software ISO 14001», «ISO 45001», «seguridad alimentaria», «no conformidades», «cumplimiento normativo»** apenas tienen expansión: demanda baja pero sin competencia fuerte. Son victorias rápidas con una sola página bien hecha cada una.
10. **No aparece ninguna sugerencia con «Jaén», «Andalucía» ni «Granada»** para ningún término de software. El SEO local no es un canal de captación para NormaPro; solo sirve para la marca y la ficha de Google (`06` §8).
