import React, { useState, useEffect } from "react";
import "../assets/scss/_03-Componentes/_PPublicoContadorDias.scss";
import { FaWhatsapp, FaCog } from "react-icons/fa";

function PPublicoContadorDias() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    months: 0,
    weeks: 0
  });

  const [showWhatsappPanel, setShowWhatsappPanel] = useState(false);
  const [phoneNumbers] = useState([
    "5492235208386",
    "5492235455451"
  ]);

  const generateMessage = () => {
    return ` *¡Faltan solo ${timeLeft.days} días para la Boda!* 

${timeLeft.days > 30 ? ` ¡${timeLeft.months} meses! ` : ``}`;
  };

  const shareOnWhatsApp = (number = null) => {
    const message = generateMessage();
    const url = number 
      ? `https://wa.me/${number}?text=${encodeURIComponent(message)}`
      : `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  useEffect(() => {
    const createParticle = () => {
      const particle = document.createElement('div');
      particle.className = 'white-particle';
      
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
      
      document.querySelector('.baroque-clock-container')?.appendChild(particle);
      
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
    <section className="baroque-clock-container">
      <div className="background-image"></div>
      <div className="gold-frame"></div>
      
      <div className="clock-content">
        <h1 className="animated-title">Faltan</h1>
        
        <div className="main-counter">
          {Object.entries({
            days: timeLeft.days,
            hours: timeLeft.hours.toString().padStart(2, '0'),
            minutes: timeLeft.minutes.toString().padStart(2, '0'),
            seconds: timeLeft.seconds.toString().padStart(2, '0')
          }).map(([key, value]) => (
            <React.Fragment key={key}>
              <div className="time-block">
                <div className="time-value ornate-number">{value}</div>
                <div className="time-label">{key.charAt(0).toUpperCase() + key.slice(1)}</div>
              </div>
              {key !== 'seconds' && <div className="time-separator">:</div>}
            </React.Fragment>
          ))}
        </div>
        
        <div className="compact-info">
          <div className="additional-time">
            <span className="additional-value">{timeLeft.months}</span>
            <span className="additional-label">Meses</span>
          </div>
          
          <div className="additional-time">
            <span className="additional-value">{timeLeft.weeks}</span>
            <span className="additional-label">Semanas</span>
          </div>
          
          <div className="wedding-date">
            <span>23 / 11 / 2025 - 19:00 hs</span>
          </div>

          {/* Botón de WhatsApp integrado debajo de la fecha */}
          <div className="whatsapp-integrated-container">
            <button 
              className="whatsapp-integrated-button" 
              onClick={() => shareOnWhatsApp()}
            >
              Compartir cuenta regresiva<FaWhatsapp />
            </button>
          </div>
        </div>
      </div>
      
      <div className="baroque-decoration top-left"></div>
      <div className="baroque-decoration top-right"></div>
    </section>
  );
}

export default PPublicoContadorDias;