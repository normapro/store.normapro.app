const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://api-store.normapro.app";

const API_ENDPOINTS = {
  AMBITOS: `${API_BASE_URL}/v1/store/ambitos`,
  SECTORES: `${API_BASE_URL}/v1/store/sectores`,
  SOLUCIONES: `${API_BASE_URL}/v1/store/highlighted/packs`,
};

export default API_ENDPOINTS;
