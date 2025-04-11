"use client";

import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlay } from "@fortawesome/pro-duotone-svg-icons";
import { ItemListFormacion } from "@/types/formacion";

type Props = {
  formacion: ItemListFormacion;
};

const FormacionCard = ({ formacion }: Props) => {
  return (
    <div className="relative w-[303px] h-[180px]  overflow-hidden transition-transform duration-300 hover:scale-105">
      {/* Imagen de fondo */}
      <Image
        src={formacion.public_url || "/main/default-icon.png"}
        alt={formacion.description}
        fill
        className="object-cover"
      />

      {/* Capa oscura */}
      <div className="absolute inset-0 bg-black/20 z-10" />

      {/* Logo del instituto */}
      <div className="absolute top-4 left-4 z-20">
        <Image
          src="/iconoInstituto.svg"
          alt="Logo Instituto"
          width={80}
          height={24}
        />
      </div>

      {/* Icono de play centrado */}
      <div className="absolute inset-0 flex items-center justify-center z-20">
        <FontAwesomeIcon icon={faCirclePlay} className="text-white text-4xl opacity-90" />
      </div>

      {/* Texto inferior izquierdo */}
      <div className="absolute bottom-4 left-4 z-20">
        <h3 className="text-white font-bold text-lg leading-tight max-w-[80%]">
          {formacion.title}
        </h3>
      </div>

      {/* Icono pingüino esquina inferior derecha */}
      <div className="absolute bottom-3 right-3 z-20">
        <Image
          src="/iconopinguino@2x.png"
          alt="NormaPro"
          width={36}
          height={36}
          className="rounded-[12px] shadow-md"
        />
      </div>
    </div>
  );
};

export default FormacionCard;
