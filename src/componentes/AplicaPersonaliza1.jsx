import React, { useEffect, useState } from 'react';
import "../assets/scss/_03-Componentes/_AplicaPersonaliza1.scss";

const AplicaPersonaliza1 = () => {
  const [productosData, setProductosData] = useState([]);
  const [timeLeft, setTimeLeft] = useState(0);
  const [offer, setOffer] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/aplicapersonaliza1.json');
        const data = await response.json();
        console.log("Productos cargados:", data.productos); // Verificar datos de productos
        setProductosData(data.productos);

        const currentOffer = data.ofertas[0];
        setOffer(currentOffer);
        if (currentOffer) {
          setTimeLeft(currentOffer.duracion);
        }
      } catch (error) {
        console.error('Error al cargar los datos del JSON:', error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (timeLeft > 0) {
      const timerId = setInterval(() => {
        setTimeLeft(prevTime => prevTime - 1);
      }, 1000);
      return () => clearInterval(timerId);
    }
  }, [timeLeft]);

  return (
    <div className="aplica-personaliza1-container">
      <h1 className="aplica-personaliza1-title">Ofertas Especiales</h1>
      {offer && (
        <div className="offer-container">
          <h2>¡Oferta Especial!</h2>
          <p>{offer.descripcion}</p>
          <p>Descuento: {offer.descuento}%</p>
          <div className="countdown">
            <h3>Cuenta Regresiva: {timeLeft > 0 ? `${timeLeft}s` : '¡Oferta terminada!'}</h3>
          </div>
        </div>
      )}
      <div className="productos-lista">
        {productosData.length > 0 ? (
          productosData.map((producto) => (
            <div key={producto.id} className="producto-item">
              <img src={producto.imagen} alt={producto.descripcion} />
              <p>{producto.descripcion}</p>
            </div>
          ))
        ) : (
          <p>No hay productos disponibles.</p>
        )}
      </div>
    </div>
  );
};

export default AplicaPersonaliza1;
