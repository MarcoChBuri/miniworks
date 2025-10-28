const express = require('express');
const { route } = require('../auth/auth.controller');
const router = express.Router();

router.post('/students', express.json(), async (req, res) => {
    try {
        const { email, password, name, role } = req.body;
        const user = await perfilService.registerUser(email, password, name, 'ESTUDIANTE');
        res.status(201).json({ message: "Usuario registrado con éxito.", id: user.id });
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message || "Error al registrar." });
    }
});