import React, { useState } from 'react';
import { motion } from 'framer-motion'; // Importación faltante
import "../assets/scss/_03-Componentes/_GiftForm.scss";

function GiftForm({ onAddGift }) {
  const [newGift, setNewGift] = useState({
    name: '',
    description: '',
    price: '',
    priority: 'medium'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewGift({ ...newGift, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddGift(newGift);
    setNewGift({
      name: '',
      description: '',
      price: '',
      priority: 'medium'
    });
  };

  return (
    <motion.div 
      className="gift-form-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
    >
      <h2>
        <i className="bi bi-plus-circle"></i>
        Agregar Regalo
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>
            <i className="bi bi-tag"></i>
            Artículo:
          </label>
          <input 
            type="text" 
            name="name" 
            value={newGift.name}
            onChange={handleInputChange}
            placeholder="Ej. Juego de vajilla"
            required
            className="vintage-input"
          />
        </div>
        <div className="form-group">
          <label>
            <i className="bi bi-card-text"></i>
            Descripción:
          </label>
          <textarea 
            name="description" 
            value={newGift.description}
            onChange={handleInputChange}
            placeholder="Detalles sobre el artículo"
            className="vintage-textarea"
          ></textarea>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>
              <i className="bi bi-currency-dollar"></i>
              Precio aproximado:
            </label>
            <input 
              type="number" 
              name="price" 
              value={newGift.price}
              onChange={handleInputChange}
              placeholder="$"
              min="0"
              className="vintage-input"
            />
          </div>
          <div className="form-group">
            <label>
              <i className="bi bi-exclamation-triangle"></i>
              Prioridad:
            </label>
            <select 
              name="priority" 
              value={newGift.priority}
              onChange={handleInputChange}
              className="vintage-select"
            >
              <option value="high">Alta</option>
              <option value="medium">Media</option>
              <option value="low">Baja</option>
            </select>
          </div>
        </div>
        <button type="submit" className="vintage-button">
          <i className="bi bi-gift"></i>
          Agregar a la Lista
        </button>
      </form>
    </motion.div>
  );
}

export default GiftForm;