import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import "../assets/scss/_03-Componentes/_PAcceso.scss";
import PPublico from './PPublico';

function PAcceso() {
  const [tipoAcceso, setTipoAcceso] = useState(null);
  const [clave, setClave] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleAcceso = (tipo) => {
    if (tipo === 'publico') {
      navigate('/inicio');
      return;
    }
    setTipoAcceso(tipo);
    setClave('');
    setError('');
  };

  const verificarClave = () => {
    const credenciales = {
      invitado: { clave: 'invitado', ruta: '/invitados' },
      organizacion: { clave: 'aleyfabi', ruta: '/organizacion' }
    };

    if (clave === credenciales[tipoAcceso]?.clave) {
      login(tipoAcceso);
      navigate(credenciales[tipoAcceso].ruta);
    } else {
      setError('Clave incorrecta. Por favor intenta nuevamente.');
      setTimeout(() => setError(''), 3000);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') verificarClave();
  };

  return (
    <div className="pantalla-acceso">
      <div className="contenedor-acceso">
        {!tipoAcceso ? (
          <div className="opciones-acceso">
       
            
            <div className="tarjetas-acceso">
              {[
                { 
                  tipo: 'invitado', 
                  icono: 'bi-envelope-fill', 
                  titulo: 'Área Invitados', 
                  subtitulo: 'Acceso con clave o QR',
                  clase: 'invitado'
                },
                { 
                  tipo: 'organizacion', 
                  icono: 'bi-lock-fill', 
                  titulo: 'Organización', 
                  subtitulo: 'Acceso exclusivo novios',
                  clase: 'organizacion'
                }
              ].map((opcion) => (
                <div 
                  key={opcion.tipo}
                  className={`tarjeta tarjeta-${opcion.clase}`}
                  onClick={() => handleAcceso(opcion.tipo)}
                >
                  <div className="icono-container">
                    <i className={`bi ${opcion.icono}`}></i>
                  </div>
                  <h4>{opcion.titulo}</h4>
                  <p>{opcion.subtitulo}</p>
                  <div className="decoracion-tarjeta"></div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="formulario-clave">
            <div className="form-header">
              <button 
                className="btn-volver" 
                onClick={() => handleAcceso(null)}
              >
                <i className="bi bi-arrow-left"></i>
              </button>
              <h2>Acceso {tipoAcceso === 'invitado' ? 'Invitados' : 'Organización'}</h2>
            </div>
            
            <p className="instrucciones">
              {tipoAcceso === 'invitado' 
                ? 'Ingresa la clave que recibiste en tu invitación' 
                : 'Ingresa la clave de acceso privada'}
            </p>
            
            <div className="input-group">
              <input
                type="password"
                value={clave}
                onChange={(e) => setClave(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Introduce la clave"
                autoFocus
                className={error ? 'input-error' : ''}
              />
              <button onClick={verificarClave} className="btn-verificar">
                <i className="bi bi-arrow-right"></i>
              </button>
            </div>
            
            {error && <p className="error-message">{error}</p>}
          </div>
        )}
      </div>
<div>
      {/* Sección de Nuestra Historia integrada */}
      {!tipoAcceso && <PPublico />}</div>
    </div>
  );
}

export default PAcceso;