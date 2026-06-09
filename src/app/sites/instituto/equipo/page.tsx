import Image from "next/image";
import HeaderInstitutoSection from "@/components/HeaderInstitutoSection";

export default function EquipoPage() {
    return (
        <>
            <HeaderInstitutoSection text="El equipo" variant="dark" />

            <section className="w-full" style={{ background: "linear-gradient(to bottom, #010D3D 60%, white 50%)" }}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex flex-col md:flex-row gap-50 items-center">
                    <div className="md:w-full flex items-start">
                        <h2 className="text-white text-5xl md:text-6xl font-black leading-tight">
                            Vivir de acuerdo con lo que decimos
                        </h2>
                    </div>
                    <div className="md:w-full flex flex-col gap-4">
                        <p className="text-white font-bold text-xl md:text-2xl">
                            Somos una familia en busca de la excelencia, con identidad definida y sólida que trabaja con pasión e integridad hacia una visión y misión compartida.
                        </p>
                    </div>
                </div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
                    <div className="w-full h-[400px] relative">
                        <Image
                            src="/historiasclientes/Todos-sin-casco.jpg"
                            alt="Consultoría especializada"
                            fill
                            className="object-cover"
                        />
                    </div>
                </div>
            </section>

            <section className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex flex-col gap-20 text-[#010D3D]">
                <div className="flex flex-col gap-4">
                    <h2 className="text-2xl md:text-3xl font-black">
                        Comprometidos con la misión del equipo
                    </h2>
                    <p className="text-base leading-relaxed">
                        Una visión estimulante creada desde los integrantes del equipo, permite plantear los objetivos de la Organización. El espíritu de equipo hace que la relación entre sus miembros se transforme en algo más que compañerismo.
                    </p>
                </div>

                <div className="flex flex-col gap-4">
                    <h2 className="text-2xl md:text-3xl font-black">
                        Un equipo es un estado de ánimo
                    </h2>
                    <p className="text-base leading-relaxed">
                        Estamos convencidos de que un equipo de éxito ha de tener talento y corazón en proporciones iguales:
                    </p>
                    <ul className="flex flex-col gap-1 pl-4">
                        <li className="text-base">El <strong>corazón</strong> es el que te lleva a conseguir las metas.</li>
                        <li className="text-base">El <strong>talento</strong> es el que te hace ganar.</li>
                    </ul>
                </div>
            </section>

            <section className="w-full bg-gray-100 px-4 sm:px-6 lg:px-8 py-16">
                <div className="max-w-3xl mx-auto bg-white rounded-2xl p-10 flex flex-col gap-8">
                    <p className="text-[#010D3D] text-2xl font-semibold italic leading-relaxed font-monserrat-alternates">
                        Un grupo es un conjunto de individuos, mientras que un equipo es mucho más que la unión de sus miembros.
                    </p>
                    <div>
                        <p className="text-[#010D3D] font-black text-base tracking-wide">XESCO ESPAR</p>
                        <p className="text-[#010D3D] text-base">Xesco Espar (ex-entrenador del F.C. Barcelona de balonmano)</p>
                    </div>
                </div>
            </section>
        </>
    );
};