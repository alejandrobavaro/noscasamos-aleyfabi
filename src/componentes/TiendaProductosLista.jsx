import React, { useEffect, useState } from 'react';
import Producto from './TiendaProductos'; 
import { OfertasProvider } from './TiendaOfertasContext'; 
import '../assets/scss/_03-Componentes/_TiendaProductosLista.scss'; 

const TiendaProductosLista = ({ onEncargar }) => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    fetch('/productos.json')
      .then(response => response.json())
      .then(data => setProductos(data))
      .catch(error => console.error('Error al cargar los productos:', error));
  }, []);

  return (
    <OfertasProvider>
      <div className="row row-cols-1 row-cols-md-4 g-4">
        {productos.map(producto => (
          <Producto key={producto.id} producto={producto} onEncargar={onEncargar} />
        ))}
      </div>
    </OfertasProvider>
  );
};

export default TiendaProductosLista;
