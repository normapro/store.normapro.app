const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://api-store.normapro.app";

const API_ENDPOINTS = {
  AMBITOS: `${API_BASE_URL}/v1/store/ambitos`,
  AMBITOS_SOLUCIONES: `${API_BASE_URL}/v1/store/ambitosWithSolCounter`,
  LISTSOLUCIONES: `${API_BASE_URL}/v1/store/listsoluciones`,
  SECTORES: `${API_BASE_URL}/v1/store/sectores`,
  HIGLIGHTEDPACKS: `${API_BASE_URL}/v1/store/highlighted/packs`,
  CLIENTES: `${API_BASE_URL}/v1/store/clientes`,
  LISTPACKS: `${API_BASE_URL}/v1/store/listpacks`,
  SECTOR_INFO : `${API_BASE_URL}/v1/store/sector`,
  SOLUCION: `${API_BASE_URL}/v1/store/solucion`,
  TESTIMONIOS: `${API_BASE_URL}/v1/store/testimonios`,
  MAINPACKS: `${API_BASE_URL}/v1/store/mainpacks`,
  APLICACIONES: `${API_BASE_URL}/v1/store/aplicaciones`,
  CONSULTORIA: `${API_BASE_URL}/v1/store/consultoria`,
  PACKS: `${API_BASE_URL}/v1/store/packs`,
  
};

export default API_ENDPOINTS;
