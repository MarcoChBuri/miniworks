const fetch = require('node-fetch');

class UniversityValidator {
    async validateStatus(email) {
        console.log(`[EXT] Consultando estatus de matrícula para: ${email}`);
        const url = 'http://validador-universidad:9000/students/validate';

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email })
            });

            if (!response.ok) {
                console.error(`[EXT] Error al consultar microservicio: ${response.status}`);
                return false;
            }

            const data = await response.json();
            return data.valid;
        } catch (err) {
            console.error(`[EXT] Error al conectar con microservicio:`, err);
            return false;
        }
    }
}

module.exports = new UniversityValidator();