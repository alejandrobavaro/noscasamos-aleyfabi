import React from 'react';
import { motion } from 'framer-motion';
import "../assets/scss/_03-Componentes/_POrgRegalosRecibidos.scss";

function POrgRegalosRecibidos({ gifts, onThankYouSent }) {
  const formatDate = (dateString) => {
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('es-ES', options);
  };

  const stats = {
    total: gifts.length,
    thanked: gifts.filter(g => g.thankYouSent).length,
    pending: gifts.filter(g => !g.thankYouSent).length
  };

  return (
    <div className="received-gifts-container">
      <motion.div 
        className="stats-grid"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ staggerChildren: 0.1 }}
      >
        <motion.div 
          className="stat-card total"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <div className="stat-icon">
            <i className="bi bi-box-seam"></i>
          </div>
          <h3>Total Recibidos</h3>
          <p>{stats.total}</p>
        </motion.div>
        
        <motion.div 
          className="stat-card thanked"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <div className="stat-icon">
            <i className="bi bi-envelope-check"></i>
          </div>
          <h3>Agradecimientos Enviados</h3>
          <p>{stats.thanked}</p>
        </motion.div>
        
        <motion.div 
          className="stat-card pending"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="stat-icon">
            <i className="bi bi-envelope-exclamation"></i>
          </div>
          <h3>Pendientes por Agradecer</h3>
          <p>{stats.pending}</p>
        </motion.div>
      </motion.div>
      
      <div className="gifts-table">
        <div className="table-header">
          <div className="header-cell">Regalo</div>
          <div className="header-cell">Regalado por</div>
          <div className="header-cell">Fecha</div>
          <div className="header-cell">Agradecimiento</div>
        </div>
        
        <div className="table-body">
          {gifts.length > 0 ? (
            gifts.map((gift, index) => (
              <motion.div 
                key={gift.id}
                className="table-row"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <div className="table-cell">{gift.name}</div>
                <div className="table-cell">{gift.giver}</div>
                <div className="table-cell">{formatDate(gift.date)}</div>
                <div className="table-cell">
                  {gift.thankYouSent ? (
                    <span className="thank-you-sent">
                      <i className="bi bi-check-circle"></i> Enviado
                    </span>
                  ) : (
                    <button 
                      className="thank-you-btn"
                      onClick={() => onThankYouSent(gift.id)}
                    >
                      <i className="bi bi-envelope-plus"></i> Agradecer
                    </button>
                  )}
                </div>
              </motion.div>
            ))
          ) : (
            <div className="no-gifts">
              <i className="bi bi-gift"></i>
              <p>No hay POrgRegalos recibidos aún</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default POrgRegalosRecibidos;