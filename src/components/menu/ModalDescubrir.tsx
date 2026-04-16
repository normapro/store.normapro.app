"use client";

import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { Sector } from "@/types/sector";
import API_ENDPOINTS from "@/config/api";
import Link from "next/link";

interface ModalDescubrirProps {
    isOpen: boolean;
    onClose: () => void;
}

const ModalDescubrir = ({ isOpen, onClose }: ModalDescubrirProps) => {
    const [step, setStep] = useState(1);
    const [sectores, setSectores] = useState<Sector[]>([]);
    const [isLoadingSectores, setIsLoadingSectores] = useState(false);
    const [selectedSlug, setSelectedSlug] = useState("");

    // Resetear al paso 1 cada vez que el modal se cierra o se abre de nuevo
    useEffect(() => {
        if (!isOpen) {
            const timer = setTimeout(() => setStep(1), 300); // Espera a que termine la animación de salida
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    // Cargar sectores en paso 2
    useEffect(() => {
        if (step === 2) {
            const fetchSectores = async () => {
                setIsLoadingSectores(true);
                try {
                    const response = await fetch(API_ENDPOINTS.SECTORES);
                    if (!response.ok) throw new Error("Error al obtener sectores");
                    const data = await response.json();
                    setSectores(data);
                } catch (err) {
                    console.error("Error cargando sectores:", err);
                } finally {
                    setIsLoadingSectores(false);
                }
            };
            fetchSectores();
        }
    }, [step]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div
                className="absolute inset-0 bg-slate-900/60 backdrop-blur-[2px]"
                onClick={onClose}
            />

            {/* Modal descubrir */}
            {step === 1 && (
                <div className="relative bg-[#020a31] w-full max-w-md rounded-[24px] p-6 md:p-10 shadow-2xl text-center border border-white/5 animate-in fade-in zoom-in duration-200">
                    <h2 className="text-white text-lg md:text-xl font-bold leading-tight mb-8 px-2">
                        Encuentra los productos específicos para tu empresa en 60 segundos
                    </h2>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
                        <button
                            onClick={onClose}
                            className="w-full sm:w-auto flex-1 bg-[#2d3656] hover:bg-[#3a4468] text-white font-bold py-3 px-4 rounded-xl transition-colors text-sm"
                        >
                            En otro momento
                        </button>
                        <button
                            onClick={() => setStep(2)} // cambio de modal
                            className="w-full sm:w-auto flex-1 bg-gradient-to-r from-[#00B2E3] to-[#CCA1DD] hover:brightness-110 text-white font-bold py-3 px-4 rounded-xl transition-all text-sm shadow-lg shadow-cyan-500/20"
                        >
                            Empezar
                        </button>
                    </div>
                </div>
            )}

            {/* Modal de sectores */}
            {step === 2 && (
                <div className="relative bg-white w-full max-w-lg rounded-[20px] p-8 shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-300">
                    <button
                        onClick={onClose}
                        className="absolute top-6 right-6 text-[#010d3d] hover:opacity-60 transition-opacity"
                    >
                        <FontAwesomeIcon icon={faXmark} className="text-2xl" />
                    </button>

                    <h2 className="text-[#010d3d] text-2xl font-black mb-8 pr-8">
                        Productos para tu empresa
                    </h2>

                    <div className="space-y-6 text-left">
                        <div>
                            <label className="block text-[#010d3d] text-[17px] font-bold mb-3">
                                ¿Qué tamaño tiene tu empresa?
                            </label>
                            <div className="relative">
                                <select className="w-full appearance-none bg-white border border-slate-200 rounded-xl py-3.5 px-4 text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/10 cursor-pointer">
                                    <option>Selecciona un número de empleados</option>
                                    <option>1-10 empleados</option>
                                    <option>11-50 empleados</option>
                                    <option>+50 empleados</option>
                                </select>
                                <FontAwesomeIcon icon={faChevronDown} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none text-sm" />
                            </div>
                        </div>

                        <div>
                            <label className="block text-[#010d3d] font-bold mb-3">¿A qué sector se dedica?</label>
                            <div className="relative">
                                <select
                                    value={selectedSlug}
                                    onChange={(e) => setSelectedSlug(e.target.value)}
                                    className="w-full appearance-none bg-white border border-slate-200 rounded-xl py-3.5 px-4"
                                >
                                    <option value="">Selecciona un sector</option>
                                    {sectores.map((s) => (
                                        <option key={s.id_sector} value={s.slug}>{s.description}</option>
                                    ))}
                                </select>
                                <FontAwesomeIcon icon={faChevronDown} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
                            </div>
                        </div>

                        {selectedSlug ? (
                            <Link
                                href={`/soluciones/gestion-de-calidad/sector/${selectedSlug}`}
                                onClick={onClose} // Cerramos el modal al navegar
                                className="inline-block bg-[#010d3d] text-white font-bold py-3.5 px-10 rounded-xl hover:bg-[#011640] transition-colors mt-4 text-center"
                            >
                                Ver productos
                            </Link>
                        ) : (
                            <button
                                disabled
                                className="bg-slate-300 text-white font-bold py-3.5 px-10 rounded-xl mt-4 cursor-not-allowed"
                            >
                                Ver productos
                            </button>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ModalDescubrir;