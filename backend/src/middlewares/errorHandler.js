// Manejo de errores centralizado: se reconoce porque recibe 4 parámetros
// eslint-disable-next-line no-unused-vars
export function errorHandler(err, req, res, next) {
  // JSON mal formado en el cuerpo del pedido
  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({ error: 'El cuerpo del pedido no es un JSON válido' });
  }
  console.error(err); // el detalle queda solo en la terminal del servidor
  res.status(500).json({ error: 'Error interno del servidor' });
}
