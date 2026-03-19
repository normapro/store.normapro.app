// components/MainConsultoriaSection.tsx
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Consultoria } from "@/types/consultoria";
import API_ENDPOINTS from "@/config/api";

const ConsultoriaDropdown = () => {
    const [consultorias, setConsultorias] = useState<Consultoria[]>([]);

    useEffect(() => {
        const fetchConsultorias = async () => {
            const response = await fetch(`${API_ENDPOINTS.CONSULTORIA}`);
            const data = await response.json();
            setConsultorias(data);
        };

        fetchConsultorias();
    }, []);

    return (
        <div className="absolute w-screen bg-[#f8f8fa] shadow-md z-50 p-8 w-full rounded-lg">
            <section className="max-w-7xl mx-auto px-6 py-12">
                <h2 className="text-2xl font-bold text-[#010D3D] mb-4">Consultoría estratégica</h2>
                

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {consultorias.map((consultoria) => (
                        <a
                            key={consultoria.id_consultoria}
                            href={`/soluciones/${consultoria.slug}`}    
                            className="bg-[#FFFFFF] p-6 rounded-xl text-[#010D3D] relative grid grid-cols-3 gap-4 block"
                        >
                            <Image
                                src={consultoria.uriIcon ? `/main/${consultoria.uriIcon}` : "/main/default-icon.png"}
                                alt={consultoria.description}
                                width={280}
                                height={199}
                                className="mx-auto object-contain col-span-1"
                            />
                            <div className="col-span-2">
                                <h3 className="text-[16px] font-extrabold mb-2 ">{consultoria.description}</h3>
                                {/* <p className="text-sm mb-6">{consultoria.shortDescription}</p> */}
                                
                            </div>
                        </a>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default ConsultoriaDropdown;
