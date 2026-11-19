# 03 · Arquitectura SEO: de cada palabra clave a una página

Fecha: 30/10/2026. Define qué página responde a qué búsqueda, qué título y description lleva, y qué contenido mínimo necesita. Los textos de título y description están **listos para pegar** en el editor (campos `titleweb`, `textoweb`, `descriptionweb`) o en el código (`pageMetadata`).

Regla de oro: **una búsqueda, una URL**. Si dos URL responden a lo mismo, una canoniza a la otra o se elimina.

---

## 1. Estructura de URL (qué se mantiene y qué cambia)

| Nivel | Patrón actual | Decisión | Por qué |
|---|---|---|---|
| Home | `/` | Mantener | — |
| Categoría (ámbito) | `/soluciones/{ambito}` | **Mantener la URL, convertirla en página de categoría real** (texto propio, listado en servidor, packs del ámbito, FAQ) | Es la página que debe posicionar «software ISO 9001», «software compliance penal», «software PRL» |
| Ficha de solución | `/soluciones/{ambito}/{solucion}` | Mantener. Es el canónico único de cada solución | 244 páginas ya bien construidas |
| Pack | `/soluciones/{ambito}/packs/{pack}` | Mantener | 17 páginas bien construidas |
| Sector | `/soluciones/all/sector/{sector}` | **Mantener solo las 11 portadas de sector**, convertidas en landing sectorial con texto propio | «software cumplimiento normativo agroalimentario», «clínica dental» |
| Ámbito × sector | `/soluciones/{ambito}/sector/{sector}` (132) | **`noindex` y fuera del sitemap** hasta que tengan texto propio. Mantener navegables | Hoy son 132 copias de «Sector» |
| Solución × sector | `/soluciones/{ambito}/sector/{sector}/{solucion}` (2.684) | **Fuera del sitemap y canónico a la ficha de solución.** Si la API no las resuelve, 301 a la ficha | 86 % del sitemap apuntando a la home |
| Aplicación | `/aplicaciones/{slug}` | Mantener | 6 landings largas, ya indexadas con la web antigua |
| Consultoría | `/consultorias/{slug}` | Mantener | — |
| Casos de éxito | `/historias/{slug}` | Mantener | Renombrar etiqueta en menú a «Casos de éxito» |
| Noticias e informes | `/actualidad/{slug}`, `/informes/{slug}` | Mantener | Pintar en servidor |
| **Nuevo: guías de obligaciones** | `/guias/{tema}` (propuesta) o dentro de `/actualidad` con categoría «Guías» | **Crear.** Es la capa informativa que falta (modo 1 de búsqueda) | Sin esto no se entra en «canal de denuncias obligatorio», «une 19601», «requisitos legales medio ambiente» |
| `/todas-las-soluciones` | duplicado de `/soluciones` | 301 a `/soluciones` | Duplicado |
| `/formacion` | no existe | Crear página mínima o quitar del menú y del pie | Enlace roto en menú y pie |
| Instituto | `www.institutodeinnovacion.es` | Arreglar el 500 antes que nada | Canónico declarado del segundo sitio |

Sobre crear `/guias/`: exige una ruta nueva en la store (receta 15 de `RECETAS-DE-CAMBIO.md` para páginas corporativas, o reutilizar «Actualidad» con una categoría y plantilla propia). La opción barata es **Actualidad con categoría «Guía»** porque el editor, la API y la tabla ya existen y el campo `content` admite texto largo con Quill (`02-actualidad-informes.md` §3 del catálogo). La opción buena es una ruta `/guias/` con plantilla propia (índice lateral, FAQ, CTA a la solución). Recomendación: empezar en Actualidad y migrar con 301 cuando haya 10 guías.

---

## 2. Home

| Elemento | Hoy | Propuesta (lista para pegar) |
|---|---|---|
| `<title>` | Digitalización sin límites \| NormaPro | **Software de cumplimiento normativo y sistemas de gestión ISO \| NormaPro** (62 caracteres) |
| Description | Navegamos contigo hacia una evolución tecnológica accesible, segura y sin barreras. | **Plataforma para gestionar el cumplimiento normativo de tu empresa: ISO 9001, 14001, 45001, 27001, compliance penal UNE 19601, canal de denuncias, PRL, ESG. Más de 30 años. Pide una demo.** (158) |
| H1 | Digitalización sin límites | **Todo el cumplimiento normativo de tu empresa en una sola plataforma** |
| Subtítulo | Navegamos contigo… | Calidad, medio ambiente, PRL, compliance penal, canal de denuncias, protección de datos, ESG e instalaciones. Del Instituto de Innovación, Ciencia y Empresa. Más de 30 años acompañando a empresas como Bosch, Calidad Pascual o Emacsa. |
| Bloque nuevo, en servidor | — | **«Cumplimiento por área»**: 12 tarjetas (una por ámbito) con enlace a `/soluciones/{ambito}` y una frase de 15 palabras cada una. Es el enlace interno que hoy no existe en HTML |
| Bloque nuevo | — | «Obligaciones que te afectan en 2026»: 4-6 enlaces a guías (canal de denuncias, UNE 19601:2025, Ómnibus/CSRD, NIS2, legionella, inspecciones) |
| Botón principal | Solicita un diagnóstico gratuito | Mantener texto, pero que sea `<a href="/contacto">` o `/demo` rastreable además del modal |
| Logos de clientes | 95 enlaces a `localhost` | Sin enlace o enlace al caso de éxito |

---

## 3. Páginas de categoría (ámbito): título, description, H1 y contenido mínimo

Campos: título → `titleweb` no existe en ámbito; hoy el título sale de `description` (nombre). **Hace falta añadir `titleweb` y usar `textoweb` como meta description** (receta técnica en `04`). Mientras tanto se puede fijar en código con un mapa por slug.

Contenido mínimo de cada página de categoría, en servidor: H1, 150-250 palabras de introducción (qué norma u obligación, para quién, qué resuelve NormaPro), listado de soluciones del ámbito con una línea cada una, packs del ámbito, 1 caso de éxito, 4-6 FAQ, CTA. Objetivo: 600-900 palabras con los nombres de las soluciones.

| Slug | `<title>` | Meta description | H1 |
|---|---|---|---|
| gestion-de-calidad | Software ISO 9001: gestión de la calidad digitalizada \| NormaPro | Software de gestión de calidad ISO 9001: control documental, no conformidades, auditorías internas, indicadores, proveedores y revisión por la dirección en una plataforma. Demo gratuita. | Software de gestión de calidad ISO 9001 |
| medio-ambiente | Software ISO 14001 y cumplimiento legal ambiental \| NormaPro | Identifica tus requisitos legales ambientales (residuos, vertidos, emisiones, ruido, autorizaciones) y gestiona ISO 14001 con evidencias, alertas y auditorías. Más de 30 años en cumplimiento ambiental. | Software de gestión ambiental y cumplimiento legal ISO 14001 |
| prevencion-de-riesgos-laborales | Software PRL e ISO 45001: seguridad y salud digitalizada \| NormaPro | Software de prevención de riesgos laborales: formación, EPI, inspecciones, investigación de accidentes, CAE y contratistas, vigilancia de la salud e ISO 45001. Pide una demo. | Software de PRL e ISO 45001 |
| instalaciones-y-equipos | Cumplimiento legal de instalaciones y equipos: inspecciones reglamentarias \| NormaPro | Controla las inspecciones periódicas obligatorias de equipos a presión, instalaciones eléctricas, contraincendios, APQ, RITE, frigoríficas y legionella con alertas y evidencias. | Software para el cumplimiento legal de instalaciones y equipos |
| seguridad-alimentaria | Software de seguridad alimentaria: APPCC, ISO 22000, IFS y BRC \| NormaPro | Digitaliza el APPCC, el control de proveedores, los registros y las auditorías de seguridad alimentaria (ISO 22000, IFS, BRCGS, SANDACH) con trazabilidad completa. | Software de seguridad alimentaria y APPCC |
| sanitario | Cumplimiento normativo en centros sanitarios y clínicas \| NormaPro | Registros de esterilización, temperaturas, legionella, plagas, equipos y radiaciones en clínicas dentales, centros sanitarios y laboratorios, listos para inspección. | Software de cumplimiento normativo sanitario |
| compliance-penal | Software de compliance penal UNE 19601 y canal de denuncias \| NormaPro | Sistema de gestión de compliance penal según UNE 19601:2025 e ISO 37301: mapa de riesgos penales, controles, canal de denuncias Ley 2/2023, formación e informe anual. Modelo certificado. | Software de compliance penal y canal de denuncias |
| sostenibilidad-esg | Software ESG y reporte de sostenibilidad: CSRD, VSME, huella de carbono \| NormaPro | Gestiona datos ESG, doble materialidad, huella de carbono e informes de sostenibilidad (CSRD, ESRS, VSME) con trazabilidad para auditoría. | Software de sostenibilidad y reporte ESG |
| recursos-humanos | Portal del empleado y gestión documental de RRHH \| NormaPro | Portal del empleado con firma de nóminas y documentos, control horario, ausencias, formación, EPI y expedientes, integrado con el cumplimiento normativo de la empresa. | Portal del empleado y digitalización de RRHH |
| relacion-con-clientes-proveedores-y-colaboradores | Homologación de proveedores, CAE y gestión de reclamaciones \| NormaPro | Homologa y evalúa proveedores, coordina contratistas (CAE), gestiona quejas y reclamaciones y comparte documentación con clientes y colaboradores. | Software de gestión de proveedores, contratistas y clientes |
| proteccion-de-datos | Software de cumplimiento RGPD y LOPDGDD \| NormaPro | Gestiona derechos de los interesados, brechas de seguridad, riesgos, formación y evidencias de protección de datos para auditorías. | Software de cumplimiento en protección de datos |
| seguridad-de-la-informacion | Software ISO 27001 y ENS: seguridad de la información \| NormaPro | Análisis de riesgos, controles, incidencias, activos, continuidad de negocio e información documentada para ISO 27001, ENS y NIS2. | Software ISO 27001, ENS y NIS2 |

El slug `relacion-con-clientes-proveedores-y-colaboradores` es largo pero cambiarlo rompe URL indexadas; se mantiene.

---

## 4. Fichas de solución (244): regla de títulos

Las fichas ya tienen `titleweb`. Hoy sigue el patrón «{Solución} {Ámbito} | NormaPro» («Canal de denuncias Compliance Penal | NormaPro»). Falta la **palabra de categoría** que usa el cliente. Patrón propuesto, aplicable por lotes en el editor:

`{Nombre de la solución como lo busca el cliente} | {Norma o ámbito} | NormaPro`

| Solución (nombre interno) | `titleweb` propuesto | Búsqueda que ataca |
|---|---|---|
| Compliance Penal · Canal de denuncias | Canal de denuncias para empresas conforme a la Ley 2/2023 \| NormaPro | canal de denuncias empresas, software canal de denuncias |
| Compliance Penal · Análisis y gestión de riesgos penales | Mapa de riesgos penales y gestión del riesgo penal \| Compliance UNE 19601 | mapa de riesgos penales |
| Compliance Penal · Automatización de procesos de norma UNE 19601 | Software UNE 19601: digitaliza tu sistema de compliance penal \| NormaPro | une 19601 |
| Gestión de Calidad · Gestión de no conformidades | Software de no conformidades y acciones correctivas ISO 9001 \| NormaPro | gestión de no conformidades, software no conformidades |
| Gestión de Calidad · Gestión documental y trazabilidad para auditorías | Software de gestión documental ISO 9001: control de documentos y registros \| NormaPro | software gestión documental iso 9001, control de documentos |
| Gestión de Calidad · Plantilla Mapa Documental ISO 9001 | Documentación obligatoria ISO 9001:2015: mapa documental listo para usar \| NormaPro | documentación iso 9001, procedimientos iso 9001 |
| Gestión de Calidad · Informe anual para la dirección | Revisión por la dirección ISO 9001: informe automático \| NormaPro | revisión por la dirección iso 9001 |
| Gestión de Calidad · Auditorías y certificaciones ISO 9001 | Software de auditorías internas ISO 9001 \| NormaPro | software auditorías internas |
| Gestión de Calidad · Homologación y gestión del cumplimiento de proveedores | Homologación y evaluación de proveedores ISO 9001 \| NormaPro | homologación de proveedores |
| Medio ambiente · Identificación de requisitos normativos (Biblioteca de normas) | Identificación y evaluación de requisitos legales ambientales ISO 14001 \| NormaPro | requisitos legales medio ambiente |
| Medio ambiente · Gestión del cumplimiento de Residuos | Cumplimiento normativo de residuos para productores: registros, contratos y plazos \| NormaPro | gestión de residuos normativa empresa |
| PRL · Portal de contratistas y subcontratas | Plataforma CAE: coordinación de actividades empresariales y portal de contratistas \| NormaPro | plataforma cae |
| PRL · Investigación de accidentes | Investigación de accidentes de trabajo: software y procedimiento \| NormaPro | investigación de accidentes |
| PRL · Entrega de EPI | Registro y entrega de EPI con firma digital \| NormaPro | entrega de epis registro |
| Instalaciones y equipos · Gestión del cumplimiento en equipos a presión | Inspecciones periódicas de equipos a presión: control y alertas \| NormaPro | inspección periódica equipos a presión |
| Instalaciones y equipos · Gestión del cumplimiento por riesgos de Legionela | Control de legionella según RD 487/2022: registros e inspecciones \| NormaPro | legionella normativa empresas |
| ESG · Automatización de huella de carbono | Software de huella de carbono y emisiones GEI para empresas \| NormaPro | software huella de carbono |
| ESG · Evaluación de materialidad automatizada | Doble materialidad CSRD: evaluación automatizada \| NormaPro | doble materialidad |
| Seguridad de la información · Análisis y gestión de riesgos ISO 27001 | Análisis de riesgos ISO 27001 y ENS \| NormaPro | software iso 27001 |
| Sanitario · Registros de esterilización | Registro de esterilización en clínicas dentales y centros sanitarios \| NormaPro | registros de esterilización clínica dental |
| RRHH · Gestión de presencia y control horario | Control horario y registro de jornada dentro del portal del empleado \| NormaPro | software control horario (apoyo) |

Las 223 restantes siguen la misma regla. Se hace en el editor, módulo «Soluciones-Ámbitos», campo «Título web». La description sale de `subtitle` (ya real); comprobar que ninguna supere 160 caracteres ni empiece por «Centraliza» en 30 fichas (plantilla repetida).

Ojo con las **soluciones repetidas entre ámbitos** («Gestión de no conformidades» existe en 7 ámbitos, «Identificación de requisitos normativos» en 10, «Administración de roles» en 9). Cada una debe tener un `titleweb` y un `subtitle` distintos con la norma del ámbito, o Google elegirá una y descartará las demás. Hoy el contenido de estas réplicas es casi idéntico (sin verificar en todas): hay que diferenciarlas al menos en título, H1, primer párrafo y FAQ.

---

## 5. Packs (17)

Ya tienen título propio. Ajustes:

| Pack | Título hoy | Título propuesto |
|---|---|---|
| normapro-gestion-de-calidad-iso-9001 | (sin verificar) | Pack ISO 9001: digitaliza tu sistema de gestión de calidad \| NormaPro |
| digitalizacion-une-19601 | Digitalización UNE 19601 \| Compliance penal eficaz | Mantener (bien) |
| modelo-avanzado-normapro-de-gestion-del-compliance-penal | Modelo avanzado… | Sistema de compliance penal completo: UNE 19601, canal de denuncias y controles \| NormaPro |
| normapro-coordinacion-de-actividades-empresariales-cae | — | Plataforma CAE NormaPro: coordinación de actividades empresariales \| NormaPro |
| modelo-avanzado-normapro-de-gest (slug truncado, ámbito sanitario) | — | Corregir el slug en el editor (`modelo-avanzado-normapro-de-gestion-del-cumplimiento-sanitario`) y redirigir el antiguo |
| Resto de «Modelo avanzado NormaPro de…» | — | Sustituir «Modelo avanzado NormaPro de gestión del cumplimiento normativo en X» por «Software de cumplimiento normativo en X: modelo avanzado NormaPro» |

---

## 6. Aplicaciones (6) y consultorías (3)

| URL | Título hoy | Título propuesto | Description propuesta |
|---|---|---|---|
| /aplicaciones/canal-interno-comunicacion | (sin verificar) | Canal de denuncias y sistema interno de información Ley 2/2023 \| NormaPro | Activa en un día un canal de denuncias anónimo y confidencial conforme a la Ley 2/2023, con gestión de plazos, responsable del sistema y registro para la AIPI. |
| /aplicaciones/gestor-documental | — | Gestor documental para cumplimiento normativo e ISO \| NormaPro | Centraliza evidencias, versiones, firmas y plazos de calidad, medio ambiente, PRL y compliance en un gestor documental con biblioteca de normas. |
| /aplicaciones/bpm-suite | BPM Suite \| NormaPro | Software BPM para automatizar procesos de cumplimiento \| NormaPro | Diseña y automatiza flujos de trabajo (no conformidades, permisos, solicitudes, auditorías) sin programar, con trazabilidad y firma. |
| /aplicaciones/portal-del-empleado | — | Portal del empleado: nóminas, control horario, documentos y canal interno \| NormaPro | — |
| /aplicaciones/ticketing | — | Software de ticketing y gestión de incidencias internas \| NormaPro | — |
| /aplicaciones/formapro | — | FormaPro: plataforma de formación (LMS) para empresas \| NormaPro | — |
| /consultorias/compliance-penal | — | Implantación de compliance penal UNE 19601 en 6 etapas \| NormaPro | — |
| /consultorias/cumplimiento-normativo | Programa avanzado de Cumplimiento normativo Técnico | Consultoría de cumplimiento legal en medio ambiente, seguridad industrial y PRL \| NormaPro | — |
| /consultorias/automatizacion-procesos | — | Consultoría de digitalización y automatización de procesos (BPM) \| NormaPro | — |

En estas landings de bloques hay que arreglar la jerarquía: **un solo H1** (el del hero), el resto H2/H3. Ver `04` §6.

---

## 7. Sectores (11 portadas)

Hoy: H1 «Sector», texto «Lorem ipsum». Rellenar en el editor (`titleweb`, `descriptionweb`, `textoweb`, `backgroundImage`) y pintar `textoweb` en servidor.

| Sector | `titleweb` | `descriptionweb` |
|---|---|---|
| agroalimentario | Software de cumplimiento normativo para la industria agroalimentaria | APPCC, ISO 22000, IFS/BRCGS, SANDACH, calidad, medio ambiente y PRL en una plataforma para empresas agroalimentarias. |
| clinicas-dentales | Cumplimiento normativo para clínicas dentales | Registros de esterilización, radiaciones, legionella, residuos sanitarios, protección de datos y PRL para clínicas dentales, listos para inspección. |
| gestion-del-agua | Cumplimiento normativo para empresas de gestión del agua | Requisitos legales ambientales, vertidos, instalaciones, PRL y compliance para empresas de abastecimiento y saneamiento. Caso: Emacsa. |
| construccion | Software PRL, CAE y calidad para construcción | Coordinación de contratistas, documentación de obra, permisos de trabajo, EPI, ISO 9001/14001/45001. |
| cuidado-de-personas | Cumplimiento normativo en residencias y empresas de cuidados | Compliance penal, canal de denuncias, protección de datos, PRL y sanitario para residencias y atención a personas. |
| industria | Cumplimiento legal industrial: instalaciones, PRL, medio ambiente | Inspecciones reglamentarias, requisitos legales, ISO 9001/14001/45001 y compliance para plantas industriales. Caso: Bosch. |
| gestion-de-residuos | Cumplimiento normativo para gestores de residuos | Autorizaciones, registros, trazabilidad, PRL e ISO 14001 para gestores y productores de residuos. |
| tecnologia-y-telecomunicaciones | ISO 27001, ENS y NIS2 para empresas tecnológicas | Seguridad de la información, protección de datos, compliance penal y calidad para tecnológicas y telecos. |
| mineria | Cumplimiento normativo para minería y canteras | PRL, instalaciones, medio ambiente y compliance para explotaciones mineras. |
| sector-financiero | Compliance, canal de denuncias y protección de datos para entidades financieras | Compliance penal, prevención de blanqueo, canal de denuncias, RGPD e ISO 27001. |
| administracion-publica | Canal de denuncias, ENS y cumplimiento para administraciones públicas | Sistema interno de información Ley 2/2023, ENS, protección de datos y gestión documental para ayuntamientos y entidades públicas. |

Los slugs reales están en la base de datos (`storeSectores.slug`, con la errata «Admistración Pública» en el nombre: corregir el nombre, no el slug si ya está indexado).

---

## 8. Guías de obligaciones (contenido nuevo, nivel 1)

Diez guías para el primer semestre. Cada una: 1.200-2.000 palabras, estructura fija (¿a quién afecta? → ¿qué exige? → plazos y sanciones → cómo cumplir paso a paso → cómo lo resuelve NormaPro → FAQ de 6 preguntas → CTA a la solución y al pack). Autor con nombre y cargo (Instituto, 30 años). Fecha de actualización visible.

| # | Título (H1) | URL propuesta | Palabra clave principal | Enlaza a |
|---|---|---|---|---|
| 1 | Canal de denuncias obligatorio en 2026: qué empresas, requisitos y sanciones (Ley 2/2023) | /guias/canal-de-denuncias-obligatorio | canal de denuncias obligatorio | aplicación canal interno, solución canal de denuncias, pack compliance penal |
| 2 | ¿Es obligatorio el canal de denuncias en empresas de menos de 50 trabajadores? | /guias/canal-de-denuncias-menos-de-50-trabajadores | canal de denuncias empresas de menos de 50 trabajadores | ídem |
| 3 | UNE 19601:2025: qué cambia y cómo adaptar tu sistema de compliance penal | /guias/une-19601-2025 | une 19601 2025 | pack digitalización UNE 19601 |
| 4 | UNE 19601 o ISO 37301: cuál certificar y en qué se diferencian | /guias/une-19601-vs-iso-37301 | iso 37301 | ídem |
| 5 | Documentación obligatoria ISO 9001:2015: lista completa y cómo gestionarla | /guias/documentacion-obligatoria-iso-9001 | documentación iso 9001 | gestor documental, mapa documental ISO 9001 |
| 6 | No conformidades y acciones correctivas ISO 9001: procedimiento paso a paso | /guias/no-conformidades-acciones-correctivas | gestión de no conformidades | solución no conformidades |
| 7 | Requisitos legales ambientales de tu empresa: cómo identificarlos y evaluarlos (ISO 14001) | /guias/requisitos-legales-ambientales | requisitos legales medio ambiente | solución identificación de requisitos (medio ambiente), consultoría |
| 8 | Inspecciones reglamentarias obligatorias en instalaciones industriales: calendario 2026 | /guias/inspecciones-reglamentarias-instalaciones | inspecciones periódicas instalaciones industriales | ámbito instalaciones y equipos (15 soluciones) |
| 9 | CSRD tras el Ómnibus I: qué pymes deben reportar y qué es el estándar VSME | /guias/csrd-omnibus-vsme-pymes | csrd pymes, vsme | ámbito ESG, informe existente |
| 10 | Plataforma CAE: cuándo es obligatoria la coordinación de actividades empresariales y qué documentación pedir | /guias/plataforma-cae-coordinacion-actividades-empresariales | plataforma cae | pack CAE, portal de contratistas |

Segunda tanda (meses 7-12): NIS2 en España, ENS vs ISO 27001 (actualizar el informe), legionella RD 487/2022, revisión por la dirección ISO 9001, homologación de proveedores, investigación de accidentes, cumplimiento normativo clínica dental, compliance penal para pymes sin compliance officer, qué es el cumplimiento normativo (pilar), sistema de gestión integrado.

---

## 9. Enlazado interno (lo que hoy no existe en HTML)

Hoy las fichas de solución solo se alcanzan desde el desplegable del menú (JavaScript) y desde «Otras soluciones» dentro de otra ficha. Para Google, las 244 fichas están casi huérfanas.

Reglas:
1. Home → 12 ámbitos (bloque en servidor) → cada ámbito lista sus soluciones y packs en servidor.
2. Cada ficha de solución → su ámbito (miga), su pack, 3 soluciones hermanas y 1 guía.
3. Cada guía → 2-4 soluciones, 1 pack, 1 aplicación.
4. Cada caso de éxito → las soluciones que usa el cliente y su sector.
5. Pie: añadir «Guías» y sustituir «Formación» por una ruta real.
6. Menú: que los enlaces del desplegable existan también como `<a href>` en HTML (hoy se cargan con `fetch`).

---

## 10. Datos estructurados por tipo de página

| Página | Tipos JSON-LD |
|---|---|
| Todas | `Organization` completa (ver `04` §7) y `WebSite` con `SearchAction` |
| Home | `Organization`, `WebSite`, `ItemList` de los 12 ámbitos |
| Ámbito | `BreadcrumbList`, `ItemList` de soluciones, `FAQPage` (para IA), `Service` o `SoftwareApplication` del ámbito |
| Solución | `BreadcrumbList`, `SoftwareApplication` (`applicationCategory: BusinessApplication`, `operatingSystem: Web`, `offers` sin precio o con «Contactar»), `FAQPage` |
| Pack | `BreadcrumbList`, `Product` o `SoftwareApplication`, `FAQPage` |
| Aplicación | `BreadcrumbList`, `SoftwareApplication`, `VideoObject` si hay vídeo |
| Guía | `Article` (autor `Person` + `Organization`, `datePublished`, `dateModified`), `FAQPage`, `BreadcrumbList` |
| Caso de éxito | `Article`, mención de la organización cliente |
| Noticia | `NewsArticle` |
| Informe | `Report` o `Article` + `DigitalDocument` |
| Instituto | `Organization` (matriz) con `subOrganization` NormaPro; `LocalBusiness` solo si se confirma sede y GBP |

Nota: desde el 7/5/2026 `FAQPage` no produce resultados enriquecidos en Google. Se mantiene porque los motores de IA lo leen y porque no cuesta nada: el código ya lo genera.
