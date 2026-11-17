// Middleware propio: muestra en consola método, ruta y hora de cada pedido
export function logger(req, res, next) {
  const hora = new Date().toLocaleTimeString('es-AR');
  console.log(`[${hora}] ${req.method} ${req.originalUrl}`);
  next();
}
