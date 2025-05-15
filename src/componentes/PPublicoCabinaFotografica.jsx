import React, { useState, useRef, useEffect } from 'react';
import "../assets/scss/_03-Componentes/_PPublicoCabinaFotografica.scss";
import { Camera, CameraOff, Circle, ChevronRight, X } from 'react-feather';
import { Loader } from 'react-feather';

function PPublicoCabinaFotografica({ onClose, fullscreenMode }) {
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [isTakingPhotos, setIsTakingPhotos] = useState(false);
  const [photosTaken, setPhotosTaken] = useState(0);
  const [showTutorial, setShowTutorial] = useState(true);
  const [showCameraSelector, setShowCameraSelector] = useState(false);
  const [capturedPhotos, setCapturedPhotos] = useState([]);
  const [cameraError, setCameraError] = useState(null);
  const [availableCameras, setAvailableCameras] = useState([]);
  const [selectedCameraId, setSelectedCameraId] = useState('');
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const countdownRef = useRef(null);
  const retryCountRef = useRef(0);

  // Obtener lista de cámaras disponibles
  const getAvailableCameras = async () => {
    try {
      // Primero verificamos si hay otra aplicación usando la cámara
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const tempStream = await navigator.mediaDevices.getUserMedia({ video: true })
          .catch(err => {
            console.error("Error al verificar cámara:", err);
            throw err;
          });
        
        // Liberamos el stream temporal inmediatamente
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
      if (err.name === 'NotAllowedError') {
        setCameraError('Permiso de cámara denegado. Por favor habilita el acceso.');
      } else if (err.message.includes('CameraReservedByAnotherApp')) {
        setCameraError('La cámara está siendo usada por otra aplicación. Cierra otras apps que usen la cámara.');
      } else {
        setCameraError('No se pudo acceder a la cámara. Error: ' + err.message);
      }
    }
  };

  // Iniciar la cámara con manejo de errores mejorado
  const startCamera = async () => {
    try {
      setCameraError(null);
      retryCountRef.current = 0;
      
      // Liberar recursos primero
      await stopCamera();
      await new Promise(resolve => setTimeout(resolve, 500)); // Pausa crítica

      const constraints = {
        video: {
          deviceId: selectedCameraId ? { exact: selectedCameraId } : undefined,
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: 'user'
        },
        audio: false
      };

      console.log("Intentando acceder a la cámara con constraints:", constraints);
      
      const stream = await navigator.mediaDevices.getUserMedia(constraints)
        .catch(async err => {
          if (retryCountRef.current < 2) {
            retryCountRef.current++;
            console.log(`Reintentando (${retryCountRef.current}/2)...`);
            await new Promise(resolve => setTimeout(resolve, 300));
            return startCamera();
          }
          throw err;
        });

      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        
        // Solución definitiva para la vista previa
        const handleSuccess = () => {
          console.log("Stream de cámara activo");
          setIsCameraActive(true);
        };

        const handleError = (err) => {
          console.error("Error en el stream de video:", err);
          setCameraError('Error al mostrar la vista previa');
          stopCamera();
        };

        videoRef.current.onloadedmetadata = () => {
          videoRef.current.play()
            .then(handleSuccess)
            .catch(handleError);
        };

        // Timeout de seguridad
        setTimeout(() => {
          if (!isCameraActive) {
            console.warn("Timeout de activación de cámara");
            handleError(new Error('Timeout de activación'));
          }
        }, 3000);
      }
    } catch (err) {
      console.error("Error crítico al acceder a la cámara:", err);
      if (err.message.includes('CameraReservedByAnotherApp') || 
          err.message.includes('0xA00F4243') || 
          err.message.includes('0xC00D3704')) {
        setCameraError('La cámara está siendo usada por otra aplicación. Cierra otras apps que usen la cámara.');
      } else {
        setCameraError(getFriendlyErrorMessage(err));
      }
      setIsCameraActive(false);
      await stopCamera();
    }
  };

  // Detener la cámara completamente
  const stopCamera = async () => {
    return new Promise(resolve => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => {
          track.stop();
          track.enabled = false;
        });
        streamRef.current = null;
      }
      
      if (videoRef.current) {
        videoRef.current.srcObject = null;
        videoRef.current.onloadedmetadata = null;
      }
      
      setIsCameraActive(false);
      resolve();
    });
  };

  // Cambiar cámara seleccionada
  const handleCameraChange = (deviceId) => {
    setSelectedCameraId(deviceId);
    setShowCameraSelector(false);
  };

  // Capturar foto (optimizado para móviles)
  const capturePhoto = () => {
    if (!videoRef.current || !isCameraActive) return;

    const video = videoRef.current;
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    
    // Aplicar efecto espejo solo para cámara frontal
    if (window.innerWidth > 768) { // Dispositivos no móviles
      ctx.translate(canvas.width, 0);
      ctx.scale(-1, 1);
    }
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    const photoUrl = canvas.toDataURL('image/jpeg', 0.9); // Calidad reducida para móviles
    setCapturedPhotos(prev => [...prev, photoUrl]);
  };

  // Tomar 3 fotos automáticas
  const takePhoto = () => {
    if (!isCameraActive || isTakingPhotos) return;

    setIsTakingPhotos(true);
    setPhotosTaken(0);
    setCapturedPhotos([]);

    let count = 0;
    const takePhotoSequence = () => {
      if (count < 3) {
        capturePhoto();
        setPhotosTaken(count + 1);
        count++;
        setTimeout(takePhotoSequence, 4000);
      } else {
        setIsTakingPhotos(false);
      }
    };

    takePhotoSequence();
  };

  // Efectos para manejar ciclo de vida
  useEffect(() => {
    getAvailableCameras();
    return () => {
      if (countdownRef.current) clearInterval(countdownRef.current);
      stopCamera();
    };
  }, []);

  useEffect(() => {
    if (selectedCameraId && availableCameras.length > 0) {
      startCamera();
    }
  }, [selectedCameraId]);

  // Tutorial steps
  const tutorialSteps = [
    {
      title: "Paso 1",
      description: "Permite el acceso a la cámara cuando se te solicite"
    },
    {
      title: "Paso 2",
      description: "Selecciona la cámara que deseas usar"
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
              style={{ 
                transform: 'scaleX(-1)',
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                backgroundColor: '#000'
              }}
            />
            
            <div className="camera-controls">
              <div className="camera-actions">
                {availableCameras.length > 1 && (
                  <div className="camera-selector-container">
                    <button 
                      className="switch-camera"
                      onClick={() => setShowCameraSelector(!showCameraSelector)}
                      title="Cambiar cámara"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 20h7a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7M5 16H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1"></path>
                        <polyline points="16 16 12 12 16 8"></polyline>
                        <polyline points="8 8 12 12 8 16"></polyline>
                      </svg>
                    </button>
                    
                    {showCameraSelector && (
                      <div className="camera-selector-dropdown">
                        {availableCameras.map((camera) => (
                          <button
                            key={camera.deviceId}
                            className={`camera-option ${selectedCameraId === camera.deviceId ? 'selected' : ''}`}
                            onClick={() => handleCameraChange(camera.deviceId)}
                          >
                            {camera.label || `Cámara ${availableCameras.indexOf(camera) + 1}`}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )}
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
          <p>{cameraError || 'Cámara no activada'}</p>
          <button 
            className="activate-camera-button"
            onClick={startCamera}
            disabled={!!cameraError?.includes('otra aplicación')}
          >
            {cameraError?.includes('otra aplicación') ? 'Cierra otras apps primero' : 'Activar Cámara'}
          </button>
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