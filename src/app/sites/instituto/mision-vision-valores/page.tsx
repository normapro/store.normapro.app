import HeaderInstitutoSection from '@/components/HeaderInstitutoSection';
import Image from 'next/image';
import Link from 'next/link';

export default function MisionVisionValores() {
    const valores = [
        {
            nombre: "Honestidad",
            descripcion: "Somos transparentes y éticos en todo lo que hacemos. Decimos la verdad, cumplimos nuestras promesas y asumimos nuestras responsabilidades."
        },
        {
            nombre: "Excelencia",
            descripcion: "Buscamos la calidad y la innovación en cada proyecto que realizamos. Nos esforzamos por superar las expectativas de nuestros clientes y colaboradores."
        },
        {
            nombre: "Respeto",
            descripcion: "Valoramos la diversidad, la inclusión y el diálogo. Tratamos a todos con dignidad y consideración."
        },
    ]
    return (
        <>
            <HeaderInstitutoSection text="Misión, Visión y Valores" variant="dark" />

            <section className="w-full" style={{ background: "linear-gradient(to bottom, #010D3D 60%, white 50%)" }}>
                {/* Texto: título izquierda + contenido derecha */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex flex-col md:flex-row gap-50">
                    <div className="md:w-1/3 flex items-start">
                        <h2 className="text-white text-5xl md:text-6xl font-black leading-tight">
                            Misión
                        </h2>
                    </div>
                    <div className="md:w-2/3 flex flex-col gap-4">
                        <p className="text-white/90 text-base">
                            Partimos de la base de que consideramos que el progreso tecnológico es elemental para conseguir avances en el bienestar de la humanidad. La clave es hacerlo compatible con la seguridad de las personas, así como con la conservación y mejora del planeta. Conseguir todo esto es caminar hacia un mundo mejor y más justo.
                        </p>
                        <p className="text-white font-bold text-base">
                            Contribuir al éxito de las empresas de nuestros clientes
                        </p>
                        <p className="text-white/90 text-base">
                            Nuestra misión pasa por descubrir y aplicar metodologías que ayuden a alinear objetivos de cumplimiento con los de mejora continua, óptimización de recursos y automatización de procesos internos de negocio.
                        </p>
                        <Link href="/" className="text-white font-bold underline underline-offset-4 hover:text-white/70 transition w-fit">
                            Leer más
                        </Link>
                    </div>
                </div>
                {/* Imagen */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
                    <div className="w-full h-[400px] relative">
                        <Image
                            src="/instituto/mision-vision-valores/mision.jpg"
                            alt="Misión"
                            fill
                            className="object-cover"
                        />
                    </div>
                </div>
            </section>

            {/* Visión */}
            <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <h2 className="text-[#010D3D] text-4xl font-black mb-6">Visión</h2>
                <p className="text-[#010D3D] text-base leading-relaxed">
                    En Instituto de Innovación, Ciencia y Empresa, buscamos que nuestra empresa sea operativamente eficaz,
                    poder ofrecer productos y servicios de la mejor calidad, conseguir beneficios en los negocios, seguir
                    innovando y cultivando marca, pero pensando siempre en ayudar a nuestros clientes e influyendo
                    positivamente en los demás.
                </p>
            </div>

            {/* Valores */}
            <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <h2 className="text-[#010D3D] text-4xl font-black mb-6">Valores</h2>
                <p className="text-[#010D3D] text-base leading-relaxed mb-8">
                    El propósito fundamental de la existencia de nuestra organización está determinado principalmente
                    por los propios valores de las personas que trabajan dia a dia en ella:
                </p>
                <div className="flex flex-col gap-6">
                    {valores.map((valor) => (
                        <div key={valor.nombre}>
                            <p className="text-[#010D3D] font-bold text-base mb-1">{valor.nombre}</p>
                            <p className="text-[#010D3D] text-base leading-relaxed">{valor.descripcion}</p>
                        </div>
                    ))}
                </div>
            </div>

        </>
    );
}