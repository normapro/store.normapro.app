import HeaderInstitutoSection from "@/components/HeaderInstitutoSection";
import { faArrowDownToLine } from "@fortawesome/pro-duotone-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const recursos = [
    { nombre: "Manual de identidad corporativo", linkText: "Descargar pdf", href: "" },
    { nombre: "Logotipos para impresión", linkText: "Descargar zip", href: "" },
    { nombre: "Logotipos para pantallas", linkText: "Descargar zip", href: "" },
];

export default function MaterialPrensaPage() {
    return (
        <>
            <HeaderInstitutoSection text="Material para prensa" variant="light" />

            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col divide-y divide-gray-200">
                    {recursos.map((recurso) => (
                        <div key={recurso.nombre} className="flex items-center justify-between py-6">
                            <p className="text-[#010D3D] font-extrabold text-2xl">{recurso.nombre}</p>
                            <a
                                href={recurso.href}
                                download
                                className="flex items-center gap-4 text-[#010D3D] font-black text-base underline underline-offset-4 hover:opacity-70 transition whitespace-nowrap"
                            >
                                <FontAwesomeIcon icon={faArrowDownToLine} />
                                {recurso.linkText}
                            </a>
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
};