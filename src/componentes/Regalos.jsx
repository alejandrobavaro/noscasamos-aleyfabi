import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import "../assets/scss/_03-Componentes/_Regalos.scss";
import GiftForm from './GiftForm';
import GiftList from './GiftList';
import ReceivedGifts from './ReceivedGifts';
import ThankYouSection from './ThankYouSection';

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
  const [filters, setFilters] = useState({
    priority: 'all',
    reserved: 'all',
    search: ''
  });

  const addGift = (newGift) => {
    if (!newGift.name) return;
    
    const gift = {
      id: Math.max(...gifts.wishlist.map(g => g.id)) + 1,
      ...newGift,
      price: Number(newGift.price),
      reserved: false
    };
    
    setGifts(prev => ({
      ...prev,
      wishlist: [...prev.wishlist, gift]
    }));
  };

  const toggleReserved = (id) => {
    setGifts(prev => ({
      ...prev,
      wishlist: prev.wishlist.map(gift => 
        gift.id === id ? { ...gift, reserved: !gift.reserved } : gift
      )
    }));
  };

  const markThankYouSent = (id) => {
    setGifts(prev => ({
      ...prev,
      received: prev.received.map(gift => 
        gift.id === id ? { ...gift, thankYouSent: true } : gift
      )
    }));
  };

  const filteredWishlist = gifts.wishlist.filter(gift => {
    return (
      (filters.priority === 'all' || gift.priority === filters.priority) &&
      (filters.reserved === 'all' || gift.reserved === (filters.reserved === 'reserved')) &&
      (gift.name.toLowerCase().includes(filters.search.toLowerCase()) ||
      gift.description.toLowerCase().includes(filters.search.toLowerCase()))
    );
  });

  const budgetStats = {
    total: gifts.wishlist.reduce((sum, gift) => sum + gift.price, 0),
    reserved: gifts.wishlist
      .filter(gift => gift.reserved)
      .reduce((sum, gift) => sum + gift.price, 0),
    remaining: gifts.wishlist
      .filter(gift => !gift.reserved)
      .reduce((sum, gift) => sum + gift.price, 0)
  };

  return (
    <div className="regalos-container vintage-design">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="header-section"
      >
        <h1>Lista de Regalos</h1>
        <p className="subtitle">Nuestros deseos para comenzar nuestra vida juntos</p>
        <div className="divider floral"></div>
      </motion.div>
      
      <div className="tabs-container">
        <div className="tabs-nav">
          <button 
            className={`tab-button ${activeTab === 'wishlist' ? 'active' : ''}`}
            onClick={() => setActiveTab('wishlist')}
          >
            <i className="bi bi-heart"></i>
            Lista de Deseos
            <span className="badge">{gifts.wishlist.length}</span>
          </button>
          <button 
            className={`tab-button ${activeTab === 'received' ? 'active' : ''}`}
            onClick={() => setActiveTab('received')}
          >
            <i className="bi bi-gift"></i>
            Regalos Recibidos
            <span className="badge">{gifts.received.length}</span>
          </button>
          <button 
            className={`tab-button ${activeTab === 'thankyous' ? 'active' : ''}`}
            onClick={() => setActiveTab('thankyous')}
          >
            <i className="bi bi-envelope"></i>
            Agradecimientos
            <span className="badge">{gifts.received.filter(g => !g.thankYouSent).length}</span>
          </button>
        </div>
        
        <div className="tabs-content">
          <AnimatePresence mode="wait">
            {activeTab === 'wishlist' && (
              <motion.div
                key="wishlist"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className="tab-pane"
              >
                <div className="wishlist-grid">
                  <GiftForm onAddGift={addGift} />
                  <GiftList 
                    gifts={filteredWishlist} 
                    onToggleReserved={toggleReserved}
                    filters={filters}
                    onFilterChange={setFilters}
                    budgetStats={budgetStats}
                  />
                </div>
              </motion.div>
            )}
            
            {activeTab === 'received' && (
              <motion.div
                key="received"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className="tab-pane"
              >
                <ReceivedGifts 
                  gifts={gifts.received} 
                  onThankYouSent={markThankYouSent} 
                />
              </motion.div>
            )}
            
            {activeTab === 'thankyous' && (
              <motion.div
                key="thankyous"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className="tab-pane"
              >
                <ThankYouSection 
                  gifts={gifts.received.filter(g => !g.thankYouSent)} 
                  onThankYouSent={markThankYouSent} 
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      
      <motion.div 
        className="budget-summary"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <h3>
          <i className="bi bi-piggy-bank"></i>
          Presupuesto de Regalos
        </h3>
        <div className="budget-cards">
          <div className="budget-card">
            <span className="label">Total</span>
            <span className="amount">${budgetStats.total.toLocaleString()}</span>
          </div>
          <div className="budget-card reserved">
            <span className="label">Reservados</span>
            <span className="amount">${budgetStats.reserved.toLocaleString()}</span>
          </div>
          <div className="budget-card remaining">
            <span className="label">Disponibles</span>
            <span className="amount">${budgetStats.remaining.toLocaleString()}</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default Regalos;