import React, { useEffect, useState } from "react";
import { FaFemale, FaMale, FaUndo, FaRandom, FaInfoCircle } from "react-icons/fa";
import "../assets/scss/_03-Componentes/_AvatarSelector.scss";

const AvatarSelector = () => {
  const [data, setData] = useState({});
  const [avatarTipo, setAvatarTipo] = useState("avatarHombre");
  const [seleccion, setSeleccion] = useState({});
  const [activeCategory, setActiveCategory] = useState(null);
  const [showHelp, setShowHelp] = useState(false);

  useEffect(() => {
    fetch("/avatarOpciones.json")
      .then(res => res.json())
      .then(data => {
        setData(data);
        const tipo = "avatarHombre";
        const componentes = data[tipo].componentes;
        const defaultSeleccion = {};
        Object.keys(componentes).forEach(tipo => {
          defaultSeleccion[tipo] = componentes[tipo].opciones[0]?.nombre || "";
        });
        setSeleccion(defaultSeleccion);
        setActiveCategory(Object.keys(componentes)[0]);
      });
  }, []);

  const handleSeleccion = (tipo, opcion) => {
    setSeleccion(prev => ({ ...prev, [tipo]: opcion }));
  };

  const handleAvatarChange = (tipo) => {
    setAvatarTipo(tipo);
    const componentes = data[tipo].componentes;
    const defaultSeleccion = {};
    Object.keys(componentes).forEach(tipo => {
      defaultSeleccion[tipo] = componentes[tipo].opciones[0]?.nombre || "";
    });
    setSeleccion(defaultSeleccion);
    setActiveCategory(Object.keys(componentes)[0]);
  };

  const resetOutfit = () => {
    const componentes = data[avatarTipo].componentes;
    const defaultSeleccion = {};
    Object.keys(componentes).forEach(tipo => {
      defaultSeleccion[tipo] = componentes[tipo].opciones[0]?.nombre || "";
    });
    setSeleccion(defaultSeleccion);
  };

  const randomOutfit = () => {
    const componentes = data[avatarTipo].componentes;
    const randomSeleccion = {};
    Object.keys(componentes).forEach(tipo => {
      const opciones = componentes[tipo].opciones;
      const randomIndex = Math.floor(Math.random() * opciones.length);
      randomSeleccion[tipo] = opciones[randomIndex].nombre;
    });
    setSeleccion(randomSeleccion);
  };

  const avatarData = data[avatarTipo];

  if (!avatarData) return <div className="loading">Cargando probador...</div>;

  return (
    <div className="avatar-selector">
      <div className="avatar-header">
        <h2>Probador Virtual</h2>
        <p>Diseña tu atuendo perfecto para nuestra boda</p>
        <button 
          className="help-button"
          onClick={() => setShowHelp(!showHelp)}
        >
          <FaInfoCircle /> {showHelp ? "Ocultar ayuda" : "Mostrar ayuda"}
        </button>
      </div>

      {showHelp && (
        <div className="help-section">
          <h3>¿Cómo usar el probador?</h3>
          <ol>
            <li>Selecciona si quieres vestir un avatar femenino o masculino</li>
            <li>Elige una categoría de prendas (superior, inferior, etc.)</li>
            <li>Selecciona la prenda que prefieras de las opciones disponibles</li>
            <li>Usa "Reiniciar" para comenzar de nuevo o "Aleatorio" para una combinación sorpresa</li>
            <li>Experimenta con diferentes combinaciones hasta encontrar tu look ideal</li>
          </ol>
        </div>
      )}

      <div className="avatar-content">
        {/* Columna izquierda - Previsualización */}
        <div className="avatar-preview-column">
          <div className="avatar-preview-container">
            <div className="avatar-preview">
              <img src={avatarData.base} alt="Avatar Base" className="avatar-capa base" />
              {Object.entries(avatarData.componentes).map(([tipo, datos]) => {
                const imagenSrc = datos.opciones.find(op => op.nombre === seleccion[tipo])?.imagen;
                return imagenSrc ? <img key={tipo} src={imagenSrc} alt={tipo} className="avatar-capa" /> : null;
              })}
            </div>

            <div className="avatar-tipo-selector">
              <button
                onClick={() => handleAvatarChange("avatarHombre")}
                className={avatarTipo === "avatarHombre" ? "activo" : ""}
              >
                <FaMale /> Caballero
              </button>
              <button
                onClick={() => handleAvatarChange("avatarMujer")}
                className={avatarTipo === "avatarMujer" ? "activo" : ""}
              >
                <FaFemale /> Dama
              </button>
            </div>

            <div className="avatar-actions">
              <button onClick={resetOutfit} className="action-button">
                <FaUndo /> Reiniciar
              </button>
              <button onClick={randomOutfit} className="action-button">
                <FaRandom /> Aleatorio
              </button>
            </div>
          </div>
        </div>

        {/* Columna derecha - Controles */}
        <div className="avatar-controls-column">
          <div className="category-tabs">
            {Object.entries(avatarData.componentes).map(([tipo, datos]) => (
              <button
                key={tipo}
                className={`category-tab ${activeCategory === tipo ? "activo" : ""}`}
                onClick={() => setActiveCategory(tipo)}
              >
                {datos.titulo}
              </button>
            ))}
          </div>

          {activeCategory && (
            <div className="options-grid">
              {avatarData.componentes[activeCategory].opciones.map(op => (
                <button
                  key={op.nombre}
                  className={`option-button ${seleccion[activeCategory] === op.nombre ? "activo" : ""}`}
                  onClick={() => handleSeleccion(activeCategory, op.nombre)}
                >
                  <img src={op.imagen} alt={op.nombre} />
                  <span>{op.nombre}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AvatarSelector;