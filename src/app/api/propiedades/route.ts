import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/api-auth";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const all = searchParams.get("all") === "true";

  if (all) {
    const { error } = await requireAuth();
    if (error) return error;

    const propiedades = await prisma.propiedad.findMany({
      orderBy: { creadoEn: "desc" },
    });
    return NextResponse.json(propiedades);
  }

  const propiedades = await prisma.propiedad.findMany({
    where: { estado: true },
    orderBy: { creadoEn: "desc" },
  });
  return NextResponse.json(propiedades);
}

export async function POST(request: NextRequest) {
  const { error } = await requireAuth();
  if (error) return error;

  try {
    const body = await request.json();
    const propiedad = await prisma.propiedad.create({ data: body });
    return NextResponse.json(propiedad, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Error al crear la propiedad" }, { status: 400 });
  }
}