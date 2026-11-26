const userRepository = require('../../shared/repositories/user.repository');
const jobRepository = require('../../shared/repositories/job.repository');

class EmployerService {

    async getApplicationsByJob(employerId, jobId) {
        const job = await jobRepository.findById(jobId);
        if (!job) throw { status: 404, message: "Trabajo no encontrado." };

        if (String(job.createdBy._id) !== String(employerId)) {
            throw { status: 403, message: "No tienes permiso para ver las postulaciones de este trabajo." };
        }

        return jobRepository.getApplicantsByJobId(jobId);
    }

    async getApplicationsByEmployer(employerId) {
        const jobs = await jobRepository.findByEmployer(employerId);
        return jobs.map(job => ({
            jobId: job._id,
            title: job.title,
            applications: job.applications
        }));
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

    async createReviewForStudent(employerId, studentId, calificacion, comentario) {
        const student = await userRepository.findById(studentId);
        if (!student) throw { status: 404, message: "Estudiante no encontrado." };

        const review = {
            calificacion,
            comentario,
            date: new Date(),
            fromUser: employerId,
            toUser: studentId
        };

        const updatedStudent = await userRepository.addReview(studentId, review);
        return updatedStudent.reviews.at(-1);
    }

    async getJobsByEmployer(employerId) {
        return jobRepository.findByEmployer(employerId);
    }

    async updateEmployer(employerId, updatedData) {
        const employer = await userRepository.findByIdAndUpdate(
            employerId,
            { $set: updatedData },
            { new: true, runValidators: true }
        );
        if (!employer) throw { status: 404, message: "Empleador no encontrado." };
        return employer;
    }

    async getReviewsByEmployer(employerId) {
        const employer = await userRepository.findById(employerId);
        if (!employer) throw { status: 404, message: "Empleador no encontrado." };

        const receivedReviews = (employer.reviews || []).filter(
            review => String(review.toUser) === String(employerId)
        );

        return receivedReviews;
    }
}

module.exports = new EmployerService();
