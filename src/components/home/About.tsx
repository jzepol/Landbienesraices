import Image from "next/image";

export default function About() {
  return (
    <section id="nosotros" className="py-20 md:py-28 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div>
            <p className="text-mustard font-medium tracking-widest uppercase text-sm mb-4">
              Quiénes somos
            </p>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-warm-black mb-6">
              Confianza que vuela{" "}
              <span className="text-mustard">alto</span>
            </h2>
            <div className="space-y-4 text-warm-black/70 leading-relaxed">
              <p>
                Land Bienes Raíces nació en Villa Mercedes con una misión clara:
                conectar a las personas con el hogar que sueñan, con transparencia,
                dedicación y un trato cercano.
              </p>
              <p>
                Nuestro símbolo, el <strong className="text-warm-black">Benteveo</strong>,
                representa la confianza y la libertad de elegir tu próximo destino.
                Como este pájaro típico argentino que vuela con seguridad entre los
                árboles, nosotros te guiamos con experiencia y conocimiento del mercado local.
              </p>
              <p>
                Ya sea que busques comprar, alquilar o invertir, nuestro equipo
                te brinda asesoramiento personalizado para tomar la mejor decisión.
              </p>
            </div>

            <div className="mt-8 pt-8 border-t border-warm-black/10">
              <p className="font-display text-xl font-semibold text-warm-black">
                Cecilia Crivellari
              </p>
              <p className="text-mustard font-medium mt-1">
                Martillera pública
              </p>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-square max-w-md mx-auto bg-warm-black rounded-3xl overflow-hidden flex items-center justify-center p-6">
              <Image
                src="/images/benteveo.jpg"
                alt="Benteveo, símbolo de Land Bienes Raíces"
                width={500}
                height={500}
                className="w-full h-full object-contain"
                priority
              />
            </div>
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-mustard rounded-2xl -z-10" />
            <div className="absolute -top-4 -left-4 w-16 h-16 bg-mustard/30 rounded-xl -z-10" />
          </div>
        </div>
      </div>
    </section>
  );
}