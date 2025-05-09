import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import "../assets/scss/_03-Componentes/_POrgRegalos.scss";

import POrgRegalosListaDeseos from './POrgRegalosListaDeseos';
import POrgRegalosRecibidos from './POrgRegalosRecibidos';
import POrgRegalosAgradecidos from './POrgRegalosAgradecidos';

function POrgRegalos() {
  const [gifts, setGifts] = useState({
    wishlist: [],
    received: []
  });
  const [activeTab, setActiveTab] = useState('wishlist');
  const [filters, setFilters] = useState({
    priority: 'all',
    reserved: 'all',
    search: '',
    category: 'all'
  });
  const [isLoading, setIsLoading] = useState(true);

  // Cargar datos del JSON
  useEffect(() => {
    const loadGiftsData = async () => {
      try {
        const response = await fetch('/POrgRegalos.json');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setGifts(data);
      } catch (error) {
        console.error("Error al cargar datos de regalos:", error);
        // Datos de prueba en caso de error
        setGifts({
          wishlist: [
            {
              id: 1,
              name: "Juego de vajilla",
              description: "Vajilla de porcelana para 12 personas",
              price: 25000,
              priority: "high",
              reserved: false,
              category: "Hogar",
              image: "/img/regalos/vajilla.jpg"
            }
          ],
          received: []
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadGiftsData();
  }, []);

  const categories = ['all', ...new Set(gifts.wishlist.map(gift => gift.category))];

  const addGift = (newGift) => {
    if (!newGift.name) return;
    
    const gift = {
      id: Math.max(0, ...gifts.wishlist.map(g => g.id)) + 1,
      ...newGift,
      price: Number(newGift.price) || 0,
      reserved: false,
      category: newGift.category || 'Otros',
      image: newGift.image || '/img/regalos/default.jpg',
      storeLinks: [],
      notes: ''
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
      (filters.category === 'all' || gift.category === filters.category) &&
      (gift.name.toLowerCase().includes(filters.search.toLowerCase()) ||
      gift.description?.toLowerCase().includes(filters.search.toLowerCase()))
    );
  });

  const budgetStats = {
    total: gifts.wishlist.reduce((sum, gift) => sum + (gift.price || 0), 0),
    reserved: gifts.wishlist
      .filter(gift => gift.reserved)
      .reduce((sum, gift) => sum + (gift.price || 0), 0),
    remaining: gifts.wishlist
      .filter(gift => !gift.reserved)
      .reduce((sum, gift) => sum + (gift.price || 0), 0)
  };

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
        {/* Encabezado */}
        <div className="encabezado-boda">
          <h1>Lista de Regalos</h1>
        </div>

        {/* Pestañas */}
        <div className="pestanas">
          <button 
            className={`pestana ${activeTab === 'wishlist' ? 'activa' : ''}`}
            onClick={() => setActiveTab('wishlist')}
          >
            <i className="bi bi-heart-fill"></i>
            Lista de Deseos
            <span className="contador">{gifts.wishlist.length}</span>
          </button>
          
          <button 
            className={`pestana ${activeTab === 'received' ? 'activa' : ''}`}
            onClick={() => setActiveTab('received')}
          >
            <i className="bi bi-gift-fill"></i>
            Regalos Recibidos
            <span className="contador">{gifts.received.length}</span>
          </button>
          
          <button 
            className={`pestana ${activeTab === 'thankyous' ? 'activa' : ''}`}
            onClick={() => setActiveTab('thankyous')}
          >
            <i className="bi bi-envelope-paper-heart"></i>
            Agradecimientos
            <span className="contador">{gifts.received.filter(g => !g.thankYouSent).length}</span>
          </button>
        </div>

        {/* Contenido */}
        <div className="contenido-pestanas">
          <AnimatePresence mode="wait">
            {activeTab === 'wishlist' && (
              <motion.div
                key="wishlist"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className="contenido-pestana"
              >
                <div className="grid-lista-deseos">
                  <POrgRegalosListaDeseos 
                    gifts={filteredWishlist} 
                    onToggleReserved={toggleReserved}
                    filters={filters}
                    onFilterChange={setFilters}
                    budgetStats={budgetStats}
                    categories={categories}
                    onAddGift={addGift}
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
                className="contenido-pestana"
              >
                <POrgRegalosRecibidos 
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
                className="contenido-pestana"
              >
                <POrgRegalosAgradecidos 
                  gifts={gifts.received.filter(g => !g.thankYouSent)} 
                  onThankYouSent={markThankYouSent} 
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Resumen de presupuesto */}
        <div className="resumen-presupuesto">
          <h3>
            <i className="bi bi-piggy-bank-fill"></i>
            Presupuesto Total
          </h3>
          
          <div className="tarjetas-presupuesto">
            <div className="tarjeta">
              <div className="icono-titulo">
                <i className="bi bi-cash-stack"></i>
                <h4>Valor Total</h4>
              </div>
              <p className="valor">${budgetStats.total.toLocaleString()}</p>
            </div>
            
            <div className="tarjeta">
              <div className="icono-titulo">
                <i className="bi bi-check-circle"></i>
                <h4>Reservados</h4>
              </div>
              <p className="valor">${budgetStats.reserved.toLocaleString()}</p>
            </div>
            
            <div className="tarjeta">
              <div className="icono-titulo">
                <i className="bi bi-hourglass"></i>
                <h4>Por Cubrir</h4>
              </div>
              <p className="valor">${budgetStats.remaining.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default POrgRegalos;