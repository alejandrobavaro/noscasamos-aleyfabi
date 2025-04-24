import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '../assets/scss/_03-Componentes/_ChecklistBoda.scss';

const weddingChecklist = {
  phases: [
    {
      id: 'planeacion',
      name: 'Planeación (12-18 meses antes)',
      tasks: [
        { id: 'fecha', name: 'Definir fecha de la boda', completed: true, dueDate: '2024-11-01' },
        { id: 'presupuesto', name: 'Establecer presupuesto', completed: true, dueDate: '2024-11-15' },
        { id: 'lista-invitados', name: 'Crear lista preliminar de invitados', completed: true, dueDate: '2024-12-01' },
        { id: 'lugar', name: 'Seleccionar lugar de la ceremonia y recepción', completed: true, dueDate: '2025-01-15' },
      ]
    },
    {
      id: 'preparacion',
      name: 'Preparación (6-12 meses antes)',
      tasks: [
        { id: 'vestido', name: 'Comprar/ordenar vestido de novia', completed: true, dueDate: '2025-05-01' },
        { id: 'catering', name: 'Contratar catering', completed: true, dueDate: '2025-06-01' },
        { id: 'fotografo', name: 'Contratar fotógrafo/videógrafo', completed: false, dueDate: '2025-06-15' },
        { id: 'invitaciones', name: 'Diseñar invitaciones', completed: false, dueDate: '2025-07-01' },
      ]
    },
    {
      id: 'detalles',
      name: 'Detalles (3-6 meses antes)',
      tasks: [
        { id: 'musica', name: 'Seleccionar música y contratar DJ o banda', completed: false, dueDate: '2025-08-01' },
        { id: 'flores', name: 'Seleccionar arreglos florales', completed: false, dueDate: '2025-08-15' },
        { id: 'pastel', name: 'Ordenar pastel de bodas', completed: false, dueDate: '2025-09-01' },
        { id: 'honeymoon', name: 'Planear luna de miel', completed: false, dueDate: '2025-09-15' },
      ]
    },
    {
      id: 'finales',
      name: 'Toques Finales (1-3 meses antes)',
      tasks: [
        { id: 'confirmaciones', name: 'Confirmar asistencia de invitados', completed: false, dueDate: '2025-10-01' },
        { id: 'pruebas', name: 'Pruebas de vestuario finales', completed: false, dueDate: '2025-10-15' },
        { id: 'pagos', name: 'Realizar pagos finales a proveedores', completed: false, dueDate: '2025-11-01' },
        { id: 'detalles-finales', name: 'Coordinación de detalles finales', completed: false, dueDate: '2025-11-15' },
      ]
    }
  ],
  documents: [
    {
      id: 'matrimonio-civil',
      title: 'Acta de Matrimonio Civil',
      description: 'Documentos requeridos: Identificación oficial, CURP, comprobante de domicilio',
      status: 'pending',
      icon: 'bi-file-earmark-text'
    },
    {
      id: 'examenes-medicos',
      title: 'Exámenes Médicos',
      description: 'Pruebas prenupciales requeridas por el registro civil',
      status: 'completed',
      icon: 'bi-file-earmark-medical'
    },
    {
      id: 'permisos-lugar',
      title: 'Permisos del Lugar',
      description: 'Autorizaciones para la ceremonia en espacio público',
      status: 'not-started',
      icon: 'bi-file-earmark-check'
    },
    {
      id: 'seguro-evento',
      title: 'Seguro de Evento',
      description: 'Cobertura para imprevistos durante la boda',
      status: 'in-progress',
      icon: 'bi-file-earmark-lock'
    }
  ]
};

function ChecklistBoda() {
  const [expandedPhase, setExpandedPhase] = useState('planeacion');
  const [checkedTasks, setCheckedTasks] = useState({});

  const togglePhase = (phaseId) => {
    setExpandedPhase(expandedPhase === phaseId ? null : phaseId);
  };

  const toggleTask = (taskId) => {
    setCheckedTasks(prev => ({
      ...prev,
      [taskId]: !prev[taskId]
    }));
  };

  const getPhaseProgress = (tasks) => {
    const completed = tasks.filter(t => checkedTasks[t.id] || t.completed).length;
    return (completed / tasks.length) * 100;
  };

  return (
    <div className="checklist-container vintage-design">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="header-section"
      >
        <h1>Checklist de la Boda</h1>
        <p className="subtitle">Sigue el progreso de todos los preparativos</p>
        <div className="divider floral"></div>
      </motion.div>
      
      <div className="timeline-container">
        {weddingChecklist.phases.map(phase => (
          <motion.div 
            key={phase.id}
            className="phase-card"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: phase.id.charCodeAt(0) * 0.05 }}
          >
            <div 
              className="phase-header" 
              onClick={() => togglePhase(phase.id)}
            >
              <h3>
                <i className="bi bi-calendar-event"></i>
                {phase.name}
              </h3>
              <div className="progress-container">
                <div className="progress-bar">
                  <motion.div 
                    className="progress" 
                    initial={{ width: 0 }}
                    animate={{ width: `${getPhaseProgress(phase.tasks)}%` }}
                    transition={{ duration: 1 }}
                  ></motion.div>
                </div>
                <span>
                  {phase.tasks.filter(t => checkedTasks[t.id] || t.completed).length}/{phase.tasks.length} completadas
                </span>
              </div>
              <i className={`bi bi-chevron-${expandedPhase === phase.id ? 'up' : 'down'}`}></i>
            </div>
            
            <AnimatePresence>
              {expandedPhase === phase.id && (
                <motion.ul 
                  className="phase-tasks"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {phase.tasks.map(task => (
                    <motion.li 
                      key={task.id} 
                      className={checkedTasks[task.id] || task.completed ? 'completed' : ''}
                      whileHover={{ scale: 1.02 }}
                    >
                      <input 
                        type="checkbox" 
                        id={`task-${task.id}`}
                        checked={checkedTasks[task.id] || task.completed}
                        onChange={() => toggleTask(task.id)}
                      />
                      <label htmlFor={`task-${task.id}`}>
                        {task.name}
                        <span className="due-date">
                          <i className="bi bi-clock"></i>
                          {formatDate(task.dueDate)}
                        </span>
                      </label>
                    </motion.li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
      
      <motion.div 
        className="documentacion-section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <h2>
          <i className="bi bi-folder2-open"></i>
          Documentación Necesaria
        </h2>
        <div className="divider"></div>
        
        <div className="document-grid">
          {weddingChecklist.documents.map(doc => (
            <motion.div 
              key={doc.id}
              className={`document-card ${doc.status}`}
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="card-icon">
                <i className={`bi ${doc.icon}`}></i>
              </div>
              <h3>{doc.title}</h3>
              <p>{doc.description}</p>
              <span className={`status ${doc.status}`}>
                {getStatusText(doc.status)}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

function formatDate(dateString) {
  const options = { day: 'numeric', month: 'long' };
  return new Date(dateString).toLocaleDateString('es-ES', options);
}

function getStatusText(status) {
  const statusMap = {
    'pending': 'Pendiente',
    'completed': 'Completado',
    'not-started': 'No iniciado',
    'in-progress': 'En progreso'
  };
  return statusMap[status] || status;
}

export default ChecklistBoda;