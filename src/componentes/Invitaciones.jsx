import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import html2canvas from 'html2canvas';
import { useNavigate } from 'react-router-dom';
import invitadosData from '../json/invitados.json';
import '../assets/scss/_03-Componentes/_Invitaciones.scss';

const Invitaciones = () => {
  // Estados del componente
  const [selectedGuest, setSelectedGuest] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [showInvitation, setShowInvitation] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [confirmationStatus, setConfirmationStatus] = useState({});
  const [confirmationForm, setConfirmationForm] = useState({
    attending: 'yes',
    guests: 1,
    mealPreference: 'regular',
    message: ''
  });
  const [petals, setPetals] = useState([]);
  const invitationRef = useRef(null);
  const navigate = useNavigate();

  // Datos del evento
  const eventData = {
    fecha: "Domingo, 23 de Noviembre de 2025",
    hora: "19:30 horas",
    lugar: "Casa del Mar - Villa García Uriburu",
    direccion: "C. Scaglia 5400, B7600 Mar del Plata, Provincia de Buenos Aires, Argentina",
    telefono: "223618-5299",
    direccionGoogleMaps: "https://g.co/kgs/89ZcU33",
    instagramCasadelMar: "https://www.instagram.com/casadelmar_mdp/?hl=es",
    codigoVestimenta: "Elegante (traje o vestido)",
    confirmarAntesDe: "1 de Noviembre de 2024",
    frases: [
      "El amor no tiene edad, siempre está naciendo",
      "En cada latido, una promesa; en cada mirada, un universo",
      "Juntos no somos uno, sino infinitos"
    ],
    mensajeAmor: "Después de un camino recorrido juntos, donde cada paso fue una historia y cada mirada un poema, hemos decidido unir nuestras vidas para siempre. Queremos compartir este momento tan especial contigo, testigo de nuestro amor.",
    mensajeAgradecimiento: "Tu presencia es el mejor regalo que podríamos recibir. Gracias por ser parte de nuestra historia y por acompañarnos en este nuevo capítulo lleno de sueños por cumplir.",
    itinerary: [
      { time: "19:00", event: "Llegada de invitados y recepción" },
      { time: "19:30", event: "Ceremonia de unión" },
      { time: "20:00", event: "Brindis y sesión de fotos" },
      { time: "20:30", event: "Cena de gala" },
      { time: "22:00", event: "Baile y celebración" },
      { time: "00:00", event: "Fin de la celebración" }
    ],
    giftStores: [
      { name: "Casa Muñoz", logo: "/img/stores/casa-munoz.png", link: "#" },
      { name: "Río Regalos", logo: "/img/stores/rio-regalos.png", link: "#" },
      { name: "Lista de Amazon", logo: "/img/stores/amazon.png", link: "#" }
    ]
  };

  // Imágenes de la pareja
  const coupleImages = [
    "/img/couple1.jpg",
    "/img/couple2.jpg",
    "/img/couple3.jpg"
  ];

  // Galería de fotos
  const galleryImages = [
    "/img/gallery/1.jpg",
    "/img/gallery/2.jpg",
    "/img/gallery/3.jpg",
    "/img/gallery/4.jpg",
    "/img/gallery/5.jpg",
    "/img/gallery/6.jpg"
  ];

  // Generar pétalos de rosas
  useEffect(() => {
    if (showInvitation) {
      const newPetals = [];
      for (let i = 0; i < 15; i++) {
        newPetals.push({
          id: i,
          left: Math.random() * 100,
          delay: Math.random() * 10,
          duration: 10 + Math.random() * 20,
          rotation: Math.random() * 360
        });
      }
      setPetals(newPetals);
    }
  }, [showInvitation]);

  // Cargar confirmaciones guardadas
  useEffect(() => {
    const savedConfirmations = localStorage.getItem('weddingConfirmations');
    if (savedConfirmations) {
      setConfirmationStatus(JSON.parse(savedConfirmations));
    }
  }, []);

  // Cambiar imágenes automáticamente
  useEffect(() => {
    if (showInvitation) {
      const interval = setInterval(() => {
        setCurrentImageIndex(prevIndex =>
          prevIndex === coupleImages.length - 1 ? 0 : prevIndex + 1
        );
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [showInvitation]);

  // Filtrar grupos de invitados
  const filteredGroups = invitadosData.grupos
    .map(grupo => ({
      ...grupo,
      invitados: grupo.invitados.filter(invitado =>
        invitado.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (invitado.relacion && invitado.relacion.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    }))
    .filter(grupo => grupo.invitados.length > 0);

  // Descargar invitación como imagen
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

  // Compartir por WhatsApp
  const handleShareWhatsApp = () => {
    const confirmationLink = `${window.location.origin}/invitados/confirmar?invitadoId=${selectedGuest.id}`;
    
    const message = `¡${selectedGuest.nombre}! 💌\n\n` +
      `Con todo nuestro cariño, queremos invitarte a celebrar nuestro amor el día más especial de nuestras vidas.\n\n` +
      `📅 ${eventData.fecha}\n` +
      `🕢 ${eventData.hora}\n` +
      `📍 ${eventData.lugar}\n` +
      `🗺️ ${eventData.direccion}\n\n` +
      `"${eventData.mensajeAmor}"\n\n` +
      `Por favor, confírmanos tu asistencia aquí: ${confirmationLink}\n` +
      `(Antes del ${eventData.confirmarAntesDe})\n\n` +
      `Con amor,\n${invitadosData.novios.novia} & ${invitadosData.novios.novio}`;
    
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank');
  };

  // Manejar confirmación de asistencia
  const handleConfirmationSubmit = (e) => {
    e.preventDefault();
    const newConfirmationStatus = {
      ...confirmationStatus,
      [selectedGuest.id]: {
        ...confirmationForm,
        confirmedAt: new Date().toISOString()
      }
    };
    setConfirmationStatus(newConfirmationStatus);
    localStorage.setItem('weddingConfirmations', JSON.stringify(newConfirmationStatus));
    alert('¡Gracias por confirmar tu asistencia!');
  };

  // Mensaje personalizado según relación
  const getPersonalizedMessage = (invitado) => {
    const defaultMsg = eventData.mensajeAmor;
    
    if (!invitado) return defaultMsg;
    
    if (invitado.relacion?.includes('Fam')) {
      return `${defaultMsg} Como parte de nuestra familia, tu presencia tiene un significado especial para nosotros.`;
    }
    
    if (invitado.relacion?.includes('Amig')) {
      return `${defaultMsg} Los momentos compartidos contigo han sido fundamentales en nuestra historia.`;
    }
    
    return defaultMsg;
  };

  // Navegación entre páginas
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

  return (
    <div className="invitaciones-page">
      <h1>Nuestra Boda</h1>
      <p className="subtitle">Una invitación llena de amor y momentos especiales</p>

      <div className="invitaciones-layout">
        {/* Panel de selección de invitados - columna izquierda */}
        <div className="guest-selection">
          <h2>Nuestros Invitados</h2>
          <div className="search-box">
            <input 
              type="text" 
              placeholder="Buscar invitado..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <i className="bi bi-search"></i>
          </div>

          <div className="guest-groups">
            {filteredGroups.map(grupo => (
              <div key={grupo.nombre} className="guest-group">
                <h3>{grupo.nombre}</h3>
                <ul>
                  {grupo.invitados.map(invitado => (
                    <motion.li 
                      key={invitado.id} 
                      className={`
                        ${selectedGuest?.id === invitado.id ? 'selected' : ''} 
                        ${confirmationStatus[invitado.id] ? 'confirmed' : ''}
                      `}
                      onClick={() => {
                        setSelectedGuest(invitado);
                        setCurrentPage(0);
                        setShowInvitation(false);
                      }}
                      whileHover={{ scale: 1.02 }}
                    >
                      {invitado.nombre}
                      {invitado.relacion && <span className="relation">{invitado.relacion}</span>}
                      {confirmationStatus[invitado.id] && (
                        <i className="bi bi-check-circle-fill confirmed-icon"></i>
                      )}
                    </motion.li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Contenedor principal de la invitación - columna derecha */}
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
                      {/* Página 1: Nuestra Historia */}
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
                      
                      {/* Página 2: Poema */}
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
                      
                      {/* Página 3: El Gran Día */}
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
                      
                      {/* Página 4: Sorpresa */}
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
                  {/* Invitación personalizada */}
                  <div 
                    ref={invitationRef} 
                    className="invitation-card baroque-design font-cinzel"
                  >
                    {/* Efectos decorativos */}
                    <div className="baroque-frame top"></div>
                    <div className="baroque-frame right"></div>
                    <div className="baroque-frame bottom"></div>
                    <div className="baroque-frame left"></div>
                    
                    {/* Pétalos de rosas animados */}
                    {petals.map(petal => (
                      <div 
                        key={petal.id}
                        className="rose-petal"
                        style={{
                          left: `${petal.left}%`,
                          animation: `falling linear ${petal.duration}s infinite`,
                          animationDelay: `${petal.delay}s`,
                          transform: `rotate(${petal.rotation}deg)`
                        }}
                      />
                    ))}
                    
                    {/* Efectos de velas */}
                    <div className="candle-effect top-left"></div>
                    <div className="candle-effect top-right"></div>
                    <div className="candle-effect bottom-left"></div>
                    <div className="candle-effect bottom-right"></div>
                    
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
                        <p>{getPersonalizedMessage(selectedGuest)}</p>
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

                      {/* Sección de Mapa */}
                      <div className="map-section">
                        <iframe 
                          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3144.565715665946!2d-57.5528239243376!3d-37.99877454236674!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzfCsDU5JzU1LjYiUyA1N8KwMzMnMDYuOSJX!5e0!3m2!1sen!2sar!4v1620000000000!5m2!1sen!2sar" 
                          allowFullScreen="" 
                          loading="lazy"
                        ></iframe>
                        <div className="map-overlay">
                          <a href={eventData.direccionGoogleMaps} target="_blank" rel="noopener noreferrer">
                            Ver en Google Maps
                          </a>
                        </div>
                      </div>

                      {/* Formulario de Confirmación */}
                      {!confirmationStatus[selectedGuest.id] ? (
                        <form className="confirmation-form" onSubmit={handleConfirmationSubmit}>
                          <h4>Confirmar Asistencia</h4>
                          
                          <div className="form-group">
                            <label>¿Asistirás a nuestra boda?</label>
                            <div className="radio-group">
                              <label>
                                <input 
                                  type="radio" 
                                  name="attending" 
                                  value="yes" 
                                  checked={confirmationForm.attending === 'yes'}
                                  onChange={() => setConfirmationForm({...confirmationForm, attending: 'yes'})}
                                />
                                Con gusto asistiré
                              </label>
                              <label>
                                <input 
                                  type="radio" 
                                  name="attending" 
                                  value="no"
                                  checked={confirmationForm.attending === 'no'}
                                  onChange={() => setConfirmationForm({...confirmationForm, attending: 'no'})}
                                />
                                Lamentablemente no podré asistir
                              </label>
                            </div>
                          </div>
                          
                          {confirmationForm.attending === 'yes' && (
                            <>
                              <div className="form-group">
                                <label>Número de acompañantes</label>
                                <select 
                                  value={confirmationForm.guests}
                                  onChange={(e) => setConfirmationForm({...confirmationForm, guests: e.target.value})}
                                >
                                  {[1, 2, 3, 4].map(num => (
                                    <option key={num} value={num}>{num} {num === 1 ? 'persona' : 'personas'}</option>
                                  ))}
                                </select>
                              </div>
                              
                              <div className="form-group">
                                <label>Preferencia de menú</label>
                                <select 
                                  value={confirmationForm.mealPreference}
                                  onChange={(e) => setConfirmationForm({...confirmationForm, mealPreference: e.target.value})}
                                >
                                  <option value="regular">Menú regular</option>
                                  <option value="vegetarian">Vegetariano</option>
                                  <option value="vegan">Vegano</option>
                                  <option value="glutenFree">Sin gluten</option>
                                </select>
                              </div>
                            </>
                          )}
                          
                          <div className="form-group">
                            <label>Mensaje para los novios (opcional)</label>
                            <input 
                              type="text" 
                              value={confirmationForm.message}
                              onChange={(e) => setConfirmationForm({...confirmationForm, message: e.target.value})}
                              placeholder="Escribe tu mensaje aquí..."
                            />
                          </div>
                          
                          <button type="submit">Confirmar Asistencia</button>
                        </form>
                      ) : (
                        <div className="confirmation-form">
                          <h4>¡Gracias por confirmar!</h4>
                          <p>Hemos registrado tu asistencia para el día del evento.</p>
                          <p>Detalles de tu confirmación:</p>
                          <ul>
                            <li>Asistentes: {confirmationStatus[selectedGuest.id].guests}</li>
                            {confirmationStatus[selectedGuest.id].mealPreference && (
                              <li>Menú: {confirmationStatus[selectedGuest.id].mealPreference}</li>
                            )}
                          </ul>
                        </div>
                      )}

                      {/* Sección de Itinerario */}
                      <div className="itinerary-section">
                        <h4>Itinerario del Día</h4>
                        <div className="timeline">
                          {eventData.itinerary.map((item, index) => (
                            <div key={index} className="timeline-item">
                              <div className="time">{item.time}</div>
                              <div className="event">{item.event}</div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Galería de Fotos */}
                      <div className="photo-gallery">
                        <h4>Nuestros Momentos</h4>
                        <p>Algunos de los recuerdos más especiales que hemos compartido</p>
                        <div className="gallery-grid">
                          {galleryImages.map((img, index) => (
                            <div key={index} className="gallery-item">
                              <img src={img} alt={`Momento ${index + 1}`} />
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Lista de Regalos */}
                      <div className="gift-section">
                        <h4>Lista de Regalos</h4>
                        <p>Tu presencia es nuestro mejor regalo, pero si deseas hacernos un obsequio, estas son algunas opciones:</p>
                        <div className="gift-options">
                          {eventData.giftStores.map((store, index) => (
                            <div key={index} className="gift-option">
                              <img src={store.logo} alt={store.name} />
                              <div className="store-name">{store.name}</div>
                              <a href={store.link} target="_blank" rel="noopener noreferrer">Ver lista</a>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="adults-only">
                        <i className="bi bi-balloon-heart"></i>
                        <span>Una celebración íntima para adultos</span>
                      </div>

                      <p className="rsvp">
                        <strong>Por favor confirma tu asistencia antes del {eventData.confirmarAntesDe}</strong><br />
                        <span className="contact-info">Contacto: {invitadosData.contacto || 'Fabiola y Alejandro'}</span>
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

                  {/* Acciones de la invitación */}
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
                      onClick={() => {
                        setShowInvitation(false);
                        setCurrentPage(0);
                      }}
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