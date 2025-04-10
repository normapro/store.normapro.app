'use client';

import React, { useEffect, useState } from "react";
import ImageLogoCliente from "@/components/shared/ImageLogoCliente";
import { LogoType } from "@/libs/logovars";

type Cliente = {
  id_cliente: number;
  description: string;
  url: string;
  logo: string;
  logoType: LogoType;
};

type ClientCarouselProps = {
  scope: string;
  claim: string;
};

const ClientCarousel: React.FC<ClientCarouselProps> = ({ scope, claim }) => {
  const [clientes, setClientes] = useState<Cliente[]>([]);

  useEffect(() => {
    fetch(`http://localhost:3010/v1/store/clientes?maxItems=100&scope=${scope}`)
      .then((res) => res.json())
      .then(setClientes)
      .catch(console.error);
  }, [scope]);

  // Duplicamos para efecto de loop continuo
  const logos = [...clientes, ...clientes, ...clientes, ...clientes, ...clientes];

  return (
    <section className="mx-auto  py-12 text-center border-t border-gray-200 overflow-hidden">
      <h3 className="text-gray-500 mb-6 font-semibold text-lg">{claim}</h3>

      <div className="relative w-full overflow-hidden">
        <div className="flex w-[200%] animate-slide">
          {logos.map((cliente, idx) => (
            <a
              key={`${cliente.id_cliente}-${idx}`}
              href={cliente.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex justify-center items-center px-[40px]"
            >
              <ImageLogoCliente
                logoName={cliente.logo}
                logoType={cliente.logoType}
                clienteName={cliente.description}
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientCarousel;
