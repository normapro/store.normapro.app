export interface ItemListSolucion{
  id_solucion: number;
  description: string;
  uriIcon: string;
  slug: string;
  id_ambito?: number;
  id_sector?: number;
  slug_ambito?: string;
  slug_sector?: string;
}

export interface Solucion {
  id_solucion: number;
  description: string;
  uriIcon: string;
  slug: string;
  id_ambito: number;
  id_sector: number | null;
  slug_ambito: string;
  slug_sector: string | null;

  title: string | null;
  subtitle: string | null;
  titleweb: string | null;
  multimediaUri: string | null;
  multimediaTypeId: number | null;
  problemaTitle: string | null;
  problemaPragma: string | null;
  solucionTitle: string | null;
  solucionPragma: string | null;
  caracteristicasTitle: string | null;
  caracteristicasPragma: string | null;
  casosdeusoTitle: string | null;
  casosdeusoPragma: string | null;
  firstCtaTitle: string | null;
  firstCtaPragma: string | null;
  secondCtaTitle: string | null;
  secondCtaPragma: string | null;

  thread_id: string | null;

  problemas: Problema[];
  faqs: Faq[];
  beneficios: Beneficio[] | null;
  beneficiosTitle: string | null;
  beneficiosPragma: string | null;

  caracteristicas: Caracteristica[];
  casosdeuso: CasosDeUso[];
}

export interface Problema {
  id_problema: number;
  description: string;
}

export interface Faq {
  id_faq: number;
  question: string;
  answer: string;
}

export interface Beneficio {
  id_beneficio: number;
  description: string;
}

export interface Caracteristica {
  id_caracteristica: number;
  description: string;
}

export interface CasosDeUso{
  id_casosdeuso: number;
  description: string;
}
