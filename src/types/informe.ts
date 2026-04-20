export interface PrologoInformeItem {
  title?: string;
  content?: string;
}

export interface IndiceInformeClaim {
  title?: string;
  claim?: string;
}

export type IndiceInformeChild = string | IndiceInformeClaim;

export interface IndiceInformeItem {
  title?: string;
  ul?: IndiceInformeChild[];
}

export interface ResponsableInforme {
  nombre?: string;
  empresa?: string;
  cargo?: string;
  imagen?: string;
}

export interface Informe {
  id?: number;
  slug?: string;
  categoria?: string;
  titulo?: string;
  textoDescarga?: string | null;
  imgPortada?: string;
  img_portada?: string;
  imgInforme?: string;
  img_informe?: string;
  prologo?: PrologoInformeItem[] | string;
  indice?: IndiceInformeItem[];
  responsables?: ResponsableInforme[];
}
