import React from "react";
import { useNavigate } from "react-router-dom";
import "../assets/scss/_03-Componentes/_PInvitados.scss";

function PInvitados() {
  const navigate = useNavigate();

  const guestOptions = [
    // Tus opciones de invitados aquí
  ];

  return (
    <div className="pantalla-invitados">
      <div className="contenedor-invitados">
        {/* Encabezado */}
        <div className="encabezado-boda">
          <h1>Panel de Invitados</h1>
        </div>

        {/* Sección de Detalles del Evento */}
        <div className="info-detallada">
          <div className="info-card">
            <h2>Detalles del Evento</h2>
            <div className="info-grid">
              <div className="info-item opcion-confirmar">
                <i className="bi bi-cup-hot-fill"></i>
                <div>
                  <h3>Recepción Invitados</h3>
                  <p>Desde las 19:00 hs</p>
                </div>
              </div>

              <div className="info-item opcion-ubicacion">
                <i className="bi bi-suit-heart"></i>
                <div>
                  <h3>La Ceremonia</h3>
                  <p>Será en Casa del Mar</p>
                  <p>A las 19:30 hs</p>
                </div>
              </div>

              <div className="info-item opcion-itinerario">
                <i className="bi bi-moon-stars"></i>
                <div>
                  <h3>Evento</h3>
                  <p>Desde las 19 hs</p>
                  <p>Hasta las 4:00 am</p>
                </div>
              </div>

              <div className="info-item opcion-dresscode">
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

        {/* Opciones para invitados */}
        <div className="opciones-invitados">
          {guestOptions.map((option, index) => (
            <div
              key={index}
              className={`opcion ${option.className}`}
              onClick={() => navigate(option.path)}
            >
              <div className="icono-container">
                <i className={`bi ${option.icon}`}></i>
              </div>
              <h3>{option.title}</h3>
              <p>{option.description}</p>
              <div className="decoracion-opcion"></div>
            </div>
          ))}
        </div>

        {/* Hashtag para redes sociales */}
        <div className="seccion-hashtag">
          <p>Compartí tus fotos usando nuestro hashtag</p>
          <h3>#BodaFabiyAle</h3>
          <div className="corazon-animado">❤️</div>
        </div>
      </div>
    </div>
  );
}

export default PInvitados;