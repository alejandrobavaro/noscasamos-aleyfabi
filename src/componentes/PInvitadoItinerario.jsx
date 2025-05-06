import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../assets/scss/_03-Componentes/_PInvitadoItinerario.scss";

const PInvitadoItinerario = () => {
  const [activeItem, setActiveItem] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: autoPlay,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    beforeChange: (current, next) => setActiveItem(next),
  };

  useEffect(() => {
    if (autoPlay) {
      const interval = setInterval(() => {
        setActiveItem((prev) => (prev + 1) % timelineItems.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [autoPlay]);

  const timelineItems = [
    {
      time: "15:00 hs",
      title: "Preparativos VIP",
      description: "Los novios y el equipo de bridal party se preparan en suites exclusivas.",
      icon: "💅",
      images: [
        "/img/PInvitadoItinerario/preparativos-1.jpg",
        "/img/PInvitadoItinerario/preparativos-2.jpg",
      ],
      details: [
        "Salón de belleza móvil para damas de honor",
        "Barra de cócteles sin alcohol",
        "Fotógrafo documentando los momentos"
      ],
    },
    {
      time: "17:30 hs",
      title: "Primer Look",
      description: "Revelación del look completo de los novios ante sus padres y padrinos.",
      icon: "👰",
      images: [
        "/img/PInvitadoItinerario/primer-look-1.jpg",
        "/img/PInvitadoItinerario/primer-look-2.jpg",
      ],
      details: [
        "Ubicación: Jardín secreto",
        "Brindis íntimo con champagne",
        "Regalos simbólicos entre familias"
      ],
    },
    {
      time: "19:00 hs",
      title: "Llegada de Invitados",
      description: "Recepcionaremos a nuestros invitados con un cóctel de bienvenida.",
      icon: "🍸",
      images: [
        "/img/PInvitadoItinerario/llegada-1.jpg",
        "/img/PInvitadoItinerario/llegada-2.jpg",
      ],
      details: [
        "Estación 1: Cócteles clásicos",
        "Estación 2: Ostras y caviar",
        "Estación 3: Miniaturas gourmet"
      ],
    },
    {
      time: "20:00 hs",
      title: "Ceremonia Mágica",
      description: "Celebración del matrimonio en el jardín principal con arreglos florales.",
      icon: "💒",
      images: [
        "/img/PInvitadoItinerario/ceremonia-1.jpg",
        "/img/PInvitadoItinerario/ceremonia-2.jpg",
      ],
      details: [
        "Acompañamiento de orquesta",
        "Alfombra floral de pétalos",
        "Efectos de iluminación especiales"
      ],
    },
    {
      time: "21:00 hs",
      title: "Cena Épica",
      description: "Banquete con menú degustación diseñado por chef estrella Michelin.",
      icon: "🍽️",
      images: [
        "/img/PInvitadoItinerario/cena-1.jpg",
        "/img/PInvitadoItinerario/cena-2.jpg",
      ],
      details: [
        "Entrada: Tartar de wagyu con trufa",
        "Principal: Cordero lechal",
        "Postre: Experiencia de chocolate"
      ],
    },
    {
      time: "23:00 hs",
      title: "Brindis y Primer Baile",
      description: "Brindis por los novios con champagne vintage y apertura de pista.",
      icon: "💃",
      images: [
        "/img/PInvitadoItinerario/brindis-1.jpg",
        "/img/PInvitadoItinerario/brindis-2.jpg",
      ],
      details: [
        "Champagne de edición especial",
        "Coreografía sorpresa",
        "Invitación general a la pista"
      ],
    }
  ];

  return (
    <div className="pantalla-itinerario">
      <div className="contenedor-itinerario">
        <div className="encabezado-boda">
          <h1>Itinerario <i className="bi bi-calendar-heart"></i></h1>
          <h2>Fabiola y Alejandro</h2>
          <p className="mensaje-bienvenida">
            23 de Noviembre 2025 - Casa del Mar
          </p>
        </div>

        <div className="timeline-controls">
          <div className="timeline-scrollable">
            {timelineItems.map((item, index) => (
              <div
                key={index}
                className={`timeline-marker ${index === activeItem ? "active" : ""}`}
                onClick={() => {
                  setActiveItem(index);
                  setAutoPlay(false);
                }}
              >
                {item.time}
              </div>
            ))}
          </div>
        </div>

        <div className="timeline-content-container">
          <div className="timeline-item">
            <div className="timeline-time">
              {timelineItems[activeItem].time}
            </div>
            <div className="timeline-content">
              <h3>{timelineItems[activeItem].title}</h3>
              <p>{timelineItems[activeItem].description}</p>
              <div className="timeline-icon">
                {timelineItems[activeItem].icon}
              </div>

              <div className="timeline-slider">
                <Slider {...settings}>
                  {timelineItems[activeItem].images.map((img, i) => (
                    <div key={i} className="slider-image">
                      <img src={img} alt={`${timelineItems[activeItem].title} ${i + 1}`} />
                    </div>
                  ))}
                </Slider>
              </div>

              <div className="timeline-extras">
                <h4>Detalles Exclusivos:</h4>
                <ul>
                  {timelineItems[activeItem].details.map((detail, i) => (
                    <li key={i}>{detail}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="seccion-info opcion-confirmar">
          <h3><i className="bi bi-info-circle"></i> Información Premium</h3>
          <p>Cada momento ha sido cuidadosamente diseñado para crear experiencias únicas e inolvidables.</p>
          <p>Contaremos con servicio de fotografía 360° y un equipo de coordinación disponible.</p>
        </div>

        <div className="seccion-countdown opcion-ubicacion">
          <h3><i className="bi bi-clock"></i> Faltan</h3>
          <div className="countdown-timer">
            <span>XX</span> días <span>XX</span> horas <span>XX</span> minutos
          </div>
          <p>para el comienzo de esta historia</p>
        </div>

        <div className="seccion-hashtag">
          <p>Compartí tus fotos usando nuestro hashtag</p>
          <h3>#BodaAlejandroYFabiola</h3>
          <div className="corazon-animado">❤️</div>
        </div>
      </div>
    </div>
  );
};

export default PInvitadoItinerario;