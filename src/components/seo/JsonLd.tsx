type JsonLdData = Record<string, unknown> | null | undefined;

// Serializa el JSON-LD escapando "<" para que el contenido nunca pueda cerrar la etiqueta <script>.
const serialize = (data: Record<string, unknown>) => JSON.stringify(data).replace(/</g, "\\u003c");

export default function JsonLd({ data }: { data: JsonLdData | JsonLdData[] }) {
  const items = (Array.isArray(data) ? data : [data]).filter(Boolean) as Record<string, unknown>[];

  return (
    <>
      {items.map((item, index) => (
        <script key={index} type="application/ld+json" dangerouslySetInnerHTML={{ __html: serialize(item) }} />
      ))}
    </>
  );
}
