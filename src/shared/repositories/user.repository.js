
// 1. Importamos el modelo de Mongoose que define la estructura del Usuario.
const User = require('../models/user.model');
class UserRepository {
    /**
     * Busca un usuario por su email en la base de datos.
     * @param {string} email - El email del usuario a buscar.
     * @returns {Promise<object|null>} El documento del usuario o null si no se encuentra.
     */
    async findByEmail(email) {
        // Usamos el método de Mongoose .findOne() para buscar en la colección 'users'.
        // .lean() es una optimización que devuelve un objeto JSON simple en lugar de un documento Mongoose completo.
        return User.findOne({ email: email }).lean();
    }

    /**
     * Busca un usuario por su ID en la base de datos.
     * @param {string} id - El ID del usuario.
     * @returns {Promise<object|null>} El documento del usuario o null.
     */
    async findById(id) {
        // .findById() es un atajo optimizado de Mongoose para buscar por _id.
        return User.findById(id).lean();
    }

    /**
     * Guarda un nuevo usuario en la base de datos.
     * @param {object} userData - Los datos del usuario a crear.
     * @returns {Promise<object>} El nuevo usuario guardado.
     */
    async save(userData) {
        // 1. Creamos una nueva instancia del modelo User con los datos proporcionados.
        const newUser = new User(userData);
        
        // 2. Usamos el método .save() para persistir el nuevo usuario en MongoDB.
        // Mongoose se encarga de la validación, la asignación del _id y la comunicación.
        return newUser.save();
    }
    async findByCedula(cedula) {
    return User.findOne({ cedula: cedula }).lean();
}

    async findAll() {
        return User.find({}).lean();
    }

}

module.exports = new UserRepository();
