const userRepository = require('../../shared/repositories/user.repository');
const jobRepository = require('../../shared/repositories/job.repository');
class EmployerService {
 
async getApplicationsByJob(employerId, jobId) {
    const job = await jobRepository.findById(jobId);

    if (!job)
        throw { status: 404, message: "Trabajo no encontrado." };

    // 🔹 No se valida el creador, solo se obtienen las postulaciones del trabajo
    return await jobRepository.getApplicantsByJobId(jobId);
}





    async getApplicationsByEmployer(employerId) {
        const employer = await userRepository.findById(employerId);
        if (!employer) throw { status: 404, message: "Empleador no encontrado." };
        return employer.applications || [];
    }

    async acceptApplicant(applicationId) {
        const employer = await userRepository.findOne({ 'applications._id': applicationId });
        if (!employer) throw { status: 404, message: "Aplicación no encontrada." };

        const application = employer.applications.id(applicationId);
        application.status = 'accepted';
        await employer.save();

        return application;
    }

async createReviewForStudent(studentId, calificacion, comentario) {
    const student = await userRepository.findById(studentId);
    if (!student) throw { status: 404, message: "Estudiante no encontrado." };
    const review = { calificacion, comentario, date: new Date() };
    const updatedStudent = await userRepository.addReview(studentId, review);
    return updatedStudent.reviews.at(-1);
}


    async getReviewsByEmployer(employerId) {
        const employer = await userRepository.findById(employerId);
        if (!employer) throw { status: 404, message: "Empleador no encontrado." };
        return employer.reviews || [];
    }

    async getJobsByEmployer(employerId) {
        const employer = await userRepository.findById(employerId);
        if (!employer) throw { status: 404, message: "Empleador no encontrado." };
        return employer.jobs || [];
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
}

module.exports = new EmployerService();
