const express = require('express');
const router = express.Router();

router.get('/all', async (req, res) => {
    try {
        const jobs = await jobService.getAllJobs();
        res.json(jobs);
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message || "Error al cargar trabajos." });
    }
});

module.exports = router;