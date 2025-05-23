// src/componentes/MainCabinaButton.jsx
import React from 'react';
import '../assets/scss/_03-Componentes/_MainCabinaButton.scss';

function MainCabinaButton({ onClick }) {
  return (
    <div className='cabina-button-container'>
      <button 
        className="cabina-button"
        onClick={onClick}
        aria-label="Abrir cabina fotográfica"
      >
        <i className="bi bi-camera-fill"></i>
      </button>
    </div>
  );
}

export default MainCabinaButton;