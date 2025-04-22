import React, { useState } from 'react';
"../assets/scss/_03-Componentes/_TareasBoda.scss";

function TareasBoda() {
  const [categorias, setCategorias] = useState([
    {
      id: 1,
      nombre: 'Ceremonia',
      tareas: [
        { id: 1, nombre: 'Reservar iglesia', completada: true },
        { id: 2, nombre: 'Elegir música ceremonial', completada: false },
        { id: 3, nombre: 'Confirmar oficiante', completada: true }
      ]
    },
    {
      id: 2,
      nombre: 'Recepción',
      tareas: [
        { id: 4, nombre: 'Contratar catering', completada: true },
        { id: 5, nombre: 'Elegir menú', completada: false },
        { id: 6, nombre: 'Confirmar DJ', completada: false }
      ]
    },
    {
      id: 3,
      nombre: 'Vestuario',
      tareas: [
        { id: 7, nombre: 'Prueba de vestido', completada: false },
        { id: 8, nombre: 'Comprar traje', completada: true },
        { id: 9, nombre: 'Accesorios', completada: false }
      ]
    }
  ]);

  const [nuevaTarea, setNuevaTarea] = useState({ categoriaId: 1, nombre: '' });
  const [nuevaCategoria, setNuevaCategoria] = useState('');

  const toggleTarea = (categoriaId, tareaId) => {
    setCategorias(categorias.map(categoria => {
      if (categoria.id === categoriaId) {
        return {
          ...categoria,
          tareas: categoria.tareas.map(tarea => 
            tarea.id === tareaId ? { ...tarea, completada: !tarea.completada } : tarea
          )
        };
      }
      return categoria;
    }));
  };

  const agregarTarea = (e) => {
    e.preventDefault();
    if (!nuevaTarea.nombre.trim()) return;
    
    setCategorias(categorias.map(categoria => {
      if (categoria.id === nuevaTarea.categoriaId) {
        const nuevaId = Math.max(...categoria.tareas.map(t => t.id), 0) + 1;
        return {
          ...categoria,
          tareas: [...categoria.tareas, { 
            id: nuevaId, 
            nombre: nuevaTarea.nombre, 
            completada: false 
          }]
        };
      }
      return categoria;
    }));
    
    setNuevaTarea({ ...nuevaTarea, nombre: '' });
  };

  const agregarCategoria = (e) => {
    e.preventDefault();
    if (!nuevaCategoria.trim()) return;
    
    const nuevaId = Math.max(...categorias.map(c => c.id), 0) + 1;
    setCategorias([...categorias, {
      id: nuevaId,
      nombre: nuevaCategoria,
      tareas: []
    }]);
    
    setNuevaCategoria('');
  };

  const eliminarTarea = (categoriaId, tareaId) => {
    setCategorias(categorias.map(categoria => {
      if (categoria.id === categoriaId) {
        return {
          ...categoria,
          tareas: categoria.tareas.filter(tarea => tarea.id !== tareaId)
        };
      }
      return categoria;
    }));
  };

  return (
    <div className="tareas-boda">
      <h1>Lista de Tareas</h1>
      
      <div className="resumen-tareas">
        <div className="estadistica">
          <span className="numero">
            {categorias.reduce((total, cat) => total + cat.tareas.length, 0)}
          </span>
          <span className="texto">Tareas totales</span>
        </div>
        <div className="estadistica">
          <span className="numero">
            {categorias.reduce((total, cat) => 
              total + cat.tareas.filter(t => t.completada).length, 0)}
          </span>
          <span className="texto">Completadas</span>
        </div>
        <div className="estadistica">
          <span className="numero">
            {categorias.reduce((total, cat) => 
              total + cat.tareas.filter(t => !t.completada).length, 0)}
          </span>
          <span className="texto">Pendientes</span>
        </div>
      </div>
      
      <div className="formulario-nueva-categoria">
        <h2>Agregar Nueva Categoría</h2>
        <form onSubmit={agregarCategoria}>
          <input
            type="text"
            value={nuevaCategoria}
            onChange={(e) => setNuevaCategoria(e.target.value)}
            placeholder="Nombre de la categoría"
            required
          />
          <button type="submit">Agregar</button>
        </form>
      </div>
      
      <div className="formulario-nueva-tarea">
        <h2>Agregar Nueva Tarea</h2>
        <form onSubmit={agregarTarea}>
          <select
            value={nuevaTarea.categoriaId}
            onChange={(e) => setNuevaTarea({
              ...nuevaTarea,
              categoriaId: parseInt(e.target.value)
            })}
          >
            {categorias.map(categoria => (
              <option key={categoria.id} value={categoria.id}>
                {categoria.nombre}
              </option>
            ))}
          </select>
          <input
            type="text"
            value={nuevaTarea.nombre}
            onChange={(e) => setNuevaTarea({
              ...nuevaTarea,
              nombre: e.target.value
            })}
            placeholder="Descripción de la tarea"
            required
          />
          <button type="submit">Agregar</button>
        </form>
      </div>
      
      <div className="categorias-container">
        {categorias.map(categoria => (
          <div key={categoria.id} className="categoria">
            <h3>{categoria.nombre}</h3>
            {categoria.tareas.length > 0 ? (
              <ul className="lista-tareas">
                {categoria.tareas.map(tarea => (
                  <li key={tarea.id} className={tarea.completada ? 'completada' : ''}>
                    <input
                      type="checkbox"
                      checked={tarea.completada}
                      onChange={() => toggleTarea(categoria.id, tarea.id)}
                    />
                    <span>{tarea.nombre}</span>
                    <button 
                      className="boton-eliminar"
                      onClick={() => eliminarTarea(categoria.id, tarea.id)}
                    >
                      <i className="bi bi-trash"></i>
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="sin-tareas">No hay tareas en esta categoría</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default TareasBoda;