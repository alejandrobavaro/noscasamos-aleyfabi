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

  // Función para compartir por WhatsApp
  const shareOnWhatsApp = () => {
    const weddingEmojis = ["💍", "💒", "👰", "🤵", "🎉", "🥂", "💐", "✨"];
    const randomEmoji = weddingEmojis[Math.floor(Math.random() * weddingEmojis.length)];
    
    const message = `¡Faltan solo *${timeLeft.days} días* para la Boda de Ale y Fabi!

${timeLeft.days > 30 ? 
  ` Solo ${timeLeft.months} meses!!` : 

  ` ¡Ya falta menos!`}

 *Fecha:* Domingo 23 de Noviembre 2025
 *Hora:* 19:00 hs
 *Lugar:* Casa del Mar (Villa García Uriburu)
`;

    // Si quieres incluir una imagen (asegúrate de tener los derechos)
    // const imageUrl = "https://tusitio.com/img/whatsapp-share.jpg";
    // const url = `https://wa.me/?text=${encodeURIComponent(message)}&image=${encodeURIComponent(imageUrl)}`;
    
    const url = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  // Efecto de partículas blancas
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
          <div className="time-block">
            <div className="time-value ornate-number">{timeLeft.days}</div>
            <div className="time-label">Días</div>
          </div>
          
          <div className="time-separator">:</div>
          
          <div className="time-block">
            <div className="time-value ornate-number">{timeLeft.hours.toString().padStart(2, '0')}</div>
            <div className="time-label">Horas</div>
          </div>
          
          <div className="time-separator">:</div>
          
          <div className="time-block">
            <div className="time-value ornate-number">{timeLeft.minutes.toString().padStart(2, '0')}</div>
            <div className="time-label">Minutos</div>
          </div>
          
          <div className="time-separator">:</div>
          
          <div className="time-block">
            <div className="time-value ornate-number">{timeLeft.seconds.toString().padStart(2, '0')}</div>
            <div className="time-label">Segundos</div>
          </div>
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
        </div>

        {/* Botón de WhatsApp */}
        <button className="whatsapp-share-button" onClick={shareOnWhatsApp}>
          <FaWhatsapp className="whatsapp-icon" />
          Compartir cuenta regresiva
        </button>
      </div>
      
      <div className="baroque-decoration top-left"></div>
      <div className="baroque-decoration top-right"></div>
    </section>
  );
}

export default PPublicoContadorDias;