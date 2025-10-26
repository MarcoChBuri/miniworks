const userRepository = require('../../shared/repositories/user.repository');
const universityValidator = require('../../external/university.validator');
const bcrypt = require('bcrypt');

class PerfilService {
    async registerUser(email, password, name, role, cedula) {
        if (await userRepository.findByEmail(email)) {
            throw { status: 409, message: "El email ya está registrado." };
        }
        
        // REGLA DE NEGOCIO C3: Si es Estudiante, debe validar su estatus
        let isValidated = true;
        if (role === 'ESTUDIANTE') {
            isValidated = await universityValidator.validateStatus(email);
            if (!isValidated) {
                throw { status: 403, message: "Acceso denegado: El estatus de matrícula no es activo." };
            }
        }
        
        // Hashear contraseña antes de guardar
        const passwordHash = await bcrypt.hash(password, 10); // Usar salt=10

        const newUser = { email, passwordHash, name, role, isValidated ,cedula };
        return userRepository.save(newUser);
    }
    
    async getProfile(userId) {
        const user = await userRepository.findById(userId);
        if (!user) throw { status: 404, message: "Perfil no encontrado." };
        
        // Limpiar datos sensibles antes de enviar
        const { passwordHash, ...profile } = user;
        return profile;
    }
}

module.exports = new PerfilService();
// este se encarga de obtener el perfil del usuario y de registrar nuevos usuarios y hashear sus contraseñas
// Nota: La validación del estatus de matrícula es simulada. En producción, se debe implementar una llamada real a la API de la universidad si es que hay.