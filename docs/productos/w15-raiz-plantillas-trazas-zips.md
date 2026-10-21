# W15 · Raíz del repo: plantillas, trazas, Storybook y zips

Repo: `store.normapro.app`. Ficha revisada contra el código el 21/10/2026. Rutas relativas a la raíz del repo (`store.normapro.app/`).

Alcance de la lectura: de esta ficha solo se han abierto `package.json`, `README.md`, `.gitignore` y la lista de claves de primer nivel de `plantillas/bpm.json`. De `plantillas/*`, `dataparallax-1.json` y `samplecontenidoapplicacion.json` solo se comprueban existencia, tamaño y si alguien los importa. No se han abierto `trace.*`, `debug-storybook.log`, `src.zip`, `.npmrc` ni `storybook-static/`. `package-lock.json` solo se mide.

## 1. Qué hace

- Reúne los ficheros de la raíz que no son código de `src/`: manifiesto de dependencias, README, 13 plantillas JSON de ejemplo, dos JSON de ejemplo, restos de una traza, un registro de Storybook, un build de Storybook y una copia comprimida de `src/`.
- Ninguno de estos ficheros participa en el funcionamiento de la aplicación, salvo `package.json` (dependencias y scripts) y `.npmrc` (instalación; no abierto).

## 2. Dónde está

24 elementos, según `FICHAS-DEFINITIVAS.md` §3.1 (11 de la raíz + 13 de `plantillas/`). Más `storybook-static/`, que esa ficha cita aparte. «Versionado» es el resultado de `git ls-files`. «Quién lo importa» es la búsqueda de su nombre en `src/`, `package.json`, `tsconfig.json`, `next.config.ts`, `eslint.config.mjs`, `postcss.config.mjs`, `tailwind.config.ts`, `README.md` y `.gitignore` (sin coincidencias), y de `plantillas`, `dataparallax` y `samplecontenido` en `src/` del editor y `app/` y `scripts/` de la API (sin coincidencias).

### 2.1 Ficheros de la raíz (11)

| Fichero | Tamaño (bytes) | Versionado | Quién lo importa o lo usa |
|---|---|---|---|
| `package.json` | 1.347 | Sí | `npm` (scripts y dependencias). Ver §3 |
| `package-lock.json` | 119.886 | Sí (también aparece en `.gitignore:42`) | `npm` |
| `.npmrc` | 175 | Sí | `npm`. No abierto |
| `README.md` | 1.508 | Sí | Nadie |
| `dataparallax-1.json` | 5.063 | Sí | Nadie |
| `samplecontenidoapplicacion.json` | 7.845 | Sí | Nadie |
| `trace.js` | 0 | Sí | Nadie |
| `trace.ts` | 77 | Sí | Nadie |
| `trace.txt` | 455.421 | Sí | Nadie |
| `debug-storybook.log` | 3.285 | Sí | Nadie |
| `src.zip` | 64.501 | Sí | Nadie |

Fecha del último commit que toca el fichero: `trace.txt` 02/05/2025; `src.zip` 10/04/2025.

### 2.2 `plantillas/` (13 ficheros JSON, todos versionados)

| Fichero | Tamaño (bytes) |
|---|---|
| `plantillas/automatizacionprocesosnegocio.json` | 35.468 |
| `plantillas/bpm.json` | 36.535 |
| `plantillas/canalinternocomunicacion.json` | 39.400 |
| `plantillas/compliancepenal.json` | 94.210 |
| `plantillas/cumplimientonormativotecnico.json` | 67.191 |
| `plantillas/formapro.json` | 31.209 |
| `plantillas/gestordocumental.json` | 26.909 |
| `plantillas/historiabosch.json` | 5.946 |
| `plantillas/historiacalidadpascual.json` | 5.334 |
| `plantillas/historiaemacsa.json` | 5.138 |
| `plantillas/historiasdemo.json` | 173 |
| `plantillas/portalempleado.json` | 22.279 |
| `plantillas/ticketing.json` | 29.837 |

Nadie las importa ni las lee (búsqueda de `plantillas` en los tres repos, sin coincidencias). Último cambio versionado: 08/04/2026.

### 2.3 `storybook-static/`

- 344 ficheros, 87.698 KB en disco, todos versionados (`git ls-files storybook-static`): 54 en la raíz de la carpeta y 290 en subcarpetas. Tipos: 230 `png`, 53 `svg`, 29 `js`, 10 `json`, 8 `woff2`, 4 `webp`, 3 `jpg`, 3 `html` (entre ellos `index.html` e `iframe.html`).
- Es el resultado de un `storybook build`. Nadie lo importa. Último cambio versionado: 15/05/2026.
- No hay Storybook en el proyecto: no existe `.storybook/`, no hay ficheros `*.stories.*` en `src/` y `package.json` no tiene ninguna dependencia ni script de Storybook (búsqueda de «storybook» en `package.json`, sin coincidencias).

## 3. Flujo

- Scripts de `package.json:6-9`: `dev` = `next dev --turbopack`, `build` = `next build`, `start` = `next start`, `lint` = `next lint`.
- `lint` usa `next lint`, orden que Next 16 ya no incluye. Confirma la parte de scripts de ST-WEB-01 en `docs/ERRORES-DETECTADOS.md`; no se ha ejecutado.
- Versiones principales (`package.json`): `next ^16.2.0` (`:25`), `react ^19.2.4` (`:27`), `next-seo ^6.6.0` (`:26`), `framer-motion ^12.4.7` (`:23`), `lottie-react ^2.4.1` (`:24`), `tailwindcss ^4` (`:40`), `typescript ^5` (`:41`).
- Iconos: `@fortawesome/free-*` (`:14-16`) y `@fortawesome/pro-*` (`:17-20`), más un paquete de kit de la misma marca (`:12`). Los `pro-*` se importan en `src/` (por ejemplo `app/sites/instituto/contacto/page.tsx:4`, `components/landings/DescargaInformeSection.tsx:5`). Cómo se resuelven en la instalación: no localizado (`.npmrc` no abierto).
- `README.md`: plantilla de `create-next-app`. Habla de `app/page.tsx` (`:19`) y de la fuente Geist (`:21`). El proyecto no tiene `app/page.tsx` (las páginas están en `src/app/sites/`) y usa Mulish (`src/app/sites/normapro/layout.tsx:5,14-18`). La última línea es el nombre del repo (`:37`).
- Plantillas y ejemplos: no entran en ningún flujo. Ningún código los carga. `docs/CONTRATOS.md` §2.4 los cita como ejemplos de bloques de landing.

## 4. Endpoints que consume

Ninguno. Ningún fichero de esta ficha llama a la API.

## 5. Datos

### Formato de las plantillas

- `plantillas/bpm.json` es una lista de 18 elementos. Las claves de primer nivel del primer elemento son `id`, `tipo` y `data`. Es la forma `{id, tipo, data}` de los bloques del motor de landings (ficha W4; `docs/CONTRATOS.md` §2.4).
- El resto de plantillas no se han abierto. No se sabe si todas usan solo los 42 tipos válidos (ver §9).
- Nombres de fichero: 9 llevan nombre de producto o de consultoría (`automatizacionprocesosnegocio`, `bpm`, `canalinternocomunicacion`, `compliancepenal`, `cumplimientonormativotecnico`, `formapro`, `gestordocumental`, `portalempleado`, `ticketing`) y 4 llevan nombre de historia (`historiabosch`, `historiacalidadpascual`, `historiaemacsa`, `historiasdemo`). Qué contiene cada uno: no comprobado.

### Ejemplos sueltos

- `dataparallax-1.json` (5.063 bytes) y `samplecontenidoapplicacion.json` (7.845 bytes): contenido no abierto. No comprobado qué contienen.

## 6. Reglas de negocio y permisos

- Sin reglas de negocio ni permisos.
- Los `.json`, `.zip`, `trace.*`, el log y `storybook-static/` no forman parte del build de la aplicación (ningún `import`).
- `package-lock.json` está en `.gitignore` (`:42`) y a la vez versionado: el ignorado no tiene efecto sobre un fichero ya versionado.
- Seguridad: regla de diseño que hoy no se cumple; detalle en el informe restringido.

## 7. Zonas de riesgo

- `src.zip` (64 KB, último commit que lo toca: 10/04/2025) no se ha abierto. Una búsqueda por texto sobre el repo no entra en un `.zip`. No debe tomarse como fuente del código actual.
- `trace.txt` (455 KB), `debug-storybook.log` y `storybook-static/` (344 ficheros, 85 MB) están versionados y no se usan. Aumentan el tamaño del repo y de cada clon.
- Las plantillas (13 ficheros) no tienen quien las use. Si el formato de un bloque cambia (ficha W4), las plantillas no se actualizan solas.
- Un cambio en `package.json` o `package-lock.json` altera lo que se instala en todos los entornos.
- `lint` apunta a una orden que Next 16 no incluye (`package.json:9`).
- Seguridad: regla de diseño que hoy no se cumple; detalle en el informe restringido.

## 8. Cómo probarlo

1. Comprobar existencia y tamaño: `ls -l` en la raíz y en `plantillas/`; deben coincidir con §2.
2. Comprobar el versionado: `git ls-files storybook-static | wc -l` da 344, `git ls-files plantillas | wc -l` da 13 y `git ls-files trace.txt trace.js trace.ts src.zip debug-storybook.log .npmrc` lista los 6.
3. Comprobar que nadie los importa: buscar `plantillas`, `dataparallax`, `samplecontenido` en `src/` (sin resultados).
4. Scripts: `npm run build` debe terminar sin fallar por errores de tipos ni de lint, porque `next.config.ts:13-18` los ignora (ST-WEB-06). `npm run lint` debe dar error en Next 16 (no ejecutado).
5. Para usar una plantilla como contenido de prueba: copiar el JSON al campo `contenidos` de una aplicación o consultoría desde el editor (ficha E6/E7). Nada lo hace de forma automática. No comprobado.

## 9. Dudas / no localizado

- Quién generó `trace.js`, `trace.ts` y `trace.txt` y para qué: no localizado (no abiertos; `trace.js` pesa 0 bytes y `trace.ts` 77 bytes).
- Si `storybook-static/` y `debug-storybook.log` pueden retirarse del repo: no localizado. No hay configuración ni historias de Storybook.
- Qué contiene `src.zip` y de qué fecha es el código: no localizado (no abierto).
- Origen de `dataparallax-1.json` y `samplecontenidoapplicacion.json`: no localizado.
- Quién usó las plantillas y cómo (carga manual en la base): no localizado. Ningún código de los tres repos las referencia.
- Si todas las plantillas usan solo los 42 tipos de `LandingBuilder.tsx:47-90`: no comprobado (solo se abrió una lista de claves de un fichero).
- Si las plantillas están al día con las props actuales de cada componente: no comprobado.
- Si `.npmrc` debe estar versionado: no localizado. No se ha abierto.
- Si `package-lock.json` debe estar versionado a pesar de `.gitignore:42`: no localizado.
- Número de versión de Next que instala hoy el lock: no comprobado (no se abrió `package-lock.json`). `docs/MAPA.md` §3 dice 16.2.4.
