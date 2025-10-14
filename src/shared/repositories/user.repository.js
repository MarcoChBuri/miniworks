const db = { users: [] }; 

class UserRepository {
    async findByEmail(email) {
        return db.users.find(u => u.email === email);
    }

    async findById(id) {
        return db.users.find(u => u.id === id);
    }

    async save(user) {
        // Asignación de ID simulada y guardado
        user.id = db.users.length + 1;
        db.users.push(user);
        return user;
    }
}

module.exports = new UserRepository();
//aqui hay q hacer la conexion a la base de datos y las consultas
//por ahora lo dejamos asi como un mock