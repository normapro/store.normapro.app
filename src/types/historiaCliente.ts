export interface HistoriaCliente {
  id: number;
  slug?: string;
  id_cliente?: number | null;
  nombre: string;
  descripcion: string | null;
  imagen: string | null;
  componentes: unknown | null;
}
