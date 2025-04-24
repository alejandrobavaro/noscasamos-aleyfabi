import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { motion, AnimatePresence } from 'framer-motion';
import "../assets/scss/_03-Componentes/_Presupuesto.scss";

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
      notes: 'Transporte, regalos para invitados, etc.',
      vendor: 'Varios'
    },
  ],
  payments: [
    { id: 1, category: 'salon', amount: 5000, date: '2024-03-15', method: 'Transferencia', notes: 'Depósito de reserva' },
    { id: 2, category: 'catering', amount: 3000, date: '2024-04-10', method: 'Tarjeta', notes: 'Anticipo 30%' },
    { id: 3, category: 'vestuario', amount: 2000, date: '2024-05-22', method: 'Efectivo', notes: 'Pago inicial vestido' },
  ]
};

function Presupuesto() {
  const [activeCategory, setActiveCategory] = useState(null);
  const [notes, setNotes] = useState({});
  const [view, setView] = useState('chart'); // 'chart' or 'table'
  const [newPayment, setNewPayment] = useState({
    category: '',
    amount: '',
    date: '',
    method: 'Transferencia',
    notes: ''
  });

  useEffect(() => {
    // Inicializar notas desde los datos
    const initialNotes = {};
    budgetData.categories.forEach(cat => {
      initialNotes[cat.id] = cat.notes || '';
    });
    setNotes(initialNotes);
  }, []);

  const totalSpent = budgetData.categories.reduce((sum, cat) => sum + cat.spent, 0);
  const remainingBudget = budgetData.total - totalSpent;

  const handleSaveNotes = (categoryId) => {
    // Aquí normalmente harías una llamada API para guardar las notas
    console.log(`Notas guardadas para ${categoryId}:`, notes[categoryId]);
  };

  const handleAddPayment = () => {
    // Validación básica
    if (!newPayment.category || !newPayment.amount || !newPayment.date) return;
    
    // Aquí normalmente harías una llamada API para agregar el pago
    console.log('Nuevo pago agregado:', newPayment);
    
    // Limpiar formulario
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
          '#8B4513', '#A0522D', '#D2B48C', '#CD853F',
          '#DAA520', '#B8860B', '#F4A460', '#DEB887'
        ],
        borderColor: '#FFF8E7',
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
          color: '#3A2E29'
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
    <div className="presupuesto-container vintage-design">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="header-section"
      >
        <h1>Presupuesto de la Boda</h1>
        <p className="subtitle">Administración y seguimiento de todos los gastos</p>
        <div className="divider floral"></div>
      </motion.div>
      
      <div className="resumen-presupuesto">
        <motion.div 
          className="estadistica-presupuesto total"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <h3>
            <i className="bi bi-wallet2"></i>
            Presupuesto Total
          </h3>
          <p className="monto">${budgetData.total.toLocaleString()}</p>
          <p className="meta">Para 100 invitados</p>
        </motion.div>
        
        <motion.div 
          className="estadistica-presupuesto gastado"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h3>
            <i className="bi bi-currency-dollar"></i>
            Gastado
          </h3>
          <p className="monto gastado">${totalSpent.toLocaleString()}</p>
          <p className="meta">{Math.round((totalSpent / budgetData.total) * 100)}% del total</p>
        </motion.div>
        
        <motion.div 
          className={`estadistica-presupuesto restante ${remainingBudget < 0 ? 'sobrepasado' : ''}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <h3>
            <i className="bi bi-piggy-bank"></i>
            Restante
          </h3>
          <p className={`monto ${remainingBudget < 0 ? 'sobrepasado' : 'restante'}`}>
            ${Math.abs(remainingBudget).toLocaleString()}
            {remainingBudget < 0 && <span className="warning-text"> (Sobrepasado)</span>}
          </p>
          <p className="meta">
            {remainingBudget >= 0 ? `${Math.round((remainingBudget / budgetData.total) * 100)}% disponible` : 'Ajusta tu presupuesto'}
          </p>
        </motion.div>
      </div>
      
      <div className="view-toggle">
        <button 
          className={`toggle-btn ${view === 'chart' ? 'active' : ''}`}
          onClick={() => setView('chart')}
        >
          <i className="bi bi-pie-chart"></i> Vista Gráfica
        </button>
        <button 
          className={`toggle-btn ${view === 'table' ? 'active' : ''}`}
          onClick={() => setView('table')}
        >
          <i className="bi bi-table"></i> Vista Tabular
        </button>
      </div>
      
      <AnimatePresence mode="wait">
        {view === 'chart' ? (
          <motion.div
            key="chart-view"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
            className="grafico-distribucion"
          >
            <h2>
              <i className="bi bi-pie-chart-fill"></i>
              Distribución de Gastos
            </h2>
            <div className="chart-container">
              <Pie data={chartData} options={chartOptions} />
            </div>
            <div className="chart-legend">
              {budgetData.categories.map(category => {
                const percent = Math.round((category.spent / totalSpent) * 100);
                return (
                  <div key={category.id} className="legend-item">
                    <span className="color-box" style={{ backgroundColor: chartData.datasets[0].backgroundColor[budgetData.categories.indexOf(category)] }}></span>
                    <span className="category-name">{category.name}</span>
                    <span className="category-percent">{percent}%</span>
                    <span className="category-amount">${category.spent.toLocaleString()}</span>
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
            className="detalle-categorias"
          >
            <h2>
              <i className="bi bi-list-check"></i>
              Detalle por Categoría
            </h2>
            <div className="table-container">
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
                        className={`${activeCategory === category.id ? 'active' : ''} ${remaining < 0 ? 'over-budget' : ''}`}
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
                        <td className={remaining < 0 ? 'negative' : ''}>
                          ${Math.abs(remaining).toLocaleString()}
                          {remaining < 0 && <span className="warning-icon"><i className="bi bi-exclamation-triangle"></i></span>}
                        </td>
                        <td>
                          <div className="progress-container">
                            <div 
                              className="progress-bar" 
                              style={{ 
                                width: `${Math.min(percentUsed, 100)}%`, 
                                backgroundColor: percentUsed > 100 ? '#8B0000' : '#8B4513' 
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
      
      <div className="payment-section">
        <h2>
          <i className="bi bi-cash-stack"></i>
          Registro de Pagos
        </h2>
        <div className="payment-form">
          <div className="form-group">
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
          <div className="form-group">
            <label>Monto:</label>
            <input 
              type="number" 
              placeholder="Ej: 5000" 
              value={newPayment.amount}
              onChange={(e) => setNewPayment({...newPayment, amount: e.target.value})}
            />
          </div>
          <div className="form-group">
            <label>Fecha:</label>
            <input 
              type="date" 
              value={newPayment.date}
              onChange={(e) => setNewPayment({...newPayment, date: e.target.value})}
            />
          </div>
          <div className="form-group">
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
          <button className="btn-add" onClick={handleAddPayment}>
            <i className="bi bi-plus-circle"></i> Agregar Pago
          </button>
        </div>
        
        <div className="payment-list">
          <h3>Historial de Pagos Recientes</h3>
          {budgetData.payments.length > 0 ? (
            <ul>
              {budgetData.payments.map(payment => (
                <li key={payment.id}>
                  <div className="payment-info">
                    <span className="payment-category">
                      {budgetData.categories.find(c => c.id === payment.category)?.name}
                    </span>
                    <span className="payment-amount">${payment.amount.toLocaleString()}</span>
                  </div>
                  <div className="payment-meta">
                    <span className="payment-date">{formatDate(payment.date)}</span>
                    <span className="payment-method">{payment.method}</span>
                  </div>
                  {payment.notes && <div className="payment-notes">{payment.notes}</div>}
                </li>
              ))}
            </ul>
          ) : (
            <p className="no-payments">No hay pagos registrados aún</p>
          )}
        </div>
      </div>
      
      {activeCategory && (
        <motion.div 
          className="category-details"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          <h3>
            <i className="bi bi-info-circle"></i>
            Detalles de {budgetData.categories.find(c => c.id === activeCategory).name}
          </h3>
          <div className="details-content">
            <div className="vendor-info">
              <h4>Proveedor:</h4>
              <p>{budgetData.categories.find(c => c.id === activeCategory).vendor}</p>
            </div>
            <div className="description">
              <h4>Descripción:</h4>
              <p>{budgetData.categories.find(c => c.id === activeCategory).description}</p>
            </div>
            <div className="notes-section">
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
  );
}

// Función auxiliar para obtener iconos por categoría
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

// Función auxiliar para formatear fecha
function formatDate(dateString) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('es-ES', options);
}

export default Presupuesto;