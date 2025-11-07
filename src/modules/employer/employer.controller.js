const express = require('express');
const router = express.Router();
const employerService = require('./employer.service');
const { protect } = require('../../middlewares/auth.middleware');

// router.get('/applications/all', protect, async (req, res) => {
//     try {
//         if (req.user.role !== 'PUBLICADOR DE TRABAJO' && req.user.role !== 'ADMINISTRADOR') {
//             return res.status(403).json({ message: "Acceso denegado." });
//         }

//         const applications = await employerService.getAllApplications();
//         res.status(200).json(applications);
//     } catch (error) {
//         res.status(error.status || 500).json({ message: error.message || "Error al obtener postulaciones." });
//     }
// });

router.get('/jobs/:id/applications', protect, async (req, res) => {
    try {
        const employerId = req.user.id; 
        const jobId = req.params.id; 
        if (req.user.role !== 'PUBLICADOR DE TRABAJO' && req.user.role !== 'ADMINISTRADOR') {
            return res.status(403).json({ message: "Acceso denegado. Solo empleadores pueden ver postulaciones." });
        }

        const applications = await employerService.getApplicationsByJob(employerId, jobId);
        res.status(200).json(applications);
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message || "Error al obtener postulaciones." });
    }
});


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

router.post('/reviews/:id/students/send', protect, async (req, res) => {
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

// router.get('reviews/:id', protect, async (req, res) => {
//     try {
//         const employerId = req.params.id;
//         const reviews = await employerService.getReviewsByEmployer(employerId);
//         res.status(200).json(reviews);
//     } catch (error) {
//         res.status(error.status || 500).json({ message: error.message || "Error al obtener reseñas del empleador." });
//     }
// });

router.get('/jobs/:id', protect, async (req, res) => {
    try {
        const employerId = req.params.id;
        const jobs = await employerService.getJobsByEmployer(employerId);
        res.status(200).json(jobs);
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message || "Error al obtener trabajos." });
    }
});

// router.put('/profile/:id', protect, async (req, res) => {
//     try {
//         if (req.user.role !== 'PUBLICADOR DE TRABAJO') {
//             return res.status(403).json({ message: "Solo empleadores pueden actualizar su perfil." });
//         }

//         const employerId = req.params.id;
//         const updatedData = req.body;

//         const updatedProfile = await employerService.updateEmployer(employerId, updatedData);
//         res.status(200).json({ message: "Perfil actualizado exitosamente.", data: updatedProfile });
//     } catch (error) {
//         res.status(error.status || 500).json({ message: error.message || "Error al actualizar perfil." });
//     }
// });

module.exports = router;
