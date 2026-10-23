// Datos legales de la empresa titular de los sitios. Se usan en aviso legal, privacidad y cookies.
export const EMPRESA = {
  razonSocial: "Instituto de Innovación, Ciencia y Empresa, S.L.",
  cif: "B23726953",
  direccion: "Parque Tecnológico de Andalucía, Avda. Juan López Peñalver, 21",
  codigoPostal: "29590",
  ciudad: "Málaga",
  pais: "España",
  registroMercantil: "Registro Mercantil de Jaén, tomo 538, libro 0, folio 164, hoja J-20478, inscripción 1.ª",
  telefono: "953 19 05 10",
  telefonoHref: "tel:+34953190510",
  email: "info@institutodeinnovacion.es",
} as const;

export const DIRECCION_COMPLETA = `${EMPRESA.direccion}, ${EMPRESA.codigoPostal} ${EMPRESA.ciudad} (${EMPRESA.pais})`;
