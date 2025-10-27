const express = require('express');
const router = express.Router();

const perfilService = require('../auth/perfil.service');
const studentService = require('./student.service');
const jobService = require('../jobs/job.service');

router.post('/register', express.json(), async (req, res) => {
    try {
        const { email, password, name } = req.body;
        const user = await perfilService.registerStudent(email, password, name, 'ESTUDIANTE');
        res.status(201).json({ message: "Usuario registrado con éxito.", id: user.id });
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message || "Error al registrar." });
    }
});


router.get('/:userId/history', async (req, res) => {
    try {
        const userId = req.params.userId;
        const history = await studentService.getStudentHistory(userId);
        res.json(history);
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message || "Error al cargar historial." });
    }
});

router.get('/:userId/reviews', async (req, res) => {    
    try {
        const userId = req.params.userId;
        const reviews = await studentService.getStudentReviews(userId);
        res.json(reviews);
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message || "Error al cargar reseñas." });
    }
});

router.get('/jobs/available', async (req, res) => {
    try {
        const jobs = await jobService.getAvailableJobs();
        res.status(200).json(jobs);
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message || "Error al obtener trabajos disponibles." });
    }
});


router.post('/jobs/:id/apply', async (req, res) => {
    try {
        const { id } = req.params;
        const { studentId } = req.body;
        await jobService.applyToJob(studentId, id);
        res.status(201).json({ message: "Postulación enviada exitosamente." });
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message || "Error al postular a trabajo." });
    }
});

module.exports = router;
