const authService = require('../modules/auth/auth.service');

const protect = (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1]; // Espera "Bearer <token>"
        if (!token) throw new Error('No se proporcionó token.');
        
        const payload = authService.verifyToken(token);
        
        // Adjuntar ID y Rol del usuario al objeto request
        req.user = payload; 
        next();
    } catch (error) {
        return res.status(401).json({ message: "No autorizado. Sesión inválida o expirada." });
    }
};

module.exports = { protect };

//esto es para la seguridad de las rutas privadas, pero como no estamos usando JWT ahora , lo implementaremos mas adelante

//ESTO NOSE COMO FUNCIONA ASI Q LO EMITIRE HASTA Q LO ENTIENDA XD