'use client';

import React, { useEffect, useState } from "react";
import ImageLogoCliente from "@/components/shared/ImageLogoCliente";
import { LogoType } from "@/libs/logovars";
import ClientCarousel from "../shared/ClientCarousel";

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

const ClientCarouselWrapper: React.FC<ClientCarouselProps> = ({ scope, claim }) => {
  const [clientes, setClientes] = useState<Cliente[]>([]);

  return (
    <section className="max-w-7xl mx-auto w-full px-6 py-12 flex flex-col-reverse lg:flex-row items-center justify-between gap-8">
        <ClientCarousel scope={scope} claim={claim} />
    </section>
)

}
export default ClientCarouselWrapper;