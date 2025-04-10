import Head from "next/head";

interface SolucionSeoProps {
  title?: string;
  description?: string;
  slug?: string;
  ambito?: string;
  sector?: string;
  image?: string;
  price?: string;
  currency?: string;
  faqs?: { question: string; answer: string }[];
}

export default function SolucionSeo(props: SolucionSeoProps) {
  if (!props.title || !props.description) {
    console.warn("SEO: Datos insuficientes", props);
    return null;
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: props.title,
    description: props.description,
    offers: {
      "@type": "Offer",
      priceCurrency: props.currency || "EUR",
      price: props.price || "0.00",
      availability: "https://schema.org/InStock",
    },
  };

  return (
    <Head>
      <title>{props.title}</title>
      <meta name="description" content={props.description} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </Head>
  );
}
