import "dotenv/config";
import { prisma } from "../src/lib/prisma";

const seedImages = {
  casa: ["/uploads/seed/casa-1.svg", "/uploads/seed/casa-2.svg"],
  depto: ["/uploads/seed/depto-1.svg", "/uploads/seed/depto-2.svg"],
  terreno: ["/uploads/seed/terreno-1.svg"],
  local: ["/uploads/seed/local-1.svg"],
  oficina: ["/uploads/seed/oficina-1.svg"],
  cochera: ["/uploads/seed/cochera-1.svg"],
};

async function main() {
  await prisma.propiedad.deleteMany();

  const propiedades = [
    {
      titulo: "Casa moderna en Barrio Centenario",
      descripcion:
        "Hermosa casa de 3 dormitorios con amplio living-comedor, cocina equipada y patio con parrilla. Ubicada en una de las zonas más tranquilas de Villa Mercedes, cerca de escuelas y comercios.",
      tipo: "Casa",
      operacion: "Venta",
      estado: true,
      direccion: "Av. Mitre 1450",
      barrio: "Centenario",
      precio: 95000,
      moneda: "USD",
      superficieTotal: 280,
      superficieCubierta: 180,
      dormitorios: 3,
      banos: 2,
      cochera: true,
      antiguedad: 5,
      ambientes: 5,
      servicioLuz: true,
      servicioAgua: true,
      servicioGas: true,
      servicioInternet: true,
      servicioCloacas: true,
      servicioPavimento: true,
      servicioAlumbrado: true,
      fotos: JSON.stringify(seedImages.casa),
      fotoPrincipal: seedImages.casa[0],
    },
    {
      titulo: "Departamento céntrico con balcón",
      descripcion:
        "Luminoso departamento de 2 ambientes en pleno centro de Villa Mercedes. Balcón al frente, cocina integrada y baño completo. Ideal para pareja o inversión.",
      tipo: "Departamento",
      operacion: "Alquiler",
      estado: true,
      direccion: "San Martín 890",
      barrio: "Centro",
      precio: 180000,
      moneda: "ARS",
      superficieTotal: 55,
      superficieCubierta: 50,
      dormitorios: 1,
      banos: 1,
      cochera: false,
      antiguedad: 15,
      piso: 3,
      ambientes: 2,
      servicioLuz: true,
      servicioAgua: true,
      servicioGas: true,
      servicioInternet: true,
      servicioCloacas: true,
      servicioPavimento: true,
      servicioAlumbrado: true,
      fotos: JSON.stringify(seedImages.depto),
      fotoPrincipal: seedImages.depto[0],
    },
    {
      titulo: "Terreno en barrio residencial",
      descripcion:
        "Terreno de 400 m² en zona en crecimiento. Todos los servicios disponibles. Ideal para construir la casa de tus sueños.",
      tipo: "Terreno",
      operacion: "Venta",
      estado: true,
      direccion: "Calle Los Tilos s/n",
      barrio: "Los Olivos",
      precio: 25000,
      moneda: "USD",
      superficieTotal: 400,
      dormitorios: 0,
      banos: 0,
      cochera: false,
      servicioLuz: true,
      servicioAgua: true,
      servicioGas: false,
      servicioInternet: false,
      servicioCloacas: false,
      servicioPavimento: true,
      servicioAlumbrado: true,
      fotos: JSON.stringify(seedImages.terreno),
      fotoPrincipal: seedImages.terreno[0],
    },
    {
      titulo: "Local comercial sobre avenida",
      descripcion:
        "Amplio local comercial con vidriera sobre avenida principal. 80 m² cubiertos, baño y depósito. Excelente visibilidad y tránsito peatonal.",
      tipo: "Local comercial",
      operacion: "Alquiler",
      estado: true,
      direccion: "Av. Libertador 2200",
      barrio: "Centro",
      precio: 350000,
      moneda: "ARS",
      superficieTotal: 80,
      superficieCubierta: 80,
      dormitorios: 0,
      banos: 1,
      cochera: false,
      antiguedad: 20,
      ambientes: 2,
      servicioLuz: true,
      servicioAgua: true,
      servicioGas: true,
      servicioInternet: true,
      servicioCloacas: true,
      servicioPavimento: true,
      servicioAlumbrado: true,
      fotos: JSON.stringify(seedImages.local),
      fotoPrincipal: seedImages.local[0],
    },
    {
      titulo: "Oficina equipada en edificio corporativo",
      descripcion:
        "Oficina de 45 m² completamente equipada con aire acondicionado, internet fibra óptica y recepción compartida. Lista para usar.",
      tipo: "Oficina",
      operacion: "Alquiler temporal",
      estado: true,
      direccion: "Rivadavia 567",
      barrio: "Centro",
      precio: 1200,
      moneda: "USD",
      superficieTotal: 45,
      superficieCubierta: 45,
      dormitorios: 0,
      banos: 1,
      cochera: true,
      antiguedad: 3,
      piso: 2,
      ambientes: 2,
      servicioLuz: true,
      servicioAgua: true,
      servicioGas: false,
      servicioInternet: true,
      servicioCloacas: true,
      servicioPavimento: true,
      servicioAlumbrado: true,
      fotos: JSON.stringify(seedImages.oficina),
      fotoPrincipal: seedImages.oficina[0],
    },
    {
      titulo: "Cochera cubierta en zona céntrica",
      descripcion:
        "Cochera cubierta individual en edificio céntrico. Acceso controlado las 24 horas. Ideal para quien trabaja en el centro.",
      tipo: "Cochera",
      operacion: "Alquiler",
      estado: false,
      direccion: "Belgrano 320",
      barrio: "Centro",
      precio: 45000,
      moneda: "ARS",
      superficieTotal: 12,
      dormitorios: 0,
      banos: 0,
      cochera: true,
      servicioLuz: true,
      servicioPavimento: true,
      servicioAlumbrado: true,
      fotos: JSON.stringify(seedImages.cochera),
      fotoPrincipal: seedImages.cochera[0],
    },
  ];

  for (const propiedad of propiedades) {
    await prisma.propiedad.create({ data: propiedad });
  }

  console.log(`✅ ${propiedades.length} propiedades de ejemplo creadas`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });