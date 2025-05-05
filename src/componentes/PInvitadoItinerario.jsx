import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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

  // Avanzar automáticamente el timeline
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
      description:
        "Los novios y el equipo de bridal party se preparan en suites exclusivas. Maquillaje, peinado y los últimos detalles para el gran momento.",
      icon: "💅",
      images: [
        "/img/PInvitadoItinerario/preparativos-1.jpg",
        "/img/PInvitadoItinerario/preparativos-2.jpg",
        "/img/PInvitadoItinerario/preparativos-3.jpg",
      ],
      details: [
        "Salón de belleza móvil para damas de honor",
        "Barra de cócteles sin alcohol durante la preparación",
        "Fotógrafo documentando los momentos íntimos",
      ],
    },
    {
      time: "17:30 hs",
      title: "Primer Look",
      description:
        "Revelación del look completo de los novios ante sus padres y padrinos. Momento emotivo con lágrimas de felicidad.",
      icon: "👰",
      images: [
        "/img/PInvitadoItinerario/primer-look-1.jpg",
        "/img/PInvitadoItinerario/primer-look-2.jpg",
      ],
      details: [
        "Ubicación: Jardín secreto de la mansión",
        "Brindis íntimo con champagne francés",
        "POrgRegalos simbólicos entre familias",
      ],
    },
    {
      time: "19:00 hs",
      title: "Llegada de Invitados",
      description:
        "Recepcionaremos a nuestros invitados con un cóctel de bienvenida de 5 estaciones y música en vivo.",
      icon: "🍸",
      images: [
        "/img/PInvitadoItinerario/llegada-1.jpg",
        "/img/PInvitadoItinerario/llegada-2.jpg",
        "/img/PInvitadoItinerario/llegada-3.jpg",
      ],
      details: [
        "Estación 1: Cócteles clásicos con twist moderno",
        "Estación 2: Ostras y caviar",
        "Estación 3: Miniaturas gourmet",
        "Estación 4: Barra de quesos artesanales",
        "Estación 5: Postres en miniatura",
      ],
    },
    {
      time: "20:00 hs",
      title: "Ceremonia Mágica",
      description:
        "Celebración del matrimonio en el jardín principal con arreglos florales espectaculares y música de cuerdas en vivo.",
      icon: "💒",
      images: [
        "/img/PInvitadoItinerario/ceremonia-1.jpg",
        "/img/PInvitadoItinerario/ceremonia-2.jpg",
        "/img/PInvitadoItinerario/ceremonia-3.jpg",
        "/img/PInvitadoItinerario/ceremonia-4.jpg",
      ],
      details: [
        "Acompañamiento de orquesta de 12 músicos",
        "Alfombra floral de pétalos naturales",
        "Efectos de iluminación al atardecer",
        "Sorpresas durante la ceremonia",
      ],
    },
    {
      time: "21:00 hs",
      title: "Cena Épica",
      description:
        "Banquete con menú degustación de 7 pasos diseñado por chef estrella Michelin, con pairing de vinos exclusivos.",
      icon: "🍽️",
      images: [
        "/img/PInvitadoItinerario/cena-1.jpg",
        "/img/PInvitadoItinerario/cena-2.jpg",
        "/img/PInvitadoItinerario/cena-3.jpg",
      ],
      details: [
        "Entrada: Tartar de wagyu con trufa",
        "Segundo: Ravioli de langosta",
        "Principal: Cordero lechal o opción vegana",
        "Postre: Experiencia de chocolate interactiva",
        "Vinos: Selección de bodegas boutique",
      ],
    },
    {
      time: "23:00 hs",
      title: "Brindis y Primer Baile",
      description:
        "Brindis por los novios con champagne vintage y apertura de pista con coreografía sorpresa.",
      icon: "💃",
      images: [
        "/img/PInvitadoItinerario/brindis-1.jpg",
        "/img/PInvitadoItinerario/brindis-2.jpg",
      ],
      details: [
        "Champagne Krug 2008",
        "Efectos pirotécnicos controlados",
        "Transición musical de clásico a moderno",
        "Invitación general a la pista",
      ],
    },
    {
      time: "00:00 hs",
      title: "Torta y Fiesta",
      description:
        "Corte de torta de 5 pisos con show de luces y continuación de la celebración con DJ internacional.",
      icon: "🎂",
      images: ["/img/PInvitadoItinerario/torta-1.jpg", "/img/PInvitadoItinerario/torta-2.jpg"],
      details: [
        "Diseño de torta inspirado en viajes de los novios",
        "Barra de dulces personalizados",
        "Efectos de humo y confeti",
        "Temática musical por décadas",
      ],
    },
    {
      time: "02:00 hs",
      title: "Hora Loca",
      description:
        "Sorpresas, accesorios brillantes y energía al máximo con animadores profesionales.",
      icon: "🎉",
      images: [
        "/img/PInvitadoItinerario/horaloca-1.jpg",
        "/img/PInvitadoItinerario/horaloca-2.jpg",
      ],
      details: [
        "Vestuario y accesorios luminiscentes",
        "Performance de baile sorpresa",
        "Barra de shots creativos",
        "Concurso de baile con premios",
      ],
    },
    {
      time: "04:00 hs",
      title: "Despedida Épica",
      description:
        "Gran final con show de luces, fuegos artificiales y despedida con estilo.",
      icon: "✨",
      images: [
        "/img/PInvitadoItinerario/despedida-1.jpg",
        "/img/PInvitadoItinerario/despedida-2.jpg",
      ],
      details: [
        "Show pirotécnico sincronizado con música",
        "Foto grupal con drones",
        "Recuerdos personalizados para invitados",
        "Transporte seguro organizado",
      ],
    },
    {
      time: "05:00 hs",
      title: "After Party (Solo íntimos)",
      description:
        "Continuación de la fiesta en ubicación secreta para los más resistentes.",
      icon: "🥂",
      images: ["/img/PInvitadoItinerario/after-1.jpg", "/img/PInvitadoItinerario/after-2.jpg"],
      details: [
        "Ubicación: Penthouse con vista a la ciudad",
        "DJ en vivo hasta el amanecer",
        "Menú de recuperación con especialidades",
        "Área de relax con masajistas",
      ],
    },
  ];

  return (
    <div className="PInvitadoItinerario-container">
      <div className="PInvitadoItinerario-header">
        <h1>Itinerario - 23 de Noviembre 2025</h1>
      </div>

      <div className="timeline-wrapper">
        <div className="timeline-scrollable">
          {timelineItems.map((item, index) => (
            <div
              key={index}
              className={`timeline-marker ${
                index === activeItem ? "active" : ""
              }`}
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
        <div className="timeline-details">
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
                      <img
                        src={img}
                        alt={`${timelineItems[activeItem].title} ${i + 1}`}
                      />
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
      </div>

      <div className="additional-info">
        <h3>Información Premium</h3>
        <p>
          Cada momento ha sido cuidadosamente diseñado para crear experiencias
          únicas e inolvidables.
        </p>
        <p>
          Contaremos con servicio de fotografía 360°, realidad virtual para
          familiares a distancia, y un equipo de coordinación disponible las 24
          horas.
        </p>
      </div>

      <div className="countdown">
        <h3>Faltan</h3>
        <div className="countdown-timer">
          <span>XX</span> días <span>XX</span> horas <span>XX</span> minutos
        </div>
        <p>para el comienzo de esta historia</p>
      </div>

      <Link to="/invitados" className="back-button">
        Volver al Área de Invitados
      </Link>
    </div>
  );
};

export default PInvitadoItinerario;
