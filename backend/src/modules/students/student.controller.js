const express = require('express');
const router = express.Router();

const studentService = require('./student.service');
const jobService = require('../../modules/jobs/jobs.service');

const { protect } = require('../../middlewares/auth.middleware');


router.use(express.json());

router.get('/:userId/history', async (req, res) => {
    try {
        const userId = req.params.userId;
        const history = await studentService.getStudentHistory(userId);
        res.json(history);
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message || "Error al cargar historial." });
    }
});

router.get('/reviews/:id', async (req, res) => {
    try {
        const studentId = req.params.id;
        const reviews = await studentService.getReviewsByStudent(studentId);
        res.status(200).json(reviews);
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message || "Error al obtener reseñas del estudiante." });
    }
});
router.get('/jobs/available',  protect, async (req, res) => {
    try {
        if (req.user.role !== 'ESTUDIANTE') {
            return res.status(403).json({ message: "Solo estudiantes pueden ver trabajos disponibles." });
        }

        const jobs = await jobService.getAvailableJobs();
        res.status(200).json(jobs);
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message || "Error al obtener trabajos disponibles." });
    }
});
router.post('/:employerId/reviews', protect, async (req, res) => {
    try {
        if (req.user.role !== 'ESTUDIANTE') {
            return res.status(403).json({ message: "Solo estudiantes pueden dejar reseñas." });
        }

        const employerId = req.params.employerId; // 📍 receptor (a quién se deja la reseña)
        const studentId = req.user.id;            // 📍 emisor (quién deja la reseña)
        const { calificacion, comentario } = req.body;

        const review = await studentService.createReviewForEmployer(
            studentId,
            employerId,
            calificacion,
            comentario
        );

        res.status(201).json({
            message: "Reseña creada exitosamente.",
            data: review
        });
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message || "Error al dejar la reseña." });
    }
});



module.exports = router;
