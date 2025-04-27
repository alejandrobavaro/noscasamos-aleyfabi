import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '../assets/scss/_03-Componentes/_ChecklistBoda.scss';

function ChecklistBoda() {
  const [expandedPhase, setExpandedPhase] = useState(null);
  const [weddingTasks, setWeddingTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [assignedFilter, setAssignedFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Cargar tareas desde el JSON
  useEffect(() => {
    const loadTasks = async () => {
      try {
        const response = await fetch('/tareasBoda.json');
        const data = await response.json();
        setWeddingTasks(data.categories);
        setLoading(false);
      } catch (error) {
        console.error('Error cargando tareas:', error);
        setLoading(false);
      }
    };

    loadTasks();
  }, []);

  // Guardar cambios en localStorage
  useEffect(() => {
    if (!loading) {
      localStorage.setItem('weddingChecklist', JSON.stringify(weddingTasks));
    }
  }, [weddingTasks, loading]);

  // Cargar desde localStorage si existe
  useEffect(() => {
    const savedChecklist = localStorage.getItem('weddingChecklist');
    if (savedChecklist) {
      setWeddingTasks(JSON.parse(savedChecklist));
    }
  }, []);

  const togglePhase = (phaseId) => {
    setExpandedPhase(expandedPhase === phaseId ? null : phaseId);
  };

  const toggleTask = (categoryId, taskId) => {
    setWeddingTasks(prevTasks => 
      prevTasks.map(category => 
        category.id === categoryId
          ? {
              ...category,
              tasks: category.tasks.map(task =>
                task.id === taskId
                  ? { ...task, completed: !task.completed }
                  : task
              )
            }
          : category
      )
    );
  };

  const getCategoryProgress = (tasks) => {
    const completed = tasks.filter(t => t.completed).length;
    return (completed / tasks.length) * 100 || 0;
  };

  const exportToTxt = () => {
    const now = new Date();
    const dateStr = now.toLocaleDateString('es-ES');
    
    let completedTasks = '=== TAREAS COMPLETADAS ===\n\n';
    let pendingTasks = '=== TAREAS PENDIENTES ===\n\n';
    
    weddingTasks.forEach(category => {
      completedTasks += `## ${category.name.toUpperCase()} ##\n`;
      pendingTasks += `## ${category.name.toUpperCase()} ##\n`;
      
      category.tasks.forEach(task => {
        const taskLine = `- [${task.completed ? 'X' : ' '}] ${task.name} (Asignado a: ${
          task.assigned === 'both' ? 'Ambos' : 
          task.assigned === 'fabiola' ? 'Fabiola' : 'Alejandro'
        }, Fecha límite: ${formatDate(task.dueDate)})\n`;
        
        if (task.completed) {
          completedTasks += taskLine;
        } else {
          pendingTasks += taskLine;
        }
      });
      
      completedTasks += '\n';
      pendingTasks += '\n';
    });
    
    const fullText = `CHECKLIST DE BODA - ${dateStr}\n\n${completedTasks}\n${pendingTasks}`;
    
    // Crear blob y descargar
    const blob = new Blob([fullText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `checklist-boda-${dateStr.replace(/\//g, '-')}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const shareOnWhatsApp = () => {
    let message = '*CHECKLIST DE BODA*\n\n';
    
    // Tareas completadas
    message += '*✅ TAREAS COMPLETADAS:*\n';
    weddingTasks.forEach(category => {
      const completed = category.tasks.filter(t => t.completed);
      if (completed.length > 0) {
        message += `\n_${category.name}_\n`;
        completed.forEach(task => {
          message += `✔ ${task.name}\n`;
        });
      }
    });
    
    // Tareas pendientes
    message += '\n*📝 TAREAS PENDIENTES:*\n';
    weddingTasks.forEach(category => {
      const pending = category.tasks.filter(t => !t.completed);
      if (pending.length > 0) {
        message += `\n_${category.name}_\n`;
        pending.forEach(task => {
          message += `◻ ${task.name} (${formatDate(task.dueDate)} - ${
            task.assigned === 'both' ? 'Ambos' : 
            task.assigned === 'fabiola' ? 'Fabiola' : 'Alejandro'
          })\n`;
        });
      }
    });
    
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/?text=${encodedMessage}`, '_blank');
  };

  const filteredCategories = weddingTasks.map(category => ({
    ...category,
    tasks: category.tasks.filter(task => {
      // Filtro por estado
      if (filter === 'completed' && !task.completed) return false;
      if (filter === 'pending' && task.completed) return false;
      
      // Filtro por asignación
      if (assignedFilter !== 'all' && task.assigned !== assignedFilter && 
          !(assignedFilter === 'both' && task.assigned === 'both')) {
        return false;
      }
      
      // Filtro por búsqueda
      if (searchTerm && !task.name.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false;
      }
      
      return true;
    })
  })).filter(category => category.tasks.length > 0);

  if (loading) {
    return (
      <div className="checklist-container loading">
        <div className="loading-spinner">
          <i className="bi bi-hourglass"></i>
          <p>Cargando checklist...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="checklist-container">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="header-section"
      >
        <h1>Checklist Completo de la Boda</h1>
        <p className="subtitle">Organiza todas las tareas en un solo lugar</p>
        
        <div className="action-buttons">
          <motion.button
            className="export-btn"
            onClick={exportToTxt}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <i className="bi bi-download"></i> Exportar a TXT
          </motion.button>
          
          <motion.button
            className="whatsapp-btn"
            onClick={shareOnWhatsApp}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <i className="bi bi-whatsapp"></i> Compartir por WhatsApp
          </motion.button>
        </div>
        
        <div className="filters">
          <div className="search-filter">
            <i className="bi bi-search"></i>
            <input
              type="text"
              placeholder="Buscar tareas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="filter-group">
            <label>Estado:</label>
            <select value={filter} onChange={(e) => setFilter(e.target.value)}>
              <option value="all">Todas</option>
              <option value="completed">Completadas</option>
              <option value="pending">Pendientes</option>
            </select>
          </div>
          
          <div className="filter-group">
            <label>Asignado a:</label>
            <select value={assignedFilter} onChange={(e) => setAssignedFilter(e.target.value)}>
              <option value="all">Todos</option>
              <option value="alejandro">Alejandro</option>
              <option value="fabiola">Fabiola</option>
              <option value="both">Ambos</option>
            </select>
          </div>
        </div>
      </motion.div>
      
      <div className="categories-container">
        {filteredCategories.length > 0 ? (
          filteredCategories.map((category) => (
            <motion.div 
              key={category.id}
              className="category-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 100 }}
            >
              <div 
                className="category-header"
                onClick={() => togglePhase(category.id)}
              >
                <div className="category-title">
                  <i className={`bi ${getCategoryIcon(category.id)}`}></i>
                  <h3>{category.name}</h3>
                </div>
                
                <div className="progress-container">
                  <div className="progress-bar">
                    <motion.div 
                      className="progress" 
                      initial={{ width: 0 }}
                      animate={{ width: `${getCategoryProgress(category.tasks)}%` }}
                      transition={{ duration: 1 }}
                    ></motion.div>
                  </div>
                  <span>
                    {category.tasks.filter(t => t.completed).length}/{category.tasks.length}
                  </span>
                </div>
                
                <i className={`bi bi-chevron-${expandedPhase === category.id ? 'up' : 'down'}`}></i>
              </div>
              
              <AnimatePresence>
                {expandedPhase === category.id && (
                  <motion.ul 
                    className="task-list"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ 
                      height: 'auto', 
                      opacity: 1,
                      transition: {
                        height: { duration: 0.3 },
                        opacity: { duration: 0.2, delay: 0.1 }
                      }
                    }}
                    exit={{ 
                      height: 0, 
                      opacity: 0,
                      transition: {
                        height: { duration: 0.2 },
                        opacity: { duration: 0.1 }
                      }
                    }}
                  >
                    {category.tasks.map((task) => (
                      <motion.li 
                        key={task.id}
                        className={`task-item ${task.completed ? 'completed' : ''} assigned-${task.assigned}`}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ 
                          opacity: 1, 
                          x: 0,
                          transition: { type: "spring", stiffness: 200 }
                        }}
                        whileHover={{ scale: 1.02 }}
                      >
                        <input 
                          type="checkbox" 
                          id={`task-${task.id}`}
                          checked={task.completed}
                          onChange={() => toggleTask(category.id, task.id)}
                        />
                        <label htmlFor={`task-${task.id}`}>
                          <span className="task-name">{task.name}</span>
                          <div className="task-details">
                            <span className="due-date">
                              <i className="bi bi-calendar"></i>
                              {formatDate(task.dueDate)}
                            </span>
                            <span className={`assigned-to ${task.assigned}`}>
                              {task.assigned === 'both' ? 'Ambos' : 
                               task.assigned === 'fabiola' ? 'Fabiola' : 'Alejandro'}
                            </span>
                            <span className={`priority ${task.priority}`}>
                              {task.priority === 'high' ? 'Alta' : 
                               task.priority === 'medium' ? 'Media' : 'Baja'}
                            </span>
                          </div>
                        </label>
                      </motion.li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            </motion.div>
          ))
        ) : (
          <div className="no-results">
            <i className="bi bi-search"></i>
            <p>No se encontraron tareas con los filtros seleccionados</p>
          </div>
        )}
      </div>
    </div>
  );
}

// Función auxiliar para formatear fechas
function formatDate(dateString) {
  const options = { day: 'numeric', month: 'short' };
  return new Date(dateString).toLocaleDateString('es-ES', options);
}

// Función auxiliar para obtener íconos por categoría
function getCategoryIcon(categoryId) {
  switch(categoryId) {
    case 'planeacion': return 'bi-calendar-check';
    case 'lugar': return 'bi-geo-alt';
    case 'vestuario': return 'bi-suit-heart';
    case 'catering': return 'bi-egg-fried';
    case 'entretenimiento': return 'bi-music-note-beamed';
    case 'decoracion': return 'bi-flower1';
    case 'fotografia': return 'bi-camera';
    case 'invitaciones': return 'bi-envelope';
    case 'alojamiento': return 'bi-house-door';
    case 'regalos': return 'bi-gift';
    case 'pre-boda': return 'bi-people';
    case 'dia-boda': return 'bi-hearts';
    case 'post-boda': return 'bi-send-check';
    default: return 'bi-list-check';
  }
}

export default ChecklistBoda;