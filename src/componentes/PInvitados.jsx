import React from "react";
import { useNavigate } from "react-router-dom";
import "../assets/scss/_03-Componentes/_PInvitados.scss";

function PInvitados() {
  const navigate = useNavigate();

  const guestOptions = [
    // Tus opciones de invitados aquí
  ];

  return (
    <div className="guest-screen">
      <div className="guest-container">
        {/* Header */}
        <div className="guest-header">
          <h1>Panel de Invitados</h1>
        </div>

        {/* Event Details Section */}
        <div className="event-details">
          <div className="details-card">
            <h2>Detalles del Evento</h2>
            <div className="details-grid">
              <div className="detail-item confirm-option">
                <i className="bi bi-cup-hot-fill"></i>
                <div>
                  <h3>Recepción Invitados</h3>
                  <p>Desde las 19:00 hs</p>
                </div>
              </div>

              <div className="detail-item location-option">
                <i className="bi bi-suit-heart"></i>
                <div>
                  <h3>La Ceremonia</h3>
                  <p>Será en Casa del Mar</p>
                  <p>A las 19:30 hs</p>
                </div>
              </div>

              <div className="detail-item itinerary-option">
                <i className="bi bi-moon-stars"></i>
                <div>
                  <h3>Evento</h3>
                  <p>Desde las 19 hs</p>
                  <p>Hasta las 4:00 am</p>
                </div>
              </div>

              <div className="detail-item dresscode-option">
                <i className="bi bi-people-fill"></i>
                <div>
                  <h3>Edad Permitida</h3>
                  <p>Mayores de 14 años</p>
                  <p>Sin Niños</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Guest Options */}
        <div className="guest-options">
          {guestOptions.map((option, index) => (
            <div
              key={`option-${index}`}
              className={`guest-option ${option.className}`}
              onClick={() => navigate(option.path)}
            >
              <div className="option-icon">
                <i className={`bi ${option.icon}`}></i>
              </div>
              <h3>{option.title}</h3>
              <p>{option.description}</p>
              <div className="option-decoration"></div>
            </div>
          ))}
        </div>

        {/* Social Hashtag Section */}
        <div className="hashtag-section">
          <p>Compartí tus fotos usando nuestro hashtag</p>
          <h3>#BodaFabiyAle</h3>
          <div className="animated-heart">❤️</div>
        </div>
      </div>
    </div>
  );
}

export default PInvitados;