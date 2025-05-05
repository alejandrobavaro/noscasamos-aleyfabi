import React from 'react';
import Slider from 'react-slick';
import "../assets/scss/_03-Componentes/_PInvitadosUbicacion.scss";

function PInvitadosUbicacion() {
  const locationImages = [
    "/img/05-img-costados-larga/1a.jpg",
    "/img/05-img-costados-larga/2a.jpg",
    "/img/05-img-costados-larga/3a.jpg",
    "/img/05-img-costados-larga/4a.jpg",
    "/img/05-img-costados-larga/5a.jpg"
  ];

  const coupleImages = [
    "/img/05-img-costados-larga/1a.jpg",
    "/img/05-img-costados-larga/2a.jpg",
    "/img/05-img-costados-larga/3a.jpg",
    "/img/05-img-costados-larga/4a.jpg",
    "/img/05-img-costados-larga/5a.jpg"
  ];

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: false
  };

  return (
    <div className="ubicacion-invitados">
      <div className="hero-section">
        <h1>Nuestra Boda en Casa del Mar</h1>
        <p className="subtitle">23 de Noviembre de 2025 - Villa García Uriburu, Mar del Plata</p>
      </div>

      <div className="location-content">
        {/* Sección de información principal */}
        <section className="main-info">
          <div className="info-card">
            <h2><i className="bi bi-heart-fill"></i> Celebración de Amor</h2>
            <div className="info-grid">
              <div className="info-item">
                <i className="bi bi-clock-fill"></i>
                <div>
                  <h3>Ceremonia</h3>
                  <p>20:00 hs</p>
                </div>
              </div>
              <div className="info-item">
                <i className="bi bi-cup-hot-fill"></i>
                <div>
                  <h3>Recepción</h3>
                  <p>21:00 a 04:00 hs</p>
                </div>
              </div>
              <div className="info-item">
                <i className="bi bi-geo-alt-fill"></i>
                <div>
                  <h3>Dirección</h3>
                  <p>Villa García Uriburu, Mar del Plata</p>
                </div>
              </div>
              <div className="info-item">
                <i className="bi bi-calendar2-heart-fill"></i>
                <div>
                  <h3>Confirmación</h3>
                  <p>Antes del 1 de Noviembre</p>
                </div>
              </div>
            </div>
          </div>

          <div className="map-container">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3284.0168878895286!2d-58.383759999999996!3d-34.6037349!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bccacf425a4a1f%3A0x7e7e6a3e1a0e3e1f!2sCasa%20del%20Mar!5e0!3m2!1sen!2sar!4v1620000000000!5m2!1sen!2sar" 
              allowFullScreen="" 
              loading="lazy"
              title="Mapa de Casa del Mar"
            ></iframe>
            <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="map-link">
              Abrir en Google Maps
            </a>
          </div>
        </section>

        {/* Slider de imágenes del lugar */}
        <section className="location-gallery">
          <h2><i className="bi bi-images"></i> Casa del Mar</h2>
          <Slider {...sliderSettings} className="image-slider">
            {locationImages.map((img, index) => (
              <div key={index} className="slider-item">
                <img src={img} alt={`Casa del Mar ${index + 1}`} />
              </div>
            ))}
          </Slider>
        </section>

        {/* Historia del lugar */}
        <section className="location-history">
          <h2><i className="bi bi-book"></i> Historia de Casa del Mar</h2>
          <div className="history-content">
            <div className="history-text">
              <p>Casa del Mar es un hermoso parque natural de cuatro hectáreas a cargo de la Asociación Ecológica Arbolar en la Villa García Uriburu de Mar del Plata. En ella se puede disfrutar de un ambiente campestre con frondosa arboleda y en contacto con animales de granja.</p>
              <p>La propiedad fue construida en el año 1930 y perteneció a la familia de García Uriburu. En esos tiempos la ciudad llegaba hasta la Av. Constitución. El Parque Camet y el arroyo La Tapera significaban toda una excursión.</p>
              <p>En días de lluvia se llegaba a la casa a caballo, por un camino que pasaba a 200 metros mar adentro del actual (el mar lo erosionó). La zona era muy poco habitada, con playas muy amplias y acantilados.</p>
            </div>
            <div className="history-image">
              <img src="/img/00-fondos/fondoaleyfabi1.jpg" alt="Historia de Casa del Mar" />
            </div>
          </div>
        </section>

        {/* Slider de la pareja */}
        <section className="couple-gallery">
          <h2><i className="bi bi-hearts"></i> Nuestro Camino a Casa del Mar</h2>
          <Slider {...sliderSettings} className="couple-slider">
            {coupleImages.map((img, index) => (
              <div key={index} className="slider-item">
                <img src={img} alt={`Ale y Fabi ${index + 1}`} />
                <div className="image-caption">
                  {index === 0 && "Nuestro primer viaje juntos"}
                  {index === 1 && "El día de nuestra propuesta"}
                  {index === 2 && "Visitando Casa del Mar"}
                </div>
              </div>
            ))}
          </Slider>
        </section>

        {/* Cómo llegar */}
        <section className="transport-section">
          <h2><i className="bi bi-signpost-split"></i> Cómo llegar</h2>
          <div className="transport-options">
            <div className="transport-card">
              <i className="bi bi-car-front-fill"></i>
              <h3>En auto</h3>
              <p>15 minutos desde el centro de Mar del Plata. Amplio estacionamiento disponible.</p>
              <p><strong>Ruta recomendada:</strong> Tomar Av. Constitución hacia el sur hasta llegar a Villa García Uriburu.</p>
            </div>
            <div className="transport-card">
              <i className="bi bi-taxi-front"></i>
              <h3>Taxi/Remis</h3>
              <p>Aproximadamente $1200 desde el centro. Compartir taxi con otros invitados es una buena opción.</p>
              <p><strong>Radio Taxi:</strong> 223 499-9999</p>
            </div>
            <div className="transport-card">
              <i className="bi bi-bus-front"></i>
              <h3>Transporte organizado</h3>
              <p>Servicio de combis saliendo desde:
                <ul>
                  <li>Hotel Costa Galana - 19:30 hs</li>
                  <li>Sheraton Mar del Plata - 19:45 hs</li>
                </ul>
              </p>
            </div>
          </div>
        </section>

        {/* Notas importantes */}
        <section className="important-notes">
          <h2><i className="bi bi-info-circle"></i> Información importante</h2>
          <div className="notes-grid">
            <div className="note-card">
              <i className="bi bi-sun"></i>
              <h3>Clima</h3>
              <p>Noviembre en Mar del Plata es templado (18-25°C). Recomendamos traer una chaqueta liviana para la noche.</p>
            </div>
            <div className="note-card">
              <i className="bi bi-suit-heart"></i>
              <h3>Dress Code</h3>
              <p>Elegante soirée. Tonos sugeridos: tierra, vino, dorado. Zapatos cómodos para terreno irregular.</p>
            </div>
            <div className="note-card">
              <i className="bi bi-moon-stars"></i>
              <h3>Transporte de regreso</h3>
              <p>Habrá combis de regreso al centro a las 2:00 y 4:00 hs. Por favor coordinar con los novios.</p>
            </div>
            <div className="note-card">
              <i className="bi bi-gift"></i>
              <h3>POrgRegalos</h3>
              <p>Su presencia es nuestro mejor regalo. Si desean hacernos un obsequio, agradecemos contribuciones a nuestra luna de miel.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default PInvitadosUbicacion;