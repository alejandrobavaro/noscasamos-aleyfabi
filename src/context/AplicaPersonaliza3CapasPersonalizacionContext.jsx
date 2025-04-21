import React, { createContext, useState, useContext } from 'react';

const AplicaPersonaliza3CapasPersonalizacionContext = createContext();

export const AplicaPersonaliza3CapasPersonalizacionProvider = ({ children }) => {
  const [color, setColor] = useState('#FFFFFF'); // Color inicial
  const [textura, setTextura] = useState(''); // Textura inicial
  const [accesorios, setAccesorios] = useState([]); // Accesorios inicial

  return (
    <AplicaPersonaliza3CapasPersonalizacionContext.Provider value={{ color, setColor, textura, setTextura, accesorios, setAccesorios }}>
      {children}
    </AplicaPersonaliza3CapasPersonalizacionContext.Provider>
  );
};

export const useAplicaPersonaliza3CapasPersonalizacion = () => useContext(AplicaPersonaliza3CapasPersonalizacionContext);
