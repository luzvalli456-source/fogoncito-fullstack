import { useState, useEffect } from 'react';
import ProductCard from './components/ProductCard.jsx';
import ProductForm from './components/ProductForm.jsx';
import {
  listarProductos, crearProducto, modificarProducto, eliminarProducto
} from './api.js';

const TABS = [
  { id: 'promociones', texto: 'Promociones' },
  { id: 'menu', texto: 'Menú completo' },
  { id: 'bebidas', texto: 'Bebidas' }
];

export default function App() {
  const [pantalla, setPantalla] = useState('carta'); // 'carta' | 'admin'
  const [categoria, setCategoria] = useState('promociones');
  const [busqueda, setBusqueda] = useState('');
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);           // error al leer la lista
  const [errorForm, setErrorForm] = useState(null);   // error al crear/editar
  const [guardando, setGuardando] = useState(false);
  const [editando, setEditando] = useState(null);
  const [carrito, setCarrito] = useState([]);

  // GET: en la carta se filtra por categoría; en admin se ve todo el listado
  const cargar = async () => {
    setCargando(true);
    setError(null);
    try {
      const filtros = pantalla === 'carta' ? { categoria, q: busqueda } : { q: busqueda };
      setProductos(await listarProductos(filtros));
    } catch (e) {
      setError(e.message);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => { cargar(); }, [pantalla, categoria, busqueda]);

  // POST o PUT según haya un producto en edición. La lista se actualiza sin recargar la página
  const guardar = async (datos) => {
    setGuardando(true);
    setErrorForm(null);
    try {
      if (editando) await modificarProducto(editando.id, datos);
      else await crearProducto(datos);
      setEditando(null);
      await cargar();
    } catch (e) {
      setErrorForm(e.message);
    } finally {
      setGuardando(false);
    }
  };

  // DELETE con confirmación previa
  const eliminar = async (producto) => {
    if (!window.confirm(`¿Eliminar "${producto.nombre}"? Esta acción no se puede deshacer.`)) return;
    try {
      await eliminarProducto(producto.id);
      await cargar();
    } catch (e) {
      setError(e.message);
    }
  };

  const agregar = (producto) => setCarrito([...carrito, producto]);
  const total = carrito.reduce((suma, p) => suma + p.precio, 0);

  return (
    <>
      <header className="encabezado">
        <h1>FOGONCITO</h1>
        <nav aria-label="Principal">
          <button className={pantalla === 'carta' ? 'nav activo' : 'nav'} onClick={() => setPantalla('carta')}>Carta</button>
          <button className={pantalla === 'admin' ? 'nav activo' : 'nav'} onClick={() => setPantalla('admin')}>Administrar</button>
        </nav>
      </header>

      <main>
        {pantalla === 'carta' && (
          <div className="tabs" role="tablist">
            {TABS.map(t => (
              <button key={t.id} role="tab" aria-selected={categoria === t.id}
                className={categoria === t.id ? 'tab activo' : 'tab'}
                onClick={() => setCategoria(t.id)}>{t.texto}</button>
            ))}
          </div>
        )}

        <label htmlFor="busqueda" className="oculto-visual">Buscar productos</label>
        <input id="busqueda" className="busqueda" type="search" placeholder="Buscar hamburguesa…"
          value={busqueda} onChange={(e) => setBusqueda(e.target.value)} />

        {pantalla === 'admin' && (
          <ProductForm productoEditando={editando} onGuardar={guardar}
            onCancelar={() => { setEditando(null); setErrorForm(null); }}
            error={errorForm} guardando={guardando} />
        )}

        {cargando && <p className="estado">Cargando productos…</p>}
        {error && <p className="error" role="alert">{error}</p>}
        {!cargando && !error && productos.length === 0 && (
          <p className="estado">No hay productos para mostrar.</p>
        )}

        <section className="grilla">
          {!cargando && productos.map(p => (
            <ProductCard key={p.id} producto={p}
              onAgregar={pantalla === 'carta' ? agregar : undefined}
              onEditar={pantalla === 'admin' ? setEditando : undefined}
              onEliminar={pantalla === 'admin' ? eliminar : undefined} />
          ))}
        </section>
      </main>

      {carrito.length > 0 && pantalla === 'carta' && (
        <aside className="barra-flotante">
          Ver pedido ({carrito.length}) • $ {total.toLocaleString('es-AR')}
          <button className="btn-texto" onClick={() => setCarrito([])}>Vaciar</button>
        </aside>
      )}
    </>
  );
}
