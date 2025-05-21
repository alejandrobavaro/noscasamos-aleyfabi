import React, { useState, useEffect, useRef } from 'react';
import html2canvas from 'html2canvas';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { useParams } from 'react-router-dom';
import { useProbadorRopa } from '../context/ProbadorRopaContext';
import "../assets/scss/_03-Componentes/_PInvitadosProbadorRopaAvatar.scss";

const PInvitadosProbadorRopaAvatar = () => {
  const { productoId } = useParams();
  const { color, setColor } = useProbadorRopa();
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [seleccion, setSeleccion] = useState({
    vestido: null,
    traje: null,
    accesorios: null,
    zapatos: null,
    corbata: null,
    joyeria: null,
  });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const previewRef = useRef(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // Opción 1: Usando fetch (asegúrate que el JSON está en public/json/)
        const response = await fetch('/json/probadorRopaAvatar.json');
        
        if (!response.ok) {
          throw new Error(`Error HTTP! estado: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (!data || !data.componentes) {
          throw new Error("Estructura de datos incorrecta");
        }
        
        const producto = data.componentes;
        setProductoSeleccionado(producto);
        
        // Selección automática de la primera opción para cada categoría
        const seleccionInicial = {};
        Object.keys(producto).forEach(tipo => {
          if (producto[tipo].opciones?.length > 0) {
            seleccionInicial[tipo] = producto[tipo].opciones[0].nombre;
          }
        });
        setSeleccion(seleccionInicial);
        
      } catch (err) {
        console.error("Error al cargar datos:", err);
        setError("No pudimos cargar las opciones de vestuario. Por favor intenta recargar la página.");
        
        // Datos de prueba para desarrollo
        const testData = {
          componentes: {
            vestido: {
              titulo: "Vestidos",
              opciones: [{
                nombre: "Vestido de Prueba",
                imagen: "/img/11-codigovestimenta/01-vestido-azul-serpiente.png"
              }]
            },
            traje: {
              titulo: "Trajes",
              opciones: [{
                nombre: "Traje de Prueba",
                imagen: "/img/11-codigovestimenta/02-traje-azul-serpiente.png"
              }]
            }
          }
        };
        setProductoSeleccionado(testData.componentes);
        setSeleccion({
          vestido: "Vestido de Prueba",
          traje: "Traje de Prueba"
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const handleSeleccionChange = (tipo, opcion) => {
    setSeleccion(prev => ({
      ...prev,
      [tipo]: opcion
    }));
  };

  const handleSaveDesign = async () => {
    try {
      const canvas = await html2canvas(previewRef.current);
      const image = canvas.toDataURL("image/jpeg", 0.8);

      const designOptions = `
        Vestido: ${seleccion.vestido || 'N/A'}
        Traje: ${seleccion.traje || 'N/A'}
        Accesorios: ${seleccion.accesorios || 'N/A'}
        Zapatos: ${seleccion.zapatos || 'N/A'}
        Corbata/Pañuelo: ${seleccion.corbata || 'N/A'}
        Joyería: ${seleccion.joyeria || 'N/A'}
      `.trim();

      const zip = new JSZip();
      zip.file("outfit_boda.txt", designOptions);
      zip.file("outfit_boda.jpeg", image.split(",")[1], { base64: true });

      const content = await zip.generateAsync({ type: "blob" });
      saveAs(content, "mi_outfit_boda.zip");
    } catch (err) {
      console.error("Error al guardar el diseño:", err);
      alert("Ocurrió un error al guardar tu diseño. Por favor intenta nuevamente.");
    }
  };

  const generateWhatsappUrl = () => {
    const message = `
      ¡Mira mi outfit para la boda! Aquí están los detalles:
      Vestido: ${seleccion.vestido || 'N/A'}
      Traje: ${seleccion.traje || 'N/A'}
      Accesorios: ${seleccion.accesorios || 'N/A'}
      Zapatos: ${seleccion.zapatos || 'N/A'}
      Corbata/Pañuelo: ${seleccion.corbata || 'N/A'}
      Joyería: ${seleccion.joyeria || 'N/A'}
    `.trim();
    
    return `https://api.whatsapp.com/send?phone=2235168797&text=${encodeURIComponent(message)}`;
  };

  if (isLoading) {
    return (
      <div className="probador-ropa-loading">
        <div className="loading-spinner"></div>
        <p>Cargando opciones de vestuario...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="probador-ropa-error">
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>Recargar Página</button>
      </div>
    );
  }


  return (
    <div className="probador-ropa">
      <header className="probador-header">
        <h1>OUTFIT PARA LA BODA</h1>
        <p>Personaliza tu look</p>
      </header>
      
      <div className="probador-content">
        {/* Vista previa del avatar */}
        <div className="probador-preview-container">
          <div className="probador-preview" ref={previewRef}>
            {Object.keys(seleccion).map(tipo => (
              seleccion[tipo] && productoSeleccionado[tipo]?.opciones?.find(op => op.nombre === seleccion[tipo]) && (
                <img
                  key={tipo}
                  src={productoSeleccionado[tipo].opciones.find(op => op.nombre === seleccion[tipo]).imagen}
                  alt={tipo}
                  className="probador-layer"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    console.error(`Error cargando imagen: ${e.target.src}`);
                  }}
                />
              )
            ))}
          </div>
        </div>

        {/* Selector de prendas */}
        <div className="probador-selector">
          {productoSeleccionado && Object.keys(productoSeleccionado).map(tipo => (
            <section key={tipo} className="probador-category">
              <h2>{productoSeleccionado[tipo].titulo}</h2>
              <div className="probador-options">
                {productoSeleccionado[tipo].opciones.map(opcion => (
                  <div key={opcion.nombre} className="probador-option">
                    <button
                      className={seleccion[tipo] === opcion.nombre ? 'selected' : ''}
                      onClick={() => handleSeleccionChange(tipo, opcion.nombre)}
                      aria-label={`Seleccionar ${opcion.nombre}`}
                    >
                      <img 
                        src={opcion.imagen} 
                        alt={opcion.nombre} 
                        onError={(e) => {
                          e.target.src = '/img/placeholder-vestuario.png';
                        }}
                      />
                    </button>
                    <span>{opcion.nombre}</span>
                  </div>
                ))}
              </div>
            </section>
          ))}

          {/* Acciones */}
          <div className="probador-actions">
            <button 
              onClick={handleSaveDesign}
              disabled={!productoSeleccionado}
            >
              Guardar Outfit
            </button>
            <a 
              href={generateWhatsappUrl()} 
              target="_blank" 
              rel="noopener noreferrer"
            >
              Compartir Outfit
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PInvitadosProbadorRopaAvatar;