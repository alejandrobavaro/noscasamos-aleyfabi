import React from "react";
import "../assets/scss/_03-Componentes/_PInvitadosUbicacion.scss";

function PInvitadosUbicacion() {
  return (
    <div className="ubicacion-container">
      <div className="ubicacion-content">
        <header className="ubicacion-header">
          <h1>Ubicación Evento <i className="bi bi-geo-alt-fill"></i></h1>
          <h2>Salon de Fiestas "Casa del Mar"</h2>
          <p>C. Scaglia 5400, Camet, Mar del Plata <span>(Villa García Uriburu)</span></p>
        </header>

        <div className="ubicacion-mapa">
          <div className="mapa-wrapper">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3146.95446790233!2d-57.53541182464954!3d-37.93149414077484!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9584dbe607453ba1%3A0x291283dcc3a2ec94!2sCasa%20del%20Mar%20-%20Villa%20Garc%C3%ADa%20Uriburu!5e0!3m2!1ses-419!2sar!4v1746547896180!5m2!1ses-419!2sar"
              width="100%"
              height="300"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Ubicación Casa del Mar"
            ></iframe>
            <a
              href="https://maps.app.goo.gl/S5ds8kasR6YvZ1ht8"
              target="_blank"
              rel="noopener noreferrer"
              className="mapa-link"
            >
              Abrir en Google Maps
            </a>
          </div>
        </div>

        <section className="ubicacion-transporte">
          <h2><i className="bi bi-signpost-split"></i> Cómo llegar</h2>
          <div className="transporte-opciones">
            <div className="transporte-opcion">
              <i className="bi bi-car-front-fill"></i>
              <h3>En auto</h3>
              <p>20 minutos desde el centro de Mar del Plata</p>
              <p className="transporte-detalle">Amplio estacionamiento disponible</p>
            </div>
            <div className="transporte-opcion">
              <i className="bi bi-taxi-front"></i>
              <h3>Taxi/Remis</h3>
              <p>Aproximadamente $...... desde el centro</p>
              <p className="transporte-detalle">Taxi: 223 475-1111</p>
            </div>
          </div>
        </section>

        <section className="ubicacion-historia">
          <h2><i className="bi bi-book"></i> Sobre el lugar</h2>
          <div className="historia-contenido">
            <div className="historia-texto">
              <p>Casa del Mar es un hermoso parque natural de cuatro hectáreas en la Villa García Uriburu de Mar del Plata, donde podrás disfrutar de un ambiente campestre con frondosa arboleda y animales de granja.</p>
              <p>La propiedad fue construida en 1930 y perteneció a la familia García Uriburu. En aquellos tiempos, la zona era poco habitada, con playas amplias y acantilados imponentes.</p>
            </div>
            <div className="historia-imagen">
              <img 
                src="/img/07-img-galeria4-salon/2025-04-05 043.jpg" 
                alt="Historia de Casa del Mar" 
                loading="lazy"
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default PInvitadosUbicacion;