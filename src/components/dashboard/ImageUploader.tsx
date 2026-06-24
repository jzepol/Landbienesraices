"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Upload, X, Star, GripVertical } from "lucide-react";

interface ImageUploaderProps {
  fotos: string[];
  fotoPrincipal: string;
  onChange: (fotos: string[], fotoPrincipal: string) => void;
}

export default function ImageUploader({
  fotos,
  fotoPrincipal,
  onChange,
}: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (files: FileList) => {
    if (fotos.length + files.length > 10) {
      alert("Máximo 10 imágenes permitidas");
      return;
    }

    setUploading(true);
    const newPaths: string[] = [];

    for (const file of Array.from(files)) {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", { method: "POST", body: formData });
      if (res.ok) {
        const data = await res.json();
        newPaths.push(data.path);
      }
    }

    const updatedFotos = [...fotos, ...newPaths];
    const newPrincipal = fotoPrincipal || updatedFotos[0] || "";
    onChange(updatedFotos, newPrincipal);
    setUploading(false);
  };

  const removeImage = (index: number) => {
    const updated = fotos.filter((_, i) => i !== index);
    const removed = fotos[index];
    const newPrincipal =
      fotoPrincipal === removed ? updated[0] || "" : fotoPrincipal;
    onChange(updated, newPrincipal);
  };

  const setPrincipal = (path: string) => {
    onChange(fotos, path);
  };

  const handleDragStart = (index: number) => setDragIndex(index);

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (dragIndex === null || dragIndex === index) return;
    const updated = [...fotos];
    const [moved] = updated.splice(dragIndex, 1);
    updated.splice(index, 0, moved);
    onChange(updated, fotoPrincipal);
    setDragIndex(index);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <label className="text-sm font-medium text-warm-black">
          Fotos ({fotos.length}/10)
        </label>
        {fotos.length < 10 && (
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={uploading}
            className="inline-flex items-center gap-2 text-sm text-mustard font-medium hover:text-mustard-dark transition-colors"
          >
            <Upload className="w-4 h-4" />
            {uploading ? "Subiendo..." : "Agregar fotos"}
          </button>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={(e) => e.target.files && handleUpload(e.target.files)}
      />

      {fotos.length === 0 ? (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="w-full border-2 border-dashed border-warm-black/10 rounded-2xl p-12 text-center hover:border-mustard/50 transition-colors"
        >
          <Upload className="w-8 h-8 text-warm-black/30 mx-auto mb-3" />
          <p className="text-warm-black/50 text-sm">
            Arrastrá o hacé click para subir imágenes
          </p>
          <p className="text-warm-black/30 text-xs mt-1">Mínimo 1, máximo 10</p>
        </button>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {fotos.map((foto, index) => (
            <div
              key={foto}
              draggable
              onDragStart={() => handleDragStart(index)}
              onDragOver={(e) => handleDragOver(e, index)}
              onDragEnd={() => setDragIndex(null)}
              className={`relative aspect-square rounded-xl overflow-hidden border-2 group ${
                foto === fotoPrincipal ? "border-mustard" : "border-transparent"
              }`}
            >
              <Image src={foto} alt="" fill className="object-cover" sizes="150px" />
              <div className="absolute inset-0 bg-warm-black/0 group-hover:bg-warm-black/40 transition-colors flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                <button
                  type="button"
                  onClick={() => setPrincipal(foto)}
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    foto === fotoPrincipal ? "bg-mustard text-warm-black" : "bg-white/90 text-warm-black"
                  }`}
                  title="Marcar como principal"
                >
                  <Star className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="absolute top-1 left-1 text-white/70">
                <GripVertical className="w-4 h-4" />
              </div>
              {foto === fotoPrincipal && (
                <span className="absolute bottom-1 left-1 bg-mustard text-warm-black text-[10px] font-bold px-2 py-0.5 rounded-full">
                  Principal
                </span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}