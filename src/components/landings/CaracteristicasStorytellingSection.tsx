'use client';

import { useState, useRef, useEffect } from 'react';
import Formulario from "@/components/Formulario";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faFileLines,
    faBullhorn,
    faFileSignature,
    faBookLaw,
    faFileLock,
    faBell,
    faCalendarDays,
    faChartPie,
    faListTree,
    faBriefcase,
    faListCheck,
    faPaperPlane,
    faFileChartPie,
    faRobot,
    faListTimeline,
    faRectangleHistory,
    faLaptopMobile,
    faPencilPaintbrush,
    faChartBar,
    faTrophyStar,
    faMessagesQuestion,
    faLock,
    faTimelineArrow,
    faGrid2Plus,
    faPenToSquare,
    faTimer,
    faSirenOn,
    faTicketSimple,
    faCalendarClock,
    faClipboardListCheck,
    faFileChartColumn
} from '@fortawesome/pro-duotone-svg-icons';

const iconMap = {
    'fa-file-lines': faFileLines,
    'fa-bullhorn': faBullhorn,
    'fa-file-signature': faFileSignature,
    'fa-book-law': faBookLaw,
    'fa-file-lock': faFileLock,
    'fa-bell': faBell,
    'fa-calendar-days': faCalendarDays,
    'fa-list-tree': faListTree,
    'fa-chart-pie': faChartPie,
    'fa-briefcase': faBriefcase,
    'fa-list-check': faListCheck,
    'fa-paper-plane': faPaperPlane,
    'fa-file-chart-pie': faFileChartPie,
    'fa-robot': faRobot,
    'fa-list-time-line': faListTimeline,
    'fa-rectangle-history': faRectangleHistory,
    'fa-laptop-mobile': faLaptopMobile,
    'fa-pencil-paintbrush': faPencilPaintbrush,
    'fa-chart-bar': faChartBar,
    'fa-trophy-star': faTrophyStar,
    'fa-messages-question': faMessagesQuestion,
    'fa-lock': faLock,
    'fa-timeline-arrow': faTimelineArrow,
    'fa-grid-2-plus': faGrid2Plus,
    'fa-pen-to-square': faPenToSquare,
    'fa-timer': faTimer,
    'fa-siren-on': faSirenOn,
    'fa-ticket-simple': faTicketSimple,
    'fa-calendar-clock': faCalendarClock,
    'fa-clipboard-list-check': faClipboardListCheck,
    'fa-file-chart-column': faFileChartColumn
} as const;

type IconName = keyof typeof iconMap;

type Caracteristica = {
    id_data: number;
    title: string;
    icon?: IconName;
    iconImg?: string;
    mainTitle: string;
    subtitle: string;
    description: string;
    img: string;
};

type Props = {
    data: Caracteristica[];
};

const CaracteristicasStorytellingSection = ({ data }: Props) => {
    const stickyRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [currentStep, setCurrentStep] = useState(0);

    useEffect(() => {
        const onScroll = () => {
            if (window.innerWidth < 1024) return;
            if (!containerRef.current || !stickyRef.current) return;

            const containerTop = containerRef.current.getBoundingClientRect().top;
            const stepHeight = window.innerHeight;
            const offset = -containerTop;
            const totalHeight = stepHeight * data.length;

            if (offset >= 0 && offset < totalHeight) {
                const newStep = Math.floor(offset / stepHeight);
                setCurrentStep((prev) => (prev === newStep ? prev : newStep));
            }
        };

        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, [data.length]);

    const [openModal, setOpenModal] = useState(false);

    const getIconByName = (iconName?: string) => {
        if (iconName && iconName in iconMap) {
            return iconMap[iconName as IconName];
        }

        return faFileLines;
    };

    return (
        <section className="mx-auto flex w-full max-w-7xl flex-col items-center justify-center py-8 sm:py-10 lg:py-12">
            <div className="w-full px-4 sm:px-6 lg:hidden">
                <div className="mb-4 flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                    {data.map((item, i) => (
                        <button
                            key={item.id_data}
                            onClick={() => setCurrentStep(i)}
                            className={`flex min-w-[120px] flex-col items-center justify-between rounded-xl p-3 text-sm transition-all ${
                                currentStep === i
                                    ? 'bg-[#010d3d] text-white'
                                    : 'bg-[#f2f2f5] text-[#010d3d]'
                            }`}
                        >
                            {item.iconImg ? (
                                <img
                                    src={`/apps/${item.iconImg}`}
                                    alt={item.title}
                                    className="h-8 w-8 object-contain"
                                />
                            ) : (
                                <FontAwesomeIcon
                                    icon={getIconByName(item.icon)}
                                    size="lg"
                                    className={`${currentStep === i ? 'fa-duotone text-gray-300' : ''}`}
                                />
                            )}
                            <span className="mt-2 text-center text-xs">{item.title}</span>
                        </button>
                    ))}
                </div>

                <div className="rounded-2xl bg-white p-4 shadow-sm sm:p-6">
                    <img
                        src={`/apps/captures/${data[currentStep].img}`}
                        alt={data[currentStep].mainTitle}
                        className="w-full rounded-xl shadow-xl"
                    />

                    <div className="mt-5 text-center text-[#010d3d]">
                        <h2 className="text-2xl font-black sm:text-[30px]">{data[currentStep].mainTitle}</h2>
                        {data[currentStep].subtitle && (
                            <h3 className="mb-4 mt-2 text-lg font-extrabold sm:text-xl">{data[currentStep].subtitle}</h3>
                        )}
                        <p className="whitespace-pre-line text-sm leading-relaxed sm:text-base">{data[currentStep].description}</p>
                    </div>

                    <div className="mt-6 text-center">
                        <button
                            onClick={() => setOpenModal(true)}
                            className="w-full rounded-xl bg-[#010d3d] px-6 py-3 font-bold text-white transition hover:bg-[#04176f] sm:w-auto"
                        >
                            Quiero una demostracion
                        </button>
                    </div>
                </div>
            </div>

            <div
                ref={containerRef}
                className="relative hidden w-full lg:block"
                style={{ height: `${data.length * 100}vh` }}
            >
                <div
                    ref={stickyRef}
                    className="sticky top-20 z-10 flex h-screen flex-col items-center justify-start"
                >
                    {/* Tabs */}
                    <div className="z-20 flex w-full justify-center gap-4 overflow-x-auto bg-white px-4 py-4 scrollbar-hide">
                        {data.map((item, i) => (
                            <div
                                key={item.id_data}
                                onClick={() => setCurrentStep(i)}
                                className={`flex min-w-[135px] max-w-[135px] cursor-pointer flex-col items-center justify-between rounded-xl p-4 font-extrabold transition-all
                                    ${currentStep === i
                                        ? ' text-white bg-[#010d3d] border-[#010d3d]'
                                        : ' text-[#010d3d] bg-[#f2f2f5] hover:text-white hover:bg-[#333333]'
                                    }`}
                            >
                                {item.iconImg ? (
                                    <img
                                        src={`/apps/${item.iconImg}`}
                                        alt={item.title}
                                        className="h-10 w-10 object-contain"
                                    />
                                ) : (
                                    <FontAwesomeIcon
                                        icon={getIconByName(item.icon)}
                                        size="3x"
                                        className={`${currentStep === i ? 'fa-duotone text-gray-300' : ''}`}
                                    />
                                )}
                                <span className="mt-1 text-center text-sm">{item.title}</span>
                            </div>
                        ))}
                    </div>

                    {/* Bloque storytelling */}
                    <div className="w-full max-w-7xl px-6 py-5">
                        <div className="grid grid-cols-3 gap-6">
                            <div className="col-span-2 flex items-center justify-center">
                                <img
                                    src={`/apps/captures/${data[currentStep].img}`}
                                    alt={data[currentStep].mainTitle}
                                    className="w-full max-w-[700px] rounded-xl shadow-xl"
                                />
                            </div>

                            <div className="col-span-1 flex flex-col justify-center text-center text-[#010d3d] lg:text-left">
                                <h2 className="text-[32px] font-black">
                                    {data[currentStep].mainTitle}
                                </h2>
                                {data[currentStep].subtitle && (
                                    <h3 className="mb-4 mt-2 text-[22px] font-extrabold">
                                        {data[currentStep].subtitle}
                                    </h3>
                                )}
                                <p className="whitespace-pre-line text-lg leading-relaxed">
                                    {data[currentStep].description}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="mt-8 text-center">
                        <button
                            onClick={() => setOpenModal(true)}
                            className="rounded-xl bg-[#010d3d] px-6 py-3 font-bold text-white shadow-md transition hover:bg-[#04176f]"
                        >
                            Quiero una demostracion
                        </button>
                    </div>
                </div>
            </div>

            {/* Formulario contacto */}
            {openModal && (
                <Formulario onClose={() => setOpenModal(false)} />
            )}
        </section>
    );
};

export default CaracteristicasStorytellingSection;
