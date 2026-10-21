This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
# store.normapro.app

## Configuración

Variables de entorno que usa el proyecto:

| Variable | Uso | Valor por defecto |
|---|---|---|
| `FONTAWESOME_NPM_TOKEN` | Token del registro privado de Font Awesome Pro, leído desde `.npmrc` en `npm install`. No se versiona. | (obligatoria) |
| `NEXT_PUBLIC_API_BASE_URL` | URL de la API de la tienda. | `http://localhost:3010` en desarrollo, `https://api-store.normapro.app` en producción |
| `NEXT_PUBLIC_SITE_URL` | Dominio canónico de la tienda (canonical, Open Graph, sitemap). | `https://www.normapro.es` |
| `NEXT_PUBLIC_INSTITUTO_SITE_URL` | Dominio canónico del sitio del instituto. | `https://inicie.normapro.es` |

## SEO

- Cada página genera sus metadatos en servidor (`generateMetadata` o `metadata`) con los datos de la API; las utilidades comunes están en `src/libs/seo.ts` y las consultas en servidor en `src/services/storeService.ts`.
- `/sitemap.xml` y `/robots.txt` se generan por host en `src/app/sitemap.xml/route.ts` y `src/app/robots.txt/route.ts`.
- Solo se indexan los hosts de producción listados en `src/libs/seo.ts`; el resto (previews, `.local`, IPs) recibe `noindex`.
