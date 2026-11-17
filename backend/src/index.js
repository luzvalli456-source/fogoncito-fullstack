import express from 'express';
import cors from 'cors';
import productosRouter from './routes/productos.routes.js';
import { logger } from './middlewares/logger.js';
import { notFound } from './middlewares/notFound.js';
import { errorHandler } from './middlewares/errorHandler.js';

const app = express();
const PORT = process.env.PORT ?? 3000;

// Middlewares de base
app.use(cors());           // permite que el frontend (otro puerto) llame a la API
app.use(express.json());   // lee el cuerpo JSON de los pedidos
app.use(logger);           // middleware propio: registra método, ruta y hora

app.get('/api/salud', (req, res) => {
  res.json({ estado: 'ok' });
});

app.use('/api/productos', productosRouter);

// Siempre al final: primero 404, después el manejador de errores
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
