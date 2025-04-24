import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import html2canvas from 'html2canvas';
import '../assets/scss/_03-Componentes/_Invitaciones.scss';

const Invitaciones = () => {
  const [invitadosData, setInvitadosData] = useState(null);
  const [selectedGuest, setSelectedGuest] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [showInvitation, setShowInvitation] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const invitationRef = useRef(null);

  // Datos mejorados con más poesía y significado
  const eventData = {
    fecha: "Sábado, 15 de Noviembre de 2025",
    hora: "19:30 horas",
    lugar: "Hacienda de los Sueños",
    direccion: "Camino de la Luna 1234, Valle Florido, Buenos Aires",
    codigoVestimenta: "Elegante (traje largo o vestido de cóctel)",
    confirmarAntesDe: "1 de Noviembre de 2025",
    frases: [
      "El amor no tiene edad, siempre está naciendo",
      "En cada latido, una promesa; en cada mirada, un universo",
      "Juntos no somos uno, sino infinitos"
    ],
    mensajeAmor: "Después de un camino recorrido juntos, donde cada paso fue una historia y cada mirada un poema, hemos decidido unir nuestras vidas para siempre. Queremos compartir este momento tan especial contigo, testigo de nuestro amor.",
    mensajeAgradecimiento: "Tu presencia es el mejor regalo que podríamos recibir. Gracias por ser parte de nuestra historia y por acompañarnos en este nuevo capítulo lleno de sueños por cumplir."
  };

  // Imágenes para el carrusel
  const coupleImages = [
    "/img/couple1.jpg",
    "/img/couple2.jpg",
    "/img/couple3.jpg"
  ];

  useEffect(() => {
    fetch('/invitados.json')
      .then(response => response.json())
      .then(data => {
        setInvitadosData(data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error("Error cargando datos:", error);
        setIsLoading(false);
      });
  }, []);

  // Efecto para el carrusel automático
  useEffect(() => {
    if (showInvitation) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) => 
          prevIndex === coupleImages.length - 1 ? 0 : prevIndex + 1
        );
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [showInvitation, coupleImages.length]);

  const handleDownload = () => {
    html2canvas(invitationRef.current, {
      scale: 2,
      logging: false,
      useCORS: true,
      backgroundColor: null
    }).then(canvas => {
      const link = document.createElement('a');
      link.download = `Invitacion-Boda-${selectedGuest.nombre.replace(/\s+/g, '-')}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    });
  };

  const handleShareWhatsApp = () => {
    const message = `¡${selectedGuest.nombre}! 💌\n\n` +
      `Con todo nuestro cariño, queremos invitarte a celebrar nuestro amor el día más especial de nuestras vidas.\n\n` +
      `📅 ${eventData.fecha}\n` +
      `🕢 ${eventData.hora}\n` +
      `📍 ${eventData.lugar}\n` +
      `🗺️ ${eventData.direccion}\n\n` +
      `"${eventData.mensajeAmor}"\n\n` +
      `Por favor, confírmanos tu asistencia antes del ${eventData.confirmarAntesDe}\n\n` +
      `Con amor,\n${invitadosData.novios.novia} & ${invitadosData.novios.novio}`;
    
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank');
  };

  const nextPage = () => {
    if (currentPage < 3) {
      setCurrentPage(currentPage + 1);
    } else {
      setShowInvitation(true);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
      setShowInvitation(false);
    }
  };

  if (isLoading) {
    return (
      <motion.div 
        className="loading-container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <motion.i 
          className="bi bi-hearts"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        />
        <p>Preparando algo especial para ti...</p>
      </motion.div>
    );
  }

  if (!invitadosData) {
    return (
      <div className="error-container">
        <i className="bi bi-heartbreak"></i>
        <p>Lo sentimos, hubo un error al cargar los datos.</p>
      </div>
    );
  }

  return (
    <div className="invitaciones-page">
      <h1>Nuestra Boda</h1>
      <p className="subtitle">Una invitación llena de amor y momentos especiales</p>

      <div className="invitaciones-layout">
        <div className="guest-selection">
          <h2>Nuestros Invitados</h2>
          <div className="search-box">
            <input 
              type="text" 
              placeholder="Buscar invitado..."
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <i className="bi bi-search"></i>
          </div>

          <div className="guest-groups">
            {invitadosData.grupos.map(grupo => (
              <div key={grupo.nombre} className="guest-group">
                <h3>{grupo.nombre}</h3>
                <ul>
                  {grupo.invitados.map(invitado => (
                    <motion.li 
                      key={invitado.id} 
                      className={selectedGuest?.id === invitado.id ? 'selected' : ''}
                      onClick={() => {
                        setSelectedGuest(invitado);
                        setCurrentPage(0);
                        setShowInvitation(false);
                      }}
                      whileHover={{ scale: 1.02 }}
                    >
                      {invitado.nombre}
                      {invitado.relacion && <span className="relation">{invitado.relacion}</span>}
                    </motion.li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="invitation-container">
          {selectedGuest ? (
            <>
              {!showInvitation ? (
                <div className="invitation-journey">
                  <AnimatePresence mode='wait'>
                    <motion.div
                      key={currentPage}
                      initial={{ opacity: 0, x: currentPage > 0 ? 50 : -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: currentPage > 0 ? -50 : 50 }}
                      transition={{ duration: 0.5 }}
                      className="journey-page"
                    >
                      {currentPage === 0 && (
                        <div className="story-page">
                          <h3>Nuestra Historia</h3>
                          <div className="story-slider">
                            <img src="/img/story/1.jpg" alt="Nuestra historia" />
                          </div>
                          <p>"El amor no se mide por el tiempo, sino por la intensidad con que late el corazón"</p>
                          <p className="story-text">
                            Cada foto, cada momento, ha sido un paso hacia este día especial que queremos compartir contigo.
                          </p>
                        </div>
                      )}
                      
                      {currentPage === 1 && (
                        <div className="poem-page">
                          <h3>Poema para ti</h3>
                          <div className="poem-content">
                            <p>"En tus ojos encontré el hogar que mi alma buscaba,</p>
                            <p>en tus manos, la paz que mi corazón anhelaba.</p>
                            <p>Hoy unimos nuestros caminos bajo el mismo cielo,</p>
                            <p>y queremos que seas parte de este sueño hecho realidad."</p>
                          </div>
                          <div className="video-container">
                            <video autoPlay loop muted>
                              <source src="/vid/love-story.mp4" type="video/mp4" />
                            </video>
                          </div>
                        </div>
                      )}
                      
                      {currentPage === 2 && (
                        <div className="countdown-page">
                          <h3>El Gran Día</h3>
                          <div className="countdown-slider">
                            <img src="/img/venue/1.jpg" alt="Lugar de la boda" />
                          </div>
                          <div className="event-preview">
                            <p><i className="bi bi-calendar-heart"></i> {eventData.fecha}</p>
                            <p><i className="bi bi-geo-alt"></i> {eventData.lugar}</p>
                            <p className="teaser">Pronto recibirás una invitación muy especial...</p>
                          </div>
                        </div>
                      )}
                      
                      {currentPage === 3 && (
                        <div className="surprise-page">
                          <h3>Una Sorpresa</h3>
                          <div className="animation-container">
                            <motion.div
                              animate={{ 
                                rotate: [0, 10, -10, 0],
                                scale: [1, 1.1, 1]
                              }}
                              transition={{ repeat: Infinity, duration: 3 }}
                            >
                              <i className="bi bi-heart-fill"></i>
                            </motion.div>
                          </div>
                          <p>¡Estás a punto de descubrir algo maravilloso!</p>
                          <p className="hint">(Continúa para ver tu invitación personalizada)</p>
                        </div>
                      )}
                    </motion.div>
                  </AnimatePresence>

                  <div className="journey-controls">
                    <button onClick={prevPage} disabled={currentPage === 0}>
                      <i className="bi bi-arrow-left"></i> Anterior
                    </button>
                    <button onClick={nextPage}>
                      {currentPage === 3 ? 'Ver Invitación' : 'Siguiente'} <i className="bi bi-arrow-right"></i>
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div 
                    ref={invitationRef} 
                    className="invitation-card baroque-design"
                  >
                    {/* Marco barroco decorativo */}
                    <div className="baroque-frame top"></div>
                    <div className="baroque-frame right"></div>
                    <div className="baroque-frame bottom"></div>
                    <div className="baroque-frame left"></div>
                    
                    {/* Slider de imágenes de los novios */}
                    <div className="couple-slider">
                      <AnimatePresence mode="wait">
                        <motion.img
                          key={currentImageIndex}
                          src={coupleImages[currentImageIndex]}
                          alt="Los novios"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 1 }}
                        />
                      </AnimatePresence>
                    </div>

                    <div className="invitation-header">
                      <div className="floral-decoration top">
                        <i className="bi bi-flower1"></i>
                        <i className="bi bi-flower2"></i>
                        <i className="bi bi-flower3"></i>
                      </div>
                      <h2>Con la bendición de nuestras familias</h2>
                      <div className="couple-names">
                        <motion.span
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 }}
                        >
                          {invitadosData.novios.novia}
                        </motion.span>
                        <span className="and">&</span>
                        <motion.span
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.4 }}
                        >
                          {invitadosData.novios.novio}
                        </motion.span>
                      </div>
                      <p className="invitation-subtitle">Tienen el honor de invitarte a celebrar su unión</p>
                    </div>

                    <div className="invitation-body">
                      <motion.p 
                        className="guest-name"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                      >
                        Querido/a {selectedGuest.nombre}
                      </motion.p>
                      
                      <div className="love-message">
                        <p>{eventData.mensajeAmor}</p>
                        <p className="appreciation">{eventData.mensajeAgradecimiento}</p>
                      </div>

                      <div className="event-details">
                        <div className="detail-item">
                          <i className="bi bi-calendar-heart"></i>
                          <span><strong>Fecha:</strong> {eventData.fecha}</span>
                        </div>
                        <div className="detail-item">
                          <i className="bi bi-clock"></i>
                          <span><strong>Hora:</strong> {eventData.hora}</span>
                        </div>
                        <div className="detail-item">
                          <i className="bi bi-geo-alt"></i>
                          <span><strong>Lugar:</strong> {eventData.lugar}</span>
                        </div>
                        <div className="detail-item">
                          <i className="bi bi-pin-map"></i>
                          <span><strong>Dirección:</strong> {eventData.direccion}</span>
                        </div>
                        <div className="detail-item">
                          <i className="bi bi-suit-heart"></i>
                          <span><strong>Código de vestimenta:</strong> {eventData.codigoVestimenta}</span>
                        </div>
                      </div>

                      <div className="adults-only">
                        <i className="bi bi-balloon-heart"></i>
                        <span>Una celebración íntima para adultos</span>
                      </div>

                      <p className="rsvp">
                        <strong>Por favor confirma tu asistencia antes del {eventData.confirmarAntesDe}</strong><br />
                        <span className="contact-info">Contacto: {invitadosData.contacto}</span>
                      </p>
                    </div>

                    <div className="invitation-footer">
                      <div className="floral-decoration bottom">
                        <i className="bi bi-flower3"></i>
                        <i className="bi bi-flower2"></i>
                        <i className="bi bi-flower1"></i>
                      </div>
                      <p>"{eventData.frases[Math.floor(Math.random() * eventData.frases.length)]}"</p>
                      <div className="signature">
                        <span>Con todo nuestro amor,</span>
                        <span className="names">{invitadosData.novios.novia} & {invitadosData.novios.novio}</span>
                      </div>
                    </div>
                  </div>

                  <div className="invitation-actions">
                    <motion.button 
                      onClick={handleDownload}
                      className="download-btn"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <i className="bi bi-download"></i> Descargar Invitación
                    </motion.button>
                    <motion.button 
                      onClick={handleShareWhatsApp}
                      className="whatsapp-btn"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <i className="bi bi-whatsapp"></i> Enviar por WhatsApp
                    </motion.button>
                    <button 
                      onClick={() => setShowInvitation(false)}
                      className="back-btn"
                    >
                      <i className="bi bi-arrow-repeat"></i> Ver el viaje nuevamente
                    </button>
                  </div>
                </>
              )}
            </>
          ) : (
            <div className="no-guest-selected">
              <i className="bi bi-envelope-open-heart"></i>
              <p>Selecciona un invitado para descubrir su invitación especial</p>
              <small>Cada invitación es única, como cada persona en nuestra vida</small>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Invitaciones;