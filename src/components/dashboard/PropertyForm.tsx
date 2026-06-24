"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Propiedad } from "@/generated/prisma/client";
import { TIPOS_PROPIEDAD, OPERACIONES, MONEDAS, SERVICIOS } from "@/lib/constants";
import { parseFotos } from "@/lib/utils";
import ImageUploader from "./ImageUploader";

interface PropertyFormProps {
  propiedad?: Propiedad;
}

const emptyForm = {
  titulo: "",
  descripcion: "",
  tipo: "Casa",
  operacion: "Venta",
  estado: true,
  direccion: "",
  barrio: "",
  ciudad: "Villa Mercedes",
  provincia: "San Luis",
  precio: 0,
  moneda: "USD",
  superficieTotal: null as number | null,
  superficieCubierta: null as number | null,
  dormitorios: null as number | null,
  banos: null as number | null,
  cochera: false,
  antiguedad: null as number | null,
  piso: null as number | null,
  ambientes: null as number | null,
  servicioLuz: false,
  servicioAgua: false,
  servicioGas: false,
  servicioInternet: false,
  servicioCloacas: false,
  servicioPavimento: false,
  servicioAlumbrado: false,
  fotos: [] as string[],
  fotoPrincipal: "",
};

export default function PropertyForm({ propiedad }: PropertyFormProps) {
  const router = useRouter();
  const isEditing = !!propiedad;

  const [form, setForm] = useState(() => {
    if (!propiedad) return emptyForm;
    const fotos = parseFotos(propiedad.fotos);
    return {
      titulo: propiedad.titulo,
      descripcion: propiedad.descripcion || "",
      tipo: propiedad.tipo,
      operacion: propiedad.operacion,
      estado: propiedad.estado,
      direccion: propiedad.direccion || "",
      barrio: propiedad.barrio || "",
      ciudad: propiedad.ciudad,
      provincia: propiedad.provincia,
      precio: propiedad.precio,
      moneda: propiedad.moneda,
      superficieTotal: propiedad.superficieTotal,
      superficieCubierta: propiedad.superficieCubierta,
      dormitorios: propiedad.dormitorios,
      banos: propiedad.banos,
      cochera: propiedad.cochera,
      antiguedad: propiedad.antiguedad,
      piso: propiedad.piso,
      ambientes: propiedad.ambientes,
      servicioLuz: propiedad.servicioLuz,
      servicioAgua: propiedad.servicioAgua,
      servicioGas: propiedad.servicioGas,
      servicioInternet: propiedad.servicioInternet,
      servicioCloacas: propiedad.servicioCloacas,
      servicioPavimento: propiedad.servicioPavimento,
      servicioAlumbrado: propiedad.servicioAlumbrado,
      fotos,
      fotoPrincipal: propiedad.fotoPrincipal || fotos[0] || "",
    };
  });

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const update = <K extends keyof typeof form>(key: K, value: (typeof form)[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!form.titulo.trim()) {
      setError("El título es obligatorio");
      return;
    }
    if (form.precio <= 0) {
      setError("El precio debe ser mayor a 0");
      return;
    }
    if (form.fotos.length === 0) {
      setError("Debe subir al menos una foto");
      return;
    }

    setSaving(true);

    const payload = {
      titulo: form.titulo,
      descripcion: form.descripcion || null,
      tipo: form.tipo,
      operacion: form.operacion,
      estado: form.estado,
      direccion: form.direccion || null,
      barrio: form.barrio || null,
      ciudad: form.ciudad,
      provincia: form.provincia,
      precio: form.precio,
      moneda: form.moneda,
      superficieTotal: form.superficieTotal,
      superficieCubierta: form.superficieCubierta,
      dormitorios: form.dormitorios,
      banos: form.banos,
      cochera: form.cochera,
      antiguedad: form.antiguedad,
      piso: form.piso,
      ambientes: form.ambientes,
      servicioLuz: form.servicioLuz,
      servicioAgua: form.servicioAgua,
      servicioGas: form.servicioGas,
      servicioInternet: form.servicioInternet,
      servicioCloacas: form.servicioCloacas,
      servicioPavimento: form.servicioPavimento,
      servicioAlumbrado: form.servicioAlumbrado,
      fotos: JSON.stringify(form.fotos),
      fotoPrincipal: form.fotoPrincipal || form.fotos[0],
    };

    const url = isEditing ? `/api/propiedades/${propiedad.id}` : "/api/propiedades";
    const method = isEditing ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      router.push("/dashboard");
      router.refresh();
    } else {
      const data = await res.json();
      setError(data.error || "Error al guardar");
      setSaving(false);
    }
  };

  const inputClass =
    "w-full px-4 py-3 rounded-xl border border-warm-black/10 bg-white focus:outline-none focus:ring-2 focus:ring-mustard/50 focus:border-mustard transition-colors";
  const labelClass = "block text-sm font-medium text-warm-black mb-1.5";

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl space-y-8">
      <div>
        <h2 className="font-display text-2xl font-bold text-warm-black">
          {isEditing ? "Editar propiedad" : "Nueva propiedad"}
        </h2>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 px-4 py-3 rounded-xl text-sm">{error}</div>
      )}

      <section className="bg-white rounded-2xl p-6 border border-warm-black/5 space-y-5">
        <h3 className="font-display text-lg font-semibold text-warm-black">Información básica</h3>

        <div>
          <label className={labelClass}>Título *</label>
          <input
            type="text"
            required
            value={form.titulo}
            onChange={(e) => update("titulo", e.target.value)}
            className={inputClass}
            placeholder="Ej: Casa en barrio Centenario"
          />
        </div>

        <div>
          <label className={labelClass}>Descripción</label>
          <textarea
            rows={4}
            value={form.descripcion}
            onChange={(e) => update("descripcion", e.target.value)}
            className={`${inputClass} resize-none`}
            placeholder="Descripción detallada de la propiedad..."
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div>
            <label className={labelClass}>Tipo</label>
            <select value={form.tipo} onChange={(e) => update("tipo", e.target.value)} className={inputClass}>
              {TIPOS_PROPIEDAD.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          <div>
            <label className={labelClass}>Operación</label>
            <select value={form.operacion} onChange={(e) => update("operacion", e.target.value)} className={inputClass}>
              {OPERACIONES.map((o) => <option key={o} value={o}>{o}</option>)}
            </select>
          </div>
          <div>
            <label className={labelClass}>Estado</label>
            <div className="flex items-center gap-3 h-[46px]">
              <button
                type="button"
                onClick={() => update("estado", !form.estado)}
                className={`relative w-12 h-6 rounded-full transition-colors ${
                  form.estado ? "bg-green-500" : "bg-warm-black/20"
                }`}
              >
                <span
                  className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                    form.estado ? "left-6" : "left-0.5"
                  }`}
                />
              </button>
              <span className="text-sm text-warm-black/70">
                {form.estado ? "Activa" : "Inactiva"}
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white rounded-2xl p-6 border border-warm-black/5 space-y-5">
        <h3 className="font-display text-lg font-semibold text-warm-black">Ubicación</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className={labelClass}>Dirección</label>
            <input type="text" value={form.direccion} onChange={(e) => update("direccion", e.target.value)} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Barrio</label>
            <input type="text" value={form.barrio} onChange={(e) => update("barrio", e.target.value)} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Ciudad</label>
            <input type="text" value={form.ciudad} onChange={(e) => update("ciudad", e.target.value)} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Provincia</label>
            <input type="text" value={form.provincia} onChange={(e) => update("provincia", e.target.value)} className={inputClass} />
          </div>
        </div>
      </section>

      <section className="bg-white rounded-2xl p-6 border border-warm-black/5 space-y-5">
        <h3 className="font-display text-lg font-semibold text-warm-black">Características</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
          <div>
            <label className={labelClass}>Precio *</label>
            <input
              type="number"
              required
              min={0}
              value={form.precio || ""}
              onChange={(e) => update("precio", parseFloat(e.target.value) || 0)}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Moneda</label>
            <select value={form.moneda} onChange={(e) => update("moneda", e.target.value)} className={inputClass}>
              {MONEDAS.map((m) => <option key={m} value={m}>{m}</option>)}
            </select>
          </div>
          <div>
            <label className={labelClass}>Superficie total (m²)</label>
            <input
              type="number"
              min={0}
              value={form.superficieTotal ?? ""}
              onChange={(e) => update("superficieTotal", e.target.value ? parseFloat(e.target.value) : null)}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Superficie cubierta (m²)</label>
            <input
              type="number"
              min={0}
              value={form.superficieCubierta ?? ""}
              onChange={(e) => update("superficieCubierta", e.target.value ? parseFloat(e.target.value) : null)}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Dormitorios</label>
            <input
              type="number"
              min={0}
              value={form.dormitorios ?? ""}
              onChange={(e) => update("dormitorios", e.target.value ? parseInt(e.target.value) : null)}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Baños</label>
            <input
              type="number"
              min={0}
              value={form.banos ?? ""}
              onChange={(e) => update("banos", e.target.value ? parseInt(e.target.value) : null)}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Ambientes</label>
            <input
              type="number"
              min={0}
              value={form.ambientes ?? ""}
              onChange={(e) => update("ambientes", e.target.value ? parseInt(e.target.value) : null)}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Antigüedad (años)</label>
            <input
              type="number"
              min={0}
              value={form.antiguedad ?? ""}
              onChange={(e) => update("antiguedad", e.target.value ? parseInt(e.target.value) : null)}
              className={inputClass}
              placeholder="0 = a estrenar"
            />
          </div>
          <div>
            <label className={labelClass}>Piso</label>
            <input
              type="number"
              min={0}
              value={form.piso ?? ""}
              onChange={(e) => update("piso", e.target.value ? parseInt(e.target.value) : null)}
              className={inputClass}
            />
          </div>
          <div className="flex items-end">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={form.cochera}
                onChange={(e) => update("cochera", e.target.checked)}
                className="w-4 h-4 rounded border-warm-black/20 text-mustard focus:ring-mustard"
              />
              <span className="text-sm font-medium text-warm-black">Cochera</span>
            </label>
          </div>
        </div>
      </section>

      <section className="bg-white rounded-2xl p-6 border border-warm-black/5 space-y-5">
        <h3 className="font-display text-lg font-semibold text-warm-black">Servicios disponibles</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {SERVICIOS.map((servicio) => (
            <label key={servicio.key} className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={form[servicio.key as keyof typeof form] as boolean}
                onChange={(e) =>
                  update(servicio.key as keyof typeof form, e.target.checked as never)
                }
                className="w-4 h-4 rounded border-warm-black/20 text-mustard focus:ring-mustard"
              />
              <span className="text-sm text-warm-black/80">{servicio.label}</span>
            </label>
          ))}
        </div>
      </section>

      <section className="bg-white rounded-2xl p-6 border border-warm-black/5">
        <ImageUploader
          fotos={form.fotos}
          fotoPrincipal={form.fotoPrincipal}
          onChange={(fotos, fotoPrincipal) => {
            update("fotos", fotos);
            update("fotoPrincipal", fotoPrincipal);
          }}
        />
      </section>

      <div className="flex gap-4">
        <button
          type="submit"
          disabled={saving}
          className="bg-mustard text-warm-black px-8 py-3 rounded-full font-semibold hover:bg-mustard-dark transition-colors disabled:opacity-50"
        >
          {saving ? "Guardando..." : isEditing ? "Guardar cambios" : "Crear propiedad"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/dashboard")}
          className="px-8 py-3 rounded-full font-medium text-warm-black/60 hover:text-warm-black transition-colors"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}