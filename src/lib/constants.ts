export const WHATSAPP_NUMBER = "5492657790585";
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;
export const CONTACT_EMAIL = "info@landbienesraices.com";
export const CONTACT_PHONE = "+54 9 2657 790585";
export const CONTACT_ADDRESS = "Av. Libertador 1234, Villa Mercedes, San Luis";
export const INSTAGRAM_URL =
  "https://www.instagram.com/land_br_2026?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==";
export const INSTAGRAM_HANDLE = "@land_br_2026";

export const TIPOS_PROPIEDAD = [
  "Casa",
  "Departamento",
  "Terreno",
  "Local comercial",
  "Oficina",
  "Cochera",
] as const;

export const OPERACIONES = ["Venta", "Alquiler", "Alquiler temporal"] as const;

export const MONEDAS = ["USD", "ARS"] as const;

export const SERVICIOS = [
  { key: "servicioLuz", label: "Luz eléctrica" },
  { key: "servicioAgua", label: "Agua corriente" },
  { key: "servicioGas", label: "Gas natural" },
  { key: "servicioInternet", label: "Conexión a internet / fibra óptica" },
  { key: "servicioCloacas", label: "Cloacas" },
  { key: "servicioPavimento", label: "Pavimento" },
  { key: "servicioAlumbrado", label: "Alumbrado público" },
] as const;