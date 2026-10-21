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
    categoria?: string;
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
    titleweb?: string | null;
    fraseCierre?: string | null;
  
    problemaTitle?: string;
    problemaPragma?: string;
  
    multimediaUri?: string;
    multimediaTypeId?: number;

    solucionTitle?: string;
    solucionPragma?: string;
    caracteristicasTitle?: string;
    caracteristicasPragma?: string;
    casosdeusoTitle?: string;
    casosdeusoPragma?: string;
    beneficiosTitle?: string;
    beneficiosPragma?: string;
  
    firstCtaTitle?: string;
    firstCtaPragma?: string;
    secondCtaTitle?: string;
    secondCtaPragma?: string;
  
    consultoriaTitle?: string;
    consultoriaDescription?: string;
  
    soluciones?: {
      slug: string;
      descripcion: string;
      icon?: string | null;
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