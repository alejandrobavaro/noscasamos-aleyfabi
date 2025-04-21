import React, { useState, useEffect } from "react";
import Toastify from "toastify-js";

import ProductosTienda from "./TiendaProductos";
import TiendaCarritoMini2 from "./TiendaCarritoMini2";
import TiendaProductoDetalle from "./TiendaProductoDetalle";

import TiendaModalInicio from "./TiendaModalInicio";
import { useOfertas } from "./TiendaOfertasContext";

// Corrección de la ruta de SASS con verificación de mayúsculas
import '../assets/scss/_03-Componentes/_Tienda.scss'; 
import '../assets/scss/_01-General/_Toastify.scss'; 

function Tienda({ cart, setCart, addToCart, removeFromCart, searchQuery, setSearchQuery }) {
  const [products, setProducts] = useState([]);
  const [detalle, setDetalle] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [showModal, setShowModal] = useState(true);
  const { ofertas } = useOfertas();

  useEffect(() => {
    const cargarProductosDesdeJSON = async () => {
      try {
        const response = await fetch("/productos.json");
        const productos = await response.json();
        setProducts(productos);
      } catch (error) {
        console.error("Error al cargar los productos:", error);
      }
    };

    cargarProductosDesdeJSON();
  }, []);

  const handleShowDetalle = (producto) => {
    setDetalle(producto);
  };

  const handleAddToCart = (producto) => {
    addToCart(producto);
    Toastify({
      text: `Añadiste ${producto.nombre} al carrito.`,
      duration: 3000,
         gravity: "top",
      position: "center",  // Centrado en la parte superior
      style: {
        // background: "#ff69b4",
      },
      className: "toastify-tienda fade-in",  // Añade la clase de animación
    }).showToast();
  };

  const handleClearCart = () => {
    setCart([]);
    Toastify({
      text: "Carrito vaciado.",
      duration: 3000,
        gravity: "top",
      position: "center",  // Centrado en la parte superior
      style: {
        background: "#000000", 
      },
      className: "toastify-tienda fade-in",  // Añade la clase de animación
    }).showToast();
  };

  const filteredProducts = products.filter(product =>
    product.nombre.toLowerCase().includes(searchQuery.toLowerCase()) &&
    (selectedCategory === 'Todos' || product.categoria === selectedCategory)
  );

  const categories = ['Todos', ...new Set(products.map((product) => product.categoria))];

  return (
    <>
      <div className="tienda-container">
        <ProductosTienda
          products={filteredProducts}
          addToCart={handleAddToCart}
          handleShowDetalle={handleShowDetalle}
          searchQuery={searchQuery}
          selectedCategory={selectedCategory}
        />
        <TiendaCarritoMini2
          cart={cart}
          removeFromCart={removeFromCart}
          clearCart={handleClearCart}
        />
        {detalle && <TiendaProductoDetalle producto={detalle} onClose={() => setDetalle(null)} />}
        {showModal && <TiendaModalInicio showModal={showModal} closeModal={() => setShowModal(false)} />}
      </div>
    </>
  );
}

export default Tienda;
