import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import invitadosData from '/src/json/invitados.json';
import "../assets/scss/_03-Componentes/_POrgMesas.scss";

function POrgMesas() {
  const [tables, setTables] = useState([]);
  const [notes, setNotes] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeGroup, setActiveGroup] = useState(null);
  const [selectedTable, setSelectedTable] = useState(null);

  // Inicializar mesas
  useEffect(() => {
    const initialTables = Array.from({ length: 20 }, (_, i) => ({
      id: `table-${i + 1}`,
      name: `Mesa ${i + 1}`,
      capacity: 8,
      guests: []
    }));
    setTables(initialTables);
  }, []);

  // Obtener todos los invitados organizados por grupos
  const getAllGuests = () => {
    return invitadosData.grupos.map(grupo => ({
      id: `group-${grupo.nombre}`,
      nombre: grupo.nombre,
      pendiente: grupo.pendiente || false,
      invitados: grupo.invitados.map(invitado => ({
        ...invitado,
        id: `guest-${invitado.id}`,
        grupo: grupo.nombre,
        pendiente: grupo.pendiente || false
      }))
    }));
  };

  // Filtrar grupos según búsqueda
  const filteredGroups = () => {
    const allGroups = getAllGuests();
    if (!searchTerm) return allGroups;

    return allGroups.map(group => ({
      ...group,
      invitados: group.invitados.filter(guest => 
        guest.nombre.toLowerCase().includes(searchTerm.toLowerCase())
      )
    })).filter(group => group.invitados.length > 0);
  };

  // Manejador para drag and drop
  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const { source, destination } = result;

    // Mover entre mesas
    if (source.droppableId.startsWith('table-') && destination.droppableId.startsWith('table-')) {
      const sourceTableIndex = tables.findIndex(t => t.id === source.droppableId);
      const destTableIndex = tables.findIndex(t => t.id === destination.droppableId);
      
      if (sourceTableIndex === -1 || destTableIndex === -1) return;
      if (tables[destTableIndex].guests.length >= tables[destTableIndex].capacity) return;

      const newTables = [...tables];
      const [movedGuest] = newTables[sourceTableIndex].guests.splice(source.index, 1);
      newTables[destTableIndex].guests.splice(destination.index, 0, movedGuest);

      setTables(newTables);
    }
    // Mover de lista a mesa
    else if (source.droppableId.startsWith('group-') && destination.droppableId.startsWith('table-')) {
      const group = getAllGuests().find(g => g.id === source.droppableId);
      const guest = group?.invitados[source.index];
      const tableIndex = tables.findIndex(t => t.id === destination.droppableId);
      
      if (!guest || tableIndex === -1) return;
      if (tables[tableIndex].guests.length >= tables[tableIndex].capacity) return;

      const isAssigned = tables.some(table => 
        table.id !== destination.droppableId && 
        table.guests.some(g => g.id === guest.id)
      );
      
      if (!isAssigned) {
        const newTables = [...tables];
        newTables[tableIndex].guests.splice(destination.index, 0, guest);
        setTables(newTables);
      }
    }
  };

  // Remover invitado de mesa
  const removeGuestFromTable = (tableId, guestId) => {
    setTables(prevTables => 
      prevTables.map(table => {
        if (table.id === tableId) {
          return {
            ...table,
            guests: table.guests.filter(guest => guest.id !== guestId)
          };
        }
        return table;
      })
    );
  };

  // Asignar grupo completo a mesa
  const assignGroupToTable = (groupName, tableId) => {
    const group = getAllGuests().find(g => g.nombre === groupName);
    const table = tables.find(t => t.id === tableId);
    
    if (!group || !table) return;
    if (group.invitados.length > (table.capacity - table.guests.length)) {
      alert(`No hay suficiente espacio en la mesa para todo el grupo ${groupName}`);
      return;
    }

    setTables(prevTables => 
      prevTables.map(t => {
        if (t.id === tableId) {
          const newGuests = group.invitados.filter(guest => 
            !prevTables.some(table => 
              table.id !== t.id && table.guests.some(g => g.id === guest.id)
            )
          );
          
          return {
            ...t,
            guests: [...t.guests, ...newGuests]
          };
        }
        return t;
      })
    );
  };

  // Obtener invitados no asignados
  const getUnassignedGuests = () => {
    const allGuests = getAllGuests().flatMap(group => group.invitados);
    const assignedGuests = tables.flatMap(table => table.guests);
    
    return allGuests.filter(guest => 
      !assignedGuests.some(assigned => assigned.id === guest.id)
    );
  };

  // Exportar listado de mesas
  const exportTables = () => {
    const novios = `Novios: ${invitadosData.novios.novia} & ${invitadosData.novios.novio}`;
    
    const tableList = tables
      .filter(table => table.guests.length > 0)
      .map(table => {
        const guestList = table.guests
          .map(guest => `  - ${guest.nombre} (${guest.relacion}) [${guest.grupo}]`)
          .join('\n');
        return `${table.name} (${table.guests.length}/${table.capacity}):\n${guestList}`;
      })
      .join('\n\n');

    const blob = new Blob([`${novios}\n\n${tableList}`], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `distribucion_mesas_${new Date().toISOString().split('T')[0]}.txt`;
    link.click();
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="POrgMesas-compact-container">
        <h1 className="main-title">Organización de Mesas</h1>
        <p className="subtitle">Arrastra los invitados a las Mesas</p>
        
        <div className="compact-grid">
          {/* Panel de Invitados */}
          <div className="invitados-section">
            <div className="search-box">
              <input
                type="text"
                placeholder="Buscar invitado..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="groups-container">
              {filteredGroups().map(group => (
                <div key={group.id} className="group-item">
                  <div 
                    className="group-header"
                    onClick={() => setActiveGroup(activeGroup === group.nombre ? null : group.nombre)}
                  >
                    <span className="group-name">{group.nombre} ({group.invitados.length})</span>
                    <button 
                      className="assign-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (selectedTable) assignGroupToTable(group.nombre, selectedTable);
                      }}
                      disabled={!selectedTable}
                    >
                      ↳
                    </button>
                  </div>
                  
                  {activeGroup === group.nombre && (
                    <Droppable droppableId={group.id} isDropDisabled={true}>
                      {(provided) => (
                        <ul 
                          className="guest-list"
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
                                >
                                  <span className="guest-name">{guest.nombre}</span>
                                  <span className="guest-status">
                                    {tables.some(t => t.guests.some(g => g.id === guest.id)) ? '✓' : ''}
                                  </span>
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
          </div>
          
          {/* Panel de Mesas */}
          <div className="POrgMesas-section">
            <div className="stats">
              <span>Total: {getAllGuests().flatMap(g => g.invitados).length}</span>
              <span>Asignados: {tables.flatMap(t => t.guests).length}</span>
              <span>Libres: {getUnassignedGuests().length}</span>
            </div>
            
            <div className="tables-grid">
              {tables.map(table => (
                <div 
                  key={table.id} 
                  className={`table-item ${table.id === selectedTable ? 'selected' : ''}`}
                  onClick={() => setSelectedTable(table.id)}
                >
                  <Droppable droppableId={table.id}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                      >
                        <div className="table-header">
                          <span>{table.name}</span>
                          <span>{table.guests.length}/{table.capacity}</span>
                        </div>
                        
                        <ul className="table-guests">
                          {table.guests.map((guest, index) => (
                            <Draggable key={guest.id} draggableId={guest.id} index={index}>
                              {(provided) => (
                                <li 
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                >
                                  {guest.nombre}
                                  <button 
                                    className="remove-btn"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      removeGuestFromTable(table.id, guest.id);
                                    }}
                                  >
                                    ×
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
          </div>
        </div>
        
        <div className="footer-actions">
          <button className="export-btn" onClick={exportTables}>
            Exportar
          </button>
        </div>
      </div>
    </DragDropContext>
  );
}

export default POrgMesas;