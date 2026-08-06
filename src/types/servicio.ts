export interface PrecioOrientativo {
  concepto: string;
  desde: number;
  hasta: number;
  unidad: string;
}

export interface TipoServicio {
  nombre: string;
  descripcion: string;
}

export interface FAQ {
  pregunta: string;
  respuesta: string;
}

export interface Servicio {
  slug: string;
  nombre: string;
  nombreCorto: string;
  descripcion: string;
  icono: string;
  keywordPrincipal: string;
  keywordsSecundarias: string[];
  metaTitle: string;
  metaDescription: string;
  intro: string;
  tipos: TipoServicio[];
  preciosOrientativos: PrecioOrientativo[];
  faqs: FAQ[];
}
