const jobRepository = require('../../shared/repositories/job.repository');
const userRepository = require('../../shared/repositories/user.repository');

class PostulationService {
    async applyToJob(studentId, jobId) {
        const job = await jobRepository.findById(jobId);
        if (!job) throw { status: 404, message: "Trabajo no encontrado." };

        if (job.applicants.includes(studentId))
            throw { status: 409, message: "Ya te has postulado a esta oferta." };

        return jobRepository.addApplicant(jobId, studentId);
    }
    async getAvailableJobs() {
        return jobRepository.findAllOpen();
    }

    async acceptApplicant(employerId, jobId, applicantId) {
        const job = await jobRepository.findById(jobId);
        if (!job) throw { status: 404, message: "Trabajo no encontrado." };

        if (String(job.createdBy._id) !== String(employerId)) {
            throw { status: 403, message: "No tienes permiso para modificar este trabajo." };
        }

        const application = job.applications.find(app =>
            String(app.applicant?._id || app.applicant) === String(applicantId)
        );
        if (!application) {
            throw { status: 400, message: "El postulante no pertenece a esta oferta." };
        }

        const updatedJob = await jobRepository.acceptApplicant(jobId, applicantId);
        return updatedJob;
    }

}

module.exports = new PostulationService();
