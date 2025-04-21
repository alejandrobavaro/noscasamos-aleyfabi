import React, { useState } from 'react';
import TiendaImgAgrandar from './TiendaImgAgrandar';
import { useOfertas } from './TiendaOfertasContext';
import '../assets/scss/_03-Componentes/_TiendaProductos.scss';

function TiendaProductos({ products, addToCart, handleShowDetalle, searchQuery, selectedCategory }) {
  const [selectedImages, setSelectedImages] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { ofertas } = useOfertas();

  const openImageModal = (images, index) => {
    setSelectedImages(images);
    setCurrentImageIndex(index);
    setIsModalOpen(true);
  };

  const closeImageModal = () => {
    setIsModalOpen(false);
  };

  const handlePrevImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? selectedImages.length - 1 : prevIndex - 1));
  };

  const handleNextImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prevIndex) => (prevIndex === selectedImages.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <div className="productos-grid">
      {products.map((product) => (
        <div key={product.id} className="producto-card">
          {ofertas.includes(product.id) && (
            <div className="oferta-tag">Oferta 30%</div>
          )}
          <img
            src={product.imagenes[0]}
            alt={product.nombre}
            className="producto-image"
            onClick={() => openImageModal(product.imagenes, 0)}
          />
          <h5 className="producto-title">{product.nombre}</h5>
          <h4 className="producto-price">Precio: ${product.precio.toFixed(2)}</h4>
          <button
            className="producto-button"
            onClick={() => addToCart(product)}
          >
           Comprar
          </button>
        </div>
      ))}
      {isModalOpen && (
        <TiendaImgAgrandar
          images={selectedImages}
          isOpen={isModalOpen}
          closeModal={closeImageModal}
          handlePrevImage={handlePrevImage}
          handleNextImage={handleNextImage}
        />
      )}
    </div>
  );
}

export default TiendaProductos;
