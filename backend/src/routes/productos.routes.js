import { Router } from 'express';
import {
  listarProductos, obtenerProducto, crearProducto, modificarProducto, eliminarProducto
} from '../controllers/productos.controller.js';

const router = Router();

router.get('/', listarProductos);          // GET    /api/productos  (?categoria=&q=)
router.get('/:id', obtenerProducto);       // GET    /api/productos/:id
router.post('/', crearProducto);           // POST   /api/productos
router.put('/:id', modificarProducto);     // PUT    /api/productos/:id
router.delete('/:id', eliminarProducto);   // DELETE /api/productos/:id

export default router;
