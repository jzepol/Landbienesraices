"use client";

import { Share2, Check } from "lucide-react";
import { useState } from "react";

interface ShareButtonProps {
  titulo: string;
}

export default function ShareButton({ titulo }: ShareButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const url = window.location.href;
    const text = `Mirá esta propiedad: ${titulo}`;

    if (navigator.share) {
      try {
        await navigator.share({ title: titulo, text, url });
        return;
      } catch {
        // fallback to clipboard
      }
    }

    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleShare}
      className="inline-flex items-center gap-2 border border-warm-black/10 text-warm-black px-6 py-3 rounded-full font-medium hover:border-mustard hover:text-mustard transition-colors"
    >
      {copied ? <Check className="w-4 h-4" /> : <Share2 className="w-4 h-4" />}
      {copied ? "¡Enlace copiado!" : "Compartir"}
    </button>
  );
}