export interface LeadPayload {
  nombre: string;
  email: string;
  telefono?: string;
  comunidad?: string;
  direccion?: string;
  ciudad?: string;
  servicios?: string[];
  descripcion?: string;
  urgencia?: 'baja' | 'media' | 'alta';
  fuente?: string;
}
