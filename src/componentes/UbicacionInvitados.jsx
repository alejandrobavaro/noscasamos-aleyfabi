import React from 'react';
"../assets/scss/_03-Componentes/_UbicacionInvitados.scss";

function UbicacionInvitados() {
  return (
    <div className="ubicacion-invitados">
      <h1>Ubicación del Evento</h1>
      
      <div className="informacion-ubicacion">
        <div className="detalles">
          <h2>Casa del Mar</h2>
          <p className="direccion">
            <i className="bi bi-geo-alt-fill"></i>
            Villa García Uriburu, Buenos Aires, Argentina
          </p>
          
          <div className="info-horario">
            <div className="horario">
              <h3>Ceremonia</h3>
              <p>20:00 hs</p>
            </div>
            <div className="horario">
              <h3>Recepción</h3>
              <p>21:00 a 04:00 hs</p>
            </div>
          </div>
          
          <div className="como-llegar">
            <h3>Cómo llegar</h3>
            <p>La Casa del Mar se encuentra a 15 minutos del centro de la ciudad. Hay estacionamiento disponible para todos los invitados.</p>
            
            <div className="opciones-transporte">
              <div className="transporte">
                <i className="bi bi-car-front-fill"></i>
                <span>En auto</span>
              </div>
              <div className="transporte">
                <i className="bi bi-taxi-front"></i>
                <span>Taxi/Remis</span>
              </div>
              <div className="transporte">
                <i className="bi bi-bus-front"></i>
                <span>Transporte contratado</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mapa">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3284.0168878895286!2d-58.383759999999996!3d-34.6037349!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bccacf425a4a1f%3A0x7e7e6a3e1a0e3e1f!2sCasa%20del%20Mar!5e0!3m2!1sen!2sar!4v1620000000000!5m2!1sen!2sar" 
            width="100%" 
            height="100%" 
            style={{border:0}} 
            allowFullScreen="" 
            loading="lazy"
            title="Mapa de ubicación"
          ></iframe>
        </div>
      </div>
      
      <div className="notas-importantes">
        <h3>Notas importantes</h3>
        <ul>
          <li>Por favor confirmar asistencia antes del 1 de Noviembre</li>
          <li>Dress code: Elegante soirée (tonos tierra y vino sugeridos)</li>
          <li>Habrá transporte de regreso al centro a las 2:00 y 4:00 hs</li>
        </ul>
      </div>
    </div>
  );
}

export default UbicacionInvitados;