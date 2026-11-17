import { leerProductos, guardarProductos } from '../data/almacen.js';

const CATEGORIAS = ['promociones', 'menu', 'bebidas'];

// Devuelve un texto con los problemas encontrados, o null si todo está bien
function validar(body) {
  const errores = [];
  if (typeof body.nombre !== 'string' || !body.nombre.trim()) {
    errores.push('nombre es obligatorio (texto)');
  }
  if (typeof body.precio !== 'number' || !Number.isFinite(body.precio) || body.precio <= 0) {
    errores.push('precio es obligatorio (número mayor a 0)');
  }
  if (!CATEGORIAS.includes(body.categoria)) {
    errores.push(`categoria debe ser una de: ${CATEGORIAS.join(', ')}`);
  }
  if (body.descripcion !== undefined && typeof body.descripcion !== 'string') {
    errores.push('descripcion debe ser texto');
  }
  return errores.length ? `Datos inválidos: ${errores.join('; ')}` : null;
}

// Solo copiamos los campos permitidos (ignora cualquier otro que llegue)
function limpiar(body) {
  return {
    nombre: body.nombre.trim(),
    descripcion: (body.descripcion ?? '').trim(),
    precio: body.precio,
    categoria: body.categoria
  };
}

export async function listarProductos(req, res, next) {
  try {
    let productos = await leerProductos();
    const { categoria, q } = req.query;
    if (categoria) productos = productos.filter(p => p.categoria === categoria);
    if (q) {
      const texto = String(q).toLowerCase();
      productos = productos.filter(p =>
        p.nombre.toLowerCase().includes(texto) || p.descripcion.toLowerCase().includes(texto));
    }
    res.status(200).json(productos);
  } catch (err) { next(err); }
}

export async function obtenerProducto(req, res, next) {
  try {
    const productos = await leerProductos();
    const producto = productos.find(p => p.id === Number(req.params.id));
    if (!producto) return res.status(404).json({ error: 'Producto no encontrado' });
    res.status(200).json(producto);
  } catch (err) { next(err); }
}

export async function crearProducto(req, res, next) {
  try {
    const problema = validar(req.body ?? {});
    if (problema) return res.status(400).json({ error: problema });

    const productos = await leerProductos();
    const id = productos.reduce((max, p) => Math.max(max, p.id), 0) + 1;
    const nuevo = { id, ...limpiar(req.body) };
    productos.push(nuevo);
    await guardarProductos(productos);
    res.status(201).json(nuevo);
  } catch (err) { next(err); }
}

export async function modificarProducto(req, res, next) {
  try {
    const problema = validar(req.body ?? {});
    if (problema) return res.status(400).json({ error: problema });

    const productos = await leerProductos();
    const indice = productos.findIndex(p => p.id === Number(req.params.id));
    if (indice === -1) return res.status(404).json({ error: 'Producto no encontrado' });

    productos[indice] = { id: productos[indice].id, ...limpiar(req.body) };
    await guardarProductos(productos);
    res.status(200).json(productos[indice]);
  } catch (err) { next(err); }
}

export async function eliminarProducto(req, res, next) {
  try {
    const productos = await leerProductos();
    const indice = productos.findIndex(p => p.id === Number(req.params.id));
    if (indice === -1) return res.status(404).json({ error: 'Producto no encontrado' });

    productos.splice(indice, 1);
    await guardarProductos(productos);
    res.status(204).send();
  } catch (err) { next(err); }
}
