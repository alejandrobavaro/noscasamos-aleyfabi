import React from 'react';
import { Link } from 'react-router-dom';
import "../assets/scss/_03-Componentes/_Itinerario.scss";

const Itinerario = () => {
  return (
    <div className="itinerario-container">
      <div className="itinerario-header">
        <h1>Itinerario</h1>
        <p>El cronograma de nuestro día especial</p>
        <div className="floral-divider"></div>
      </div>

      <div className="timeline">
        <div className="timeline-item">
          <div className="timeline-time">19:30 hs</div>
          <div className="timeline-content">
            <h3>Llegada de Invitados</h3>
            <p>Recepcionaremos a nuestros invitados con un cóctel de bienvenida</p>
            <div className="timeline-icon">🍸</div>
          </div>
        </div>

        <div className="timeline-item">
          <div className="timeline-time">20:00 hs</div>
          <div className="timeline-content">
            <h3>Ceremonia</h3>
            <p>Celebración del matrimonio en el jardín principal</p>
            <div className="timeline-icon">💒</div>
          </div>
        </div>

        <div className="timeline-item">
          <div className="timeline-time">21:00 hs</div>
          <div className="timeline-content">
            <h3>Cena</h3>
            <p>Banquete con menú de 4 pasos y selección de vinos</p>
            <div className="timeline-icon">🍽️</div>
          </div>
        </div>

        <div className="timeline-item">
          <div className="timeline-time">23:00 hs</div>
          <div className="timeline-content">
            <h3>Brindis y Primer Baile</h3>
            <p>Brindis por los novios y apertura de pista</p>
            <div className="timeline-icon">💃</div>
          </div>
        </div>

        <div className="timeline-item">
          <div className="timeline-time">00:00 hs</div>
          <div className="timeline-content">
            <h3>Torta y Fiesta</h3>
            <p>Corte de torta y continuación de la celebración</p>
            <div className="timeline-icon">🎂</div>
          </div>
        </div>

        <div className="timeline-item">
          <div className="timeline-time">04:00 hs</div>
          <div className="timeline-content">
            <h3>Cierre</h3>
            <p>Despedida y cierre del evento</p>
            <div className="timeline-icon">✨</div>
          </div>
        </div>
      </div>

      <div className="additional-info">
        <h3>Información Adicional</h3>
        <p>El transporte de regreso estará disponible para todos los invitados</p>
      </div>

      <Link to="/invitados" className="back-button">
        Volver al Área de Invitados
      </Link>
    </div>
  );
};

export default Itinerario;