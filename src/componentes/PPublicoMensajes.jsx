import React, { useState, useEffect } from "react";
import "../assets/scss/_03-Componentes/_PPublicoMensajes.scss";

function PPublicoMensajes() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [author, setAuthor] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [showForm, setShowForm] = useState(true);

  // Función para generar colores aleatorios pastel
  const getRandomColor = () => {
    const hue = Math.floor(Math.random() * 360);
    return `hsl(${hue}, 70%, 85%)`;
  };

  // Cargar mensajes del localStorage al inicio
  useEffect(() => {
    const savedMessages = localStorage.getItem("weddingMessages");
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    }
  }, []);

  // Guardar mensajes en localStorage cuando cambian
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem("weddingMessages", JSON.stringify(messages));
    }
  }, [messages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !author.trim()) return;

    setIsSending(true);
    
    // Simular envío con delay
    setTimeout(() => {
      const newMsg = {
        id: Date.now(),
        text: newMessage,
        author: author,
        date: new Date().toLocaleDateString("es-AR"),
        position: {
          x: Math.random() * 60 + 20, // Entre 20% y 80%
          y: Math.random() * 60 + 20,
          rotation: Math.random() * 30 - 15 // Rotación más sutil
        },
        color: getRandomColor() // Color aleatorio
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
      <div className="board-container">
        <div className="board-header">
          <h3>Muro para los Novios</h3>
          <h6>Dejanos tu mensaje</h6>
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
                zIndex: Math.floor(message.position.y)
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
                placeholder="Escribe tu mensaje de amor..."
              />
              <small>Máximo 120 caracteres</small>
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