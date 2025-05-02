export interface ItemListPack{
    id_pack: number;
    description: string;
    shortDescription: string;
    uriIcon: string;
    slug: string;
    id_ambito?: number;
    id_sector?: number;
    slug_ambito?: string;
    slug_sector?: string;
}

export interface Pack {
    // Campos de listado
    id_pack: number;
    description: string;
    shortDescription: string;
    uriIcon: string;
    slug: string;
    id_ambito: number;
    id_sector: number;
    slug_ambito: string;
    slug_sector: string;
    descriptionForHighLight: string;
  
    // Campos para página de detalle
    title: string;
    subtitle?: string;
  
    problemaTitle?: string;
    problemaPragma?: string;
  
    multimediaUri?: string;
    multimediaTypeId?: number;
  
    firstCtaTitle?: string;
    firstCtaPragma?: string;
    secondCtaTitle?: string;
    secondCtaPragma?: string;
  
    consultoriaTitle?: string;
    consultoriaDescription?: string;
  
    soluciones?: {
      slug: string;
      descripcion: string;
    }[];
  
    faqs?: {
      id_faq: number;
      question: string;
      answer: string;
    }[];
  
    caracteristicas?: {
      id_caracteristica: number;
      description: string;
    }[];
  
    beneficios?: {
      id_beneficio: number;
      description: string;
    }[];
  
    casosdeuso?: {
      id_casodeuso: number;
      description: string;
    }[];
  }