const YAML = require('yamljs');

const authDocs = YAML.load('./src/docs/auth.yaml');
const jobsDocs = YAML.load('./src/docs/jobs.yaml');
const studentsDocs = YAML.load('./src/docs/students.yaml');
const employersDocs = YAML.load('./src/docs/employers.yaml');

const swaggerDocument = {
  openapi: '3.0.0',
  info: {
    title: 'MiniWorks API',
    version: '1.0.0',
    description: 'Documentación de los endpoints RESTful del proyecto MiniWorks',
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Servidor local de desarrollo',
    },
  ],
  paths: {
    ...authDocs.paths,
    ...jobsDocs.paths,
    ...studentsDocs.paths,
    ...employersDocs.paths,
  },
};

module.exports = swaggerDocument;
