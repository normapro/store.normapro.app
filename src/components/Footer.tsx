"use client";
import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab,faLinkedin,faYoutube } from "@fortawesome/free-brands-svg-icons";


const Footer = () => {
  return (
    <footer className=" py-10 mt-10">
    <div className="bg-[#010D3D] text-white">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-12 gap-8">
        {/* Logo y enlaces */}
        <div className="col-span-3 flex flex-col space-y-4">
          <Image src="/cropped-NormaPro_red.png" alt="NormaPro Logo" width={100} height={100} />
          <p className="text-sm opacity-70">NormaPro® es una marca registrada por Instituto de Innovación, Ciencia y Empresa</p>
        </div>

        {/* Sección de navegación */}
        <div className="col-span-6 grid grid-cols-2 gap-4">
          <div>
            <h3 className="font-bold mb-3">Soluciones</h3>
            <ul className="space-y-2">
              <li><Link href="/soluciones">Soluciones</Link></li>
              <li><Link href="/formacion">Formación</Link></li>
              <li><Link href="/historias">Historias con clientes</Link></li>
              <li><Link href="/actualidad">Actualidad</Link></li>
              <li><Link href="/informes">Informes</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-3">Información</h3>
            <ul className="space-y-2">
              <li><Link href="/nosotros">Quiénes somos</Link></li>
              <li><Link href="/partners">Programa de Partners</Link></li>
              <li><Link href="/trabaja">Trabaja en NormaPro</Link></li>
              <li><Link href="/politicas">Políticas</Link></li>
              <li><Link href="/contacto">Contacto</Link></li>
            </ul>
          </div>
        </div>

        {/* Redes Sociales */}
        <div className="col-span-3 flex flex-col space-y-4 items-end">
          <h3 className="font-bold">Síguenos en</h3>
          <div className="flex space-x-4">
            <Link href="https://www.linkedin.com" target="_blank">
              
              <FontAwesomeIcon icon={faLinkedin} className="w-6 h-6" />
            </Link>
            <Link href="https://www.youtube.com" target="_blank">
               <FontAwesomeIcon icon={faYoutube} className="w-6 h-6" />              
            </Link>
          </div>
        </div>
      </div>
    </div>
    <div>
      {/* Logos de certificaciones */}
      <div className="max-w-7xl mx-auto px-6 mt-10 grid grid-cols-5 gap-6 items-center">
        <Image src="/LOGO-AENOR-CALIDAD-ISO-9001.png" alt="AENOR ISO 9001" width={120} height={60} />
        <Image src="/Marca-ER-ISO-45001-INF.webp" alt="AENOR ISO 45001" width={120} height={60} />
        <Image src="/Marca-ER-Segur_Info_27001_INF-Logo-de-Seguridad-informacion.jpeg" alt="AENOR ISO 27001" width={120} height={60} />
        <Image src="/IQnet-logo-4E8976D382-seeklogo.com_.webp" alt="IQNet" width={120} height={60} />
        <Image src="/qaec.png" alt="Asociación Española para la Calidad" width={120} height={60} />
      </div>

      {/* Aviso legal */}
      <div className="max-w-7xl mx-auto px-6 mt-6 text-center text-sm opacity-70">
        <p>
          <Link href="/aviso-legal">Aviso Legal</Link> | <Link href="/privacidad">Política de privacidad</Link> | <Link href="/cookies">Política de cookies</Link>
        </p>
      </div>
      </div>
    </footer>
  );
};

export default Footer;