import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../assets/scss/_03-Componentes/_AplicaPersonaliza3.scss";

const AplicaPersonaliza3 = () => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    // Cargar productos desde el JSON
    const fetchProductos = async () => {
      try {
        const response = await fetch('/aplicapersonaliza3.json');
        const data = await response.json();
        setProductos(data.productos);
      } catch (error) {
        console.error('Error al cargar los productos:', error);
      }
    };

    fetchProductos();
  }, []);

  return (
    <div className="aplica-personaliza3-container">
      <h1 className="aplica-personaliza3-title">Galería de Productos Personalizables</h1>

      <div className="galeria-productos">
        {productos.length > 0 ? (
          productos.map((producto) => (
            <div key={producto.id} className="producto-card">
              <img src={producto.imagenUrl} alt={producto.nombre} className="producto-imagen" />
              <h3>{producto.nombre}</h3>
              <p>{producto.descripcion}</p>
              {/* Link para personalizar el producto seleccionado, pasando el ID */}
              <Link to={`/aplicar/3/${producto.id}`} className="personalizar-btn">
                Personaliza este diseño
              </Link>
            </div>
          ))
        ) : (
          <p>Cargando productos...</p>
        )}
      </div>
    </div>
  );
};

export default AplicaPersonaliza3;
