const mongoose = require('mongoose');
const { Schema } = mongoose;

const applicationSchema = new Schema({
    applicant: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    message: {
        type: String,
        trim: true
    },
    status: {
        type: String,
        enum: ['pendiente', 'aceptado', 'rechazado'],
        default: 'pendiente'
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const jobSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    applications: [applicationSchema], // 👈 Subschema aquí
    acceptedCandidate: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        default: null
    },
    status: {
        type: String,
        enum: ['abierto', 'cerrado', 'en proceso'],
        default: 'abierto'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Job', jobSchema);
