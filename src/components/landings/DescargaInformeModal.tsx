'use client'

import { ChangeEvent, FormEvent, useState } from 'react';

type Props = {
    isOpen: boolean;
    onClose: () => void;
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

const DescargaInformeModal = ({ isOpen, onClose }: Props) => {
    const [values, setValues] = useState<FormValues>(initialValues);
    const [errors, setErrors] = useState<FormErrors>({});

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

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const nextErrors = validate(values);
        setErrors(nextErrors);

        if (Object.keys(nextErrors).length > 0) return;

        // Placeholder: cuando integremos la logica real, se hara el submit al backend.
        onClose();
        setValues(initialValues);
    };

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-[#010d3d]/45 px-4 py-6 md:items-center max-w-7xl mx-auto rounded-xl"
            onClick={onClose}
        >
            <div
                className="relative my-auto w-full max-w-[980px] overflow-hidden rounded-[28px] bg-[#f3f3f7] shadow-2xl"
                onClick={(event) => event.stopPropagation()}
            >
                <button
                    type="button"
                    aria-label="Cerrar"
                    onClick={onClose}
                    className="z-20 flex h-9 w-9 items-center justify-center rounded-full border border-[#c8ccdb] bg-white text-base font-bold leading-none text-[#19264f] transition-colors hover:bg-[#e8eaf2]"
                    style={{ position: 'absolute', top: 16, right: 16 }}
                >
                    X
                </button>

                <div className="flex min-h-[640px] max-w mx-auto">
                    <div className="flex min-h-[640px] w-[330px] shrink-0 items-center justify-center bg-[#dedfe5] p-8">
                        <div className="flex h-[420px] w-[260px] flex-col justify-between rounded-sm bg-white p-6 shadow-[0_8px_30px_rgba(12,22,59,0.15)]">
                            <div>
                                <div className="mb-6 h-24 w-full rounded-[24px] bg-gradient-to-r from-[#47d7c5] to-[#1f9ed8]" />
                                <p className="mb-6 text-center text-base font-semibold text-[#141f49]">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                </p>
                            </div>
                            <div className="text-right text-xs font-bold text-[#1f2f67]">NormaPro</div>
                        </div>
                    </div>

                    <div className="min-h-[640px] flex-1 bg-white p-6 md:p-8 max-w-4xl mx-auto">
                        <h3 className="mb-2 text-3xl font-extrabold leading-tight text-[#1a274e]">
                            Descarga el Informe Lorem ipsum dolor sit amet
                        </h3>
                        <p className="mb-6 text-lg text-[#5e6786]">
                            Rellena este formulario y recibe en tu email este informe de manera gratuita.
                        </p>

                        <form className="space-y-4 " onSubmit={handleSubmit}>
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <label className="text-left text-base font-semibold text-[#1b2a53]">
                                    Nombre
                                    <input
                                        name="nombre"
                                        value={values.nombre}
                                        onChange={handleFieldChange}
                                        className="mt-1 h-11 w-full rounded-xl border border-[#ccd1df] bg-white px-3"
                                        placeholder="Introduce tu nombre"
                                    />
                                    {errors.nombre && <span className="mt-1 block text-sm text-[#b42318]">{errors.nombre}</span>}
                                </label>
                                <label className="text-left text-base font-semibold text-[#1b2a53]">
                                    Introduce tus apellidos
                                    <input
                                        name="apellidos"
                                        value={values.apellidos}
                                        onChange={handleFieldChange}
                                        className="mt-1 h-11 w-full rounded-xl border border-[#ccd1df] bg-white px-3"
                                        placeholder="Nombre"
                                    />
                                    {errors.apellidos && <span className="mt-1 block text-sm text-[#b42318]">{errors.apellidos}</span>}
                                </label>
                                <label className="text-left text-base font-semibold text-[#1b2a53]">
                                    Empresa
                                    <input
                                        name="empresa"
                                        value={values.empresa}
                                        onChange={handleFieldChange}
                                        className="mt-1 h-11 w-full rounded-xl border border-[#ccd1df] bg-white px-3"
                                        placeholder="Nombre de tu empresa"
                                    />
                                    {errors.empresa && <span className="mt-1 block text-sm text-[#b42318]">{errors.empresa}</span>}
                                </label>
                                <label className="text-left text-base font-semibold text-[#1b2a53]">
                                    Cargo en la empresa
                                    <input
                                        name="cargo"
                                        value={values.cargo}
                                        onChange={handleFieldChange}
                                        className="mt-1 h-11 w-full rounded-xl border border-[#ccd1df] bg-white px-3"
                                        placeholder="Introduce tu cargo"
                                    />
                                    {errors.cargo && <span className="mt-1 block text-sm text-[#b42318]">{errors.cargo}</span>}
                                </label>
                                <label className="text-left text-base font-semibold text-[#1b2a53]">
                                    Pais
                                    <input
                                        name="pais"
                                        value={values.pais}
                                        onChange={handleFieldChange}
                                        className="mt-1 h-11 w-full rounded-xl border border-[#ccd1df] bg-white px-3"
                                        placeholder="Introduce tu pais"
                                    />
                                    {errors.pais && <span className="mt-1 block text-sm text-[#b42318]">{errors.pais}</span>}
                                </label>
                                <label className="text-left text-base font-semibold text-[#1b2a53]">
                                    Numero de empleados
                                    <select
                                        name="empleados"
                                        value={values.empleados}
                                        onChange={handleFieldChange}
                                        className="mt-1 h-11 w-full rounded-xl border border-[#ccd1df] bg-white px-3 text-[#5e6786]"
                                    >
                                        <option value="">Selecciona un rango</option>
                                        <option value="1-10">1 - 10</option>
                                        <option value="11-50">11 - 50</option>
                                        <option value="51-200">51 - 200</option>
                                        <option value="200+">Mas de 200</option>
                                    </select>
                                    {errors.empleados && <span className="mt-1 block text-sm text-[#b42318]">{errors.empleados}</span>}
                                </label>
                                <label className="text-left text-base font-semibold text-[#1b2a53]">
                                    Telefono
                                    <input
                                        name="telefono"
                                        value={values.telefono}
                                        onChange={handleFieldChange}
                                        className="mt-1 h-11 w-full rounded-xl border border-[#ccd1df] bg-white px-3"
                                        placeholder="Introduce tu telefono"
                                    />
                                    {errors.telefono && <span className="mt-1 block text-sm text-[#b42318]">{errors.telefono}</span>}
                                </label>
                                <label className="text-left text-base font-semibold text-[#1b2a53]">
                                    Email
                                    <input
                                        name="email"
                                        value={values.email}
                                        onChange={handleFieldChange}
                                        className="mt-1 h-11 w-full rounded-xl border border-[#ccd1df] bg-white px-3"
                                        placeholder="Introduce tu email"
                                    />
                                    {errors.email && <span className="mt-1 block text-sm text-[#b42318]">{errors.email}</span>}
                                </label>
                            </div>

                            <label className="flex items-start gap-2 text-left text-base text-[#1b2a53]">
                                <input
                                    type="checkbox"
                                    name="politica"
                                    checked={values.politica}
                                    onChange={handleFieldChange}
                                    className="mt-1 h-4 w-4 rounded border-[#ccd1df]"
                                />
                                Acepto la politica de privacidad, terminos y condiciones, y el tratamiento de mis datos personales.
                            </label>
                            {errors.politica && <p className="text-left text-sm text-[#b42318]">{errors.politica}</p>}
                            <label className="flex items-start gap-2 text-left text-base text-[#1b2a53]">
                                <input
                                    type="checkbox"
                                    name="demo"
                                    checked={values.demo}
                                    onChange={handleFieldChange}
                                    className="mt-1 h-4 w-4 rounded border-[#ccd1df]"
                                />
                                Me gustaria que un tecnico se pusiera en contacto conmigo acordar una reunion demostrativa.
                            </label>

                            <div className="pt-2 text-center">
                                <button
                                    type="submit"
                                    className="rounded-xl bg-[#010d3d] px-10 py-3 text-lg font-bold text-white transition-colors hover:bg-[#04176f]"
                                >
                                    Enviar
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