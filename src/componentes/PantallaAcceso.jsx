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

  const handleAcceso = (tipo) => {
    if (tipo === 'publico') return navigate('/inicio');
    setTipoAcceso(tipo);
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
      setError('Clave incorrecta');
      setTimeout(() => setError(''), 3000);
    }
  };

  const handleKeyPress = (e) => e.key === 'Enter' && verificarClave();

  return (
    <div className="pantalla-acceso">
      <div className="contenedor-acceso">
        <h4>Bienvenidos a Nuestra Boda</h4>
        
        {!tipoAcceso ? (
          <div className="opciones-acceso">
            {[
              { tipo: 'publico', icono: 'heart-fill', titulo: 'Nuestra historia', subtitulo: 'Acceso público' },
              { tipo: 'invitado', icono: 'envelope-fill', titulo: 'Invitado', subtitulo: 'Acceso con clave - Qr' },
              { tipo: 'organizacion', icono: 'lock-fill', titulo: 'Organización', subtitulo: 'Acceso novios' }
            ].map((opcion) => (
              <div 
                key={opcion.tipo}
                className={`tarjeta tarjeta-${opcion.tipo}`}
                onClick={() => handleAcceso(opcion.tipo)}
                aria-label={`Acceso ${opcion.tipo}`}
              >
                <div className="icono-container">
                  <i className={`bi bi-${opcion.icono}`}></i>
                </div>
                <h3>{opcion.titulo}</h3>
                <p>{opcion.subtitulo}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="formulario-clave">
            <h2>Acceso {tipoAcceso === 'invitado' ? 'Invitados' : 'Organización'}</h2>
            <div className="input-group">
              <input
                type="password"
                value={clave}
                onChange={(e) => setClave(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Introduce la clave"
                autoFocus
              />
              <button onClick={verificarClave}>
                <i className="bi bi-arrow-right"></i>
              </button>
            </div>
            {error && <p className="error">{error}</p>}
            <button 
              className="volver" 
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