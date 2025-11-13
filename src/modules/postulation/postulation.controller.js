const express = require('express');
const router = express.Router();
const PostulationService = require('./postulation.service');
const { protect } = require('../../middlewares/auth.middleware');

router.post('/jobs/:jobId/apply', protect, async (req, res) => {
    try {
        if (req.user.role !== 'ESTUDIANTE') {
            return res.status(403).json({ message: "Solo estudiantes pueden postularse a trabajos." });
        }

        const studentId = req.user.id;
        const { jobId } = req.params;

        const result = await PostulationService.applyToJob(studentId, jobId);

        res.status(201).json({
            message: "Postulación enviada exitosamente.",
            data: result
        });
    } catch (error) {
        res.status(error.status || 500).json({
            message: error.message || "Error al postular al trabajo."
        });
    }
});


// 🧩 Empleador acepta a un postulante
router.put('/jobs/:jobId/applications/:applicationId/accept', protect, async (req, res) => {
    try {
        if (req.user.role !== 'PUBLICADOR DE TRABAJO') {
            return res.status(403).json({ message: "Solo empleadores pueden aceptar postulantes." });
        }

        const employerId = req.user.id;
        const { jobId, applicationId } = req.params;

        const result = await PostulationService.acceptApplicant(employerId, jobId, applicationId);

        res.status(200).json({
            message: "Postulante aceptado exitosamente.",
            data: result
        });
    } catch (error) {
        res.status(error.status || 500).json({
            message: error.message || "Error al aceptar postulante."
        });
    }
});

module.exports = router;
