import React, { useState } from 'react';
import { Image, Share2, Download, Printer } from 'react-feather';
import "../assets/scss/_03-Componentes/_PPublicoCabinaFotograficaGallery.scss";

const PPublicoCabinaFotograficaGallery = ({ 
  photos, 
  showActions,
  onPrint,
  onDownload,
  onShare,
  onBack
}) => {
  const [shareOptions, setShareOptions] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(photos[0]?.url || null);

  return (
    <div className="gallery-container">
      {showActions ? (
        <div className="gallery-actions">
          <h3 className="gallery-title">¡Fotos listas!</h3>
          <div className="actions-buttons">
            <button 
              className="action-button print-button"
              onClick={() => onPrint(selectedPhoto)}
            >
              <Printer size={16} /> Imprimir
            </button>
            <button 
              className="action-button whatsapp-button"
              onClick={() => onShare(selectedPhoto, 'whatsapp')}
            >
              <Share2 size={16} /> WhatsApp
            </button>
            <button 
              className="action-button share-button"
              onClick={() => setShareOptions(!shareOptions)}
            >
              <Share2 size={16} /> Compartir
            </button>
            <button 
              className="action-button download-button"
              onClick={() => onDownload(selectedPhoto)}
            >
              <Download size={16} /> Descargar
            </button>
          </div>
          
          {shareOptions && (
            <div className="social-share-options">
              <button 
                className="social-button facebook-button"
                onClick={() => onShare(selectedPhoto, 'facebook')}
              >
                Facebook
              </button>
              <button 
                className="social-button twitter-button"
                onClick={() => onShare(selectedPhoto, 'twitter')}
              >
                Twitter
              </button>
              <button 
                className="social-button instagram-button"
                onClick={() => onShare(selectedPhoto, 'instagram')}
              >
                Instagram
              </button>
            </div>
          )}

          <button
            className="back-button"
            onClick={onBack}
          >
            Volver a tomar fotos
          </button>
        </div>
      ) : (
        <>
          <div className="gallery-header">
            <h3 className="gallery-title"><Image size={16} /> Tus fotos</h3>
          </div>
          <div className="photos-grid">
            {photos.map((photo, index) => (
              <div 
                key={`photo-${index}`}
                className={`photo-item ${selectedPhoto === photo.url ? 'selected' : ''}`}
                onClick={() => setSelectedPhoto(photo.url)}
              >
                <img 
                  src={photo.url} 
                  alt={`Foto ${index + 1}`} 
                  className="photo-image"
                  loading="lazy" 
                />
                <span className="photo-index">{index + 1}</span>
                <div className="photo-hover">
                  <button 
                    className="download-button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDownload(photo.url);
                    }}
                  >
                    <Download size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default PPublicoCabinaFotograficaGallery;