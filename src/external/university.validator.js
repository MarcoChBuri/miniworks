class UniversityValidator {
    async validateStatus(email) {
        console.log(`[EXT] Consultando estatus de matrícula para: ${email}`);
        return email.endsWith('@unl.edu.ec');
    }
}        

// aqui si queremos podemos cambiarle por una api si es q hay si no podemos dejrle asi como esta : 
// o que el usuario suba su carnet de estudiante y lo validamos con algun servicio de terceros
module.exports = new UniversityValidator();