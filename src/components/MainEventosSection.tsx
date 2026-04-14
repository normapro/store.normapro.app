'use client'

import { Evento } from "@/types/evento";
import { useEffect, useState } from "react";
import API_ENDPOINTS from "@/config/api";

const MainEventosSection = () => {
    const [eventos, setEventos] = useState<Evento[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchEventos = async () => {
            try {
                const response = await fetch(API_ENDPOINTS.EVENTOS);
                if (!response.ok) throw new Error("Error al obtener los eventos");
                const data = await response.json();
                setEventos(data);
            } catch (err) {
                console.error("Error al cargar los eventos:", err);
                setEventos([]);
            } finally {
                setIsLoading(false);
            }
        };

        fetchEventos();
    }, []);

    // Función para formatear la fecha
    const formatEventDate = (dateString: string) => {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = date.toLocaleString('es-ES', { month: 'short' }).toUpperCase().replace('.', '');
        const time = date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
        return { day, month, time };
    };

    if (isLoading) return null;

    return (
        <section className="w-full max-w-7xl mx-auto py-16 px-6">
            <h2 className="text-3xl font-black text-[#010d3d] mb-12">
                Próximos webinars y eventos
            </h2>

            {isLoading ? (
                <p className="text-[#010d3d]">Cargando eventos...</p>
            ) : eventos.length === 0 ? (
                <p className="text-[#010d3d] text-lg font-semibold">
                    No hay eventos programados en este momento.
                </p>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {eventos.map((evento) => {
                        const { day, month, time } = formatEventDate(evento.fecha);

                        return (
                            <div key={evento.id_evento} className="flex flex-col md:flex-row gap-6 items-start">

                                {/* Tarjeta de Fecha */}
                                <div className="bg-[#1a2344] text-white w-full md:w-64 aspect-square rounded-2xl flex flex-col items-center justify-center shadow-lg shrink-0">
                                    <span className="text-7xl font-black leading-none">{day}</span>
                                    <span className="text-3xl font-bold text-gray-400 mt-1 uppercase">{month}</span>
                                    <div className="w-20 h-[2px] bg-gray-500 my-4 opacity-50"></div>
                                    <span className="text-3xl font-bold text-gray-400">{time}</span>
                                </div>

                                {/* Contenido del Evento */}
                                <div className="flex flex-col h-full py-2">
                                    <h3 className="text-lg font-black text-[#010d3d] mb-4 leading-tight">
                                        {evento.title}
                                    </h3>
                                    <p className="text-[#010d3d] text-base font-medium leading-relaxed mb-6 line-clamp-4">
                                        {evento.description}
                                    </p>

                                    {/* Botón con degradado */}
                                    <button className="mt-auto self-start bg-gradient-to-r from-[#00B2E3] to-[#CCA1DD] text-white font-bold py-3 px-8 rounded-xl hover:opacity-90 transition-opacity shadow-md">
                                        Reserva tu plaza
                                    </button>
                                </div>

                            </div>
                        );
                    })}
                </div>
            )}
        </section>
    );
};

export default MainEventosSection;