import { Cliente } from "./cliente";

export interface Testimonio {
    id_testimonio: number;
    id_cliente: number | null;
    description: string | null;
    persona: string | null;
    cargo: string | null;
  }
  

  export interface TestimonioConCliente extends Testimonio {
    cliente: Cliente;
  }