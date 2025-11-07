const Job = require('../models/job.model');

class JobRepository {

    /**
     * Guarda una nueva oferta de trabajo.
     * @param {object} jobData - Los datos del trabajo.
     * @returns {Promise<object>} El nuevo trabajo guardado.
     */
    async save(jobData) {
        const newJob = new Job(jobData);
        return newJob.save();
    }

    /**
     * Busca una oferta de trabajo por su ID.
     * @param {string} id - El ID del trabajo.
     * @returns {Promise<object|null>}
     */
    async findById(id) {
        // .populate('createdBy') le dice a Mongoose: "cuando me traigas el trabajo,
        // no me traigas solo el ID del creador, trae el documento completo del usuario".
        // Esto es súper útil para mostrar el nombre del reclutador, por ejemplo.
        return Job.findById(id).populate('createdBy', 'name email').lean(); // Solo trae name y email del creador
    }

    /**
     * Devuelve todas las ofertas de trabajo abiertas.
     * @returns {Promise<Array>}
     */
    async findAllOpen() {
        return Job.find({ status: 'abierto' }).sort({ createdAt: -1 }).lean(); // Ordena por más recientes
    }

    /**
     * Agrega un postulante a una oferta de trabajo.
     * @param {string} jobId - El ID del trabajo.
     * @param {string} studentId - El ID del estudiante que postula.
     * @returns {Promise<object>} El trabajo actualizado.
     */
    async addApplicant(jobId, studentId) {
        // Usamos el operador $push de MongoDB para añadir un elemento a un arreglo.
        return Job.findByIdAndUpdate(
            jobId,
            { $push: { applicants: studentId } },
            { new: true } // Devuelve el documento actualizado
        );
    }
    async search(query) {
        // Búsqueda simple usando expresiones regulares para coincidencia parcial e insensible a mayúsculas.
        const regex = new RegExp(query, 'i');
        return Job.find({
            status: 'abierto',
            $or: [
                { title: regex },
                { description: regex },
                { company: regex }
            ]
        }).lean();
    }
    async getApplicantsByJobId(jobId) {
    return Job.findById(jobId).populate('applicants', 'name email cedula').select('title applicants').lean();
}
}

module.exports = new JobRepository();
