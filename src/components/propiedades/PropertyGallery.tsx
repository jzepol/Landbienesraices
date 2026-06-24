"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PropertyGalleryProps {
  fotos: string[];
  titulo: string;
}

export default function PropertyGallery({ fotos, titulo }: PropertyGalleryProps) {
  const [current, setCurrent] = useState(0);

  if (fotos.length === 0) {
    return (
      <div className="aspect-[16/10] bg-warm-black/5 rounded-2xl flex items-center justify-center">
        <p className="text-warm-black/40">Sin imágenes disponibles</p>
      </div>
    );
  }

  const prev = () => setCurrent((c) => (c === 0 ? fotos.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === fotos.length - 1 ? 0 : c + 1));

  return (
    <div>
      <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-warm-black/5">
        <Image
          src={fotos[current]}
          alt={`${titulo} - foto ${current + 1}`}
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 66vw"
          priority
        />
        {fotos.length > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-lg"
              aria-label="Foto anterior"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={next}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-lg"
              aria-label="Foto siguiente"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-warm-black/60 text-white text-sm px-3 py-1 rounded-full">
              {current + 1} / {fotos.length}
            </div>
          </>
        )}
      </div>

      {fotos.length > 1 && (
        <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
          {fotos.map((foto, i) => (
            <button
              key={foto}
              onClick={() => setCurrent(i)}
              className={`relative w-20 h-16 rounded-lg overflow-hidden shrink-0 border-2 transition-colors ${
                i === current ? "border-mustard" : "border-transparent opacity-60 hover:opacity-100"
              }`}
            >
              <Image src={foto} alt="" fill className="object-cover" sizes="80px" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}