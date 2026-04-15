export interface Actualidad {
  id_noticia: number;
  imagen: string;
  fecha: string;
  title: string;
  content: unknown;
  categoria: string | null;
  id_pack: number | null;
  id_soluciones: number[] | null;
}
