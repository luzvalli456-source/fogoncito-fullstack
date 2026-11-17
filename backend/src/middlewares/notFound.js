// Se ejecuta si ninguna ruta coincidió: 404 en JSON (no una página HTML)
export function notFound(req, res) {
  res.status(404).json({ error: `Ruta no encontrada: ${req.method} ${req.originalUrl}` });
}
