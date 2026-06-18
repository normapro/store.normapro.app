"use client";
import Link from "next/link";

const SobreNosotrosDropdownInstituto = () => {
    return (
        <div className="bg-white shadow-md z-50 rounded-xl p-6 w-[280px]">
            <div className="flex flex-col gap-4">
                <Link href="/que-hacemos" className="font-extrabold text-[#010D3D] hover:text-[#00b2e3] transition-colors">
                    Qué hacemos
                </Link>
                <Link href="/mision-vision-valores" className="font-extrabold text-[#010D3D] hover:text-[#00b2e3] transition-colors">
                    Misión, visión y valores
                </Link>
                <Link href="/equipo" className="font-extrabold text-[#010D3D] hover:text-[#00b2e3] transition-colors">
                    El equipo
                </Link>
                <Link
                    href="https://store.normapro.es/politicas?ref=instituto"
                    target="_blank" rel="noopener noreferrer"
                    className="font-extrabold text-[#010D3D] hover:text-[#00b2e3] transition-colors"
                >
                    Políticas
                </Link>
            </div>
        </div>
    );
};

export default SobreNosotrosDropdownInstituto;