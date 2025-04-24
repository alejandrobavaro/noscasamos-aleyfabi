import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import weddingTasks from '../../public/tareasBoda.json';
import Presupuesto from './Presupuesto';
import ChecklistBoda from './ChecklistBoda';
import Regalos from './Regalos';
import Catering from './Catering';
import Vestuario from './Vestuario';
import Invitaciones from './Invitaciones';
import IdeasEpicas from './IdeasEpicas';
import "../assets/scss/_03-Componentes/_PanelOrganizacion.scss";

function PanelOrganizacion() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('organizacion');
  const [daysRemaining, setDaysRemaining] = useState(0);
  const [activeCategory, setActiveCategory] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');
  const [assignedFilter, setAssignedFilter] = useState('all');

  // Calcular días restantes para la boda (23 de Noviembre 2025)
  useEffect(() => {
    const weddingDate = new Date('2025-11-23');
    const today = new Date();
    const diffTime = weddingDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    setDaysRemaining(diffDays > 0 ? diffDays : 0);
  }, []);

  // Cargar todas las tareas
  useEffect(() => {
    const allTasks = weddingTasks.categories.flatMap(category => 
      category.tasks.map(task => ({
        ...task,
        category: category.id,
        categoryName: category.name
      }))
    );
    setTasks(allTasks);
  }, []);

  // Renderizar el contenido según la pestaña activa
  const renderContent = () => {
    switch(activeTab) {
      case 'presupuesto':
        return <Presupuesto />;
      case 'checklist':
        return <ChecklistBoda />;
      case 'regalos':
        return <Regalos />;
      case 'catering':
        return <Catering />;
      case 'vestuario':
        return <Vestuario />;
      case 'invitaciones':
        return <Invitaciones />;
      case 'ideas':
        return <IdeasEpicas />;
      default:
        return renderOrganizacionContent();
    }
  };

  // Contenido de la pestaña de organización
  const renderOrganizacionContent = () => {
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(task => task.completed).length;
    const pendingTasks = totalTasks - completedTasks;
    const confirmedGuests = 87;

    const toggleTask = (taskId) => {
      setTasks(tasks.map(task => 
        task.id === taskId ? { ...task, completed: !task.completed } : task
      ));
    };

    const filteredTasks = tasks.filter(task => {
      if (filter === 'completed' && !task.completed) return false;
      if (filter === 'pending' && task.completed) return false;
      if (assignedFilter !== 'all' && task.assigned !== assignedFilter && !(assignedFilter === 'both' && task.assigned === 'both')) {
        return false;
      }
      if (activeCategory && task.category !== activeCategory) return false;
      return true;
    });

    const getAssignedColor = (assigned) => {
      switch(assigned) {
        case 'alejandro': return '#4a6baf';
        case 'fabiola': return '#af4a8a';
        case 'both': return '#7A4F50';
        default: return '#7A4F50';
      }
    };

    return (
      <>
        <div className="resumen-estadisticas">
          <div className="estadistica">
            <div className="icono"><i className="bi bi-people-fill"></i></div>
            <h3>Invitados Confirmados</h3>
            <p className="numero">{confirmedGuests}</p>
            <p className="meta">Meta: 120</p>
            <div className="progress-bar">
              <div 
                className="progress" 
                style={{ width: `${(confirmedGuests / 120) * 100}%` }}
              ></div>
            </div>
          </div>
          
          <div className="estadistica">
            <div className="icono"><i className="bi bi-list-check"></i></div>
            <h3>Tareas Completadas</h3>
            <p className="numero">{completedTasks}</p>
            <p className="meta">Total: {totalTasks}</p>
            <div className="progress-bar">
              <div 
                className="progress" 
                style={{ width: `${(completedTasks / totalTasks) * 100}%` }}
              ></div>
            </div>
          </div>
          
          <div className="estadistica">
            <div className="icono"><i className="bi bi-calendar-heart"></i></div>
            <h3>Días Restantes</h3>
            <p className="numero">{daysRemaining}</p>
            <p className="meta">23.11.2025</p>
            <div className="progress-bar">
              <div 
                className="progress" 
                style={{ width: `${100 - (daysRemaining / 365 * 100)}%` }}
              ></div>
            </div>
          </div>
        </div>
        
        <div className="filtros-tareas">
          <div className="filtro">
            <label>Estado:</label>
            <select value={filter} onChange={(e) => setFilter(e.target.value)}>
              <option value="all">Todas</option>
              <option value="completed">Completadas</option>
              <option value="pending">Pendientes</option>
            </select>
          </div>
          
          <div className="filtro">
            <label>Asignado a:</label>
            <select value={assignedFilter} onChange={(e) => setAssignedFilter(e.target.value)}>
              <option value="all">Todos</option>
              <option value="alejandro">Alejandro</option>
              <option value="fabiola">Fabiola</option>
              <option value="both">Ambos</option>
            </select>
          </div>
        </div>
        
        <div className="categorias-tareas">
          <h2>Categorías</h2>
          <div className="grid-categorias">
            {weddingTasks.categories.map(category => (
              <div 
                key={category.id}
                className={`categoria ${activeCategory === category.id ? 'activa' : ''}`}
                onClick={() => setActiveCategory(activeCategory === category.id ? null : category.id)}
              >
                <i className={`bi ${getCategoryIcon(category.id)}`}></i>
                <span>{category.name}</span>
                <div className="contador">
                  {category.tasks.filter(t => t.completed).length}/{category.tasks.length}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="lista-tareas-completa">
          <h2>{activeCategory ? 
            `${weddingTasks.categories.find(c => c.id === activeCategory).name} - Tareas` : 
            'Todas las Tareas'}
          </h2>
          
          {filteredTasks.length === 0 ? (
            <div className="sin-tareas">
              <i className="bi bi-check2-circle"></i>
              <p>No hay tareas que coincidan con los filtros seleccionados</p>
            </div>
          ) : (
            <ul className="lista-tareas">
              {filteredTasks.map(task => (
                <li 
                  key={task.id} 
                  className={task.completed ? 'completada' : ''}
                >
                  <input 
                    type="checkbox" 
                    id={`tarea-${task.id}`}
                    checked={task.completed}
                    onChange={() => toggleTask(task.id)}
                  />
                  <label htmlFor={`tarea-${task.id}`}>
                    {task.name}
                    <span className="categoria-tarea" style={{ backgroundColor: getAssignedColor(task.assigned) }}>
                      {task.assigned === 'alejandro' ? 'Alejandro' : 
                       task.assigned === 'fabiola' ? 'Fabiola' : 'Ambos'}
                    </span>
                  </label>
                  <div className="detalles-tarea">
                    <span className="fecha">{formatDate(task.dueDate)}</span>
                    <span className="categoria">{task.categoryName}</span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </>
    );
  };

  return (
    <div className="panel-organizacion">
      <div className="encabezado-panel">
        <h1>Panel de Organización</h1>
        <p>Bienvenidos, Alejandro y Fabiola</p>
        <div className="wedding-countdown">
          <span>{daysRemaining} días para el gran día</span>
          <div className="progress-bar">
            <div 
              className="progress" 
              style={{ width: `${100 - (daysRemaining / 365 * 100)}%` }}
            ></div>
          </div>
        </div>
      </div>

      <div className="tabs-container">
        <div className="tabs">
          <button 
            className={activeTab === 'organizacion' ? 'active' : ''}
            onClick={() => setActiveTab('organizacion')}
          >
            <i className="bi bi-kanban"></i> Organización
          </button>
          <button 
            className={activeTab === 'presupuesto' ? 'active' : ''}
            onClick={() => setActiveTab('presupuesto')}
          >
            <i className="bi bi-cash-stack"></i> Presupuesto
          </button>
          <button 
            className={activeTab === 'checklist' ? 'active' : ''}
            onClick={() => setActiveTab('checklist')}
          >
            <i className="bi bi-list-check"></i> Checklist
          </button>
          <button 
            className={activeTab === 'regalos' ? 'active' : ''}
            onClick={() => setActiveTab('regalos')}
          >
            <i className="bi bi-gift"></i> Regalos
          </button>
          <button 
            className={activeTab === 'catering' ? 'active' : ''}
            onClick={() => setActiveTab('catering')}
          >
            <i className="bi bi-egg-fried"></i> Catering
          </button>
          <button 
            className={activeTab === 'vestuario' ? 'active' : ''}
            onClick={() => setActiveTab('vestuario')}
          >
            <i className="bi bi-suit-heart"></i> Vestuario
          </button>
          <button 
            className={activeTab === 'invitaciones' ? 'active' : ''}
            onClick={() => setActiveTab('invitaciones')}
          >
            <i className="bi bi-envelope"></i> Invitaciones
          </button>
          <button 
            className={activeTab === 'ideas' ? 'active' : ''}
            onClick={() => setActiveTab('ideas')}
          >
            <i className="bi bi-lightbulb"></i> Ideas
          </button>
        </div>
      </div>

      <div className="content-container">
        {renderContent()}
      </div>
    </div>
  );
}

// Función auxiliar para obtener íconos por categoría
function getCategoryIcon(categoryId) {
  switch(categoryId) {
    case 'salon': return 'bi-building';
    case 'vestuario': return 'bi-suit-heart';
    case 'catering': return 'bi-egg-fried';
    case 'invitaciones': return 'bi-envelope';
    case 'entretenimiento': return 'bi-music-note-beamed';
    case 'fotografia': return 'bi-camera';
    case 'regalos': return 'bi-gift';
    case 'web': return 'bi-globe';
    default: return 'bi-list-check';
  }
}

// Función auxiliar para formatear fechas
function formatDate(dateString) {
  const options = { day: 'numeric', month: 'short' };
  return new Date(dateString).toLocaleDateString('es-ES', options);
}

export default PanelOrganizacion;