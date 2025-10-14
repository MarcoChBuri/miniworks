const express = require('express');
const router = express.Router();
const authService = require('./auth.service');
const perfilService = require('./perfil.service');
//const { protect } = require('../../middlewares/auth.middleware'); // ELIMINADO

// --- RUTAS PÚBLICAS ---

// [POST] /auth/register - (Registro sin cambios)
router.post('/register', async (req, res) => {
    try {
        const { email, password, name, role } = req.body;
        const user = await perfilService.registerUser(email, password, name, role);
        res.status(201).json({ message: "Usuario registrado con éxito.", id: user.id });
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message || "Error al registrar." });
    }
});

// [POST] /auth/login - Iniciar sesión y obtener ID/ROL
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        // El login ahora devuelve el ID y ROL
        const authData = await authService.login(email, password); 
        
        // Devolvemos los datos del usuario logueado. (Esto es lo que reemplaza al token)
        res.json({ message: "Login exitoso", user: authData }); 
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message || "Error al iniciar sesión." });
    }
});

// --- RUTA PRIVADA MODIFICADA (Temporalmente Insegura) ---

// [GET] /auth/perfil - REQUIERE que se envíe el ID del usuario en la URL o Body para la prueba
router.get('/perfil/:userId', async (req, res) => {
    try {
        // En un escenario real, el ID vendría de la sesión (JWT). 
        // Aquí, lo tomamos del parámetro de la URL para poder probar la ruta.
        const userId = req.params.userId; 
        
        const profile = await perfilService.getProfile(userId); 
        res.json(profile);
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message || "Error al cargar perfil." });
    }
});

module.exports = router;
// este se encarga de ontener el perfil del usuario y de registrar nuevos usuarios y de iniciar sesion
// Nota: La ruta /perfil es insegura en este estado. En producción, se debe usar un mecanismo de autenticación robusto (como JWT) para protegerla.
// Estamos omitiendo la protección real para facilitar las pruebas en este entorno sin JWT.