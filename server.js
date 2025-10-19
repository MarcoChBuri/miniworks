const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const connectDB = require('./src/config/database');

const authRoutes = require('./src/modules/auth/auth.controller');
const jobsRoutes = require('./src/modules/jobs/jobs.controller');

const app = express();
// Conectar a la base de datos
connectDB();    
        
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'MiniWorks API',
      version: '1.0.0',
      description: 'Documentación de los endpoints RESTful del proyecto MiniWorks',
      contact: {
        name: 'Equipo MiniWorks',
        email: 'soporte@miniworks.edu.ec'
      }
    },
    servers: [
      {
        url: 'http://localhost:3000/api',
        description: 'Servidor local de desarrollo'
      }
    ]
  },
  apis: ['./src/modules/**/*.js'], // Swagger buscará comentarios aquí
};

const swaggerSpecs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

// 🧩 Rutas principales
app.use('/api/admin/auth', authRoutes);
//trabajos
app.use('/api/jobs', jobsRoutes);
const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
