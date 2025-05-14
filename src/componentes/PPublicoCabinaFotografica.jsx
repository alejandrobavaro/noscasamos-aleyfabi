import React, { useState, useRef, useEffect } from 'react';
import "../assets/scss/_03-Componentes/_PPublicoCabinaFotografica.scss";
import { Camera, CameraOff, Circle, Check, ChevronRight, X } from 'react-feather';
import { Loader } from 'react-feather';

function PPublicoCabinaFotografica({ onClose, fullscreenMode }) {
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [isTakingPhotos, setIsTakingPhotos] = useState(false);
  const [photosTaken, setPhotosTaken] = useState(0);
  const [showTutorial, setShowTutorial] = useState(true);
  const [capturedPhotos, setCapturedPhotos] = useState([]);
  const [cameraError, setCameraError] = useState(null);
  const [facingMode, setFacingMode] = useState('user'); // 'user' (frontal) o 'environment' (trasera)
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const countdownRef = useRef(null);

  // Obtener lista de dispositivos de cámara disponibles
  const getCameraDevices = async () => {
    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      return devices.filter(device => device.kind === 'videoinput');
    } catch (err) {
      console.error("Error al enumerar dispositivos:", err);
      return [];
    }
  };

  // Iniciar la cámara con el dispositivo seleccionado
  const startCamera = async () => {
    try {
      setCameraError(null);
      
      // Detener cámara actual si está activa
      if (streamRef.current) {
        stopCamera();
      }

      const constraints = {
        video: { 
          facingMode: facingMode,
          width: { ideal: 1280 },
          height: { ideal: 720 }
        },
        audio: false 
      };

      // Intentar con la configuración ideal primero
      let stream;
      try {
        stream = await navigator.mediaDevices.getUserMedia(constraints);
      } catch (err) {
        console.warn("Intento inicial fallido, probando con configuraciones más flexibles...");
        // Si falla, intentar con configuraciones más flexibles
        constraints.video = true; // Configuración más genérica
        stream = await navigator.mediaDevices.getUserMedia(constraints);
      }

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
        setIsCameraActive(true);
      }
    } catch (err) {
      console.error("Error al acceder a la cámara:", err);
      setCameraError(getFriendlyErrorMessage(err));
    }
  };

  // Mensajes de error amigables
  const getFriendlyErrorMessage = (error) => {
    switch(error.name) {
      case 'NotAllowedError':
        return 'Permiso de cámara denegado. Por favor habilita el acceso a la cámara en la configuración de tu navegador.';
      case 'NotFoundError':
        return 'No se encontró ninguna cámara disponible.';
      case 'NotReadableError':
        return 'La cámara no puede ser accedida porque está siendo usada por otra aplicación.';
      case 'OverconstrainedError':
        return 'La configuración solicitada no es compatible con tu dispositivo.';
      case 'SecurityError':
        return 'El acceso a la cámara está deshabilitado por razones de seguridad.';
      default:
        return 'No se pudo acceder a la cámara. Por favor intenta nuevamente.';
    }
  };

  // Detener la cámara
  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      setIsCameraActive(false);
    }
  };

  // Cambiar entre cámaras frontal/trasera en móviles
  const toggleCamera = async () => {
    setFacingMode(prev => prev === 'user' ? 'environment' : 'user');
    await startCamera();
  };

  // Tomar foto
  const takePhoto = () => {
    if (!isCameraActive || isTakingPhotos) return;

    setIsTakingPhotos(true);
    setPhotosTaken(0);
    setCapturedPhotos([]);

    // Temporizador para 3 fotos con 4 segundos de intervalo
    let count = 3;
    countdownRef.current = setInterval(() => {
      if (count > 0) {
        capturePhoto();
        setPhotosTaken(prev => prev + 1);
        count--;
      } else {
        clearInterval(countdownRef.current);
        setIsTakingPhotos(false);
      }
    }, 4000);
  };

  // Capturar foto individual
  const capturePhoto = () => {
    if (!videoRef.current) return;

    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

    const photoUrl = canvas.toDataURL('image/jpeg');
    setCapturedPhotos(prev => [...prev, photoUrl]);
  };

  // Efecto para limpiar al desmontar
  useEffect(() => {
    return () => {
      if (countdownRef.current) clearInterval(countdownRef.current);
      stopCamera();
    };
  }, []);

  // Tutorial steps
  const tutorialSteps = [
    {
      title: "Paso 1",
      description: "Permite el acceso a la cámara cuando se te solicite"
    },
    {
      title: "Paso 2",
      description: "Colócate frente a la cámara en un lugar bien iluminado"
    },
    {
      title: "Paso 3",
      description: "Presiona el botón para tomar 3 fotos automáticamente"
    },
    {
      title: "Paso 4",
      description: "Sonríe y espera el conteo entre cada foto"
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
          <button 
            className="retry-button"
            onClick={startCamera}
          >
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
                  {index < tutorialSteps.length - 1 && (
                    <ChevronRight className="step-arrow" />
                  )}
                </div>
              ))}
            </div>

            <button 
              className="start-button"
              onClick={() => {
                setShowTutorial(false);
                startCamera();
              }}
            >
              Comenzar
            </button>
          </div>
        </div>
      )}

      <div className="camera-container">
        {isCameraActive ? (
          <div className="camera-preview">
            <video 
              ref={videoRef} 
              autoPlay 
              playsInline 
              muted
              className="camera-feed"
            />
            
            <div className="camera-controls">
              <div className="camera-actions">
                {/* Botón para cambiar entre cámaras frontal/trasera en móviles */}
                <button 
                  className="switch-camera"
                  onClick={toggleCamera}
                  title="Cambiar cámara"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 20h7a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7M5 16H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1"></path>
                    <polyline points="16 16 12 12 16 8"></polyline>
                    <polyline points="8 8 12 12 8 16"></polyline>
                  </svg>
                </button>
              </div>

              <div className="photo-counter">
                {isTakingPhotos && (
                  <>
                    <Circle className={`countdown-circle ${photosTaken === 3 ? 'complete' : ''}`} />
                    <span>{photosTaken}/3 fotos</span>
                  </>
                )}
              </div>
              
              <button 
                className={`capture-button ${isTakingPhotos ? 'active' : ''}`}
                onClick={takePhoto}
                disabled={isTakingPhotos}
              >
                {isTakingPhotos ? (
                  <Loader className="spinner" />
                ) : (
                  <Camera />
                )}
              </button>
              
              <p className="capture-instruction">
                {isTakingPhotos ? 'Sonríe! 😊' : '¿Sacamos la foto? Dale clic aquí'}
              </p>
            </div>
          </div>
        ) : (
          <div className="camera-placeholder">
            <CameraOff size={48} />
            <p>Cámara no activada</p>
          </div>
        )}
      </div>

      {capturedPhotos.length > 0 && (
        <div className="photo-gallery">
          <h3>Tus fotos</h3>
          <div className="photos-grid">
            {capturedPhotos.map((photo, index) => (
              <div key={index} className="photo-item">
                <img src={photo} alt={`Foto ${index + 1}`} />
                <div className="photo-badge">{index + 1}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

export default PPublicoCabinaFotografica;