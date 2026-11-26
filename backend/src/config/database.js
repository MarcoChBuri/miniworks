// config/database.js
require('dotenv').config();
const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log('✅ Conexión a MongoDB exitosa.');
    } catch (error) {
        console.error('Error al conectar a MongoDB:', error.message);
        throw error;
    }
};

module.exports = connectDB;