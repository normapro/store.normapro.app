"use client";

import Image from "next/image";
import { logoDimensions, LogoType } from "@/libs/logovars";

interface Props {
  logoName: string;
  logoType: LogoType;
  clienteName: string;
}

const ImageLogoCliente = ({ logoName, logoType, clienteName }: Props) => {
    const dimensions = logoDimensions[logoType];
  
    if (!dimensions) {
      console.warn(`LogoType "${logoType}" no es válido. Usando dimensiones por defecto.`);
      return (
        <Image
          src={`/logos/${logoName}`}
          alt={`Logo de ${clienteName}`}
          width={100}
          height={100}
          style={{ maxWidth: 100, maxHeight: 100, height: "auto", objectFit: "contain" }}
        />
      );
    }
  
    const { maxWidth, maxHeight } = dimensions;
  
    return (
      <Image
        src={`/logos/${logoName}`}
        alt={`Logo de ${clienteName}`}
        width={maxWidth}
        height={maxHeight}
        style={{ maxWidth, maxHeight, height: "auto", objectFit: "contain" }}
      />
    );
  };
  

export default ImageLogoCliente;