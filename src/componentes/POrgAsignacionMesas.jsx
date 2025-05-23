import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import '../assets/scss/_03-Componentes/_POrgAsignacionMesas.scss';

function POrgAsignacionMesas() {
  // Estados para la gestión de invitados y mesas
  const [invitadosData, setInvitadosData] = useState(null);
  const [tables, setTables] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeGroup, setActiveGroup] = useState(null);
  const [selectedTable, setSelectedTable] = useState(null);
  
  // Estados para la creación de nuevas mesas
  const [nuevaMesa, setNuevaMesa] = useState({ nombre: '', capacidad: 8 });
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  // Cargar datos del JSON
  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch('/invitados.json');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setInvitadosData(data);
        
        // Datos de ejemplo si hay error en la carga
        if (!data.grupos) {
          setInvitadosData({
            novios: { novia: "Novia", novio: "Novio" },
            grupos: [
              {
                nombre: "Familia Novia",
                invitados: [
                  { id: 1, nombre: "Padre Novia", relacion: "Padre" },
                  { id: 2, nombre: "Madre Novia", relacion: "Madre" }
                ]
              },
              {
                nombre: "Familia Novio",
                invitados: [
                  { id: 3, nombre: "Padre Novio", relacion: "Padre" },
                  { id: 4, nombre: "Madre Novio", relacion: "Madre" }
                ]
              }
            ]
          });
        }
      } catch (error) {
        console.error("Error al cargar datos de invitados:", error);
        // Datos de prueba en caso de error
        setInvitadosData({
          novios: { novia: "Novia", novio: "Novio" },
          grupos: [
            {
              nombre: "Familia Novia",
              invitados: [
                { id: 1, nombre: "Padre Novia", relacion: "Padre" },
                { id: 2, nombre: "Madre Novia", relacion: "Madre" }
              ]
            },
            {
              nombre: "Familia Novio",
              invitados: [
                { id: 3, nombre: "Padre Novio", relacion: "Padre" },
                { id: 4, nombre: "Madre Novio", relacion: "Madre" }
              ]
            }
          ]
        });
      }
    };

    loadData();
  }, []);

  // Inicializar mesas (solo después de cargar invitadosData)
  useEffect(() => {
    if (invitadosData) {
      const initialTables = Array.from({ length: 5 }, (_, i) => ({
        id: `table-${i + 1}`,
        name: i === 0 ? 'Mesa Principal' : `Mesa ${i + 1}`,
        capacity: i === 0 ? 10 : 8,
        guests: [],
      }));
      setTables(initialTables);
    }
  }, [invitadosData]);

  // Obtener todos los invitados organizados por grupos
  const getAllGuests = () => {
    if (!invitadosData) return [];
    return invitadosData.grupos.map((grupo) => ({
      id: `group-${grupo.nombre}`,
      nombre: grupo.nombre,
      pendiente: grupo.pendiente || false,
      invitados: grupo.invitados.map((invitado) => ({
        ...invitado,
        id: `guest-${invitado.id}`,
        grupo: grupo.nombre,
        pendiente: grupo.pendiente || false,
      })),
    }));
  };

  // Filtrar grupos según búsqueda
  const filteredGroups = () => {
    const allGroups = getAllGuests();
    if (!searchTerm) return allGroups;

    return allGroups
      .map((group) => ({
        ...group,
        invitados: group.invitados.filter((guest) =>
          guest.nombre.toLowerCase().includes(searchTerm.toLowerCase())
        ),
      }))
      .filter((group) => group.invitados.length > 0);
  };

  // Manejador para drag and drop
  const handleDragEnd = (result) => {
    if (!result.destination || !invitadosData) return;

    const { source, destination } = result;

    // Mover entre mesas
    if (
      source.droppableId.startsWith('table-') &&
      destination.droppableId.startsWith('table-')
    ) {
      const sourceTableIndex = tables.findIndex(
        (t) => t.id === source.droppableId
      );
      const destTableIndex = tables.findIndex(
        (t) => t.id === destination.droppableId
      );

      if (sourceTableIndex === -1 || destTableIndex === -1) return;
      if (
        tables[destTableIndex].guests.length >= tables[destTableIndex].capacity
      )
        return;

      const newTables = [...tables];
      const [movedGuest] = newTables[sourceTableIndex].guests.splice(
        source.index,
        1
      );
      newTables[destTableIndex].guests.splice(destination.index, 0, movedGuest);

      setTables(newTables);
    }
    // Mover de lista a mesa
    else if (
      source.droppableId.startsWith('group-') &&
      destination.droppableId.startsWith('table-')
    ) {
      const group = getAllGuests().find((g) => g.id === source.droppableId);
      const guest = group?.invitados[source.index];
      const tableIndex = tables.findIndex(
        (t) => t.id === destination.droppableId
      );

      if (!guest || tableIndex === -1) return;
      if (tables[tableIndex].guests.length >= tables[tableIndex].capacity)
        return;

      const isAssigned = tables.some(
        (table) =>
          table.id !== destination.droppableId &&
          table.guests.some((g) => g.id === guest.id)
      );

      if (!isAssigned) {
        const newTables = [...tables];
        newTables[tableIndex].guests.splice(destination.index, 0, guest);
        setTables(newTables);
      }
    }
  };

  // Funciones para gestión de mesas
  const agregarMesa = (e) => {
    e.preventDefault();
    const id = `table-${tables.length + 1}`;
    setTables([...tables, { ...nuevaMesa, id, guests: [] }]);
    setNuevaMesa({ nombre: '', capacidad: 8 });
    setMostrarFormulario(false);
  };

  const eliminarMesa = (tableId) => {
    if (window.confirm('¿Estás seguro de eliminar esta mesa?')) {
      setTables(tables.filter((table) => table.id !== tableId));
    }
  };

  // Asignar grupo completo a mesa
  const assignGroupToTable = (groupName, tableId) => {
    const group = getAllGuests().find((g) => g.nombre === groupName);
    const table = tables.find((t) => t.id === tableId);

    if (!group || !table) return;
    if (group.invitados.length > table.capacity - table.guests.length) {
      alert(
        `No hay suficiente espacio en la mesa para todo el grupo ${groupName}`
      );
      return;
    }

    setTables((prevTables) =>
      prevTables.map((t) => {
        if (t.id === tableId) {
          const newGuests = group.invitados.filter(
            (guest) =>
              !prevTables.some(
                (table) =>
                  table.id !== t.id && table.guests.some((g) => g.id === guest.id)
              )
          );

          return {
            ...t,
            guests: [...t.guests, ...newGuests],
          };
        }
        return t;
      })
    );
  };

  // Remover invitado de mesa
  const removeGuestFromTable = (tableId, guestId) => {
    setTables((prevTables) =>
      prevTables.map((table) => {
        if (table.id === tableId) {
          return {
            ...table,
            guests: table.guests.filter((guest) => guest.id !== guestId),
          };
        }
        return table;
      })
    );
  };

  // Obtener invitados no asignados
  const getUnassignedGuests = () => {
    const allGuests = getAllGuests().flatMap((group) => group.invitados);
    const assignedGuests = tables.flatMap((table) => table.guests);

    return allGuests.filter(
      (guest) => !assignedGuests.some((assigned) => assigned.id === guest.id)
    );
  };

  // Exportar listado de mesas
  const exportTables = () => {
    if (!invitadosData) return;

    const novios = `Novios: ${invitadosData.novios.novia} & ${invitadosData.novios.novio}`;

    const tableList = tables
      .filter((table) => table.guests.length > 0)
      .map((table) => {
        const guestList = table.guests
          .map(
            (guest) =>
              `  - ${guest.nombre} (${guest.relacion}) [${guest.grupo}]`
          )
          .join('\n');
        return `${table.name} (${table.guests.length}/${table.capacity}):\n${guestList}`;
      })
      .join('\n\n');

    const blob = new Blob([`${novios}\n\n${tableList}`], {
      type: 'text/plain',
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `distribucion_mesas_${
      new Date().toISOString().split('T')[0]
    }.txt`;
    link.click();
  };

  // Mostrar loading si los datos no están cargados
  if (!invitadosData) {
    return (
      <div className="asignacion-loading">
        <div className="loading-spinner"></div>
        <p>Cargando datos de invitados...</p>
      </div>
    );
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="asignacion-container">
        {/* Encabezado */}
        <header className="asignacion-header">
          <h1 className="asignacion-titulo">Organización de Mesas</h1>
          
          <div className="asignacion-controls">
            <div className="asignacion-busqueda">
              <input
                type="text"
                placeholder="Buscar invitado..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                aria-label="Buscar invitado"
              />
              <span className="search-icon">🔍</span>
            </div>
            
            <button 
              className="asignacion-nueva-mesa"
              onClick={() => setMostrarFormulario(true)}
              aria-label="Crear nueva mesa"
            >
              <span className="plus-icon">+</span> Nueva Mesa
            </button>
          </div>
        </header>

        {/* Formulario de nueva mesa */}
        {mostrarFormulario && (
          <div className="asignacion-formulario-mesa">
            <h3>Crear Nueva Mesa</h3>
            <form onSubmit={agregarMesa}>
              <div className="formulario-grupo">
                <label htmlFor="nombre-mesa">Nombre de la Mesa</label>
                <input
                  id="nombre-mesa"
                  type="text"
                  value={nuevaMesa.nombre}
                  onChange={(e) => setNuevaMesa({...nuevaMesa, nombre: e.target.value})}
                  required
                />
              </div>
              
              <div className="formulario-grupo">
                <label htmlFor="capacidad-mesa">Capacidad</label>
                <select
                  id="capacidad-mesa"
                  value={nuevaMesa.capacidad}
                  onChange={(e) => setNuevaMesa({...nuevaMesa, capacidad: parseInt(e.target.value)})}
                >
                  {[6, 8, 10, 12].map(num => (
                    <option key={num} value={num}>{num} personas</option>
                  ))}
                </select>
              </div>
              
              <div className="formulario-botones">
                <button type="submit" className="boton-guardar">
                  Guardar
                </button>
                <button 
                  type="button" 
                  className="boton-cancelar"
                  onClick={() => setMostrarFormulario(false)}
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Estadísticas */}
        <div className="asignacion-estadisticas">
          <div className="estadistica-tarjeta">
            <span className="estadistica-numero">{tables.length}</span>
            <span className="estadistica-etiqueta">Mesas</span>
          </div>
          <div className="estadistica-tarjeta">
            <span className="estadistica-numero">
              {tables.reduce((total, mesa) => total + mesa.guests.length, 0)}
            </span>
            <span className="estadistica-etiqueta">Asignados</span>
          </div>
          <div className="estadistica-tarjeta">
            <span className="estadistica-numero">
              {tables.reduce((total, mesa) => total + mesa.capacity, 0)}
            </span>
            <span className="estadistica-etiqueta">Capacidad</span>
          </div>
          <div className="estadistica-tarjeta">
            <span className="estadistica-numero">{getUnassignedGuests().length}</span>
            <span className="estadistica-etiqueta">Sin Asignar</span>
          </div>
        </div>

        {/* Contenido principal */}
        <div className="asignacion-contenido">
          {/* Sección de invitados */}
          <section className="asignacion-invitados">
            <h2 className="asignacion-subtitulo">Lista de Invitados</h2>
            
            <div className="asignacion-grupos">
              {filteredGroups().map((group) => (
                <div key={group.id} className="grupo-item">
                  <div
                    className="grupo-cabecera"
                    onClick={() => setActiveGroup(activeGroup === group.nombre ? null : group.nombre)}
                    aria-expanded={activeGroup === group.nombre}
                  >
                    <span className="grupo-nombre">
                      {group.nombre} <span className="grupo-contador">({group.invitados.length})</span>
                    </span>
                    <button
                      className="grupo-asignar"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (selectedTable) assignGroupToTable(group.nombre, selectedTable);
                      }}
                      disabled={!selectedTable}
                      aria-label={`Asignar grupo ${group.nombre} a mesa seleccionada`}
                    >
                      ➔
                    </button>
                  </div>

                  {activeGroup === group.nombre && (
                    <Droppable droppableId={group.id} isDropDisabled={true}>
                      {(provided) => (
                        <ul
                          className="grupo-lista"
                          ref={provided.innerRef}
                          {...provided.droppableProps}
                        >
                          {group.invitados.map((guest, index) => (
                            <Draggable key={guest.id} draggableId={guest.id} index={index}>
                              {(provided) => (
                                <li
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  className="invitado-item"
                                  aria-label={`Invitado: ${guest.nombre}`}
                                >
                                  <span className="invitado-nombre">{guest.nombre}</span>
                                  <span className="invitado-info">{guest.relacion} • {guest.grupo}</span>
                                  {tables.some(t => t.guests.some(g => g.id === guest.id)) && (
                                    <span className="invitado-asignado">✓</span>
                                  )}
                                </li>
                              )}
                            </Draggable>
                          ))}
                          {provided.placeholder}
                        </ul>
                      )}
                    </Droppable>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Sección de mesas */}
          <section className="asignacion-mesas">
            <h2 className="asignacion-subtitulo">Mesas</h2>
            
            <div className="asignacion-lista-mesas">
              {tables.map((table) => (
                <div
                  key={table.id}
                  className={`mesa-item ${table.id === selectedTable ? 'mesa-seleccionada' : ''}`}
                  onClick={() => setSelectedTable(table.id)}
                  aria-label={`Mesa ${table.name} con ${table.guests.length} de ${table.capacity} invitados`}
                >
                  <div className="mesa-cabecera">
                    <span className="mesa-nombre">{table.name}</span>
                    <span className="mesa-capacidad">
                      {table.guests.length}/{table.capacity}
                    </span>
                    <button 
                      className="mesa-eliminar"
                      onClick={(e) => {
                        e.stopPropagation();
                        eliminarMesa(table.id);
                      }}
                      disabled={table.guests.length > 0}
                      aria-label={`Eliminar mesa ${table.name}`}
                    >
                      🗑️
                    </button>
                  </div>

                  <Droppable droppableId={table.id}>
                    {(provided) => (
                      <div ref={provided.innerRef} {...provided.droppableProps}>
                        <ul className="mesa-invitados">
                          {table.guests.map((guest, index) => (
                            <Draggable key={guest.id} draggableId={guest.id} index={index}>
                              {(provided) => (
                                <li
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  className="mesa-invitado-item"
                                >
                                  <div className="invitado-detalle">
                                    <span className="invitado-nombre-mesa">{guest.nombre}</span>
                                    <span className="invitado-grupo-mesa">{guest.grupo}</span>
                                  </div>
                                  <button
                                    className="invitado-remover"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      removeGuestFromTable(table.id, guest.id);
                                    }}
                                    aria-label={`Quitar ${guest.nombre} de la mesa`}
                                  >
                                    ✕
                                  </button>
                                </li>
                              )}
                            </Draggable>
                          ))}
                          {provided.placeholder}
                        </ul>
                      </div>
                    )}
                  </Droppable>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Pie de página */}
        <footer className="asignacion-pie">
          <button 
            className="asignacion-exportar"
            onClick={exportTables}
            aria-label="Exportar distribución de mesas"
          >
            📥 Exportar Distribución
          </button>
        </footer>
      </div>
    </DragDropContext>
  );
}

export default POrgAsignacionMesas;