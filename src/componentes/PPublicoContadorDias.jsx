import React, { useState, useEffect } from "react";
import "../assets/scss/_03-Componentes/_PPublicoContadorDias.scss";
import { FaWhatsapp } from "react-icons/fa";

function PPublicoContadorDias() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    months: 0,
    weeks: 0
  });

  const generateMessage = () => {
    return ` *¡Faltan solo ${timeLeft.days} días para la Boda!* 

${timeLeft.days > 30 ? ` ¡${timeLeft.months} meses! ` : ``}`;
  };

  const shareOnWhatsApp = () => {
    const message = generateMessage();
    const url = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  useEffect(() => {
    const createParticle = () => {
      const particle = document.createElement('div');
      particle.className = 'contador-particle';
      
      const xPos = Math.random() * 100;
      const delay = Math.random() * 3;
      const duration = 2 + Math.random() * 5;
      const size = 5 + Math.random() * 10;
      const opacity = 0.3 + Math.random() * 0.5;
      
      particle.style.left = `${xPos}%`;
      particle.style.animationDelay = `${delay}s`;
      particle.style.animationDuration = `${duration}s`;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.opacity = opacity;
      
      document.querySelector('.contador-container')?.appendChild(particle);
      
      setTimeout(() => {
        particle.remove();
      }, duration * 1000);
    };
    
    const particleInterval = setInterval(createParticle, 200);
    return () => clearInterval(particleInterval);
  }, []);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const weddingDate = new Date('2025-11-23T19:00:00-03:00');
      const now = new Date();
      const difference = weddingDate - now;

      if (difference > 0) {
        const totalDays = Math.floor(difference / (1000 * 60 * 60 * 24));
        const months = Math.floor(totalDays / 30.44);
        const weeks = Math.floor(totalDays / 7);
        
        setTimeLeft({
          days: totalDays,
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
          months,
          weeks
        });
      }
    };

    const timer = setInterval(calculateTimeLeft, 1000);
    calculateTimeLeft();

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="contador-container">
      <div className="contador-background"></div>
      <div className="contador-frame"></div>
      
      <div className="contador-content">
        <h1 className="contador-title">Faltan</h1>
        
        <div className="contador-principal">
          {Object.entries({
            days: timeLeft.days,
            hours: timeLeft.hours.toString().padStart(2, '0'),
            minutes: timeLeft.minutes.toString().padStart(2, '0'),
            seconds: timeLeft.seconds.toString().padStart(2, '0')
          }).map(([key, value]) => (
            <React.Fragment key={key}>
              <div className="contador-bloque">
                <div className="contador-valor">{value}</div>
                <div className="contador-etiqueta">{key.charAt(0).toUpperCase() + key.slice(1)}</div>
              </div>
              {key !== 'seconds' && <div className="contador-separador">:</div>}
            </React.Fragment>
          ))}
        </div>
        
        <div className="contador-info-adicional">
          <div className="contador-tiempo-adicional">
            <span className="contador-valor-adicional">{timeLeft.months}</span>
            <span className="contador-etiqueta-adicional">Meses</span>
          </div>
          
          <div className="contador-tiempo-adicional">
            <span className="contador-valor-adicional">{timeLeft.weeks}</span>
            <span className="contador-etiqueta-adicional">Semanas</span>
          </div>
          
          <div className="contador-fecha-boda">
            <span>23 / 11 / 2025 - 19:00 hs</span>
          </div>

          <div className="contador-boton-whatsapp">
            <button 
              className="boton-compartir" 
              onClick={shareOnWhatsApp}
              aria-label="Compartir cuenta regresiva por WhatsApp"
            >
              Compartir cuenta regresiva<FaWhatsapp className="icono-whatsapp" />
            </button>
          </div>
        </div>
      </div>
      
      <div className="contador-decoracion izquierda-superior"></div>
      <div className="contador-decoracion derecha-superior"></div>
    </section>
  );
}

export default PPublicoContadorDias;