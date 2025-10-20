const express = require('express');
const router = express.Router();

// Importar los servicios (ajusta rutas según tu proyecto)
const perfilService = require('../perfil.service');
const jobService = require('../jobs/job.service');
const employerService = require('./employer.service'); // si aún no existe, lo creamos después

// Registro de empleador
// POST /api/employers/register
router.post('/register', express.json(), async (req, res) => {
    try {
        const { nombre, correo, password } = req.body;
        const newEmployer = await perfilService.registerEmployer(nombre, correo, password, 'EMPLEADOR');
        res.status(201).json({ message: "Empleador registrado con éxito.", id: newEmployer.id });
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message || "Error al registrar empleador." });
    }
});

// Publicar nuevo trabajo
// POST /api/employers/public/jobs
router.post('/public/jobs', async (req, res) => {
    try {
        const jobData = req.body;
        const newJob = await jobService.createJob(jobData);
        res.status(201).json(newJob);
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message || "Error al publicar trabajo." });
    }
});

// Ver postulaciones recibidas
// GET /api/employers/:id/applications
router.get('/:id/applications', async (req, res) => {
    try {
        const employerId = req.params.id;
        const applications = await employerService.getApplicationsByEmployer(employerId);
        res.status(200).json(applications);
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message || "Error al obtener postulaciones." });
    }
});

// Aceptar postulante
// PUT /api/employers/applications/:id/accept
router.put('/applications/:id/accept', async (req, res) => {
    try {
        const applicationId = req.params.id;
        const updated = await employerService.acceptApplicant(applicationId);
        res.status(200).json({ message: "Postulante aceptado exitosamente.", data: updated });
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message || "Error al aceptar postulante." });
    }
});

// Dejar reseña al estudiante
// POST /api/employers/students/:id/review
router.post('/students/:id/review', async (req, res) => {
    try {
        const { id } = req.params; // id del estudiante
        const { calificacion, comentario } = req.body;

        const review = await employerService.createReviewForStudent(id, calificacion, comentario);
        res.status(201).json({ message: "Reseña creada exitosamente.", review });
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message || "Error al dejar reseña." });
    }
});

module.exports = router;
