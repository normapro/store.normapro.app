import Image from "next/image";
import { TestimonioConCliente } from "@/types/testimonio";
import ImageLogoCliente from "./shared/ImageLogoCliente";

const TestimonioCard = ({
  id_testimonio,
  description,
  persona,
  cargo,
  cliente,
}: TestimonioConCliente) => {
  return (
    <div className="bg-[#f2f2f5] rounded-xl text-center flex flex-col justify-start">

      {/* Logo del cliente */}
      <div className="flex justify-center mt-[50px] mb-[50px]">
       
         <ImageLogoCliente
            logoName={cliente.logo}
            logoType={cliente.logoType}
            clienteName={cliente.description}
          />

      </div>

      {/* Descripción del testimonio */}
      <p className="text-[#010D3D] font-mulish italic font-bold text-[18px] leading-[24px] whitespace-pre-line px-[30px] mb-[40px]">
        {description}
      </p>

      {/* Datos de la persona */}
      <div className="text-sm text-[#010D3D] font-mulish mb-[40px] text-[15px]">
        <p className="font-semibold">{persona}</p>
        <p>{cargo}</p>
        <p className="uppercase font-bold mb-[50px]">{cliente.description}</p>
      </div>
    </div>
  );
};

export default TestimonioCard;
