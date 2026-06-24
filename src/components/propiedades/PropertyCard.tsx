import Link from "next/link";
import Image from "next/image";
import { Bed, Bath, Maximize, MapPin } from "lucide-react";
import { Propiedad } from "@/generated/prisma/client";
import { formatPrice, parseFotos } from "@/lib/utils";

interface PropertyCardProps {
  propiedad: Propiedad;
  showStatus?: boolean;
}

export default function PropertyCard({ propiedad, showStatus = false }: PropertyCardProps) {
  const fotos = parseFotos(propiedad.fotos);
  const imagen = propiedad.fotoPrincipal || fotos[0] || "/uploads/placeholder.svg";

  return (
    <Link
      href={`/propiedades/${propiedad.id}`}
      className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-warm-black/5"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-warm-black/5">
        <Image
          src={imagen}
          alt={propiedad.titulo}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute top-3 left-3 flex gap-2">
          <span className="bg-mustard text-warm-black text-xs font-semibold px-3 py-1 rounded-full">
            {propiedad.operacion}
          </span>
          <span className="bg-warm-black/80 text-white text-xs font-medium px-3 py-1 rounded-full">
            {propiedad.tipo}
          </span>
        </div>
        {showStatus && (
          <span
            className={`absolute top-3 right-3 text-xs font-semibold px-3 py-1 rounded-full ${
              propiedad.estado
                ? "bg-green-500 text-white"
                : "bg-red-500 text-white"
            }`}
          >
            {propiedad.estado ? "Activa" : "Inactiva"}
          </span>
        )}
      </div>

      <div className="p-5">
        <h3 className="font-display text-lg font-semibold text-warm-black group-hover:text-mustard transition-colors line-clamp-1">
          {propiedad.titulo}
        </h3>

        {(propiedad.barrio || propiedad.direccion) && (
          <p className="flex items-center gap-1 text-sm text-warm-black/50 mt-1">
            <MapPin className="w-3.5 h-3.5 shrink-0" />
            <span className="line-clamp-1">
              {[propiedad.barrio, propiedad.ciudad].filter(Boolean).join(", ")}
            </span>
          </p>
        )}

        <p className="font-display text-2xl font-bold text-mustard mt-3">
          {formatPrice(propiedad.precio, propiedad.moneda)}
        </p>

        <div className="flex items-center gap-4 mt-3 text-sm text-warm-black/60">
          {propiedad.dormitorios != null && propiedad.dormitorios > 0 && (
            <span className="flex items-center gap-1">
              <Bed className="w-4 h-4" />
              {propiedad.dormitorios}
            </span>
          )}
          {propiedad.banos != null && propiedad.banos > 0 && (
            <span className="flex items-center gap-1">
              <Bath className="w-4 h-4" />
              {propiedad.banos}
            </span>
          )}
          {propiedad.superficieTotal != null && (
            <span className="flex items-center gap-1">
              <Maximize className="w-4 h-4" />
              {propiedad.superficieTotal} m²
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}