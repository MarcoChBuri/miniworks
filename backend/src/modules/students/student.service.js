const userRepository = require('../../shared/repositories/user.repository');
const jobRepository = require('../../shared/repositories/job.repository');

class StudentService {

    async getStudentHistory(studentId) {
        const student = await userRepository.findById(studentId);
        if (!student) throw { status: 404, message: "Estudiante no encontrado." };

        const jobs = await jobRepository.findJobsByApplicant(studentId);
        return jobs;
    }

    async getReviewsByStudent(studentId) {
        const student = await userRepository.findById(studentId);
        if (!student) throw { status: 404, message: "Estudiante no encontrado." };

        const receivedReviews = (student.reviews || []).filter(
            review => String(review.toUser) === String(studentId)
        );

        return receivedReviews;
    }

    async applyToJob(studentId, jobId, message = '') {
        const student = await userRepository.findById(studentId);
        if (!student) throw { status: 404, message: "Estudiante no encontrado." };

        const job = await jobRepository.findById(jobId);
        if (!job) throw { status: 404, message: "Trabajo no encontrado." };

        const updatedJob = await jobRepository.addApplicant(jobId, studentId, message);

        const application = {
            jobId: job._id,
            status: 'pendiente',
            date: new Date()
        };
        student.applications = student.applications || [];
        student.applications.push(application);
        await userRepository.save(student);

        return updatedJob;
    }

    async createReviewForEmployer(studentId, employerId, calificacion, comentario) {
        const employer = await userRepository.findById(employerId);
        if (!employer) throw { status: 404, message: "Empleador no encontrado." };

        const review = {
            calificacion,
            comentario,
            date: new Date(),
            fromUser: studentId,
            toUser: employerId
        };

        const updatedEmployer = await userRepository.addReview(employerId, review);
        return updatedEmployer.reviews.at(-1);
    }

}

module.exports = new StudentService();
