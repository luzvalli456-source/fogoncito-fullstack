import { useState, useEffect } from 'react';

const VACIO = { nombre: '', descripcion: '', precio: '', categoria: 'menu' };

// Formulario controlado: sirve para crear (POST) y para editar (PUT)
export default function ProductForm({ productoEditando, onGuardar, onCancelar, error, guardando }) {
  const [datos, setDatos] = useState(VACIO);

  // Cuando se elige un producto para editar, se cargan sus datos en el formulario
  useEffect(() => {
    setDatos(productoEditando ? { ...productoEditando } : VACIO);
  }, [productoEditando]);

  const cambiar = (e) => setDatos({ ...datos, [e.target.name]: e.target.value });

  const enviar = (e) => {
    e.preventDefault();
    onGuardar({ ...datos, precio: Number(datos.precio) });
  };

  return (
    <form className="formulario" onSubmit={enviar}>
      <h2>{productoEditando ? 'Editar producto' : 'Nuevo producto'}</h2>

      <label htmlFor="nombre">Nombre</label>
      <input id="nombre" name="nombre" value={datos.nombre} onChange={cambiar} />

      <label htmlFor="descripcion">Descripción</label>
      <input id="descripcion" name="descripcion" value={datos.descripcion} onChange={cambiar} />

      <label htmlFor="precio">Precio ($)</label>
      <input id="precio" name="precio" type="number" min="0" value={datos.precio} onChange={cambiar} />

      <label htmlFor="categoria">Categoría</label>
      <select id="categoria" name="categoria" value={datos.categoria} onChange={cambiar}>
        <option value="promociones">Promociones</option>
        <option value="menu">Menú completo</option>
        <option value="bebidas">Bebidas</option>
      </select>

      {/* Mensaje de error que devuelve la API (por ejemplo, una validación fallida) */}
      {error && <p className="error" role="alert">{error}</p>}

      <div className="acciones">
        <button className="btn" type="submit" disabled={guardando}>
          {guardando ? 'Guardando…' : productoEditando ? 'Guardar cambios' : 'Crear producto'}
        </button>
        {productoEditando && (
          <button className="btn btn-secundario" type="button" onClick={onCancelar}>Cancelar</button>
        )}
      </div>
    </form>
  );
}
