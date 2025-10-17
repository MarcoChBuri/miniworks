const express = require('express');
const router = express.Router();
const jobService = require('./job.service'); // este archivo manejará la lógica real (si no existe, lo creamos abajo)

// ---------------------------------------------------------
// 1️⃣ Listar todos los trabajos
// Ruta: GET /api/jobs/all
// Descripción: Obtiene todos los trabajos publicados
// ---------------------------------------------------------
router.get('/all', async (req, res) => {
    try {
        const jobs = await jobService.getAllJobs();
        res.status(200).json(jobs);
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message || "Error al cargar trabajos." });
    }
});

// ---------------------------------------------------------
// 2️⃣ Buscar por palabra clave
// Ruta: GET /api/jobs/search?query=limpieza
// Descripción: Busca trabajos relacionados por palabra clave
// ---------------------------------------------------------
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

// ---------------------------------------------------------
// 3️⃣ Ver detalle de un trabajo específico
// Ruta: GET /api/jobs/:id
// Descripción: Muestra la información de un trabajo específico
// ---------------------------------------------------------
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

module.exports = router;
