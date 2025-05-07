import React from 'react';

function PPublicoLiveStream({ daysLeft }) {
  return (
    <section className="live-stream-section">
      <h2 className="section-title">Viví la fiesta en vivo</h2>
      <div className="stream-container">
        <div className="stream-info">
          <h3>Transmisión en vivo el día de la boda</h3>
          <p>Para aquellos que no puedan acompañarnos presencialmente, podrán seguir la ceremonia a través de nuestra transmisión en vivo.</p>
          
          <div className="stream-details">
            <div className="detail-item">
              <span className="detail-icon">📅</span>
              <span>23 de Noviembre 2025</span>
            </div>
            <div className="detail-item">
              <span className="detail-icon">⏰</span>
              <span>19:00 hs (Hora Argentina)</span>
            </div>
            <div className="detail-item">
              <span className="detail-icon">📍</span>
              <span>Capilla San José, Mar del Plata</span>
            </div>
          </div>
          
          <div className="PPublicoContadorDiasDias-stream">
            <p>Faltan <span>{daysLeft} días</span> para la transmisión</p>
          </div>
        </div>
        
        <div className="stream-placeholder">
          <div className="placeholder-content">
            <div className="camera-icon">🎥</div>
            <p>El streaming estará disponible aquí el día del evento</p>
            <p>No se requiere registro ni contraseña</p>
          </div>
        </div>
        
        <div className="stream-reminder">
          <p>Te enviaremos un recordatorio por correo electrónico cuando esté por comenzar</p>
        </div>
      </div>
    </section>
  );
}

export default PPublicoLiveStream;