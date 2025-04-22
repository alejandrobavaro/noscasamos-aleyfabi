import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import "../assets/scss/_03-Componentes/_PantallaAcceso.scss";

function PantallaAcceso() {
  const [tipoAcceso, setTipoAcceso] = useState(null);
  const [clave, setClave] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleAccesoPublico = () => {
    navigate('/inicio');
  };

  const verificarClave = () => {
    if (tipoAcceso === 'invitado' && clave === 'invitado') {
      login('invitado');
      navigate('/invitados');
    } else if (tipoAcceso === 'organizacion' && clave === 'aleyfabi') {
      login('organizacion');
      navigate('/organizacion');
    } else {
      setError('Clave incorrecta. Intenta nuevamente.');
      setTimeout(() => setError(''), 3000);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      verificarClave();
    }
  };

  return (
    <div className="pantalla-acceso">
      <div className="fondo-romantico"></div>
      
      <div className="contenido-acceso compacto">
        {!tipoAcceso ? (
          <div className="opciones-acceso">
            <div className="tarjetas-acceso">
              <div 
                className="tarjeta tarjeta-publico" 
                onClick={handleAccesoPublico}
                aria-label="Acceso público"
              >
                <div className="icono-container">
                  <i className="bi bi-heart-fill"></i>
                </div>
                <h3>Conoce nuestra historia</h3>
                <p>Acceso público</p>
              </div>
              
              <div 
                className="tarjeta tarjeta-invitado" 
                onClick={() => setTipoAcceso('invitado')}
                aria-label="Acceso para invitados"
              >
                <div className="icono-container">
                  <i className="bi bi-envelope-fill"></i>
                </div>
                <h3>Soy Invitado</h3>
                <p>Acceso con clave</p>
              </div>
              
              <div 
                className="tarjeta tarjeta-organizacion" 
                onClick={() => setTipoAcceso('organizacion')}
                aria-label="Acceso para organización"
              >
                <div className="icono-container">
                  <i className="bi bi-lock-fill"></i>
                </div>
                <h3>Organización</h3>
                <p>Acceso para los novios</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="formulario-clave compacto">
            <h2>Acceso de {tipoAcceso === 'invitado' ? 'Invitados' : 'Organización'}</h2>
            <div className="input-group">
              <input
                type="password"
                value={clave}
                onChange={(e) => setClave(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Introduce la clave"
                className="input-clave"
                autoFocus
              />
              <button onClick={verificarClave} className="boton-acceder">
                <i className="bi bi-arrow-right"></i>
              </button>
            </div>
            {error && <p className="mensaje-error">{error}</p>}
            <button 
              className="boton-volver" 
              onClick={() => {
                setTipoAcceso(null);
                setClave('');
                setError('');
              }}
            >
              <i className="bi bi-arrow-left"></i> Volver
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default PantallaAcceso;