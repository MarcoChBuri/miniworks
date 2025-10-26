const express = require('express');
const router = express.Router();
const jobService = require('./jobs.service'); // lógica del módulo
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

router.post('/:id/apply', async (req, res) => {
    try {
        const { id } = req.params;
        const { studentId } = req.body;
        const updatedJob = await jobService.applyToJob(id, studentId);
        res.status(200).json(updatedJob);
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message || "Error al postular al trabajo." });
    }
});

router.post('/create', async (req, res) => {
    try {
        const jobData = req.body;
        const newJob = await jobService.createJob(jobData);
        res.status(201).json(newJob);
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message || "Error al crear trabajo." });
    }
});

module.exports = router;
