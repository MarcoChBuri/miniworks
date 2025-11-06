const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userRepository = require('../../shared/repositories/user.repository');
require('dotenv').config();

class AuthService {
  async login(email, password) {
    const user = await userRepository.findByEmail(email);

    if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
      throw { status: 401, message: "Credenciales inválidas." };
    }

    const payload = {
      id: user._id,        
      name: user.name,
      role: user.role
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    return { 
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token 
    };
  }

  verifyToken(token) {
    try {
      return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      throw { status: 401, message: 'Token inválido o expirado.' };
    }
  }
}

module.exports = new AuthService();
