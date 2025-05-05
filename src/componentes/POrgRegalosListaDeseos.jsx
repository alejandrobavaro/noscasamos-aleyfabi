import React from 'react';
import { motion } from 'framer-motion';
import "../assets/scss/_03-Componentes/_POrgRegalosListaDeseos.scss";

function POrgRegalosListaDeseos({ gifts, onToggleReserved, filters, onFilterChange, budgetStats }) {
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    onFilterChange({ ...filters, [name]: value });
  };

  return (
    <div className="gift-list-container">
      <div className="gift-list-header">
        <h2>
          <i className="bi bi-stars"></i>
          Tu Lista de Deseos
        </h2>
        
        <div className="filters">
          <div className="filter-group">
            <label>
              <i className="bi bi-filter-circle"></i>
              Prioridad:
            </label>
            <select 
              name="priority" 
              value={filters.priority}
              onChange={handleFilterChange}
              className="vintage-select"
            >
              <option value="all">Todas</option>
              <option value="high">Alta</option>
              <option value="medium">Media</option>
              <option value="low">Baja</option>
            </select>
          </div>
          
          <div className="filter-group">
            <label>
              <i className="bi bi-bookmark-check"></i>
              Estado:
            </label>
            <select 
              name="reserved" 
              value={filters.reserved}
              onChange={handleFilterChange}
              className="vintage-select"
            >
              <option value="all">Todos</option>
              <option value="reserved">Reservados</option>
              <option value="available">Disponibles</option>
            </select>
          </div>
          
          <div className="filter-group search">
            <label>
              <i className="bi bi-search"></i>
              Buscar:
            </label>
            <input 
              type="text" 
              name="search" 
              value={filters.search}
              onChange={handleFilterChange}
              placeholder="Buscar POrgRegalos..."
              className="vintage-input"
            />
          </div>
        </div>
      </div>
      
      {gifts.length > 0 ? (
        <div className="gift-grid">
          {gifts.map((gift, index) => (
            <motion.div 
              key={gift.id}
              className={`gift-card ${gift.reserved ? 'reserved' : ''} priority-${gift.priority}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -5 }}
            >
              <div className="gift-header">
                <h3>{gift.name}</h3>
                <span className="price">${gift.price.toLocaleString()}</span>
              </div>
              <p className="description">{gift.description}</p>
              <div className="gift-footer">
                <span className={`priority ${gift.priority}`}>
                  {gift.priority === 'high' ? 'Alta prioridad' : 
                   gift.priority === 'medium' ? 'Prioridad media' : 'Baja prioridad'}
                </span>
                <button 
                  className={`btn-reserve ${gift.reserved ? 'reserved' : ''}`}
                  onClick={() => onToggleReserved(gift.id)}
                  aria-label={gift.reserved ? `Desmarcar ${gift.name} como reservado` : `Marcar ${gift.name} como reservado`}
                >
                  {gift.reserved ? (
                    <>
                      <i className="bi bi-check-circle"></i> Reservado
                    </>
                  ) : (
                    <>
                      <i className="bi bi-bookmark-plus"></i> Reservar
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="no-results">
          <i className="bi bi-gift"></i>
          <p>No se encontraron POrgRegalos con los filtros seleccionados</p>
        </div>
      )}
    </div>
  );
}

export default POrgRegalosListaDeseos;