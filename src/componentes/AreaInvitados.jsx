import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "../assets/scss/_03-Componentes/_AreaInvitados.scss";

function AreaInvitados() {
  const navigate = useNavigate();

  useEffect(() => {
    // Efecto de inicialización
    const timer = setTimeout(() => {
      document.querySelector('.area-invitados').classList.add('loaded');
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="area-invitados">
      <div className="fondo-romantico"></div>
      
      <div className="bienvenida-invitados">
        <h1>Bienvenidos a Nuestra Boda</h1>
        <p className="frase-amor">"El amor no mira con los ojos, sino con el alma" - Shakespeare</p>
        <div className="separador-floral"></div>
        <p className="mensaje-bienvenida">Alejandro & Fabiola<br />Tienen el honor de compartir este día especial contigo</p>
      </div>
      
      <div className="opciones-invitados">
        <div 
          className="opcion opcion-confirmar" 
          onClick={() => navigate('/invitados/confirmar')}
        >
          <div className="icono-container">
            <i className="bi bi-check-circle-fill"></i>
          </div>
          <h3>Confirmar Asistencia</h3>
          <p>Por favor confirma tu presencia antes del 1 de Noviembre</p>
          <div className="decoracion-opcion"></div>
        </div>
        
        <div 
          className="opcion opcion-ubicacion" 
          onClick={() => navigate('/invitados/ubicacion')}
        >
          <div className="icono-container">
            <i className="bi bi-geo-alt-fill"></i>
          </div>
          <h3>Ubicación</h3>
          <p>Información sobre el lugar y cómo llegar</p>
          <div className="decoracion-opcion"></div>
        </div>
        
        <div className="opcion" onClick={() => navigate('/invitados/dresscode')}>
  <i className="bi bi-gift-fill"></i>
  <h3>Dress Code</h3>
  <p>Elegante soirée - Colores sugeridos: tonos tierra y vino</p>
</div>
        
        <div className="opcion" onClick={() => navigate('/invitados/itinerario')}>
  <i className="bi bi-clock-fill"></i>
  <h3>Itinerario</h3>
  <p>Ceremonia: 20:00 hs - Recepción hasta las 4:00 am</p>
</div>

      </div>
      
      <div className="hashtag-boda">
        <p className="comparte-fotos">Compartí tus fotos usando</p>
        <h2 className="hashtag">#BodaAlejandroYFabiola</h2>
        <div className="corazon-animado">❤️</div>
      </div>
    </div>
  );
}

export default AreaInvitados;