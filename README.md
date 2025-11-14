# 📌 Mini Empleos UNL
# 📑 Índice

1. [Mini Empleos UNL](#-mini-empleos-unl)
2. [Requerimientos del Proyecto](#-requerimientos-del-proyecto)
3. [Arquitectura Seleccionada](#-arquitectura-seleccionada)
4. [Estándares de Codificación Adoptados](#-estándares-de-codificación-adoptados)
5. [Flujo de Trabajo con GitFlow](#-flujo-de-trabajo-con-gitflow)
6. [Instrucciones de Ejecución](#-instrucciones-de-ejecución)
   - [Clonar el repositorio](#1-clonar-el-repositorio)
   - [Configurar Backend (Express.js)](#2-configurar-backend-expressjs)
   - [Configurar Frontend Web (React)](#3-configurar-frontend-web-react)
   - [Configurar Frontend Móvil (React Native)](#4-configurar-frontend-móvil-react-native)
7. [Documentacion-Arquitectura]((https://github.com/MarcoChBuri/miniworks/tree/develop/docs))




Plataforma de **mini empleos** en la cual:
- Los **empleados** son estudiantes de la Universidad Nacional de Loja (UNL).  
- Los **empleadores** son personas o entidades externas que ofrecen **trabajos simples, cortos y de máximo 2 días**, con pago por hora o por día.  
- Los estudiantes se registran, completan su perfil y **postulan** a los empleos.  
- Los empleadores registran sus ofertas y eligen al estudiante basándose en su "hoja de vida" o presentación.  

El sistema incluye:
- **Backend**: Express.js  
- **Frontend Web**: React  
- **Frontend Móvil**: React Native  
- **Base de Datos**: MongoDB Atlas  

---

## 📋 Requerimientos del Proyecto

1. **Usuarios principales**:
   - Estudiantes (empleados).
   - Empleadores (publican trabajos).

2. **Módulos principales**:
   - Registro y autenticación de usuarios (JWT).
   - Gestión de perfiles de estudiantes y empleadores.
   - Publicación y gestión de empleos.
   - Postulación a empleos por parte de estudiantes.
   - Selección de estudiantes por parte de empleadores.
   - Historial de empleos realizados.

3. **Tecnologías**:
   - **Backend**: Node.js + Express.js
   - **Frontend Web**: React
   - **Frontend Móvil**: React Native
   - **Base de Datos**: MongoDB Atlas
   - **Control de versiones**: Git + GitFlow

---

## 🏗️ Arquitectura Seleccionada

El proyecto se puede implementar bajo dos enfoques:

- **Opción 1: Monolito modular**
  - Backend con Express como API central.
  - Un único servidor gestionando usuarios, empleos y postulaciones.
  - Recomendado para la primera fase (más simple de desplegar y mantener).

- **Opción 2: Microservicios (Recomendado a futuro)**
  - Separar en servicios:  
    - Servicio de autenticación.  
    - Servicio de gestión de empleos.  
    - Servicio de postulaciones y selección.  
  - Cada microservicio con su propia colección en MongoDB Atlas.
  - Escalable para una versión de producción.

⚠️ **Recomendación inicial:** empezar con monolito y migrar gradualmente a microservicios cuando el proyecto crezca.

---

## ✅ Estándares de Codificación Adoptados

- **Backend (Express.js)**:
  - Estilo de código: [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript).
  - Uso de `ESLint` + `Prettier`.
  - Rutas RESTful claras (ej: `/api/v1/jobs`, `/api/v1/students`).
  - Manejo de errores centralizado con middleware.

- **Frontend Web (React)**:
  - Hooks y componentes funcionales.
  - Uso de TypeScript recomendado (si es posible).
  - Arquitectura por componentes y vistas.
  - Manejo de estado con Context API o Redux Toolkit.

- **Frontend Móvil (React Native)**:
  - Uso de Expo para desarrollo rápido.
  - Reutilización de componentes comunes cuando sea posible.
  - Estándares de UI consistentes con la web.

- **General**:
  - Nombres de variables y funciones en **camelCase**.
  - Nombres de clases en **PascalCase**.
  - Commits descriptivos siguiendo la convención:  
    ```
    feat: nueva funcionalidad
    fix: corrección de bug
    docs: documentación
    style: cambios de estilo/código
    refactor: refactorización de código
    ```

---

## 🌱 Flujo de Trabajo con GitFlow

- **Ramas principales**:
  - `main`: código estable listo para producción.
  - `develop`: integración de nuevas funcionalidades antes de pasar a producción.

- **Ramas de apoyo**:
  - `feature/nombre-funcionalidad`: nuevas características.
  - `fix/nombre-fix`: correcciones de errores.
  - `release/x.x.x`: preparación de una versión para producción.
  - `hotfix/x.x.x`: correcciones urgentes en producción.

**Ejemplo de flujo:**
1. Crear rama: `git checkout -b feature/registro-estudiantes develop`
2. Desarrollar la funcionalidad.
3. Hacer commit con convención.
4. Subir cambios: `git push origin feature/registro-estudiantes`
5. Crear **Pull Request** hacia `develop`.
6. Una vez testeado, se mergea `develop` → `main` para la versión estable.

---

## 🚀 Instrucciones de Ejecución

### 1. Clonar el repositorio
```bash
git clone https://github.com/usuario/mini-empleos-unl.git
cd mini-empleos-unl

### 2. Configurar Backend (Express.js)
cd backend
npm install
cp .env.example .env   # Configurar variables de entorno (MongoDB URI, JWT_SECRET, etc.)
npm run dev

### 3. Configurar Frontend Web (React)
cd frontend-web
npm install
npm start

### 3. Configurar Frontend Web (React)
cd frontend-mobile
npm install
npx expo start
