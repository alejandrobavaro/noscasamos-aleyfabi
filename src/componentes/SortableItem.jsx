// src/componentes/SortableItem.jsx
import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { motion } from 'framer-motion';

export function SortableItem({ id, task, toggleTask, assignTask, categoryId }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <motion.li
      ref={setNodeRef}
      style={style}
      className={`task-item ${task.completed ? 'completed' : ''} assigned-${task.assigned}`}
      initial={{ opacity: 0, x: -20 }}
      animate={{
        opacity: 1,
        x: 0,
        transition: { type: "spring", stiffness: 200 }
      }}
      whileHover={{ scale: 1.02 }}
    >
      <div className="task-drag-handle" {...attributes} {...listeners}>
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