export enum UserRole {
  STUDENT = 'Estudiante',
  EMPLOYER = 'Empleador'
}

export interface Job {
  id: string;
  title: string;
  department: string;
  logoUrl: string;
  description: string;
  tags: string[];
  location: string;
  hours: string;
  salary?: string;
}

export enum ApplicationStatus {
  SUBMITTED = 'Postulado',
  REVIEWING = 'Analizando',
  TESTING = 'En Prueba',
  ACCEPTED = 'Aceptado',
  REJECTED = 'Rechazado'
}

export interface Application {
  id: string;
  jobTitle: string;
  department: string;
  status: ApplicationStatus;
}
