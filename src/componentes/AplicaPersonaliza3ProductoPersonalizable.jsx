import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAplicaPersonaliza3CapasPersonalizacion } from '../context/AplicaPersonaliza3CapasPersonalizacionContext';
import "../assets/scss/_03-Componentes/_AplicaPersonaliza3ProductoPersonalizable.scss";

const AplicaPersonaliza3ProductoPersonalizable = () => {
  const { productoId } = useParams();
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const { color, setColor } = useAplicaPersonaliza3CapasPersonalizacion();

  const [seleccion, setSeleccion] = useState({
    solapa: null,
    cuerpo: null,
    fuelle: null,
    correa: null,
    portamanijas: null,
    herrajes: null,
  });

  useEffect(() => {
    fetch("/aplicapersonaliza3Producto.json")
      .then((response) => response.json())
      .then((data) => {
        setProductoSeleccionado(data.componentes);
        setColor(data.componentes.solapa.opciones[0]?.nombre || '#FFFFFF');
      })
      .catch((error) => console.error("Error al cargar el JSON:", error));
  }, [setColor]);

  if (!productoSeleccionado) {
    return <div>Cargando producto...</div>;
  }

  const handleSeleccionChange = (tipo, opcion) => {
    setSeleccion((prev) => ({
      ...prev,
      [tipo]: opcion,
    }));
  };

  const handleSaveDesign = () => {
    const designOptions = `
      Solapa: ${seleccion.solapa}
      Cuerpo: ${seleccion.cuerpo}
      Fuelle: ${seleccion.fuelle}
      Correa: ${seleccion.correa}
      Portamanijas: ${seleccion.portamanijas}
      Herrajes: ${seleccion.herrajes}
    `.trim();

    const blob = new Blob([designOptions], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'diseño_cartera.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="personaliza-producto-container">
      <h1>Personaliza tu Cartera</h1>
      <div className="producto-grid">
        <div className="producto-preview">
          {/* Vista previa de la cartera con capas */}
          <img
            src={productoSeleccionado.solapa.opciones.find(op => op.nombre === seleccion.solapa)?.imagen}
            alt=""
            className="capa"
          />
          <img
            src={productoSeleccionado.cuerpo.opciones.find(op => op.nombre === seleccion.cuerpo)?.imagen}
            alt=""
            className="capa"
          />
          <img
            src={productoSeleccionado.fuelle.opciones.find(op => op.nombre === seleccion.fuelle)?.imagen}
            alt=""
            className="capa"
          />
          <img
            src={productoSeleccionado.correa.opciones.find(op => op.nombre === seleccion.correa)?.imagen}
            alt=""
            className="capa"
          />
          <img
            src={productoSeleccionado.portamanijas.opciones.find(op => op.nombre === seleccion.portamanijas)?.imagen}
            alt=""
            className="capa"
          />
          <img
            src={productoSeleccionado.herrajes.opciones.find(op => op.nombre === seleccion.herrajes)?.imagen}
            alt=""
            className="capa"
          />
        </div>

        <div className="personalizacion-capas">
          {Object.keys(productoSeleccionado).map((tipo) => (
            <div key={tipo}>
              <h5 className='tituloopciones'>{productoSeleccionado[tipo].titulo}</h5>
              <div className="options-container">
                {productoSeleccionado[tipo].opciones.map((opcion) => (
                  <button 
                    key={opcion.nombre}
                    className={`option-button ${seleccion[tipo] === opcion.nombre ? 'selected' : ''}`}
                    onClick={() => handleSeleccionChange(tipo, opcion.nombre)}
                  >
                    <img src={opcion.imagen} alt={opcion.nombre} className="option-img" />
                  </button>
                ))}
              </div>
            </div>
          ))}

          <div className="personalizar-acciones">
            <button className="guardar-btn" onClick={handleSaveDesign}>Guardar Diseño</button>
            <button className="guardar-btn">Compartir Diseño</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AplicaPersonaliza3ProductoPersonalizable;
