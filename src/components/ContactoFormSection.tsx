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

const ContactoFormSection = () => {
  const [formData, setFormData] = useState<ContactFormData>(initialFormData);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { name, email, subject, message } = formData;
    const isValid =
      name.trim().length > 0 &&
      email.trim().length > 0 &&
      subject.trim().length > 0 &&
      message.trim().length > 0;

    if (!isValid) return;

    // Simula envio local sin backend.
    setFormData(initialFormData);
    setIsSent(true);
  };

  return (
    <section className="w-full px-6 py-14 md:px-10">
      <div className="mx-auto max-w-7xl rounded-[24px] bg-[#E7E7F0] px-6 py-10 md:px-14 md:py-16">
        <h2 className="text-center text-4xl font-black text-[#010d3d] md:text-6xl">Contáctanos</h2>
        <p className="mx-auto mt-6 max-w-4xl text-center text-[20px] text-[#010d3d] md:text-[28px]">
          Estamos aquí para ayudarte. Si tienes alguna pregunta o necesitas más información, no
          dudes en contactarnos.
        </p>

        <form onSubmit={handleSubmit} className="mt-12">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
            <div className="space-y-5">
              <div>
                <label htmlFor="contact-name" className="mb-2 block text-[20px] font-medium text-[#001B5D]">
                  Nombre
                </label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={(event) => {
                    setFormData((prev) => ({ ...prev, name: event.target.value }));
                    setIsSent(false);
                  }}
                  placeholder="Nombre"
                  className="w-full rounded-xl border border-[#C5CBD8] bg-white px-4 py-4 text-[20px] text-[#001B5D] outline-none placeholder:text-[#8A93AA] focus:ring-2 focus:ring-[#00B2E3]"
                />
              </div>

              <div>
                <label htmlFor="contact-email" className="mb-2 block text-[20px] font-medium text-[#001B5D]">
                  Email
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(event) => {
                    setFormData((prev) => ({ ...prev, email: event.target.value }));
                    setIsSent(false);
                  }}
                  placeholder="Email"
                  className="w-full rounded-xl border border-[#C5CBD8] bg-white px-4 py-4 text-[20px] text-[#001B5D] outline-none placeholder:text-[#8A93AA] focus:ring-2 focus:ring-[#00B2E3]"
                />
              </div>

              <div>
                <label htmlFor="contact-subject" className="mb-2 block text-[20px] font-medium text-[#001B5D]">
                  Asunto
                </label>
                <input
                  id="contact-subject"
                  name="subject"
                  type="text"
                  required
                  value={formData.subject}
                  onChange={(event) => {
                    setFormData((prev) => ({ ...prev, subject: event.target.value }));
                    setIsSent(false);
                  }}
                  placeholder="Escribe el asunto de tu mensaje"
                  className="w-full rounded-xl border border-[#C5CBD8] bg-white px-4 py-4 text-[20px] text-[#001B5D] outline-none placeholder:text-[#8A93AA] focus:ring-2 focus:ring-[#00B2E3]"
                />
              </div>
            </div>

            <div>
              <label htmlFor="contact-message" className="mb-2 block text-[20px] font-medium text-[#001B5D]">
                Mensaje
              </label>
              <textarea
                id="contact-message"
                name="message"
                required
                value={formData.message}
                onChange={(event) => {
                  setFormData((prev) => ({ ...prev, message: event.target.value }));
                  setIsSent(false);
                }}
                className="h-full min-h-[260px] w-full rounded-xl border border-[#C5CBD8] bg-white px-4 py-4 text-[20px] text-[#001B5D] outline-none focus:ring-2 focus:ring-[#00B2E3]"
              />
            </div>
          </div>

          <div className="mt-20 flex flex-col items-center gap-4">
            <button
              type="submit"
              className="rounded-2xl bg-[#001B5D] px-10 py-4 text-[20px] font-extrabold text-white transition hover:opacity-90"
            >
              Enviar
            </button>

            {isSent && (
              <p className="text-[20px] text-[#001B5D]">
                <span className="mr-2 font-black text-[#119F3B]">✓</span>
                El envio se ha realizado correctamente.
              </p>
            )}
          </div>
        </form>
      </div>
    </section>
  );
};

export default ContactoFormSection;
