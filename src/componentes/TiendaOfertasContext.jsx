import React, { createContext, useContext, useEffect, useState } from 'react';

const TiendaOfertasContext = createContext();

export const OfertasProvider = ({ children }) => {
  const [ofertas, setOfertas] = useState([]);

  useEffect(() => {
    const fetchOfertas = async () => {
      try {
        const response = await fetch('/productos.json');
        const productos = await response.json();
        const ofertasRemeras = productos.filter(producto => producto.categoria.toLowerCase() === 'camiseta');
        setOfertas(ofertasRemeras.map(producto => producto.id));
      } catch (error) {
        console.error('Error al cargar los productos:', error);
      }
    };

    fetchOfertas();
  }, []);

  return (
    <TiendaOfertasContext.Provider value={{ ofertas }}>
      {children}
    </TiendaOfertasContext.Provider>
  );
};

export const useOfertas = () => {
  const context = useContext(TiendaOfertasContext);
  if (!context) {
    throw new Error("useOfertas debe ser usado dentro de un OfertasProvider");
  }
  return context;
};
