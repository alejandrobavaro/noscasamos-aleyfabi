import React from "react";
import { useNavigate } from "react-router-dom";
import "../assets/scss/_03-Componentes/_PInvitados.scss";

function PInvitados() {
  const navigate = useNavigate();

  const guestOptions = [
    
  ];

  return (
    <div className="pantalla-invitados">
      <div className="contenedor-invitados">
        {/* Encabezado */}
        <div className="encabezado-boda">
          <h1>Panel de Invitados</h1>
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