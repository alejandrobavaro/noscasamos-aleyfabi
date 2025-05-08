import React, { useEffect, useRef, useState } from "react";
import { FaFemale, FaMale, FaUndo, FaRandom, FaInfoCircle, FaShoppingCart } from "react-icons/fa";
import html2canvas from "html2canvas";
import { saveAs } from "file-saver";
import { usePersonalizarAvatar } from "../context/PersonalizarAvatarContext";
import toast, { Toaster } from "react-hot-toast";
import "../assets/scss/_03-Componentes/_PInvitadosProbadorRopaAvatar.scss";

const PInvitadosProbadorRopaAvatar = () => {
  const {
    avatarSeleccion: seleccion,
    setAvatarSeleccion: setSeleccion,
    avatarTipo,
    setAvatarTipo,
    activeCategory,
    setActiveCategory,
    agregarAlCarrito
  } = usePersonalizarAvatar();

  const [data, setData] = useState({});
  const [showHelp, setShowHelp] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const previewRef = useRef(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/avatarOpciones.json");
        if (!response.ok) throw new Error('Error al cargar datos');
        const jsonData = await response.json();
        setData(jsonData);
        
        const componentes = jsonData[avatarTipo]?.componentes || {};
        const defaultSeleccion = {};
        Object.keys(componentes).forEach(tipo => {
          defaultSeleccion[tipo] = componentes[tipo].opciones[0]?.nombre || "";
        });
        
        setSeleccion(defaultSeleccion);
        setActiveCategory(Object.keys(componentes)[0] || null);
      } catch (error) {
        console.error("Error loading avatar data:", error);
        toast.error("Error al cargar las opciones del avatar");
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [avatarTipo, setSeleccion, setActiveCategory]);

  const handleSeleccion = (tipo, opcion) => {
    setSeleccion(prev => ({ ...prev, [tipo]: opcion }));
  };

  const handleAvatarChange = (tipo) => {
    setAvatarTipo(tipo);
  };

  const resetOutfit = () => {
    const componentes = data[avatarTipo]?.componentes || {};
    const defaultSeleccion = {};
    Object.keys(componentes).forEach(tipo => {
      defaultSeleccion[tipo] = componentes[tipo].opciones[0]?.nombre || "";
    });
    setSeleccion(defaultSeleccion);
    toast.success("Atuendo reiniciado correctamente");
  };

  const randomOutfit = () => {
    const componentes = data[avatarTipo]?.componentes || {};
    const randomSeleccion = {};
    Object.keys(componentes).forEach(tipo => {
      const opciones = componentes[tipo].opciones;
      if (opciones && opciones.length > 0) {
        const randomIndex = Math.floor(Math.random() * opciones.length);
        randomSeleccion[tipo] = opciones[randomIndex].nombre;
      }
    });
    setSeleccion(randomSeleccion);
    toast.success("Atuendo aleatorio generado");
  };

  const handleSaveDesign = async () => {
    if (!previewRef.current) {
      toast.error("No se puede capturar la vista previa");
      return;
    }

    try {
      const canvas = await html2canvas(previewRef.current);
      const image = canvas.toDataURL("image/jpeg", 0.8);

      const detallesTxt = Object.keys(seleccion)
        .map((tipo) => {
          const opcionSeleccionada = seleccion[tipo];
          if (opcionSeleccionada && data[avatarTipo]?.componentes[tipo]) {
            const opcion = data[avatarTipo].componentes[tipo].opciones.find(
              (op) => op.nombre === opcionSeleccionada
            );
            return opcion ? `${tipo}: ${opcion.nombre}\n` : null;
          }
          return null;
        })
        .filter(Boolean)
        .join("\n");

      // Crear archivo Blob con la imagen
      const imageBlob = await fetch(image).then(res => res.blob());
      
      // Crear archivo Blob con el texto
      const txtBlob = new Blob([detallesTxt], { type: "text/plain" });
      
      // Crear enlace de descarga para la imagen
      const imageUrl = URL.createObjectURL(imageBlob);
      const link = document.createElement('a');
      link.href = imageUrl;
      link.download = 'atuendo-boda.jpg';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Crear enlace de descarga para el texto
      const txtUrl = URL.createObjectURL(txtBlob);
      const txtLink = document.createElement('a');
      txtLink.href = txtUrl;
      txtLink.download = 'detalles-atuendo.txt';
      document.body.appendChild(txtLink);
      txtLink.click();
      document.body.removeChild(txtLink);

      toast.success("Atuendo descargado exitosamente (2 archivos)");
    } catch (error) {
      console.error("Error al guardar el diseño:", error);
      toast.error("Ocurrió un error al guardar el diseño");
    }
  };

  const handleAddToCart = async () => {
    try {
      const canvas = await html2canvas(previewRef.current);
      const image = canvas.toDataURL("image/jpeg", 0.8);

      const diseñoPersonalizado = {
        tipo: `Avatar ${avatarTipo === 'avatarHombre' ? 'Masculino' : 'Femenino'}`,
        detalles: seleccion,
        imagen: image,
        fecha: new Date().toISOString()
      };

      agregarAlCarrito(diseñoPersonalizado);
      toast.success("Atuendo agregado al carrito");
    } catch (error) {
      console.error("Error al agregar al carrito:", error);
      toast.error("Error al agregar al carrito");
    }
  };

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Cargando probador de vestimenta...</p>
      </div>
    );
  }

  const avatarData = data[avatarTipo];
  if (!avatarData) return <div className="error-message">Error al cargar los datos del avatar</div>;

  return (
    <div className="PInvitadosProbadorRopaAvatar">
      <Toaster
        toastOptions={{
          className: "custom-toast",
          duration: 3000,
          success: {
            className: "custom-toast--success",
          },
          error: {
            className: "custom-toast--error",
          },
        }}
      />

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
          <div className="avatar-preview-column">
            <div className="avatar-preview-container">
              <div className="avatar-preview" ref={previewRef}>
                <img src={avatarData.base} alt="Avatar Base" className="avatar-capa base" />
                {Object.entries(avatarData.componentes).map(([tipo, datos]) => {
                  const imagenSrc = datos.opciones.find(op => op.nombre === seleccion[tipo])?.imagen;
                  return imagenSrc ? (
                    <img 
                      key={tipo} 
                      src={imagenSrc} 
                      alt={tipo} 
                      className={`avatar-capa ${tipo}`}
                    />
                  ) : null;
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
                <button onClick={handleSaveDesign} className="action-button">
                  Descargar Atuendo
                </button>
                <button onClick={handleAddToCart} className="action-button cart-button">
                  <FaShoppingCart /> Guardar
                </button>
              </div>
            </div>
          </div>

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
    </div>
  );
};

export default PInvitadosProbadorRopaAvatar;