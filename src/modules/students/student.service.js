const userRepository = require('../../shared/repositories/user.repository');
const jobRepository = require('../../shared/repositories/job.repository'); // suponer que tienes repo de jobs

class StudentService {

    async getStudentHistory(studentId) {
        const student = await userRepository.findById(studentId);
        if (!student) throw { status: 404, message: "Estudiante no encontrado." };

        // Devolver su historial de aplicaciones
        return student.applications || [];
    }

    async getStudentReviews(studentId) {
        const student = await userRepository.findById(studentId);
        if (!student) throw { status: 404, message: "Estudiante no encontrado." };

        // Devolver las reseñas recibidas
        return student.reviews || [];
    }



    async applyToJob(studentId, jobId) {
        const student = await userRepository.findById(studentId);
        if (!student) throw { status: 404, message: "Estudiante no encontrado." };

        const job = await jobRepository.findById(jobId);
        if (!job) throw { status: 404, message: "Trabajo no encontrado." };

        // Crear la aplicación y agregarla al estudiante
        const application = {
            jobId: job.id,
            status: 'pending',
            date: new Date()
        };

        student.applications = student.applications || [];
        student.applications.push(application);
        await userRepository.save(student); // ojo: aquí el repo debe soportar save de documentos

        return application;
    }

}

module.exports = new StudentService();
