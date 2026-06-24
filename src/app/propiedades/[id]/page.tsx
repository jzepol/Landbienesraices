import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Bed, Bath, Maximize, MapPin, Car, Building, Calendar, MessageCircle } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PropertyGallery from "@/components/propiedades/PropertyGallery";
import ServiceIcons from "@/components/propiedades/ServiceIcons";
import ShareButton from "@/components/propiedades/ShareButton";
import { prisma } from "@/lib/prisma";
import { formatPrice, parseFotos, getWhatsAppLink, getPropertyWhatsAppMessage } from "@/lib/utils";

type PageProps = { params: Promise<{ id: string }> };

export default async function PropiedadDetailPage({ params }: PageProps) {
  const { id } = await params;
  const propiedadId = parseInt(id, 10);

  if (isNaN(propiedadId)) notFound();

  const propiedad = await prisma.propiedad.findUnique({
    where: { id: propiedadId },
  });

  if (!propiedad || !propiedad.estado) notFound();

  const fotos = parseFotos(propiedad.fotos);
  const whatsappLink = getWhatsAppLink(
    getPropertyWhatsAppMessage(propiedad.titulo, propiedad.id, propiedad.operacion)
  );

  return (
    <>
      <Navbar />
      <main className="pt-20 md:pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/#propiedades"
            className="inline-flex items-center gap-2 text-sm text-warm-black/60 hover:text-mustard transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver a propiedades
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            <div className="lg:col-span-2">
              <PropertyGallery
                fotos={fotos.length > 0 ? fotos : [propiedad.fotoPrincipal || "/uploads/placeholder.svg"]}
                titulo={propiedad.titulo}
              />
            </div>

            <div>
              <div className="flex gap-2 mb-4">
                <span className="bg-mustard text-warm-black text-xs font-semibold px-3 py-1 rounded-full">
                  {propiedad.operacion}
                </span>
                <span className="bg-warm-black text-white text-xs font-medium px-3 py-1 rounded-full">
                  {propiedad.tipo}
                </span>
              </div>

              <h1 className="font-display text-2xl md:text-3xl font-bold text-warm-black">
                {propiedad.titulo}
              </h1>

              {(propiedad.direccion || propiedad.barrio) && (
                <p className="flex items-center gap-2 text-warm-black/60 mt-2">
                  <MapPin className="w-4 h-4 shrink-0" />
                  {[propiedad.direccion, propiedad.barrio, propiedad.ciudad, propiedad.provincia]
                    .filter(Boolean)
                    .join(", ")}
                </p>
              )}

              <p className="font-display text-3xl font-bold text-mustard mt-4">
                {formatPrice(propiedad.precio, propiedad.moneda)}
              </p>

              <div className="grid grid-cols-2 gap-3 mt-6">
                {propiedad.dormitorios != null && propiedad.dormitorios > 0 && (
                  <div className="flex items-center gap-2 bg-cream rounded-xl px-4 py-3">
                    <Bed className="w-5 h-5 text-mustard" />
                    <div>
                      <p className="text-xs text-warm-black/50">Dormitorios</p>
                      <p className="font-medium">{propiedad.dormitorios}</p>
                    </div>
                  </div>
                )}
                {propiedad.banos != null && propiedad.banos > 0 && (
                  <div className="flex items-center gap-2 bg-cream rounded-xl px-4 py-3">
                    <Bath className="w-5 h-5 text-mustard" />
                    <div>
                      <p className="text-xs text-warm-black/50">Baños</p>
                      <p className="font-medium">{propiedad.banos}</p>
                    </div>
                  </div>
                )}
                {propiedad.superficieTotal != null && (
                  <div className="flex items-center gap-2 bg-cream rounded-xl px-4 py-3">
                    <Maximize className="w-5 h-5 text-mustard" />
                    <div>
                      <p className="text-xs text-warm-black/50">Superficie</p>
                      <p className="font-medium">{propiedad.superficieTotal} m²</p>
                    </div>
                  </div>
                )}
                {propiedad.ambientes != null && (
                  <div className="flex items-center gap-2 bg-cream rounded-xl px-4 py-3">
                    <Building className="w-5 h-5 text-mustard" />
                    <div>
                      <p className="text-xs text-warm-black/50">Ambientes</p>
                      <p className="font-medium">{propiedad.ambientes}</p>
                    </div>
                  </div>
                )}
                {propiedad.cochera && (
                  <div className="flex items-center gap-2 bg-cream rounded-xl px-4 py-3">
                    <Car className="w-5 h-5 text-mustard" />
                    <div>
                      <p className="text-xs text-warm-black/50">Cochera</p>
                      <p className="font-medium">Sí</p>
                    </div>
                  </div>
                )}
                {propiedad.antiguedad != null && (
                  <div className="flex items-center gap-2 bg-cream rounded-xl px-4 py-3">
                    <Calendar className="w-5 h-5 text-mustard" />
                    <div>
                      <p className="text-xs text-warm-black/50">Antigüedad</p>
                      <p className="font-medium">
                        {propiedad.antiguedad === 0 ? "A estrenar" : `${propiedad.antiguedad} años`}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex flex-col sm:flex-row gap-3 mt-8">
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 bg-green-600 text-white px-6 py-4 rounded-full font-semibold hover:bg-green-700 transition-colors text-center"
                >
                  <MessageCircle className="w-5 h-5" />
                  Consultar por WhatsApp
                </a>
                <ShareButton titulo={propiedad.titulo} />
              </div>
            </div>
          </div>

          {propiedad.descripcion && (
            <section className="mt-12">
              <h2 className="font-display text-xl font-semibold text-warm-black mb-4">
                Descripción
              </h2>
              <p className="text-warm-black/70 leading-relaxed whitespace-pre-line">
                {propiedad.descripcion}
              </p>
            </section>
          )}

          <section className="mt-12">
            <ServiceIcons propiedad={propiedad} />
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}