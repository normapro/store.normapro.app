import ContactoFormSection from "@/components/ContactoFormSection";
import HeaderInstitutoSection from "@/components/HeaderInstitutoSection";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faPhone } from "@fortawesome/pro-regular-svg-icons";

const oficinas = [
  {
    ciudad: "Jaén",
    direccion: "C/ Antonio de las Viñas nº 35",
    cp: "23009 Jaén",
    mapSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3149.1!2d-3.7849!3d37.7796!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd6d5c05f8b2d0f1%3A0x1!2sC%2F+Antonio+de+las+Vi%C3%B1as%2C+35%2C+23009+Ja%C3%A9n!5e0!3m2!1ses!2ses!4v1"
  },
  {
    ciudad: "Sevilla",
    direccion: "C/ Regla León 17 – Bajo",
    cp: "41010 Sevilla",
    mapSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3170.1!2d-6.0!3d37.38!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sC%2F+Regla+Le%C3%B3n+17%2C+41010+Sevilla!5e0!3m2!1ses!2ses!4v1"
  },
  {
    ciudad: "Murcia",
    direccion: "C/ Polo de Medina 21, 1°",
    cp: "30004 Murcia",
    mapSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3149!2d-1.1307!3d37.9834!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sC%2F+Polo+de+Medina+21%2C+30004+Murcia!5e0!3m2!1ses!2ses!4v1"
  }
];

export default function ContactoPage() {
    return (
        <>
            <HeaderInstitutoSection text="Contacto" variant="dark" />

            <section className="w-full" style={{ background: "linear-gradient(to bottom, #010D3D 45%, white 45%)" }}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <div className="flex flex-col md:flex-row gap-12 items-center">
                        <div className="w-full md:w-1/2">
                            <ContactoFormSection variant="instituto" />
                        </div>
                        <div className="w-full md:w-1/2 flex flex-col gap-50 pt-4">
                            <p className="text-[#010D3D] md:!text-white font-black text-2xl leading-snug">
                                Envíanos tu mensaje a través de este formulario y te contestaremos lo antes posible
                            </p>
                            <div className="flex flex-col gap-4">
                                <p className="text-[#010D3D] text-base">También puedes contactarnos directamente en:</p>
                                <a href="mailto:info@institutodeinnovacion.es"
                                    className="flex items-center gap-3 text-[#010D3D] text-xl font-bold hover:opacity-70 transition">
                                    <FontAwesomeIcon icon={faEnvelope} />
                                    <span className="underline underline-offset-4">info@institutodeinnovacion.es</span>
                                </a>
                                <a href="tel:953190510"
                                    className="flex items-center gap-3 text-[#010D3D] text-xl font-bold hover:opacity-70 transition">
                                    <FontAwesomeIcon icon={faPhone} />
                                    <span>953 19 05 10</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {oficinas.map((oficina) => (
                        <div key={oficina.ciudad} className="flex flex-col gap-3">
                            <h3 className="text-[#010D3D] text-2xl font-black">{oficina.ciudad}</h3>
                            <div className="w-full h-52 rounded-xl overflow-hidden">
                                <iframe
                                    src={oficina.mapSrc}
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                />
                            </div>
                            <div className="text-center">
                                <p className="text-[#010D3D] text-sm">{oficina.direccion}</p>
                                <p className="text-[#010D3D] text-sm">{oficina.cp}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
};