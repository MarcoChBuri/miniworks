const express = require('express');
const { route } = require('../auth/auth.controller');
const router = express.Router();

// Importa tus servicios (ajusta las rutas según tu estructura real)
const perfilService = require('../perfil.service');
const studentService = require('./student.service');
const jobService = require('../jobs/job.service');

// ---------------------------------------------------------
// Registro de estudiante
// POST /api/students/register
// ---------------------------------------------------------
router.post('/register', express.json(), async (req, res) => {
    try {
        const { email, password, name } = req.body;
        const user = await perfilService.registerStudent(email, password, name, 'ESTUDIANTE');
        res.status(201).json({ message: "Usuario registrado con éxito.", id: user.id });
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message || "Error al registrar." });
    }
});

// ---------------------------------------------------------
// Ver historial del estudiante
// GET /api/students/:userId/history
// ---------------------------------------------------------
router.get('/:userId/history', async (req, res) => {
    try {
        const userId = req.params.userId;
        const history = await studentService.getStudentHistory(userId);
        res.json(history);
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message || "Error al cargar historial." });
    }
});

// ---------------------------------------------------------
// Ver reseñas del estudiante
// GET /api/students/:userId/reviews
// ---------------------------------------------------------
router.get('/:userId/reviews', async (req, res) => {    
    try {
        const userId = req.params.userId;
        const reviews = await studentService.getStudentReviews(userId);
        res.json(reviews);
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message || "Error al cargar reseñas." });
    }
});

// ---------------------------------------------------------
// 🔹 Ver trabajos disponibles
// GET /api/students/jobs/available
// ---------------------------------------------------------
router.get('/jobs/available', async (req, res) => {
    try {
        const jobs = await jobService.getAvailableJobs();
        res.status(200).json(jobs);
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message || "Error al obtener trabajos disponibles." });
    }
});

// ---------------------------------------------------------
// 🔹 Postular a un trabajo
// POST /api/students/jobs/:id/apply
// ---------------------------------------------------------
router.post('/jobs/:id/apply', async (req, res) => {
    try {
        const { id } = req.params;
        const { studentId } = req.body; // puede venir del body o del token JWT
        await jobService.applyToJob(studentId, id);
        res.status(201).json({ message: "Postulación enviada exitosamente." });
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message || "Error al postular a trabajo." });
    }
});

module.exports = router;


