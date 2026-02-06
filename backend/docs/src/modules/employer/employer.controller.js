const express = require('express');
const router = express.Router();
const employerService = require('./employer.service');
const { protect } = require('../../middlewares/auth.middleware');


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


router.post('/reviews/:studentId/send', protect, async (req, res) => {
    try {
        if (req.user.role !== 'PUBLICADOR DE TRABAJO') {
            return res.status(403).json({ message: "Solo empleadores pueden dejar reseñas." });
        }

        const employerId = req.user.id; 
        const studentId = req.params.studentId;
        const { calificacion, comentario } = req.body;

        const review = await employerService.createReviewForStudent(
            employerId,
            studentId,
            calificacion,
            comentario
        );

        res.status(201).json({
            message: "Reseña creada exitosamente.",
            data: review
        });
    } catch (error) {
        res.status(error.status || 500).json({
            message: error.message || "Error al dejar reseña."
        });
    }
});



router.get('/jobs/', protect, async (req, res) => {
    try {
        const employerId = req.user.id;
        const jobs = await employerService.getJobsByEmployer(employerId);
        res.status(200).json(jobs);
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message || "Error al obtener trabajos." });
    }
});


router.get('/reviews', protect, async (req, res) => {
    try {
        const employerId = req.user.id;
        const reviews = await employerService.getReviewsByEmployer(employerId);
        res.status(200).json(reviews);
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message || "Error al obtener reseñas del empleador." });
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



// router.put('/jobs/:jobId/applications/:applicationId/accept', protect, async (req, res) => {
//     try {
//         if (req.user.role !== 'PUBLICADOR DE TRABAJO') {
//             return res.status(403).json({ message: "Solo empleadores pueden aceptar postulantes." });
//         }

//         const employerId = req.user.id;
//         const { jobId, applicationId } = req.params;

//         const result = await employerService.acceptApplicant(employerId, jobId, applicationId);

//         res.status(200).json({ message: "Postulante aceptado exitosamente.", data: result });
//     } catch (error) {
//         res.status(error.status || 500).json({ message: error.message || "Error al aceptar postulante." });
//     }
// });


module.exports = router;
