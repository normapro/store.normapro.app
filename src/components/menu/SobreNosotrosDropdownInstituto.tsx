"use client";
import Link from "next/link";

const SobreNosotrosDropdownInstituto = () => {
    return (
        <div className="bg-white shadow-md z-50 rounded-xl p-6 w-[280px]">
            <div className="flex flex-col gap-4">
                <Link href="/instituto/quienes-somos" className="font-extrabold text-[#010D3D] hover:text-[#00b2e3] transition-colors">
                    Qué hacemos
                </Link>
                <Link href="/instituto/mision-vision-valores" className="font-extrabold text-[#010D3D] hover:text-[#00b2e3] transition-colors">
                    Misión, visión y valores
                </Link>
                <Link href="/instituto/equipo" className="font-extrabold text-[#010D3D] hover:text-[#00b2e3] transition-colors">
                    El equipo
                </Link>
                <Link href="/instituto/politicas" className="font-extrabold text-[#010D3D] hover:text-[#00b2e3] transition-colors">
                    Políticas
                </Link>
            </div>
        </div>
    );
};

export default SobreNosotrosDropdownInstituto;