"use client";

import { Menu, LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

interface HeaderProps {
  userName?: string | null;
  onMenuClick: () => void;
}

export default function Header({ userName, onMenuClick }: HeaderProps) {
  return (
    <header className="bg-white border-b border-warm-black/5 px-4 sm:px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 -ml-2 text-warm-black"
          aria-label="Abrir menú"
        >
          <Menu className="w-5 h-5" />
        </button>
        <h1 className="font-display text-xl font-semibold text-warm-black hidden sm:block">
          Panel de administración
        </h1>
      </div>

      <div className="flex items-center gap-4">
        <span className="text-sm text-warm-black/60">
          {userName || "Administrador"}
        </span>
        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="inline-flex items-center gap-2 text-sm text-warm-black/60 hover:text-red-600 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span className="hidden sm:inline">Cerrar sesión</span>
        </button>
      </div>
    </header>
  );
}