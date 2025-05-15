import React, { useState, useRef, useEffect } from 'react';
import "../assets/scss/_03-Componentes/_PPublicoCabinaFotografica.scss";
import { Camera, CameraOff, Circle, ChevronRight, X, Download, Share2, Smile, Zap, Image } from 'react-feather';

// Lista de filtros/máscaras
const FILTERS = [
  { id: 'none', name: 'Normal', css: 'none' },
  { id: 'vintage', name: 'Vintage', css: 'sepia(0.5) contrast(1.2)' },
  { id: 'blackwhite', name: 'Blanco y Negro', css: 'grayscale(100%)' }
];

const MASKS = [
  { id: 'sunglasses', name: 'Gafas', url: '/img/08-cabinafotos/cabinafotos-gorro1.png' },
  { id: 'mustache', name: 'Bigote', url: '/img/08-cabinafotos/cabinafotos-lentes1.png' },
  { id: 'hat', name: 'Sombrero', url: '/img/08-cabinafotos/cabinafotos-lentesgif1.gif' },
  { id: 'hearts', name: 'Corazones', url: '/img/08-cabinafotos/cabinafotos-perrito1.png' },
  { id: 'crown', name: 'Corona', url: '/img/08-cabinafotos/cabinafotos-cuadro1.png' },
  { id: 'dog', name: 'Perro', url: '/img/08-cabinafotos/cabinafotos-confetis1.png' }
];

const LOCAL_STORAGE_KEY = 'cabinaFotograficaFotos';

function PPublicoCabinaFotografica({ onClose, fullscreenMode }) {
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [isTakingPhotos, setIsTakingPhotos] = useState(false);
  const [photosTaken, setPhotosTaken] = useState(0);
  const [showTutorial, setShowTutorial] = useState(true);
  const [showCameraSelector, setShowCameraSelector] = useState(false);
  const [cameraError, setCameraError] = useState(null);
  const [availableCameras, setAvailableCameras] = useState([]);
  const [selectedCameraId, setSelectedCameraId] = useState('');
  const [videoReady, setVideoReady] = useState(false);
  const [activeFilter, setActiveFilter] = useState('none');
  const [activeMask, setActiveMask] = useState(null);
  const [showCountdown, setShowCountdown] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [countdownMessage, setCountdownMessage] = useState('');
  const [flashActive, setFlashActive] = useState(false);
  const [recentPhotos, setRecentPhotos] = useState([]);

  const videoRef = useRef(null);
  const streamRef = useRef(null);

  // Cargar fotos guardadas al inicio
  useEffect(() => {
    const savedPhotos = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (savedPhotos) {
      setRecentPhotos(JSON.parse(savedPhotos).slice(0, 3));
    }
  }, []);

  // Guardar fotos en localStorage cuando cambian
  useEffect(() => {
    if (recentPhotos.length > 0) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(recentPhotos));
    }
  }, [recentPhotos]);

  // Obtener cámaras disponibles
  const getAvailableCameras = async () => {
    try {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const tempStream = await navigator.mediaDevices.getUserMedia({ video: true });
        tempStream.getTracks().forEach(track => track.stop());

        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoDevices = devices.filter(device => device.kind === 'videoinput');

        if (videoDevices.length === 0) {
          setCameraError('No se encontraron cámaras disponibles');
          return;
        }

        setAvailableCameras(videoDevices);
        if (videoDevices.length > 0 && !selectedCameraId) {
          setSelectedCameraId(videoDevices[0].deviceId);
        }
      }
    } catch (err) {
      console.error("Error al enumerar dispositivos:", err);
      handleCameraError(err);
    }
  };

  const handleCameraError = (err) => {
    if (err.name === 'NotAllowedError') {
      setCameraError('Permiso de cámara denegado. Por favor habilita el acceso.');
    } else if (err.message.includes('CameraReservedByAnotherApp')) {
      setCameraError('La cámara está siendo usada por otra aplicación. Cierra otras apps que usen la cámara.');
    } else {
      setCameraError('No se pudo acceder a la cámara. Error: ' + err.message);
    }
  };

  const startCamera = async () => {
    try {
      setCameraError(null);
      await stopCamera();
      await new Promise(resolve => setTimeout(resolve, 300));

      const constraints = {
        video: {
          deviceId: selectedCameraId ? { exact: selectedCameraId } : undefined,
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: 'user'
        },
        audio: false
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;

        const onLoadedMetadata = () => {
          videoRef.current.play()
            .then(() => setIsCameraActive(true))
            .catch(err => {
              console.error("Error al reproducir video:", err);
              setCameraError('Error al reproducir la cámara');
              stopCamera();
            });
        };

        videoRef.current.addEventListener('loadedmetadata', onLoadedMetadata);
        return () => videoRef.current?.removeEventListener('loadedmetadata', onLoadedMetadata);
      }
    } catch (err) {
      console.error("Error al acceder a la cámara:", err);
      handleCameraError(err);
      setIsCameraActive(false);
      await stopCamera();
    }
  };

  const stopCamera = async () => {
    return new Promise(resolve => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
        streamRef.current = null;
      }
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
      setIsCameraActive(false);
      resolve();
    });
  };

  const handleCameraChange = (deviceId) => {
    setSelectedCameraId(deviceId);
    setShowCameraSelector(false);
  };

  const showCountdownMessage = async (photoNumber) => {
    const messages = [
      "¡Prepárate para la primera foto!",
      "¡Ahora la segunda foto!",
      "¡Última foto, sonríe!"
    ];
    
    setCountdownMessage(messages[photoNumber - 1]);
    setShowCountdown(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    for (let i = 3; i > 0; i--) {
      setCountdown(i);
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
    
    setCountdown(0);
    setCountdownMessage("¡Di whisky!");
    await new Promise(resolve => setTimeout(resolve, 500));
  };

  const triggerFlash = () => {
    setFlashActive(true);
    setTimeout(() => setFlashActive(false), 300);
  };

  const capturePhoto = async () => {
    if (!videoRef.current || !isCameraActive) return;

    triggerFlash();
    const video = videoRef.current;
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');

    ctx.translate(canvas.width, 0);
    ctx.scale(-1, 1);
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    
    if (activeFilter !== 'none') {
      const filter = FILTERS.find(f => f.id === activeFilter);
      if (filter?.css) {
        ctx.filter = filter.css;
        ctx.drawImage(canvas, 0, 0, canvas.width, canvas.height);
        ctx.filter = 'none';
      }
    }

    if (activeMask) {
      const mask = MASKS.find(m => m.id === activeMask);
      if (mask) {
        const img = new Image();
        img.src = mask.url;
        await new Promise((resolve) => {
          img.onload = () => {
            const faceWidth = canvas.width * 0.4;
            const faceHeight = faceWidth;
            const faceX = canvas.width / 2 - faceWidth / 2;
            const faceY = canvas.height * 0.2;
            ctx.drawImage(img, faceX, faceY, faceWidth, faceHeight);
            resolve();
          };
          img.onerror = resolve;
        });
      }
    }

    const photoUrl = canvas.toDataURL('image/jpeg', 0.9);
    return photoUrl;
  };

  const takePhotoSequence = async () => {
    if (!isCameraActive || isTakingPhotos) return;

    setIsTakingPhotos(true);
    const newPhotos = [];

    for (let i = 0; i < 3; i++) {
      setPhotosTaken(i + 1);
      await showCountdownMessage(i + 1);
      const photoUrl = await capturePhoto();
      newPhotos.push(photoUrl);
      setShowCountdown(false);
      
      if (i < 2) {
        await new Promise(resolve => setTimeout(resolve, 4000));
      }
    }

    // Actualizar fotos recientes (mantener solo las últimas 3)
    setRecentPhotos(prev => [
      ...newPhotos.map((photo, idx) => ({ 
        url: photo, 
        number: prev.length + idx + 1 
      })),
      ...prev
    ].slice(0, 3));

    setIsTakingPhotos(false);
    setPhotosTaken(0);
  };

  const downloadPhoto = (photoUrl, index) => {
    const link = document.createElement('a');
    link.href = photoUrl;
    link.download = `foto-boda-${new Date().toISOString().slice(0, 10)}-${index + 1}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const sharePhoto = async (photoUrl) => {
    if (navigator.share) {
      try {
        const response = await fetch(photoUrl);
        const blob = await response.blob();
        const file = new File([blob], 'foto-boda.jpg', { type: 'image/jpeg' });
        await navigator.share({
          title: 'Mi foto de la boda',
          files: [file]
        });
      } catch (err) {
        console.error('Error al compartir:', err);
        downloadPhoto(photoUrl, 0);
      }
    } else {
      downloadPhoto(photoUrl, 0);
    }
  };

  useEffect(() => {
    if (videoRef.current) setVideoReady(true);
  }, [videoRef.current]);

  useEffect(() => {
    getAvailableCameras();
    return () => stopCamera();
  }, []);

  useEffect(() => {
    if (videoReady && selectedCameraId && availableCameras.length > 0) {
      startCamera();
    }
  }, [videoReady, selectedCameraId, availableCameras]);

  const tutorialSteps = [
    {
      title: "Permite el acceso a la cámara",
      description: "Cuando se te solicite, permite que la aplicación use tu cámara para poder tomar fotos."
    },
    {
      title: "Selecciona un filtro divertido",
      description: "Elige entre varios filtros y máscaras para hacer tus fotos más originales."
    },
    {
      title: "Presiona el botón para tomar fotos",
      description: "Se tomarán 3 fotos automáticamente con un intervalo de 4 segundos entre ellas."
    },
    {
      title: "¡Sonríe y diviértete!",
      description: "Las fotos se guardarán automáticamente y podrás verlas en la galería."
    }
  ];

  return (
    <section className={`cabina-fotografica-container ${fullscreenMode ? 'fullscreen' : ''}`}>
      {fullscreenMode && (
        <button className="close-fullscreen" onClick={onClose}>
          <X size={24} />
        </button>
      )}

      <h2 className="section-title">Cabina Fotográfica</h2>
      <p className="section-subtitle">¡Captura momentos divertidos de la boda!</p>

      {cameraError && (
        <div className="camera-error">
          <p>{cameraError}</p>
          <button className="retry-button" onClick={startCamera}>
            Intentar nuevamente
          </button>
        </div>
      )}

      {showTutorial && (
        <div className="tutorial-overlay">
          <div className="tutorial-container">
            <h3>¿Cómo usar la cabina fotográfica?</h3>
            <div className="tutorial-steps">
              {tutorialSteps.map((step, index) => (
                <div key={index} className="tutorial-step">
                  <div className="step-number">{index + 1}</div>
                  <div className="step-content">
                    <h4>{step.title}</h4>
                    <p>{step.description}</p>
                  </div>
                  {index < tutorialSteps.length - 1 && <ChevronRight className="step-arrow" />}
                </div>
              ))}
            </div>
            <button className="start-button" onClick={() => setShowTutorial(false)}>
              Comenzar
            </button>
          </div>
        </div>
      )}

      <div className="photo-booth-layout">
        <div className="camera-preview-container">
          <div className="camera-container">
            <video
              ref={videoRef}
              className={`camera-video ${isCameraActive ? 'visible' : 'hidden'}`}
              autoPlay
              playsInline
              muted
              style={{ filter: activeFilter !== 'none' ? FILTERS.find(f => f.id === activeFilter)?.css : 'none' }}
            />
            
            <div className={`countdown-overlay ${showCountdown ? 'visible' : ''}`}>
              <div className="countdown-title">Foto {photosTaken} de 3</div>
              <div className="countdown-subtitle">{countdownMessage}</div>
              {countdown > 0 && <div className="countdown-number">{countdown}</div>}
              {countdown === 0 && countdownMessage && (
                <div className="countdown-message">{countdownMessage}</div>
              )}
            </div>
            
            <div className={`flash-effect ${flashActive ? 'active' : ''}`}></div>

            {!isCameraActive && !cameraError && !showTutorial && (
              <p className="camera-inactive-message">Cámara no activada</p>
            )}
          </div>

          {recentPhotos.length > 0 && (
            <div className="recent-photos-gallery">
              <h4><Image size={18} /> Tus últimas fotos</h4>
              <div className="recent-photos-grid">
                {recentPhotos.map((photo, index) => (
                  <div key={index} className="recent-photo">
                    <img src={photo.url} alt={`Foto ${photo.number}`} />
                    <div className="photo-number">{photo.number}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="controls-panel">
          <button
            className="take-photo-button"
            onClick={takePhotoSequence}
            disabled={!isCameraActive || isTakingPhotos}
          >
            <Zap size={24} /> {isTakingPhotos ? `Tomando foto ${photosTaken}/3` : 'Tomar 3 fotos'}
          </button>

          <div className="filters-section">
            <h3 className="filters-title"><Smile size={18} /> Filtros</h3>
            <div className="filters-container">
              {FILTERS.map(filter => (
                <button 
                  key={filter.id}
                  className={`filter-option ${activeFilter === filter.id ? 'active' : ''}`}
                  onClick={() => setActiveFilter(filter.id)}
                >
                  <div className="filter-preview" style={{ 
                    filter: filter.css,
                    background: 'linear-gradient(135deg, #5a2d2d, #D4AF37)',
                    width: '100%',
                    height: '100%'
                  }} />
                  <span className="filter-name">{filter.name}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="filters-section">
            <h3 className="filters-title"><Smile size={18} /> Máscaras</h3>
            <div className="filters-container">
              {MASKS.map(mask => (
                <button 
                  key={mask.id}
                  className={`filter-option ${activeMask === mask.id ? 'active' : ''}`}
                  onClick={() => setActiveMask(mask.id === activeMask ? null : mask.id)}
                >
                  <img src={mask.url} alt={mask.name} />
                  <span className="filter-name">{mask.name}</span>
                </button>
              ))}
            </div>
          </div>

          <button
            className="toggle-camera-selector"
            onClick={() => setShowCameraSelector(!showCameraSelector)}
            disabled={availableCameras.length <= 1}
          >
            <Camera size={18} /> Cambiar cámara
          </button>
        </div>
      </div>

      {showCameraSelector && (
        <div className="camera-selector-popup">
          <h4>Selecciona la cámara</h4>
          <ul>
            {availableCameras.map((camera) => (
              <li
                key={camera.deviceId}
                className={selectedCameraId === camera.deviceId ? 'selected' : ''}
                onClick={() => handleCameraChange(camera.deviceId)}
              >
                {camera.label || `Cámara ${camera.deviceId}`}
              </li>
            ))}
          </ul>
          <button className="close-selector" onClick={() => setShowCameraSelector(false)}>
            Cerrar
          </button>
        </div>
      )}
    </section>
  );
}

export default PPublicoCabinaFotografica;