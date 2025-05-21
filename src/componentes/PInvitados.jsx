import React from "react";
import { useNavigate } from "react-router-dom";
import "../assets/scss/_03-Componentes/_PInvitados.scss";

function PInvitados() {
  const navigate = useNavigate();

  const guestOptions = [
    {
      className: "confirm-option",
      path: "/confirmar-asistencia",
      icon: "bi-envelope-check",
      title: "Confirmar Asistencia",
      description: "Confirma tu asistencia a nuestra boda"
    },
    {
      className: "location-option",
      path: "/ubicacion",
      icon: "bi-geo-alt",
      title: "Ubicación",
      description: "Cómo llegar al lugar del evento"
    },
    {
      className: "itinerary-option",
      path: "/itinerario",
      icon: "bi-calendar-event",
      title: "Itinerario",
      description: "Programa de actividades"
    },
    {
      className: "dresscode-option",
      path: "/codigo-vestimenta",
      icon: "bi-suit-heart",
      title: "Código de Vestimenta",
      description: "Recomendaciones para tu outfit"
    }
  ];

  return (
    <div className="invitados-container">
      <div className="invitados-content">
        {/* Header */}
        <header className="invitados-header">
          <h1>Panel de Invitados</h1>
        </header>

        {/* Event Details Section */}
        <section className="evento-detalles">
          <div className="detalles-card">
            <h2>Detalles del Evento</h2>
            <div className="detalles-grid">
              <div className="detalle-item confirm-option">
                <i className="bi bi-cup-hot-fill"></i>
                <div>
                  <h3>Recepción Invitados</h3>
                  <p>Desde las 19:00 hs</p>
                </div>
              </div>

              <div className="detalle-item location-option">
                <i className="bi bi-suit-heart"></i>
                <div>
                  <h3>La Ceremonia</h3>
                  <p>Será en Casa del Mar</p>
                  <p>A las 19:30 hs</p>
                </div>
              </div>

              <div className="detalle-item itinerary-option">
                <i className="bi bi-moon-stars"></i>
                <div>
                  <h3>Evento</h3>
                  <p>Desde las 19 hs</p>
                  <p>Hasta las 4:00 am</p>
                </div>
              </div>

              <div className="detalle-item dresscode-option">
                <i className="bi bi-people-fill"></i>
                <div>
                  <h3>Edad Permitida</h3>
                  <p>Mayores de 14 años</p>
                  <p>Sin Niños</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Guest Options */}
        <div className="opciones-invitados">
          {guestOptions.map((option, index) => (
            <button
              key={`option-${index}`}
              className={`opcion-invitado ${option.className}`}
              onClick={() => navigate(option.path)}
              aria-label={option.title}
            >
              <div className="opcion-icono">
                <i className={`bi ${option.icon}`}></i>
              </div>
              <h3>{option.title}</h3>
              <p>{option.description}</p>
              <div className="opcion-decoracion"></div>
            </button>
          ))}
        </div>

        {/* Social Hashtag Section */}
        <section className="seccion-hashtag">
          <p>Compartí tus fotos usando nuestro hashtag</p>
          <h3>#BodaFabiyAle</h3>
          <div className="corazon-animado">❤️</div>
        </section>
      </div>
    </div>
  );
}

export default PInvitados;