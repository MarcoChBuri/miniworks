const express = require('express');
const cors = require('cors');
const app = express();
const authRoutes = require('./src/modules/auth/auth.controller'); // Importa tu router
const connectDB = require('./src/config/database');

const allowedOrigins = (process.env.CORS_ORIGINS
  ? process.env.CORS_ORIGINS.split(',').map((o) => o.trim())
  : ['http://localhost:3000']);


//CORS configuration
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error('No permitido por CORS'));
    },
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    optionsSuccessStatus: 204,
  })
);


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((err, req, res, next) => {
  if (err.message.includes('CORS')) {
    console.error('Error de CORS:', err.message);
    return res.status(403).json({ error: 'Acceso no permitido por CORS' });
  }
  next(err);
});

// Conectar a la base de datos
connectDB();    
        
//aqui ponene la rutas de los mosulos que les de para probarque funcionen

// app.use(express.json()); 


// Monta las rutas del módulo de autenticación bajo el prefijo /api/admin
app.use('/api/admin', authRoutes);
//puedes agregar mas rutas de otros modulos si quieres probarlos

const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
