'use client'

import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import API_ENDPOINTS from '@/config/api';

type Props = {
    isOpen: boolean;
    onClose: () => void;
    initialEmail?: string;
    tituloInforme?: string;
    imagenInforme?: string | null;
}

type FormValues = {
    nombre: string;
    apellidos: string;
    empresa: string;
    cargo: string;
    pais: string;
    empleados: string;
    telefono: string;
    email: string;
    politica: boolean;
    demo: boolean;
}

type FormErrors = Partial<Record<keyof FormValues, string>>;

const initialValues: FormValues = {
    nombre: '',
    apellidos: '',
    empresa: '',
    cargo: '',
    pais: '',
    empleados: '',
    telefono: '',
    email: '',
    politica: false,
    demo: false,
};

const DescargaInformeModal = ({
    isOpen,
    onClose,
    initialEmail = '',
    tituloInforme,
    imagenInforme,
}: Props) => {
    const [values, setValues] = useState<FormValues>(initialValues);
    const [errors, setErrors] = useState<FormErrors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitMessage, setSubmitMessage] = useState<string | null>(null);

    useEffect(() => {
        if (!isOpen) return;

        setValues({
            ...initialValues,
            email: initialEmail.trim(),
        });
        setErrors({});
        setSubmitMessage(null);
    }, [isOpen, initialEmail]);

    const validate = (data: FormValues): FormErrors => {
        const nextErrors: FormErrors = {};

        if (!data.nombre.trim()) nextErrors.nombre = 'Este campo es obligatorio';
        if (!data.apellidos.trim()) nextErrors.apellidos = 'Este campo es obligatorio';
        if (!data.empresa.trim()) nextErrors.empresa = 'Este campo es obligatorio';
        if (!data.cargo.trim()) nextErrors.cargo = 'Este campo es obligatorio';
        if (!data.pais.trim()) nextErrors.pais = 'Este campo es obligatorio';
        if (!data.empleados.trim()) nextErrors.empleados = 'Este campo es obligatorio';
        if (!data.telefono.trim()) nextErrors.telefono = 'Este campo es obligatorio';
        if (!data.email.trim()) nextErrors.email = 'Este campo es obligatorio';
        if (!data.politica) nextErrors.politica = 'Debes aceptar la politica de privacidad';

        return nextErrors;
    };

    const handleFieldChange = (
        event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const target = event.target;
        const { name } = target;
        const value = target instanceof HTMLInputElement && target.type === 'checkbox'
            ? target.checked
            : target.value;

        setValues((prev) => ({
            ...prev,
            [name]: value,
        }));

        setErrors((prev) => {
            if (!prev[name as keyof FormErrors]) return prev;
            const next = { ...prev };
            delete next[name as keyof FormErrors];
            return next;
        });
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setSubmitMessage(null);

        const nextErrors = validate(values);
        setErrors(nextErrors);

        if (Object.keys(nextErrors).length > 0) return;

        setIsSubmitting(true);
        try {
            const origen_ruta = `${window.location.pathname}${window.location.search}`;
            const response = await fetch(API_ENDPOINTS.LEADS, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nombre: values.nombre,
                    apellidos: values.apellidos,
                    empresa: values.empresa,
                    cargo: values.cargo,
                    pais: values.pais,
                    n_empleados: values.empleados,
                    telefono: values.telefono,
                    email: values.email,
                    acepta_marketing: false,
                    acepta_contacto: values.demo,
                    acepta_politica: values.politica,
                    origen_ruta,
                }),
            });

            if (!response.ok) {
                const errorBody = await response.json().catch(() => null);
                const apiMessage =
                    typeof errorBody?.error === 'string'
                        ? errorBody.error
                        : 'No se pudo enviar el formulario';
                throw new Error(apiMessage);
            }

            onClose();
            setValues(initialValues);
        } catch (error) {
            const message =
                error instanceof Error
                    ? error.message
                    : 'No se pudo enviar. Intentalo de nuevo en unos minutos.';
            setSubmitMessage(message);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-[#010d3d]/45 px-4 py-6 sm:items-center"
            onClick={onClose}
        >
            <div
                className="relative my-auto w-full max-w-[980px] overflow-hidden rounded-2xl sm:rounded-[28px] bg-[#f3f3f7] shadow-2xl"
                onClick={(event) => event.stopPropagation()}
            >
                <button
                    type="button"
                    aria-label="Cerrar"
                    onClick={onClose}
                    className="absolute top-3 right-3 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-[#c8ccdb] bg-white text-base font-bold leading-none text-[#19264f] transition-colors hover:bg-[#e8eaf2]"
                >
                    ✕
                </button>

                <div className="flex min-h-0 md:min-h-[640px]">

                    <div className="hidden md:flex w-[280px] lg:w-[330px] shrink-0 items-center justify-center bg-[#dedfe5] p-8">
                        <div className="flex h-[420px] w-[240px] lg:w-[260px] flex-col justify-between rounded-sm bg-white p-6 shadow-[0_8px_30px_rgba(12,22,59,0.15)]">
                            <div>
                                {imagenInforme ? (
                                    <img
                                        src={imagenInforme}
                                        alt={tituloInforme || 'Informe'}
                                        className="mb-6 h-56 w-full rounded-[14px] bg-[#f3f3f7] object-contain"
                                    />
                                ) : (
                                    <div className="mb-6 h-24 w-full rounded-[24px] bg-gradient-to-r from-[#47d7c5] to-[#1f9ed8]" />
                                )}
                                <p className="mb-6 text-center text-base font-semibold text-[#141f49] line-clamp-4">
                                    {tituloInforme || 'Informe completo'}
                                </p>
                            </div>
                            <div className="text-right text-xs font-bold text-[#1f2f67]">NormaPro</div>
                        </div>
                    </div>

                    <div className="flex-1 bg-white p-5 sm:p-6 md:p-8">
                        <div className="mb-5 h-16 w-full rounded-2xl bg-gradient-to-r from-[#47d7c5] to-[#1f9ed8] md:hidden" />
                        <h3 className="mb-2 text-2xl sm:text-3xl font-extrabold leading-tight text-[#1a274e] pr-8">
                            Descarga el informe {tituloInforme || 'completo'}
                        </h3>
                        <p className="mb-5 sm:mb-6 text-base sm:text-lg text-[#5e6786]">
                            Rellena este formulario y recibe en tu email este informe de manera gratuita.
                        </p>

                        <form className="space-y-4" onSubmit={handleSubmit}>
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <label className="text-left text-sm sm:text-base font-semibold text-[#1b2a53]">
                                    Nombre
                                    <input
                                        name="nombre"
                                        value={values.nombre}
                                        onChange={handleFieldChange}
                                        className="mt-1 h-11 w-full rounded-xl border border-[#ccd1df] bg-white px-3 text-sm sm:text-base"
                                        placeholder="Introduce tu nombre"
                                    />
                                    {errors.nombre && <span className="mt-1 block text-sm text-[#b42318]">{errors.nombre}</span>}
                                </label>

                                <label className="text-left text-sm sm:text-base font-semibold text-[#1b2a53]">
                                    Apellidos
                                    <input
                                        name="apellidos"
                                        value={values.apellidos}
                                        onChange={handleFieldChange}
                                        className="mt-1 h-11 w-full rounded-xl border border-[#ccd1df] bg-white px-3 text-sm sm:text-base"
                                        placeholder="Introduce tus apellidos"
                                    />
                                    {errors.apellidos && <span className="mt-1 block text-sm text-[#b42318]">{errors.apellidos}</span>}
                                </label>

                                <label className="text-left text-sm sm:text-base font-semibold text-[#1b2a53]">
                                    Empresa
                                    <input
                                        name="empresa"
                                        value={values.empresa}
                                        onChange={handleFieldChange}
                                        className="mt-1 h-11 w-full rounded-xl border border-[#ccd1df] bg-white px-3 text-sm sm:text-base"
                                        placeholder="Nombre de tu empresa"
                                    />
                                    {errors.empresa && <span className="mt-1 block text-sm text-[#b42318]">{errors.empresa}</span>}
                                </label>

                                <label className="text-left text-sm sm:text-base font-semibold text-[#1b2a53]">
                                    Cargo en la empresa
                                    <input
                                        name="cargo"
                                        value={values.cargo}
                                        onChange={handleFieldChange}
                                        className="mt-1 h-11 w-full rounded-xl border border-[#ccd1df] bg-white px-3 text-sm sm:text-base"
                                        placeholder="Introduce tu cargo"
                                    />
                                    {errors.cargo && <span className="mt-1 block text-sm text-[#b42318]">{errors.cargo}</span>}
                                </label>

                                <label className="text-left text-sm sm:text-base font-semibold text-[#1b2a53]">
                                    País
                                    <input
                                        name="pais"
                                        value={values.pais}
                                        onChange={handleFieldChange}
                                        className="mt-1 h-11 w-full rounded-xl border border-[#ccd1df] bg-white px-3 text-sm sm:text-base"
                                        placeholder="Introduce tu país"
                                    />
                                    {errors.pais && <span className="mt-1 block text-sm text-[#b42318]">{errors.pais}</span>}
                                </label>

                                <label className="text-left text-sm sm:text-base font-semibold text-[#1b2a53]">
                                    Número de empleados
                                    <select
                                        name="empleados"
                                        value={values.empleados}
                                        onChange={handleFieldChange}
                                        className="mt-1 h-11 w-full rounded-xl border border-[#ccd1df] bg-white px-3 text-sm sm:text-base text-[#5e6786]"
                                    >
                                        <option value="">Selecciona un rango</option>
                                        <option value="1-10">1 - 10</option>
                                        <option value="11-50">11 - 50</option>
                                        <option value="51-200">51 - 200</option>
                                        <option value="200+">Más de 200</option>
                                    </select>
                                    {errors.empleados && <span className="mt-1 block text-sm text-[#b42318]">{errors.empleados}</span>}
                                </label>

                                <label className="text-left text-sm sm:text-base font-semibold text-[#1b2a53]">
                                    Teléfono
                                    <input
                                        name="telefono"
                                        value={values.telefono}
                                        onChange={handleFieldChange}
                                        className="mt-1 h-11 w-full rounded-xl border border-[#ccd1df] bg-white px-3 text-sm sm:text-base"
                                        placeholder="Introduce tu teléfono"
                                    />
                                    {errors.telefono && <span className="mt-1 block text-sm text-[#b42318]">{errors.telefono}</span>}
                                </label>

                                <label className="text-left text-sm sm:text-base font-semibold text-[#1b2a53]">
                                    Email
                                    <input
                                        name="email"
                                        value={values.email}
                                        onChange={handleFieldChange}
                                        className="mt-1 h-11 w-full rounded-xl border border-[#ccd1df] bg-white px-3 text-sm sm:text-base"
                                        placeholder="Introduce tu email"
                                    />
                                    {errors.email && <span className="mt-1 block text-sm text-[#b42318]">{errors.email}</span>}
                                </label>
                            </div>

                            {submitMessage && (
                                <p className="text-left text-sm text-[#b42318]">{submitMessage}</p>
                            )}

                            <label className="flex items-start gap-2 text-left text-sm sm:text-base text-[#1b2a53]">
                                <input
                                    type="checkbox"
                                    name="politica"
                                    checked={values.politica}
                                    onChange={handleFieldChange}
                                    className="mt-1 h-4 w-4 shrink-0 rounded border-[#ccd1df]"
                                />
                                Acepto la política de privacidad, términos y condiciones, y el tratamiento de mis datos personales.
                            </label>
                            {errors.politica && <p className="text-left text-sm text-[#b42318]">{errors.politica}</p>}

                            <label className="flex items-start gap-2 text-left text-sm sm:text-base text-[#1b2a53]">
                                <input
                                    type="checkbox"
                                    name="demo"
                                    checked={values.demo}
                                    onChange={handleFieldChange}
                                    className="mt-1 h-4 w-4 shrink-0 rounded border-[#ccd1df]"
                                />
                                Me gustaría que un técnico se pusiera en contacto conmigo para acordar una reunión demostrativa.
                            </label>

                            <div className="pt-2 text-center">
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full sm:w-auto rounded-xl bg-[#010d3d] px-10 py-3 text-base sm:text-lg font-bold text-white transition-colors hover:bg-[#04176f]"
                                >
                                    {isSubmitting ? 'Enviando...' : 'Enviar'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DescargaInformeModal;