import React, { useState, useEffect } from "react";
import { toast } from "react-toastify"; // Importa Toastify
import "../assets/scss/_03-Componentes/_TiendaCarritoCompra.scss";

const TiendaCarritoCompra = ({ cart = [], removeFromCart, handlePagar, updateProductQuantity }) => {
  const [localCart, setLocalCart] = useState(cart);

  useEffect(() => {
    setLocalCart(cart);
  }, [cart]);

  const total = localCart.reduce((sum, product) => sum + (product.precio * (product.quantity || 1)), 0);

  const handleComprar = () => {
    handlePagar(); // Llama a la función que maneja el pago

    // Muestra la notificación de éxito con Toastify
    toast.success("¡Compra realizada! Tu compra ha sido procesada exitosamente.", {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  const handleQuantityChange = (id, delta) => {
    setLocalCart(prevCart => {
      return prevCart.map(product => 
        product.id === id
          ? { ...product, quantity: Math.max(1, (product.quantity || 1) + delta) }
          : product
      );
    });
    updateProductQuantity(id, (localCart.find(product => product.id === id)?.quantity || 1) + delta);
  };

  return (
    <div className="tienda-carrito-container">
      <section className="tienda-titulo-container">
        <h1 className="tienda-titulo">
          <i className="bi bi-cart" /> CARRITO DE COMPRAS <i className="bi bi-cart" />
        </h1>
      </section>

      <div className="tienda-carrito-content">
        <div className="tienda-resumen-compra">
          <h3 className="tienda-resumen-titulo">RESUMEN DE LA COMPRA:</h3>
          <section className="tienda-pago-section">
            <h3 className="tienda-pago-titulo">
              <i className="bi bi-activity" /> REALIZA TU PAGO <i className="bi bi-activity" />
            </h3>
          </section>

          <div className="tienda-carrito-detalle">
            <div className="tienda-resumen-info">
              <p className="tienda-total-text">Total: ${total.toFixed(2)}</p>
              <p className="tienda-cantidad-text">Cantidad de Productos: {localCart.length}</p>
            </div>

            <ul className="tienda-producto-list">
              {localCart.map((product) => (
                <li key={product.id} className="tienda-producto-item">
                  <img
                    src={product.imagenes[0]}
                    alt={product.nombre}
                    className="tienda-producto-imagen"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/path/to/default/image.jpg"; 
                    }}
                  />
                  <div className="tienda-producto-info">
                    <span className="tienda-producto-nombre">{product.nombre}</span>
                    <div className="tienda-contenedorPrecioCantidad">
                      <span className="tienda-producto-precio">${(product.precio || 0).toFixed(2)}</span>
                      <div className="tienda-producto-cantidad">
                        <button
                          className="tienda-btn-quantity"
                          onClick={() => handleQuantityChange(product.id, -1)}
                        >
                          -
                        </button>
                        <span className="tienda-quantity-display">
                          {product.quantity || 1}
                        </span>
                        <button
                          className="tienda-btn-quantity"
                          onClick={() => handleQuantityChange(product.id, 1)}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="tienda-producto-descripcion">
                      {product.descripcion}
                    </div>
                  </div>
                  <button
                    className="tienda-btn-eliminar"
                    onClick={() => {
                      console.log("Eliminando producto con id:", product.id);
                      removeFromCart(product.id);
                    }}
                  >
                    <i className="bi bi-trash"></i>
                  </button>
                </li>
              ))}
            </ul>

            <hr className="tienda-transparent-hr" />
            
            <section className="tienda-acciones">
              <button onClick={handleComprar} className="tienda-botonComprar">
                <h3 className="tienda-compra-text">
                  <i className="bi bi-shift-fill" /> Comprar
                </h3>
              </button>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TiendaCarritoCompra;
