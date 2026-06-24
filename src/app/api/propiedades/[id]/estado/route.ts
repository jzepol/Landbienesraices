import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/api-auth";
import { prisma } from "@/lib/prisma";

type RouteParams = { params: Promise<{ id: string }> };

export async function PATCH(request: NextRequest, { params }: RouteParams) {
  const { error } = await requireAuth();
  if (error) return error;

  const { id } = await params;
  const propiedadId = parseInt(id, 10);

  if (isNaN(propiedadId)) {
    return NextResponse.json({ error: "ID inválido" }, { status: 400 });
  }

  try {
    const { estado } = await request.json();
    const propiedad = await prisma.propiedad.update({
      where: { id: propiedadId },
      data: { estado: Boolean(estado) },
    });
    return NextResponse.json(propiedad);
  } catch {
    return NextResponse.json({ error: "Error al actualizar el estado" }, { status: 400 });
  }
}