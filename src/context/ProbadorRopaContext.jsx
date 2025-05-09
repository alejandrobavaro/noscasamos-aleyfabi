import React, { createContext, useContext, useState, useRef } from "react";

const ProbadorRopaContext = createContext();

export const useProbadorRopa = () => useContext(ProbadorRopaContext);

export const ProbadorRopaProvider = ({ children }) => {
  const [color, setColor] = useState("");
  const [carrito, setCarrito] = useState([]);
  const [textoPersonalizado, setTextoPersonalizado] = useState("Texto por defecto");
  const [colorTexto, setColorTexto] = useState("#000000");
  const [fuenteTexto, setFuenteTexto] = useState("Arial");
  const [estiloTexto, setEstiloTexto] = useState("normal");
  const [tamañoTexto, setTamañoTexto] = useState("16px");
  const previewRef = useRef(null);

  const agregarAlCarrito = (item) => {
    setCarrito((prev) => [...prev, { id: Date.now(), ...item }]);
  };

  const eliminarDelCarrito = (id) => {
    setCarrito((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <ProbadorRopaContext.Provider
      value={{
        color,
        setColor,
        carrito,
        agregarAlCarrito,
        eliminarDelCarrito,
        textoPersonalizado,
        setTextoPersonalizado,
        colorTexto,
        setColorTexto,
        fuenteTexto,
        setFuenteTexto,
        estiloTexto,
        setEstiloTexto,
        tamañoTexto,
        setTamañoTexto,
        previewRef,
      }}
    >
      {children}
    </ProbadorRopaContext.Provider>
  );
};