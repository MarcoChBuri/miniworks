
export enum UserRole {
  STUDENT = 'ESTUDIANTE',
  EMPLOYER = 'PUBLICADOR DE TRABAJO',
  ADMIN = 'ADMINISTRADOR'
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  token?: string;
  cedula?: string;
}

export interface Job {
  id: string;
  title: string;
  description: string;
  company: string;
  location: string;
  salary?: number;
  createdAt: string;
  createdBy: string;
  applications?: Array<{
    applicant: { _id: string; name: string; email: string };
    status: string;
    date: string;
  }>;
}

export interface Application {
  id: string;
  jobId: string;
  studentId: string;
  status: 'PENDIENTE' | 'ACEPTADO' | 'RECHAZADO';
  appliedAt: string;
  student?: {
    id: string;
    name: string;
    email: string;
  };
  jobTitle?: string;
}

export interface Review {
  id: string;
  calificacion: number;
  comentario: string;
  studentId?: string;
  employerId?: string;
  createdAt: string;
}
