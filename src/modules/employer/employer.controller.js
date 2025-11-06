const express = require('express');
const router = express.Router();
const employerService = require('./employer.service');
const { protect } = require('../../middlewares/auth.middleware');

// Obtener aplicaciones de un empleador
router.get('/applications/:id', protect, async (req, res) => {
    try {
        const employerId = req.params.id;

        // Validar que el usuario sea el mismo empleador o administrador
        if (req.user.role !== 'PUBLICADOR DE TRABAJO' && req.user.role !== 'ADMINISTRADOR') {
            return res.status(403).json({ message: "Acceso denegado." });
        }

        const applications = await employerService.getApplicationsByEmployer(employerId);
        res.status(200).json(applications);
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message || "Error al obtener postulaciones." });
    }
});

// Aceptar un postulante
router.put('/applications/:id/accept', protect, async (req, res) => {
    try {
        if (req.user.role !== 'PUBLICADOR DE TRABAJO') {
            return res.status(403).json({ message: "Solo empleadores pueden aceptar postulantes." });
        }

        const applicationId = req.params.id;
        const updated = await employerService.acceptApplicant(applicationId);
        res.status(200).json({ message: "Postulante aceptado exitosamente.", data: updated });
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message || "Error al aceptar postulante." });
    }
});

// Crear reseña para un estudiante
router.post('/students/:id/review', protect, async (req, res) => {
    try {
        if (req.user.role !== 'PUBLICADOR DE TRABAJO') {
            return res.status(403).json({ message: "Solo empleadores pueden dejar reseñas." });
        }

        const studentId = req.params.id;
        const { calificacion, comentario } = req.body;

        const review = await employerService.createReviewForStudent(studentId, calificacion, comentario);
        res.status(201).json({ message: "Reseña creada exitosamente.", review });
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message || "Error al dejar reseña." });
    }
});

// Obtener reseñas de un empleador
router.get('/reviews/:id', protect, async (req, res) => {
    try {
        const employerId = req.params.id;
        const reviews = await employerService.getReviewsByEmployer(employerId);
        res.status(200).json(reviews);
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message || "Error al obtener reseñas del empleador." });
    }
});

// Obtener trabajos de un empleador
router.get('/jobs/:id', protect, async (req, res) => {
    try {
        const employerId = req.params.id;
        const jobs = await employerService.getJobsByEmployer(employerId);
        res.status(200).json(jobs);
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message || "Error al obtener trabajos." });
    }
});

// Actualizar perfil del empleador
router.put('/profile/:id', protect, async (req, res) => {
    try {
        if (req.user.role !== 'PUBLICADOR DE TRABAJO') {
            return res.status(403).json({ message: "Solo empleadores pueden actualizar su perfil." });
        }

        const employerId = req.params.id;
        const updatedData = req.body;

        const updatedProfile = await employerService.updateEmployer(employerId, updatedData);
        res.status(200).json({ message: "Perfil actualizado exitosamente.", data: updatedProfile });
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message || "Error al actualizar perfil." });
    }
});

module.exports = router;
