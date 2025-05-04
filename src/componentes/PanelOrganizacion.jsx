import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Presupuesto from './Presupuesto';
import ChecklistBoda from './ChecklistBoda';
import Regalos from './Regalos';
import Catering from './Catering';
import Invitaciones from './Invitaciones';
import IdeasEpicas from './IdeasEpicas';
import Mesas from './Mesas';
import "../assets/scss/_03-Componentes/_PanelOrganizacion.scss";

function PanelOrganizacion() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('organizacion');
  const [daysRemaining, setDaysRemaining] = useState(0);

  // URLs de imágenes locales en la carpeta public/img
  const imagePaths = {
    countdown: '/img/wedding-countdown.png',
    tasks: '/img/wedding-tasks.png',
    guests: '/img/wedding-guests.png',
    budget: '/img/wedding-budget.png',
    floralDivider: '/img/floral-divider.png'
  };

  useEffect(() => {
    const weddingDate = new Date('2025-11-23');
    const today = new Date();
    const diffTime = weddingDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    setDaysRemaining(diffDays > 0 ? diffDays : 0);
  }, []);

  const renderContent = () => {
    switch(activeTab) {
      case 'presupuesto': return <Presupuesto />;
      case 'checklist': return <ChecklistBoda />;
      case 'regalos': return <Regalos />;
      case 'catering': return <Catering />;
      case 'invitaciones': return <Invitaciones />;
      case 'ideas': return <IdeasEpicas />;
      case 'mesas': return <Mesas />;
      default: return <DefaultOrganizationView daysRemaining={daysRemaining} imagePaths={imagePaths} />;
    }
  };

  return (
    <motion.div 
      className="panel-organizacion"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="encabezado-panel">
        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.5 }}
        >
          <h1>Panel de Organización</h1>
        </motion.h1>
        <motion.p
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
         <h2> Bienvenidos, Alejandro y Fabiola</h2>
        </motion.p>
        
        <motion.div 
          className="wedding-countdown"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <span>{daysRemaining} días para el gran día</span>
          <div className="progress-bar">
            <motion.div 
              className="progress" 
              initial={{ width: 0 }}
              animate={{ width: `${100 - (daysRemaining / 365 * 100)}%` }}
              transition={{ delay: 0.4, duration: 1, type: 'spring' }}
            ></motion.div>
          </div>
        </motion.div>
      </div>

      <motion.div 
        className="tabs-container"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <div className="tabs">
          {[
            { id: 'organizacion', icon: 'bi-kanban', label: 'Organización' },
            { id: 'presupuesto', icon: 'bi-cash-stack', label: 'Presupuesto' },
            { id: 'checklist', icon: 'bi-list-check', label: 'Checklist' },
            { id: 'regalos', icon: 'bi-gift', label: 'Regalos' },
            { id: 'catering', icon: 'bi-egg-fried', label: 'Catering' },
            { id: 'invitaciones', icon: 'bi-envelope', label: 'Invitaciones' },
            { id: 'ideas', icon: 'bi-lightbulb', label: 'Ideas' },
            { id: 'mesas', icon: 'bi-people', label: 'Mesas' }
          ].map((tab) => (
            <motion.button
              key={tab.id}
              className={activeTab === tab.id ? 'active' : ''}
              onClick={() => setActiveTab(tab.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <i className={`bi ${tab.icon}`}></i>
              {tab.label}
            </motion.button>
          ))}
        </div>
      </motion.div>

      <motion.div 
        className="content-container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}

// Componente para la vista por defecto (organización)
function DefaultOrganizationView({ daysRemaining, imagePaths }) {
  const stats = [
    { 
      value: daysRemaining, 
      label: "Días restantes", 
      progress: 100 - (daysRemaining / 365 * 100),
      image: imagePaths.countdown,
      color: "#9C6F6F"
    },
    { 
      value: "35%", 
      label: "Tareas completadas", 
      progress: 35,
      image: imagePaths.tasks,
      color: "#C2A78D"
    },
    { 
      value: 87, 
      label: "Invitados confirmados", 
      progress: 72,
      image: imagePaths.guests,
      color: "#A78D7E"
    },
    { 
      value: "65%", 
      label: "Presupuesto utilizado", 
      progress: 65,
      image: imagePaths.budget,
      color: "#7A4F50"
    }
  ];

  return (
    <div className="default-organization-view">
      <div className="section-header">
        <motion.h2
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Resumen General
        </motion.h2>
        <motion.img 
          src={imagePaths.floralDivider} 
          alt="Floral divider"
          className="divider"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        />
      </div>
      
      <div className="stats-grid">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            className="stat-card"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
            whileHover={{ y: -5 }}
          >
            <div className="card-bg" style={{ backgroundColor: stat.color }}></div>
            <div className="stat-image">
              <motion.img 
                src={stat.image} 
                alt={stat.label}
                whileHover={{ scale: 1.1 }}
                transition={{ type: 'spring', stiffness: 300 }}
              />
            </div>
            <div className="stat-content">
              <motion.h3
                whileHover={{ scale: 1.05 }}
              >
                {stat.value}
              </motion.h3>
              <p>{stat.label}</p>
              <div className="progress-container">
                <div className="progress-bar">
                  <motion.div 
                    className="progress" 
                    initial={{ width: 0 }}
                    animate={{ width: `${stat.progress}%` }}
                    transition={{ delay: 0.6 + index * 0.1, duration: 1 }}
                    style={{ backgroundColor: stat.color }}
                  ></motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default PanelOrganizacion;