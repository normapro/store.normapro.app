// libs/seo.config.ts
const defaultSEO = {
    title: "NormaPro",
    description: "Soluciones tecnológicas y de cumplimiento normativo adaptadas a tu sector.",
    canonical: "https://www.normapro.es",
    openGraph: {
      type: "website",
      locale: "es_ES",
      url: "https://www.normapro.es",
      site_name: "NormaPro",
      images: [
        {
          url: "https://www.normapro.es/og-image.jpg",
          width: 1200,
          height: 630,
          alt: "NormaPro",
        },
      ],
    },
    twitter: {
      handle: "@normapro", 
      site: "@normapro",
      cardType: "summary_large_image",
    },
  };
  
  export default defaultSEO;