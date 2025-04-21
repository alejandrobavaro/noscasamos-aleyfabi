// src/componentes/TiendaOfertas.jsx
import React from 'react';
import '../assets/scss/_03-Componentes/_TiendaOfertas.scss'; // Verifica esta ruta

const TiendaOfertas = ({ producto, onEncargar }) => {
  const { id, nombre, precio, imagenes, categoria } = producto;

  return (
    <div key={id} className="producto-card">
      {ofertas.includes(id) && (
        <div className="oferta-tag">Oferta 30%</div>
      )}
      <img
        src={imagenes[0]}
        alt={nombre}
        className="producto-image"
      />
      <h5 className="producto-title">{nombre}</h5>
      <h4 className="producto-price">
        ${precio.toFixed(2)}
      </h4>
      {onEncargar && (
        <button
          className="btn btn-primary producto-button"
          onClick={() => onEncargar(id)}
        >
          Encargar
        </button>
      )}
    </div>
  );
};

export default TiendaOfertas;
