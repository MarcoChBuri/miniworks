const express = require('express');
const app = express();
const authRoutes = require('./src/modules/auth/auth.controller'); // Importa tu router
const connectDB = require('./src/config/database');

connectDB();    
        

app.use('/api/admin', authRoutes);

const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
