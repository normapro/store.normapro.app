import Image from "next/image";
import Link from "next/link";
import { Pack } from "@/types/pack";

const SolucionCard = ({ pack }: { pack: Pack }) => {
  return (
    <div className="bg-[#E9F6FA] rounded-xl p-6 text-left shadow-md">
      <div className="flex justify-center mb-4">
        <Image
          src={`/icons/${pack.uriIcon}`}
          alt={pack.description}
          width={180}
          height={120}
          className="object-contain"
        />
      </div>

      <h3 className="text-xl font-bold text-[#010D3D] mb-2">{pack.description}</h3>
      <p className="text-sm text-[#010D3D] mb-6">{pack.shortDescription}</p>

      <div className="flex justify-between items-center">
        <Link href={`/packs/${pack.slug}`} className="text-[#010D3D] font-semibold underline text-sm">
          Saber más
        </Link>
        <Link
          href={`/packs/${pack.slug}`}
          className="text-sm bg-gradient-to-r from-[#00b2e3] to-[#cca1dd] text-white font-semibold px-4 py-2 rounded-lg"
        >
          Contratar ahora
        </Link>
      </div>
    </div>
  );
};

export default SolucionCard;
