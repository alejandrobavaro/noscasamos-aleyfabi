import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import "../assets/scss/_03-Componentes/_PInvitadosRegalos.scss";

function PInvitadosRegalos() {
  const { nivelAcceso } = useAuth();
  const [gifts, setGifts] = useState([]);
  const [filters, setFilters] = useState({
    category: 'all',
    priceRange: 'all'
  });
  const [isLoading, setIsLoading] = useState(true);
  const [reservedGift, setReservedGift] = useState(null);
  const [showReservationModal, setShowReservationModal] = useState(false);
  const [guestInfo, setGuestInfo] = useState({
    name: '',
    email: '',
    message: ''
  });

  // Redirigir si no es invitado
  if (nivelAcceso !== "invitado") {
    return <Navigate to="/" replace />;
  }

  useEffect(() => {
    const loadGiftsData = async () => {
      try {
        const response = await fetch('/PInvitadosRegalos.json');
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        setGifts(data.wishlist || []);
      } catch (error) {
        console.error("Error al cargar datos de regalos:", error);
        setGifts([
          {
            id: 1,
            name: "Juego de vajilla",
            description: "Vajilla de porcelana para 12 personas",
            price: 25000,
            category: "Hogar",
            image: "/img/regalos/vajilla.jpg",
            reserved: false
          },
          {
            id: 2,
            name: "Tostadora de acero inoxidable",
            description: "Tostadora de 4 ranuras con control de temperatura",
            price: 12000,
            category: "Electrodomésticos",
            image: "/img/regalos/tostadora.jpg",
            reserved: false
          }
        ]);
      } finally {
        setIsLoading(false);
      }
    };

    loadGiftsData();
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleReserveClick = (gift) => {
    setReservedGift(gift);
    setShowReservationModal(true);
  };

  const handleGuestInfoChange = (e) => {
    const { name, value } = e.target;
    setGuestInfo(prev => ({ ...prev, [name]: value }));
  };

  const confirmReservation = () => {
    if (!guestInfo.name || !guestInfo.email) {
      alert('Por favor complete su nombre y email');
      return;
    }

    setGifts(prev => prev.map(g => 
      g.id === reservedGift.id ? { ...g, reserved: true } : g
    ));
    
    // Aquí normalmente enviaríamos los datos al servidor
    console.log('Regalo reservado:', {
      gift: reservedGift,
      guest: guestInfo
    });
    
    setShowReservationModal(false);
    setGuestInfo({ name: '', email: '', message: '' });
    alert(`¡Gracias ${guestInfo.name}! Has reservado "${reservedGift.name}"`);
  };

  const filteredGifts = gifts.filter(gift => {
    return (
      (filters.category === 'all' || gift.category === filters.category) &&
      (filters.priceRange === 'all' || 
        (filters.priceRange === 'low' && gift.price < 10000) ||
        (filters.priceRange === 'medium' && gift.price >= 10000 && gift.price < 20000) ||
        (filters.priceRange === 'high' && gift.price >= 20000))
    );
  });

  const categories = ['all', ...new Set(gifts.map(gift => gift.category))];

  if (isLoading) {
    return (
      <div className="pantalla-regalos loading">
        <div className="spinner"></div>
        <p>Cargando lista de regalos...</p>
      </div>
    );
  }

  return (
    <div className="pantalla-regalos">
      <div className="contenedor-regalos">
        <div className="encabezado-regalos">
          <h1>Lista de Regalos</h1>
          <p className="subtitulo">Elige un regalo para los novios</p>
        </div>

        <div className="gift-list-container">
          <div className="filters">
            <div className="filter-group">
              <label>
                <i className="bi bi-tags"></i>
                Categoría:
              </label>
              <select 
                name="category" 
                value={filters.category}
                onChange={handleFilterChange}
              >
                <option value="all">Todas las categorías</option>
                {categories.filter(cat => cat !== 'all').map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
            
            <div className="filter-group">
              <label>
                <i className="bi bi-currency-dollar"></i>
                Rango de precio:
              </label>
              <select 
                name="priceRange" 
                value={filters.priceRange}
                onChange={handleFilterChange}
              >
                <option value="all">Todos los precios</option>
                <option value="low">Menos de $10,000</option>
                <option value="medium">$10,000 - $20,000</option>
                <option value="high">Más de $20,000</option>
              </select>
            </div>
          </div>
          
          {filteredGifts.length > 0 ? (
            <div className="gift-grid">
              {filteredGifts.map((gift, index) => (
                <motion.div 
                  key={gift.id}
                  className={`gift-card ${gift.reserved ? 'reserved' : ''}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  {gift.image && (
                    <div className="gift-image">
                      <img src={gift.image} alt={gift.name} />
                    </div>
                  )}
                  <div className="gift-header">
                    <h3>{gift.name}</h3>
                    <span className="price">${gift.price.toLocaleString()}</span>
                  </div>
                  <p className="description">{gift.description}</p>
                  <div className="gift-footer">
                    <span className="category">{gift.category}</span>
                    <button 
                      className={`btn-reserve ${gift.reserved ? 'reserved' : ''}`}
                      onClick={() => !gift.reserved && handleReserveClick(gift)}
                      disabled={gift.reserved}
                    >
                      {gift.reserved ? (
                        '¡Reservado!'
                      ) : (
                        'Reservar este regalo'
                      )}
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="no-results">
              <i className="bi bi-gift"></i>
              <p>No se encontraron regalos con los filtros seleccionados</p>
            </div>
          )}
        </div>
      </div>

      {/* Modal de reserva */}
      {showReservationModal && (
        <div className="reservation-modal">
          <div className="modal-content">
            <h3>Reservar: {reservedGift?.name}</h3>
            <p>Por favor completa tus datos para reservar este regalo</p>
            
            <div className="form-group">
              <label>Tu nombre:</label>
              <input 
                type="text" 
                name="name" 
                value={guestInfo.name}
                onChange={handleGuestInfoChange}
                placeholder="Nombre completo"
                required
              />
            </div>
            
            <div className="form-group">
              <label>Tu email:</label>
              <input 
                type="email" 
                name="email" 
                value={guestInfo.email}
                onChange={handleGuestInfoChange}
                placeholder="Email de contacto"
                required
              />
            </div>
            
            <div className="form-group">
              <label>Mensaje para los novios (opcional):</label>
              <textarea 
                name="message" 
                value={guestInfo.message}
                onChange={handleGuestInfoChange}
                placeholder="Escribe un mensaje especial..."
              />
            </div>
            
            <div className="modal-actions">
              <button 
                className="btn-cancel"
                onClick={() => setShowReservationModal(false)}
              >
                Cancelar
              </button>
              <button 
                className="btn-confirm"
                onClick={confirmReservation}
              >
                Confirmar Reserva
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PInvitadosRegalos;