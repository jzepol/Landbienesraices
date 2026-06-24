"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutGrid, PlusCircle, Settings, X } from "lucide-react";
import Logo from "@/components/layout/Logo";

const links = [
  { href: "/dashboard", label: "Publicaciones", icon: LayoutGrid },
  { href: "/dashboard/nueva", label: "Nueva propiedad", icon: PlusCircle },
  { href: "/dashboard/configuracion", label: "Configuración", icon: Settings },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/dashboard") return pathname === "/dashboard";
    return pathname.startsWith(href);
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-warm-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-warm-black text-white z-50 transform transition-transform duration-300 lg:translate-x-0 lg:static lg:z-auto ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <Logo variant="light" />
          <button onClick={onClose} className="lg:hidden p-1" aria-label="Cerrar menú">
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="p-4 space-y-1">
          {links.map((link) => {
            const Icon = link.icon;
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={onClose}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                  active
                    ? "bg-mustard text-warm-black"
                    : "text-white/70 hover:bg-white/5 hover:text-white"
                }`}
              >
                <Icon className="w-5 h-5" />
                {link.label}
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}