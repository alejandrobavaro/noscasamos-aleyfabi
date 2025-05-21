import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import '../assets/scss/_03-Componentes/_PinvitadosConfirmAsist.scss';

const PinvitadosConfirmAsist = () => {
  const { invitadoId } = useParams();
  const navigate = useNavigate();
  
  // Estados del componente
  const [invitado, setInvitado] = useState(null);
  const [invitadosData, setInvitadosData] = useState(null);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    attendance: 'yes',
    additionalGuests: 0,
    dietaryRestrictions: '',
    message: ''
  });
  const [errors, setErrors] = useState({});

  // Cargar datos del JSON
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/invitados.json');
        if (!response.ok) throw new Error('Error al cargar datos');
        const data = await response.json();
        setInvitadosData(data);
        
        // Buscar invitado
        let invitadoEncontrado = null;
        let nombreGrupo = '';
        
        for (const grupo of data.grupos) {
          invitadoEncontrado = grupo.invitados.find(i => i.id.toString() === invitadoId.toString());
          if (invitadoEncontrado) {
            nombreGrupo = grupo.nombre;
            break;
          }
        }

        if (invitadoEncontrado) {
          setInvitado({
            ...invitadoEncontrado,
            grupoNombre: nombreGrupo
          });
          checkExistingConfirmation(invitadoEncontrado.id);
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [invitadoId]);

  const checkExistingConfirmation = (id) => {
    const confirmacionesGuardadas = localStorage.getItem('weddingConfirmations');
    if (confirmacionesGuardadas) {
      try {
        const confirmaciones = JSON.parse(confirmacionesGuardadas);
        const confirmacionExistente = confirmaciones[id];
        
        if (confirmacionExistente) {
          setIsConfirmed(true);
          setFormData({
            attendance: confirmacionExistente.attendance || 'yes',
            additionalGuests: confirmacionExistente.additionalGuests || 0,
            dietaryRestrictions: confirmacionExistente.dietaryRestrictions || '',
            message: confirmacionExistente.message || ''
          });
        }
      } catch (error) {
        console.error('Error al leer confirmaciones:', error);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'additionalGuests' ? parseInt(value) || 0 : value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (formData.attendance === 'yes' && 
        (isNaN(formData.additionalGuests) || formData.additionalGuests < 0)) {
      newErrors.additionalGuests = 'Número de acompañantes no válido';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleConfirm = () => {
    if (!validateForm() || !invitado) return;
    
    try {
      const confirmacionesGuardadas = localStorage.getItem('weddingConfirmations');
      const confirmaciones = confirmacionesGuardadas ? JSON.parse(confirmacionesGuardadas) : {};
      
      confirmaciones[invitado.id] = {
        confirmed: true,
        date: new Date().toISOString(),
        ...formData,
        additionalGuests: formData.attendance === 'yes' ? formData.additionalGuests : 0
      };
      
      localStorage.setItem('weddingConfirmations', JSON.stringify(confirmaciones));
      setIsConfirmed(true);
    } catch (error) {
      console.error('Error al guardar:', error);
    }
  };

  // Vista de carga
  if (isLoading) {
    return (
      <div className="confirmacion-loading">
        <motion.i 
          className="bi bi-hearts"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 2 }}
        />
        <p>Cargando tu invitación...</p>
      </div>
    );
  }

  // Vista de error si no encuentra invitado
  if (!invitado) {
    return (
      <div className="confirmacion-error">
        <i className="bi bi-exclamation-triangle"></i>
        <h3>No se encontró información del invitado</h3>
        <p>Por favor verifica que el enlace sea correcto o contacta a los novios.</p>
        <motion.button 
          onClick={() => navigate('/invitados')} 
          className="confirmacion-back-button"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <i className="bi bi-arrow-left"></i> Volver
        </motion.button>
      </div>
    );
  }

  // Vista principal
  return (
    <div className="confirmacion-wrapper">
      <div className="confirmacion-content">
        <header className="confirmacion-header">
          <h1>Confirmación de Asistencia</h1>
          <p>Para la boda de {invitadosData.novios.novia} & {invitadosData.novios.novio}</p>
        </header>
        
        {isConfirmed ? (
          <div className="confirmacion-success">
            <div className="success-icon">
              <motion.i 
                className="bi bi-check-circle"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring' }}
              />
            </div>
            
            <h2>¡Gracias por confirmar, {invitado.nombre}!</h2>
            
            {formData.attendance === 'yes' ? (
              <>
                <p className="success-message">
                  Hemos registrado tu asistencia para nuestra boda.
                </p>
                {formData.additionalGuests > 0 && (
                  <p className="success-detail">
                    <i className="bi bi-people-fill"></i> Has confirmado asistencia para {formData.additionalGuests + 1} personas.
                  </p>
                )}
                {formData.dietaryRestrictions && (
                  <p className="success-detail">
                    <i className="bi bi-egg-fried"></i> Hemos tomado nota de tus restricciones dietéticas.
                  </p>
                )}
              </>
            ) : (
              <p className="success-message">
                Lamentamos que no puedas asistir, pero agradecemos que nos hayas informado.
              </p>
            )}
            
            {formData.message && (
              <div className="success-note">
                <p>Tu mensaje:</p>
                <p className="note-content">"{formData.message}"</p>
              </div>
            )}
            
            <div className="event-details">
              <h3>Detalles del evento</h3>
              <p><i className="bi bi-calendar-heart"></i> Sábado, 23 de Noviembre de 2024</p>
              <p><i className="bi bi-clock"></i> 19:30 horas</p>
              <p><i className="bi bi-geo-alt"></i> La Casa del Mar</p>
              <p><i className="bi bi-pin-map"></i> Av. Costera 1234, Mar del Plata</p>
              <p><i className="bi bi-suit-heart"></i> Código de vestimenta: Elegante</p>
            </div>
            
            <motion.button 
              onClick={() => navigate('/invitados')}
              className="confirmacion-button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <i className="bi bi-envelope-heart"></i> Ver mi invitación
            </motion.button>
          </div>
        ) : (
          <div className="confirmacion-form">
            <div className="form-header">
              <h2>Hola {invitado.nombre}</h2>
              {invitado.grupoNombre && <p className="form-group-name">Grupo: {invitado.grupoNombre}</p>}
              <p>Por favor confirma tu asistencia a nuestra boda</p>
            </div>
            
            <div className="form-field">
              <label>¿Asistirás a la boda?</label>
              <div className="radio-options">
                <label className={formData.attendance === 'yes' ? 'selected' : ''}>
                  <input 
                    type="radio" 
                    name="attendance" 
                    value="yes" 
                    checked={formData.attendance === 'yes'}
                    onChange={handleChange} 
                  />
                  <span><i className="bi bi-check-circle"></i> ¡Sí, asistiré!</span>
                </label>
                <label className={formData.attendance === 'no' ? 'selected' : ''}>
                  <input 
                    type="radio" 
                    name="attendance" 
                    value="no" 
                    checked={formData.attendance === 'no'}
                    onChange={handleChange} 
                  />
                  <span><i className="bi bi-x-circle"></i> No podré asistir</span>
                </label>
              </div>
            </div>
            
            {formData.attendance === 'yes' && (
              <>
                <div className="form-field">
                  <label>¿Vendrás acompañado? (Incluyéndote a ti)</label>
                  <select 
                    name="additionalGuests"
                    value={formData.additionalGuests} 
                    onChange={handleChange}
                    className={errors.additionalGuests ? 'error' : ''}
                  >
                    {[1, 2, 3, 4, 5].map(num => (
                      <option key={num} value={num - 1}>
                        {num} persona{num !== 1 ? 's' : ''}
                      </option>
                    ))}
                  </select>
                  {errors.additionalGuests && (
                    <p className="field-error">{errors.additionalGuests}</p>
                  )}
                </div>
                
                <div className="form-field">
                  <label>Restricciones dietéticas (opcional)</label>
                  <textarea 
                    name="dietaryRestrictions"
                    placeholder="Ej: Vegetariano, alergia a mariscos, etc."
                    value={formData.dietaryRestrictions}
                    onChange={handleChange}
                    rows="3"
                  />
                </div>
              </>
            )}
            
            <div className="form-field">
              <label>Mensaje para los novios (opcional)</label>
              <textarea 
                name="message"
                placeholder="Escribe un mensaje especial..."
                value={formData.message}
                onChange={handleChange}
                rows="4"
              />
            </div>
            
            <motion.button 
              onClick={handleConfirm}
              className="confirmacion-button primary"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <i className="bi bi-envelope-check"></i> Confirmar Asistencia
            </motion.button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PinvitadosConfirmAsist;