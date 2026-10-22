# W1 · Multisitio, middleware y configuración

Repo: `store.normapro.app`. Rutas de fichero relativas a la raíz del repo. Revisada contra el código el 21/10/2026. Sin valores de configuración: solo nombres de opciones.

## 1. Qué hace

Decide qué sitio sirve cada petición (NormaPRO o Instituto), monta el layout de cada sitio y fija la configuración de Next, Tailwind, ESLint, PostCSS y TypeScript.

Son dos sitios en un solo proyecto Next. Cada sitio vive en una carpeta de `src/app/sites/`. El middleware reescribe la ruta según el host.

## 2. Dónde está

| Pieza | Fichero | Líneas |
|---|---|---|
| Elección de sitio por host | `src/middleware.ts` | 3-36 |
| Matcher del middleware | `src/middleware.ts` | 38-40 |
| Layout NormaPRO | `src/app/sites/normapro/layout.tsx` | 25-49 |
| Layout Instituto | `src/app/sites/instituto/layout.tsx` | 24-39 |
| Proveedor de SEO por defecto | `src/app/providers.tsx` | 8-21 |
| Contexto del sitio de origen | `src/context/SiteContext.tsx` | 5-29 |
| Opciones de Next | `next.config.ts` | 3-21 |
| Estilos globales | `src/app/globals.css` | 1-79 |
| Tailwind (config JS) | `tailwind.config.ts` | 3-19 |
| PostCSS | `postcss.config.mjs` | 1-4 |
| ESLint | `eslint.config.mjs` | 8-14 |
| TypeScript (alias `@/*`) | `tsconfig.json` | 25-29 |
| Tipos de Next generados | `next-env.d.ts` | 1-3 |

No existe `src/app/layout.tsx` (listado de `src/app`: `globals.css`, `providers.tsx`, `sites/`). Cada layout de sitio define su propio `<html>` y `<body>` (`normapro/layout.tsx:32-33`, `instituto/layout.tsx:26-27`).

## 3. Flujo

### 3.1 Elección del sitio (servidor, en cada petición)

1. `middleware.ts:6-12`: si la ruta empieza por `/_next` o `/api`, o contiene un punto, pasa sin tocar.
2. `middleware.ts:15`: toma la cabecera `host` y quita el puerto.
3. `middleware.ts:18-21`: si el host es el de desarrollo `.local` de Instituto o uno de sus dos hosts públicos, reescribe a `/sites/instituto<ruta>`.
4. `middleware.ts:23-32`: si el host es el de desarrollo `.local` de NormaPRO o uno de sus dos hosts públicos, reescribe a `/sites/normapro<ruta>`. En esta rama, si la URL trae `?ref=`, copia su valor a la cabecera de respuesta `x-site-ref` (`:27-30`).
5. `middleware.ts:35`: cualquier otro host (por ejemplo `localhost`) reescribe a `/sites/normapro<ruta>`.

El matcher (`:39`) excluye `_next/static`, `_next/image` y `favicon.ico`.

Los nombres de host están en `middleware.ts:18` y `:23`. Para añadir un host nuevo hay que tocar esas dos condiciones y, en desarrollo, `allowedDevOrigins` (`next.config.ts:20`).

### 3.2 El valor `ref` (sitio de origen)

- Quién lo escribe: solo el middleware, solo en el sitio NormaPRO (`middleware.ts:27-30`). El enlace de Instituto a NormaPRO añade `?ref=instituto` (`src/components/menu/NavbarInstituto.tsx:73-79,90-96`).
- Quién lo lee: `normapro/layout.tsx:28-29` con `headers()`. Si vale `instituto`, `siteRef = "instituto"`; si no, `null`.
- Quién lo reparte: `SiteProvider` (`layout.tsx:34`). Se consume con `useSiteRef()` (`SiteContext.tsx:13-15`).
- Consumidores (todos ponen `isInstituto = ref === "instituto"`): `components/landings/HeroSection.tsx:34-35`, `landings/HistoriasClientesSection.tsx:65-66`, `landings/SideImgTextSection.tsx:21-22`, `landings/VideoSection.tsx:22-23`, `components/historiaTextSection2.tsx:15-16`.
- El sitio Instituto no monta `SiteProvider` (`instituto/layout.tsx`): no tiene `ref`.
- Duda de funcionamiento: el middleware escribe `x-site-ref` en la **respuesta** (`response.headers.set`, `:29`) y el layout lo lee con `headers()` de la **petición**. Ver ST-WEB-02 y apartado 9.

### 3.3 Layouts

- NormaPRO (`layout.tsx:25-49`): fuente Mulish (`:14-18`), `SiteProvider` > `ChatManager` (que pinta `Navbar`, el chat y el modal de contacto) > `Providers` > página; luego `Footer`; luego un `<Script>` externo de iconos (`:41-45`). Es `async` por `headers()`.
- Instituto (`layout.tsx:24-39`): `NavbarInstituto`, `Providers` > página, `FooterInstituto`, el mismo `<Script>`. Sin chat, sin `SiteProvider`.
- Metadatos: título y descripción estáticos por sitio (`normapro/layout.tsx:20-23`, `instituto/layout.tsx:19-22`). Ver ficha [W10](w10-seo.md).
- `Providers` (`providers.tsx:8-21`): pinta `DefaultSeo` de `next-seo` solo después de montar en el cliente (`:9-13,17`).
- Los dos layouts importan `@/libs/fontawesome.config` (`:2`) y `globals.css`.

### 3.4 Caché y revalidación

No hay caché ni revalidación de Next en esta ficha. El middleware corre en cada petición. `normapro/layout.tsx` usa `headers()`, que vuelve dinámico el layout.

## 4. Endpoints que consume

Ninguno. El middleware y los layouts no llaman a la API. La URL base de la API se define en `src/config/api.ts` (ficha [W14](w14-config-libs-utils.md)).

## 5. Datos

### Tipos y contexto

| Elemento | Definición |
|---|---|
| `SiteRef` | `"instituto" \| null` (`SiteContext.tsx:5`) |
| Valor del contexto | `{ ref: SiteRef }`, por defecto `{ ref: null }` (`:7-11`) |
| Props de `SiteProvider` | `siteRef: SiteRef`, `children` (`:17-23`) |
| Cabecera | `x-site-ref` (`middleware.ts:29`, `normapro/layout.tsx:29`) |
| Parámetro de URL | `ref` (`middleware.ts:27`) |

### Opciones de `next.config.ts` (solo nombres)

| Opción | Líneas | Qué es |
|---|---|---|
| `images.remotePatterns` | 4-12 | Un patrón: protocolo, hostname y pathname de un contenedor de Azure Blob |
| `eslint.ignoreDuringBuilds` | 13-15 | Clave retirada en Next 16 (ST-WEB-01) |
| `typescript.ignoreBuildErrors` | 16-18 | El build no falla por tipos (ST-WEB-06) |
| `allowedDevOrigins` | 20 | Hosts `.local` de desarrollo |

### Otras configuraciones

- `tailwind.config.ts`: `content` (`:4`), `theme.extend.keyframes.fadeInUp` y `animation.fadeInUp` (`:6-16`). Ver apartado 9.
- `globals.css`: `@import "tailwindcss"` (`:1`), `@theme` con `--font-family` (`:3-5`), variables `--background` y `--foreground` (`:7-17`), clases `.backdrop-custom`, `.animate-slide`, `.fade-in-up`, `.up` y los `@keyframes` (`:33-79`).
- `eslint.config.mjs:13`: extiende `next/core-web-vitals` y `next/typescript`.
- `tsconfig.json`: `strict: true` (`:11`), `moduleResolution: "bundler"` (`:15`), alias `@/*` a `./src/*` (`:25-29`), plugin `next` (`:20-24`).
- `package.json` (ver [W15](w15-raiz-plantillas-trazas-zips.md)): scripts `dev` (`next dev --turbopack`), `build`, `start`, `lint`; Next `^16.2.0`; `next-seo` `^6.6.0`.

Variables de entorno: la store solo usa `NEXT_PUBLIC_API_BASE_URL` (`src/config/api.ts:2`). Sin otras en `src/`.

## 6. Reglas de negocio y permisos

1. El sitio lo decide el host, no la ruta.
2. Un host desconocido sirve NormaPRO (`middleware.ts:35`).
3. Rutas con punto, `/_next` y `/api` no se reescriben.
4. Solo el sitio NormaPRO recibe `ref` y solo el valor `instituto` cambia algo (`layout.tsx:29`).
5. No hay autenticación ni permisos en esta capa.

## 7. Zonas de riesgo

- Regla de diseño que hoy no se cumple; detalle en el informe restringido.
- ST-WEB-01: `next.config.ts:13-15` (clave `eslint`) y `middleware.ts:3` (convención `middleware`) están obsoletas en Next 16; el aviso sale al arrancar (ver [ERRORES-DETECTADOS.md](../../../docs/ERRORES-DETECTADOS.md)).
- ST-WEB-02: el valor `ref` probablemente no llega a `useSiteRef()` (apartado 3.2).
- ST-WEB-06: `next.config.ts:13-18` desactiva los fallos de build por lint y por tipos. Un cambio con errores de tipos compila igual.
- Los hosts están escritos en el código (`middleware.ts:18,23`). Un host nuevo sin tocar esas líneas cae en NormaPRO.
- El layout de NormaPRO usa `headers()`: cualquier página bajo ese layout deja de ser estática.
- Cambiar `middleware.ts` afecta a los dos sitios y a todas las rutas a la vez.

## 8. Cómo probarlo

1. `npm run dev` en `store.normapro.app` (puerto 3000 por defecto de Next).
2. `http://localhost:3000/` abre NormaPRO (rama de fallback).
3. Para Instituto: añadir su host `.local` al fichero `hosts` del sistema y abrir ese host con el puerto 3000. Debe verse `NavbarInstituto`.
4. Probar `ref`: abrir el host `.local` de NormaPRO con `/historias?ref=instituto` y comprobar si las secciones que usan `useSiteRef` cambian a la versión Instituto. Si no cambian, ST-WEB-02 se confirma en ejecución.
5. Confirmar los avisos de Next al arrancar (ST-WEB-01).
6. `npm run build`: no debe fallar aunque haya errores de tipos (ST-WEB-06).

## 9. Dudas / no localizado

- ST-WEB-02 por verificar en ejecución. Por el código: `headers()` de `next/headers` devuelve las cabeceras de la petición y el middleware solo modifica la respuesta (`middleware.ts:26-29`; no pasa `request.headers` a `NextResponse.rewrite`). Sin comprobar en ejecución.
- `tailwind.config.ts` no está enlazado desde `globals.css`: no hay `@config` (`globals.css:1-3`). Con Tailwind 4 (`package.json`, `@tailwindcss/postcss`) la config JS no se carga sola. La animación `animate-fadeInUp` no se usa en `src/` (`grep`). No verificado en ejecución.
- No localizado: `src/app/layout.tsx` (raíz), `loading.tsx`, `error.tsx`, `not-found.tsx` de nivel app.
- No localizado: dónde se define el puerto de producción de la store (`package.json` no lo fija).
- No localizado: por qué `tsconfig.json:36` incluye `.next/dev/types`; es salida de Next.

## Correcciones de la revisión contra el código (21/10/2026)

### Afirmaciones incorrectas
- Ninguna afirmación incorrecta.

### Cifras o líneas a unificar
- `globals.css` termina en la línea 80 (la ficha cita 1-79). `postcss.config.mjs` tiene 5 líneas.
- `startsWith("/api")` en `middleware.ts:6-12` también deja pasar rutas como `/apixxx`. Sin efecto hoy.
- `--font-family` en `globals.css` no es clave de tema de Tailwind 4 y no tiene efecto. La fuente funciona por `body{font-family}` (`globals.css:22`).
- `tailwind.config.ts` no está enlazado (sin `@config`); `animate-fadeInUp` no se usa en `src/`.
- Falta en la ficha: `sites/<sitio>/[...not-found]/page.tsx:1-5` existe en ambos sitios y hace `redirect("/")`.
- Los avisos de ST-WEB-01 están en `node_modules/next/dist/server/config.js:167` y `node_modules/next/dist/build/index.js:651`.

### Errores funcionales de esta ficha
- ST-WEB-01: configuración de Next obsoleta ([detalle](../../../docs/ERRORES-DETECTADOS.md)).
- ST-WEB-02: `x-site-ref` no llega al layout; el modo Instituto no se activa ([detalle](../../../docs/ERRORES-DETECTADOS.md)). Ejecución pendiente.
- ST-WEB-06: el build ignora errores de tipos y de lint ([detalle](../../../docs/ERRORES-DETECTADOS.md)).
- ST-WEB-17: toda URL desconocida redirige a la home, sin 404 ([detalle](../../../docs/ERRORES-DETECTADOS.md)).
- ST-WEB-19: rutas con punto en el slug no se reescriben ([detalle](../../../docs/ERRORES-DETECTADOS.md)).

### Afirmaciones no verificables
- Por qué `tsconfig.json:36` incluye `.next/dev/types`, y los pasos de `## 8` (requieren ejecución).

## Actualización tras el PR del 21/10/2026

Código comparado: `main` `8dc6ec9` frente a `origin/main` `0817fe9` (PR #19). Resumen completo y estado de los ids en [ACT-store.md](../../../docs/revision/ACT-store.md). Solo lectura; no probado en ejecución.

### Citas rotas
- `src/app/providers.tsx` ya no existe (§2, §3.3, §7). `Providers` y `DefaultSeo` ya no existen: los layouts no los montan.
- `src/app/layout.tsx` sigue sin existir.

### Citas desplazadas
| Antes | Ahora |
|---|---|
| `middleware.ts:3-36` | `:19-46` (función `middleware`) |
| `middleware.ts:6-12` (pasa sin tocar) | `:22-29` |
| `middleware.ts:15` (host sin puerto) | `:32` |
| `middleware.ts:18-21` (rama Instituto) | `:35-38` |
| `middleware.ts:23-32` (rama NormaPRO) | `:40-42`, función `rewriteToNormapro` en `:5-17` |
| `middleware.ts:27-30` (`ref` a cabecera) | `:11-14` |
| `middleware.ts:35` (fallback) | `:44-45` |
| `middleware.ts:38-40` (matcher) | `:48-50` |
| `normapro/layout.tsx:25-49` | `:45-70` |
| `normapro/layout.tsx:28-29` (`headers()`) | `:48-49` |
| `normapro/layout.tsx:35-37` (ChatManager) | `:56-58` |
| `normapro/layout.tsx:38` (Footer) | `:59` |
| `normapro/layout.tsx:41-45` (script de iconos) | `:62-66` |
| `normapro/layout.tsx:14-18` (fuente) | `:15-19` |
| `instituto/layout.tsx:24-39` | `:44-60` |
| `instituto/layout.tsx:19-22` (`metadata`) | `:21-42` (`generateMetadata`) |
| `next.config.ts:3-21` | `:3-16` |
| `next.config.ts:20` (`allowedDevOrigins`) | `:13` |

### Afirmaciones obsoletas
- «El middleware escribe `x-site-ref` en la respuesta» (§3.2, §9): ahora la copia a la cabecera de la petición con `NextResponse.rewrite(url, { request: { headers } })` (`middleware.ts:16`) y borra la que venga del cliente (`:9`). El layout la lee en `normapro/layout.tsx:49`. ST-WEB-02 queda RESUELTO por código. No probado en el navegador.
- «Los nombres de host están en `middleware.ts:18` y `:23`» (§3.1, §7): ahora están en `src/libs/seo.ts:16-23` (`INSTITUTO_HOSTS`, `NORMAPRO_HOSTS`). Instituto también sirve `inicie.normapro.es` y `www.inicie…` y el dominio propio del instituto. NormaPRO sirve además `store.normapro.es` y `www.store…`.
- «Título y descripción estáticos por sitio» (§3.3): los dos layouts exportan `generateMetadata` async con plantilla de título, `metadataBase`, `robots` según host, Open Graph y Twitter (`normapro/layout.tsx:21-43`, `instituto/layout.tsx:21-42`).
- «`Providers` pinta `DefaultSeo`» (§3.3): borrado.
- Tabla de `next.config.ts`: ya no existen `eslint.ignoreDuringBuilds` ni `typescript.ignoreBuildErrors` (ST-WEB-06 RESUELTO, ST-WEB-01 CAMBIADO: queda la convención `middleware`). Opciones actuales: `images.remotePatterns` (`:4-12`) y `allowedDevOrigins` (`:13`).
- «Rutas con punto no se reescriben» (§6.3): sigue (`middleware.ts:25-26`). Ahora el código lo aprovecha: `sitemap.xml` y `robots.txt` se sirven desde `src/app` por esa excepción (`:22`).
- «`package.json`: `next-seo ^6.6.0`» (§5): retirado.
- «El layout de NormaPRO usa `headers()`» (§3.4, §7): ahora lo usan los dos layouts (Instituto, en `generateMetadata`, `:22`).
- Variables de entorno (§5): además de `NEXT_PUBLIC_API_BASE_URL` existen `NEXT_PUBLIC_SITE_URL` y `NEXT_PUBLIC_INSTITUTO_SITE_URL` (`libs/seo.ts:5-6`, documentadas en `README.md`) y una variable de instalación para el registro de iconos (`README.md:45`).
- Los dos layouts montan ahora un `Organization` en JSON-LD: Instituto (`instituto/layout.tsx:48`), NormaPRO (`normapro/layout.tsx:54`).

### Nuevo
| Pieza | Fichero:línea |
|---|---|
| Sitemap por host | `src/app/sitemap.xml/route.ts:158-165` |
| Robots por host | `src/app/robots.txt/route.ts:4-15` |
| Base de SEO, hosts y canónicos | `src/libs/seo.ts` |
| Reenvío de `?ref` en `rewriteToNormapro` | `src/middleware.ts:5-17` |

### Errores de esta ficha
ST-WEB-01 CAMBIADO. ST-WEB-02 RESUELTO. ST-WEB-06 RESUELTO (`tsc --noEmit` sin errores). ST-WEB-17 y ST-WEB-19 VIGENTES (`[...not-found]/page.tsx:1-5`; `middleware.ts:25-26`).

### Seguridad
Cambian el origen de la lista de hosts, el `noindex` por host y el reenvío de `ref`. Detalle y estado de SEG-WEB-05, -12, -14, -17 y -20 en [ACT-store.md](../../../docs/revision/ACT-store.md) §7 (pendiente de copiar a `docs/seguridad/04_actualizacion-store.md`).
