const bcrypt = require('bcrypt');
const userRepository = require('../../shared/repositories/user.repository');
//require('dotenv').config();
class AuthService {
    async login(email, password) {
        const user = await userRepository.findByEmail(email);
        
        // Simulación de comparación de hash
        if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
            throw { status: 401, message: "Credenciales inválidas." };
        }

        // SIN JWT: Devolvemos solo el ID y Rol para la prueba
        return {     id: user.id,
                    name: user.name,
                    email: user.email,
                    rol: user.rol
                     }; 
    }
    
    // NOTA: ELIMINAMOS EL MÉTODO verifyToken()
}

module.exports = new AuthService();
// este servicio se encarga de iniciar sesion y verificar el token
// Nota: El método verifyToken ha sido eliminado ya que no estamos usando JWT en este momento.
//por lo que ahora solo vemos el login que devuelve el id y rol del usuario