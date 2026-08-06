export interface ContenidoLocalServicio {
  intro: string;
  datoRelevante: string;
  precioContexto: string;
}

export interface Ciudad {
  slug: string;
  nombre: string;
  comunidad: string;
  poblacion: number;
  lat: number;
  lng: number;
  zonas: string[];
  contenidoLocal: Record<string, ContenidoLocalServicio>;
}
