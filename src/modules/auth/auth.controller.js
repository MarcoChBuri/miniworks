const express = require('express');
const router = express.Router();
const authService = require('./auth.service');
const perfilService = require('./perfil.service');

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Endpoints de autenticación y usuarios
 */

/**
 * @swagger
 * /api/admin/auth/users:
 *   get:
 *     summary: Obtiene todos los usuarios registrados
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Lista de usuarios cargada exitosamente
 *       500:
 *         description: Error al cargar usuarios
 */
router.get('/users', async (req, res) => {
    try {
        const users = await perfilService.getAllUsers();
        res.json(users);
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message || "Error al cargar usuarios." });
    }
});

/**
 * @swagger
 * /api/admin/auth/users/{userId}:
 *   get:
 *     summary: Obtiene el perfil de un usuario por ID
 *     tags: [Auth]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Perfil del usuario
 *       404:
 *         description: Usuario no encontrado
 */
router.get('/users/:userId', async (req, res) => {
    try {
        const userId = req.params.userId; 
        const profile = await perfilService.getProfile(userId); 
        res.json(profile);
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message || "Error al cargar perfil." });
    }
});

/**
 * @swagger
 * /api/admin/auth/register:
 *   post:
 *     summary: Registra un nuevo usuario
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               name:
 *                 type: string
 *               role:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuario registrado con éxito
 *       500:
 *         description: Error al registrar
 */
router.post('/register', express.json(), async (req, res) => {
    try {
        const { email, password, name, role } = req.body;
        const user = await perfilService.registerUser(email, password, name, role);
        res.status(201).json({ message: "Usuario registrado con éxito.", id: user.id });
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message || "Error al registrar." });
    }
});

/**
 * @swagger
 * /api/admin/auth/login:
 *   post:
 *     summary: Inicia sesión de usuario
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login exitoso
 *       401:
 *         description: Credenciales inválidas
 */
router.post('/login', express.json(), async (req, res) => {
    try {
        const { email, password } = req.body;
        const authData = await authService.login(email, password); 
        res.json({ message: "Login exitoso", user: authData }); 
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message || "Error al iniciar sesión." });
    }
});

/**
 * @swagger
 * /api/admin/auth/report:
 *   get:
 *     summary: Genera un reporte de usuarios
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Reporte generado correctamente
 *       500:
 *         description: Error al generar reporte
 */
router.get('/report', async (req, res) => {
    try {
        const report = await authService.generateReport();
        res.json(report);
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message || "Error al generar reporte." });
    }
});

module.exports = router;
