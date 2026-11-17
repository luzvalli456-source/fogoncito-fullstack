// Tarjeta reutilizable: se usa en la carta (cliente) y en el panel de administración
export default function ProductCard({ producto, onAgregar, onEditar, onEliminar }) {
  return (
    <article className="tarjeta">
      <h3>{producto.nombre}</h3>
      <p className="descripcion">{producto.descripcion}</p>
      <div className="fila">
        <span className="precio">$ {producto.precio.toLocaleString('es-AR')}</span>
        {onAgregar && (
          <button className="btn" onClick={() => onAgregar(producto)}>Agregar</button>
        )}
        {onEditar && (
          <div className="acciones">
            <button className="btn btn-secundario" onClick={() => onEditar(producto)}>Editar</button>
            <button className="btn btn-peligro" onClick={() => onEliminar(producto)}>Eliminar</button>
          </div>
        )}
      </div>
    </article>
  );
}
