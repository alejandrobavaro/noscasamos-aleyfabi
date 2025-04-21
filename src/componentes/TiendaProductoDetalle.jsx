import React from "react";
import '../assets/scss/_03-Componentes/_TiendaProductoDetalle.scss';

const TiendaProductoDetalle = ({ detalle }) => {
  if (!detalle) return null;

  return (
    <div className="producto-detalle">
      <h4>Detalle del Producto:</h4>
      <div className="detalle-info">
        <p><strong>Nombre:</strong> {detalle.nombre}</p>
        <p><strong>Precio:</strong> ${detalle.precio.toFixed(2)}</p>
        <p><strong>Categoría:</strong> {detalle.categoria}</p>
        <p><strong>Descripción:</strong> {detalle.descripcion}</p>
      </div>
    </div>
  );
};

export default TiendaProductoDetalle;
