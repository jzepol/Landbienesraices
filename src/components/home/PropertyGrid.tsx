import { Propiedad } from "@/generated/prisma/client";
import PropertyCard from "@/components/propiedades/PropertyCard";

interface PropertyGridProps {
  propiedades: Propiedad[];
}

export default function PropertyGrid({ propiedades }: PropertyGridProps) {
  return (
    <section id="propiedades" className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-mustard font-medium tracking-widest uppercase text-sm mb-4">
            Nuestro catálogo
          </p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-warm-black">
            Propiedades disponibles
          </h2>
          <p className="text-warm-black/60 mt-4 max-w-2xl mx-auto">
            Explorá nuestra selección de propiedades en Villa Mercedes y alrededores.
          </p>
        </div>

        {propiedades.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-warm-black/50 text-lg">
              No hay propiedades disponibles en este momento.
            </p>
            <p className="text-warm-black/40 mt-2">
              Contactanos y te ayudamos a encontrar lo que buscás.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {propiedades.map((propiedad) => (
              <PropertyCard key={propiedad.id} propiedad={propiedad} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}