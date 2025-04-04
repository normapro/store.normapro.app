import Image from "next/image";
import { TestimonioConCliente } from "@/types/testimonio";

const TestimonioCard = ({
  id_testimonio,
  description,
  persona,
  cargo,
  cliente,
}: TestimonioConCliente) => {
  return (
    <div className="bg-[#f2f2f5] rounded-xl  p-6 text-center flex flex-col justify-between h-full pb-[40px]">
      {/* Logo del cliente */}
      <div className="flex justify-center items-center mb-4 h-[80px] mt-[40px]">
        <Image
          src={`/logos/${cliente.logo}`}
          alt={cliente.description}
          width={120}
          height={40}
          className="object-contain max-h-[40px]"
        />
      </div>

      {/* Descripción del testimonio */}
      <p className="text-[#010D3D] font-mulish italic font-bold text-[18px] leading-[24px] whitespace-pre-line px-[30px]">
        {description}
      </p>

      {/* Datos de la persona */}
      <div className="mt-6 text-sm text-[#010D3D] font-mulish mb-[40px] text-[15px]">
        <p className="font-semibold">{persona}</p>
        <p>{cargo}</p>
        <p className="uppercase font-bold mt-1">{cliente.description}</p>
      </div>
    </div>
  );
};

export default TestimonioCard;
