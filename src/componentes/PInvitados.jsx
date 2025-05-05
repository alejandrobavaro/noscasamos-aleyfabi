import React from "react";
import { useNavigate } from "react-router-dom";
import "../assets/scss/_03-Componentes/_PInvitados.scss";

function PInvitados() {
  const navigate = useNavigate();

  const guestOptions = [
    {
      title: "Confirmar Asistencia",
      icon: "bi-check-circle-fill",
      description: "Por favor confirma tu presencia antes del 1 de Noviembre",
      path: "/invitados/confirmar",
      className: "opcion-confirmar"
    },
    {
      title: "Ubicación",
      icon: "bi-geo-alt-fill",
      description: "Información sobre el lugar y cómo llegar",
      path: "/invitados/ubicacion",
      className: "opcion-ubicacion"
    },
    {
      title: "Dress Code",
      icon: "bi-gift-fill",
      description: "Elegante soirée - Colores sugeridos: tonos tierra y vino",
      path: "/invitados/dresscode",
      className: "opcion-dresscode"
    },
    {
      title: "Itinerario",
      icon: "bi-clock-fill",
      description: "Ceremonia: 20:00 hs - Recepción hasta las 4:00 am",
      path: "/invitados/PInvitadoItinerario",
      className: "opcion-itinerario"
    }
  ];

  return (
    <div className="pantalla-invitados">
      <div className="contenedor-invitados">
        {/* Encabezado */}
        <div className="encabezado-boda">
          <h1>Panel de Invitados</h1>
          <h2>Fabiola y Alejandro</h2>
          <p className="mensaje-bienvenida">
            Tienen el honor de compartir este día especial contigo
          </p>
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
          <h3>#BodaAlejandroYFabiola</h3>
          <div className="corazon-animado">❤️</div>
        </div>
      </div>
    </div>
  );
}

export default PInvitados;