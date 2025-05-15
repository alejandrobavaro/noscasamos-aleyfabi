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

  // Calcula los días restantes exactos
  const calculateDaysLeft = () => {
    const weddingDate = new Date('2025-11-23T19:00:00-03:00');
    const now = new Date();
    const diff = weddingDate - now;
    return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
  };

  // Verifica si estamos en el día de la boda y actualiza el contador
  useEffect(() => {
    const checkIfLive = () => {
      const weddingDate = new Date('2025-11-23T19:00:00-03:00');
      const now = new Date();
      setDaysLeft(calculateDaysLeft());
      if (now >= weddingDate) setIsLive(true);
    };

    checkIfLive();
    const interval = setInterval(checkIfLive, 86400000); // Actualiza cada 24 horas
    
    return () => clearInterval(interval);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulación de envío (reemplazar con tu backend)
    console.log('Datos enviados:', formData);
    setFormSubmitted(true);
    setTimeout(() => setFormSubmitted(false), 5000);
  };

  return (
    <section className="live-stream-section">
      <h2 className="section-title">Mirá la fiesta en vivo aqui!</h2>
      <div className="stream-container">
        <div className="stream-info">
          <h3>Transmisión en vivo el día de la boda</h3>

          <p>Para aquellos que no puedan acompañarnos presencialmente,
            
           <span>podrán seguir la boda a través de nuestra transmisión en vivo. </span> </p>
          
          <div className="stream-details">
            <div className="detail-item">
              <span className="detail-icon">📅</span>
              <span>Domingo 23 de Noviembre de 2025</span>
            </div>
            <div className="detail-item">
              <span className="detail-icon">⏰</span>
              <span>19:00 hs (Hora Argentina)</span>
            </div>
            <div className="detail-item">
              <span className="detail-icon">📍</span>
              <span>Casa del Mar</span>
            </div>
          </div>
          
          <div className="PPublicoContadorDias-stream">
            {isLive ? (
              <p className="live-now">¡TRANSMITIENDO AHORA!</p>
            ) : (
              <p>Faltan <span>{daysLeft} días</span> para la transmisión</p>
            )}
          </div>
        </div>
        
        <div className="stream-placeholder">
          {isLive ? (
            <div className="live-stream-embed">
              {/* REEMPLAZAR CON TU CÓDIGO DE YOUTUBE */}
              <iframe 
                width="100%" 
                height="100%" 
                src="https://www.youtube.com/embed/TU_ID_DE_TRANSMISION" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
                title="Transmisión en vivo de la boda">
              </iframe>
            </div>
          ) : (
            <div className="placeholder-content">
              <div className="camera-icon">🎥</div>
              <p>El streaming estará disponible aquí el día del evento</p>
             
            </div>
          )}
        </div>
        
        {/* <div className="stream-reminder">
          {formSubmitted ? (
            <div className="form-success">
              <p>✅ ¡Recibimos tus datos! Te enviaremos el recordatorio.</p>
            </div>
          ) : (
            <>
              <h3>Ingresa tus datos y te enviaremos un recordatorio:</h3>
              <form onSubmit={handleSubmit} className="reminder-form">
                <div className="form-group">
                  <label htmlFor="nombre">Nombre completo:</label>
                  <input 
                    type="text" 
                    id="nombre" 
                    name="nombre" 
                    value={formData.nombre}
                    onChange={handleChange}
                    required 
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="email">Email:</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    value={formData.email}
                    onChange={handleChange}
                    required={formData.preferencia === 'email'}
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="whatsapp">WhatsApp:</label>
                  <input 
                    type="tel" 
                    id="whatsapp" 
                    name="whatsapp" 
                    value={formData.whatsapp}
                    onChange={handleChange}
                    placeholder="+54 9 11 1234-5678"
                    required={formData.preferencia === 'whatsapp'}
                  />
                </div>
                
                <div className="form-group radio-group">
                  <p>Preferencia de contacto:</p>
                  <label>
                    <input 
                      type="radio" 
                      name="preferencia" 
                      value="whatsapp"
                      checked={formData.preferencia === 'whatsapp'}
                      onChange={handleChange}
                    /> WhatsApp
                  </label>
                  <label>
                    <input 
                      type="radio" 
                      name="preferencia" 
                      value="email"
                      checked={formData.preferencia === 'email'}
                      onChange={handleChange}
                    /> Email
                  </label>
                </div>
                
                <button type="submit" className="submit-btn">
                  Recibir recordatorio
                </button>
              </form>
            </>
          )}
          
          {isLive && (
            <p className="live-notice">
              ¡Estamos en vivo ahora! Comparte este enlace: {window.location.href}
            </p>
          )}
        </div> */}
      </div>
    </section>
  );
}

export default PPublicoLiveStream;