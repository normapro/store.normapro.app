// Agrupa las soluciones de un listado en carpetas por norma y por tema. El editor no guarda orden ni grupo,
// así que el orden lo pone esta regla: carpetas de norma, resto de carpetas de más a menos soluciones y sueltas al final.
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { faBullseye, faCertificate, faFolderOpen, faScaleBalanced, faTriangleExclamation, faUsers } from "@fortawesome/free-solid-svg-icons";
import { Solucion } from "@/types/solucion";

export type CarpetaSoluciones = {
  titulo: string;
  icono: IconDefinition;
  soluciones: Solucion[];
};

// Norma que lleva el nombre de la solución: «ISO 9001», «ISO/IEC 27001», «UNE 19601»…
const NORMA = /\b(ISO(?:\/IEC)?\s?\d{4,5}|UNE\s?\d{4,5})/i;

// Carpetas por tema según palabras del nombre. La primera que encaja se queda la solución.
const TEMAS: [RegExp, string, IconDefinition][] = [
  [/proveedor|perfiles|roles|formación|capacitación|organigrama/i, "Personas, formación y proveedores", faUsers],
  [/gestión del cumplimiento de|autorización ambiental/i, "Cumplimiento legal por vector ambiental", faScaleBalanced],
  [/incidencia|reclamaci|no conformidad|satisfacción/i, "Incidencias, reclamaciones y clientes", faTriangleExclamation],
  [/riesgo|plan de acción|objetivo|indicador|informe anual|desempeño/i, "Planificación, objetivos y seguimiento", faBullseye],
  [/documental|requisitos normativos|biblioteca/i, "Documentación y requisitos", faFolderOpen],
];

const porNombre = (a: Solucion, b: Solucion) => a.description.localeCompare(b.description, "es");

/**
 * Reparte las soluciones en carpetas y sueltas, ya ordenadas.
 * Una carpeta con una sola solución no merece la pena: esa solución va a sueltas.
 * @param soluciones - Lista tal como llega de la API.
 * @returns Las carpetas (primero las de norma) y las soluciones sueltas, cada grupo en orden alfabético.
 */
export const agruparSoluciones = (soluciones: Solucion[]) => {
  const grupos = new Map<string, { titulo: string; icono: IconDefinition; norma: boolean; soluciones: Solucion[] }>();
  const sueltas: Solucion[] = [];

  soluciones.forEach((sol) => {
    const norma = sol.description.match(NORMA);
    const tema = TEMAS.find(([regla]) => regla.test(sol.description));
    const titulo = norma ? `Soluciones específicas ${norma[1].toUpperCase().replace(/\s+/, " ")}` : tema?.[1];
    if (!titulo) {
      sueltas.push(sol);
      return;
    }
    const grupo = grupos.get(titulo) ?? { titulo, icono: norma ? faCertificate : tema?.[2] ?? faFolderOpen, norma: !!norma, soluciones: [] };
    grupo.soluciones.push(sol);
    grupos.set(titulo, grupo);
  });

  const carpetas: CarpetaSoluciones[] = [];
  [...grupos.values()]
    .sort((a, b) => Number(b.norma) - Number(a.norma) || b.soluciones.length - a.soluciones.length)
    .forEach((grupo) => {
      if (grupo.soluciones.length < 2) sueltas.push(...grupo.soluciones);
      else carpetas.push({ titulo: grupo.titulo, icono: grupo.icono, soluciones: [...grupo.soluciones].sort(porNombre) });
    });

  return { carpetas, sueltas: sueltas.sort(porNombre) };
};
