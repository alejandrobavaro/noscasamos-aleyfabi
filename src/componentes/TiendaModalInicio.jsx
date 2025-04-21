import React from "react";
import Modal from "react-modal";
import '../assets/scss/_03-Componentes/_TiendaModalInicio.scss'; 

Modal.setAppElement("#root"); // Asegúrate de que el ID 'root' esté presente en tu index.html

const TiendaModalInicio = ({ showModal, closeModal }) => {
  return (
    <Modal
      isOpen={showModal}
      onRequestClose={closeModal}
      contentLabel="Promoción"
      className="tienda-Modal"
      overlayClassName="tienda-Overlay"
    >
      <div className="tienda-modal-wrapper">
        <button onClick={closeModal} className="tienda-modal-close">
          &times; {/* Carácter '×' para cerrar */}
        </button>
        <div className="tienda-modal-content">
          <h2>Personalizate!</h2>
          <p className="tienda-tituloImportante">Aprovechá estos beneficios!</p>
          <div className="tienda-promo-list">
            <div className="tienda-promo-item tienda-detalleBlanco">Super Ofertas!</div>
            <div className="tienda-promo-item">Productos 20% Off!</div>
            <div className="tienda-promo-item">Envios a todo el país!</div>
            <div className="tienda-promo-item tienda-detalleBlanco">Super Ahorro!!</div>
          </div>
          <hr />
          <button onClick={closeModal} className="tienda-btn-primary">
            Ver más!
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default TiendaModalInicio;
