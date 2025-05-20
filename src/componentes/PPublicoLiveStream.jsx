import React, { useState, useEffect } from 'react';
import "../assets/scss/_03-Componentes/_PPublicoLiveStream.scss";

function PPublicoLiveStream() {
  const [isLive, setIsLive] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    whatsapp: '',
    preferencia: 'whatsapp'
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [daysLeft, setDaysLeft] = useState(0);

  const calculateDaysLeft = () => {
    const weddingDate = new Date('2025-11-23T19:00:00-03:00');
    const now = new Date();
    const diff = weddingDate - now;
    return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
  };

  useEffect(() => {
    const checkIfLive = () => {
      const weddingDate = new Date('2025-11-23T19:00:00-03:00');
      const now = new Date();
      setDaysLeft(calculateDaysLeft());
      if (now >= weddingDate) setIsLive(true);
    };

    checkIfLive();
    const interval = setInterval(checkIfLive, 86400000);
    
    return () => clearInterval(interval);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Datos enviados:', formData);
    setFormSubmitted(true);
    setTimeout(() => setFormSubmitted(false), 5000);
  };

  return (
    <div className="live-stream-container">
      <div className="stream-header">
        <h2>Transmisión en Vivo</h2>
        <p>Sigue nuestra boda desde cualquier lugar</p>
      </div>
      
      <div className="stream-status">
        {isLive ? (
          <div className="live-indicator">
            <span className="live-dot"></span>
            <span>EN VIVO AHORA</span>
          </div>
        ) : (
          <div className="countdown">
            Faltan <span>{daysLeft} días</span> para la transmisión
          </div>
        )}
      </div>
      
      <div className="stream-display">
        {isLive ? (
          <div className="video-container">
            <iframe 
              src="https://www.youtube.com/embed/TU_ID_DE_TRANSMISION"
              title="Transmisión en vivo de la boda"
              allowFullScreen
            ></iframe>
          </div>
        ) : (
          <div className="stream-placeholder">
            <div className="placeholder-icon">🎥</div>
            <p>El streaming estará disponible aquí el día del evento</p>
          </div>
        )}
      </div>
      
      <div className="event-info">
        <div className="info-item">
          <span className="info-icon">📅</span>
          <span>23 de Noviembre 2025</span>
        </div>
        <div className="info-item">
          <span className="info-icon">⏰</span>
          <span>19:00 hs (Argentina)</span>
        </div>
        <div className="info-item">
          <span className="info-icon">📍</span>
          <span>Casa del Mar, Buenos Aires</span>
        </div>
      </div>
      
      <div className="reminder-section">
        <h3>Recibir recordatorio</h3>
        {formSubmitted ? (
          <div className="success-message">
            <p>✅ ¡Recibimos tus datos! Te avisaremos antes del evento.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="reminder-form">
            <div className="form-group">
              <input 
                type="text" 
                placeholder="Tu nombre completo"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <input 
                type="email" 
                placeholder="Tu email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required={formData.preferencia === 'email'}
              />
            </div>
            
            <div className="form-group">
              <input 
                type="tel" 
                placeholder="Número de WhatsApp"
                name="whatsapp"
                value={formData.whatsapp}
                onChange={handleChange}
                required={formData.preferencia === 'whatsapp'}
              />
            </div>
            
            <div className="radio-options">
              <label className="radio-label">
                <input 
                  type="radio" 
                  name="preferencia" 
                  value="whatsapp"
                  checked={formData.preferencia === 'whatsapp'}
                  onChange={handleChange}
                />
                <span className="radio-custom"></span>
                <span>Recibir por WhatsApp</span>
              </label>
              <label className="radio-label">
                <input 
                  type="radio" 
                  name="preferencia" 
                  value="email"
                  checked={formData.preferencia === 'email'}
                  onChange={handleChange}
                />
                <span className="radio-custom"></span>
                <span>Recibir por Email</span>
              </label>
            </div>
            
            <button type="submit" className="submit-button">
              Quiero recibir el recordatorio
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default PPublicoLiveStream;