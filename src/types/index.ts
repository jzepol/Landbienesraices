export interface PropiedadFormData {
  titulo: string;
  descripcion: string;
  tipo: string;
  operacion: string;
  estado: boolean;
  direccion: string;
  barrio: string;
  ciudad: string;
  provincia: string;
  precio: number;
  moneda: string;
  superficieTotal: number | null;
  superficieCubierta: number | null;
  dormitorios: number | null;
  banos: number | null;
  cochera: boolean;
  antiguedad: number | null;
  piso: number | null;
  ambientes: number | null;
  servicioLuz: boolean;
  servicioAgua: boolean;
  servicioGas: boolean;
  servicioInternet: boolean;
  servicioCloacas: boolean;
  servicioPavimento: boolean;
  servicioAlumbrado: boolean;
  fotos: string[];
  fotoPrincipal: string;
}

export interface PropiedadFilters {
  tipo?: string;
  operacion?: string;
  estado?: string;
}