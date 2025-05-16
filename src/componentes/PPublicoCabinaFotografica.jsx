import React, { useState, useRef, useEffect } from 'react';
import "../assets/scss/_03-Componentes/_PPublicoCabinaFotografica.scss";
import { Camera, X, Zap, Smile, Image } from 'react-feather';

const FILTERS = [
  { id: 'none', name: 'Normal', css: 'none' },
  { id: 'vintage', name: 'Vintage', css: 'sepia(0.5) contrast(1.2)' },
  { id: 'blackwhite', name: 'B/N', css: 'grayscale(100%)' }
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

const TUTORIAL_STEPS = [
  {
    title: "Permite el acceso a la cámara",
    description: "Cuando se te solicite, permite que la aplicación use tu cámara."
  },
  {
    title: "Selecciona un filtro divertido",
    description: "Elige entre filtros y máscaras para tus fotos."
  },
  {
    title: "Presiona el botón para fotos",
    description: "Se tomarán 3 fotos automáticamente."
  },
  {
    title: "¡Sonríe y diviértete!",
    description: "Las fotos se guardarán automáticamente."
  }
];

function PPublicoCabinaFotografica({ onClose, fullscreenMode }) {
  const [showTutorial, setShowTutorial] = useState(true);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [isTakingPhotos, setIsTakingPhotos] = useState(false);
  const [photosTaken, setPhotosTaken] = useState(0);
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
        
        // Esperar a que el video esté listo para reproducir
        const onCanPlay = () => {
          videoRef.current.play()
            .then(() => {
              setIsCameraActive(true);
              videoRef.current.removeEventListener('canplay', onCanPlay);
            })
            .catch(err => {
              console.error("Error al reproducir video:", err);
              setCameraError('Error al reproducir la cámara');
              stopCamera();
            });
        };

        videoRef.current.addEventListener('canplay', onCanPlay);
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
    startCamera(); // Reiniciar la cámara con el nuevo dispositivo
  };

  const showCountdownMessage = async (photoNumber) => {
    const messages = [
      "¡Prepárate para la primera foto!",
      "¡Ahora la segunda foto!",
      "¡Última foto, sonríe!"
    ];
    
    setCountdownMessage(messages[photoNumber - 1]);
    setShowCountdown(true);
    await new Promise(resolve => setTimeout(resolve, 800));
    
    for (let i = 3; i > 0; i--) {
      setCountdown(i);
      await new Promise(resolve => setTimeout(resolve, 600));
    }
    
    setCountdown(0);
    setCountdownMessage("¡Di whisky!");
    await new Promise(resolve => setTimeout(resolve, 200));
  };

  const triggerFlash = () => {
    setFlashActive(true);
    setTimeout(() => setFlashActive(false), 300);
  };

  const capturePhoto = () => {
    return new Promise((resolve, reject) => {
      if (!videoRef.current || !isCameraActive) {
        reject(new Error("Cámara no disponible"));
        return;
      }

      try {
        triggerFlash();
        const video = videoRef.current;
        const canvas = document.createElement('canvas');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const ctx = canvas.getContext('2d');

        // Espejo horizontal para efecto espejo
        ctx.translate(canvas.width, 0);
        ctx.scale(-1, 1);
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        
        // Aplicar filtro si existe
        if (activeFilter !== 'none') {
          const filter = FILTERS.find(f => f.id === activeFilter);
          if (filter?.css) {
            ctx.filter = filter.css;
            ctx.drawImage(canvas, 0, 0, canvas.width, canvas.height);
            ctx.filter = 'none';
          }
        }

        // Aplicar máscara si existe
        if (activeMask) {
          const mask = MASKS.find(m => m.id === activeMask);
          if (mask) {
            const img = new Image();
            img.crossOrigin = 'anonymous';
            img.onload = () => {
              const faceWidth = canvas.width * 0.6;
              const faceHeight = faceWidth * (img.height / img.width);
              const faceX = canvas.width / 2 - faceWidth / 2;
              const faceY = canvas.height * 0.25;
              ctx.drawImage(img, faceX, faceY, faceWidth, faceHeight);
              const photoUrl = canvas.toDataURL('image/jpeg', 0.9);
              resolve(photoUrl);
            };
            img.onerror = () => {
              const photoUrl = canvas.toDataURL('image/jpeg', 0.9);
              resolve(photoUrl);
            };
            img.src = mask.url;
            return;
          }
        }

        const photoUrl = canvas.toDataURL('image/jpeg', 0.9);
        resolve(photoUrl);
      } catch (error) {
        reject(error);
      }
    });
  };

  const takePhotoSequence = async () => {
    if (!isCameraActive || isTakingPhotos) return;

    setIsTakingPhotos(true);
    const newPhotos = [];

    try {
      for (let i = 0; i < 3; i++) {
        setPhotosTaken(i + 1);
        
        await showCountdownMessage(i + 1);
        
        let photoUrl;
        try {
          photoUrl = await capturePhoto();
          newPhotos.push(photoUrl);
        } catch (error) {
          console.error("Error al capturar foto:", error);
          // Intentar una vez más
          try {
            photoUrl = await capturePhoto();
            newPhotos.push(photoUrl);
          } catch (error) {
            console.error("Error al capturar foto (segundo intento):", error);
            // Continuar con la siguiente foto
            continue;
          }
        }
        
        setShowCountdown(false);
        
        if (i < 2) {
          await new Promise(resolve => setTimeout(resolve, 1500));
        }
      }

      setRecentPhotos(prev => [
        ...newPhotos.map((photo, idx) => ({ 
          url: photo, 
          number: prev.length + idx + 1 
        })),
        ...prev
      ].slice(0, 3));
    } catch (error) {
      console.error("Error en la secuencia de fotos:", error);
    } finally {
      setIsTakingPhotos(false);
      setPhotosTaken(0);
    }
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
    return () => {
      stopCamera();
    };
  }, []);

  useEffect(() => {
    if (videoReady && selectedCameraId && availableCameras.length > 0) {
      startCamera();
    }
  }, [videoReady, selectedCameraId, availableCameras]);

  if (showTutorial) {
    return (
      <div className="tutorial-overlay">
        <div className="tutorial-container">
          <h2>¿Cómo usar la cabina fotográfica?</h2>
          <div className="tutorial-steps">
            {TUTORIAL_STEPS.map((step, index) => (
              <div key={index} className="tutorial-step">
                <div className="step-number">{index + 1}</div>
                <div className="step-content">
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
              </div>
            ))}
          </div>
          <button 
            className="start-button"
            onClick={() => {
              setShowTutorial(false);
              getAvailableCameras();
            }}
          >
            Comenzar
          </button>
        </div>
      </div>
    );
  }

  return (
    <section className={`cabina-fotografica-container ${fullscreenMode ? 'fullscreen' : ''}`}>
      <button className="close-fullscreen" onClick={onClose} aria-label="Cerrar cabina fotográfica">
        <X size={24} />
      </button>

      <div className="cabina-header">
        <h1 className="section-title">Cabina Fotográfica</h1>
        <p className="section-subtitle">¡Captura momentos divertidos!</p>
      </div>

      {cameraError && (
        <div className="camera-error">
          <p>{cameraError}</p>
          <button className="retry-button" onClick={startCamera}>
            Intentar nuevamente
          </button>
        </div>
      )}

      <div className="photo-booth-content">
        <div className="camera-section">
          <div className="camera-wrapper">
            <video
              ref={videoRef}
              className={`camera-view ${isCameraActive ? 'active' : 'inactive'}`}
              autoPlay
              playsInline
              muted
              style={{ filter: activeFilter !== 'none' ? FILTERS.find(f => f.id === activeFilter)?.css : 'none' }}
              aria-label="Vista previa de la cámara"
            />
            
            {activeMask && isCameraActive && (
              <div 
                className="mask-preview"
                style={{
                  backgroundImage: `url(${MASKS.find(m => m.id === activeMask)?.url})`,
                  left: '50%',
                  top: '25%',
                  transform: 'translate(-50%, -50%)',
                  width: '60%',
                  height: '60%'
                }}
              />
            )}

            {showCountdown && (
              <div className="countdown-display">
                <div className="photo-counter">Foto {photosTaken} de 3</div>
                <div className="countdown-message">{countdownMessage}</div>
                {countdown > 0 && <div className="countdown-timer">{countdown}</div>}
              </div>
            )}

            <div className={`flash ${flashActive ? 'active' : ''}`}></div>
          </div>

          {recentPhotos.length > 0 && (
            <div className="gallery-preview">
              <h3><Image size={16} /> Tus fotos</h3>
              <div className="photo-grid">
                {recentPhotos.map((photo, index) => (
                  <div key={index} className="photo-thumbnail">
                    <img src={photo.url} alt={`Foto ${index + 1}`} loading="lazy" />
                    <span className="photo-badge">{index + 1}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="controls-section">
          <button
            className={`capture-button ${isTakingPhotos ? 'processing' : ''}`}
            onClick={takePhotoSequence}
            disabled={!isCameraActive || isTakingPhotos}
            aria-busy={isTakingPhotos}
          >
            <Zap size={20} />
            {isTakingPhotos ? `Foto ${photosTaken}/3` : 'Tomar fotos'}
          </button>

          <div className={`filters-container ${isTakingPhotos ? 'disabled' : ''}`}>
            <h3><Smile size={16} /> Filtros</h3>
            <div className="filters-scroller">
              {FILTERS.map(filter => (
                <button 
                  key={filter.id}
                  className={`filter-btn ${activeFilter === filter.id ? 'active' : ''}`}
                  onClick={() => !isTakingPhotos && setActiveFilter(filter.id)}
                  disabled={isTakingPhotos}
                  aria-label={`Filtro ${filter.name}`}
                >
                  <div className="filter-preview" style={{ filter: filter.css }} />
                  <span>{filter.name}</span>
                </button>
              ))}
            </div>
          </div>

          <div className={`masks-container ${isTakingPhotos ? 'disabled' : ''}`}>
            <h3><Smile size={16} /> Máscaras</h3>
            <div className="masks-scroller">
              {MASKS.map(mask => (
                <button 
                  key={mask.id}
                  className={`mask-btn ${activeMask === mask.id ? 'active' : ''}`}
                  onClick={() => !isTakingPhotos && setActiveMask(mask.id === activeMask ? null : mask.id)}
                  disabled={isTakingPhotos}
                  aria-label={`Máscara ${mask.name}`}
                >
                  <img src={mask.url} alt="" loading="lazy" />
                  <span>{mask.name}</span>
                </button>
              ))}
            </div>
          </div>

          <button
            className={`toggle-camera-selector ${isTakingPhotos ? 'disabled' : ''}`}
            onClick={() => !isTakingPhotos && setShowCameraSelector(!showCameraSelector)}
            disabled={availableCameras.length <= 1 || isTakingPhotos}
          >
            <Camera size={18} /> Cambiar cámara
          </button>
        </div>
      </div>

      {showCameraSelector && (
        <div className="camera-selector">
          <h4>Seleccionar cámara</h4>
          <ul className="camera-list">
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
          <button className="close-btn" onClick={() => setShowCameraSelector(false)}>
            Cerrar
          </button>
        </div>
      )}
    </section>
  );
}

export default PPublicoCabinaFotografica;