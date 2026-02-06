
import { User, UserRole, Job, Application, Review } from '../types';

const API_BASE = 'http://localhost:3000/api';

const getAuthHeader = (): Record<string, string> => {
  const saved = localStorage.getItem('miniworks_user');
  if (saved) {
    const user = JSON.parse(saved);
    return { 'Authorization': `Bearer ${user.token}` };
  }
  return {};
};

const handleResponse = async (res: Response) => {
  let data;
  try {
    data = await res.json();
  } catch (e) {
    // If response is not JSON, use empty object
    data = {};
  }
  if (!res.ok) {
    throw new Error(data?.message || `Error en la petición al servidor (código ${res.status})`);
  }
  return data;
};

// Transform MongoDB _id to id for frontend compatibility
const transformJob = (job: any): Job => ({
  id: job._id || job.id,
  title: job.title,
  description: job.description,
  company: job.company,
  location: job.location,
  salary: job.salary,
  createdAt: job.createdAt,
  createdBy: job.createdBy,
  applications: job.applications
});

const transformJobs = (jobs: any): Job[] => {
  if (!jobs || !Array.isArray(jobs)) return [];
  return jobs.map(transformJob);
};

const transformApplication = (app: any): Application => ({
  id: app._id || app.id,
  jobId: app.jobId,
  studentId: app.studentId,
  status: app.status,
  appliedAt: app.appliedAt,
  student: app.student,
  jobTitle: app.jobTitle
});

const transformApplications = (apps: any[]): Application[] => {
  if (!Array.isArray(apps)) return [];
  return apps.map(transformApplication);
};

export const api = {
  auth: {
    login: (credentials: any) => 
      fetch(`${API_BASE}/admin/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
      }).then(handleResponse),

    register: (data: any) => 
      fetch(`${API_BASE}/admin/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      }).then(handleResponse),

    getUsers: () => 
      fetch(`${API_BASE}/admin/auth/users`, {
        headers: { ...getAuthHeader() }
      }).then(handleResponse),

    getProfile: (userId: string) => 
      fetch(`${API_BASE}/admin/auth/users/${userId}`, {
        headers: { ...getAuthHeader() }
      }).then(handleResponse)
  },

  jobs: {
    getAll: (): Promise<Job[]> => 
      fetch(`${API_BASE}/jobs/all`).then(handleResponse).then(transformJobs),
    
    search: (query: string): Promise<Job[]> => 
      fetch(`${API_BASE}/jobs/search?query=${encodeURIComponent(query)}`).then(handleResponse).then(transformJobs),
    
    getById: (id: string): Promise<Job> => 
      fetch(`${API_BASE}/jobs/${id}`).then(handleResponse).then(transformJob),
    
    create: (data: any): Promise<any> => 
      fetch(`${API_BASE}/jobs/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...getAuthHeader() },
        body: JSON.stringify(data)
      }).then(handleResponse)
  },

  employers: {
    getMyJobs: (): Promise<Job[]> => 
      fetch(`${API_BASE}/employers/jobs`, {
        headers: { ...getAuthHeader() }
      }).then(handleResponse).then(transformJobs),

    getApplications: (jobId: string): Promise<Application[]> => 
      fetch(`${API_BASE}/employers/jobs/${jobId}/applications`, {
        headers: { ...getAuthHeader() }
      }).then(handleResponse).then((data: any) => {
        // El backend devuelve { title, applications: [...] }
        // Convertir al formato que espera el frontend
        if (data.applications && Array.isArray(data.applications)) {
          return data.applications.map((app: any, index: number) => {
            // Verificar si applicant ya está populado o es un ObjectId
            const applicant = app.applicant;
            const isPopulated = applicant && typeof applicant === 'object' && applicant.name;
            
            return {
              id: app._id || `app-${index}`,
              jobId: jobId,
              studentId: isPopulated ? applicant._id : applicant,
              status: app.status?.toUpperCase() || 'PENDIENTE',
              appliedAt: app.date || app.appliedAt || new Date().toISOString(),
              student: isPopulated ? {
                id: applicant._id,
                name: applicant.name,
                email: applicant.email
              } : {
                id: String(applicant),
                name: 'Estudiante',
                email: 'No disponible'
              },
              jobTitle: data.title
            };
          });
        }
        return [];
      }),



    getReviews: (): Promise<Review[]> => 
      fetch(`${API_BASE}/employers/reviews`, {
        headers: { ...getAuthHeader() }
      }).then(handleResponse),

    reviewStudent: (studentId: string, review: { calificacion: number, comentario: string }) => 
      fetch(`${API_BASE}/employers/reviews/${studentId}/send`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...getAuthHeader() },
        body: JSON.stringify(review)
      }).then(handleResponse),

    // Fix: Added updateProfile for employer roles
    updateProfile: (userId: string, data: any) => 
      fetch(`${API_BASE}/employers/profile/${userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', ...getAuthHeader() },
        body: JSON.stringify(data)
      }).then(handleResponse)
  },

  students: {
    getHistory: (userId: string): Promise<Application[]> => 
      fetch(`${API_BASE}/students/${userId}/history`).then(handleResponse).then(transformApplications),

    getReviews: (userId: string): Promise<Review[]> => 
      fetch(`${API_BASE}/students/reviews/${userId}`).then(handleResponse),

    getAvailableJobs: (): Promise<Job[]> => 
      fetch(`${API_BASE}/students/jobs/available`, {
        headers: { ...getAuthHeader() }
      }).then(handleResponse).then(transformJobs),

    reviewEmployer: (employerId: string, review: { calificacion: number, comentario: string }) => 
      fetch(`${API_BASE}/students/${employerId}/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...getAuthHeader() },
        body: JSON.stringify(review)
      }).then(handleResponse)
  },

  postulations: {
    apply: (jobId: string) => 
      fetch(`${API_BASE}/postulations/jobs/${jobId}/apply`, {
        method: 'POST',
        headers: { ...getAuthHeader() }
      }).then(handleResponse),

    accept: (jobId: string, applicationId: string) => 
      fetch(`${API_BASE}/postulations/jobs/${jobId}/applications/${applicationId}/accept`, {
        method: 'PUT',
        headers: { ...getAuthHeader() }
      }).then(handleResponse)
  }
};
