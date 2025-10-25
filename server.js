const express = require('express');
const swaggerUi = require('swagger-ui-express');
const cors = require('cors');
const app = express();
const authRoutes = require('./src/modules/auth/auth.controller'); // Importa tu router
const connectDB = require('./src/config/database');

const authRoutes = require('./src/modules/auth/auth.controller');
const jobsRoutes = require('./src/modules/jobs/jobs.controller');
const employerRoutes = require('./src/modules/employer/employer.controller');

const swaggerDocument = require('./src/docs/swagger');
const app = express();
app.use(express.json()); 

// Conectar a la base de datos
connectDB();    
        
// 🧩 Rutas principales
app.use('/api/admin/auth', authRoutes);
//trabajos
app.use('/api/jobs', jobsRoutes);
//Empleadores
app.use('/api/employers', employerRoutes);

// Configuración de Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
