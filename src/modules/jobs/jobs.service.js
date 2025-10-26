const jobs = [
    {
        id: "1",
        title: "Limpieza de hogar",
        description: "Limpieza general, barrido, trapeado y organización.",
        location: "Argelia",
        category: "Limpieza",
        salary: 15,
        postedAt: "2025-10-01"
    },
    {
        id: "2",
        title: "Niñera por las tardes",
        description: "Cuidado de niños (2 años), preparar merienda y actividades.",
        location: "San Sebastián",
        category: "Cuidado",
        salary: 10,
        postedAt: "2025-09-20"
    },
    {
        id: "3",
        title: "Jardinero - mantenimiento",
        description: "Corte de césped, poda y fertilización.",
        location: "Jipiro",
        category: "Jardinería",
        salary: 20,
        postedAt: "2025-10-10"
    }
];

// Devuelve todos los trabajos
async function getAllJobs() {
    // Simula operación async (por ejemplo consulta a BD)
    return Promise.resolve(jobs);
}

// Busca trabajos por palabra clave (busca en título, descripción, ubicación y categoría)
async function searchJobs(query) {
    if (!query || !query.trim()) return Promise.resolve([]);

    const q = query.toLowerCase().trim();
    const terms = q.split(/\s+/);

    const results = jobs.filter(job => {
        const haystack = `${job.title} ${job.description} ${job.location} ${job.category}`.toLowerCase();
        return terms.every(term => haystack.includes(term));
    });

    return Promise.resolve(results);
}

// Obtiene trabajo por id (string o number)
async function getJobById(id) {
    if (id === undefined || id === null) return Promise.resolve(null);
    const sid = String(id);
    const job = jobs.find(j => String(j.id) === sid) || null;
    return Promise.resolve(job);
}

module.exports = {
    getAllJobs,
    searchJobs,
    getJobById
};