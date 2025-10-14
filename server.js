const express = require('express');
const app = express();
const authRoutes = require('./src/modules/auth/auth.controller'); // Importa tu router
//aqui ponene la rutas de los mosulos que les de para probarque funcionen

app.use(express.json()); // Middleware para leer JSON en el body


// Monta las rutas del módulo de autenticación bajo el prefijo /api/v1/auth
app.use('/api/v1/auth', authRoutes);
//puedes agregar mas rutas de otros modulos si quieres probarlos

const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
