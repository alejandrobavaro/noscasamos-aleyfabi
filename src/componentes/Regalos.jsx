import React, { useState } from 'react';
import "../assets/scss/_03-Componentes/_Regalos.scss";

const initialGifts = {
  wishlist: [
    { id: 1, name: 'Juego de vajilla', description: 'Vajilla de porcelana blanca para 12 personas', price: 12000, priority: 'high', reserved: false },
    { id: 2, name: 'Licuadora de alta potencia', description: 'Licuadora profesional 1500W', price: 4500, priority: 'medium', reserved: true },
    { id: 3, name: 'Set de sartenes antiadherentes', description: 'Set de 6 piezas de calidad profesional', price: 3500, priority: 'high', reserved: false },
    { id: 4, name: 'Robot aspirador', description: 'Aspiradora inteligente con app', price: 8500, priority: 'low', reserved: false },
  ],
  received: [
    { id: 101, name: 'Tostadora de acero inoxidable', giver: 'María González', date: '2025-09-15', thankYouSent: true },
    { id: 102, name: 'Juego de copas de vino', giver: 'Carlos y Laura Martínez', date: '2025-10-02', thankYouSent: false },
    { id: 103, name: 'Máquina de café espresso', giver: 'Familia Rodríguez', date: '2025-10-10', thankYouSent: false },
  ]
};

function Regalos() {
  const [gifts, setGifts] = useState(initialGifts);
  const [activeTab, setActiveTab] = useState('wishlist');
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

  const addGift = () => {
    if (!newGift.name) return;
    
    const gift = {
      id: Math.max(...gifts.wishlist.map(g => g.id)) + 1,
      name: newGift.name,
      description: newGift.description,
      price: Number(newGift.price),
      priority: newGift.priority,
      reserved: false
    };
    
    setGifts({
      ...gifts,
      wishlist: [...gifts.wishlist, gift]
    });
    
    setNewGift({
      name: '',
      description: '',
      price: '',
      priority: 'medium'
    });
  };

  const markThankYouSent = (id) => {
    setGifts({
      ...gifts,
      received: gifts.received.map(gift => 
        gift.id === id ? { ...gift, thankYouSent: true } : gift
      )
    });
  };

  const toggleReserved = (id) => {
    setGifts({
      ...gifts,
      wishlist: gifts.wishlist.map(gift => 
        gift.id === id ? { ...gift, reserved: !gift.reserved } : gift
      )
    });
  };

  return (
    <div className="regalos-container">
      <h1>Gestión de Regalos</h1>
      
      <div className="tabs">
        <button 
          className={activeTab === 'wishlist' ? 'active' : ''}
          onClick={() => setActiveTab('wishlist')}
        >
          Lista de Deseos
        </button>
        <button 
          className={activeTab === 'received' ? 'active' : ''}
          onClick={() => setActiveTab('received')}
        >
          Regalos Recibidos ({gifts.received.length})
        </button>
        <button 
          className={activeTab === 'thankyous' ? 'active' : ''}
          onClick={() => setActiveTab('thankyous')}
        >
          Agradecimientos ({gifts.received.filter(g => !g.thankYouSent).length})
        </button>
      </div>
      
      {activeTab === 'wishlist' && (
        <div className="wishlist-section">
          <div className="add-gift-form">
            <h2>Agregar a la Lista de Deseos</h2>
            <div className="form-group">
              <label>Artículo:</label>
              <input 
                type="text" 
                name="name" 
                value={newGift.name}
                onChange={handleInputChange}
                placeholder="Ej. Juego de vajilla"
              />
            </div>
            <div className="form-group">
              <label>Descripción:</label>
              <textarea 
                name="description" 
                value={newGift.description}
                onChange={handleInputChange}
                placeholder="Detalles sobre el artículo"
              ></textarea>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Precio aproximado:</label>
                <input 
                  type="number" 
                  name="price" 
                  value={newGift.price}
                  onChange={handleInputChange}
                  placeholder="$"
                />
              </div>
              <div className="form-group">
                <label>Prioridad:</label>
                <select 
                  name="priority" 
                  value={newGift.priority}
                  onChange={handleInputChange}
                >
                  <option value="high">Alta</option>
                  <option value="medium">Media</option>
                  <option value="low">Baja</option>
                </select>
              </div>
            </div>
            <button className="btn-add" onClick={addGift}>
              Agregar a la Lista
            </button>
          </div>
          
          <div className="gift-list">
            <h2>Tu Lista de Deseos</h2>
            <div className="gift-grid">
              {gifts.wishlist.map(gift => (
                <div 
                  key={gift.id} 
                  className={`gift-card ${gift.reserved ? 'reserved' : ''} priority-${gift.priority}`}
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
                      onClick={() => toggleReserved(gift.id)}
                    >
                      {gift.reserved ? 'Reservado ✓' : 'Marcar como Reservado'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      
      {activeTab === 'received' && (
        <div className="received-section">
          <h2>Regalos Recibidos</h2>
          <div className="stats">
            <div className="stat-card">
              <i className="bi bi-gift"></i>
              <h3>Total Recibidos</h3>
              <p>{gifts.received.length}</p>
            </div>
            <div className="stat-card">
              <i className="bi bi-envelope-check"></i>
              <h3>Agradecimientos Enviados</h3>
              <p>{gifts.received.filter(g => g.thankYouSent).length}</p>
            </div>
            <div className="stat-card">
              <i className="bi bi-envelope-exclamation"></i>
              <h3>Pendientes por Agradecer</h3>
              <p>{gifts.received.filter(g => !g.thankYouSent).length}</p>
            </div>
          </div>
          
          <table className="received-gifts-table">
            <thead>
              <tr>
                <th>Regalo</th>
                <th>Regalado por</th>
                <th>Fecha</th>
                <th>Agradecimiento</th>
              </tr>
            </thead>
            <tbody>
              {gifts.received.map(gift => (
                <tr key={gift.id}>
                  <td>{gift.name}</td>
                  <td>{gift.giver}</td>
                  <td>{formatDate(gift.date)}</td>
                  <td>
                    {gift.thankYouSent ? (
                      <span className="thank-you-sent">Enviado ✓</span>
                    ) : (
                      <button 
                        className="btn-thank-you"
                        onClick={() => markThankYouSent(gift.id)}
                      >
                        Marcar como Agradecido
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      
      {activeTab === 'thankyous' && (
        <div className="thankyous-section">
          <h2>Agradecimientos Pendientes</h2>
          {gifts.received.filter(g => !g.thankYouSent).length === 0 ? (
            <div className="no-pending">
              <i className="bi bi-check2-circle"></i>
              <p>¡Todos los agradecimientos han sido enviados!</p>
            </div>
          ) : (
            <div className="pending-cards">
              {gifts.received.filter(g => !g.thankYouSent).map(gift => (
                <div key={gift.id} className="thankyou-card">
                  <div className="card-header">
                    <h3>Para: {gift.giver}</h3>
                    <span className="date">{formatDate(gift.date)}</span>
                  </div>
                  <div className="card-body">
                    <p className="gift-name">{gift.name}</p>
                    <textarea 
                      placeholder="Escribe tu mensaje de agradecimiento aquí..."
                      defaultValue={`¡Queridos ${gift.giver.split(' ')[0]}!\n\nMuchas gracias por el hermoso ${gift.name}. Lo apreciamos mucho y...`}
                    ></textarea>
                  </div>
                  <div className="card-footer">
                    <button 
                      className="btn-send"
                      onClick={() => markThankYouSent(gift.id)}
                    >
                      <i className="bi bi-envelope-paper"></i> Enviar Agradecimiento
                    </button>
                    <button className="btn-reminder">
                      <i className="bi bi-bell"></i> Recordarme más tarde
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function formatDate(dateString) {
  const options = { day: 'numeric', month: 'short', year: 'numeric' };
  return new Date(dateString).toLocaleDateString('es-ES', options);
}

export default Regalos;