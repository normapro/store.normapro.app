# Estudio y plan SEO + GEO de www.normapro.es

Creado el 30/10/2026 por Claude a petición de Juanma. Objetivo: que cuando un cliente busque lo que vende NormaPro, en Google o en una IA, NormaPro salga primero. Pensado para durar: se actualiza, no se rehace.

**Estado:** investigación y plan terminados; **nada ejecutado**. Pendiente de revisión de Juanma y de las decisiones de `07` §5. Se ejecuta cuando terminen los errores funcionales de la web (`../../../docs/ESTADO-ERRORES-TRAS-PR.md`).

## Documentos

| Doc | Qué contiene | Léelo si… |
|---|---|---|
| [01-investigacion-mercado-keywords.md](01-investigacion-mercado-keywords.md) | Cómo busca la gente (5 modos), vocabulario de NormaPro que nadie busca, mapa de demanda por ámbito, competidores, preguntas frecuentes, prioridades | …vas a escribir un título, una guía o una campaña |
| [02-auditoria-seo-produccion.md](02-auditoria-seo-produccion.md) | Lo que Google ve hoy en producción, por tipo de página, con causa en el código y gravedad | …vas a tocar código o quieres saber por qué no posicionamos |
| [03-arquitectura-keyword-pagina.md](03-arquitectura-keyword-pagina.md) | Qué URL responde a qué búsqueda; títulos, descriptions y H1 listos para pegar; 10 guías a escribir; enlazado; datos estructurados por página | …vas a rellenar el editor o crear contenido |
| [04-plan-tecnico.md](04-plan-tecnico.md) | Cambios de código por prioridad (P0/P1/P2), fichero a fichero, con receta y comprobación; robots.txt y JSON-LD listos | …eres desarrollo |
| [05-geo-ia.md](05-geo-ia.md) | Cómo salir citado en AI Overviews, AI Mode, ChatGPT, Perplexity, Gemini y Claude: seis frentes, plantilla de página citable, panel de 30 prompts | …te preguntan «¿y la IA?» |
| [06-presencia-externa-local.md](06-presencia-externa-local.md) | Google Business Profile, Search Console, Bing/IndexNow, analítica, directorios y reseñas, LinkedIn/YouTube/prensa, el sitio Instituto, lo local | …eres Juanma o marketing |
| [07-plan-ejecucion-kpis.md](07-plan-ejecucion-kpis.md) | Fases 0-3 con horas, reparto por rol, KPI con objetivos a 3/6/12 meses, decisiones pendientes, mantenimiento | …tienes que planificar o aprobar |
| `datos/` | Autocompletado de Google España del 30/10/2026 (225 semillas, ~1.400 expansiones, 3.028 palabras únicas en `2026-10-30_keywords.csv`) y el script `harvest.py` para repetirlo cada trimestre | …quieres los datos brutos |

## Las cinco cosas que hay que saber

1. **La web manda a Google 2.684 copias de la home** (las URL solución × sector del sitemap redirigen a `/`). Las páginas de categoría llevan «Lorem ipsum». Las URL antiguas de WordPress, indexadas, mueren en la home. Arreglarlo cuesta dos semanas y vale más que cualquier contenido nuevo (`02`, `04` §1-4).
2. **La gente no busca «software de cumplimiento normativo»: busca la obligación.** «Canal de denuncias obligatorio», «UNE 19601 2025», «documentación obligatoria ISO 9001», «requisitos legales medio ambiente». NormaPro no tiene ni una página que responda a eso. Diez guías en seis meses (`01` §2, `03` §8).
3. **Las 244 fichas de solución están bien hechas**; solo hay que titularlas como busca el cliente y enlazarlas desde páginas de categoría reales (`03` §3-4).
4. **GEO es SEO más tres cosas**: HTML legible sin JavaScript, afirmaciones con cifras y fuentes, y presencia en los sitios que la IA cita (Capterra, SoftwareDoit, comparativas, LinkedIn). Y una entidad «NormaPro» inequívoca: hoy se confunde con un software polaco de presupuestos (`05`).
5. **Lo que no es código pesa la mitad del plan**: Search Console verificada, Bing, ficha de Google, reseñas, Instituto arreglado (hoy devuelve 500), decisión sobre precios públicos (`06`, `07` §5).

## Cómo usar esto cuando se ejecute

1. Juanma toma las decisiones de `07` §5 y exporta Search Console (`06` §2.3).
2. Desarrollo ejecuta la Fase 0 de `07` siguiendo `04`, bloque a bloque, con `npx tsc --noEmit`, `npm run build`, `curl -A Googlebot` y actualización de la ficha W10 y de `INDICE-LOCALIZACION.md`. Un commit por repo, sin `push` sin el «dale».
3. Contenido rellena el editor con `03` §3, §4 y §7.
4. A partir del mes 3, guías (`03` §8) con la plantilla de `05` §4.
5. Medición mensual con `07` §4.

## Reglas

- Sin valores de configuración ni secretos en estos documentos.
- Toda cifra normativa (plazos, umbrales, sanciones) se verifica en BOE/DOUE antes de publicarla en la web.
- Los volúmenes de búsqueda de `01` son niveles estimados hasta que se validen con Keyword Planner y Search Console.
- Lo marcado «sin verificar» no se da por bueno hasta comprobarlo.
