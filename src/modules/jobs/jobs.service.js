const jobRepository = require('../../shared/repositories/job.repository');
const userRepository = require('../../shared/repositories/user.repository');    
class JobService {
    async getAllJobs() {
        return jobRepository.findAllOpen();
    }

    async searchJobs(query) {
        if (!query || !query.trim()) throw { status: 400, message: "Debe ingresar un texto de búsqueda." };
        const q = query.toLowerCase().trim();
        const results = await jobRepository.search(q);
        if (!results.length) throw { status: 404, message: "No se encontraron trabajos." };
        return results;
    }

    async getJobById(id) {
        const job = await jobRepository.findById(id);
        if (!job) throw { status: 404, message: "Trabajo no encontrado." };
        return job;
    }


    async createJob(jobData) {
        const { title, description, company, cedula } = jobData;

        if (!title || !description || !company || !cedula)
            throw { status: 400, message: "Faltan datos obligatorios: título, descripción, empresa o cédula." };

        const user = await userRepository.findByCedula(cedula);
        if (!user)
            throw { status: 404, message: "Usuario no encontrado con esa cédula." };

        if (user.role !== "PUBLICADOR DE TRABAJO")
            throw { status: 403, message: "Solo los PUBLICADORES DE TRABAJO pueden crear ofertas." };

        const jobToCreate = {
            title,
            description,
            company,
            createdBy: user._id
        };

        return jobRepository.save(jobToCreate);
    }
    async applyToJob(jobId, studentId) {
        const job = await jobRepository.findById(jobId);
        if (!job) throw { status: 404, message: "Trabajo no encontrado." };
        if (job.applicants.includes(studentId))
            throw { status: 409, message: "Ya te has postulado a esta oferta." };
        return jobRepository.addApplicant(jobId, studentId);
    }
}

module.exports = new JobService();
