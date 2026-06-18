"use client";
import { useEffect, useState } from "react";
import { Consultoria } from "@/types/consultoria";
import API_ENDPOINTS from "@/config/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

const ConsultoriaDropdownInstituto = () => {
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
        <div className="absolute bg-white shadow-md z-50 rounded-xl p-6 w-[320px]">
            <div className="flex flex-col gap-4">
                {consultorias.map((consultoria) => (
                    <a
                        key={consultoria.id_consultoria}
                        href={`https://store.normapro.es/consultorias/${consultoria.slug}?ref=instituto`}
                        target="_blank" rel="noopener noreferrer"
                        className="flex items-start gap-3 group"
                    >
                        <FontAwesomeIcon icon={faArrowRight} className="text-[#010D3D] mt-1 text-[14px]" />
                        <div>
                            <p className="font-extrabold text-[#010D3D] group-hover:text-[#00b2e3] transition-colors">{consultoria.description}</p>
                            <p className="text-sm text-gray-500">{consultoria.shortDescription}</p>
                        </div>
                    </a>
                ))}
            </div>
        </div>
    );
};

export default ConsultoriaDropdownInstituto;