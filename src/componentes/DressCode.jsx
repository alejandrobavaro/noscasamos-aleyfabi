import React from 'react';
import { Link } from 'react-router-dom';
import "../assets/scss/_03-Componentes/_DressCode.scss";

const DressCode = () => {
  return (
    <div className="dresscode-container">
      <div className="dresscode-header">
        <h1>Dress Code</h1>
        <p>Inspiración para tu look en nuestra boda</p>
        <div className="floral-divider"></div>
      </div>

      <div className="dresscode-content">
        <div className="dresscode-section">
          <h2>Elegante Soirée</h2>
          <p>Queremos crear una atmósfera sofisticada y armoniosa</p>
        </div>

        <div className="attire-grid">
          <div className="attire-card">
            <div className="attire-image" style={{backgroundImage: "url('/img/dresscode/caballero-elegante.jpg')"}}></div>
            <div className="attire-details">
              <h3>Caballeros</h3>
              <ul>
                <li>Traje oscuro (azul marino, gris oscuro o negro)</li>
                <li>Corbata o corbatín opcional</li>
                <li>Zapatos de vestir</li>
                <li>Preferiblemente sin jeans</li>
              </ul>
            </div>
          </div>

          <div className="attire-card">
            <div className="attire-image" style={{backgroundImage: "url('/img/dresscode/dama-elegante.jpg')"}}></div>
            <div className="attire-details">
              <h3>Damas</h3>
              <ul>
                <li>Vestido largo o de cóctel elegante</li>
                <li>Tonos sugeridos: vino, dorado, nude o verde botella</li>
                <li>Tacones o sandalias elegantes</li>
                <li>Accesorios discretos</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="color-palette">
          <h3>Paleta de Colores Sugeridos</h3>
          <div className="colors">
            <div className="color-box" style={{backgroundColor: "#7A4F50"}}></div>
            <div className="color-box" style={{backgroundColor: "#C2A78D"}}></div>
            <div className="color-box" style={{backgroundColor: "#5A2D2D"}}></div>
            <div className="color-box" style={{backgroundColor: "#F8F1E9"}}></div>
            <div className="color-box" style={{backgroundColor: "#8C5E3D"}}></div>
          </div>
        </div>

        <Link to="/invitados" className="back-button">
          Volver al Área de Invitados
        </Link>
      </div>
    </div>
  );
};

export default DressCode;