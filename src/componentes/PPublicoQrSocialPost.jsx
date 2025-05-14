import React, { useState, useRef, useEffect } from "react";
import "../assets/scss/_03-Componentes/_PPublicoQrSocialPost.scss";
import { toast } from "react-toastify";
import QRCode from "react-qr-code";
import { X, Heart, ChevronLeft, ChevronRight } from "react-feather";

function PPublicoQrSocialPost() {
  // Estados principales
  const [posts, setPosts] = useState(() => {
    try {
      const savedPosts = localStorage.getItem('weddingSocialPosts');
      return savedPosts ? JSON.parse(savedPosts) : [];
    } catch (error) {
      console.error("Error al leer del localStorage:", error);
      return [];
    }
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [currentMedia, setCurrentMedia] = useState([]);
  const [authorInfo, setAuthorInfo] = useState({ name: '', message: '' });
  const [selectedPost, setSelectedPost] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const fileInputRef = useRef(null);
  
  // URL para el QR
  const qrUrl = `${window.location.origin}/subir-foto`;

  // Persistir posts en localStorage con manejo de errores
  useEffect(() => {
    const saveToLocalStorage = () => {
      try {
        // Limitar el número de posts guardados para evitar exceder la cuota
        const postsToSave = posts.slice(0, 50); // Guardar solo los últimos 50 posts
        localStorage.setItem('weddingSocialPosts', JSON.stringify(postsToSave));
      } catch (error) {
        console.error("Error al guardar en localStorage:", error);
        // Opcional: Mostrar un mensaje al usuario
        toast.error("No se pudo guardar la publicación localmente. Espacio de almacenamiento lleno.");
      }
    };

    saveToLocalStorage();
  }, [posts]);

  // Manejar cambios en el formulario de autor
  const handleAuthorChange = (e) => {
    const { name, value } = e.target;
    setAuthorInfo(prev => ({ ...prev, [name]: value }));
  };

  // Manejar subida de archivos
  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    if (files.length > 5) {
      toast.error('Máximo 5 archivos a la vez');
      return;
    }

    const validFiles = files.filter(file => {
      if (!file.type.match('image.*|video.*')) {
        toast.error('Solo se permiten imágenes y videos');
        return false;
      }
      if (file.size > 10 * 1024 * 1024) {
        toast.error('Los archivos deben ser menores a 10MB');
        return false;
      }
      return true;
    });

    if (validFiles.length === 0) return;

    setCurrentMedia(validFiles);
    setShowForm(true);
  };

  // Procesar la publicación
  const processUpload = () => {
    if (currentMedia.length === 0) return;
    
    setIsLoading(true);
    const newPost = {
      id: Date.now(),
      media: [],
      timestamp: new Date().toISOString(),
      author: authorInfo.name || 'Invitado',
      message: authorInfo.message,
      likes: 0
    };
    
    let processedCount = 0;
    
    currentMedia.forEach((file, index) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        newPost.media.push({
          url: e.target.result,
          type: file.type.match('video.*') ? 'video' : 'image'
        });
        
        processedCount++;
        
        if (processedCount === currentMedia.length) {
          setPosts(prev => [newPost, ...prev.slice(0, 49)]); // Mantener solo 50 posts
          setIsLoading(false);
          setShowForm(false);
          setCurrentMedia([]);
          setAuthorInfo({ name: '', message: '' });
          toast.success('¡Publicación compartida con éxito!');
        }
      };
      
      reader.onerror = () => {
        toast.error('Error al procesar el archivo');
        setIsLoading(false);
      };
      
      reader.readAsDataURL(file);
    });
  };

  // Dar like a una publicación
  const handleLike = (postId) => {
    setPosts(prev => prev.map(post => 
      post.id === postId ? { ...post, likes: post.likes + 1 } : post
    ));
  };

  // Abrir modal de publicación
  const openPostModal = (post) => {
    setSelectedPost(post);
    setCurrentImageIndex(0);
  };

  // Navegar entre imágenes en el modal
  const navigateImage = (direction) => {
    setCurrentImageIndex(prev => {
      if (direction === 'prev') {
        return prev === 0 ? selectedPost.media.length - 1 : prev - 1;
      } else {
        return prev === selectedPost.media.length - 1 ? 0 : prev + 1;
      }
    });
  };

  return (
    <section className="qr-social-gallery">
      <h2 className="section-title">Momentos de la Boda</h2>
      <div className="section-subtitle">Comparte tus fotos y videos de Ale & Fabi</div>
      
      <div className="qr-upload-container">
        <div className="qr-section">
          <h3>Escanea para compartir</h3>
          <div className="qr-code-wrapper">
            <QRCode 
              value={qrUrl} 
              size={180}
              bgColor="#f8f5f2"
              fgColor="#5a2d2d"
              level="H"
            />
            <div className="qr-instructions">Usa tu cámara para escanear este código</div>
          </div>
        </div>
        
        <div className="upload-section">
          <h3>O sube directamente</h3>
          <button 
            className="upload-button"
            onClick={() => fileInputRef.current.click()}
            disabled={isLoading}
          >
            {isLoading ? (
              <span>Subiendo...</span>
            ) : (
              <>
                <i className="bi bi-cloud-arrow-up"></i>
                <span>Seleccionar archivos</span>
              </>
            )}
          </button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept="image/*,video/*"
            multiple
            style={{ display: 'none' }}
          />
          <div className="upload-hint">Máximo 5 archivos (fotos o videos)</div>
        </div>
      </div>
      
      {/* Formulario para información del autor */}
      {showForm && (
        <div className="author-form-overlay">
          <div className="author-form-container">
            <h3>Comparte tu momento</h3>
            <div className="form-group">
              <label htmlFor="author-name">Tu nombre (opcional)</label>
              <input
                type="text"
                id="author-name"
                name="name"
                value={authorInfo.name}
                onChange={handleAuthorChange}
                placeholder="¿Cómo te llamas?"
                maxLength="30"
              />
            </div>
            <div className="form-group">
              <label htmlFor="author-message">Mensaje (opcional)</label>
              <textarea
                id="author-message"
                name="message"
                value={authorInfo.message}
                onChange={handleAuthorChange}
                placeholder="Escribe un mensaje breve..."
                maxLength="120"
                rows="3"
              />
              <div className="char-counter">{authorInfo.message.length}/120</div>
            </div>
            <div className="preview-media">
              {currentMedia.map((file, index) => (
                <div key={index} className="media-thumbnail">
                  {file.type.match('video.*') ? (
                    <video controls>
                      <source src={URL.createObjectURL(file)} type={file.type} />
                    </video>
                  ) : (
                    <img src={URL.createObjectURL(file)} alt="Preview" />
                  )}
                </div>
              ))}
            </div>
            <div className="form-actions">
              <button className="cancel-btn" onClick={() => setShowForm(false)}>
                Cancelar
              </button>
              <button className="submit-btn" onClick={processUpload} disabled={isLoading}>
                {isLoading ? 'Publicando...' : 'Compartir'}
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Galería compacta de publicaciones */}
      <div className="compact-gallery">
        {posts.length === 0 ? (
          <div className="empty-state">
            <i className="bi bi-images"></i>
            <div>No hay publicaciones aún</div>
            <div>Sé el primero en compartir tus momentos</div>
          </div>
        ) : (
          posts.map(post => (
            <div key={post.id} className="gallery-post" onClick={() => openPostModal(post)}>
              {post.media[0].type === 'video' ? (
                <div className="media-container">
                  <video className="post-thumbnail">
                    <source src={post.media[0].url} type="video/mp4" />
                  </video>
                  <div className="play-icon">
                    <i className="bi bi-play-fill"></i>
                  </div>
                </div>
              ) : (
                <img src={post.media[0].url} alt="Post" className="post-thumbnail" />
              )}
              
              {post.media.length > 1 && (
                <div className="multi-media-indicator">
                  <i className="bi bi-collection"></i>
                  <span>{post.media.length}</span>
                </div>
              )}
              
              <div className="post-overlay">
                <div className="like-count">
                  <Heart size={16} />
                  <span>{post.likes}</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      
      {/* Modal de publicación expandida */}
      {selectedPost && (
        <div className="post-modal-overlay">
          <div className="post-modal-container">
            <button className="close-modal" onClick={() => setSelectedPost(null)}>
              <X size={24} />
            </button>
            
            <div className="modal-media-container">
              {selectedPost.media[currentImageIndex].type === 'video' ? (
                <video controls autoPlay className="modal-media">
                  <source src={selectedPost.media[currentImageIndex].url} type="video/mp4" />
                </video>
              ) : (
                <img 
                  src={selectedPost.media[currentImageIndex].url} 
                  alt="Post" 
                  className="modal-media" 
                />
              )}
              
              {selectedPost.media.length > 1 && (
                <>
                  <button 
                    className="nav-button prev"
                    onClick={() => navigateImage('prev')}
                  >
                    <ChevronLeft size={32} />
                  </button>
                  <button 
                    className="nav-button next"
                    onClick={() => navigateImage('next')}
                  >
                    <ChevronRight size={32} />
                  </button>
                  <div className="media-counter">
                    {currentImageIndex + 1} / {selectedPost.media.length}
                  </div>
                </>
              )}
            </div>
            
            <div className="modal-post-info">
              <div className="author-info">
                <div className="author-avatar">
                  {selectedPost.author.charAt(0).toUpperCase()}
                </div>
                <div>
                  <div className="author-name">{selectedPost.author}</div>
                  <div className="post-time">
                    {new Date(selectedPost.timestamp).toLocaleString()}
                  </div>
                </div>
              </div>
              
              {selectedPost.message && (
                <div className="post-message">
                  <p>{selectedPost.message}</p>
                </div>
              )}
              
              <div className="post-actions">
                <button 
                  className="like-btn"
                  onClick={() => {
                    handleLike(selectedPost.id);
                    setSelectedPost(prev => ({
                      ...prev,
                      likes: prev.likes + 1
                    }));
                  }}
                >
                  <Heart size={20} fill={selectedPost.likes > 0 ? 'currentColor' : 'none'} />
                  <span>{selectedPost.likes}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default PPublicoQrSocialPost;