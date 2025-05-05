import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import '../assets/scss/_03-Componentes/_PinvitadosConfirmAsist.scss';

const PinvitadosConfirmAsist = ({ invitadosData = { grupos: [], novios: {} } }) => {
  const [invitado, setInvitado] = useState(null);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [guestData, setGuestData] = useState(null);
  const [additionalGuests, setAdditionalGuests] = useState(0);
  const [dietaryRestrictions, setDietaryRestrictions] = useState('');
  const [message, setMessage] = useState('');
  const [attendance, setAttendance] = useState('yes');
  const { search } = useLocation();
  const navigate = useNavigate();

  // Datos seguros con valores por defecto
  const safeInvitadosData = {
    grupos: invitadosData.grupos || [],
    novios: {
      novia: invitadosData.novios?.novia || 'Novia',
      novio: invitadosData.novios?.novio || 'Novio'
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(search);
    const invitadoId = params.get('invitadoId');
    
    if (invitadoId) {
      // Simulamos la carga de datos (en una app real sería una API)
      setTimeout(() => {
        const allInvitados = safeInvitadosData.grupos.flatMap(g => g.invitados || []);
        const foundInvitado = allInvitados.find(i => i.id === parseInt(invitadoId));
        
        if (foundInvitado) {
          setInvitado(foundInvitado);
          
          // Verificar confirmación previa en localStorage
          const savedConfirmations = localStorage.getItem('weddingConfirmations');
          if (savedConfirmations) {
            const confirmations = JSON.parse(savedConfirmations);
            const guestConfirmation = confirmations[invitadoId];
            
            if (guestConfirmation) {
              setIsConfirmed(true);
              setAdditionalGuests(guestConfirmation.additionalGuests || 0);
              setDietaryRestrictions(guestConfirmation.dietaryRestrictions || '');
              setMessage(guestConfirmation.message || '');
              setAttendance(guestConfirmation.attendance || 'yes');
            }
          }
        }
        
        setIsLoading(false);
      }, 800);
    } else {
      setIsLoading(false);
    }
  }, [search, safeInvitadosData.grupos]);

  const handleConfirm = () => {
    if (!invitado) return;
    
    // Guardar confirmación en localStorage
    const savedConfirmations = localStorage.getItem('weddingConfirmations');
    const confirmations = savedConfirmations ? JSON.parse(savedConfirmations) : {};
    
    confirmations[invitado.id] = {
      confirmed: true,
      date: new Date().toISOString(),
      attendance,
      additionalGuests: attendance === 'yes' ? additionalGuests : 0,
      dietaryRestrictions,
      message
    };
    
    localStorage.setItem('weddingConfirmations', JSON.stringify(confirmations));
    setIsConfirmed(true);
    
    // Aquí podrías agregar el envío a una API real
    console.log('Confirmación enviada:', confirmations[invitado.id]);
  };

  if (isLoading) {
    return (
      <div className="loading-container">
        <motion.i 
          className="bi bi-hearts"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 2 }}
        />
        <p>Cargando tu invitación...</p>
      </div>
    );
  }

  if (!invitado) {
    return (
      <div className="error-container">
        <i className="bi bi-exclamation-triangle"></i>
        <h3>No se encontró información del invitado</h3>
        <p>Por favor verifica que el enlace sea correcto o selecciona tu nombre desde la lista de invitados.</p>
        <button 
          onClick={() => navigate('/invitados')} 
          className="back-button"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <i className="bi bi-arrow-left"></i> Volver a la lista de invitados
        </button>
      </div>
    );
  }

  return (
    <div className="confirmacion-container">
      <div className="confirmation-header">
        <h2>Confirmación de Asistencia</h2>
        <p className="subtitle">Para la boda de {safeInvitadosData.novios.novia} & {safeInvitadosData.novios.novio}</p>
      </div>
      
      {isConfirmed ? (
        <motion.div 
          className="confirmed-message"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="confirmation-icon">
            <motion.i 
              className="bi bi-check-circle"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
            />
          </div>
          
          <h3>¡Gracias por confirmar, {invitado.nombre}!</h3>
          
          {attendance === 'yes' ? (
            <>
              <p className="confirmation-text">
                Hemos registrado tu asistencia para nuestra boda.
              </p>
              {additionalGuests > 0 && (
                <p className="additional-info">
                  <i className="bi bi-people-fill"></i> Has confirmado asistencia para {additionalGuests + 1} personas.
                </p>
              )}
              {dietaryRestrictions && (
                <p className="additional-info">
                  <i className="bi bi-egg-fried"></i> Hemos tomado nota de tus restricciones dietéticas.
                </p>
              )}
            </>
          ) : (
            <p className="confirmation-text">
              Lamentamos que no puedas asistir, pero agradecemos que nos hayas informado.
            </p>
          )}
          
          {message && (
            <div className="guest-message">
              <p className="message-label">Tu mensaje:</p>
              <p className="message-content">"{message}"</p>
            </div>
          )}
          
          <div className="confirmation-details">
            <h4>Detalles del evento</h4>
            <p><i className="bi bi-calendar-heart"></i> Sábado, 23 de Noviembre de 2024</p>
            <p><i className="bi bi-clock"></i> 19:30 horas</p>
            <p><i className="bi bi-geo-alt"></i> La Casa del Mar</p>
            <p><i className="bi bi-pin-map"></i> Av. Costera 1234, Mar del Plata</p>
            <p><i className="bi bi-suit-heart"></i> Código de vestimenta: Elegante</p>
          </div>
          
          <motion.button 
            onClick={() => navigate('/invitados')}
            className="back-button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <i className="bi bi-envelope-heart"></i> Ver mi invitación
          </motion.button>
        </motion.div>
      ) : (
        <motion.div 
          className="confirmation-form"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="guest-info">
            <h3>Hola {invitado.nombre}</h3>
            <p>Por favor confirma tu asistencia a nuestra boda</p>
          </div>
          
          <div className="form-group">
            <label>¿Asistirás a la boda?</label>
            <div className="radio-group">
              <label className={attendance === 'yes' ? 'selected' : ''}>
                <input 
                  type="radio" 
                  name="attendance" 
                  value="yes" 
                  checked={attendance === 'yes'}
                  onChange={() => setAttendance('yes')} 
                />
                <span><i className="bi bi-check-circle"></i> ¡Sí, con mucho gusto!</span>
              </label>
              <label className={attendance === 'no' ? 'selected' : ''}>
                <input 
                  type="radio" 
                  name="attendance" 
                  value="no" 
                  checked={attendance === 'no'}
                  onChange={() => setAttendance('no')} 
                />
                <span><i className="bi bi-x-circle"></i> Lo siento, no podré asistir</span>
              </label>
            </div>
          </div>
          
          {attendance === 'yes' && (
            <>
              <div className="form-group">
                <label>¿Vendrás acompañado? (Incluyéndote a ti)</label>
                <select 
                  value={additionalGuests} 
                  onChange={(e) => setAdditionalGuests(parseInt(e.target.value))}
                  className="styled-select"
                >
                  {[1, 2, 3, 4, 5].map(num => (
                    <option key={num} value={num - 1}>
                      {num} persona{num !== 1 ? 's' : ''}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="form-group">
                <label>Restricciones dietéticas (opcional)</label>
                <textarea 
                  placeholder="Ej: Vegetariano, alergia a mariscos, etc."
                  value={dietaryRestrictions}
                  onChange={(e) => setDietaryRestrictions(e.target.value)}
                  rows="3"
                />
              </div>
            </>
          )}
          
          <div className="form-group">
            <label>Mensaje para los novios (opcional)</label>
            <textarea 
              placeholder="Escribe un mensaje especial..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows="4"
            />
          </div>
          
          <motion.button 
            onClick={handleConfirm}
            className="confirm-button"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <i className="bi bi-envelope-check"></i> Confirmar Asistencia
          </motion.button>
        </motion.div>
      )}
    </div>
  );
};

PinvitadosConfirmAsist.propTypes = {
  invitadosData: PropTypes.shape({
    grupos: PropTypes.arrayOf(
      PropTypes.shape({
        nombre: PropTypes.string,
        invitados: PropTypes.arrayOf(
          PropTypes.shape({
            id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
            nombre: PropTypes.string,
            relacion: PropTypes.string,
            email: PropTypes.string
          })
        )
      })
    ),
    novios: PropTypes.shape({
      novia: PropTypes.string,
      novio: PropTypes.string
    })
  })
};

PinvitadosConfirmAsist.defaultProps = {
  invitadosData: {
    grupos: [],
    novios: {
      novia: 'Novia',
      novio: 'Novio'
    }
  }
};

export default PinvitadosConfirmAsist;