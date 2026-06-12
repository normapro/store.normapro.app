'use client';

import { FormEvent, useState } from 'react';

type ContactFormData = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

const initialFormData: ContactFormData = {
  name: '',
  email: '',
  subject: '',
  message: '',
};

type Props = {
  variant?: 'default' | 'instituto';
}

const ContactoFormSection = ({ variant = 'default' }: Props) => {
  const [formData, setFormData] = useState<ContactFormData>(initialFormData);
  const [isSent, setIsSent] = useState(false);
  const isInstituto = variant === 'instituto';

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { name, email, subject, message } = formData;
    const isValid =
      name.trim().length > 0 &&
      email.trim().length > 0 &&
      subject.trim().length > 0 &&
      message.trim().length > 0;
    if (!isValid) return;
    setFormData(initialFormData);
    setIsSent(true);
  };

  const inputClass = isInstituto
    ? "w-full rounded border border-gray-300 bg-white px-3 py-2 text-sm text-[#010D3D] outline-none placeholder:text-gray-400 focus:ring-1 focus:ring-[#010D3D]"
    : "w-full rounded-xl border border-[#C5CBD8] bg-white px-4 py-4 text-[15px] text-[#001B5D] outline-none placeholder:text-[#8A93AA] focus:ring-2 focus:ring-[#00B2E3]";

  const labelClass = isInstituto
    ? "mb-1 block text-sm text-[#010D3D]"
    : "mb-2 block text-[15px] font-medium text-[#001B5D]";

  if (isInstituto) {
    return (
      <div className="bg-gray-100 rounded-2xl p-8 w-full flex flex-col gap-4">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className={labelClass}>Nombre</label>
            <input name="name" type="text" required placeholder="Nombre" value={formData.name}
              onChange={(e) => { setFormData(p => ({ ...p, name: e.target.value })); setIsSent(false); }}
              className={inputClass} />
          </div>
          <div className="flex flex-col gap-1">
            <label className={labelClass}>Email</label>
            <input name="email" type="email" required placeholder="Email" value={formData.email}
              onChange={(e) => { setFormData(p => ({ ...p, email: e.target.value })); setIsSent(false); }}
              className={inputClass} />
          </div>
          <div className="flex flex-col gap-1">
            <label className={labelClass}>Asunto</label>
            <input name="subject" type="text" required placeholder="Escribe el asunto de tu mensaje" value={formData.subject}
              onChange={(e) => { setFormData(p => ({ ...p, subject: e.target.value })); setIsSent(false); }}
              className={inputClass} />
          </div>
          <div className="flex flex-col gap-1">
            <label className={labelClass}>Mensaje</label>
            <textarea name="message" required rows={5} value={formData.message}
              onChange={(e) => { setFormData(p => ({ ...p, message: e.target.value })); setIsSent(false); }}
              className={`${inputClass} resize-none`} />
          </div>
          <div className="flex flex-col gap-2">
            <button type="submit"
              className="bg-[#010D3D] text-white font-bold px-6 py-2 rounded-lg w-fit hover:bg-[#04176f] transition text-sm">
              Enviar
            </button>
            {isSent && <p className="text-sm text-green-600"><span className="mr-1">✓</span>Envío realizado correctamente.</p>}
          </div>
        </form>
      </div>
    );
  }

  return (
    <section className="w-full px-6 py-14 md:px-10">
      <div className="mx-auto max-w-7xl rounded-[24px] bg-[#E7E7F0] px-6 py-10 md:px-14 md:py-16">
        <h2 className="text-center text-2xl font-black text-[#010d3d] md:text-4xl">Contáctanos</h2>
        <p className="mx-auto mt-6 max-w-4xl text-center text-[16px] text-[#010d3d]">
          Estamos aquí para ayudarte. Si tienes alguna pregunta o necesitas más información, no dudes en contactarnos.
        </p>
        <form onSubmit={handleSubmit} className="mt-12">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
            <div className="space-y-5">
              <div>
                <label htmlFor="contact-name" className={labelClass}>Nombre</label>
                <input id="contact-name" name="name" type="text" required placeholder="Nombre" value={formData.name}
                  onChange={(e) => { setFormData(p => ({ ...p, name: e.target.value })); setIsSent(false); }}
                  className={inputClass} />
              </div>
              <div>
                <label htmlFor="contact-email" className={labelClass}>Email</label>
                <input id="contact-email" name="email" type="email" required placeholder="Email" value={formData.email}
                  onChange={(e) => { setFormData(p => ({ ...p, email: e.target.value })); setIsSent(false); }}
                  className={inputClass} />
              </div>
              <div>
                <label htmlFor="contact-subject" className={labelClass}>Asunto</label>
                <input id="contact-subject" name="subject" type="text" required placeholder="Escribe el asunto de tu mensaje" value={formData.subject}
                  onChange={(e) => { setFormData(p => ({ ...p, subject: e.target.value })); setIsSent(false); }}
                  className={inputClass} />
              </div>
            </div>
            <div>
              <label htmlFor="contact-message" className={labelClass}>Mensaje</label>
              <textarea id="contact-message" name="message" required value={formData.message}
                onChange={(e) => { setFormData(p => ({ ...p, message: e.target.value })); setIsSent(false); }}
                className="h-full min-h-[260px] w-full rounded-xl border border-[#C5CBD8] bg-white px-4 py-4 text-[15px] text-[#001B5D] outline-none focus:ring-2 focus:ring-[#00B2E3]" />
            </div>
          </div>
          <div className="mt-20 flex flex-col items-center gap-4">
            <button type="submit"
              className="rounded-2xl bg-[#001B5D] px-10 py-4 text-[15px] font-extrabold text-white transition hover:opacity-90">
              Enviar
            </button>
            {isSent && (
              <p className="text-[20px] text-[#001B5D]">
                <span className="mr-2 font-black text-[#119F3B]">✓</span>
                El envío se ha realizado correctamente.
              </p>
            )}
          </div>
        </form>
      </div>
    </section>
  );
};

export default ContactoFormSection;