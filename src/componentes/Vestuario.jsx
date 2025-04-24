import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import "../assets/scss/_03-Componentes/_Vestuario.scss";

const localizer = momentLocalizer(moment);

const initialData = {
  fittings: [
    {
      id: 1,
      title: 'Primera Prueba Vestido Novia',
      start: new Date(2025, 7, 15, 14, 0),
      end: new Date(2025, 7, 15, 16, 0),
      location: 'Boutique "El Jardín Blanco"',
      attendees: ['Fabiola', 'Madre', 'Mejor Amiga'],
      notes: 'Llevar zapatos y accesorios similares a los planeados'
    },
    {
      id: 2,
      title: 'Prueba Traje Novio',
      start: new Date(2025, 8, 5, 11, 0),
      end: new Date(2025, 8, 5, 12, 30),
      location: 'Sastrería "Elegancia"',
      attendees: ['Alejandro', 'Padre'],
      notes: 'Confirmar medidas con el sastre'
    },
    {
      id: 3,
      title: 'Prueba Final Vestido',
      start: new Date(2025, 9, 20, 15, 0),
      end: new Date(2025, 9, 20, 17, 0),
      location: 'Boutique "El Jardín Blanco"',
      attendees: ['Fabiola', 'Madre'],
      notes: 'Verificar últimos ajustes'
    }
  ],
  attireItems: [
    {
      id: 1,
      type: 'vestido',
      description: 'Vestido de novia estilo princesa',
      status: 'ordered',
      price: 25000,
      paid: 15000,
      vendor: 'Boutique "El Jardín Blanco"',
      notes: 'Entregas parciales: 15/08, 20/10'
    },
    {
      id: 2,
      type: 'traje',
      description: 'Traje de novio azul marino',
      status: 'measured',
      price: 8000,
      paid: 3000,
      vendor: 'Sastrería "Elegancia"',
      notes: 'Primer ajuste programado'
    },
    {
      id: 3,
      type: 'accesorio',
      description: 'Tocado y velo',
      status: 'pending',
      price: 3500,
      paid: 0,
      vendor: 'Boutique "El Jardín Blanco"',
      notes: 'Por seleccionar modelo final'
    },
    {
      id: 4,
      type: 'zapatos',
      description: 'Zapatos de novia',
      status: 'purchased',
      price: 2800,
      paid: 2800,
      vendor: 'Tienda "Pisadas"',
      notes: 'Ya en posesión'
    }
  ]
};

function Vestuario() {
  const [fittings, setFittings] = useState(initialData.fittings);
  const [attireItems, setAttireItems] = useState(initialData.attireItems);
  const [activeTab, setActiveTab] = useState('calendar');
  const [newFitting, setNewFitting] = useState({
    title: '',
    start: '',
    end: '',
    location: '',
    attendees: '',
    notes: ''
  });
  const [newItem, setNewItem] = useState({
    type: 'vestido',
    description: '',
    price: '',
    vendor: '',
    notes: ''
  });

  const handleFittingInputChange = (e) => {
    const { name, value } = e.target;
    setNewFitting({ ...newFitting, [name]: value });
  };

  const handleItemInputChange = (e) => {
    const { name, value } = e.target;
    setNewItem({ ...newItem, [name]: value });
  };

  const addFitting = () => {
    if (!newFitting.title || !newFitting.start) return;
    
    const fitting = {
      id: Math.max(...fittings.map(f => f.id)) + 1,
      title: newFitting.title,
      start: new Date(newFitting.start),
      end: new Date(newFitting.end || new Date(new Date(newFitting.start).getTime() + 2 * 60 * 60 * 1000)),
      location: newFitting.location,
      attendees: newFitting.attendees.split(',').map(a => a.trim()),
      notes: newFitting.notes
    };
    
    setFittings([...fittings, fitting]);
    setNewFitting({
      title: '',
      start: '',
      end: '',
      location: '',
      attendees: '',
      notes: ''
    });
  };

  const addAttireItem = () => {
    if (!newItem.description || !newItem.price) return;
    
    const item = {
      id: Math.max(...attireItems.map(i => i.id)) + 1,
      type: newItem.type,
      description: newItem.description,
      status: 'pending',
      price: Number(newItem.price),
      paid: 0,
      vendor: newItem.vendor,
      notes: newItem.notes
    };
    
    setAttireItems([...attireItems, item]);
    setNewItem({
      type: 'vestido',
      description: '',
      price: '',
      vendor: '',
      notes: ''
    });
  };

  const updateItemStatus = (id, status) => {
    setAttireItems(attireItems.map(item => 
      item.id === id ? { ...item, status } : item
    ));
  };

  const updatePayment = (id, amount) => {
    setAttireItems(attireItems.map(item => 
      item.id === id ? { ...item, paid: Number(amount) } : item
    ));
  };

  return (
    <div className="vestuario-container">
      <h1>Coordinación de Vestuario</h1>
      
      <div className="tabs">
        <button 
          className={activeTab === 'calendar' ? 'active' : ''}
          onClick={() => setActiveTab('calendar')}
        >
          Calendario de Pruebas
        </button>
        <button 
          className={activeTab === 'items' ? 'active' : ''}
          onClick={() => setActiveTab('items')}
        >
          Prendas y Accesorios
        </button>
        <button 
          className={activeTab === 'budget' ? 'active' : ''}
          onClick={() => setActiveTab('budget')}
        >
          Presupuesto de Vestuario
        </button>
      </div>
      
      {activeTab === 'calendar' && (
        <div className="calendar-section">
          <div className="calendar-container">
            <Calendar
              localizer={localizer}
              events={fittings}
              startAccessor="start"
              endAccessor="end"
              style={{ height: 600 }}
              views={['month', 'week', 'day', 'agenda']}
              defaultView="month"
              messages={{
                today: 'Hoy',
                previous: 'Anterior',
                next: 'Siguiente',
                month: 'Mes',
                week: 'Semana',
                day: 'Día',
                agenda: 'Agenda',
                date: 'Fecha',
                time: 'Hora',
                event: 'Evento'
              }}
            />
          </div>
          
          <div className="add-fitting-form">
            <h2>Agregar Nueva Prueba</h2>
            <div className="form-group">
              <label>Título:</label>
              <input 
                type="text" 
                name="title" 
                value={newFitting.title}
                onChange={handleFittingInputChange}
                placeholder="Ej. Prueba final vestido"
              />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Fecha y Hora de Inicio:</label>
                <input 
                  type="datetime-local" 
                  name="start" 
                  value={newFitting.start}
                  onChange={handleFittingInputChange}
                />
              </div>
              <div className="form-group">
                <label>Fecha y Hora de Fin:</label>
                <input 
                  type="datetime-local" 
                  name="end" 
                  value={newFitting.end}
                  onChange={handleFittingInputChange}
                />
              </div>
            </div>
            <div className="form-group">
              <label>Ubicación:</label>
              <input 
                type="text" 
                name="location" 
                value={newFitting.location}
                onChange={handleFittingInputChange}
                placeholder="Dirección o nombre del lugar"
              />
            </div>
            <div className="form-group">
              <label>Asistentes (separados por comas):</label>
              <input 
                type="text" 
                name="attendees" 
                value={newFitting.attendees}
                onChange={handleFittingInputChange}
                placeholder="Ej: Fabiola, Madre, Mejor Amiga"
              />
            </div>
            <div className="form-group">
              <label>Notas:</label>
              <textarea 
                name="notes" 
                value={newFitting.notes}
                onChange={handleFittingInputChange}
                placeholder="Detalles importantes para recordar"
              ></textarea>
            </div>
            <button className="btn-add" onClick={addFitting}>
              Agregar Prueba
            </button>
          </div>
          
          <div className="upcoming-fittings">
            <h2>Próximas Pruebas</h2>
            {fittings
              .filter(f => new Date(f.start) > new Date())
              .sort((a, b) => new Date(a.start) - new Date(b.start))
              .map(fitting => (
                <div key={fitting.id} className="fitting-card">
                  <div className="fitting-header">
                    <h3>{fitting.title}</h3>
                    <span className="date">
                      {formatDateTime(fitting.start)} - {formatTime(fitting.end)}
                    </span>
                  </div>
                  <div className="fitting-details">
                    <p><strong>Ubicación:</strong> {fitting.location}</p>
                    <p><strong>Asistentes:</strong> {fitting.attendees.join(', ')}</p>
                    {fitting.notes && <p><strong>Notas:</strong> {fitting.notes}</p>}
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
      
      {activeTab === 'items' && (
        <div className="items-section">
          <div className="add-item-form">
            <h2>Agregar Prenda o Accesorio</h2>
            <div className="form-group">
              <label>Tipo:</label>
              <select 
                name="type" 
                value={newItem.type}
                onChange={handleItemInputChange}
              >
                <option value="vestido">Vestido de Novia</option>
                <option value="traje">Traje de Novio</option>
                <option value="accesorio">Accesorio</option>
                <option value="zapatos">Zapatos</option>
                <option value="otro">Otro</option>
              </select>
            </div>
            <div className="form-group">
              <label>Descripción:</label>
              <input 
                type="text" 
                name="description" 
                value={newItem.description}
                onChange={handleItemInputChange}
                placeholder="Descripción detallada del artículo"
              />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Precio:</label>
                <input 
                  type="number" 
                  name="price" 
                  value={newItem.price}
                  onChange={handleItemInputChange}
                  placeholder="$"
                />
              </div>
              <div className="form-group">
                <label>Proveedor:</label>
                <input 
                  type="text" 
                  name="vendor" 
                  value={newItem.vendor}
                  onChange={handleItemInputChange}
                  placeholder="Tienda o diseñador"
                />
              </div>
            </div>
            <div className="form-group">
              <label>Notas:</label>
              <textarea 
                name="notes" 
                value={newItem.notes}
                onChange={handleItemInputChange}
                placeholder="Detalles importantes sobre este artículo"
              ></textarea>
            </div>
            <button className="btn-add" onClick={addAttireItem}>
              Agregar Artículo
            </button>
          </div>
          
          <div className="items-list">
            <h2>Lista de Prendas y Accesorios</h2>
            <div className="items-grid">
              {attireItems.map(item => (
                <div key={item.id} className={`item-card status-${item.status}`}>
                  <div className="item-header">
                    <h3>{getItemTypeName(item.type)}</h3>
                    <span className={`status ${item.status}`}>
                      {getStatusName(item.status)}
                    </span>
                  </div>
                  <p className="description">{item.description}</p>
                  <div className="item-details">
                    <p><strong>Proveedor:</strong> {item.vendor}</p>
                    <p><strong>Precio:</strong> ${item.price.toLocaleString()}</p>
                    <p><strong>Pagado:</strong> ${item.paid.toLocaleString()}</p>
                    {item.notes && <p><strong>Notas:</strong> {item.notes}</p>}
                  </div>
                  <div className="item-actions">
                    <select 
                      value={item.status}
                      onChange={(e) => updateItemStatus(item.id, e.target.value)}
                    >
                      <option value="pending">Pendiente</option>
                      <option value="measured">Medidas tomadas</option>
                      <option value="ordered">Pedido</option>
                      <option value="purchased">Comprado</option>
                      <option value="received">Recibido</option>
                    </select>
                    <div className="payment-input">
                      <label>Pagado:</label>
                      <input 
                        type="number" 
                        value={item.paid}
                        onChange={(e) => updatePayment(item.id, e.target.value)}
                        min="0"
                        max={item.price}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      
      {activeTab === 'budget' && (
        <div className="budget-section">
          <h2>Presupuesto de Vestuario</h2>
          
          <div className="budget-stats">
            <div className="stat-card">
              <h3>Presupuesto Total</h3>
              <p className="amount">
                ${attireItems.reduce((sum, item) => sum + item.price, 0).toLocaleString()}
              </p>
            </div>
            <div className="stat-card">
              <h3>Total Pagado</h3>
              <p className="amount paid">
                ${attireItems.reduce((sum, item) => sum + item.paid, 0).toLocaleString()}
              </p>
            </div>
            <div className="stat-card">
              <h3>Saldo Pendiente</h3>
              <p className="amount pending">
                ${attireItems.reduce((sum, item) => sum + (item.price - item.paid), 0).toLocaleString()}
              </p>
            </div>
          </div>
          
          <div className="budget-breakdown">
            <h3>Desglose por Categoría</h3>
            <table>
              <thead>
                <tr>
                  <th>Categoría</th>
                  <th>Presupuesto</th>
                  <th>Pagado</th>
                  <th>Pendiente</th>
                  <th>% Pagado</th>
                </tr>
              </thead>
              <tbody>
                {['vestido', 'traje', 'accesorio', 'zapatos', 'otro'].map(type => {
                  const typeItems = attireItems.filter(item => item.type === type);
                  if (typeItems.length === 0) return null;
                  
                  const total = typeItems.reduce((sum, item) => sum + item.price, 0);
                  const paid = typeItems.reduce((sum, item) => sum + item.paid, 0);
                  const pending = total - paid;
                  const percentPaid = (paid / total) * 100;
                  
                  return (
                    <tr key={type}>
                      <td>{getItemTypeName(type)}</td>
                      <td>${total.toLocaleString()}</td>
                      <td>${paid.toLocaleString()}</td>
                      <td>${pending.toLocaleString()}</td>
                      <td>
                        <div className="progress-container">
                          <div 
                            className="progress-bar" 
                            style={{ width: `${percentPaid}%` }}
                          ></div>
                          <span>{Math.round(percentPaid)}%</span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          
          <div className="payment-schedule">
            <h3>Próximos Pagos</h3>
            {attireItems
              .filter(item => item.paid < item.price)
              .sort((a, b) => (a.price - a.paid) - (b.price - b.paid))
              .map(item => (
                <div key={item.id} className="payment-card">
                  <h4>{item.description}</h4>
                  <p className="vendor">{item.vendor}</p>
                  <div className="payment-details">
                    <span className="pending-amount">
                      Pendiente: ${(item.price - item.paid).toLocaleString()}
                    </span>
                    <input 
                      type="number" 
                      value={item.paid}
                      onChange={(e) => updatePayment(item.id, e.target.value)}
                      min="0"
                      max={item.price}
                    />
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}

function getItemTypeName(type) {
  switch(type) {
    case 'vestido': return 'Vestido de Novia';
    case 'traje': return 'Traje de Novio';
    case 'accesorio': return 'Accesorio';
    case 'zapatos': return 'Zapatos';
    default: return 'Otro';
  }
}

function getStatusName(status) {
  switch(status) {
    case 'pending': return 'Pendiente';
    case 'measured': return 'Medidas Tomadas';
    case 'ordered': return 'Pedido';
    case 'purchased': return 'Comprado';
    case 'received': return 'Recibido';
    default: return status;
  }
}

function formatDateTime(date) {
  return moment(date).format('DD MMM YYYY, h:mm a');
}

function formatTime(date) {
  return moment(date).format('h:mm a');
}

export default Vestuario;