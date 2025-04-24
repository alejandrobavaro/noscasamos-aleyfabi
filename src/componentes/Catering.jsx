import React, { useState } from 'react';
import "../assets/scss/_03-Componentes/_Catering.scss";

const initialData = {
  menuOptions: [
    {
      id: 'entradas',
      name: 'Entradas',
      items: [
        { id: 1, name: 'Carpaccio de res', selected: true, restrictions: ['gluten'] },
        { id: 2, name: 'Tartaletas de champiñones', selected: false, restrictions: [] },
        { id: 3, name: 'Ensalada César', selected: true, restrictions: [] }
      ]
    },
    {
      id: 'plato-fuerte',
      name: 'Plato Fuerte',
      items: [
        { id: 4, name: 'Filete mignon', selected: true, restrictions: [] },
        { id: 5, name: 'Salmón a la parrilla', selected: true, restrictions: ['pescado'] },
        { id: 6, name: 'Risotto de hongos', selected: false, restrictions: ['vegano'] }
      ]
    },
    {
      id: 'postres',
      name: 'Postres',
      items: [
        { id: 7, name: 'Pastel de bodas', selected: true, restrictions: ['gluten', 'lacteos'] },
        { id: 8, name: 'Fondue de chocolate', selected: true, restrictions: ['lacteos'] },
        { id: 9, name: 'Sorbete de frutas', selected: false, restrictions: [] }
      ]
    },
    {
      id: 'bebidas',
      name: 'Bebidas',
      items: [
        { id: 10, name: 'Vino tinto', selected: true, restrictions: ['alcohol'] },
        { id: 11, name: 'Vino blanco', selected: true, restrictions: ['alcohol'] },
        { id: 12, name: 'Jugos naturales', selected: true, restrictions: [] },
        { id: 13, name: 'Agua mineral', selected: true, restrictions: [] }
      ]
    }
  ],
  dietaryRestrictions: [
    { id: 'vegetariano', name: 'Vegetariano', count: 8 },
    { id: 'vegano', name: 'Vegano', count: 3 },
    { id: 'gluten', name: 'Sin gluten', count: 5 },
    { id: 'lacteos', name: 'Sin lácteos', count: 4 },
    { id: 'pescado', name: 'Alergia a mariscos', count: 2 },
    { id: 'alcohol', name: 'Sin alcohol', count: 6 }
  ],
  tableArrangement: [
    { id: 1, name: 'Mesa Principal', capacity: 10, guests: ['Alejandro', 'Fabiola', 'Padres', 'Abuelos', 'Padrinos'] },
    { id: 2, name: 'Mesa Familia Novio', capacity: 8, guests: ['Tíos', 'Primos'] },
    { id: 3, name: 'Mesa Familia Novia', capacity: 8, guests: ['Tíos', 'Primos'] },
    { id: 4, name: 'Mesa Amigos', capacity: 10, guests: ['Amigos universidad', 'Amigos infancia'] },
    { id: 5, name: 'Mesa Compañeros Trabajo', capacity: 6, guests: ['Compañeros Fabiola', 'Compañeros Alejandro'] }
  ]
};

function Catering() {
  const [menu, setMenu] = useState(initialData.menuOptions);
  const [restrictions] = useState(initialData.dietaryRestrictions);
  const [tables, setTables] = useState(initialData.tableArrangement);
  const [activeTab, setActiveTab] = useState('menu');
  const [newGuest, setNewGuest] = useState({ name: '', table: '' });

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

  const addGuestToTable = (tableId) => {
    if (!newGuest.name || !newGuest.table) return;
    
    const updatedTables = tables.map(table => 
      table.id === Number(newGuest.table)
        ? { ...table, guests: [...table.guests, newGuest.name] }
        : table
    );
    
    setTables(updatedTables);
    setNewGuest({ name: '', table: '' });
  };

  return (
    <div className="catering-container">
      <h1>Organización del Banquete</h1>
      
      <div className="tabs">
        <button 
          className={activeTab === 'menu' ? 'active' : ''}
          onClick={() => setActiveTab('menu')}
        >
          Menú Seleccionado
        </button>
        <button 
          className={activeTab === 'restrictions' ? 'active' : ''}
          onClick={() => setActiveTab('restrictions')}
        >
          Restricciones Alimentarias
        </button>
        <button 
          className={activeTab === 'tables' ? 'active' : ''}
          onClick={() => setActiveTab('tables')}
        >
          Distribución de Mesas
        </button>
      </div>
      
      {activeTab === 'menu' && (
        <div className="menu-section">
          <h2>Menú para la Recepción</h2>
          <p className="subtitle">Selecciona los platillos que se servirán en tu boda</p>
          
          <div className="menu-categories">
            {menu.map(category => (
              <div key={category.id} className="menu-category">
                <h3>{category.name}</h3>
                <ul className="menu-items">
                  {category.items.map(item => (
                    <li 
                      key={item.id} 
                      className={`menu-item ${item.selected ? 'selected' : ''}`}
                      onClick={() => toggleMenuItem(category.id, item.id)}
                    >
                      <input 
                        type="checkbox" 
                        checked={item.selected}
                        readOnly
                      />
                      <label>
                        {item.name}
                        {item.restrictions.length > 0 && (
                          <span className="restrictions">
                            {item.restrictions.map(r => (
                              <span key={r} className={`restriction ${r}`}>{r}</span>
                            ))}
                          </span>
                        )}
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          
          <div className="selected-menu-summary">
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
          <h2>Restricciones Alimentarias de los Invitados</h2>
          <p className="subtitle">Registro de necesidades dietéticas especiales</p>
          
          <div className="restrictions-grid">
            {restrictions.map(restriction => (
              <div key={restriction.id} className="restriction-card">
                <h3>{restriction.name}</h3>
                <p className="count">{restriction.count} invitados</p>
                <div className="progress-bar">
                  <div 
                    className="progress" 
                    style={{ width: `${(restriction.count / 120) * 100}%` }}
                  ></div>
                </div>
                <button className="btn-details">Ver Detalles</button>
              </div>
            ))}
          </div>
          
          <div className="restrictions-notes">
            <h3>Notas para el Catering</h3>
            <textarea placeholder="Agrega aquí cualquier nota especial sobre alergias o restricciones que deba conocer el personal de catering..."></textarea>
            <button className="btn-save">Guardar Notas</button>
          </div>
        </div>
      )}
      
      {activeTab === 'tables' && (
        <div className="tables-section">
          <h2>Distribución de Mesas</h2>
          <p className="subtitle">Organiza a tus invitados en las diferentes mesas</p>
          
          <div className="add-guest-form">
            <h3>Agregar Invitado a Mesa</h3>
            <div className="form-row">
              <div className="form-group">
                <label>Nombre del Invitado:</label>
                <input 
                  type="text" 
                  value={newGuest.name}
                  onChange={(e) => setNewGuest({...newGuest, name: e.target.value})}
                  placeholder="Nombre completo o grupo"
                />
              </div>
              <div className="form-group">
                <label>Mesa:</label>
                <select 
                  value={newGuest.table}
                  onChange={(e) => setNewGuest({...newGuest, table: e.target.value})}
                >
                  <option value="">Seleccionar mesa</option>
                  {tables.map(table => (
                    <option key={table.id} value={table.id}>
                      {table.name} ({table.guests.length}/{table.capacity})
                    </option>
                  ))}
                </select>
              </div>
              <button 
                className="btn-add"
                onClick={addGuestToTable}
                disabled={!newGuest.name || !newGuest.table}
              >
                Agregar
              </button>
            </div>
          </div>
          
          <div className="tables-grid">
            {tables.map(table => (
              <div 
                key={table.id} 
                className={`table-card ${table.guests.length >= table.capacity ? 'full' : ''}`}
              >
                <div className="table-header">
                  <h3>{table.name}</h3>
                  <span className="capacity">
                    {table.guests.length}/{table.capacity} personas
                  </span>
                </div>
                <ul className="guest-list">
                  {table.guests.map((guest, index) => (
                    <li key={index}>{guest}</li>
                  ))}
                </ul>
                {table.guests.length === 0 && (
                  <p className="empty-message">No hay invitados asignados aún</p>
                )}
                {table.guests.length >= table.capacity && (
                  <p className="full-message">¡Mesa llena!</p>
                )}
              </div>
            ))}
          </div>
          
          <div className="seating-plan-notes">
            <h3>Notas para el Plan de Asientos</h3>
            <textarea placeholder="Agrega aquí cualquier nota especial sobre la distribución de mesas..."></textarea>
            <button className="btn-save">Guardar Notas</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Catering;