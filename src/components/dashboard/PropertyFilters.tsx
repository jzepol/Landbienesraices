"use client";

import { TIPOS_PROPIEDAD, OPERACIONES } from "@/lib/constants";
import { PropiedadFilters } from "@/types";

interface PropertyFiltersProps {
  filters: PropiedadFilters;
  onChange: (filters: PropiedadFilters) => void;
}

export default function PropertyFilters({ filters, onChange }: PropertyFiltersProps) {
  return (
    <div className="flex flex-wrap gap-3 mb-6">
      <select
        value={filters.tipo || ""}
        onChange={(e) => onChange({ ...filters, tipo: e.target.value || undefined })}
        className="px-4 py-2 rounded-xl border border-warm-black/10 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-mustard/50"
      >
        <option value="">Todos los tipos</option>
        {TIPOS_PROPIEDAD.map((t) => (
          <option key={t} value={t}>{t}</option>
        ))}
      </select>

      <select
        value={filters.operacion || ""}
        onChange={(e) => onChange({ ...filters, operacion: e.target.value || undefined })}
        className="px-4 py-2 rounded-xl border border-warm-black/10 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-mustard/50"
      >
        <option value="">Todas las operaciones</option>
        {OPERACIONES.map((o) => (
          <option key={o} value={o}>{o}</option>
        ))}
      </select>

      <select
        value={filters.estado || ""}
        onChange={(e) => onChange({ ...filters, estado: e.target.value || undefined })}
        className="px-4 py-2 rounded-xl border border-warm-black/10 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-mustard/50"
      >
        <option value="">Todos los estados</option>
        <option value="activa">Activas</option>
        <option value="inactiva">Inactivas</option>
      </select>
    </div>
  );
}