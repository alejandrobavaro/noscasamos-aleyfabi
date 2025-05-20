import React from 'react';
import { Zap, Smile, Camera, User } from 'react-feather';
import "../assets/scss/_03-Componentes/_PPublicoCabinaFotograficaControls.scss";

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

const PPublicoCabinaFotograficaControls = ({ 
  cameraState, 
  onCameraStateChange,
  onTakePhotos,
  onEditGuestData
}) => {
  const handleFilterChange = (filterId) => {
    onCameraStateChange({ ...cameraState, filter: filterId });
  };

  const handleMaskChange = (maskId) => {
    onCameraStateChange({ 
      ...cameraState, 
      mask: maskId === cameraState.mask ? null : maskId 
    });
  };

  const toggleCameraSelector = () => {
    onCameraStateChange({ 
      ...cameraState, 
      showCameraSelector: !cameraState.showCameraSelector 
    });
  };

  const handleCameraChange = (deviceId) => {
    onCameraStateChange({ 
      ...cameraState, 
      selectedCameraId: deviceId,
      showCameraSelector: false 
    });
  };

  return (
    <div className="controls-container">
      <button
        className={`controls-capture-button ${cameraState.isTakingPhotos ? 'processing' : ''}`}
        onClick={onTakePhotos}
        disabled={!cameraState.isActive || cameraState.isTakingPhotos}
        aria-busy={cameraState.isTakingPhotos}
      >
        {cameraState.isTakingPhotos ? (
          <>
            <div className="capture-loader"></div>
            {`Foto ${cameraState.photosTaken}/3`}
          </>
        ) : (
          <>
            <Zap size={20} /> Tomar fotos
          </>
        )}
      </button>

      <div className={`controls-filters ${cameraState.isTakingPhotos ? 'disabled' : ''}`}>
        <h3 className="controls-section-title"><Smile size={16} /> Filtros</h3>
        <div className="filters-scroller">
          {FILTERS.map(filter => (
            <button 
              key={filter.id}
              className={`filter-button ${cameraState.filter === filter.id ? 'active' : ''}`}
              onClick={() => handleFilterChange(filter.id)}
              disabled={cameraState.isTakingPhotos}
              aria-label={`Filtro ${filter.name}`}
            >
              <div className="filter-preview" style={{ filter: filter.css }} />
              <span className="filter-name">{filter.name}</span>
            </button>
          ))}
        </div>
      </div>

      <div className={`controls-masks ${cameraState.isTakingPhotos ? 'disabled' : ''}`}>
        <h3 className="controls-section-title"><Smile size={16} /> Máscaras</h3>
        <div className="masks-scroller">
          {MASKS.map(mask => (
            <button 
              key={mask.id}
              className={`mask-button ${cameraState.mask === mask.id ? 'active' : ''}`}
              onClick={() => handleMaskChange(mask.id)}
              disabled={cameraState.isTakingPhotos}
              aria-label={`Máscara ${mask.name}`}
            >
              <img src={mask.url} alt="" className="mask-image" loading="lazy" />
              <span className="mask-name">{mask.name}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="controls-secondary-buttons">
        <button
          className="camera-selector-button"
          onClick={toggleCameraSelector}
          disabled={cameraState.availableCameras.length <= 1 || cameraState.isTakingPhotos}
        >
          <Camera size={18} /> Cambiar cámara
        </button>

        <button
          className="guest-data-button"
          onClick={onEditGuestData}
        >
          <User size={16} /> {cameraState.guestName ? 'Editar mis datos' : 'Ingresar mis datos'}
        </button>
      </div>

      {cameraState.showCameraSelector && (
        <div className="camera-selector-modal">
          <div className="camera-selector-content">
            <h4 className="camera-selector-title">Seleccionar cámara</h4>
            <ul className="camera-selector-list">
              {cameraState.availableCameras.map((camera) => (
                <li
                  key={camera.deviceId}
                  className={`camera-selector-item ${cameraState.selectedCameraId === camera.deviceId ? 'selected' : ''}`}
                  onClick={() => handleCameraChange(camera.deviceId)}
                >
                  {camera.label || `Cámara ${camera.deviceId}`}
                </li>
              ))}
            </ul>
            <button 
              className="camera-selector-close"
              onClick={toggleCameraSelector}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PPublicoCabinaFotograficaControls;