import React, { useEffect, useRef, useState } from 'react';

const PPublicoCabinaFotograficaCamera = ({ 
  cameraState, 
  onCameraStateChange, 
  onEffectTrigger, 
  onPhotosTaken 
}) => {
  const videoRef = useRef(null);
  const [error, setError] = useState(null);
  const [streaming, setStreaming] = useState(false);

  useEffect(() => {
    const constraints = {
      video: {
        width: { ideal: 1280 },
        height: { ideal: 720 },
        facingMode: "user"
      },
      audio: false
    };

    navigator.mediaDevices
      .getUserMedia(constraints)
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          setStreaming(true);
          onCameraStateChange(prev => ({ ...prev, isActive: true, error: null }));
        }
      })
      .catch((err) => {
        console.error("Error al acceder a la cámara:", err);
        setError(err.message || "No se pudo acceder a la cámara.");
        onCameraStateChange(prev => ({ ...prev, isActive: false, error: err.message }));
      });

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        videoRef.current.srcObject.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  return (
    <div className="camera-wrapper">
      <div className="camera-container">
        {error && (
          <div className="camera-error-message">
            <span className="error-icon">⚠️</span>
            <p className="error-text">Error: {error}</p>
          </div>
        )}
        
        {!streaming && !error && (
          <div className="camera-loading-message">
            <span className="loading-icon">📷</span>
            <p className="loading-text">Cargando cámara...</p>
          </div>
        )}
        
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="camera-video-element"
        />
      </div>
    </div>
  );
};

export default PPublicoCabinaFotograficaCamera;