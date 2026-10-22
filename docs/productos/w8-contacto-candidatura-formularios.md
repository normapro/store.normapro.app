# W8 · Contacto, candidatura y formularios

Repo: `store.normapro.app`. Ficha revisada contra el código el 21/10/2026. Rutas de fichero relativas a `src/`. Prefijos: `P = app/sites/normapro/`, `I = app/sites/instituto/`, `S = /v1/store`, `A = api-store.normapro.app/app/`.

Corrección a `docs/FICHAS-DEFINITIVAS.md` §6 y `docs/MAPA.md` §3.4 (confirmada en el código): `ContactoFormSection` y `CandidaturaFormSection` no envían datos. La newsletter no está aquí: está en `Footer.tsx` y `FooterInstituto.tsx` (ficha W11 y W13). Solo `Formulario` llama a la API.

## 1. Qué hace

- `Formulario`: ventana modal «Reserva una sesión estratégica con nosotros». Envía un lead a la API (`POST S/leads`). La abren botones de 35 sitios distintos: 10 componentes, 6 páginas y 19 tipos de bloque (ver §2).
- `ContactoFormSection`: formulario «Contáctanos» de 4 campos (nombre, correo, asunto, mensaje), en dos formatos (`default` e `instituto`). **No envía nada**: borra los campos y muestra «enviado».
- `CandidaturaFormSection`: formulario de candidatura con CV adjunto, en `/trabaja`. **No envía nada**: borra los campos y muestra «enviada».
- `trabaja/page.tsx`: página «Trabaja en NormaPRO» (ofertas, ventajas, proceso y el formulario de candidatura).
- `instituto/contacto/page.tsx`: página «Contacto» de Instituto (formulario, datos de contacto y 3 mapas de oficinas).

## 2. Dónde está

| Pieza | Fichero | Líneas | Tipo |
|---|---|---|---|
| Modal de contacto con envío | `components/Formulario.tsx` | 318 | Cliente (`:1`) |
| Formulario de contacto simulado | `components/ContactoFormSection.tsx` | 143 | Cliente (`:1`) |
| Formulario de candidatura simulado | `components/CandidaturaFormSection.tsx` | 255 | Cliente (`:1`) |
| Página `/trabaja` | `P trabaja/page.tsx` | 168 | Servidor (sin `'use client'`) |
| Página Instituto `/contacto` | `I contacto/page.tsx` | 85 | Servidor (sin `'use client'`) |

Quién renderiza cada formulario (búsqueda de `<Componente` en `src/`):

| Componente | Dónde se renderiza |
|---|---|
| `ContactoFormSection` (default) | `P nosotros/page.tsx:159`; `P partners/page.tsx:106` |
| `ContactoFormSection variant="instituto"` | `I contacto/page.tsx:36` |
| `CandidaturaFormSection` | `P trabaja/page.tsx:163` |
| `Formulario` | Ver tabla siguiente |

`Formulario` se renderiza en:
- Componentes sueltos: `ChatManager.tsx:71` (con `zIndexClass="z-[120]"`, abierto desde el chat), `Footer.tsx:224` (abre `:133`), `historiaTextSection2.tsx:72`, `MainConsultoriaSection.tsx:101`, `MainHeroCarousel.tsx:108`, `SolutionsHero.tsx:92`, `SolutionsHeroSector.tsx:79`, `menu/Navbar.tsx:337` (abre `:304`), `menu/NavbarInstituto.tsx:155` (abre `:143`), `MainSolucionesSection.tsx:108` (componente sin import en otro fichero).
- Páginas: `P historias/page.tsx:30`, `P soluciones/[ambito]/page.tsx:40`, `P soluciones/[ambito]/[slugSolucion]/page.tsx:314`, `P soluciones/[ambito]/packs/[slugPack]/page.tsx:250`, `P soluciones/[ambito]/sector/[sector]/page.tsx:40`, `P soluciones/[ambito]/sector/[sector]/[slugSolucion]/page.tsx:280`.
- Bloques de landing: 19 tipos (ficha W4, tabla §2.1).
- `FooterInstituto.tsx:299` lo renderiza si `openModal` es verdadero, pero ningún código pone `openModal` en verdadero (solo `setOpenModal(false)`; `:11,299`). En Instituto no se abre desde el pie.

`trabaja/page.tsx` importa `HistoriaTextSection` (`:2`), `ContactoFormSection` (`:4`), `PartnersProgramsSection` (`:5`), `PartnersTestimonialsSection` (`:6`), `TextSection` (`:7`) y `FaqSection` (`:8`) y no los renderiza. La función exportada se llama `NosotrosPage` (`:12`).

Enlaces de entrada a `/trabaja`: `Footer.tsx:131`, `P nosotros/page.tsx:152`, `FooterInstituto.tsx:205` (URL absoluta con `?ref=instituto`).

## 3. Flujo

### 3.1 `Formulario` (con envío)

`components/Formulario.tsx` (cliente):
1. Props: `onClose` y `zIndexClass` opcional (`:5-8`). Por defecto `z-50` (`:110`).
2. Estado del formulario con 11 campos (`:10-22`, valores iniciales `:25-37`).
3. Al enviar (`handleSubmit` `:53-106`):
   - Si `acepta_politica` es falso: mensaje «Debes aceptar la política de privacidad.» y no envía (`:57-60`).
   - Calcula `origen_ruta` = ruta + parámetros de la URL actual (`:64`).
   - `fetch POST API_ENDPOINTS.LEADS` con JSON `{...form, origen_ruta}` (`:65-71`).
   - Respuesta no OK: toma `error` del cuerpo si es texto; si no, «No se pudo enviar el formulario» (`:73-79`). Se muestra en `submitMessage` (`:98-102`, `:289-291`).
   - Respuesta OK: pone «Formulario enviado correctamente.», vacía el formulario y llama a `onClose()` (`:82-96`). El padre desmonta el modal; el mensaje de éxito no llega a verse.
4. Cerrar: clic fuera (`:111`), botón ✕ (`:128-135`) y botón «Cerrar» solo en móvil (`:303-311`).

Servidor: `POST /v1/store/leads` → `LeadRateLimitMiddleware.verify` (`A middlewares/leadRateLimit.ts:81-118`) → `StoreController.createLead` (`A controllers/storeController.ts:62-110`) → facade y model (`docs/MAPA.md` §1.3: `storeFacade.ts:24`, `storeModel.ts:100`, tabla `leads`; no abiertos por este lote; detalle en la ficha A6).

### 3.2 `ContactoFormSection` (simulado)

`components/ContactoFormSection.tsx`:
1. Prop `variant`: `'default'` o `'instituto'` (`:19-23`). Cambia clases (`:41-47`) y el diseño: Instituto `:49-87`, default `:89-140`.
2. `handleSubmit` (`:28-39`): si algún campo está vacío tras `trim`, no hace nada (`:31-36`); si no, vacía el formulario y pone `isSent` en verdadero (`:37-38`).
3. No hay `fetch` en el fichero. El único `import` es de React (`:3`).
4. Mensajes: «Envío realizado correctamente.» (`:82`) y «El envío se ha realizado correctamente.» (`:133`).
5. Cualquier cambio en un campo quita el mensaje (`setIsSent(false)`, p. ej. `:56`).

### 3.3 `CandidaturaFormSection` (simulado)

`components/CandidaturaFormSection.tsx`:
1. Campos (`:7-15`): nombre completo, dirección, correo, puesto, teléfono, años de experiencia, mensaje. El CV es un `input type="file"` oculto con `accept=".pdf,.doc,.docx"` (`:208-215`), que se abre con el botón «Adjuntar CV» (`:223-230`).
2. `handleSubmit` (`:33-56`): exige los 7 campos con texto y un CV (`:37-47`). Si se cumple, el comentario del código dice «Simula envio local sin backend.» (`:49`), vacía el formulario y el CV y pone `isSent` (`:50-55`).
3. El fichero del CV solo se guarda en el estado (`:217-218`). Nadie lo lee ni lo sube.
4. Mensaje final: «La candidatura se ha enviado correctamente.» (`:244`).
5. Lista de puestos fija en el código (`:138-145`).

### 3.4 Páginas

- `P trabaja/page.tsx`: texto escrito en el código. `HistoriaTextSection2` (`:15`), `AccordionSection` con 2 ofertas (`:23-94`), tres `ListHistoriaSection` (`:96-161`) y `CandidaturaFormSection` (`:163`). No llama a la API.
- `I contacto/page.tsx`: `HeaderSection` (`:30`, ficha W11), `ContactoFormSection variant="instituto"` (`:36`), correo y teléfono de contacto escritos en el código (`:44-53`) y un bucle sobre 3 oficinas (Jaén, Sevilla, Murcia; `:6-25`) que pinta un `iframe` de mapa (`:62-81`). No llama a la API.

### 3.5 Caché y revalidación

Sin caché de datos: los dos formularios simulados no llaman a la API y `Formulario` hace `POST` desde el navegador. Las dos páginas son estáticas por contenido.

## 4. Endpoints que consume

| Verbo | Ruta | Fichero:línea |
|---|---|---|
| POST | `S/leads` | `components/Formulario.tsx:65` |
| - | Ninguno | `components/ContactoFormSection.tsx`, `components/CandidaturaFormSection.tsx` (sin `fetch`) |

Otros emisores de `POST S/leads` (fichas ajenas): `Footer.tsx:28`, `FooterInstituto.tsx:28` (newsletter, solo correo; W11 y W13) y `landings/DescargaInformeModal.tsx:115` (W4). La URL sale de `config/api.ts:30` (`LEADS`).

## 5. Datos

### Cuerpo que envía `Formulario`

| Campo | Origen en el formulario | Línea |
|---|---|---|
| `nombre` | texto, `required` | `:148-154` |
| `apellidos` | texto, `required` | `:162-168` |
| `empresa` | texto | `:176-182` |
| `cargo` | texto | `:189-195` |
| `pais` | texto | `:202-208` |
| `n_empleados` | lista: `1-49 Empleados`, `50-499 Empleados`, `500-1499 Empleados`, `1500+` | `:214-225` |
| `telefono` | texto | `:232-238` |
| `email` | `type="email"`, `required` | `:245-252` |
| `acepta_marketing` | casilla | `:258-266` |
| `acepta_contacto` | casilla | `:268-276` |
| `acepta_politica` | casilla; sin ella no envía | `:278-286`, `:57-60` |
| `origen_ruta` | calculado de la URL | `:64` |

Contrato de la API (de `A controllers/storeController.ts:11-61` y `:62-110`): obligatorios `email` y `origen_ruta` (`:71-76`, respuesta 400); si faltan `nombre` y `apellidos`, la API lo trata como newsletter y guarda `Newsletter` y `Suscripcion` (`:79-93`; con respuesta 409 si el correo ya está). `Formulario` exige nombre y apellidos en el navegador, así que nunca entra por la vía de newsletter.

Límite de envíos: 5 por ventana de 30 minutos, contado por IP y por correo; el envío número 6 recibe 429 con texto en `error` (`A middlewares/leadRateLimit.ts:9-11,73-76,93-96`). `Formulario` muestra ese texto (`:75-79`). Los contadores están en memoria del proceso (`:13`).

Tipos: `Formulario.tsx` declara `FormState` (`:10-22`) y `FormularioProps` (`:5-8`). La store no tiene tipo de lead en `types/`. La API tiene `app/types/lead.ts` (ficha A6; copias en `docs/CONTRATOS.md`).

### Datos de los formularios simulados

- `ContactoFormSection`: `ContactFormData` = `name`, `email`, `subject`, `message` (`:5-10`).
- `CandidaturaFormSection`: `CandidaturaFormData` = `fullName`, `address`, `email`, `position`, `phone`, `experienceYears`, `message` (`:7-15`) y `cvFile: File | null` (`:29`).
- Puestos del selector (`:141-144`): desarrollador senior fullstack, consultor NormaPro, DevOps, desarrollador junior.

## 6. Reglas de negocio y permisos

- Sin autenticación en todo el lote.
- `Formulario`: nombre, apellidos y correo obligatorios (atributo `required`); política de privacidad obligatoria por código (`:57-60`); el resto es opcional. Las casillas de marketing y de contacto son opcionales.
- Textos de consentimiento fijos en el código, escritos como «NormaPro» (`:265,275,285`), también cuando se abre desde Instituto (`NavbarInstituto.tsx:155`).
- `ContactoFormSection`: los 4 campos son obligatorios y se valida que no estén vacíos (`:31-36`). No valida el formato del correo más allá de `type="email"`.
- `CandidaturaFormSection`: los 7 campos y el CV son obligatorios (`:37-47`). Años de experiencia: número, mínimo 0 (`:174-175`).
- Los datos de `ContactoFormSection` y `CandidaturaFormSection` no se guardan en ningún sitio.
- Seguridad: regla de diseño que hoy no se cumple; detalle en el informe restringido.

## 7. Zonas de riesgo

- Dos formularios dicen «enviado» y no envían. Un visitante cree que contactó o que se postuló y no queda rastro. Es la zona de mayor impacto de esta ficha.
- `Formulario` es el único punto de captura de leads con datos de contacto: lo usan 35 sitios (10 componentes, 6 páginas y 19 tipos de bloque de landing). Un cambio de campos afecta a la API (`createLead`) y a la tabla `leads`.
- `DescargaInformeModal` (W4) y `Footer` (W11) envían a la misma ruta con otros campos y otros valores de `n_empleados`; un cambio en la API afecta a los tres.
- El mensaje de éxito de `Formulario` no se ve porque el modal se cierra en la misma acción (`:82-96`).
- Textos de `Formulario` con «NormaPro» en el sitio Instituto (`:121-126,265,275`).
- La lista de puestos de `CandidaturaFormSection` está escrita en dos sitios: el selector (`:141-144`) y el acordeón de `trabaja/page.tsx` (`:23-93`). Hay que mantenerlos a mano.
- Mapas y datos de contacto de Instituto escritos en el código (`I contacto/page.tsx:6-25,44-53`).
- Seguridad: regla de diseño que hoy no se cumple; detalle en el informe restringido.

## 8. Cómo probarlo

1. Arrancar API y store (`docs/ENTORNO.md`; `npm run dev`).
2. Modal: en la home pulsar «Contacto» del pie (`Footer.tsx:133-135`). Rellenar con datos de prueba y enviar. Pestaña Red: `POST /v1/store/leads` con 201. Comprobar que el modal se cierra y que no aparece mensaje de éxito.
3. Enviar sin marcar la política: debe salir «Debes aceptar la política de privacidad.» sin llamada de red.
4. Enviar 6 veces con el mismo correo en menos de 30 minutos: la sexta debe devolver 429 y el texto del límite.
5. API apagada: el modal debe mostrar un mensaje de error (texto de red del navegador o «No se pudo enviar. Inténtalo de nuevo en unos minutos.»; `:98-102`).
6. `/nosotros` y `/partners`: rellenar «Contáctanos», enviar. Debe salir «El envío se ha realizado correctamente.» y la pestaña Red no debe mostrar ninguna llamada a la API.
7. `/trabaja`: rellenar la candidatura con un PDF y enviar. Debe salir el mensaje de éxito y la pestaña Red no debe mostrar ninguna llamada.
8. Instituto (`docs/MAPA.md` §3.2) `/contacto`: formulario en formato `instituto`, mismos resultados que el punto 6. Comprobar que los 3 mapas cargan.

## 9. Dudas / no localizado

- Corrección a `docs/MAPA.md` §3.4: lista `ContactoFormSection` en `/trabaja`. No se renderiza ahí (solo se importa, `P trabaja/page.tsx:4`); en `/trabaja` va `CandidaturaFormSection` (`:163`). `ContactoFormSection` se renderiza en `/nosotros`, `/partners` y Instituto `/contacto`.
- Destino previsto de «Contáctanos» y de las candidaturas: no localizado ningún endpoint de contacto ni de candidatura en la API (`docs/MAPA.md` §1.3 solo lista `POST /v1/store/leads` para formularios). Falta decidir si se envían a `leads`, a correo o a otra ruta.
- Quién lee la tabla `leads` y dónde se ve un lead: no localizado (el editor no tiene módulo de leads, `docs/GLOSARIO.md` §2).
- Uso de `?consultoria={id}` (duda abierta en la ficha W5): `Formulario.tsx` no lee ese parámetro. El id solo viaja dentro de `origen_ruta`, que incluye los parámetros de la URL (`:64`). No localizado ningún código de la API que lo separe.
- Texto de la etiqueta del campo apellidos: «Introduce tus apellidos» con marcador «Nombre» (`Formulario.tsx:159,164`). No localizado si es intencionado.
- Valores de `n_empleados` distintos entre `Formulario` (`:221-224`) y `DescargaInformeModal` (`:280-283`, W4). No localizado si la API o el comercial los esperan en un formato.
- Los mapas de `I contacto/page.tsx` (`:11,17,23`): dos de ellos llevan identificadores `0x0:0x0`. No verificado en ejecución que señalen la dirección escrita.
- Qué puesto de «DevOps» y «Desarrollador Junior» (`CandidaturaFormSection.tsx:143-144`) corresponde a una oferta publicada: el acordeón (`P trabaja/page.tsx:23-93`) solo tiene dos ofertas.
- Si `P trabaja/page.tsx` debe renderizar los componentes que importa y no usa (`:2,4-8`): no localizado.
- Enlace de política de privacidad dentro de `Formulario.tsx:285`: URL absoluta de producción. No localizado si debe depender del entorno.

## Correcciones de la revisión contra el código (21/10/2026)

### Afirmaciones incorrectas
- Ninguna afirmación incorrecta.

### Cifras o líneas a unificar
- `accept` del CV en `CandidaturaFormSection.tsx:213` (la ficha cita 208-215). El CV se guarda en estado en :215-218.
- Puestos del selector: `:141-144` (cuatro opciones). Ofertas del acordeón de `/trabaja` en :27 y :52.
- `verify` de `leadRateLimit.ts` empieza en la línea 82.
- `MainSolucionesSection` no se importa en ningún fichero; `FooterInstituto.tsx:299` renderiza `Formulario` pero nadie pone `openModal` a `true`.

### Errores funcionales de esta ficha
- ST-WEB-03: contacto y candidatura dicen «enviado» y no envían ([detalle](../../../docs/ERRORES-DETECTADOS.md)).
- ST-WEB-35: candidatura, el CV oculto con `required` bloquea el envío sin aviso ([detalle](../../../docs/ERRORES-DETECTADOS.md)).
- ST-WEB-36: envío sin mensaje con campos en blanco ([detalle](../../../docs/ERRORES-DETECTADOS.md)).
- ST-WEB-38: «Contratar ahora» no identifica la consultoría; `Formulario` no lee `?consultoria=` ([detalle](../../../docs/ERRORES-DETECTADOS.md)).

### Afirmaciones no verificables
- Quién lee la tabla `leads` y el destino previsto de contacto y candidaturas, `docs/MAPA.md` §3.4 y los pasos 2-8 de `## 8`.

- Hay reglas de diseño que hoy no se cumplen; detalle en el informe restringido.

## Actualización tras el PR del 21/10/2026

Código comparado: `main` `8dc6ec9` frente a `origin/main` `0817fe9` (PR #19). Estado de los ids en [ACT-store.md](../../../docs/revision/ACT-store.md). No probado en ejecución. `P = app/sites/normapro/`, `I = app/sites/instituto/`.

### Citas rotas
- `components/MainSolucionesSection.tsx` (§9, correcciones: «no se importa en ningún fichero»): borrado.

### Citas desplazadas
| Antes | Ahora |
|---|---|
| `Formulario.tsx:5-8`, `:10-22`, `:25-37` | `:6-9`, `:11-23`, `:26-38` |
| `Formulario.tsx:53-106` (`handleSubmit`) | `:55-108` |
| `Formulario.tsx:57-60`, `:64`, `:65-71`, `:73-79`, `:82-96`, `:98-102` | `:59-62`, `:66`, `:67-73`, `:75-81`, `:84-98`, `:100-104` |
| `Formulario.tsx:110-111`, `:128-135`, `:150`, `:159`, `:164`, `:221-224` | `:112-113`, `:130-137`, `:153`, `:162`, `:167`, `:224-227` |
| `Formulario.tsx:285` (enlace de privacidad), `:289-291`, `:299`, `:303-311`, `:318` | `:288`, `:292-294`, `:302`, `:306-314`, `:321` |
| `Footer.tsx:28` (newsletter), `:131` (enlace `/trabaja`), `:133-135` (botón contacto), `:224` (render de `Formulario`) | `:30`, `:135`, `:137-139`, `:228` |
| `FooterInstituto.tsx:28`, `:205`, `:11,299` (`openModal`, render), `:308` | `:30`, `:209`, `:12,303`, `:312` |
| `landings/DescargaInformeModal.tsx:115` | `:117` |
| `P trabaja/page.tsx:2`, `:4-8` (imports), `:12` (función), `:15`, `:23-94`, `:96-161`, `:163` | imports de `:3-6`; función `TrabajaPage` `:10`; `:13`; `:21-92`; `:94-159`; `:161` |
| `P partners/page.tsx:106` (`ContactoFormSection`) | `:108` |
| `I contacto/page.tsx:6-25`, `:30`, `:36`, `:44-53`, `:62-81` | `:10-29`, `:34`, `:40`, `:48-57`, `:66-85` |
| `ContactoFormSection.tsx`, `CandidaturaFormSection.tsx` | sin cambios (mismas líneas) |

### Afirmaciones obsoletas
- «`trabaja/page.tsx` importa `HistoriaTextSection` (`:2`), `ContactoFormSection` (`:4`), `PartnersProgramsSection` (`:5`), `PartnersTestimonialsSection` (`:6`), `TextSection` (`:7`) y `FaqSection` (`:8`) y no los renderiza. La función se llama `NosotrosPage`» (§2, §9): esos imports ya no existen; la función es `TrabajaPage` (`:10`). La página importa solo `ListHistoriaSection`, `HistoriaTextSection2`, `AccordionSection` y `CandidaturaFormSection`.
- «`Formulario` envía `{...form, origen_ruta}`» (§3.1, §4): ahora `{ ...form, origen_ruta, website }` (`Formulario.tsx:72`). `website` es el campo trampa de `HoneypotField` (`:144`). La API lo descarta sin guardar si llega con texto (`api … storeController.ts:72-74`, árbol actual de la API).
- «La newsletter envía solo el correo» (corrección de la cabecera): envía también `website` (`Footer.tsx:38`, `FooterInstituto.tsx:38`) y sigue con `acepta_marketing: true` (`Footer.tsx:37`, ST-WEB-13).
- «El modal de descarga de informe envía…» (W4): añade `website` (`DescargaInformeModal.tsx:135`). `acepta_marketing` sigue `false`.
- «Solo `Formulario` llama a la API» (cabecera): también las tres emisiones de la nota de §4 (pie, pie de Instituto, descarga). Sin cambio de fondo.
- «`ContactoFormSection` y `CandidaturaFormSection` no envían» (cabecera): sigue (ST-WEB-03 VIGENTE).
- Otros formularios: `/trabaja` y `/contacto` de Instituto no reciben honeypot porque no envían nada.
- «Las dos páginas son estáticas por contenido» (§3.4, `I contacto/page.tsx`): la de Instituto añade `metadata` (`contacto/page.tsx:8`); la de `/trabaja` también (`trabaja/page.tsx:8`).

### Nuevo
| Pieza | Fichero |
|---|---|
| Campo trampa `website` | `components/shared/HoneypotField.tsx:10-24`; montado en `Formulario.tsx:144`, `Footer.tsx:77`, `FooterInstituto.tsx:80`, `DescargaInformeModal.tsx:213` |
| Metadatos de `/trabaja` | `P trabaja/page.tsx:8` (título y descripción del hero) |
| Metadatos de `/contacto` de Instituto | `I contacto/page.tsx:8` |

### Errores de esta ficha
VIGENTES: ST-WEB-03 (`ContactoFormSection.tsx:28-39`; `CandidaturaFormSection.tsx:33-56`), ST-WEB-35 (`CandidaturaFormSection.tsx:208-215`), ST-WEB-36 (`ContactoFormSection.tsx:36`; `CandidaturaFormSection.tsx:47`; `Formulario.tsx:162,167`), ST-WEB-38 (`Formulario.tsx:66`), ST-WEB-13 (`Footer.tsx:37`). La etiqueta «Introduce tus apellidos» con marcador «Nombre» sigue (`Formulario.tsx:162,167`). Corregida una errata de `/trabaja`: «revolución empresarials» (`trabaja/page.tsx:14`).

### Seguridad
El PR añade un control anti-bot en los formularios que envían (campo trampa) sin cambiar el consentimiento ni la validación de formato en la store. Estado de SEG-WEB-06 (VIGENTE) y SEG-WEB-16 (CAMBIADO) en [ACT-store.md](../../../docs/revision/ACT-store.md) §7. El honeypot no ve su efecto en la store: depende de la API desplegada.
