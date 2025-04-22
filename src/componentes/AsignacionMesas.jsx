import React, { useState } from 'react';
import '../assets/scss/_03-Componentes/_AsignacionMesas.scss';

function AsignacionMesas() {
  const [mesas, setMesas] = useState([
    { id: 1, nombre: 'Mesa Principal', capacidad: 10, invitados: ['Alejandro', 'Fabiola', 'Padres Novia', 'Padres Novio'] },
    { id: 2, nombre: 'Mesa Familia', capacidad: 8, invitados: ['Tía María', 'Tío Carlos', 'Prima Laura', 'Abuelos'] },
    { id: 3, nombre: 'Mesa Amigos', capacidad: 6, invitados: ['Amigo Juan', 'Amiga Sofía'] },
    { id: 4, nombre: 'Mesa Colegas', capacidad: 6, invitados: [] }
  ]);

  const [nuevaMesa, setNuevaMesa] = useState({ nombre: '', capacidad: 6 });
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [invitadosDisponibles] = useState(['Amigo Pedro', 'Amiga Ana', 'Primo Luis', 'Vecina Marta']);

  const agregarMesa = (e) => {
    e.preventDefault();
    const id = Math.max(...mesas.map(m => m.id), 0) + 1;
    setMesas([...mesas, { ...nuevaMesa, id, invitados: [] }]);
    setNuevaMesa({ nombre: '', capacidad: 6 });
    setMostrarFormulario(false);
  };

  const agregarInvitadoAMesa = (mesaId, invitado) => {
    setMesas(mesas.map(mesa => {
      if (mesa.id === mesaId) {
        return { ...mesa, invitados: [...mesa.invitados, invitado] };
      }
      return mesa;
    }));
  };

  const quitarInvitadoDeMesa = (mesaId, invitadoIndex) => {
    setMesas(mesas.map(mesa => {
      if (mesa.id === mesaId) {
        const nuevosInvitados = [...mesa.invitados];
        nuevosInvitados.splice(invitadoIndex, 1);
        return { ...mesa, invitados: nuevosInvitados };
      }
      return mesa;
    }));
  };

  return (
    <div className="asignacion-mesas">
      <h1>Asignación de Mesas</h1>
      
      <div className="controles">
        <button 
          className="boton-nueva-mesa"
          onClick={() => setMostrarFormulario(true)}
        >
          <i className="bi bi-plus-circle"></i> Crear Nueva Mesa
        </button>
      </div>
      
      {mostrarFormulario && (
        <div className="formulario-mesa">
          <h2>Agregar Nueva Mesa</h2>
          <form onSubmit={agregarMesa}>
            <div className="form-group">
              <label>Nombre de la Mesa *</label>
              <input
                type="text"
                value={nuevaMesa.nombre}
                onChange={(e) => setNuevaMesa({...nuevaMesa, nombre: e.target.value})}
                required
              />
            </div>
            
            <div className="form-group">
              <label>Capacidad</label>
              <select
                value={nuevaMesa.capacidad}
                onChange={(e) => setNuevaMesa({...nuevaMesa, capacidad: parseInt(e.target.value)})}
              >
                {[6, 8, 10, 12].map(num => (
                  <option key={num} value={num}>{num} personas</option>
                ))}
              </select>
            </div>
            
            <div className="botones-formulario">
              <button type="submit" className="boton-guardar">
                Guardar Mesa
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
      
      <div className="resumen-mesas">
        <div className="estadistica">
          <span className="numero">{mesas.length}</span>
          <span className="texto">Mesas creadas</span>
        </div>
        <div className="estadistica">
          <span className="numero">
            {mesas.reduce((total, mesa) => total + mesa.invitados.length, 0)}
          </span>
          <span className="texto">Invitados asignados</span>
        </div>
        <div className="estadistica">
          <span className="numero">
            {mesas.reduce((total, mesa) => total + mesa.capacidad, 0)}
          </span>
          <span className="texto">Capacidad total</span>
        </div>
      </div>
      
      <div className="mesas-container">
        {mesas.map(mesa => (
          <div key={mesa.id} className="mesa">
            <div className="encabezado-mesa">
              <h3>{mesa.nombre}</h3>
              <span className="capacidad">
                {mesa.invitados.length}/{mesa.capacidad} personas
              </span>
            </div>
            
            <div className="invitados-mesa">
              {mesa.invitados.length > 0 ? (
                mesa.invitados.map((invitado, index) => (
                  <div key={index} className="invitado">
                    <span>{invitado}</span>
                    <button 
                      className="boton-quitar"
                      onClick={() => quitarInvitadoDeMesa(mesa.id, index)}
                    >
                      <i className="bi bi-x"></i>
                    </button>
                  </div>
                ))
              ) : (
                <div className="sin-invitados">No hay invitados asignados</div>
              )}
            </div>
            
            <div className="agregar-invitado">
              <select
                onChange={(e) => {
                  if (e.target.value) {
                    agregarInvitadoAMesa(mesa.id, e.target.value);
                    e.target.value = '';
                  }
                }}
                disabled={mesa.invitados.length >= mesa.capacidad}
              >
                <option value="">Agregar invitado...</option>
                {invitadosDisponibles.map((invitado, index) => (
                  <option key={index} value={invitado}>{invitado}</option>
                ))}
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AsignacionMesas;