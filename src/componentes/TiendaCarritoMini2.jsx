import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import swal from "sweetalert";
import { BsArrowsCollapse, BsArrowsExpand, BsCart4 } from "react-icons/bs";
import "../assets/scss/_03-Componentes/_TiendaCarritoMini2.scss";

const TiendaCarritoMini2 = ({ cart, removeFromCart, clearCart, updateProductQuantity }) => {
  const [isMinimized, setIsMinimized] = useState(false);
  const [localCart, setLocalCart] = useState(cart);
  const location = useLocation();
  const total = localCart.reduce(
    (sum, product) => sum + product.precio * (product.quantity || 1),
    0
  );

  useEffect(() => {
    setLocalCart(cart);
  }, [cart]);

  const handleAgregarAlCarritoClick = () => {
    swal({
      title: "Producto agregado",
      text: "El producto ha sido agregado a tu carrito de compras.",
      icon: "../../img/02-logos/logo-personalizá-2.png",
      button: {
        text: "Continuar",
        className: "sweetalert-button",
      },
      className: "custom-swal",
    });
  };

  return (
    <div className={`mini-carrito2 ${isMinimized ? "minimized" : ""}`}>
      {location.pathname.startsWith("/tienda") && !isMinimized && (
        <div className="flota-carrito-conteiner">
          <div className="carrito-header">
            <div className="header-total">
              <span className="texto-total">Total</span>
              <span className="tituloPrecioCarrito">${total.toFixed(2)}</span>
            </div>

            <div className="header-text">
              <BsCart4 className="icono-carrito" />
              <h6 className="texto-carrito"> {localCart.length}</h6>
            </div>
          </div>
        </div>
      )}
      <div className="carrito-acciones">
        <Link to="/carrito" className="link-carrito">
          <button
            className={`botonComprar1 ${isMinimized ? "minimized" : ""}`}
            onClick={handleAgregarAlCarritoClick}
            disabled={localCart.length === 0} // Desactiva el botón si el carrito está vacío
          >
            <h3
              className={`tituloImportante1 ${isMinimized ? "minimized" : ""} textoMovimiento`}
            >
              <i className="bi bi-shift-fill"></i> Comprar
            </h3>
          </button>
        </Link>
        <button
          className="toggle-button"
          onClick={() => setIsMinimized((prevState) => !prevState)}
        >
          {isMinimized ? <BsArrowsExpand /> : <BsArrowsCollapse />}
        </button>
      </div>
      <div className="tooltip" style={{ display: isMinimized ? 'none' : 'block' }}>
        <span>Total: ${total.toFixed(2)} | Productos: {localCart.length}</span>
      </div>
    </div>
  );
};

export default TiendaCarritoMini2;
