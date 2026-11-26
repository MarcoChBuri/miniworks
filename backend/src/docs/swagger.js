const fs = require('fs');
const path = require('path');
const yaml = require('yamljs');

const swaggerDocument = {
  openapi: '3.0.0',
  info: {
    title: 'MiniWorks API',
    version: '1.0.0',
    description: 'API para la plataforma de empleos MiniWorks',
    contact: {
      name: 'API Support',
      email: 'support@miniworks.com'
    }
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Servidor de desarrollo'
    }
  ],
  tags: [],
  paths: {},
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT'
      }
    }
  }
};

// Función para cargar archivos YAML
function loadYamlFile(filePath) {
  try {
    const fileContents = fs.readFileSync(filePath, 'utf8');
    return yaml.load(fileContents);
  } catch (error) {
    console.error(`Error loading ${filePath}:`, error.message);
    return null;
  }
}

// Cargar todos los archivos YAML de documentación
const docsPath = path.join(__dirname);
const yamlFiles = ['auth.yaml', 'jobs.yaml', 'students.yaml', 'employers.yaml'];

yamlFiles.forEach(file => {
  const filePath = path.join(docsPath, file);
  const doc = loadYamlFile(filePath);
  
  if (doc) {
    // Agregar tags
    if (doc.tags) {
      doc.tags.forEach(tag => {
        if (!swaggerDocument.tags.find(t => t.name === tag.name)) {
          swaggerDocument.tags.push(tag);
        }
      });
    }
    
    // Agregar paths
    if (doc.paths) {
      Object.keys(doc.paths).forEach(pathKey => {
        swaggerDocument.paths[pathKey] = doc.paths[pathKey];
      });
    }
  }
});

// Agregar endpoints de postulaciones que no están en los YAML
swaggerDocument.paths['/api/postulations/jobs/{jobId}/apply'] = {
  post: {
    summary: 'Postula a un trabajo',
    tags: ['Postulations'],
    security: [{ bearerAuth: [] }],
    parameters: [
      {
        in: 'path',
        name: 'jobId',
        required: true,
        schema: { type: 'string' },
        description: 'ID del trabajo'
      }
    ],
    responses: {
      201: {
        description: 'Postulación enviada exitosamente',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                message: { type: 'string' },
                data: {
                  type: 'object',
                  properties: {
                    id: { type: 'string' },
                    jobId: { type: 'string' },
                    studentId: { type: 'string' },
                    status: { type: 'string' },
                    appliedAt: { type: 'string', format: 'date-time' }
                  }
                }
              }
            }
          }
        }
      },
      403: {
        description: 'Solo estudiantes pueden postularse a trabajos',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                message: { type: 'string' }
              }
            }
          }
        }
      },
      500: {
        description: 'Error al postular',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                message: { type: 'string' }
              }
            }
          }
        }
      }
    }
  }
};

swaggerDocument.paths['/api/postulations/jobs/{jobId}/applications/{applicationId}/accept'] = {
  put: {
    summary: 'Acepta a un postulante en un trabajo',
    tags: ['Postulations'],
    security: [{ bearerAuth: [] }],
    parameters: [
      {
        in: 'path',
        name: 'jobId',
        required: true,
        schema: { type: 'string' },
        description: 'ID del trabajo'
      },
      {
        in: 'path',
        name: 'applicationId',
        required: true,
        schema: { type: 'string' },
        description: 'ID de la postulación'
      }
    ],
    responses: {
      200: {
        description: 'Postulante aceptado exitosamente',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                message: { type: 'string' },
                data: {
                  type: 'object',
                  properties: {
                    id: { type: 'string' },
                    jobId: { type: 'string' },
                    studentId: { type: 'string' },
                    status: { type: 'string' },
                    updatedAt: { type: 'string', format: 'date-time' }
                  }
                }
              }
            }
          }
        }
      },
      403: {
        description: 'Solo empleadores pueden aceptar postulantes',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                message: { type: 'string' }
              }
            }
          }
        }
      },
      500: {
        description: 'Error al aceptar postulante',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                message: { type: 'string' }
              }
            }
          }
        }
      }
    }
  }
};

// Agregar tag de Postulations si no existe
if (!swaggerDocument.tags.find(t => t.name === 'Postulations')) {
  swaggerDocument.tags.push({
    name: 'Postulations',
    description: 'Endpoints para gestión de postulaciones a trabajos'
  });
}

module.exports = swaggerDocument;

