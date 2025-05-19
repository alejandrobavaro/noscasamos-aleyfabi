// import React, { useState, useRef, useEffect } from 'react';
// import "../assets/scss/_03-Componentes/_PPublicoCabinaFotografica.scss";
// import { Camera, X, Zap, Smile, Image, Share2, Download, Repeat, User, Phone } from 'react-feather';

// const FILTERS = [
//   { id: 'none', name: 'Normal', css: 'none' },
//   { id: 'vintage', name: 'Vintage', css: 'sepia(0.5) contrast(1.2)' },
//   { id: 'blackwhite', name: 'B/N', css: 'grayscale(100%)' }
// ];

// const MASKS = [
//   { id: 'sunglasses', name: 'Gafas', url: '/img/08-cabinafotos/cabinafotos-gorro1.png' },
//   { id: 'mustache', name: 'Bigote', url: '/img/08-cabinafotos/cabinafotos-lentes1.png' },
//   { id: 'hat', name: 'Sombrero', url: '/img/08-cabinafotos/cabinafotos-lentesgif1.gif' },
//   { id: 'hearts', name: 'Corazones', url: '/img/08-cabinafotos/cabinafotos-perrito1.png' },
//   { id: 'crown', name: 'Corona', url: '/img/08-cabinafotos/cabinafotos-cuadro1.png' },
//   { id: 'dog', name: 'Perro', url: '/img/08-cabinafotos/cabinafotos-confetis1.png' }
// ];

// const LOCAL_STORAGE_KEY = 'cabinaFotograficaFotos';

// const TUTORIAL_STEPS = [
//   {
//     title: "Permite el acceso a la cámara",
//     description: "Cuando se te solicite, permite que la aplicación use tu cámara."
//   },
//   {
//     title: "Selecciona un filtro divertido",
//     description: "Elige entre filtros y máscaras para tus fotos."
//   },
//   {
//     title: "Presiona el botón para fotos",
//     description: "Se tomarán 3 fotos automáticamente."
//   },
//   {
//     title: "¡Sonríe y diviértete!",
//     description: "Las fotos se guardarán automáticamente."
//   }
// ];

// function PPublicoCabinaFotografica({ onClose, fullscreenMode }) {
//   const [showTutorial, setShowTutorial] = useState(true);
//   const [isCameraActive, setIsCameraActive] = useState(false);
//   const [isTakingPhotos, setIsTakingPhotos] = useState(false);
//   const [photosTaken, setPhotosTaken] = useState(0);
//   const [showCameraSelector, setShowCameraSelector] = useState(false);
//   const [cameraError, setCameraError] = useState(null);
//   const [availableCameras, setAvailableCameras] = useState([]);
//   const [selectedCameraId, setSelectedCameraId] = useState('');
//   const [videoReady, setVideoReady] = useState(false);
//   const [activeFilter, setActiveFilter] = useState('none');
//   const [activeMask, setActiveMask] = useState(null);
//   const [showCountdown, setShowCountdown] = useState(false);
//   const [countdown, setCountdown] = useState(0);
//   const [countdownMessage, setCountdownMessage] = useState('');
//   const [flashActive, setFlashActive] = useState(false);
//   const [recentPhotos, setRecentPhotos] = useState([]);

//   const videoRef = useRef(null);
//   const streamRef = useRef(null);

//   // Cargar fotos guardadas al inicio
//   useEffect(() => {
//     const savedPhotos = localStorage.getItem(LOCAL_STORAGE_KEY);
//     if (savedPhotos) {
//       setRecentPhotos(JSON.parse(savedPhotos).slice(0, 3));
//     }
//   }, []);

//   // Guardar fotos en localStorage cuando cambian
//   useEffect(() => {
//     if (recentPhotos.length > 0) {
//       localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(recentPhotos));
//     }
//   }, [recentPhotos]);

//   // Obtener cámaras disponibles con manejo de errores mejorado
//   const getAvailableCameras = async () => {
//     try {
//       if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
//         // Solicitar permiso temporal para que aparezcan los labels de cámaras
//         const tempStream = await navigator.mediaDevices.getUserMedia({ video: true });
//         tempStream.getTracks().forEach(track => track.stop());

//         const devices = await navigator.mediaDevices.enumerateDevices();
//         const videoDevices = devices.filter(device => device.kind === 'videoinput');

//         if (videoDevices.length === 0) {
//           setCameraError('No se encontraron cámaras disponibles');
//           return;
//         }

//         setAvailableCameras(videoDevices);
//         if (videoDevices.length > 0 && !selectedCameraId) {
//           setSelectedCameraId(videoDevices[0].deviceId);
//         }
//       }
//     } catch (err) {
//       console.error("Error al enumerar dispositivos:", err);
//       if (err.name === 'NotAllowedError') {
//         setCameraError('Permiso de cámara denegado. Por favor habilita el acceso.');
//       } else if (err.message.includes('CameraReservedByAnotherApp')) {
//         setCameraError('La cámara está siendo usada por otra aplicación. Cierra otras apps que usen la cámara.');
//       } else {
//         setCameraError('No se pudo acceder a la cámara. Error: ' + err.message);
//       }
//     }
//   };

//   // Iniciar la cámara con manejo de errores mejorado
//   const startCamera = async () => {
//     try {
//       setCameraError(null);
//       await stopCamera();
//       await new Promise(resolve => setTimeout(resolve, 300)); // pequeña pausa

//       const constraints = {
//         video: {
//           deviceId: selectedCameraId ? { exact: selectedCameraId } : undefined,
//           width: { ideal: 1280 },
//           height: { ideal: 720 },
//           facingMode: 'user'
//         },
//         audio: false
//       };

//       const stream = await navigator.mediaDevices.getUserMedia(constraints);
//       streamRef.current = stream;

//       if (videoRef.current) {
//         videoRef.current.srcObject = stream;

//         const onLoadedMetadata = () => {
//           videoRef.current.play()
//             .then(() => {
//               setIsCameraActive(true);
//             })
//             .catch(err => {
//               console.error("Error al reproducir video:", err);
//               setCameraError('Error al reproducir la cámara');
//               stopCamera();
//             });
//         };

//         videoRef.current.addEventListener('loadedmetadata', onLoadedMetadata);
//       }
//     } catch (err) {
//       console.error("Error crítico al acceder a la cámara:", err);
//       if (
//         err.message.includes('CameraReservedByAnotherApp') ||
//         err.message.includes('0xA00F4243') ||
//         err.message.includes('0xC00D3704')
//       ) {
//         setCameraError('La cámara está siendo usada por otra aplicación. Cierra otras apps que usen la cámara.');
//       } else if (err.name === 'NotAllowedError') {
//         setCameraError('Permiso de cámara denegado. Por favor habilita el acceso.');
//       } else {
//         setCameraError('No se pudo acceder a la cámara. Error: ' + err.message);
//       }
//       setIsCameraActive(false);
//       await stopCamera();
//     }
//   };

//   // Detener la cámara completamente
//   const stopCamera = async () => {
//     return new Promise(resolve => {
//       if (streamRef.current) {
//         streamRef.current.getTracks().forEach(track => {
//           track.stop();
//           track.enabled = false;
//         });
//         streamRef.current = null;
//       }
//       if (videoRef.current) {
//         videoRef.current.srcObject = null;
//       }
//       setIsCameraActive(false);
//       resolve();
//     });
//   };

//   // Cambiar cámara seleccionada
//   const handleCameraChange = (deviceId) => {
//     setSelectedCameraId(deviceId);
//     setShowCameraSelector(false);
//     startCamera();
//   };

//   // Mostrar mensaje de cuenta regresiva
//   const showCountdownMessage = async (photoNumber) => {
//     const messages = [
//       "¡Prepárate para la primera foto!",
//       "¡Ahora la segunda foto!",
//       "¡Última foto, sonríe!"
//     ];
    
//     setCountdownMessage(messages[photoNumber - 1]);
//     setShowCountdown(true);
//     await new Promise(resolve => setTimeout(resolve, 800));
    
//     for (let i = 3; i > 0; i--) {
//       setCountdown(i);
//       await new Promise(resolve => setTimeout(resolve, 600));
//     }
    
//     setCountdown(0);
//     setCountdownMessage("¡Di whisky!");
//     await new Promise(resolve => setTimeout(resolve, 200));
//   };

//   // Activar efecto flash
//   const triggerFlash = () => {
//     setFlashActive(true);
//     setTimeout(() => setFlashActive(false), 300);
//   };

//   // Capturar foto (optimizado para móviles)
//   const capturePhoto = () => {
//     return new Promise((resolve, reject) => {
//       if (!videoRef.current || !isCameraActive) {
//         reject(new Error("Cámara no disponible"));
//         return;
//       }

//       try {
//         triggerFlash();
//         const video = videoRef.current;
//         const canvas = document.createElement('canvas');
//         canvas.width = video.videoWidth;
//         canvas.height = video.videoHeight;
//         const ctx = canvas.getContext('2d');

//         // Aplicar efecto espejo
//         ctx.translate(canvas.width, 0);
//         ctx.scale(-1, 1);
//         ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        
//         // Aplicar filtro si existe
//         if (activeFilter !== 'none') {
//           const filter = FILTERS.find(f => f.id === activeFilter);
//           if (filter?.css) {
//             ctx.filter = filter.css;
//             ctx.drawImage(canvas, 0, 0, canvas.width, canvas.height);
//             ctx.filter = 'none';
//           }
//         }

//         // Aplicar máscara si existe
//         if (activeMask) {
//           const mask = MASKS.find(m => m.id === activeMask);
//           if (mask) {
//             const img = new Image();
//             img.crossOrigin = 'anonymous';
//             img.onload = () => {
//               const faceWidth = canvas.width * 0.6;
//               const faceHeight = faceWidth * (img.height / img.width);
//               const faceX = canvas.width / 2 - faceWidth / 2;
//               const faceY = canvas.height * 0.25;
//               ctx.drawImage(img, faceX, faceY, faceWidth, faceHeight);
//               const photoUrl = canvas.toDataURL('image/jpeg', 0.9);
//               resolve(photoUrl);
//             };
//             img.onerror = () => {
//               const photoUrl = canvas.toDataURL('image/jpeg', 0.9);
//               resolve(photoUrl);
//             };
//             img.src = mask.url;
//             return;
//           }
//         }

//         const photoUrl = canvas.toDataURL('image/jpeg', 0.9);
//         resolve(photoUrl);
//       } catch (error) {
//         reject(error);
//       }
//     });
//   };

//   // Tomar secuencia de fotos con reintentos
//   const takePhotoSequence = async () => {
//     if (!isCameraActive || isTakingPhotos) return;

//     setIsTakingPhotos(true);
//     const newPhotos = [];

//     try {
//       for (let i = 0; i < 3; i++) {
//         setPhotosTaken(i + 1);
        
//         await showCountdownMessage(i + 1);
        
//         let photoUrl;
//         try {
//           photoUrl = await capturePhoto();
//           newPhotos.push(photoUrl);
//         } catch (error) {
//           console.error("Error al capturar foto:", error);
//           // Intentar una vez más
//           try {
//             photoUrl = await capturePhoto();
//             newPhotos.push(photoUrl);
//           } catch (error) {
//             console.error("Error al capturar foto (segundo intento):", error);
//             // Continuar con la siguiente foto
//             continue;
//           }
//         }
        
//         setShowCountdown(false);
        
//         if (i < 2) {
//           await new Promise(resolve => setTimeout(resolve, 1500));
//         }
//       }

//       setRecentPhotos(prev => [
//         ...newPhotos.map((photo, idx) => ({ 
//           url: photo, 
//           number: prev.length + idx + 1 
//         })),
//         ...prev
//       ].slice(0, 3));
//     } catch (error) {
//       console.error("Error en la secuencia de fotos:", error);
//     } finally {
//       setIsTakingPhotos(false);
//       setPhotosTaken(0);
//     }
//   };

//   // Descargar foto
//   const downloadPhoto = (photoUrl, index) => {
//     const link = document.createElement('a');
//     link.href = photoUrl;
//     link.download = `foto-boda-${new Date().toISOString().slice(0, 10)}-${index + 1}.jpg`;
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   };

//   // Cuando el video está disponible en el DOM
//   useEffect(() => {
//     if (videoRef.current) setVideoReady(true);
//   }, [videoRef.current]);

//   // Obtener cámaras disponibles al montar
//   useEffect(() => {
//     getAvailableCameras();
//     return () => {
//       stopCamera();
//     };
//   }, []);

//   // Arrancar cámara solo si video está listo y cámara seleccionada
//   useEffect(() => {
//     if (videoReady && selectedCameraId && availableCameras.length > 0) {
//       startCamera();
//     }
//   }, [videoReady, selectedCameraId, availableCameras]);

//   if (showTutorial) {
//     return (
//       <div className="tutorial-overlay">
//         <div className="tutorial-container">
//           <h2>¿Cómo usar la cabina fotográfica?</h2>
//           <div className="tutorial-steps">
//             {TUTORIAL_STEPS.map((step, index) => (
//               <div key={index} className="tutorial-step">
//                 <div className="step-number">{index + 1}</div>
//                 <div className="step-content">
//                   <h3>{step.title}</h3>
//                   <p>{step.description}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//           <button 
//             className="start-button"
//             onClick={() => {
//               setShowTutorial(false);
//               getAvailableCameras();
//             }}
//           >
//             Comenzar
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <section className={`cabina-fotografica-container ${fullscreenMode ? 'fullscreen' : ''}`}>
//       <button className="close-fullscreen" onClick={onClose} aria-label="Cerrar cabina fotográfica">
//         <X size={24} />
//       </button>

//       <div className="cabina-header">
//         <h1 className="section-title">Cabina Fotográfica</h1>
//         <p className="section-subtitle">¡Captura momentos divertidos!</p>
//       </div>

//       {cameraError && (
//         <div className="camera-error">
//           <p>{cameraError}</p>
//           <button className="retry-button" onClick={startCamera}>
//             Intentar nuevamente
//           </button>
//         </div>
//       )}

//       <div className="photo-booth-content">
//         <div className="camera-section">
//           <div className="camera-wrapper">
//             <video
//               ref={videoRef}
//               className={`camera-view ${isCameraActive ? 'active' : 'inactive'}`}
//               autoPlay
//               playsInline
//               muted
//               style={{ filter: activeFilter !== 'none' ? FILTERS.find(f => f.id === activeFilter)?.css : 'none' }}
//               aria-label="Vista previa de la cámara"
//             />
            
//             {activeMask && isCameraActive && (
//               <div 
//                 className="mask-preview"
//                 style={{
//                   backgroundImage: `url(${MASKS.find(m => m.id === activeMask)?.url})`,
//                   left: '50%',
//                   top: '25%',
//                   transform: 'translate(-50%, -50%)',
//                   width: '60%',
//                   height: '60%'
//                 }}
//               />
//             )}

//             {showCountdown && (
//               <div className="countdown-display">
//                 <div className="photo-counter">Foto {photosTaken} de 3</div>
//                 <div className="countdown-message">{countdownMessage}</div>
//                 {countdown > 0 && <div className="countdown-timer">{countdown}</div>}
//               </div>
//             )}

//             <div className={`flash ${flashActive ? 'active' : ''}`}></div>
//           </div>

//           {recentPhotos.length > 0 && (
//             <div className="gallery-preview">
//               <h3><Image size={16} /> Tus fotos</h3>
//               <div className="photo-grid">
//                 {recentPhotos.map((photo, index) => (
//                   <div key={index} className="photo-thumbnail">
//                     <img src={photo.url} alt={`Foto ${index + 1}`} loading="lazy" />
//                     <span className="photo-badge">{index + 1}</span>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}
//         </div>

//         <div className="controls-section">
//           <button
//             className={`capture-button ${isTakingPhotos ? 'processing' : ''}`}
//             onClick={takePhotoSequence}
//             disabled={!isCameraActive || isTakingPhotos}
//             aria-busy={isTakingPhotos}
//           >
//             <Zap size={20} />
//             {isTakingPhotos ? `Foto ${photosTaken}/3` : 'Tomar fotos'}
//           </button>

//           <div className={`filters-container ${isTakingPhotos ? 'disabled' : ''}`}>
//             <h3><Smile size={16} /> Filtros</h3>
//             <div className="filters-scroller">
//               {FILTERS.map(filter => (
//                 <button 
//                   key={filter.id}
//                   className={`filter-btn ${activeFilter === filter.id ? 'active' : ''}`}
//                   onClick={() => !isTakingPhotos && setActiveFilter(filter.id)}
//                   disabled={isTakingPhotos}
//                   aria-label={`Filtro ${filter.name}`}
//                 >
//                   <div className="filter-preview" style={{ filter: filter.css }} />
//                   <span>{filter.name}</span>
//                 </button>
//               ))}
//             </div>
//           </div>

//           <div className={`masks-container ${isTakingPhotos ? 'disabled' : ''}`}>
//             <h3><Smile size={16} /> Máscaras</h3>
//             <div className="masks-scroller">
//               {MASKS.map(mask => (
//                 <button 
//                   key={mask.id}
//                   className={`mask-btn ${activeMask === mask.id ? 'active' : ''}`}
//                   onClick={() => !isTakingPhotos && setActiveMask(mask.id === activeMask ? null : mask.id)}
//                   disabled={isTakingPhotos}
//                   aria-label={`Máscara ${mask.name}`}
//                 >
//                   <img src={mask.url} alt="" loading="lazy" />
//                   <span>{mask.name}</span>
//                 </button>
//               ))}
//             </div>
//           </div>

//           <button
//             className={`toggle-camera-selector ${isTakingPhotos ? 'disabled' : ''}`}
//             onClick={() => !isTakingPhotos && setShowCameraSelector(!showCameraSelector)}
//             disabled={availableCameras.length <= 1 || isTakingPhotos}
//           >
//             <Camera size={18} /> Cambiar cámara
//           </button>
//         </div>
//       </div>

//       {showCameraSelector && (
//         <div className="camera-selector">
//           <h4>Seleccionar cámara</h4>
//           <ul className="camera-list">
//             {availableCameras.map((camera) => (
//               <li
//                 key={camera.deviceId}
//                 className={selectedCameraId === camera.deviceId ? 'selected' : ''}
//                 onClick={() => handleCameraChange(camera.deviceId)}
//               >
//                 {camera.label || `Cámara ${camera.deviceId}`}
//               </li>
//             ))}
//           </ul>
//           <button className="close-btn" onClick={() => setShowCameraSelector(false)}>
//             Cerrar
//           </button>
//         </div>
//       )}
//     </section>
//   );
// }

// export default PPublicoCabinaFotografica;



import React, { useState, useRef, useEffect } from 'react';
import "../assets/scss/_03-Componentes/_PPublicoCabinaFotografica.scss";
import { Camera, X, Zap, Smile, Image, Share2, Download, Repeat, User, Phone } from 'react-feather';

// Configuración Firebase (modular)
import { initializeApp } from 'firebase/app';
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

// Configuración Firebase (reemplaza con tus credenciales)
const firebaseConfig = {
  apiKey: "TU_API_KEY",
  authDomain: "TU_DOMAIN.firebaseapp.com",
  projectId: "TU_PROJECT_ID",
  storageBucket: "TU_BUCKET.appspot.com",
  messagingSenderId: "TU_SENDER_ID",
  appId: "TU_APP_ID"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const db = getFirestore(app);

// Configuración ampliada
const CONFIG = {
  PHOTO_SEQUENCE_COUNT: 3,
  COUNTDOWN_DURATION: 800,
  FLASH_DURATION: 300,
  PHOTO_DELAY: 1500,
  MAX_RETRIES: 2,
  MAX_PHOTOS_IN_GALLERY: 6,
  MAX_STORED_PHOTOS: 20
};

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

const EFFECTS = {
  confetti: { name: 'Confeti', colors: ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff'] },
  petals: { name: 'Pétalos', colors: ['#ff69b4', '#ff1493', '#db7093', '#ffb6c1'] }
};

const LOCAL_STORAGE_KEY = 'cabinaFotograficaFotos';
const GUEST_DATA_KEY = 'cabinaFotograficaInvitados';

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

// Componente de efectos visuales
const ConfettiEffect = () => (
  <div className="confetti-effect">
    {[...Array(100)].map((_, i) => {
      const style = {
        left: `${Math.random() * 100}%`,
        animationDuration: `${Math.random() * 3 + 2}s`,
        backgroundColor: EFFECTS.confetti.colors[Math.floor(Math.random() * EFFECTS.confetti.colors.length)],
        width: `${Math.random() * 10 + 5}px`,
        height: `${Math.random() * 10 + 5}px`,
        animationDelay: `${Math.random() * 0.5}s`
      };
      return <div key={i} className="confetti" style={style} />;
    })}
  </div>
);

const PetalsEffect = () => (
  <div className="petals-effect">
    {[...Array(30)].map((_, i) => {
      const style = {
        left: `${Math.random() * 100}%`,
        animationDuration: `${Math.random() * 5 + 3}s`,
        color: EFFECTS.petals.colors[Math.floor(Math.random() * EFFECTS.petals.colors.length)],
        fontSize: `${Math.random() * 20 + 10}px`,
        animationDelay: `${Math.random() * 2}s`
      };
      return (
        <div key={i} className="petal" style={style}>
          {Math.random() > 0.5 ? '🌸' : '🌺'}
        </div>
      );
    })}
  </div>
);

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
  const [activeEffect, setActiveEffect] = useState(null);
  const [shareOptions, setShareOptions] = useState(false);
  const [retakeMode, setRetakeMode] = useState(false);
  const [selectedPhotos, setSelectedPhotos] = useState([]);
  const [showGuestForm, setShowGuestForm] = useState(false);
  const [guestData, setGuestData] = useState({ name: '', phone: '' });
  const [uploading, setUploading] = useState(false);
  const [cameraLoading, setCameraLoading] = useState(false);

  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const galleryRef = useRef(null);
  const countdownRef = useRef(null);
  const retryCountRef = useRef(0);

  // Cargar datos iniciales
  useEffect(() => {
    const savedPhotos = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (savedPhotos) {
      setRecentPhotos(JSON.parse(savedPhotos).slice(0, CONFIG.MAX_PHOTOS_IN_GALLERY));
    }

    const savedGuestData = localStorage.getItem(GUEST_DATA_KEY);
    if (savedGuestData) {
      setGuestData(JSON.parse(savedGuestData));
    }
  }, []);

  // Guardar datos cuando cambian
  useEffect(() => {
    if (recentPhotos.length > 0) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(recentPhotos));
    }
  }, [recentPhotos]);

  useEffect(() => {
    if (guestData.name || guestData.phone) {
      localStorage.setItem(GUEST_DATA_KEY, JSON.stringify(guestData));
    }
  }, [guestData]);

  // Obtener lista de cámaras disponibles
  const getAvailableCameras = async () => {
    try {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        setCameraLoading(true);
        // Solicitar permiso temporal para que aparezcan los labels de cámaras
        const tempStream = await navigator.mediaDevices.getUserMedia({ video: true });
        tempStream.getTracks().forEach(track => track.stop());

        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoDevices = devices.filter(device => device.kind === 'videoinput');

        if (videoDevices.length === 0) {
          setCameraError('No se encontraron cámaras disponibles');
          setCameraLoading(false);
          return;
        }

        setAvailableCameras(videoDevices);
        if (videoDevices.length > 0 && !selectedCameraId) {
          setSelectedCameraId(videoDevices[0].deviceId);
        }
        setCameraLoading(false);
      }
    } catch (err) {
      console.error("Error al enumerar dispositivos:", err);
      handleCameraError(err);
    }
  };

  // Iniciar la cámara con manejo de errores mejorado
  const startCamera = async () => {
    try {
      setCameraError(null);
      retryCountRef.current = 0;
      setCameraLoading(true);

      await stopCamera();
      await new Promise(resolve => setTimeout(resolve, 300)); // pequeña pausa

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
            .then(() => {
              setIsCameraActive(true);
              setCameraLoading(false);
            })
            .catch(err => {
              console.error("Error al reproducir video:", err);
              setCameraError('Error al reproducir la cámara');
              stopCamera();
              setCameraLoading(false);
            });
        };

        videoRef.current.addEventListener('loadedmetadata', onLoadedMetadata);
      }
    } catch (err) {
      console.error("Error crítico al acceder a la cámara:", err);
      handleCameraError(err);
      setIsCameraActive(false);
      await stopCamera();
    }
  };

  // Manejo de errores de cámara
  const handleCameraError = (err) => {
    if (err.name === 'NotAllowedError') {
      setCameraError('Permiso de cámara denegado. Por favor habilita el acceso.');
    } else if (err.message.includes('CameraReservedByAnotherApp') || err.message.includes('0xA00F4243') || err.message.includes('0xC00D3704')) {
      setCameraError('La cámara está siendo usada por otra aplicación. Cierra otras apps que usen la cámara.');
    } else if (err.name === 'NotFoundError' || err.name === 'OverconstrainedError') {
      setCameraError('No se encontró una cámara compatible.');
    } else {
      setCameraError('No se pudo acceder a la cámara. Error: ' + err.message);
    }
    setCameraLoading(false);
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
      }
      setIsCameraActive(false);
      setCameraLoading(false);
      resolve();
    });
  };

  // Cambiar cámara seleccionada
  const handleCameraChange = (deviceId) => {
    setSelectedCameraId(deviceId);
    setShowCameraSelector(false);
    startCamera();
  };

  // Mostrar mensaje de cuenta regresiva
  const showCountdownMessage = async (photoNumber) => {
    const messages = [
      "¡Prepárate para la primera foto!",
      "¡Ahora la segunda foto!",
      "¡Última foto, sonríe!"
    ];
    
    setCountdownMessage(messages[photoNumber - 1]);
    setShowCountdown(true);
    await new Promise(resolve => setTimeout(resolve, CONFIG.COUNTDOWN_DURATION));
    
    for (let i = 3; i > 0; i--) {
      setCountdown(i);
      await new Promise(resolve => setTimeout(resolve, 600));
    }
    
    setCountdown(0);
    setCountdownMessage("¡Di whisky!");
    await new Promise(resolve => setTimeout(resolve, 200));
  };

  // Efecto flash
  const triggerFlash = () => {
    setFlashActive(true);
    setTimeout(() => setFlashActive(false), CONFIG.FLASH_DURATION);
  };

  // Efectos visuales
  const triggerEffect = (effectId) => {
    setActiveEffect(effectId);
    setTimeout(() => setActiveEffect(null), 2000);
  };

  // Capturar foto (optimizado para móviles)
  const capturePhoto = () => {
    return new Promise((resolve, reject) => {
      if (!videoRef.current || !isCameraActive) {
        reject(new Error("Cámara no disponible"));
        return;
      }

      try {
        triggerFlash();
        triggerEffect(Math.random() > 0.5 ? 'confetti' : 'petals');
        
        const video = videoRef.current;
        const canvas = document.createElement('canvas');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const ctx = canvas.getContext('2d');

        // Aplicar efecto espejo
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

  // Capturar foto con reintentos
  const capturePhotoWithRetry = async (retryCount = 0) => {
    try {
      return await capturePhoto();
    } catch (error) {
      if (retryCount < CONFIG.MAX_RETRIES) {
        console.warn(`Reintento ${retryCount + 1} de captura`);
        return capturePhotoWithRetry(retryCount + 1);
      }
      throw error;
    }
  };

  // Subir foto a Firebase
  const uploadPhotoToFirebase = async (photoUrl) => {
    try {
      setUploading(true);
      const response = await fetch(photoUrl);
      const blob = await response.blob();
      
      // Crear nombre único para el archivo
      const timestamp = new Date().getTime();
      const fileName = `boda_${guestData.name || 'invitado'}_${timestamp}.jpg`;
      const fileRef = storageRef(storage, `fotos-boda/${fileName}`);
      
      // Subir el archivo
      const snapshot = await uploadBytes(fileRef, blob);
      const downloadUrl = await getDownloadURL(snapshot.ref);
      
      // Guardar en la base de datos
      await addDoc(collection(db, 'fotos'), {
        url: downloadUrl,
        name: guestData.name,
        phone: guestData.phone,
        timestamp: new Date().toISOString()
      });
      
      return downloadUrl;
    } catch (error) {
      console.error("Error al subir foto:", error);
      throw error;
    } finally {
      setUploading(false);
    }
  };

  // Tomar secuencia de fotos
  const takePhotoSequence = async () => {
    if (!isCameraActive || isTakingPhotos) return;

    setIsTakingPhotos(true);
    const newPhotos = [];

    try {
      for (let i = 0; i < CONFIG.PHOTO_SEQUENCE_COUNT; i++) {
        setPhotosTaken(i + 1);
        
        await showCountdownMessage(i + 1);
        
        let photoUrl;
        try {
          photoUrl = await capturePhotoWithRetry();
          newPhotos.push(photoUrl);
        } catch (error) {
          console.error("Error al capturar foto:", error);
          continue;
        }
        
        setShowCountdown(false);
        
        if (i < CONFIG.PHOTO_SEQUENCE_COUNT - 1) {
          await new Promise(resolve => setTimeout(resolve, CONFIG.PHOTO_DELAY));
        }
      }

      // Subir fotos a Firebase si hay datos de invitado
      if (guestData.name || guestData.phone) {
        try {
          const uploadedPhotos = await Promise.all(
            newPhotos.map(photo => uploadPhotoToFirebase(photo))
          );
          newPhotos.forEach((photo, index) => {
            newPhotos[index] = uploadedPhotos[index] || photo;
          });
        } catch (error) {
          console.error("Error al subir fotos:", error);
        }
      }

      setRecentPhotos(prev => [
        ...newPhotos.map((photo, idx) => ({ 
          url: photo, 
          number: prev.length + idx + 1 
        })),
        ...prev
      ].slice(0, CONFIG.MAX_PHOTOS_IN_GALLERY));

    } catch (error) {
      console.error("Error en la secuencia de fotos:", error);
    } finally {
      setIsTakingPhotos(false);
      setPhotosTaken(0);
      setRetakeMode(false);
    }
  };

  // Descargar foto
  const downloadPhoto = (photoUrl, index) => {
    const link = document.createElement('a');
    link.href = photoUrl;
    link.download = `foto-boda-${guestData.name || 'invitado'}-${index + 1}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Compartir en redes sociales
  const shareOnSocial = async (photoUrl, platform) => {
    try {
      if (platform === 'whatsapp') {
        const message = `Mira mi foto de la boda de ${guestData.name || 'los novios'}!`;
        window.open(`https://wa.me/?text=${encodeURIComponent(message)}%20${photoUrl}`);
      } else if (platform === 'facebook') {
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(photoUrl)}`);
      } else if (platform === 'twitter') {
        const text = `¡Qué divertido en la boda! ${photoUrl}`;
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`);
      } else if (platform === 'instagram') {
        // Instagram no permite compartir directamente, mostramos mensaje
        alert('Para compartir en Instagram, descarga la foto y compártela desde la app');
        downloadPhoto(photoUrl, 0);
      } else {
        await navigator.share({
          title: `Foto de la boda - ${guestData.name || 'Invitado'}`,
          url: photoUrl
        });
      }
    } catch (error) {
      console.error('Error al compartir:', error);
      downloadPhoto(photoUrl, 0);
    }
  };

  // Seleccionar/deseleccionar foto
  const togglePhotoSelection = (photoUrl) => {
    setSelectedPhotos(prev => 
      prev.includes(photoUrl) 
        ? prev.filter(url => url !== photoUrl)
        : [...prev, photoUrl]
    );
  };

  // Modo repetición
  const handleRetake = () => {
    setRetakeMode(true);
    setPhotosTaken(0);
  };

  // Función para manejar la impresión
  const handlePrint = () => {
    if (selectedPhotos.length > 0) {
      selectedPhotos.forEach((photo, index) => {
        downloadPhoto(photo, index);
      });
    } else {
      alert('Por favor selecciona al menos una foto para imprimir');
    }
  };

  // Manejar cambio de datos del invitado
  const handleGuestDataChange = (e) => {
    const { name, value } = e.target;
    setGuestData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Efectos para inicialización y limpieza
  useEffect(() => {
    if (videoRef.current) setVideoReady(true);
  }, [videoRef.current]);

  useEffect(() => {
    // Verificar si el navegador soporta la API de medios
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setCameraError('Tu navegador no soporta acceso a la cámara');
      return;
    }

    getAvailableCameras();
    
    return () => {
      // Limpieza al desmontar el componente
      if (countdownRef.current) clearInterval(countdownRef.current);
      stopCamera();
    };
  }, []);

  useEffect(() => {
    if (selectedCameraId && availableCameras.length > 0) {
      startCamera();
    }
  }, [selectedCameraId, availableCameras]);

  // Tutorial
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
              setShowGuestForm(true);
            }}
          >
            Comenzar
          </button>
        </div>
      </div>
    );
  }

  // Formulario de invitado
  if (showGuestForm) {
    return (
      <div className="guest-form-overlay">
        <div className="guest-form-container">
          <h2>¡Antes de comenzar!</h2>
          <p>Por favor ingresa tus datos para compartir las fotos</p>
          
          <div className="form-group">
            <label>
              <User size={16} /> Tu nombre
            </label>
            <input
              type="text"
              name="name"
              value={guestData.name}
              onChange={handleGuestDataChange}
              placeholder="Ej: María González"
            />
          </div>
          
          <div className="form-group">
            <label>
              <Phone size={16} /> WhatsApp (opcional)
            </label>
            <input
              type="tel"
              name="phone"
              value={guestData.phone}
              onChange={handleGuestDataChange}
              placeholder="Ej: 11 2345-6789"
            />
          </div>
          
          <div className="form-actions">
            <button 
              className="submit-button"
              onClick={() => setShowGuestForm(false)}
            >
              Continuar
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Componente principal
  return (
    <section className={`cabina-fotografica-container ${fullscreenMode ? 'fullscreen' : ''}`}>
      {/* Efectos visuales */}
      {activeEffect === 'confetti' && <ConfettiEffect />}
      {activeEffect === 'petals' && <PetalsEffect />}

      <button className="close-fullscreen" onClick={onClose} aria-label="Cerrar cabina fotográfica">
        <X size={24} />
      </button>

      <div className="cabina-header">
        <h1 className="section-title">Cabina Fotográfica</h1>
        <p className="section-subtitle">¡Captura momentos divertidos!</p>
        {guestData.name && (
          <p className="guest-welcome">Hola, {guestData.name}!</p>
        )}
      </div>

      {cameraError && (
        <div className="camera-error">
          <p>{cameraError}</p>
          <button 
            className="retry-button" 
            onClick={async () => {
              await getAvailableCameras();
              await startCamera();
            }}
            disabled={cameraLoading}
          >
            {cameraLoading ? 'Cargando...' : 'Intentar nuevamente'}
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
                <div className="photo-counter">Foto {photosTaken} de {CONFIG.PHOTO_SEQUENCE_COUNT}</div>
                <div className="countdown-message">{countdownMessage}</div>
                {countdown > 0 && <div className="countdown-timer">{countdown}</div>}
              </div>
            )}

            <div className={`flash ${flashActive ? 'active' : ''}`}></div>
          </div>

          {recentPhotos.length > 0 && (
            <div className="gallery-preview" ref={galleryRef}>
              <div className="gallery-header">
                <h3><Image size={16} /> Tus fotos</h3>
                <div className="gallery-actions">
                  <button 
                    className={`action-button ${selectedPhotos.length === 0 ? 'disabled' : ''}`}
                    onClick={() => setShareOptions(!shareOptions)}
                    disabled={selectedPhotos.length === 0}
                  >
                    <Share2 size={16} /> Compartir
                  </button>
                  <button 
                    className="action-button" 
                    onClick={handlePrint}
                    disabled={selectedPhotos.length === 0}
                  >
                    <Download size={16} /> Imprimir
                  </button>
                  {retakeMode && (
                    <button className="action-button" onClick={handleRetake}>
                      <Repeat size={16} /> Repetir
                    </button>
                  )}
                </div>
              </div>
              
              {shareOptions && (
                <div className="share-options">
                  <button onClick={() => shareOnSocial(selectedPhotos[0], 'whatsapp')}>
                    WhatsApp
                  </button>
                  <button onClick={() => shareOnSocial(selectedPhotos[0], 'facebook')}>
                    Facebook
                  </button>
                  <button onClick={() => shareOnSocial(selectedPhotos[0], 'twitter')}>
                    Twitter
                  </button>
                  <button onClick={() => shareOnSocial(selectedPhotos[0], 'instagram')}>
                    Instagram
                  </button>
                </div>
              )}

              <div className="photo-grid">
                {recentPhotos.map((photo, index) => (
                  <div 
                    key={index} 
                    className={`photo-thumbnail ${selectedPhotos.includes(photo.url) ? 'selected' : ''}`}
                    onClick={() => togglePhotoSelection(photo.url)}
                  >
                    <img src={photo.url} alt={`Foto ${index + 1}`} loading="lazy" />
                    <span className="photo-badge">{index + 1}</span>
                    <div className="photo-overlay">
                      <button 
                        className="download-icon"
                        onClick={(e) => {
                          e.stopPropagation();
                          downloadPhoto(photo.url, index);
                        }}
                      >
                        <Download size={14} />
                      </button>
                    </div>
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
            disabled={!isCameraActive || isTakingPhotos || uploading || cameraLoading}
            aria-busy={isTakingPhotos || uploading}
          >
            {isTakingPhotos || uploading ? (
              <>
                <div className="capture-loader"></div>
                {uploading ? 'Guardando...' : `Foto ${photosTaken}/${CONFIG.PHOTO_SEQUENCE_COUNT}`}
              </>
            ) : (
              <>
                <Zap size={20} /> Tomar fotos
              </>
            )}
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

          <button
            className="edit-guest-data"
            onClick={() => setShowGuestForm(true)}
          >
            <User size={16} /> {guestData.name ? 'Editar mis datos' : 'Ingresar mis datos'}
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