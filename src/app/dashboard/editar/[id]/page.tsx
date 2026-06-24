import { notFound } from "next/navigation";
import PropertyForm from "@/components/dashboard/PropertyForm";
import { prisma } from "@/lib/prisma";

type PageProps = { params: Promise<{ id: string }> };

export default async function EditarPropiedadPage({ params }: PageProps) {
  const { id } = await params;
  const propiedadId = parseInt(id, 10);

  if (isNaN(propiedadId)) notFound();

  const propiedad = await prisma.propiedad.findUnique({
    where: { id: propiedadId },
  });

  if (!propiedad) notFound();

  return <PropertyForm propiedad={propiedad} />;
}