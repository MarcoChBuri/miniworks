# Documentación de Rutas del Sistema MiniWorks

## Resumen de Rutas por Módulo

| Módulo | Prefijo | Métodos |
|--------|---------|---------|
| Auth | `/api/admin/auth` | GET, POST |
| Jobs | `/api/jobs` | GET, POST |
| Employers | `/api/employers` | GET, POST, PUT |
| Students | `/api/students` | GET, POST |
| Postulations | `/api/postulations` | POST, PUT |

---

## 1. MÓDULO DE AUTENTICACIÓN (`/api/admin/auth`)

### 1.1 POST `/api/admin/auth/register`
Registra un nuevo usuario en el sistema.

**Requiere:** `express.json()` - Body de la petición

**JSON de Entrada:**
```json
{
  "email": "usuario@miniworks.com",
  "password": "12345678",
  "name": "Juan Pérez",
  "role": "ESTUDIANTE | PUBLICADOR DE TRABAJO | ADMINISTRADOR",
  "cedula": "12345678"
}
```

**JSON de Salida (201 - Éxito):**
```json
{
  "message": "Usuario registrado con éxito.",
  "id": "uuid-del-usuario"
}
```

**JSON de Salida (403 - Error validación):**
```json
{
  "message": "Acceso denegado: estatus de matrícula no activo."
}
```

**JSON de Salida (500 - Error):**
```json
{
  "message": "Error al registrar."
}
```

---

### 1.2 POST `/api/admin/auth/login`
Inicia sesión de usuario y retorna token de autenticación.

**Requiere:** `express.json()` - Body de la petición

**JSON de Entrada:**
```json
{
  "email": "usuario@miniworks.com",
  "password": "12345678"
}
```

**JSON de Salida (200 - Éxito):**
```json
{
  "message": "Login exitoso",
  "user": {
    "id": "uuid",
    "email": "usuario@miniworks.com",
    "name": "Juan Pérez",
    "role": "ESTUDIANTE",
    "token": "jwt-token-aqui"
  }
}
```

**JSON de Salida (401 - Error):**
```json
{
  "message": "Credenciales inválidas"
}
```

---

### 1.3 GET `/api/admin/auth/users`
Obtiene todos los usuarios del sistema.

**Requiere:** `protect` (Middleware de autenticación)  
**Permiso:** Solo administradores pueden acceder

**Headers:**
```
Authorization: Bearer <token>
```

**JSON de Salida (200 - Éxito):**
```json
[
  {
    "id": "uuid",
    "email": "usuario@miniworks.com",
    "name": "Juan Pérez",
    "role": "ESTUDIANTE",
    "cedula": "12345678",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
]
```

**JSON de Salida (403 - Prohibido):**
```json
{
  "message": "Solo administradores pueden ver usuarios."
}
```

---

### 1.4 GET `/api/admin/auth/users/:userId`
Obtiene el perfil de un usuario específico.

**Requiere:** `protect` (Middleware de autenticación)

**Headers:**
```
Authorization: Bearer <token>
```

**JSON de Salida (200 - Éxito):**
```json
{
  "id": "uuid",
  "email": "usuario@miniworks.com",
  "name": "Juan Pérez",
  "role": "ESTUDIANTE",
  "cedula": "12345678"
}
```

---

## 2. MÓDULO DE TRABAJOS (`/api/jobs`)

### 2.1 GET `/api/jobs/all`
Obtiene todos los trabajos publicados.

**Requiere:** Ninguno (ruta pública)

**JSON de Salida (200 - Éxito):**
```json
[
  {
    "id": "uuid",
    "title": "Desarrollador Backend",
    "description": "Trabajo remoto para mantenimiento de API Node.js",
    "company": "Tech Solutions",
    "location": "Quito",
    "salary": 800,
    "createdBy": "uuid-del-empleador",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "applicants": ["uuid-del-estudiante", ...]
  }
]
```

---

### 2.2 GET `/api/jobs/search`
Busca trabajos por palabra clave.

**Query Params:**
```
?query=desarrollador
```

**JSON de Salida (200 - Éxito):**
```json
[
  {
    "id": "uuid",
    "title": "Desarrollador Backend",
    "description": "...",
    "company": "Tech Solutions",
    "location": "Quito"
  }
]
```

**JSON de Salida (400 - Bad Request):**
```json
{
  "message": "Debe proporcionar una palabra clave (query)."
}
```

---

### 2.3 GET `/api/jobs/:id`
Obtiene los detalles de un trabajo específico.

**Path Params:**
- `id` - ID del trabajo

**JSON de Salida (200 - Éxito):**
```json
{
  "id": "uuid",
  "title": "Desarrollador Backend",
  "description": "Trabajo remoto para mantenimiento de API Node.js",
  "company": "Tech Solutions",
  "location": "Quito",
  "salary": 800,
  "createdBy": "uuid-del-empleador",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "applicants": [...]
}
```

**JSON de Salida (404 - No encontrado):**
```json
{
  "message": "Trabajo no encontrado."
}
```

---

### 2.4 POST `/api/jobs/create`
Crea un nuevo trabajo (solo empleadores).

**Requiere:** `protect` (Middleware de autenticación)  
**Permiso:** Solo `PUBLICADOR DE TRABAJO`

**Headers:**
```
Authorization: Bearer <token>
```

**JSON de Entrada:**
```json
{
  "title": "Desarrollador Backend",
  "description": "Trabajo remoto para mantenimiento de API Node.js",
  "company": "Tech Solutions"
}
```

**JSON de Salida (201 - Éxito):**
```json
{
  "message": "Trabajo creado exitosamente.",
  "job": {
    "id": "uuid",
    "title": "Desarrollador Backend",
    "description": "...",
    "company": "Tech Solutions",
    "createdBy": "uuid-del-empleador"
  }
}
```

**JSON de Salida (403 - Prohibido):**
```json
{
  "message": "Solo empleadores pueden crear trabajos."
}
```

---

## 3. MÓDULO DE EMPLEADORES (`/api/employers`)

### 3.1 GET `/api/employers/jobs`
Obtiene los trabajos publicados por el empleador autenticado.

**Requiere:** `protect`  
**Permiso:** Solo `PUBLICADOR DE TRABAJO`

**Headers:**
```
Authorization: Bearer <token>
```

**JSON de Salida (200 - Éxito):**
```json
[
  {
    "id": "uuid",
    "title": "Desarrollador Backend",
    "description": "...",
    "company": "Tech Solutions",
    "applicants": [...]
  }
]
```

---

### 3.2 GET `/api/employers/jobs/:id/applications`
Obtiene las postulaciones de un trabajo específico.

**Requiere:** `protect`  
**Permiso:** Solo `PUBLICADOR DE TRABAJO` o `ADMINISTRADOR`

**Path Params:**
- `id` - ID del trabajo

**Headers:**
```
Authorization: Bearer <token>
```

**JSON de Salida (200 - Éxito):**
```json
[
  {
    "id": "uuid-de-postulacion",
    "jobId": "uuid-del-trabajo",
    "studentId": "uuid-del-estudiante",
    "status": "PENDIENTE | ACEPTADO | RECHAZADO",
    "appliedAt": "2024-01-01T00:00:00.000Z",
    "student": {
      "id": "uuid",
      "name": "Juan Pérez",
      "email": "juan@miniworks.com"
    }
  }
]
```

---

### 3.3 GET `/api/employers/reviews`
Obtiene todas las reseñas del empleador autenticado.

**Requiere:** `protect`  
**Permiso:** Solo `PUBLICADOR DE TRABAJO`

**Headers:**
```
Authorization: Bearer <token>
```

**JSON de Salida (200 - Éxito):**
```json
[
  {
    "id": "uuid",
    "calificacion": 5,
    "comentario": "Excelente desempeño en el proyecto.",
    "studentId": "uuid-del-estudiante",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
]
```

---

### 3.4 POST `/api/employers/reviews/:studentId/send`
Crea una reseña para un estudiante.

**Requiere:** `protect`  
**Permiso:** Solo `PUBLICADOR DE TRABAJO`

**Path Params:**
- `studentId` - ID del estudiante

**Headers:**
```
Authorization: Bearer <token>
```

**JSON de Entrada:**
```json
{
  "calificacion": 5,
  "comentario": "Excelente desempeño en el proyecto."
}
```

**JSON de Salida (201 - Éxito):**
```json
{
  "message": "Reseña creada exitosamente.",
  "data": {
    "id": "uuid",
    "calificacion": 5,
    "comentario": "Excelente desempeño en el proyecto.",
    "studentId": "uuid-del-estudiante",
    "employerId": "uuid-del-empleador"
  }
}
```

---

## 4. MÓDULO DE ESTUDIANTES (`/api/students`)

### 4.1 GET `/api/students/:userId/history`
Obtiene el historial de trabajos del estudiante.

**Path Params:**
- `userId` - ID del estudiante

**JSON de Salida (200 - Éxito):**
```json
[
  {
    "id": "uuid",
    "title": "Desarrollador Backend",
    "company": "Tech Solutions",
    "status": "ACEPTADO",
    "appliedAt": "2024-01-01T00:00:00.000Z"
  }
]
```

---

### 4.2 GET `/api/students/reviews/:id`
Obtiene las reseñas de un estudiante.

**Path Params:**
- `id` - ID del estudiante

**JSON de Salida (200 - Éxito):**
```json
[
  {
    "id": "uuid",
    "calificacion": 5,
    "comentario": "Excelente estudiante, muy dedicado.",
    "employerId": "uuid-del-empleador",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
]
```

---

### 4.3 GET `/api/students/jobs/available`
Obtiene los trabajos disponibles para el estudiante.

**Requiere:** `protect`  
**Permiso:** Solo `ESTUDIANTE`

**Headers:**
```
Authorization: Bearer <token>
```

**JSON de Salida (200 - Éxito):**
```json
[
  {
    "id": "uuid",
    "title": "Desarrollador Backend",
    "description": "...",
    "company": "Tech Solutions",
    "location": "Quito"
  }
]
```

---

### 4.4 POST `/api/students/:employerId/reviews`
Crea una reseña para un empleador.

**Requiere:** `protect`  
**Permiso:** Solo `ESTUDIANTE`

**Path Params:**
- `employerId` - ID del empleador

**Headers:**
```
Authorization: Bearer <token>
```

**JSON de Entrada:**
```json
{
  "calificacion": 4,
  "comentario": "Buena empresa, recomendable."
}
```

**JSON de Salida (201 - Éxito):**
```json
{
  "message": "Reseña creada exitosamente.",
  "data": {
    "id": "uuid",
    "calificacion": 4,
    "comentario": "Buena empresa, recomendable.",
    "studentId": "uuid-del-estudiante",
    "employerId": "uuid-del-empleador"
  }
}
```

---

## 5. MÓDULO DE POSTULACIONES (`/api/postulations`)

### 5.1 POST `/api/postulations/jobs/:jobId/apply`
Postula a un trabajo.

**Requiere:** `protect`  
**Permiso:** Solo `ESTUDIANTE`

**Path Params:**
- `jobId` - ID del trabajo

**Headers:**
```
Authorization: Bearer <token>
```

**JSON de Entrada:**
```json
{}
```
(No requiere body adicional, el studentId se obtiene del token)

**JSON de Salida (201 - Éxito):**
```json
{
  "message": "Postulación enviada exitosamente.",
  "data": {
    "id": "uuid-de-postulacion",
    "jobId": "uuid-del-trabajo",
    "studentId": "uuid-del-estudiante",
    "status": "PENDIENTE",
    "appliedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

**JSON de Salida (403 - Prohibido):**
```json
{
  "message": "Solo estudiantes pueden postularse a trabajos."
}
```

---

### 5.2 PUT `/api/postulations/jobs/:jobId/applications/:applicationId/accept`
Acepta a un postulante en un trabajo.

**Requiere:** `protect`  
**Permiso:** Solo `PUBLICADOR DE TRABAJO`

**Path Params:**
- `jobId` - ID del trabajo
- `applicationId` - ID de la postulación

**Headers:**
```
Authorization: Bearer <token>
```

**JSON de Entrada:**
```json
{}
```
(No requiere body adicional)

**JSON de Salida (200 - Éxito):**
```json
{
  "message": "Postulante aceptado exitosamente.",
  "data": {
    "id": "uuid-de-postulacion",
    "jobId": "uuid-del-trabajo",
    "studentId": "uuid-del-estudiante",
    "status": "ACEPTADO",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

**JSON de Salida (403 - Prohibido):**
```json
{
  "message": "Solo empleadores pueden aceptar postulantes."
}
```

---

## 6. MIDDLEWARE DE AUTENTICACIÓN

### Estructura del Token JWT
El token JWT contiene la siguiente información:
```json
{
  "id": "uuid-del-usuario",
  "email": "usuario@miniworks.com",
  "role": "ESTUDIANTE | PUBLICADOR DE TRABAJO | ADMINISTRADOR",
  "iat": 1234567890,
  "exp": 1234567890
}
```

### Headers Requeridos
```
Authorization: Bearer <jwt-token>
```

---

## 7. RESPUESTAS DE ERROR COMUNES

| Código | Descripción |
|--------|-------------|
| 400 | Bad Request - Faltan datos requeridos |
| 401 | Unauthorized - Token inválido o expirado |
| 403 | Forbidden - No tiene permiso para acceder |
| 404 | Not Found - Recurso no encontrado |
| 500 | Internal Server Error - Error del servidor |

---

## 8. RUTAS SWAGGER UI

- **Documentación interactiva:** `http://localhost:3000/api-docs`

---

## Notas Importantes

1. **Validación de Estudiantes:** Los estudiantes deben tener un correo universitario válido con estatus de matrícula activo para poder registrarse.

2. **Roles disponibles:**
   - `ESTUDIANTE` - Puede ver trabajos, postularse y dejar reseñas
   - `PUBLICADOR DE TRABAJO` - Puede crear trabajos, ver postulaciones y dejar reseñas
   - `ADMINISTRADOR` - Acceso completo al sistema

3. **Estado de Postulaciones:**
   - `PENDIENTE` - Postulación recibida, en espera de revisión
   - `ACEPTADO` - Postulante aceptado por el empleador
   - `RECHAZADO` - Postulante rechazado

4. **Todas las rutas que requieren autenticación deben incluir el header `Authorization: Bearer <token>`**

