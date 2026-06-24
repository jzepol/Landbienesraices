import { WHATSAPP_URL } from "./constants";

export function formatPrice(precio: number, moneda: string): string {
  const formatted = new Intl.NumberFormat("es-AR", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(precio);

  return moneda === "USD" ? `USD ${formatted}` : `$ ${formatted}`;
}

export function parseFotos(fotos: string | null): string[] {
  if (!fotos) return [];
  try {
    const parsed = JSON.parse(fotos);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function getWhatsAppLink(message: string): string {
  return `${WHATSAPP_URL}?text=${encodeURIComponent(message)}`;
}

export function getPropertyWhatsAppMessage(
  titulo: string,
  id: number,
  operacion: string
): string {
  return `Hola! Me interesa la propiedad "${titulo}" (Ref: #${id}) en ${operacion}. ¿Podrían brindarme más información?`;
}