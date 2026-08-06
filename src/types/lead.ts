export interface Lead {
  id?: string;
  created_at?: string;
  nombre: string;
  email: string;
  telefono?: string;
  comunidad?: string;
  direccion?: string;
  ciudad?: string;
  servicios: string[];
  descripcion?: string;
  urgencia: 'baja' | 'media' | 'alta';
  fuente: 'web' | 'email' | 'telefono' | 'referido';
  estado: 'nuevo' | 'contactado' | 'visita' | 'presupuesto' | 'ganado' | 'perdido';
}

export interface Candidato {
  id?: string;
  created_at?: string;
  nombre: string;
  email: string;
  telefono?: string;
  puesto: string;
  experiencia: string;
  zona: string;
  disponibilidad: string;
  cv_url?: string;
  descripcion?: string;
}
