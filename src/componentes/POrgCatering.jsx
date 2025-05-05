import React, { useState } from 'react';
import POrgCateringData from '/src/json/POrgCatering.json';
import "../assets/scss/_03-Componentes/_POrgCatering.scss";

function POrgCatering() {
  const [menu, setMenu] = useState(POrgCateringData.menuOptions);
  const [restrictions] = useState(POrgCateringData.dietaryRestrictions);
  const [activeTab, setActiveTab] = useState('menu');
  const [notes, setNotes] = useState({
    POrgCatering: ''
  });

  const toggleMenuItem = (categoryId, itemId) => {
    setMenu(menu.map(category => 
      category.id === categoryId 
        ? { 
            ...category, 
            items: category.items.map(item => 
              item.id === itemId ? { ...item, selected: !item.selected } : item
            )
          } 
        : category
    ));
  };

  const handleNotesChange = (value) => {
    setNotes(prev => ({
      ...prev,
      POrgCatering: value
    }));
  };

  const saveNotes = () => {
    console.log('Notas de POrgCatering guardadas:', notes.POrgCatering);
  };

  return (
    <div className="POrgCatering-container">
      <div className="POrgCatering-header">
        <h1>Menu para la Boda</h1>
        <p className="wedding-subtitle">Planifica el menú y las restricciones alimentarias para tu gran día</p>
      </div>
      
      <div className="POrgCatering-tabs">
        <button 
          className={`tab-btn ${activeTab === 'menu' ? 'active' : ''}`}
          onClick={() => setActiveTab('menu')}
        >
          <i className="bi bi-menu-button-wide"></i> Menú
        </button>
        <button 
          className={`tab-btn ${activeTab === 'restrictions' ? 'active' : ''}`}
          onClick={() => setActiveTab('restrictions')}
        >
          <i className="bi bi-clipboard2-pulse"></i> Restricciones
        </button>
      </div>
      
      <div className="POrgCatering-content">
        {activeTab === 'menu' && (
          <div className="menu-section">
            <div className="section-header">
              <h2>Menú para la Recepción</h2>
              <p>Selecciona los platillos que se servirán en tu boda</p>
            </div>
            
            <div className="menu-grid">
              {menu.map(category => (
                <div key={category.id} className="menu-category">
                  <div className="category-header">
                    <h3>{category.name}</h3>
                    <span className="counter">
                      {category.items.filter(i => i.selected).length}/{category.items.length}
                    </span>
                  </div>
                  
                  <ul className="menu-items">
                    {category.items.map(item => (
                      <li 
                        key={item.id} 
                        className={`menu-item ${item.selected ? 'selected' : ''}`}
                        onClick={() => toggleMenuItem(category.id, item.id)}
                      >
                        <div className="item-checkbox">
                          <input 
                            type="checkbox" 
                            checked={item.selected}
                            readOnly
                          />
                          <span className="checkmark"></span>
                        </div>
                        <div className="item-content">
                          <span className="item-name">{item.name}</span>
                          {item.restrictions.length > 0 && (
                            <div className="restrictions">
                              {item.restrictions.map(r => (
                                <span key={r} className={`restriction-tag ${r}`}>
                                  {r}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            
            <div className="menu-summary">
              <h3>Resumen del Menú Seleccionado</h3>
              <div className="summary-grid">
                {menu.map(category => {
                  const selectedItems = category.items.filter(item => item.selected);
                  if (selectedItems.length === 0) return null;
                  
                  return (
                    <div key={category.id} className="summary-category">
                      <h4>{category.name}</h4>
                      <ul>
                        {selectedItems.map(item => (
                          <li key={item.id}>
                            {item.name}
                            {item.restrictions.length > 0 && (
                              <span className="restrictions">
                                ({item.restrictions.join(', ')})
                              </span>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'restrictions' && (
          <div className="restrictions-section">
            <div className="section-header">
              <h2>Restricciones Alimentarias</h2>
              <p>Registro de necesidades dietéticas especiales</p>
            </div>
            
            <div className="restrictions-cards">
              {restrictions.map(restriction => (
                <div key={restriction.id} className="restriction-card">
                  <h3>{restriction.name}</h3>
                  <p className="guest-count">{restriction.count} invitados</p>
                  <div className="progress-container">
                    <div 
                      className="progress-bar" 
                      style={{ width: `${(restriction.count / 120) * 100}%` }}
                    ></div>
                  </div>
                  <button className="details-btn">
                    <i className="bi bi-list"></i> Ver detalles
                  </button>
                </div>
              ))}
            </div>
            
            <div className="notes-section">
              <h3>Notas para el POrgCatering</h3>
              <textarea 
                value={notes.POrgCatering}
                onChange={(e) => handleNotesChange(e.target.value)}
                placeholder="Agrega aquí cualquier nota especial sobre alergias o restricciones..."
              ></textarea>
              <button 
                className="save-btn"
                onClick={saveNotes}
              >
                <i className="bi bi-save"></i> Guardar Notas
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default POrgCatering;