"use client";

import { useState } from "react";
import { Menu, X, MessageCircle } from "lucide-react";
import Logo from "./Logo";
import { WHATSAPP_URL } from "@/lib/constants";

const navLinks = [
  { href: "#inicio", label: "Inicio" },
  { href: "#nosotros", label: "Quiénes somos" },
  { href: "#propiedades", label: "Propiedades" },
  { href: "#contacto", label: "Contacto" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-cream/95 backdrop-blur-md border-b border-warm-black/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Logo />

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-warm-black/80 hover:text-mustard transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a
              href={`${WHATSAPP_URL}?text=${encodeURIComponent("Hola! Me gustaría obtener más información sobre sus propiedades.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-mustard text-warm-black px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-mustard-dark transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp
            </a>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-warm-black"
            aria-label="Menú"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-cream border-t border-warm-black/5 px-4 py-4 space-y-3">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="block py-2 text-warm-black/80 hover:text-mustard font-medium"
            >
              {link.label}
            </a>
          ))}
          <a
            href={`${WHATSAPP_URL}?text=${encodeURIComponent("Hola! Me gustaría obtener más información.")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-mustard text-warm-black px-5 py-2.5 rounded-full text-sm font-semibold"
          >
            <MessageCircle className="w-4 h-4" />
            WhatsApp
          </a>
        </div>
      )}
    </nav>
  );
}