export const openapi = {
  openapi: '3.0.3',
  info: { title: 'Reservas API', version: '1.0.0', description: 'API de demostración para la defensa de Programación Web.' },
  servers: [{ url: '/api' }],
  paths: {
    '/activities': {
      get: { summary: 'Listar actividades', responses: { 200: { description: 'Lista de actividades' } } },
      post: { summary: 'Crear actividad (administrador)', security: [{ bearerAuth: [] }], requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/Activity' } } } }, responses: { 201: { description: 'Creada' }, 400: { description: 'Datos inválidos' }, 401: { description: 'No autenticado' }, 403: { description: 'Rol no autorizado' } } }
    },
    '/activities/{id}': { get: { summary: 'Obtener actividad', parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }], responses: { 200: { description: 'Actividad' }, 404: { description: 'No encontrada' } } } },
    '/auth/login': { post: { summary: 'Iniciar sesión', requestBody: { required: true, content: { 'application/json': { schema: { type: 'object', required: ['email', 'password'], properties: { email: { type: 'string', example: 'admin@demo.com' }, password: { type: 'string', example: 'admin123' } } } } } }, responses: { 200: { description: 'Token JWT' }, 401: { description: 'Credenciales inválidas' } } } },
    '/reservations': {
      get: { summary: 'Reservas del cliente autenticado', security: [{ bearerAuth: [] }], responses: { 200: { description: 'Reservas ordenadas por fecha' } } },
      post: { summary: 'Crear reserva', security: [{ bearerAuth: [] }], responses: { 201: { description: 'Reserva creada' }, 400: { description: 'Datos inválidos' }, 404: { description: 'Actividad no encontrada' } } }
    }
  },
  components: {
    securitySchemes: { bearerAuth: { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' } },
    schemas: { Activity: { type: 'object', required: ['title', 'category', 'date', 'price'], properties: { title: { type: 'string' }, category: { type: 'string' }, date: { type: 'string', format: 'date' }, price: { type: 'number' } } } }
  }
};
