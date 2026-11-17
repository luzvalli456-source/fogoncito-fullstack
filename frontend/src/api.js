// Todas las llamadas a la API propia. La URL base viene de la variable de entorno (.env)
const API_URL = import.meta.env.VITE_API_URL;

async function pedir(ruta, opciones = {}) {
  let respuesta;
  try {
    respuesta = await fetch(`${API_URL}${ruta}`, {
      headers: { 'Content-Type': 'application/json' },
      ...opciones
    });
  } catch {
    throw new Error('No se pudo conectar con el servidor. ¿Está encendido el backend?');
  }
  if (respuesta.status === 204) return null; // DELETE: sin contenido
  const datos = await respuesta.json();
  // Si la API respondió con error, mostramos su mensaje: { "error": "..." }
  if (!respuesta.ok) throw new Error(datos.error ?? 'Error inesperado');
  return datos;
}

export const listarProductos = ({ categoria, q } = {}) => {
  const params = new URLSearchParams();
  if (categoria) params.set('categoria', categoria);
  if (q) params.set('q', q);
  const texto = params.toString();
  return pedir(`/productos${texto ? `?${texto}` : ''}`);
};

export const crearProducto = (producto) =>
  pedir('/productos', { method: 'POST', body: JSON.stringify(producto) });

export const modificarProducto = (id, producto) =>
  pedir(`/productos/${id}`, { method: 'PUT', body: JSON.stringify(producto) });

export const eliminarProducto = (id) =>
  pedir(`/productos/${id}`, { method: 'DELETE' });
