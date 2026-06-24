-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateTable
CREATE TABLE "Propiedad" (
    "id" SERIAL NOT NULL,
    "titulo" TEXT NOT NULL,
    "descripcion" TEXT,
    "tipo" TEXT NOT NULL,
    "operacion" TEXT NOT NULL,
    "estado" BOOLEAN NOT NULL DEFAULT true,
    "direccion" TEXT,
    "barrio" TEXT,
    "ciudad" TEXT NOT NULL DEFAULT 'Villa Mercedes',
    "provincia" TEXT NOT NULL DEFAULT 'San Luis',
    "precio" DOUBLE PRECISION NOT NULL,
    "moneda" TEXT NOT NULL DEFAULT 'USD',
    "superficieTotal" DOUBLE PRECISION,
    "superficieCubierta" DOUBLE PRECISION,
    "dormitorios" INTEGER,
    "banos" INTEGER,
    "cochera" BOOLEAN NOT NULL DEFAULT false,
    "antiguedad" INTEGER,
    "piso" INTEGER,
    "ambientes" INTEGER,
    "servicioLuz" BOOLEAN NOT NULL DEFAULT false,
    "servicioAgua" BOOLEAN NOT NULL DEFAULT false,
    "servicioGas" BOOLEAN NOT NULL DEFAULT false,
    "servicioInternet" BOOLEAN NOT NULL DEFAULT false,
    "servicioCloacas" BOOLEAN NOT NULL DEFAULT false,
    "servicioPavimento" BOOLEAN NOT NULL DEFAULT false,
    "servicioAlumbrado" BOOLEAN NOT NULL DEFAULT false,
    "fotos" TEXT,
    "fotoPrincipal" TEXT,
    "creadoEn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "actualizadoEn" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Propiedad_pkey" PRIMARY KEY ("id")
);
