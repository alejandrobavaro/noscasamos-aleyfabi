import React from 'react';
import { useNavigate } from 'react-router-dom';
"../assets/scss/_03-Componentes/_PanelOrganizacion.scss";

function PanelOrganizacion() {
  const navigate = useNavigate();

  return (
    <div className="panel-organizacion">
      <div className="encabezado-panel">
        <h1>Panel de Organización</h1>
        <p>Bienvenidos, Alejandro y Fabiola</p>
      </div>
      
      <div className="resumen-estadisticas">
        <div className="estadistica">
          <h3>Invitados Confirmados</h3>
          <p className="numero">87</p>
          <p className="meta">Meta: 120</p>
        </div>
        
        <div className="estadistica">
          <h3>Tareas Pendientes</h3>
          <p className="numero">14</p>
          <p className="meta">Por hacer</p>
        </div>
        
        <div className="estadistica">
          <h3>Días Restantes</h3>
          <p className="numero">153</p>
          <p className="meta">Para el gran día</p>
        </div>
      </div>
      
      <div className="accesos-rapidos">
        <h2>Accesos Rápidos</h2>
        <div className="grid-accesos">
          <div className="acceso" onClick={() => navigate('/organizacion/invitados')}>
            <i className="bi bi-people-fill"></i>
            <span>Lista de Invitados</span>
          </div>
          
          <div className="acceso" onClick={() => navigate('/organizacion/mesas')}>
            <i className="bi bi-table"></i>
            <span>Asignación de Mesas</span>
          </div>
          
          <div className="acceso" onClick={() => navigate('/organizacion/tareas')}>
            <i className="bi bi-list-check"></i>
            <span>Lista de Tareas</span>
          </div>
          
          <div className="acceso">
            <i className="bi bi-cash-stack"></i>
            <span>Presupuesto</span>
          </div>
          
          <div className="acceso">
            <i className="bi bi-card-checklist"></i>
            <span>Checklist Boda</span>
          </div>
          
          <div className="acceso">
            <i className="bi bi-gift-fill"></i>
            <span>Regalos</span>
          </div>
        </div>
      </div>
      
      <div className="proximas-tareas">
        <h2>Próximas Tareas</h2>
        <ul className="lista-tareas">
          <li>
            <input type="checkbox" id="tarea1" />
            <label htmlFor="tarea1">Confirmar menú con el caterring</label>
            <span className="fecha">15/08/2025</span>
          </li>
          <li>
            <input type="checkbox" id="tarea2" />
            <label htmlFor="tarea2">Prueba de vestuario</label>
            <span className="fecha">20/08/2025</span>
          </li>
          <li>
            <input type="checkbox" id="tarea3" />
            <label htmlFor="tarea3">Enviar recordatorios a invitados</label>
            <span className="fecha">01/10/2025</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default PanelOrganizacion;