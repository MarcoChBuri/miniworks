# Documentación del Prototipo de UI - UNL Job Portal

Este documento detalla el prototipo de interfaz de usuario implementado para el portal de empleos de la UNL. El prototipo consta de 8 pantallas principales diseñadas para ser "Mobile-First", utilizando React.js y Tailwind CSS.

## Flujo de Usuario

El flujo general de la aplicación cubre dos roles principales: **Estudiante** y **Empleador**.

1.  **Autenticación:** El usuario ingresa a través del **Login**. Si no tiene cuenta, procede al **Registro** donde selecciona su rol.
2.  **Navegación Principal (Estudiante):** Al ingresar, el estudiante ve la **Lista de Empleos**. Desde la barra de navegación inferior, puede acceder a sus **Postulaciones** o a su **Perfil**.
3.  **Postulación:** Desde la lista, el estudiante selecciona una oferta para ver los **Detalles del Empleo**. Si le interesa, procede a la pantalla de **Postularse**.
4.  **Gestión (Empleador):** El empleador puede acceder a la pantalla de **Publicar Empleo** (accesible vía flujo de registro de empleador o botón específico en futuras iteraciones).

---

## Pantallas del Prototipo

### 1. Inicio de Sesión (Login)
*   **Propósito:** Permitir a los usuarios existentes (estudiantes y empleadores) acceder a la plataforma.
*   **Componentes Principales:**
    *   Logo institucional de la UNL.
    *   Campo de entrada para Email o Usuario.
    *   Campo de entrada para Contraseña (con opción de visibilidad).
    *   Enlace "Olvidé mi contraseña".
    *   Botón principal "Iniciar Sesión".
    *   Enlace para redirigir al Registro.
*   **Captura de Pantalla:**
    ![Pantalla de Login](img/login.png)

### 2. Registro de Usuarios (Register)
*   **Propósito:** Capturar los datos necesarios para crear una nueva cuenta y definir el rol del usuario.
*   **Componentes Principales:**
    *   Selector de Perfil (Toggle): Estudiante / Empleador.
    *   Formulario: Nombre y Apellido, Correo Institucional, Contraseña.
    *   Botón "Registrarse".
    *   Enlace para volver al Inicio de Sesión.
*   **Captura de Pantalla:**
    ![Pantalla de Registro](img/register.png)

### 3. Lista de Empleos (Feed)
*   **Propósito:** Pantalla principal donde los estudiantes exploran las ofertas laborales disponibles.
*   **Componentes Principales:**
    *   Barra superior con menú y notificaciones.
    *   Barra de búsqueda ("Buscar por título, empresa...").
    *   Filtros rápidos (Chips): Filtros, Categoría, Modalidad, Facultad.
    *   Tarjetas de Empleo (Cards): Muestran logo, título, departamento, descripción corta y etiquetas (tags).
    *   Barra de Navegación Inferior (Bottom Nav).
*   **Captura de Pantalla:**
    ![Pantalla de Lista de Empleos](img/job_list.png)

### 4. Detalles del Empleo (Job Detail)
*   **Propósito:** Mostrar información exhaustiva sobre una oferta específica para que el estudiante decida si postularse.
*   **Componentes Principales:**
    *   Encabezado con botón "Atrás".
    *   Cabecera del puesto con Logo y Título.
    *   Secciones de texto: Descripción del Puesto, Requisitos.
    *   Items de información: Ubicación y Salario.
    *   Botón flotante (sticky) "Postularse".
*   **Captura de Pantalla:**
    ![Pantalla de Detalles del Empleo](img/job_detail.png)

### 5. Postularse (Apply)
*   **Propósito:** Formulario final para enviar la candidatura a un empleo seleccionado.
*   **Componentes Principales:**
    *   Área de carga de archivos (Drag & Drop) para adjuntar CV (PDF/DOCX).
    *   Área de texto para mensaje de presentación.
    *   Resumen de información de contacto (Correo y Teléfono) con opción de editar.
    *   Botón "Enviar Postulación".
*   **Captura de Pantalla:**
    ![Pantalla de Postulación](img/apply.png)

### 6. Mis Postulaciones (My Applications)
*   **Propósito:** Permitir al estudiante hacer seguimiento del estado de sus solicitudes enviadas.
*   **Componentes Principales:**
    *   Lista de postulaciones.
    *   Indicadores de Estado (Badges) con código de color:
        *   *Postulado* (Azul)
        *   *Analizando* (Amarillo)
        *   *En Prueba* (Violeta)
        *   *Aceptado* (Verde)
        *   *Rechazado* (Rojo)
    *   Barra de Navegación Inferior.
*   **Captura de Pantalla:**
    ![Pantalla de Mis Postulaciones](img/my_applications.png)

### 7. Publicar Empleo (Create Job)
*   **Propósito:** Herramienta para que los empleadores creen nuevas ofertas laborales.
*   **Componentes Principales:**
    *   Botón "Cancelar".
    *   Formulario: Título, Descripción (Textarea), Requisitos (Textarea), Ubicación, Salario (Opcional).
    *   Botón "Publicar Empleo".
*   **Captura de Pantalla:**
    ![Pantalla de Crear Empleo](img/create_job.png)

### 8. Mi Perfil (Profile)
*   **Propósito:** Visualización y edición de la información personal y académica del estudiante.
*   **Componentes Principales:**
    *   Foto de perfil y Nombre.
    *   Estadísticas: Trabajos Completados, Calificación, Postulaciones.
    *   Pestañas (Tabs): Información, Historial, Valoraciones.
    *   Lista de datos de contacto (Correo, Teléfono, Facultad).
    *   Sección "Sobre mí".
    *   Barra de Navegación Inferior.
*   **Captura de Pantalla:**
    ![Pantalla de Perfil](img/profile.png)
