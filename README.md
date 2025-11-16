# ChismeCast — La API Oficial de los Chismes Técnicos™
ChismeCast es un proyecto creado con **NestJS**, **MongoDB**, **WebSockets**, y un **LLM**
(GROQ + Qwen/DeepSeek/etc) que genera chismes sobre desarrolladores rompiendo producción.
Sí, esto existe.
Sí, funciona.
Sí, deberías temerle.

## ¿Qué hace exactamente ChismeCast?
Te lo explico en detalle:

- Recibe una pregunta del cliente
- La manda al LLM para que genere un chisme técnico potente
- Le quita los `<think>` y el vómito estructural del modelo
- Lo guarda en MongoDB como si fuera evidencia de un crimen
- Lo broadcastea vía WebSockets a todos los clientes conectados
- Todos reciben en tiempo real la desgracia ajena

## Estructura del Proyecto
```BASH
src/
 ├── ai/              → Todo lo que habla con el LLM (GROQ, Qwen, etc)
 ├── chismes/         → CRUD + Gateway + lógica del chisme
 ├── common/          → dto, pipes, schemas, interfaces, utils (arquitectura clean)
 │    ├── dtos/
 │    ├── interfaces/
 │    ├── pipes/
 │    ├── schemas/
 │    └── utils/
 ├── config/          → ConfigService, env validation
 ├── database/        → Providers para MongoDB y conexión
 ├── app.module.ts    → Módulo raíz (obvio pues)
 └── main.ts          → Bootstrap, CORS, helmet, globalPrefix, etc
```
Todo modular, limpio, mantenible.
Lo contrario a la app que rompió el dev del chisme #3.

## Instalación y Ejecución
```BASH
# Clonar el repositorio
git clone https://github.com/tunombre/chismecast.git

# Ir al directorio del proyecto
cd chismecast

# Instalar dependencias
npm install
```

## Variables de Entorno
```SHELL
# Crea un archivo .env en la raíz del proyecto con las siguientes variables:
NODE_ENV=development
PORT=3000
ALLOWED_ORIGIN=http://localhost:3001
MONGO_URI=mongodb://localhost:27017/chismes
GROQ_API_KEY=tu_key_here
```

## Scripts del Proyecto
| Script               | Descripción                                 |
|----------------------|---------------------------------------------|
| `npm run start`      | Inicia la aplicación en modo producción     |
| `npm run start:dev`  | Inicia la aplicación en modo desarrollo     |
| `npm run start:debug`| Inicia la aplicación en modo debug          |
| `npm run start:prod` | Inicia la aplicación en modo producción     |
| `npm run build`      | Compila el proyecto TypeScript a JavaScript |
| `npm run lint`       | Ejecuta el linter para revisar el código    |
| `npm run format`     | Formatea el código con Prettier             |

## Endpoints REST

### `POST /api/v1/chismes`
Crea un nuevo chisme técnico.

#### Body
```JSON
{
  "question": "dame un chisme sobre un dev next.js"
}
```

#### Response
```JSON
{
  "_id": "609c1f2e8f1b2c0015b4d3c4",
  "title": "Next.js llorando en Producción",
  "content": "Un dev olvidó invalidar la caché del middleware y explotó todo...",
  "category": "awful",
  "createdAt": "2024-06-01T12:00:00.000Z"
}
```

### `GET /api/v1/chismes`
Endpoint paginado que devuelve todos los chismes ya guardados.

#### Query Params
- `page`: número de página (default: 1)
- `limit`: número de chismes por página (default: 1)

## WebSocket Events
> Namespace: `/chismes`

### Evento emitido por el servidor cuando se crea un nuevo chisme:
`
new-chisme
`

#### Payload
```JSON
{
  "_id": "609c1f2e8f1b2c0015b4d3c4",
  "title": "Next.js llorando en Producción",
  "content": "Un dev olvidó invalidar la caché del middleware y explotó todo...",
  "category": "awful",
  "createdAt": "2024-06-01T12:00:00.000Z"
}
```

### Evento esperado del cliente para solicitar un nuevo chisme:
No necesitas enviar nada para conectarte.
Solo entra al namespace y disfruta del caos.

## Cómo funciona el LLM por dentro
1. El servicio ai.service.ts envía la pregunta al modelo.
2. El modelo vomita un `<think>`, reflexiones, culpa existencial y luego el JSON.
3. Nosotros:
  - removemos `<think>`
  - intentamos parsear JSON
  - si no se puede: fallback a categoría `"basic"`
4. Todo queda legible gracias al método `format()`.

## Tecnologías
- NestJS (WebSockets + REST)
- Socket.IO
- MongoDB + Mongoose
- Zod para validar
- Helmet + CORS seguridad
- GROQ LLM API
- TypeScript con ESLint estricto
- Arquitectura modular para que no te dé pena mostrar tu repo