"use client";

import { useState } from "react";
import { MessageCircle, Mail, Phone, MapPin } from "lucide-react";
import InstagramIcon from "@/components/icons/InstagramIcon";
import {
  WHATSAPP_URL,
  CONTACT_EMAIL,
  CONTACT_PHONE,
  CONTACT_ADDRESS,
  INSTAGRAM_URL,
  INSTAGRAM_HANDLE,
} from "@/lib/constants";

export default function Contact() {
  const [form, setForm] = useState({ nombre: "", email: "", telefono: "", mensaje: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Hola! Soy ${form.nombre}.\n\nEmail: ${form.email}\nTeléfono: ${form.telefono}\n\n${form.mensaje}`;
    window.open(`${WHATSAPP_URL}?text=${encodeURIComponent(text)}`, "_blank");
  };

  return (
    <section id="contacto" className="py-20 md:py-28 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-mustard font-medium tracking-widest uppercase text-sm mb-4">
            Contacto
          </p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-warm-black">
            Hablemos
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-warm-black mb-1.5">Nombre</label>
              <input
                type="text"
                required
                value={form.nombre}
                onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-warm-black/10 bg-white focus:outline-none focus:ring-2 focus:ring-mustard/50 focus:border-mustard transition-colors"
                placeholder="Tu nombre"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-warm-black mb-1.5">Email</label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-warm-black/10 bg-white focus:outline-none focus:ring-2 focus:ring-mustard/50 focus:border-mustard transition-colors"
                  placeholder="tu@email.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-warm-black mb-1.5">Teléfono</label>
                <input
                  type="tel"
                  value={form.telefono}
                  onChange={(e) => setForm({ ...form, telefono: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-warm-black/10 bg-white focus:outline-none focus:ring-2 focus:ring-mustard/50 focus:border-mustard transition-colors"
                  placeholder="2657 790585"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-warm-black mb-1.5">Mensaje</label>
              <textarea
                required
                rows={4}
                value={form.mensaje}
                onChange={(e) => setForm({ ...form, mensaje: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-warm-black/10 bg-white focus:outline-none focus:ring-2 focus:ring-mustard/50 focus:border-mustard transition-colors resize-none"
                placeholder="¿En qué podemos ayudarte?"
              />
            </div>
            <button
              type="submit"
              className="inline-flex items-center gap-2 bg-mustard text-warm-black px-8 py-4 rounded-full font-semibold hover:bg-mustard-dark transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
              Enviar por WhatsApp
            </button>
          </form>

          <div className="space-y-8">
            <div className="bg-white rounded-2xl p-8 border border-warm-black/5">
              <h3 className="font-display text-xl font-semibold text-warm-black mb-6">
                Datos de contacto
              </h3>
              <ul className="space-y-5">
                <li className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-mustard/10 rounded-full flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-mustard" />
                  </div>
                  <div>
                    <p className="font-medium text-warm-black">Dirección</p>
                    <p className="text-warm-black/60 text-sm">{CONTACT_ADDRESS}</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-mustard/10 rounded-full flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5 text-mustard" />
                  </div>
                  <div>
                    <p className="font-medium text-warm-black">Teléfono</p>
                    <p className="text-warm-black/60 text-sm">{CONTACT_PHONE}</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-mustard/10 rounded-full flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-mustard" />
                  </div>
                  <div>
                    <p className="font-medium text-warm-black">Email</p>
                    <p className="text-warm-black/60 text-sm">{CONTACT_EMAIL}</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-mustard/10 rounded-full flex items-center justify-center shrink-0">
                    <InstagramIcon className="w-5 h-5 text-mustard" />
                  </div>
                  <div>
                    <p className="font-medium text-warm-black">Instagram</p>
                    <a
                      href={INSTAGRAM_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-warm-black/60 text-sm hover:text-mustard transition-colors"
                    >
                      {INSTAGRAM_HANDLE}
                    </a>
                  </div>
                </li>
              </ul>
            </div>

            <a
              href={`${WHATSAPP_URL}?text=${encodeURIComponent("Hola! Quiero más información.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 bg-green-600 text-white px-8 py-4 rounded-2xl font-semibold hover:bg-green-700 transition-colors w-full"
            >
              <MessageCircle className="w-5 h-5" />
              Chateá con nosotros
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}