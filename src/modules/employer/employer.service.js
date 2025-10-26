const jobs = []; 
const applications = [
    { id: "a1", jobId: "1", employerId: "e1", studentId: "s1", status: "PENDING", appliedAt: "2025-10-12" }
];
const reviews = [
    { id: "r1", studentId: "s1", calificacion: 5, comentario: "Muy responsable", createdAt: "2025-10-20" }
];

// Devuelve postulaciones para un empleador (por employerId)
async function getApplicationsByEmployer(employerId) {
    if (!employerId) return Promise.resolve([]);
    const results = applications.filter(a => String(a.employerId) === String(employerId));
    return Promise.resolve(results);
}

// Acepta un postulante (cambia status a ACCEPTED)
async function acceptApplicant(applicationId) {
    if (!applicationId) return Promise.resolve(null);
    const idx = applications.findIndex(a => String(a.id) === String(applicationId));
    if (idx === -1) return Promise.resolve(null);

    applications[idx].status = "ACCEPTED";
    applications[idx].decisionAt = new Date().toISOString();
    return Promise.resolve(applications[idx]);
}

// Crear reseña para estudiante
async function createReviewForStudent(studentId, calificacion, comentario) {
    if (!studentId) return Promise.resolve(null);
    const score = Number(calificacion);
    if (Number.isNaN(score) || score < 1 || score > 5) {
        const err = new Error("La calificación debe ser un número entre 1 y 5.");
        err.status = 400;
        throw err;
    }

    const review = {
        id: Date.now().toString(),
        studentId: String(studentId),
        calificacion: score,
        comentario: comentario || "",
        createdAt: new Date().toISOString()
    };

    reviews.push(review);
    return Promise.resolve(review);
}

// Helpers para pruebas: crear/postular
async function createApplication({ jobId, employerId, studentId }) {
    const app = {
        id: Date.now().toString(),
        jobId: String(jobId),
        employerId: String(employerId),
        studentId: String(studentId),
        status: "PENDING",
        appliedAt: new Date().toISOString()
    };
    applications.push(app);
    return Promise.resolve(app);
}

module.exports = {
    getApplicationsByEmployer,
    acceptApplicant,
    createReviewForStudent,
    // helpers
    createApplication
};