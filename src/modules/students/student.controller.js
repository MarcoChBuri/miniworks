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

router.get('/:userId/reviews', async (req, res) => {    
    try {
        const userId = req.params.userId;
        const reviews = await studentService.getStudentReviews(userId);
        res.json(reviews);
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message || "Error al cargar reseñas." });
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



module.exports = router;
