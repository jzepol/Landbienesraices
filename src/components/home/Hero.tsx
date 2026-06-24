import { MessageCircle, ArrowDown } from "lucide-react";
import { WHATSAPP_URL } from "@/lib/constants";

export default function Hero() {
  return (
    <section id="inicio" className="relative min-h-screen flex items-center bg-warm-black text-white overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 right-10 w-72 h-72 bg-mustard rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-mustard/50 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        <div className="max-w-3xl">
          <p className="text-mustard font-medium tracking-widest uppercase text-sm mb-6">
            Villa Mercedes, San Luis
          </p>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
            Encontrá tu lugar{" "}
            <span className="text-mustard">en el mundo</span>
          </h1>
          <p className="text-lg md:text-xl text-white/70 leading-relaxed mb-10 max-w-xl">
            En Land Bienes Raíces te acompañamos en cada paso para encontrar
            la propiedad ideal. Venta, alquiler y asesoramiento personalizado.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href={`${WHATSAPP_URL}?text=${encodeURIComponent("Hola! Quiero consultar sobre propiedades disponibles.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-mustard text-warm-black px-8 py-4 rounded-full text-base font-semibold hover:bg-mustard-dark transition-all hover:scale-105"
            >
              <MessageCircle className="w-5 h-5" />
              Consultanos por WhatsApp
            </a>
            <a
              href="#propiedades"
              className="inline-flex items-center justify-center gap-2 border border-white/20 text-white px-8 py-4 rounded-full text-base font-medium hover:border-mustard hover:text-mustard transition-colors"
            >
              Ver propiedades
              <ArrowDown className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ArrowDown className="w-5 h-5 text-white/30" />
      </div>
    </section>
  );
}