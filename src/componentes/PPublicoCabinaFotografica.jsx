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

  // Obtener lista de cámaras disponibles (optimizado para móviles y notebooks)
  const getAvailableCameras = async () => {
    try {
      // Primero solicitamos permisos con configuración básica
      const tempStream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } // Priorizar cámara trasera en móviles
      });
      
      // Detener stream temporal inmediatamente
      tempStream.getTracks().forEach(track => track.stop());
      
      const devices = await navigator.mediaDevices.enumerateDevices();
      const videoDevices = devices.filter(device => device.kind === 'videoinput');
      
      if (videoDevices.length === 0) {
        setCameraError('No se encontraron cámaras disponibles');
        return;
      }

      setAvailableCameras(videoDevices);
      
      // Seleccionar cámara trasera por defecto en móviles
      const rearCamera = videoDevices.find(device => 
        device.label.toLowerCase().includes('back') || 
        device.label.toLowerCase().includes('rear')
      );
      
      setSelectedCameraId(rearCamera?.deviceId || videoDevices[0].deviceId);
    } catch (err) {
      console.error("Error al enumerar dispositivos:", err);
      setCameraError(getFriendlyErrorMessage(err));
    }
  };

  // Iniciar la cámara (versión optimizada para todos los dispositivos)
  const startCamera = async () => {
    try {
      setCameraError(null);
      setIsCameraActive(false);
      
      // Detener cámara actual si está activa
      if (streamRef.current) {
        stopCamera();
        await new Promise(resolve => setTimeout(resolve, 300)); // Pequeña pausa
      }

      // Configuración adaptable para diferentes dispositivos
      const constraints = {
        video: {
          deviceId: selectedCameraId ? { exact: selectedCameraId } : undefined,
          width: { ideal: 1280, min: 640 },
          height: { ideal: 720, min: 480 },
          facingMode: window.innerWidth <= 768 ? 'environment' : 'user',
          frameRate: { ideal: 30, min: 15 }
        },
        audio: false
      };

      console.log("Intentando iniciar cámara con constraints:", constraints);
      
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        
        // Esperar a que el video tenga metadata
        await new Promise((resolve) => {
          const onLoaded = () => {
            videoRef.current.removeEventListener('loadedmetadata', onLoaded);
            console.log("Metadata de video cargada");
            resolve();
          };
          videoRef.current.addEventListener('loadedmetadata', onLoaded);
        });

        // Intentar reproducir el video
        try {
          await videoRef.current.play();
          console.log("Video reproducido con éxito");
          setIsCameraActive(true);
        } catch (playError) {
          console.error("Error al reproducir video:", playError);
          // Segundo intento con enfoque alternativo
          videoRef.current.muted = true;
          videoRef.current.playsInline = true;
          try {
            await videoRef.current.play();
            setIsCameraActive(true);
          } catch (secondError) {
            console.error("Segundo error al reproducir:", secondError);
            setCameraError("No se puede mostrar la vista previa");
            stopCamera();
          }
        }
      }
    } catch (err) {
      console.error("Error al acceder a la cámara:", err);
      setCameraError(getFriendlyErrorMessage(err));
      setIsCameraActive(false);
      stopCamera();
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

  // Detener la cámara completamente
  const stopCamera = () => {
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
                transform: window.innerWidth > 768 ? 'scaleX(-1)' : 'none',
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block'
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
            {availableCameras.length > 0 && (
              <button 
                className="activate-camera-button"
                onClick={startCamera}
              >
                Activar Cámara
              </button>
            )}
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