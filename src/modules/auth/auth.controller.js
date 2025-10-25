const express = require('express');
const router = express.Router();
const authService = require('./auth.service');
const perfilService = require('./perfil.service');
const { protect } = require('../../middlewares/auth.middleware');

router.get('/users', protect, async (req, res) => {
  try {
    const users = await perfilService.getAllUsers();
    res.json(users);
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message || "Error al cargar usuarios." });
  }
}); 

router.get('/users/:userId', protect, async (req, res) => {
  try {
    const userId = req.params.userId;
    const profile = await perfilService.getProfile(userId);
    res.json(profile);
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message || "Error al cargar perfil." });
  }
});

router.post('/register', express.json(), async (req, res) => {
  try {
    const { email, password, name, role } = req.body;
    const user = await perfilService.registerUser(email, password, name, role);
    res.status(201).json({ message: "Usuario registrado con éxito.", id: user.id });
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message || "Error al registrar." });
  }
});

router.post('/login', express.json(), async (req, res) => {
  try {
    const { email, password } = req.body;
    const authData = await authService.login(email, password);
    res.json({ message: "Login exitoso", user: authData });
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message || "Error al iniciar sesión." });
  }
});

module.exports = router;
