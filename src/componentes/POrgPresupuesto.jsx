import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { motion, AnimatePresence } from 'framer-motion';
import "../assets/scss/_03-Componentes/_POrgPresupuesto.scss";

ChartJS.register(ArcElement, Tooltip, Legend);

const budgetData = {
  total: 50000,
  categories: [
    { 
      id: 'salon', 
      name: 'Salón', 
      budget: 15000, 
      spent: 12000,
      description: 'Alquiler del salón para ceremonia y recepción',
      notes: 'Incluye decoración básica y mobiliario',
      vendor: 'Hacienda de los Sueños'
    },
    { 
      id: 'catering', 
      name: 'Catering', 
      budget: 10000, 
      spent: 8500,
      description: 'Servicio de comida y bebidas para 100 invitados',
      notes: 'Menú degustación con opción vegetariana',
      vendor: 'Sabores Elegantes'
    },
    { 
      id: 'vestuario', 
      name: 'Vestuario', 
      budget: 5000, 
      spent: 4500,
      description: 'Vestido de novia, traje del novio y accesorios',
      notes: 'Incluye 3 ajustes y limpieza post-boda',
      vendor: 'Boutique de Novias'
    },
    { 
      id: 'fotografia', 
      name: 'Fotografía', 
      budget: 6000, 
      spent: 6000,
      description: 'Servicio fotográfico completo (10 horas)',
      notes: 'Incluye álbum físico y digital con 300 fotos',
      vendor: 'Memorias Eternas'
    },
    { 
      id: 'decoracion', 
      name: 'Decoración', 
      budget: 4000, 
      spent: 3200,
      description: 'Decoración floral y elementos adicionales',
      notes: 'Centros de mesa, arco floral y pasillo',
      vendor: 'Estilo Floral'
    },
    { 
      id: 'invitaciones', 
      name: 'Invitaciones', 
      budget: 2000, 
      spent: 1800,
      description: 'Diseño, impresión y envío de invitaciones',
      notes: 'Incluye sobres personalizados y tarjetas RSVP',
      vendor: 'Papelería Elegante'
    },
    { 
      id: 'musica', 
      name: 'Música', 
      budget: 3000, 
      spent: 2500,
      description: 'DJ y grupo musical para la recepción',
      notes: '4 horas de música en vivo + 2 horas de DJ',
      vendor: 'Sonido Perfecto'
    },
    { 
      id: 'otros', 
      name: 'Otros', 
      budget: 5000, 
      spent: 3500,
      description: 'Gastos varios y contingentes',
      notes: 'Transporte, POrgRegalos para invitados, etc.',
      vendor: 'Varios'
    },
  ],
  payments: [
    { id: 1, category: 'salon', amount: 5000, date: '2024-03-15', method: 'Transferencia', notes: 'Depósito de reserva' },
    { id: 2, category: 'catering', amount: 3000, date: '2024-04-10', method: 'Tarjeta', notes: 'Anticipo 30%' },
    { id: 3, category: 'vestuario', amount: 2000, date: '2024-05-22', method: 'Efectivo', notes: 'Pago inicial vestido' },
  ]
};

function POrgPresupuesto() {
  const [activeCategory, setActiveCategory] = useState(null);
  const [notes, setNotes] = useState({});
  const [view, setView] = useState('chart');
  const [newPayment, setNewPayment] = useState({
    category: '',
    amount: '',
    date: '',
    method: 'Transferencia',
    notes: ''
  });

  useEffect(() => {
    const initialNotes = {};
    budgetData.categories.forEach(cat => {
      initialNotes[cat.id] = cat.notes || '';
    });
    setNotes(initialNotes);
  }, []);

  const totalSpent = budgetData.categories.reduce((sum, cat) => sum + cat.spent, 0);
  const remainingBudget = budgetData.total - totalSpent;

  const handleSaveNotes = (categoryId) => {
    console.log(`Notas guardadas para ${categoryId}:`, notes[categoryId]);
  };

  const handleAddPayment = () => {
    if (!newPayment.category || !newPayment.amount || !newPayment.date) return;
    console.log('Nuevo pago agregado:', newPayment);
    setNewPayment({
      category: '',
      amount: '',
      date: '',
      method: 'Transferencia',
      notes: ''
    });
  };

  const chartData = {
    labels: budgetData.categories.map(cat => cat.name),
    datasets: [
      {
        data: budgetData.categories.map(cat => cat.spent),
        backgroundColor: [
          '#7A4F50', '#8C5E3D', '#C2A78D', '#5A2D2D',
          '#9C6F6F', '#A78D7E', '#D4AF37', '#B8860B'
        ],
        borderColor: '#FFF9F5',
        borderWidth: 2,
      }
    ]
  };

  const chartOptions = {
    plugins: {
      legend: {
        position: 'right',
        labels: {
          font: {
            family: 'Cormorant Garamond',
            size: 14
          },
          color: '#5A2D2D'
        }
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            const label = context.label || '';
            const value = context.raw || 0;
            const percentage = Math.round((value / totalSpent) * 100);
            return `${label}: $${value.toLocaleString()} (${percentage}%)`;
          }
        }
      }
    },
    cutout: '60%',
    maintainAspectRatio: false
  };

  return (
    <div className="pantalla-presupuesto">
      <div className="contenedor-presupuesto">
        {/* Encabezado */}
        <div className="encabezado-boda">
          <h1>Presupuesto de la Boda</h1>
     
        </div>

        {/* Resumen */}
        <div className="resumen-presupuesto">
          <div className="estadistica">
            <div className="icono-titulo">
              <i className="bi bi-wallet2"></i>
              <h3>Presupuesto Total</h3>
            </div>
            <p className="valor">${budgetData.total.toLocaleString()}</p>
            <p className="meta">Para 100 invitados</p>
          </div>
          
          <div className="estadistica">
            <div className="icono-titulo">
              <i className="bi bi-currency-dollar"></i>
              <h3>Gastado</h3>
            </div>
            <p className="valor">${totalSpent.toLocaleString()}</p>
            <p className="meta">{Math.round((totalSpent / budgetData.total) * 100)}% del total</p>
          </div>
          
          <div className={`estadistica ${remainingBudget < 0 ? 'sobrepasado' : ''}`}>
            <div className="icono-titulo">
              <i className="bi bi-piggy-bank"></i>
              <h3>Restante</h3>
            </div>
            <p className="valor">${Math.abs(remainingBudget).toLocaleString()}</p>
            <p className="meta">
              {remainingBudget >= 0 ? 
                `${Math.round((remainingBudget / budgetData.total) * 100)}% disponible` : 
                'Ajusta tu presupuesto'}
            </p>
          </div>
        </div>

        {/* Toggle de vista */}
        <div className="toggle-vista">
          <button 
            className={`toggle-btn ${view === 'chart' ? 'activo' : ''}`}
            onClick={() => setView('chart')}
          >
            <i className="bi bi-pie-chart"></i> Vista Gráfica
          </button>
          <button 
            className={`toggle-btn ${view === 'table' ? 'activo' : ''}`}
            onClick={() => setView('table')}
          >
            <i className="bi bi-table"></i> Vista Tabular
          </button>
        </div>

        {/* Contenido principal */}
        <AnimatePresence mode="wait">
          {view === 'chart' ? (
            <motion.div
              key="chart-view"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className="seccion-grafico"
            >
              <h3>
                <i className="bi bi-pie-chart-fill"></i>
                Distribución de Gastos
              </h3>
              <div className="grafico-container">
                <Pie data={chartData} options={chartOptions} />
              </div>
              <div className="leyenda">
                {budgetData.categories.map((category, index) => {
                  const percent = Math.round((category.spent / totalSpent) * 100);
                  return (
                    <div key={category.id} className="item-leyenda">
                      <span 
                        className="color" 
                        style={{ 
                          backgroundColor: chartData.datasets[0].backgroundColor[index] 
                        }}
                      ></span>
                      <span className="nombre">{category.name}</span>
                      <span className="porcentaje">{percent}%</span>
                      <span className="monto">${category.spent.toLocaleString()}</span>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="table-view"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="seccion-tabla"
            >
              <h3>
                <i className="bi bi-list-check"></i>
                Detalle por Categoría
              </h3>
              <div className="tabla-container">
                <table>
                  <thead>
                    <tr>
                      <th>Categoría</th>
                      <th>Presupuesto</th>
                      <th>Gastado</th>
                      <th>Restante</th>
                      <th>% Usado</th>
                    </tr>
                  </thead>
                  <tbody>
                    {budgetData.categories.map(category => {
                      const remaining = category.budget - category.spent;
                      const percentUsed = (category.spent / category.budget) * 100;
                      
                      return (
                        <motion.tr 
                          key={category.id}
                          className={`${activeCategory === category.id ? 'activo' : ''} ${remaining < 0 ? 'sobrepasado' : ''}`}
                          onClick={() => setActiveCategory(activeCategory === category.id ? null : category.id)}
                          whileHover={{ scale: 1.01 }}
                          transition={{ type: "spring", stiffness: 500, damping: 10 }}
                        >
                          <td>
                            <i className={`bi bi-${getCategoryIcon(category.id)}`}></i>
                            {category.name}
                          </td>
                          <td>${category.budget.toLocaleString()}</td>
                          <td>${category.spent.toLocaleString()}</td>
                          <td>
                            ${Math.abs(remaining).toLocaleString()}
                            {remaining < 0 && <i className="bi bi-exclamation-triangle"></i>}
                          </td>
                          <td>
                            <div className="barra-progreso">
                              <div 
                                className="progreso" 
                                style={{ 
                                  width: `${Math.min(percentUsed, 100)}%`,
                                  backgroundColor: percentUsed > 100 ? '#8f5a5a' : '#7A4F50'
                                }}
                              ></div>
                              <span>{Math.round(percentUsed)}%</span>
                            </div>
                          </td>
                        </motion.tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Sección de pagos */}
        <div className="seccion-pagos">
          <h3>
            <i className="bi bi-cash-stack"></i>
            Registro de Pagos
          </h3>
          
          <div className="formulario-pago">
            <div className="grupo-formulario">
              <label>Categoría:</label>
              <select 
                value={newPayment.category}
                onChange={(e) => setNewPayment({...newPayment, category: e.target.value})}
              >
                <option value="">Seleccionar categoría</option>
                {budgetData.categories.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>
            
            <div className="grupo-formulario">
              <label>Monto:</label>
              <input 
                type="number" 
                placeholder="Ej: 5000" 
                value={newPayment.amount}
                onChange={(e) => setNewPayment({...newPayment, amount: e.target.value})}
              />
            </div>
            
            <div className="grupo-formulario">
              <label>Fecha:</label>
              <input 
                type="date" 
                value={newPayment.date}
                onChange={(e) => setNewPayment({...newPayment, date: e.target.value})}
              />
            </div>
            
            <div className="grupo-formulario">
              <label>Método:</label>
              <select 
                value={newPayment.method}
                onChange={(e) => setNewPayment({...newPayment, method: e.target.value})}
              >
                <option value="Transferencia">Transferencia</option>
                <option value="Tarjeta">Tarjeta</option>
                <option value="Efectivo">Efectivo</option>
                <option value="Cheque">Cheque</option>
              </select>
            </div>
            
            <button className="btn-agregar" onClick={handleAddPayment}>
              <i className="bi bi-plus-circle"></i> Agregar Pago
            </button>
          </div>
          
          <div className="lista-pagos">
            <h4>Historial de Pagos Recientes</h4>
            {budgetData.payments.length > 0 ? (
              <ul>
                {budgetData.payments.map(payment => (
                  <li key={payment.id}>
                    <div className="info-pago">
                      <span className="categoria">
                        {budgetData.categories.find(c => c.id === payment.category)?.name}
                      </span>
                      <span className="monto">${payment.amount.toLocaleString()}</span>
                    </div>
                    <div className="meta-pago">
                      <span className="fecha">{formatDate(payment.date)}</span>
                      <span className="metodo">{payment.method}</span>
                    </div>
                    {payment.notes && <div className="notas">{payment.notes}</div>}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="sin-pagos">No hay pagos registrados aún</p>
            )}
          </div>
        </div>

        {/* Detalles de categoría */}
        {activeCategory && (
          <motion.div 
            className="detalles-categoria"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h3>
              <i className="bi bi-info-circle"></i>
              Detalles de {budgetData.categories.find(c => c.id === activeCategory).name}
            </h3>
            
            <div className="contenido-detalles">
              <div className="info-proveedor">
                <h4>Proveedor:</h4>
                <p>{budgetData.categories.find(c => c.id === activeCategory).vendor}</p>
              </div>
              
              <div className="descripcion">
                <h4>Descripción:</h4>
                <p>{budgetData.categories.find(c => c.id === activeCategory).description}</p>
              </div>
              
              <div className="notas-seccion">
                <h4>Tus Notas:</h4>
                <textarea 
                  placeholder="Agrega notas o detalles sobre este gasto..."
                  value={notes[activeCategory] || ''}
                  onChange={(e) => setNotes({...notes, [activeCategory]: e.target.value})}
                ></textarea>
                <button 
                  className="btn-guardar"
                  onClick={() => handleSaveNotes(activeCategory)}
                >
                  <i className="bi bi-save"></i> Guardar Notas
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

function getCategoryIcon(categoryId) {
  const icons = {
    'salon': 'building',
    'catering': 'cup-hot',
    'vestuario': 'person-hearts',
    'fotografia': 'camera',
    'decoracion': 'flower1',
    'invitaciones': 'envelope',
    'musica': 'music-note-beamed',
    'otros': 'three-dots'
  };
  return icons[categoryId] || 'tag';
}

function formatDate(dateString) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('es-ES', options);
}

export default POrgPresupuesto;