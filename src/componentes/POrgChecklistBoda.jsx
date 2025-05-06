import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragOverlay } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';

import '../assets/scss/_03-Componentes/_POrgTareasBoda.scss';
import weddingTasks from '/src/json/POrgTareasBoda1.json';

function POrgTareasBoda() {
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
    <div className="pantalla-checklist">
      <div className="contenedor-checklist">
        {/* Encabezado */}
        <div className="encabezado-boda">
          <h1>Lista de Tareas de la Boda</h1>
     
        </div>


        {/* Lista de tareas */}
        <div className="lista-tareas">
          <DndContext 
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
          >
            {filteredCategories.length > 0 ? (
              filteredCategories.map((category) => (
                <motion.div
                  key={category.id}
                  className="categoria"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ type: "spring", stiffness: 100 }}
                >
                  <div className="encabezado-categoria">
                    <i className={`bi ${getCategoryIcon(category.id)}`}></i>
                    <h3>{category.name}</h3>
                  </div>

                  <SortableContext 
                    items={category.tasks.map(task => task.id)}
                    strategy={verticalListSortingStrategy}
                  >
                    <ul className="tareas">
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
              <div className="sin-resultados">
                <i className="bi bi-search"></i>
                <p>No se encontraron tareas con los filtros seleccionados</p>
              </div>
            )}
            <DragOverlay>
              {activeId ? (
                <div className="tarea-arrastrando">
                  {tasksData.flatMap(cat => cat.tasks).find(t => t.id === activeId)?.name}
                </div>
              ) : null}
            </DragOverlay>
          </DndContext>
        </div>
      </div>
    </div>
  );
}

function SortableItem({ id, task, toggleTask, assignTask, categoryId }) {
  return (
    <motion.li
      className={`tarea ${task.completed ? 'completada' : ''} asignada-${task.assigned}`}
      initial={{ opacity: 0, x: -20 }}
      animate={{
        opacity: 1,
        x: 0,
        transition: { type: "spring", stiffness: 200 }
      }}
      whileHover={{ scale: 1.02 }}
    >
      <div className="mango-arrastre">
        <i className="bi bi-grip-vertical"></i>
      </div>
      
      <input
        type="checkbox"
        id={`tarea-${id}`}
        checked={task.completed}
        onChange={() => toggleTask(categoryId, id)}
      />
      
      <label htmlFor={`tarea-${id}`}>
        <span className="nombre-tarea">{task.name}</span>
      </label>
      
      <div className="asignacion-tarea">
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

function getCategoryIcon(categoryId) {
  switch(categoryId) {
    case 'salon': return 'bi-building';
    case 'vestuario': return 'bi-suit-heart';
    case 'POrgCatering': return 'bi-egg-fried';
    case 'POrgInvitaciones': return 'bi-envelope';
    case 'entretenimiento': return 'bi-music-note-beamed';
    case 'fotografia': return 'bi-camera';
    case 'POrgRegalos': return 'bi-gift';
    case 'web': return 'bi-globe';
    case 'ceremonia': return 'bi-heart';
    case 'transporte': return 'bi-truck';
    default: return 'bi-list-check';
  }
}

export default POrgTareasBoda;