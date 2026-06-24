"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { Pencil, Trash2, Eye, EyeOff } from "lucide-react";
import { Propiedad } from "@/generated/prisma/client";
import { formatPrice, parseFotos } from "@/lib/utils";
import PropertyFilters from "./PropertyFilters";
import { PropiedadFilters } from "@/types";

export default function PropertyGridDashboard() {
  const [propiedades, setPropiedades] = useState<Propiedad[]>([]);
  const [filters, setFilters] = useState<PropiedadFilters>({});
  const [loading, setLoading] = useState(true);

  const fetchPropiedades = useCallback(async () => {
    const res = await fetch("/api/propiedades?all=true");
    if (res.ok) {
      const data = await res.json();
      setPropiedades(data);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchPropiedades();
  }, [fetchPropiedades]);

  const handleDelete = async (id: number) => {
    if (!confirm("¿Estás seguro de eliminar esta propiedad?")) return;
    const res = await fetch(`/api/propiedades/${id}`, { method: "DELETE" });
    if (res.ok) fetchPropiedades();
  };

  const handleToggleEstado = async (id: number, estado: boolean) => {
    const res = await fetch(`/api/propiedades/${id}/estado`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ estado: !estado }),
    });
    if (res.ok) fetchPropiedades();
  };

  const filtered = propiedades.filter((p) => {
    if (filters.tipo && p.tipo !== filters.tipo) return false;
    if (filters.operacion && p.operacion !== filters.operacion) return false;
    if (filters.estado === "activa" && !p.estado) return false;
    if (filters.estado === "inactiva" && p.estado) return false;
    return true;
  });

  if (loading) {
    return <p className="text-warm-black/50">Cargando propiedades...</p>;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display text-2xl font-bold text-warm-black">
          Publicaciones ({filtered.length})
        </h2>
        <Link
          href="/dashboard/nueva"
          className="bg-mustard text-warm-black px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-mustard-dark transition-colors"
        >
          + Nueva propiedad
        </Link>
      </div>

      <PropertyFilters filters={filters} onChange={setFilters} />

      {filtered.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-warm-black/5">
          <p className="text-warm-black/50">No hay propiedades que coincidan con los filtros.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {filtered.map((propiedad) => {
            const fotos = parseFotos(propiedad.fotos);
            const imagen = propiedad.fotoPrincipal || fotos[0] || "/uploads/placeholder.svg";

            return (
              <div
                key={propiedad.id}
                className="bg-white rounded-2xl overflow-hidden border border-warm-black/5 shadow-sm"
              >
                <div className="relative aspect-[16/10] bg-warm-black/5">
                  <Image src={imagen} alt={propiedad.titulo} fill className="object-cover" sizes="400px" />
                  <span
                    className={`absolute top-3 right-3 text-xs font-semibold px-3 py-1 rounded-full ${
                      propiedad.estado ? "bg-green-500 text-white" : "bg-red-500 text-white"
                    }`}
                  >
                    {propiedad.estado ? "Activa" : "Inactiva"}
                  </span>
                </div>

                <div className="p-4">
                  <h3 className="font-display font-semibold text-warm-black line-clamp-1">
                    {propiedad.titulo}
                  </h3>
                  <div className="flex gap-2 mt-1 text-xs text-warm-black/50">
                    <span>{propiedad.tipo}</span>
                    <span>·</span>
                    <span>{propiedad.operacion}</span>
                  </div>
                  <p className="font-display text-lg font-bold text-mustard mt-2">
                    {formatPrice(propiedad.precio, propiedad.moneda)}
                  </p>
                  {propiedad.superficieTotal && (
                    <p className="text-sm text-warm-black/50">{propiedad.superficieTotal} m²</p>
                  )}

                  <div className="flex gap-2 mt-4">
                    <Link
                      href={`/dashboard/editar/${propiedad.id}`}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 bg-cream text-warm-black px-3 py-2 rounded-lg text-sm font-medium hover:bg-mustard/20 transition-colors"
                    >
                      <Pencil className="w-3.5 h-3.5" />
                      Editar
                    </Link>
                    <button
                      onClick={() => handleToggleEstado(propiedad.id, propiedad.estado)}
                      className="inline-flex items-center justify-center gap-1.5 bg-cream text-warm-black px-3 py-2 rounded-lg text-sm font-medium hover:bg-mustard/20 transition-colors"
                      title={propiedad.estado ? "Desactivar" : "Activar"}
                    >
                      {propiedad.estado ? (
                        <EyeOff className="w-3.5 h-3.5" />
                      ) : (
                        <Eye className="w-3.5 h-3.5" />
                      )}
                    </button>
                    <button
                      onClick={() => handleDelete(propiedad.id)}
                      className="inline-flex items-center justify-center gap-1.5 bg-red-50 text-red-600 px-3 py-2 rounded-lg text-sm font-medium hover:bg-red-100 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}