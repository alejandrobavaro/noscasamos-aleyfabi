import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragOverlay } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';

import '../assets/scss/_03-Componentes/_ChecklistBoda.scss';
import weddingTasks from '/src/json/tareasBoda1.json';

function ChecklistBoda() {
  const [tasksData, setTasksData] = useState(weddingTasks.categories);
  const [activeId, setActiveId] = useState(null);
  const [filter, setFilter] = useState('all');
  const [assignedFilter, setAssignedFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Cargar y guardar datos
  useEffect(() => {
    const savedChecklist = localStorage.getItem('weddingChecklist');
    if (savedChecklist) {
      setTasksData(JSON.parse(savedChecklist));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('weddingChecklist', JSON.stringify(tasksData));
  }, [tasksData]);

  // Funciones para drag and drop
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = (event) => {
    setActiveId(event.active.id);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    
    if (active.id !== over.id) {
      setTasksData((prevTasks) => {
        const oldIndex = prevTasks.findIndex(cat => cat.tasks.some(t => t.id === active.id));
        const newIndex = prevTasks.findIndex(cat => cat.tasks.some(t => t.id === over.id));
        
        if (oldIndex === newIndex) {
          const category = prevTasks[oldIndex];
          const oldTaskIndex = category.tasks.findIndex(t => t.id === active.id);
          const newTaskIndex = category.tasks.findIndex(t => t.id === over.id);
          
          const updatedCategory = {
            ...category,
            tasks: arrayMove(category.tasks, oldTaskIndex, newTaskIndex)
          };
          
          return prevTasks.map((cat, idx) => 
            idx === oldIndex ? updatedCategory : cat
          );
        }
        return prevTasks;
      });
    }
    setActiveId(null);
  };

  // Funciones para manejar tareas
  const toggleTask = (categoryId, taskId) => {
    setTasksData(prevTasks =>
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

  const assignTask = (categoryId, taskId, assignee) => {
    setTasksData(prevTasks =>
      prevTasks.map(category =>
        category.id === categoryId
          ? {
              ...category,
              tasks: category.tasks.map(task =>
                task.id === taskId
                  ? { ...task, assigned: assignee }
                  : task
              )
            }
          : category
      )
    );
  };

  // Filtrado de tareas
  const filteredCategories = tasksData.map(category => ({
    ...category,
    tasks: category.tasks.filter(task => {
      if (filter === 'completed' && !task.completed) return false;
      if (filter === 'pending' && task.completed) return false;
      if (assignedFilter !== 'all' && task.assigned !== assignedFilter) return false;
      if (searchTerm && !task.name.toLowerCase().includes(searchTerm.toLowerCase())) return false;
      return true;
    })
  })).filter(category => category.tasks.length > 0);

  // Estadísticas
  const totalTasks = tasksData.flatMap(category => category.tasks).length;
  const completedTasks = tasksData.flatMap(category => category.tasks).filter(task => task.completed).length;
  const pendingTasks = totalTasks - completedTasks;

  return (
    <div className="checklist-container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="header-section"
      >
        <div className="checklist-header">
          <h1>Checklist de la Boda</h1>
          <p>Todas las tareas pendientes para vuestro gran día</p>
        </div>

        <div className="progress-summary">
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-value">{completedTasks}</div>
              <div className="stat-label">Completadas</div>
              <div className="progress-bar">
                <div 
                  className="progress" 
                  style={{ width: `${(completedTasks/totalTasks)*100}%` }}
                ></div>
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-value">{pendingTasks}</div>
              <div className="stat-label">Pendientes</div>
              <div className="progress-bar">
                <div 
                  className="progress" 
                  style={{ width: `${(pendingTasks/totalTasks)*100}%` }}
                ></div>
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-value">{totalTasks}</div>
              <div className="stat-label">Total</div>
              <div className="progress-bar">
                <div className="progress" style={{ width: '100%' }}></div>
              </div>
            </div>
          </div>
        </div>

        <div className="filtros-tareas">
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
              <option value="both">Ambos</option>
              <option value="alejandro">Alejandro</option>
              <option value="fabiola">Fabiola</option>
            </select>
          </div>

          <div className="filter-group search-group">
            <label>Buscar:</label>
            <input 
              type="text" 
              placeholder="Buscar tareas..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </motion.div>

      <div className="main-content">
        <DndContext 
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
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
                  <div className="category-header">
                    <div className="category-title">
                      <i className={`bi ${getCategoryIcon(category.id)}`}></i>
                      <h3>{category.name}</h3>
                    </div>
                  </div>

                  <SortableContext 
                    items={category.tasks.map(task => task.id)}
                    strategy={verticalListSortingStrategy}
                  >
                    <ul className="task-list">
                      {category.tasks.map((task) => (
                        <SortableItem 
                          key={task.id} 
                          id={task.id}
                          task={task}
                          toggleTask={toggleTask}
                          assignTask={assignTask}
                          categoryId={category.id}
                        />
                      ))}
                    </ul>
                  </SortableContext>
                </motion.div>
              ))
            ) : (
              <div className="no-results">
                <i className="bi bi-search"></i>
                <p>No se encontraron tareas con los filtros seleccionados</p>
              </div>
            )}
          </div>
          <DragOverlay>
            {activeId ? (
              <div className="task-item-dragging">
                {tasksData.flatMap(cat => cat.tasks).find(t => t.id === activeId)?.name}
              </div>
            ) : null}
          </DragOverlay>
        </DndContext>
      </div>
    </div>
  );
}

// Componente SortableItem
function SortableItem({ id, task, toggleTask, assignTask, categoryId }) {
  return (
    <motion.li
      className={`task-item ${task.completed ? 'completed' : ''} assigned-${task.assigned}`}
      initial={{ opacity: 0, x: -20 }}
      animate={{
        opacity: 1,
        x: 0,
        transition: { type: "spring", stiffness: 200 }
      }}
      whileHover={{ scale: 1.02 }}
    >
      <div className="task-drag-handle">
        <i className="bi bi-grip-vertical"></i>
      </div>
      
      <input
        type="checkbox"
        id={`task-${id}`}
        checked={task.completed}
        onChange={() => toggleTask(categoryId, id)}
      />
      
      <label htmlFor={`task-${id}`}>
        <span className="task-name">{task.name}</span>
      </label>
      
      <div className="task-assignment">
        <select
          value={task.assigned}
          onChange={(e) => assignTask(categoryId, id, e.target.value)}
          onClick={(e) => e.stopPropagation()}
        >
          <option value="both">Ambos</option>
          <option value="alejandro">Alejandro</option>
          <option value="fabiola">Fabiola</option>
        </select>
      </div>
    </motion.li>
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
    case 'ceremonia': return 'bi-heart';
    case 'transporte': return 'bi-truck';
    default: return 'bi-list-check';
  }
}

export default ChecklistBoda;