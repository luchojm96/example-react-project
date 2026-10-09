# Defensa de Programación Web

Aplicación demostrativa para los cinco casos del documento de defensa UNIFRANZ. La interfaz está hecha con React, Vite y React Router; el backend usa Express y expone una API REST con Swagger UI.

## Requisitos

- Node.js 20 o superior
- npm

## Inicio rápido

```bash
npm install
npm run dev
```

Abre http://localhost:5173. La API escucha en http://localhost:4000 y Swagger UI en http://localhost:4000/docs. El archivo de datos se crea automáticamente en `server/data.json` con actividades de ejemplo y dos cuentas.

## Cuentas de demostración

| Rol | Correo | Contraseña |
| --- | --- | --- |
| Administrador | admin@demo.com | admin123 |
| Cliente | ana@demo.com | ana123 |

Inicia sesión en el caso 04, crea una actividad como administrador o reserva una actividad desde el caso 01. Revisa la reserva en el caso 03 y reinicia el servidor para demostrar la persistencia.

## Casos cubiertos

1. **Componentes, estado y rutas:** filtro de categorías en React, estados de carga/error/vacío, fichas dinámicas por ID, props y keys estables.
2. **API REST y validación:** listado, detalle, creación validada, respuestas HTTP y documentación OpenAPI interactiva.
3. **Persistencia y capas:** rutas, servicios y repositorios separados; reservas por usuario ordenadas por fecha y persistidas entre reinicios.
4. **Autenticación y autorización:** comparación bcrypt, JWT de dos horas, middleware de autenticación y rol administrador.
5. **Integración y despliegue:** capa de servicios de frontend, URL API configurable, CORS por origen, manejo de errores y pasos de build.

## Arquitectura del proyecto

```text
src/
  api.js                 Cliente HTTP y servicios del frontend
  App.jsx                Composición de navegación y sesión
  components/            Componentes reutilizables
  pages/                 Una vista por caso de defensa
server/
  app.js, index.js        Configuración y arranque de Express
  config/                 Variables y configuración
  routes/                 Mapeo de endpoints
  controllers/            Traducción HTTP a operaciones de aplicación
  services/               Reglas de negocio y validación
  repositories/           Lectura y escritura de persistencia
  middleware/             Autenticación y autorización
  docs/                   Contrato OpenAPI
```

El flujo del backend es `ruta → controlador → servicio → repositorio`. Las páginas React llaman la capa HTTP de `src/api.js`; `App.jsx` se ocupa de la navegación y sesión compartida.

## Configuración de entorno

Copia `.env.example` a `.env` para configurar el servidor. En desarrollo Vite utiliza el proxy definido en `vite.config.js`. Para compilar el frontend con una URL de API de producción define `VITE_API_URL` durante `npm run build`. Define `FRONTEND_ORIGIN` con el origen permitido y reemplaza `JWT_SECRET` por un valor aleatorio robusto.

## Decisiones de implementación

El repositorio de demostración guarda datos en un archivo JSON para que pueda ejecutarse sin instalar ni configurar PostgreSQL. Conserva la separación ruta/servicio/repositorio y puede sustituirse por un ORM sin cambiar los contratos HTTP. Para producción se recomienda PostgreSQL, un ORM, almacenamiento seguro de secretos, HTTPS y persistencia transaccional.

La cuenta administradora y el secreto alternativo de desarrollo son únicamente para la demostración local. Configura secretos propios antes de desplegar.
