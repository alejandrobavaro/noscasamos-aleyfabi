import React, { useState, useEffect } from 'react';
import PPublicoCabinaFotograficaTutorial from './PPublicoCabinaFotograficaTutorial';
import PPublicoCabinaFotograficaGuestForm from './PPublicoCabinaFotograficaGuestForm';
import PPublicoCabinaFotograficaCamera from './PPublicoCabinaFotograficaCamera';
import PPublicoCabinaFotograficaControls from './PPublicoCabinaFotograficaControls';
import PPublicoCabinaFotograficaGallery from './PPublicoCabinaFotograficaGallery';
import PPublicoCabinaFotograficaEffects from './PPublicoCabinaFotograficaEffects';
import { X } from 'react-feather';
import "../assets/scss/_03-Componentes/_PPublicoCabinaFotografica.scss";

const PPublicoCabinaFotografica = ({ onClose, fullscreenMode }) => {
  const [showTutorial, setShowTutorial] = useState(true);
  const [showGuestForm, setShowGuestForm] = useState(false);
  const [guestData, setGuestData] = useState({ name: '', phone: '' });
  const [recentPhotos, setRecentPhotos] = useState([]);
  const [activeEffect, setActiveEffect] = useState(null);
  const [showActions, setShowActions] = useState(false);
  const [cameraState, setCameraState] = useState({
    isActive: false,
    isLoading: false,
    error: null,
    availableCameras: [],
    selectedCameraId: '',
    filter: 'none',
    mask: null,
    countdown: 0,
    countdownMessage: '',
    showCountdown: false,
    flashActive: false,
    photosTaken: 0,
    isTakingPhotos: false,
    showCameraSelector: false
  });


  useEffect(() => {
    const savedPhotos = localStorage.getItem('cabinaFotograficaFotos');
    if (savedPhotos) setRecentPhotos(JSON.parse(savedPhotos));
    
    const savedGuestData = localStorage.getItem('cabinaFotograficaInvitados');
    if (savedGuestData) setGuestData(JSON.parse(savedGuestData));
  }, []);

  useEffect(() => {
    if (recentPhotos.length > 0) {
      localStorage.setItem('cabinaFotograficaFotos', JSON.stringify(recentPhotos));
    }
  }, [recentPhotos]);

  useEffect(() => {
    if (guestData.name || guestData.phone) {
      localStorage.setItem('cabinaFotograficaInvitados', JSON.stringify(guestData));
    }
  }, [guestData]);

  const downloadCollage = (photoUrl) => {
    const link = document.createElement('a');
    link.href = photoUrl;
    link.download = `foto-boda-${new Date().toISOString().slice(0, 10)}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const printCollage = (photoUrl) => {
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
        <head>
          <title>Imprimir Foto</title>
          <style>
            body { text-align: center; margin: 0; padding: 0; }
            img { max-width: 100%; height: auto; }
            @media print {
              body { padding: 0; }
              img { width: 100%; height: auto; }
            }
          </style>
        </head>
        <body>
          <img src="${photoUrl}" alt="Foto de la boda" />
          <script>
            setTimeout(() => {
              window.print();
              window.close();
            }, 500);
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  const shareCollage = (photoUrl, platform) => {
    try {
      if (platform === 'whatsapp') {
        const message = `Mira mi foto de la boda de Ale y Fabi!`;
        window.open(`https://wa.me/?text=${encodeURIComponent(message)}%20${photoUrl}`);
      } else if (platform === 'facebook') {
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(photoUrl)}`);
      } else if (platform === 'twitter') {
        const text = `¡Qué divertido en la boda de Ale y Fabi! ${photoUrl}`;
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`);
      } else if (platform === 'instagram') {
        alert('Para compartir en Instagram, descarga la foto y compártela desde la app');
        downloadCollage(photoUrl);
      } else if (navigator.share) {
        navigator.share({
          title: 'Foto de la boda de Ale y Fabi',
          url: photoUrl
        }).catch(() => {
          downloadCollage(photoUrl);
        });
      } else {
        downloadCollage(photoUrl);
      }
    } catch (error) {
      console.error('Error al compartir:', error);
      downloadCollage(photoUrl);
    }
  };
  if (showTutorial) {
    return (
      <PPublicoCabinaFotograficaTutorial 
        onStart={() => {
          setShowTutorial(false);
          setShowGuestForm(true);
        }}
      />
    );
  }

  if (showGuestForm) {
    return (
      <PPublicoCabinaFotograficaGuestForm
        guestData={guestData}
        onGuestDataChange={setGuestData}
        onContinue={() => setShowGuestForm(false)}
      />
    );
  }

  return (
    <div className={`cabina-fotografica-container ${fullscreenMode ? 'fullscreen-mode' : ''}`}>
      <PPublicoCabinaFotograficaEffects effect={activeEffect} />
      
      <button 
        className="cabina-close-button" 
        onClick={onClose} 
        aria-label="Cerrar cabina fotográfica"
      >
        <X size={24} />
      </button>

      <header className="cabina-header">
        <h1 className="cabina-title">Cabina Fotográfica</h1>
        <p className="cabina-subtitle">¡Captura momentos divertidos!</p>
        {guestData.name && <p className="cabina-guest-name">Hola, {guestData.name}!</p>}
      </header>

      <PPublicoCabinaFotograficaCamera
        cameraState={cameraState}
        onCameraStateChange={setCameraState}
        onEffectTrigger={setActiveEffect}
        onPhotosTaken={(collageUrl, individualUrls) => {
          setRecentPhotos(prev => [
            { url: collageUrl, individualUrls, timestamp: new Date().getTime() },
            ...prev
          ].slice(0, 6));
          setShowActions(true);
        }}
      />

      {recentPhotos.length > 0 && (
        <PPublicoCabinaFotograficaGallery 
          photos={recentPhotos}
          showActions={showActions}
          onPrint={printCollage}
          onDownload={downloadCollage}
          onShare={shareCollage}
          onBack={() => setShowActions(false)}
        />
      )}

      {!showActions && (
        <PPublicoCabinaFotograficaControls
          cameraState={cameraState}
          onCameraStateChange={setCameraState}
          onTakePhotos={() => setCameraState(prev => ({ ...prev, isTakingPhotos: true }))}
          onEditGuestData={() => setShowGuestForm(true)}
        />
      )}
    </div>
  );
};

export default PPublicoCabinaFotografica;