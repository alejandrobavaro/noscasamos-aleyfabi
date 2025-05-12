import React, { useState, useEffect } from "react";
import "../assets/scss/_03-Componentes/_PPublicoMensajes.scss";

function PPublicoMensajes() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [author, setAuthor] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [showForm, setShowForm] = useState(true);
  const [glows, setGlows] = useState([]);

  // Paleta de colores pastel para los cartelitos
  const noteColors = [
    '#FFD3B6', '#FFAAA5', '#FF8B94', '#D4A5A5', '#CCD7C5',
    '#E2F0CB', '#B5EAD7', '#C7CEEA', '#F8B195', '#F67280',
    '#C06C84', '#6C5B7B', '#355C7D', '#A8E6CE', '#DCEDC2',
    '#FFD3B6', '#FFAAA5', '#FF8B94'
  ];

  // Crear efectos de brillo al cargar el componente
  useEffect(() => {
    const newGlows = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      size: Math.random() * 200 + 100, // Tamaños entre 100px y 300px
      left: Math.random() * 100,
      top: Math.random() * 100,
      opacity: Math.random() * 0.5 + 0.3,
      delay: Math.random() * 5,
      duration: Math.random() * 15 + 10,
      blur: Math.random() * 30 + 10
    }));
    setGlows(newGlows);
  }, []);

  // Función para truncar texto si es muy largo
  const truncateText = (text, maxWords = 15) => {
    const words = text.split(' ');
    if (words.length > maxWords) {
      return words.slice(0, maxWords).join(' ') + '...';
    }
    return text;
  };

  useEffect(() => {
    const savedMessages = localStorage.getItem("weddingMessages");
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    }
  }, []);

  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem("weddingMessages", JSON.stringify(messages));
    }
  }, [messages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !author.trim()) return;

    setIsSending(true);
    
    setTimeout(() => {
      const randomColor = noteColors[Math.floor(Math.random() * noteColors.length)];
      
      const newMsg = {
        id: Date.now(),
        text: truncateText(newMessage),
        author: author,
        date: new Date().toLocaleDateString("es-AR"),
        position: {
          x: Math.random() * 60 + 20,
          y: Math.random() * 60 + 20,
          rotation: Math.random() * 30 - 15
        },
        color: randomColor
      };

      setMessages([...messages, newMsg]);
      setNewMessage("");
      setAuthor("");
      setIsSending(false);
      setShowForm(false);
    }, 800);
  };

  const removeMessage = (id) => {
    setMessages(messages.filter(msg => msg.id !== id));
  };

  return (
    <section className="interactive-board">
      {/* Efecto de brillos mágicos mejorado */}
      <div className="magic-glows">
        {glows.map(glow => (
          <div 
            key={glow.id}
            className="glow"
            style={{
              width: `${glow.size}px`,
              height: `${glow.size}px`,
              left: `${glow.left}%`,
              top: `${glow.top}%`,
              opacity: glow.opacity,
              animationDelay: `${glow.delay}s`,
              filter: `blur(${glow.blur}px)`
            }}
          />
        ))}
      </div>
      
      <div className="board-container">
        <div className="board-header">
          <h3>Muro de Mensajes</h3>
          <h6>para los novios</h6>
        </div>
        
        <div className="board-background">
          {messages.map((message) => (
            <div 
              key={message.id}
              className="message-note"
              style={{
                left: `${message.position.x}%`,
                top: `${message.position.y}%`,
                transform: `rotate(${message.position.rotation}deg)`,
                backgroundColor: message.color,
                zIndex: Math.floor(message.position.y) + 10
              }}
              onClick={() => removeMessage(message.id)}
            >
              <div className="message-content">
                <p>{message.text}</p>
                <div className="message-footer">
                  <span>- {message.author}</span>
                  <small>{message.date}</small>
                </div>
              </div>
              <div className="note-pin"></div>
            </div>
          ))}
        </div>

        {showForm ? (
          <form className="message-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="author">Tu nombre:</label>
              <input
                type="text"
                id="author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                required
                maxLength={30}
                placeholder="Ej: María"
              />
            </div>
            <div className="form-group">
              <label htmlFor="message">Tu mensaje:</label>
              <textarea
                id="message"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                required
                maxLength={120}
                rows={3}
                placeholder="Escribe tu mensaje de amor (máx. 15 palabras)..."
              />
              <small>Máximo 15 palabras</small>
            </div>
            <button type="submit" disabled={isSending}>
              {isSending ? "Enviando..." : "Pegar en la Pizarra"}
            </button>
          </form>
        ) : (
          <div className="form-success">
            <p>¡Gracias por tu mensaje! ❤</p>
            <button onClick={() => setShowForm(true)}>Dejar otro mensaje</button>
          </div>
        )}
      </div>
    </section>
  );
}

export default PPublicoMensajes;