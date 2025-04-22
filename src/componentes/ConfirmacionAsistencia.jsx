import React, { useState } from 'react';
"../assets/scss/_03-Componentes/_ConfirmacionAsistencia.scss";

function ConfirmacionAsistencia() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    asistencia: 'si',
    acompanantes: 0,
    alergias: '',
    mensaje: ''
  });

  const [enviado, setEnviado] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí iría la lógica para enviar los datos
    console.log('Datos enviados:', formData);
    setEnviado(true);
  };

  if (enviado) {
    return (
      <div className="confirmacion-exitosa">
        <i className="bi bi-check-circle"></i>
        <h2>¡Confirmación Exitosa!</h2>
        <p>Gracias por confirmar tu asistencia. Nos vemos el 23 de Noviembre.</p>
      </div>
    );
  }

  return (
    <div className="confirmacion-asistencia">
      <h1>Confirmar Asistencia</h1>
      <p className="instrucciones">Por favor completa el formulario antes del 1 de Noviembre</p>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nombre Completo *</label>
          <input 
            type="text" 
            name="nombre" 
            value={formData.nombre} 
            onChange={handleChange} 
            required 
          />
        </div>
        
        <div className="form-group">
          <label>Email *</label>
          <input 
            type="email" 
            name="email" 
            value={formData.email} 
            onChange={handleChange} 
            required 
          />
        </div>
        
        <div className="form-group">
          <label>¿Asistirás? *</label>
          <div className="opciones-asistencia">
            <label>
              <input 
                type="radio" 
                name="asistencia" 
                value="si" 
                checked={formData.asistencia === 'si'} 
                onChange={handleChange} 
              />
              <span>Con alegría asistiré</span>
            </label>
            
            <label>
              <input 
                type="radio" 
                name="asistencia" 
                value="no" 
                checked={formData.asistencia === 'no'} 
                onChange={handleChange} 
              />
              <span>Lamentablemente no podré asistir</span>
            </label>
          </div>
        </div>
        
        {formData.asistencia === 'si' && (
          <>
            <div className="form-group">
              <label>Número de acompañantes</label>
              <select 
                name="acompanantes" 
                value={formData.acompanantes} 
                onChange={handleChange}
              >
                {[0, 1, 2, 3, 4].map(num => (
                  <option key={num} value={num}>{num}</option>
                ))}
              </select>
            </div>
            
            <div className="form-group">
              <label>Alergias o restricciones alimentarias</label>
              <input 
                type="text" 
                name="alergias" 
                value={formData.alergias} 
                onChange={handleChange} 
                placeholder="Ej: Vegetariano, celíaco, alergia a mariscos..." 
              />
            </div>
          </>
        )}
        
        <div className="form-group">
          <label>Mensaje para los novios (opcional)</label>
          <textarea 
            name="mensaje" 
            value={formData.mensaje} 
            onChange={handleChange} 
            rows="4"
          ></textarea>
        </div>
        
        <button type="submit" className="boton-confirmar">
          Confirmar Asistencia
        </button>
      </form>
    </div>
  );
}

export default ConfirmacionAsistencia;