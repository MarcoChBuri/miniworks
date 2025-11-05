const express = require('express');
const router = express.Router();
const employerService = require('./employer.service');

router.get('/applications/:id', async (req, res) => {
    try {
        const employerId = req.params.id;
        const applications = await employerService.getApplicationsByEmployer(employerId);
        res.status(200).json(applications);
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message || "Error al obtener postulaciones." });
    }
});

router.put('/applications/:id/accept', async (req, res) => {
    try {
        const applicationId = req.params.id;
        const updated = await employerService.acceptApplicant(applicationId);
        res.status(200).json({ message: "Postulante aceptado exitosamente.", data: updated });
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message || "Error al aceptar postulante." });
    }
});

// Dejar reseña a un estudiante
router.post('/students/:id/review', async (req, res) => {
    try {
        const studentId = req.params.id;
        const { calificacion, comentario } = req.body;

        const review = await employerService.createReviewForStudent(studentId, calificacion, comentario);
        res.status(201).json({ message: "Reseña creada exitosamente.", review });
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message || "Error al dejar reseña." });
    }
});

router.get('/reviews/:id', async (req, res) => {
    try {
        const employerId = req.params.id;
        const reviews = await employerService.getReviewsByEmployer(employerId);
        res.status(200).json(reviews);
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message || "Error al obtener las reseñas del empleador." });
    }
});

router.get('/jobs/:id', async (req, res) => {
    try {
        const employerId = req.params.id;
        const jobs = await employerService.getJobsByEmployer(employerId);
        res.status(200).json(jobs);
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message || "Error al obtener trabajos." });
    }
});

router.put('/profile/:id', async (req, res) => {
    try {
        const employerId = req.params.id;
        const updatedData = req.body;
        const updatedProfile = await employerService.updateEmployer(employerId, updatedData);
        res.status(200).json({ message: "Perfil actualizado exitosamente.", data: updatedProfile });
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message || "Error al actualizar perfil." });
    }
});

module.exports = router;
