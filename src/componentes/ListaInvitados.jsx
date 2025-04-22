import React, { useState } from 'react';
import "../assets/scss/_03-Componentes/_ListaInvitados.scss";

function ListaInvitados() {
  const [busqueda, setBusqueda] = useState('');
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [nuevoInvitado, setNuevoInvitado] = useState({
    nombre: '',
    email: '',
    telefono: '',
    confirmado: false,
    acompanantes: 0
  });

  // Datos de ejemplo - en una app real vendrían de una API
  const [invitados, setInvitados] = useState([
    { id: 1, nombre: 'María González', email: 'maria@ejemplo.com', telefono: '1122334455', confirmado: true, acompanantes: 1 },
    { id: 2, nombre: 'Carlos Pérez', email: 'carlos@ejemplo.com', telefono: '1166778899', confirmado: false, acompanantes: 0 },
    { id: 3, nombre: 'Laura Fernández', email: 'laura@ejemplo.com', telefono: '1144556677', confirmado: true, acompanantes: 2 },
    { id: 4, nombre: 'Juan Rodríguez', email: 'juan@ejemplo.com', telefono: '1199887766', confirmado: false, acompanantes: 0 }
  ]);

  const handleBusquedaChange = (e) => {
    setBusqueda(e.target.value);
  };

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
    setInvitados([...invitados, { ...nuevoInvitado, id: nuevoId }]);
    setNuevoInvitado({
      nombre: '',
      email: '',
      telefono: '',
      confirmado: false,
      acompanantes: 0
    });
    setMostrarFormulario(false);
  };

  const toggleConfirmacion = (id) => {
    setInvitados(invitados.map(invitado => 
      invitado.id === id ? { ...invitado, confirmado: !invitado.confirmado } : invitado
    ));
  };

  const invitadosFiltrados = invitados.filter(invitado =>
    invitado.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="lista-invitados">
      <h1>Lista de Invitados</h1>
      
      <div className="controles-lista">
        <div className="busqueda">
          <i className="bi bi-search"></i>
          <input
            type="text"
            placeholder="Buscar invitado..."
            value={busqueda}
            onChange={handleBusquedaChange}
          />
        </div>
        
        <button 
          className="boton-agregar"
          onClick={() => setMostrarFormulario(true)}
        >
          <i className="bi bi-plus-lg"></i> Agregar Invitado
        </button>
      </div>
      
      {mostrarFormulario && (
        <div className="formulario-invitado">
          <h2>Agregar Nuevo Invitado</h2>
          <form onSubmit={agregarInvitado}>
            <div className="form-group">
              <label>Nombre Completo *</label>
              <input
                type="text"
                name="nombre"
                value={nuevoInvitado.nombre}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={nuevoInvitado.email}
                onChange={handleInputChange}
              />
            </div>
            
            <div className="form-group">
              <label>Teléfono</label>
              <input
                type="tel"
                name="telefono"
                value={nuevoInvitado.telefono}
                onChange={handleInputChange}
              />
            </div>
            
            <div className="form-group">
              <label>
                <input
                  type="checkbox"
                  name="confirmado"
                  checked={nuevoInvitado.confirmado}
                  onChange={handleInputChange}
                />
                Confirmado
              </label>
            </div>
            
            <div className="form-group">
              <label>Acompañantes</label>
              <input
                type="number"
                name="acompanantes"
                min="0"
                value={nuevoInvitado.acompanantes}
                onChange={handleInputChange}
              />
            </div>
            
            <div className="botones-formulario">
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
      
      <div className="resumen-invitados">
        <div className="estadistica">
          <span className="numero">{invitados.length}</span>
          <span className="texto">Invitados</span>
        </div>
        <div className="estadistica">
          <span className="numero">{invitados.filter(i => i.confirmado).length}</span>
          <span className="texto">Confirmados</span>
        </div>
        <div className="estadistica">
          <span className="numero">
            {invitados.reduce((total, invitado) => total + (invitado.confirmado ? 1 + invitado.acompanantes : 0), 0)}
          </span>
          <span className="texto">Personas</span>
        </div>
      </div>
      
      <div className="tabla-invitados">
        <div className="encabezado-tabla">
          <div className="columna nombre">Nombre</div>
          <div className="columna contacto">Contacto</div>
          <div className="columna confirmacion">Confirmación</div>
          <div className="columna acompanantes">Acompañantes</div>
          <div className="columna acciones">Acciones</div>
        </div>
        
        {invitadosFiltrados.length > 0 ? (
          invitadosFiltrados.map(invitado => (
            <div key={invitado.id} className="fila-invitado">
              <div className="columna nombre">
                {invitado.nombre}
              </div>
              
              <div className="columna contacto">
                <div>{invitado.email}</div>
                <div>{invitado.telefono}</div>
              </div>
              
              <div className="columna confirmacion">
                <button
                  className={`badge ${invitado.confirmado ? 'confirmado' : 'pendiente'}`}
                  onClick={() => toggleConfirmacion(invitado.id)}
                >
                  {invitado.confirmado ? 'Confirmado' : 'Pendiente'}
                </button>
              </div>
              
              <div className="columna acompanantes">
                {invitado.acompanantes}
              </div>
              
              <div className="columna acciones">
                <button className="boton-editar">
                  <i className="bi bi-pencil-fill"></i>
                </button>
                <button className="boton-eliminar">
                  <i className="bi bi-trash-fill"></i>
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="sin-resultados">
            No se encontraron invitados que coincidan con la búsqueda
          </div>
        )}
      </div>
    </div>
  );
}

export default ListaInvitados;