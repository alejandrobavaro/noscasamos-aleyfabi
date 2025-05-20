import React, { useRef, useEffect } from 'react';
import "../assets/scss/_03-Componentes/_PPublicoCabinaFotograficaCamera.scss";

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

const CONFIG = {
  PHOTO_SEQUENCE_COUNT: 3,
  COUNTDOWN_DURATION: 800,
  FLASH_DURATION: 300,
  PHOTO_DELAY: 1500,
  MAX_RETRIES: 2
};

const PPublicoCabinaFotograficaCamera = ({ 
  cameraState, 
  onCameraStateChange,
  onEffectTrigger,
  onPhotosTaken
}) => {
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  // Iniciar/detener cámara
  useEffect(() => {
    if (cameraState.selectedCameraId && cameraState.availableCameras.length > 0) {
      startCamera();
    }
    return () => {
      stopCamera();
    };
  }, [cameraState.selectedCameraId]);

  const startCamera = async () => {
    try {
      onCameraStateChange({ ...cameraState, error: null, isLoading: true });
      await stopCamera();
      await new Promise(resolve => setTimeout(resolve, 300));

      const constraints = {
        video: {
          deviceId: cameraState.selectedCameraId ? { exact: cameraState.selectedCameraId } : undefined,
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
            .then(() => {
              onCameraStateChange({ ...cameraState, isActive: true, isLoading: false });
            })
            .catch(err => {
              handleCameraError(err);
              stopCamera();
            });
        };

        videoRef.current.addEventListener('loadedmetadata', onLoadedMetadata);
      }
    } catch (err) {
      handleCameraError(err);
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
      onCameraStateChange({ ...cameraState, isActive: false, isLoading: false });
      resolve();
    });
  };

  const handleCameraError = (err) => {
    let errorMsg = 'No se pudo acceder a la cámara. Error: ' + err.message;
    if (err.name === 'NotAllowedError') {
      errorMsg = 'Permiso de cámara denegado. Por favor habilita el acceso.';
    } else if (err.message.includes('CameraReservedByAnotherApp')) {
      errorMsg = 'La cámara está siendo usada por otra aplicación. Cierra otras apps que usen la cámara.';
    }
    onCameraStateChange({ ...cameraState, error: errorMsg, isLoading: false });
  };

  const showCountdownMessage = async (photoNumber) => {
    const messages = [
      "¡Prepárate para la primera foto!",
      "¡Ahora la segunda foto!",
      "¡Última foto, sonríe!"
    ];
    
    onCameraStateChange({ 
      ...cameraState, 
      countdownMessage: messages[photoNumber - 1],
      showCountdown: true 
    });
    
    await new Promise(resolve => setTimeout(resolve, CONFIG.COUNTDOWN_DURATION));
    
    for (let i = 3; i > 0; i--) {
      onCameraStateChange({ ...cameraState, countdown: i });
      await new Promise(resolve => setTimeout(resolve, 600));
    }
    
    onCameraStateChange({ ...cameraState, countdown: 0, countdownMessage: "¡Di whisky!" });
    await new Promise(resolve => setTimeout(resolve, 200));
  };

  const triggerFlash = () => {
    onCameraStateChange({ ...cameraState, flashActive: true });
    setTimeout(() => onCameraStateChange({ ...cameraState, flashActive: false }), CONFIG.FLASH_DURATION);
  };

  const capturePhoto = () => {
    return new Promise((resolve, reject) => {
      if (!videoRef.current || !cameraState.isActive) {
        reject(new Error("Cámara no disponible"));
        return;
      }

      try {
        triggerFlash();
        onEffectTrigger(Math.random() > 0.5 ? 'confetti' : 'petals');
        
        const video = videoRef.current;
        const canvas = document.createElement('canvas');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const ctx = canvas.getContext('2d');

        ctx.translate(canvas.width, 0);
        ctx.scale(-1, 1);
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        
        if (cameraState.filter !== 'none') {
          const filter = FILTERS.find(f => f.id === cameraState.filter);
          if (filter?.css) {
            ctx.filter = filter.css;
            ctx.drawImage(canvas, 0, 0, canvas.width, canvas.height);
            ctx.filter = 'none';
          }
        }

        if (cameraState.mask) {
          const mask = MASKS.find(m => m.id === cameraState.mask);
          if (mask) {
            const img = new Image();
            img.crossOrigin = 'anonymous';
            img.onload = () => {
              const faceWidth = canvas.width * 0.6;
              const faceHeight = faceWidth * (img.height / img.width);
              const faceX = canvas.width / 2 - faceWidth / 2;
              const faceY = canvas.height * 0.25;
              ctx.drawImage(img, faceX, faceY, faceWidth, faceHeight);
              resolve(canvas.toDataURL('image/jpeg', 0.9));
            };
            img.onerror = () => resolve(canvas.toDataURL('image/jpeg', 0.9));
            img.src = mask.url;
            return;
          }
        }

        resolve(canvas.toDataURL('image/jpeg', 0.9));
      } catch (error) {
        reject(error);
      }
    });
  };

  const createPhotoCollage = async (photos) => {
    return new Promise((resolve) => {
      const collageCanvas = document.createElement('canvas');
      const collageCtx = collageCanvas.getContext('2d');
      
      let maxWidth = 0;
      let totalHeight = 0;
      const padding = 20;
      const titleHeight = 60;
      
      const images = [];
      let loadedImages = 0;
      
      photos.forEach(photoUrl => {
        const img = new Image();
        img.onload = () => {
          maxWidth = Math.max(maxWidth, img.width);
          totalHeight += img.height;
          loadedImages++;
          
          if (loadedImages === photos.length) {
            collageCanvas.width = maxWidth + padding * 2;
            collageCanvas.height = totalHeight + padding * (photos.length + 1) + titleHeight;
            
            collageCtx.fillStyle = 'white';
            collageCtx.fillRect(0, 0, collageCanvas.width, collageCanvas.height);
            
            collageCtx.fillStyle = 'black';
            collageCtx.font = 'bold 30px Arial';
            collageCtx.textAlign = 'center';
            collageCtx.fillText('Boda de Ale y Fabi', collageCanvas.width / 2, padding + 40);
            
            let currentY = padding + titleHeight;
            photos.forEach(photoUrl => {
              const img = new Image();
              img.onload = () => {
                collageCtx.drawImage(
                  img, 
                  (collageCanvas.width - img.width) / 2, 
                  currentY, 
                  img.width, 
                  img.height
                );
                currentY += img.height + padding;
                
                if (currentY >= totalHeight + padding * photos.length + titleHeight) {
                  resolve(collageCanvas.toDataURL('image/jpeg', 0.9));
                }
              };
              img.src = photoUrl;
            });
          }
        };
        img.src = photoUrl;
      });
    });
  };

  const takePhotoSequence = async () => {
    if (!cameraState.isActive || cameraState.isTakingPhotos) return;

    onCameraStateChange({ ...cameraState, isTakingPhotos: true });
    const newPhotos = [];

    try {
      for (let i = 0; i < CONFIG.PHOTO_SEQUENCE_COUNT; i++) {
        onCameraStateChange({ ...cameraState, photosTaken: i + 1 });
        
        await showCountdownMessage(i + 1);
        
        let photoUrl;
        try {
          photoUrl = await capturePhoto();
          newPhotos.push(photoUrl);
        } catch (error) {
          console.error("Error al capturar foto:", error);
          continue;
        }
        
        onCameraStateChange({ ...cameraState, showCountdown: false });
        
        if (i < CONFIG.PHOTO_SEQUENCE_COUNT - 1) {
          await new Promise(resolve => setTimeout(resolve, CONFIG.PHOTO_DELAY));
        }
      }

      const collageUrl = await createPhotoCollage(newPhotos);
      onPhotosTaken(collageUrl, newPhotos);

    } catch (error) {
      console.error("Error en la secuencia de fotos:", error);
    } finally {
      onCameraStateChange({ ...cameraState, isTakingPhotos: false, photosTaken: 0 });
    }
  };

  useEffect(() => {
    if (cameraState.isTakingPhotos) {
      takePhotoSequence();
    }
  }, [cameraState.isTakingPhotos]);

  return (
    <div className="camera-container">
      {cameraState.error && (
        <div className="camera-error">
          <p>{cameraState.error}</p>
          <button 
            className="camera-retry-button" 
            onClick={startCamera}
            disabled={cameraState.isLoading}
          >
            {cameraState.isLoading ? 'Cargando...' : 'Intentar nuevamente'}
          </button>
        </div>
      )}

      <div className="camera-preview-container">
        <video
          ref={videoRef}
          className={`camera-preview ${cameraState.isActive ? 'active' : 'inactive'}`}
          autoPlay
          playsInline
          muted
          style={{ filter: cameraState.filter !== 'none' ? FILTERS.find(f => f.id === cameraState.filter)?.css : 'none' }}
          aria-label="Vista previa de la cámara"
        />
        
        {cameraState.mask && cameraState.isActive && (
          <div 
            className="camera-mask"
            style={{
              backgroundImage: `url(${MASKS.find(m => m.id === cameraState.mask)?.url})`
            }}
          />
        )}

        {cameraState.showCountdown && (
          <div className="camera-countdown">
            <div className="countdown-photo-counter">Foto {cameraState.photosTaken} de {CONFIG.PHOTO_SEQUENCE_COUNT}</div>
            <div className="countdown-message">{cameraState.countdownMessage}</div>
            {cameraState.countdown > 0 && <div className="countdown-timer">{cameraState.countdown}</div>}
          </div>
        )}

        <div className={`camera-flash ${cameraState.flashActive ? 'active' : ''}`}></div>
      </div>
    </div>
  );
};

export default PPublicoCabinaFotograficaCamera;



