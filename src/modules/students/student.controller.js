const express = require('express');
const { route } = require('../auth/auth.controller');
const router = express.Router();

router.post('/register', express.json(), async (req, res) => {
    try {
        const { email, password, name, role } = req.body;
        const user = await perfilService.registerStudent(email, password, name, 'ESTUDIANTE');
        res.status(201).json({ message: "Usuario registrado con éxito.", id: user.id });
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message || "Error al registrar." });
    }
});

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
    try{
        const userId = req.params.userId;
        const reviews = await studentService.getaStudentReviews(userId);
        res.json(reviews);
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message || "Error al cargar reseñas." });
    }
});

module.exports = router;


