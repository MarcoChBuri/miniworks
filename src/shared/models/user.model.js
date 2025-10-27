const mongoose = require('mongoose');

// Este es el plano para la creacion de  clases como en el diagrama de clases.
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true // Quita espacios en blanco al inicio y al final
    },
    email: {
        type: String,
        required: true,
        unique: true, 
        lowercase: true,
        trim: true
    },
    cedula: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    passwordHash: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        enum: ['ESTUDIANTE', 'PUBLICADOR DE TRABAJO', 'ADMINISTRADOR'],
        default: 'ESTUDIANTE'
    },
    isValidated: { 
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

const User = mongoose.model('User', userSchema);

module.exports = User;