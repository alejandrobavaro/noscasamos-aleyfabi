import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import "../assets/scss/_03-Componentes/_POrganizacion.scss";

// Component imports
import POrgPresupuesto from './POrgPresupuesto';
import POrgTareasBoda from './POrgTareasBoda';
import POrgRegalos from './POrgRegalos';
import POrgCatering from './POrgCatering';
import POrgInvitaciones from './POrgInvitaciones';
import POrgMesas from './POrgMesas';

function POrganizacion() {
  const [activeTab, setActiveTab] = useState('resumen');
  const [daysRemaining, setDaysRemaining] = useState(0);
  const [progress, setProgress] = useState(0);

  const weddingStats = [
    { 
      id: 'dias',
      title: 'Días restantes', 
      value: daysRemaining,
      icon: 'bi-calendar-heart',
      color: '#7A4F50',
      progress: progress
    },
    { 
      id: 'tareas',
      title: 'Tareas completadas', 
      value: '35%',
      icon: 'bi-list-check',
      color: '#C2A78D',
      progress: 35
    },
    { 
      id: 'invitados',
      title: 'Invitados confirmados', 
      value: '87/120',
      icon: 'bi-people-fill',
      color: '#8C5E3D',
      progress: 72
    },
    { 
      id: 'presupuesto',
      title: 'Presupuesto utilizado', 
      value: '65%',
      icon: 'bi-cash-stack',
      color: '#5A2D2D',
      progress: 65
    }
  ];

  useEffect(() => {
    const weddingDate = new Date('2025-11-23');
    const today = new Date();
    const diffTime = weddingDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    setDaysRemaining(diffDays > 0 ? diffDays : 0);
    
    const totalDays = 365;
    const calculatedProgress = 100 - (diffDays / totalDays * 100);
    setProgress(Math.min(100, Math.max(0, calculatedProgress)));
  }, []);

  const renderTabContent = () => {
    switch(activeTab) {
      case 'presupuesto': return <POrgPresupuesto />;
      case 'checklist': return <POrgTareasBoda />;
      case 'regalos': return <POrgRegalos />;
      case 'catering': return <POrgCatering />;
      case 'invitaciones': return <POrgInvitaciones />;
      case 'mesas': return <POrgMesas />;
      default: return <ResumenGeneral stats={weddingStats} />;
    }
  };

  const tabs = [
    { id: 'resumen', label: 'Resumen', icon: 'bi-house-door' },
    { id: 'presupuesto', label: 'Presupuesto', icon: 'bi-cash-stack' },
    { id: 'checklist', label: 'Tareas', icon: 'bi-list-check' },
    { id: 'invitaciones', label: 'Invitaciones', icon: 'bi-envelope' },
    { id: 'regalos', label: 'Regalos', icon: 'bi-gift' },
    { id: 'catering', label: 'Catering', icon: 'bi-egg-fried' },
    { id: 'mesas', label: 'Mesas', icon: 'bi-table' }
  ];

  return (
    <div className="organization-screen">
      <div className="organization-container">
        {/* Header */}
        <div className="organization-header">
          <h1 className="organization-title">Panel de Organización</h1>
          <p className="wedding-countdown">
            {daysRemaining} días para el gran día
          </p>
          
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Tabs */}
        <div className="organization-tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <i className={`bi ${tab.icon}`}></i>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="tab-content">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {renderTabContent()}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function ResumenGeneral({ stats }) {
  return (
    <div className="summary-container">
      <h3 className="summary-title">Resumen General</h3>
      
      <div className="stats-grid">
        {stats.map((stat) => (
          <div key={stat.id} className="stat-card">
            <div className="stat-header">
              <i className={`bi ${stat.icon}`} style={{ color: stat.color }}></i>
              <h4 className="stat-title">{stat.title}</h4>
            </div>
            <div className="stat-value">{stat.value}</div>
            <div className="stat-progress">
              <div 
                className="progress-fill" 
                style={{ 
                  width: `${stat.progress}%`,
                  backgroundColor: stat.color
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default POrganizacion;