import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import "../assets/scss/_03-Componentes/_POrganizacion.scss";

// Componentes de las pestañas
import POrgPresupuesto from './POrgPresupuesto';
import POrgChecklistBoda from './POrgChecklistBoda';
import POrgRegalos from './POrgRegalos';
import POrgCatering from './POrgCatering';
import POrgInvitaciones from './POrgInvitaciones';
import POrgIdeas from './POrgIdeas';
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
      case 'checklist': return <POrgChecklistBoda />;
      case 'POrgRegalos': return <POrgRegalos />;
      case 'catering': return <POrgCatering />;
      case 'invitaciones': return <POrgInvitaciones />;
      case 'ideas': return <POrgIdeas />;
      case 'POrgMesas': return <POrgMesas />;
      default: return <ResumenGeneral stats={weddingStats} />;
    }
  };

  const tabs = [
    { id: 'resumen', icon: 'bi-kanban', label: 'Resumen' },
    { id: 'presupuesto', icon: 'bi-cash-stack', label: 'Presupuesto' },
    { id: 'checklist', icon: 'bi-list-check', label: 'Lista de Tareas' },
    { id: 'POrgRegalos', icon: 'bi-gift', label: 'Regalos' },
    { id: 'catering', icon: 'bi-egg-fried', label: 'Catering' },
    { id: 'invitaciones', icon: 'bi-envelope', label: 'Invitaciones' },
    { id: 'ideas', icon: 'bi-lightbulb', label: 'Ideas' },
    { id: 'POrgMesas', icon: 'bi-people', label: 'Mesas' }
  ];

  return (
    <div className="pantalla-organizacion">
      <div className="contenedor-organizacion">
        {/* Encabezado */}
        <div className="encabezado-boda">
          <h1>Panel de Organización</h1>
     
          <p className="mensaje-bienvenida">
            {daysRemaining} días para el gran día
          </p>
          
          <div className="barra-progreso">
            <div className="progreso" style={{ width: `${progress}%` }}></div>
          </div>
        </div>

        {/* Pestañas */}
        <div className="pestanas">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`pestana ${activeTab === tab.id ? 'activa' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <i className={`bi ${tab.icon}`}></i>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Contenido */}
        <div className="contenido-pestana">
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
    <div className="resumen-general">
      <h3>Resumen General</h3>
      
      <div className="estadisticas">
        {stats.map((stat) => (
          <div key={stat.id} className="tarjeta-estadistica">
            <div className="icono-titulo">
              <i className={`bi ${stat.icon}`} style={{ color: stat.color }}></i>
              <h4>{stat.title}</h4>
            </div>
            
            <p className="valor" style={{ color: stat.color }}>{stat.value}</p>
            
            <div className="barra-progreso">
              <div 
                className="progreso" 
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