import { LogoType } from "@/libs/logovars";


export 
interface Cliente {
  id_cliente: number;
  description: string;
  url: string;
  logo: string;
  logoType: LogoType;
}