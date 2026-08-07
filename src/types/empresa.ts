export interface EmpresaPayload {
  nombre: string;
  cif?: string;
  email: string;
  telefono?: string;
  servicios: string[];
  ciudades: string[];
  descripcion?: string;
}
