import Link from "next/link";
import Logo from "./Logo";
import InstagramIcon from "@/components/icons/InstagramIcon";
import { CONTACT_EMAIL, CONTACT_PHONE, CONTACT_ADDRESS, INSTAGRAM_URL, INSTAGRAM_HANDLE } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="bg-warm-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <Logo variant="light" />
            <p className="mt-4 text-white/60 text-sm leading-relaxed">
              Tu inmobiliaria de confianza en Villa Mercedes, San Luis.
              Encontramos el hogar perfecto para vos.
            </p>
          </div>

          <div>
            <h3 className="font-display text-lg mb-4 text-mustard">Enlaces</h3>
            <ul className="space-y-2 text-sm text-white/60">
              <li><a href="#inicio" className="hover:text-mustard transition-colors">Inicio</a></li>
              <li><a href="#nosotros" className="hover:text-mustard transition-colors">Quiénes somos</a></li>
              <li><a href="#propiedades" className="hover:text-mustard transition-colors">Propiedades</a></li>
              <li><a href="#contacto" className="hover:text-mustard transition-colors">Contacto</a></li>
              <li><Link href="/login" className="hover:text-mustard transition-colors">Acceso administrador</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-display text-lg mb-4 text-mustard">Contacto</h3>
            <ul className="space-y-2 text-sm text-white/60">
              <li>{CONTACT_ADDRESS}</li>
              <li>{CONTACT_PHONE}</li>
              <li>{CONTACT_EMAIL}</li>
              <li>
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 hover:text-mustard transition-colors"
                >
                  <InstagramIcon className="w-4 h-4" />
                  {INSTAGRAM_HANDLE}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 text-center text-sm text-white/40 space-y-2">
          <p>&copy; {new Date().getFullYear()} Land Bienes Raíces. Todos los derechos reservados.</p>
          <p>
            by{" "}
            <a
              href="https://jzepoldev.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/50 hover:text-mustard transition-colors"
            >
              jzepoldev.com
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}