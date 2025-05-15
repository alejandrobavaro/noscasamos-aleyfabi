import { useEffect, useRef, useState } from "react";

const PPublicoCabinaFotografica = () => {
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

    console.log("Intentando acceder a la cámara con constraints:", constraints);

    navigator.mediaDevices
      .getUserMedia(constraints)
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          setStreaming(true);
        }
      })
      .catch((err) => {
        console.error("Error al acceder a la cámara:", err);
        setError(err.message || "No se pudo acceder a la cámara.");
      });

    // Limpiar stream cuando se desmonta el componente
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        videoRef.current.srcObject.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  return (
    <div style={{ padding: "1rem", textAlign: "center" }}>
      <h2>Cabina Fotográfica</h2>
      {error && (
        <p style={{ color: "red" }}>
          ⚠️ Error: {error}
        </p>
      )}
      {!streaming && !error && (
        <p>📷 Cargando vista previa de la cámara...</p>
      )}
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        style={{
          width: "100%",
          maxWidth: "600px",
          borderRadius: "12px",
          boxShadow: "0 0 20px rgba(0,0,0,0.2)",
          marginTop: "1rem"
        }}
      />
    </div>
  );
};

export default PPublicoCabinaFotografica;
