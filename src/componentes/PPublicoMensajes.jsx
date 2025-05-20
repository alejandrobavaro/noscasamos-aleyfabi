import React, { useState, useEffect, useRef } from "react";
import "../assets/scss/_03-Componentes/_PPublicoMensajes.scss";
import { Heart, ChevronLeft, ChevronRight, X, Edit3, Trash2 } from "react-feather";

function PPublicoMensajes() {
  // Estados principales
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [author, setAuthor] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [showForm, setShowForm] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const messagesPerPage = 8;
  const autoPlayInterval = useRef(null);

  // Colores pastel mejorados
  const noteColors = [
    '#FFF5F5', '#FFF0F5', '#FDF2F8', '#FAF5FF', '#F5F3FF',
    '#EFF6FF', '#ECFDF5', '#F0FDF4', '#F7FEE7', '#FFFBEB'
  ];

  // Efecto para el auto-play
  useEffect(() => {
    if (autoPlay && messages.length > messagesPerPage) {
      autoPlayInterval.current = setInterval(() => {
        setCurrentPage(prev => (prev + 1) % Math.ceil(messages.length / messagesPerPage));
      }, 5000);
    }
    return () => clearInterval(autoPlayInterval.current);
  }, [autoPlay, messages.length]);

  // Cargar mensajes iniciales
  useEffect(() => {
    const savedMessages = localStorage.getItem("weddingMessages");
    if (savedMessages) {
      try {
        const parsedMessages = JSON.parse(savedMessages);
        if (Array.isArray(parsedMessages)) {
          setMessages(parsedMessages);
        }
      } catch (error) {
        console.error("Error parsing messages:", error);
      }
    }
  }, []);

  // Guardar mensajes
  useEffect(() => {
    const timer = setTimeout(() => {
      if (messages.length > 0) {
        localStorage.setItem("weddingMessages", JSON.stringify(messages));
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [messages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !author.trim()) return;

    setIsSending(true);
    
    setTimeout(() => {
      const randomColor = noteColors[Math.floor(Math.random() * noteColors.length)];
      
      const newMsg = {
        id: Date.now(),
        text: newMessage,
        author: author,
        date: new Date().toLocaleDateString("es-AR", {
          day: 'numeric',
          month: 'long',
          year: 'numeric'
        }),
        color: randomColor,
        createdAt: new Date().getTime()
      };

      setMessages(prev => [newMsg, ...prev].slice(0, 50));
      setNewMessage("");
      setAuthor("");
      setIsSending(false);
      setShowForm(false);
      setCurrentPage(0); // Ir a la primera página con el nuevo mensaje
    }, 500);
  };

  const handleDelete = (id) => {
    setMessages(messages.filter(msg => msg.id !== id));
    // Ajustar la página actual si es necesario
    if (currentPage >= Math.ceil((messages.length - 1) / messagesPerPage)) {
      setCurrentPage(Math.max(0, currentPage - 1));
    }
  };

  const handleEdit = (message) => {
    setNewMessage(message.text);
    setAuthor(message.author);
    setEditMode(true);
    setShowForm(true);
    handleDelete(message.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const paginatedMessages = () => {
    const startIndex = currentPage * messagesPerPage;
    return messages.slice(startIndex, startIndex + messagesPerPage);
  };

  const totalPages = Math.ceil(messages.length / messagesPerPage);

  return (
    <div className="messages-album">
      <div className="album-background"></div>
      
      <div className="album-header">
        <h2>Álbum de Mensajes</h2>
        <p>Los mejores deseos para los novios</p>
      </div>
      
      {showForm ? (
        <form className="message-form" onSubmit={handleSubmit}>
          <div className="form-header">
            <h3>{editMode ? 'Editar Mensaje' : 'Nuevo Mensaje'}</h3>
            <button 
              type="button" 
              className="close-form"
              onClick={() => {
                setShowForm(false);
                setEditMode(false);
              }}
            >
              <X size={20} />
            </button>
          </div>
          
          <div className="form-group">
            <label htmlFor="author">Tu Nombre*</label>
            <input
              type="text"
              id="author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              required
              maxLength={30}
              placeholder="Ej: María y Juan"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="message">Tu Mensaje*</label>
            <textarea
              id="message"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              required
              maxLength={200}
              rows={4}
              placeholder="Escribe tu mensaje de amor, consejo o buenos deseos..."
            />
            <div className="char-counter">{newMessage.length}/200</div>
          </div>
          
          <button 
            type="submit" 
            className="submit-btn"
            disabled={isSending}
          >
            {isSending ? (
              <span className="loading">Enviando...</span>
            ) : (
              <>{editMode ? 'Actualizar' : 'Publicar Mensaje'}</>
            )}
          </button>
        </form>
      ) : (
        <div className="add-message-container">
          <button 
            className="add-message-btn"
            onClick={() => {
              setShowForm(true);
              setEditMode(false);
            }}
          >
            Escribir un Mensaje
          </button>
        </div>
      )}
      
      <div className="album-controls">
        <button 
          className={`control-btn ${currentPage === 0 ? 'disabled' : ''}`}
          onClick={() => {
            setCurrentPage(prev => Math.max(0, prev - 1));
            setAutoPlay(false);
          }}
          disabled={currentPage === 0}
        >
          <ChevronLeft size={24} />
        </button>
        
        <div className="page-indicator">
          Página {currentPage + 1} de {totalPages || 1}
        </div>
        
        <button 
          className={`control-btn ${currentPage >= totalPages - 1 ? 'disabled' : ''}`}
          onClick={() => {
            setCurrentPage(prev => Math.min(totalPages - 1, prev + 1));
            setAutoPlay(false);
          }}
          disabled={currentPage >= totalPages - 1}
        >
          <ChevronRight size={24} />
        </button>
      </div>
      
      <div className="album-pages">
        {messages.length === 0 ? (
          <div className="empty-state">
            <Heart size={48} className="empty-icon" />
            <p>No hay mensajes aún</p>
            <p>Sé el primero en enviar buenos deseos</p>
          </div>
        ) : (
          <div className="album-page">
            {paginatedMessages().map((message) => (
              <div 
                key={message.id}
                className="message-note"
                style={{ backgroundColor: message.color }}
              >
                <div className="note-content">
                  <p className="note-text">{message.text}</p>
                  <div className="note-footer">
                    <span className="note-author">- {message.author}</span>
                    <span className="note-date">{message.date}</span>
                  </div>
                </div>
                
                <div className="note-pin"></div>
                
                <div className="note-actions">
                  <button 
                    className="edit-btn"
                    onClick={() => handleEdit(message)}
                  >
                    <Edit3 size={16} />
                  </button>
                  <button 
                    className="delete-btn"
                    onClick={() => handleDelete(message.id)}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      <div className="album-footer">
        <label className="auto-play-toggle">
          <input 
            type="checkbox" 
            checked={autoPlay} 
            onChange={(e) => setAutoPlay(e.target.checked)} 
          />
          <span>Auto-play</span>
        </label>
      </div>
    </div>
  );
}

export default PPublicoMensajes;