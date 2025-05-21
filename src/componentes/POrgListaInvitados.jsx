import React, { useState, useEffect } from 'react';
import "../assets/scss/_03-Componentes/_POrgListaInvitados.scss";

function POrgListaInvitados() {
  // Estados para la carga de datos
  const [invitadosData, setInvitadosData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Estados del formulario
  const [busqueda, setBusqueda] = useState('');
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [nuevoInvitado, setNuevoInvitado] = useState({
    nombre: '',
    email: '',
    telefono: '',
    confirmado: false,
    acompanantes: 0,
    grupo: '',
    relacion: ''
  });
  const [invitados, setInvitados] = useState([]);
  const [grupos, setGrupos] = useState([]);

  // Cargar datos iniciales
  useEffect(() => {
    const cargarDatos = async () => {
      try {
        setLoading(true);
        const response = await fetch('/invitados.json');
        if (!response.ok) throw new Error('Error al cargar datos');
        const data = await response.json();
        
        setInvitadosData(data);
        
        // Procesar invitados
        const todosInvitados = data.grupos.flatMap(grupo => 
          grupo.invitados.map(invitado => ({
            ...invitado,
            grupo: grupo.nombre,
            pendiente: grupo.pendiente || false,
            confirmado: false,
            acompanantes: invitado.relacion.includes('Pareja') || 
                         invitado.relacion.includes('Esposa') || 
                         invitado.relacion.includes('Hija') || 
                         invitado.relacion.includes('Hijo') ? 0 : 1,
            email: '',
            telefono: ''
          }))
        );
        
        setInvitados(todosInvitados);
        setGrupos(data.grupos.map(g => g.nombre));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    cargarDatos();
  }, []);

  // Handlers
  const handleBusquedaChange = (e) => setBusqueda(e.target.value);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNuevoInvitado(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const agregarInvitado = (e) => {
    e.preventDefault();
    const nuevoId = Math.max(...invitados.map(i => i.id), 0) + 1;
    setInvitados([...invitados, { 
      ...nuevoInvitado, 
      id: nuevoId,
      pendiente: false
    }]);
    setNuevoInvitado({
      nombre: '',
      email: '',
      telefono: '',
      confirmado: false,
      acompanantes: 0,
      grupo: '',
      relacion: ''
    });
    setMostrarFormulario(false);
  };

  const toggleConfirmacion = (id) => {
    setInvitados(invitados.map(invitado => 
      invitado.id === id ? { ...invitado, confirmado: !invitado.confirmado } : invitado
    ));
  };

  const eliminarInvitado = (id) => {
    setInvitados(invitados.filter(invitado => invitado.id !== id));
  };

  // Filtrado y cálculos
  const invitadosFiltrados = invitados.filter(invitado =>
    invitado.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
    invitado.grupo.toLowerCase().includes(busqueda.toLowerCase()) ||
    invitado.relacion.toLowerCase().includes(busqueda.toLowerCase())
  );

  const totalInvitados = invitados.length;
  const totalConfirmados = invitados.filter(i => i.confirmado).length;
  const totalPersonas = invitados.reduce((total, invitado) => 
    total + (invitado.confirmado ? 1 + invitado.acompanantes : 0), 0);

  // Estados de carga
  if (loading) {
    return (
      <div className="lista-invitados-loading">
        <i className="bi bi-hourglass-split"></i> 
        <p>Cargando lista de invitados...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="lista-invitados-error">
        <i className="bi bi-exclamation-triangle-fill"></i> 
        <p>Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="lista-invitados-container">
      <div className="lista-invitados-content">
        {/* Header */}
        <header className="lista-header">
          <h1>Lista de Invitados</h1>
          <h2>Organización de invitados</h2>
          <p>Gestiona la lista de invitados para {invitadosData.novios.novia} & {invitadosData.novios.novio}</p>
        </header>
        
        {/* Controles */}
        <div className="lista-controls">
          <div className="lista-search">
            <i className="bi bi-search"></i>
            <input
              type="text"
              placeholder="Buscar invitado..."
              value={busqueda}
              onChange={handleBusquedaChange}
            />
          </div>
          
          <button 
            className="lista-button"
            onClick={() => setMostrarFormulario(true)}
          >
            <i className="bi bi-plus-lg"></i> Agregar
          </button>
        </div>
        
        {/* Formulario */}
        {mostrarFormulario && (
          <div className="lista-form">
            <h3>Agregar Nuevo Invitado</h3>
            <form onSubmit={agregarInvitado}>
              <div className="form-field">
                <label>Nombre Completo *</label>
                <input
                  type="text"
                  name="nombre"
                  value={nuevoInvitado.nombre}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="form-field">
                <label>Grupo *</label>
                <select
                  name="grupo"
                  value={nuevoInvitado.grupo}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Seleccionar grupo</option>
                  {grupos.map(grupo => (
                    <option key={grupo} value={grupo}>{grupo}</option>
                  ))}
                </select>
              </div>
              
              <div className="form-field">
                <label>Relación *</label>
                <input
                  type="text"
                  name="relacion"
                  value={nuevoInvitado.relacion}
                  onChange={handleInputChange}
                  required
                  placeholder="Ej: Amigo, Familiar"
                />
              </div>
              
              <div className="form-field">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={nuevoInvitado.email}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="form-field">
                <label>Teléfono</label>
                <input
                  type="tel"
                  name="telefono"
                  value={nuevoInvitado.telefono}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="form-field checkbox">
                <input
                  type="checkbox"
                  name="confirmado"
                  checked={nuevoInvitado.confirmado}
                  onChange={handleInputChange}
                />
                <label>Confirmado</label>
              </div>
              
              <div className="form-field">
                <label>Acompañantes</label>
                <input
                  type="number"
                  name="acompanantes"
                  min="0"
                  value={nuevoInvitado.acompanantes}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="form-actions">
                <button type="submit" className="primary">
                  <i className="bi bi-check-lg"></i> Guardar
                </button>
                <button 
                  type="button"
                  onClick={() => setMostrarFormulario(false)}
                >
                  <i className="bi bi-x-lg"></i> Cancelar
                </button>
              </div>
            </form>
          </div>
        )}
        
        {/* Resumen */}
        <div className="lista-summary">
          <div className="summary-card">
            <i className="bi bi-people-fill"></i>
            <div>
              <h4>Total Invitados</h4>
              <p>{totalInvitados}</p>
            </div>
          </div>
          
          <div className="summary-card">
            <i className="bi bi-check-circle"></i>
            <div>
              <h4>Confirmados</h4>
              <p>{totalConfirmados}</p>
            </div>
          </div>
          
          <div className="summary-card">
            <i className="bi bi-person-lines-fill"></i>
            <div>
              <h4>Total Personas</h4>
              <p>{totalPersonas}</p>
            </div>
          </div>
        </div>
        
        {/* Tabla de invitados */}
        <div className="lista-table">
          {invitadosFiltrados.length > 0 ? (
            <div className="table-responsive">
              <table>
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th className="hide-mobile">Grupo</th>
                    <th className="hide-mobile">Relación</th>
                    <th>Confirmación</th>
                    <th>Acomp.</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {invitadosFiltrados.map((invitado) => (
                    <tr key={invitado.id}>
                      <td>{invitado.nombre}</td>
                      <td className="hide-mobile">{invitado.grupo}</td>
                      <td className="hide-mobile">{invitado.relacion}</td>
                      <td>
                        <button
                          className={`confirmation-btn ${invitado.confirmado ? 'confirmed' : ''}`}
                          onClick={() => toggleConfirmacion(invitado.id)}
                        >
                          {invitado.confirmado ? (
                            <><i className="bi bi-check-circle-fill"></i> Sí</>
                          ) : (
                            <><i className="bi bi-circle"></i> No</>
                          )}
                        </button>
                      </td>
                      <td>{invitado.acompanantes}</td>
                      <td>
                        <button className="action-btn edit">
                          <i className="bi bi-pencil-fill"></i>
                        </button>
                        <button 
                          className="action-btn delete"
                          onClick={() => eliminarInvitado(invitado.id)}
                        >
                          <i className="bi bi-trash-fill"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="lista-empty">
              <i className="bi bi-emoji-frown"></i>
              <p>No se encontraron invitados</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default POrgListaInvitados;