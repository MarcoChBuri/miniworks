const express = require('express');
const swaggerUi = require('swagger-ui-express');
const cors = require('cors');
const app = express();

// Importar controladores
const authRoutes = require('./src/modules/auth/auth.controller');
const jobsRoutes = require('./src/modules/jobs/jobs.controller');
const employerRoutes = require('./src/modules/employer/employer.controller');
const studentRoutes = require('./src/modules/students/student.controller');
const postulacionRoutes = require('./src/modules/postulation/postulation.controller');
// Configuración de base de datos y documentación
const connectDB = require('./src/config/database');
const swaggerDocument = require('./src/docs/swagger');

app.use(express.json());
app.use(cors());

// Conectar a la base de datos
connectDB();

// 🧩 Rutas principales
app.use('/api/admin/auth', authRoutes);
app.use('/api/jobs', jobsRoutes);
app.use('/api/employers', employerRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/postulations', postulacionRoutes);

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Servidor
const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));