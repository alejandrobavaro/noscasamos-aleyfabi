import React from "react";
import Slider from "react-slick";
import "../assets/scss/_03-Componentes/_PInvitadosUbicacion.scss";

function PInvitadosUbicacion() {
  const locationImages = [
    "/img/05-img-costados-larga/1a.jpg",
    "/img/05-img-costados-larga/2a.jpg",
    "/img/05-img-costados-larga/3a.jpg",
    "/img/05-img-costados-larga/4a.jpg",
    "/img/05-img-costados-larga/5a.jpg",
  ];

  const coupleImages = [
    "/img/05-img-costados-larga/1a.jpg",
    "/img/05-img-costados-larga/2a.jpg",
    "/img/05-img-costados-larga/3a.jpg",
    "/img/05-img-costados-larga/4a.jpg",
    "/img/05-img-costados-larga/5a.jpg",
  ];

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: false,
  };

  return (
    <div className="pantalla-ubicacion">
      <div className="contenedor-ubicacion">
        <div className="encabezado-boda">
          <h1>Ubicación Evento <i className="bi bi-geo-alt-fill"></i></h1>
          <h2>Salon de Fiestas "Casa del Mar" </h2>
          <p className="mensaje-bienvenida">
            C. Scaglia 5400, Camet, Mar del Plata <span className="location-subtitle">(Villa García Uriburu)</span>
          </p>
        </div>

        <div className="mapa-principal">
          <div className="map-container">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3146.95446790233!2d-57.53541182464954!3d-37.93149414077484!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9584dbe607453ba1%3A0x291283dcc3a2ec94!2sCasa%20del%20Mar%20-%20Villa%20Garc%C3%ADa%20Uriburu!5e0!3m2!1ses-419!2sar!4v1746547896180!5m2!1ses-419!2sar"
              width="100%"
              height="450"
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
              className="map-link-button"
            >
              Abrir en Google Maps
            </a>
          </div>
        </div>

        <section className="seccion-transporte">
          <h2><i className="bi bi-signpost-split"></i> Cómo llegar</h2>
          <div className="opciones-transporte">
            <div className="opcion-transporte opcion-confirmar">
              <i className="bi bi-car-front-fill"></i>
              <h3>En auto</h3>
              <p>20 minutos desde el centro de Mar del Plata</p>
              <p className="detalle">Amplio estacionamiento disponible</p>
            </div>
            <div className="opcion-transporte opcion-ubicacion">
              <i className="bi bi-taxi-front"></i>
              <h3>Taxi/Remis</h3>
              <p>Aproximadamente $...... desde el centro</p>
              <p className="detalle">Taxi: 223 475-1111</p>
            </div>
          </div>
        </section>

        <section className="seccion-historia">
          <h2><i className="bi bi-book"></i> Sobre el lugar</h2>
          <div className="historia-content">
            <div className="historia-texto">
              <p>Casa del Mar es un hermoso parque natural de cuatro hectáreas en la Villa García Uriburu de Mar del Plata, donde podrás disfrutar de un ambiente campestre con frondosa arboleda y animales de granja.</p>
              <p>La propiedad fue construida en 1930 y perteneció a la familia García Uriburu. En aquellos tiempos, la zona era poco habitada, con playas amplias y acantilados imponentes.</p>
            </div>
            <div className="historia-imagen">
              <img src="/img/09-imagenes-salon/2025-04-05 043.jpg" alt="Historia de Casa del Mar" />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default PInvitadosUbicacion;