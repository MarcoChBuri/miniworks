const express = require('express');
const app = express();
const authRoutes = require('./src/modules/auth/auth.controller'); // Importa tu router
const connectDB = require('./src/config/database');

// Conectar a la base de datos
connectDB();    
        
//aqui ponene la rutas de los mosulos que les de para probarque funcionen

// app.use(express.json()); 


// Monta las rutas del módulo de autenticación bajo el prefijo /api/admin
app.use('/api/admin', authRoutes);
//puedes agregar mas rutas de otros modulos si quieres probarlos

const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
