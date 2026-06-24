import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/api-auth";
import { prisma } from "@/lib/prisma";

type RouteParams = { params: Promise<{ id: string }> };

export async function GET(_request: NextRequest, { params }: RouteParams) {
  const { id } = await params;
  const propiedadId = parseInt(id, 10);

  if (isNaN(propiedadId)) {
    return NextResponse.json({ error: "ID inválido" }, { status: 400 });
  }

  const propiedad = await prisma.propiedad.findUnique({
    where: { id: propiedadId },
  });

  if (!propiedad) {
    return NextResponse.json({ error: "Propiedad no encontrada" }, { status: 404 });
  }

  return NextResponse.json(propiedad);
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
  const { error } = await requireAuth();
  if (error) return error;

  const { id } = await params;
  const propiedadId = parseInt(id, 10);

  if (isNaN(propiedadId)) {
    return NextResponse.json({ error: "ID inválido" }, { status: 400 });
  }

  try {
    const body = await request.json();
    const propiedad = await prisma.propiedad.update({
      where: { id: propiedadId },
      data: body,
    });
    return NextResponse.json(propiedad);
  } catch {
    return NextResponse.json({ error: "Error al actualizar la propiedad" }, { status: 400 });
  }
}

export async function DELETE(_request: NextRequest, { params }: RouteParams) {
  const { error } = await requireAuth();
  if (error) return error;

  const { id } = await params;
  const propiedadId = parseInt(id, 10);

  if (isNaN(propiedadId)) {
    return NextResponse.json({ error: "ID inválido" }, { status: 400 });
  }

  try {
    await prisma.propiedad.delete({ where: { id: propiedadId } });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Error al eliminar la propiedad" }, { status: 400 });
  }
}