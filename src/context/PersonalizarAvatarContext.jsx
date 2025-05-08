import React, { createContext, useState, useContext } from 'react';

const PersonalizarAvatarContext = createContext();

export const PersonalizarAvatarProvider = ({ children }) => {
  const [avatarSeleccion, setAvatarSeleccion] = useState({});
  const [avatarTipo, setAvatarTipo] = useState('avatarHombre');
  const [activeCategory, setActiveCategory] = useState(null);
  const [carrito, setCarrito] = useState([]);

  const agregarAlCarrito = (diseño) => {
    setCarrito(prev => [...prev, diseño]);
    console.log('Diseño agregado al carrito:', diseño);
  };

  return (
    <PersonalizarAvatarContext.Provider 
      value={{ 
        avatarSeleccion, 
        setAvatarSeleccion,
        avatarTipo,
        setAvatarTipo,
        activeCategory,
        setActiveCategory,
        carrito,
        agregarAlCarrito
      }}
    >
      {children}
    </PersonalizarAvatarContext.Provider>
  );
};

export const usePersonalizarAvatar = () => useContext(PersonalizarAvatarContext);