const express = require('express');
const router = express.Router();
const jobService = require('./jobs.service'); // lógica del módulo
const { protect } = require('../../middlewares/auth.middleware');

router.use(express.json());

router.get('/all', async (req, res) => {
    try {
        const jobs = await jobService.getAllJobs();
        res.status(200).json(jobs);
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message || "Error al cargar trabajos." });
    }
});

router.get('/search', async (req, res) => {
    try {
        const { query } = req.query;

        if (!query) {
            return res.status(400).json({ message: "Debe proporcionar una palabra clave (query)." });
        }

        const results = await jobService.searchJobs(query);
        res.status(200).json(results);
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message || "Error al buscar trabajos." });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const job = await jobService.getJobById(id);

        if (!job) {
            return res.status(404).json({ message: "Trabajo no encontrado." });
        }

        res.status(200).json(job);
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message || "Error al obtener detalle del trabajo." });
    }
});

router.post('/:id/apply', protect, async (req, res) => {
    try {
        if (req.user.role !== 'ESTUDIANTE') {
            return res.status(403).json({ message: "Solo estudiantes pueden postularse a trabajos." });
        }

        const { id } = req.params; // job ID
        const studentId = req.user.id; // tomamos el ID del token
        const updatedJob = await jobService.applyToJob(studentId, id);
        res.status(200).json({ message: "Postulación enviada exitosamente.", job: updatedJob });
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message || "Error al postular al trabajo." });
    }
});

router.post('/create', protect, async (req, res) => {
    try {
        if (req.user.role !== 'PUBLICADOR DE TRABAJO') {
            return res.status(403).json({ message: "Solo empleadores pueden crear trabajos." });
        }

        const { title, description, company } = req.body;
        const createdBy = req.user.id;

        const newJob = await jobService.createJob(title, description, company, createdBy);
        res.status(201).json({ message: "Trabajo creado exitosamente.", job: newJob });
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message || "Error al crear trabajo." });
    }
});

module.exports = router;
