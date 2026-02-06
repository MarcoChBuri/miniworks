const jobRepository = require('../../shared/repositories/job.repository');
const userRepository = require('../../shared/repositories/user.repository');

class JobService {

    async getAllJobs() {
        return jobRepository.findAllOpen(); // solo trabajos abiertos
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

    async createJob(title, description, company, createdById) {
        if (!title || !description || !company)
            throw { status: 400, message: "Faltan datos obligatorios: título, descripción o empresa." };

        const user = await userRepository.findById(createdById);
        if (!user) throw { status: 404, message: "Usuario no encontrado." };

        if (user.role !== "PUBLICADOR DE TRABAJO")
            throw { status: 403, message: "Solo los PUBLICADORES DE TRABAJO pueden crear ofertas." };

        const jobToCreate = {
            title,
            description,
            company,
            createdBy: createdById
        };

        return jobRepository.save(jobToCreate);
    }

    async applyToJob(studentId, jobId) {
        const job = await jobRepository.findById(jobId);
        if (!job) throw { status: 404, message: "Trabajo no encontrado." };

        // Check if student already applied using applications array
        const alreadyApplied = job.applications?.some(
            app => String(app.applicant) === String(studentId)
        );
        if (alreadyApplied)
            throw { status: 409, message: "Ya te has postulado a esta oferta." };

        return jobRepository.addApplicant(jobId, studentId);
    }
    async getAvailableJobs() {
        return jobRepository.findAllOpen();
    }
}

module.exports = new JobService();
