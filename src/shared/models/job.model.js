// const mongoose = require('mongoose');
// const { Schema } = mongoose;

// const jobSchema = new Schema({
//     title: {
//         type: String,
//         required: true,
//         trim: true // Quita espacios en blanco al inicio y al final
//     },
//     description: {
//         type: String,
//         required: true
//     },
//     company: {
//         type: String,
//         required: true
//     },
//     // --- Referencias a otros modelos ---
//     // Guardamos el ID del usuario que creó la oferta.
//     // 'ref: 'User'' le dice a Mongoose que este ID corresponde a un documento en la colección 'users'.
//     createdBy: {
//         type: Schema.Types.ObjectId,
//         ref: 'User',
//         required: true
//     },
//     // Guardamos un arreglo de IDs de los estudiantes que se han postulado.
//     applicants: [{
//         type: Schema.Types.ObjectId,
//         ref: 'User'
//     }],
//     // Guardamos el ID del estudiante que fue aceptado.
//     acceptedCandidate: {
//         type: Schema.Types.ObjectId,
//         ref: 'User',
//         default: null // Por defecto, nadie ha sido aceptado
//     },
//     status: {
//         type: String,
//         enum: ['abierto', 'cerrado', 'en proceso'], // El estado solo puede ser uno de estos valores.
//         default: 'abierto'
//     }
// }, {
//     // Añade automáticamente los campos createdAt y updatedAt
//     timestamps: true
// });

// module.exports = mongoose.model('Job', jobSchema);
