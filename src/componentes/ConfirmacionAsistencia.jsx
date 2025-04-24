import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import invitadosData from '../../public/invitados.json';
import "../assets/scss/_03-Componentes/_ConfirmacionAsistencia.scss";

const ConfirmacionAsistencia = () => {
  // Configuración del slider de fotos
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true
  };

  // Estado inicial
  const [invitados, setInvitados] = useState([]);
  const [selectedGuest, setSelectedGuest] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [filter, setFilter] = useState('todos');
  const [enviado, setEnviado] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [animation, setAnimation] = useState('');

  // Form data
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    asistencia: 'si',
    acompanantes: 0,
    alergias: '',
    mensaje: '',
    grupo: ''
  });

  // Cargar invitados al montar el componente
  useEffect(() => {
    const allInvitados = invitadosData.grupos.flatMap(grupo => 
      grupo.invitados.map(invitado => ({
        ...invitado,
        grupo: grupo.nombre,
        confirmado: false,
        asistencia: null,
        acompanantes: 0,
        alergias: '',
        mensaje: ''
      }))
    );
    setInvitados(allInvitados);
  }, []);

  // Buscar sugerencias
  useEffect(() => {
    if (searchTerm.length > 2) {
      const results = invitados.filter(invitado =>
        invitado.nombre.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSuggestions(results);
    } else {
      setSuggestions([]);
    }
  }, [searchTerm, invitados]);

  // Seleccionar invitado
  const selectGuest = (invitado) => {
    setSelectedGuest(invitado);
    setFormData({
      nombre: invitado.nombre,
      email: invitado.email || '',
      asistencia: invitado.asistencia || 'si',
      acompanantes: invitado.acompanantes || 0,
      alergias: invitado.alergias || '',
      mensaje: invitado.mensaje || '',
      grupo: invitado.grupo
    });
    setSuggestions([]);
    setSearchTerm(invitado.nombre);
    setShowForm(true);
    setAnimation('animate__fadeInUp');
  };

  // Manejar cambios en el formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Manejar envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    setAnimation('animate__pulse');
    
    setTimeout(() => {
      const updatedInvitados = invitados.map(invitado => {
        if (invitado.nombre === formData.nombre) {
          return {
            ...invitado,
            confirmado: true,
            asistencia: formData.asistencia,
            acompanantes: formData.asistencia === 'si' ? formData.acompanantes : 0,
            alergias: formData.alergias,
            mensaje: formData.mensaje
          };
        }
        return invitado;
      });

      setInvitados(updatedInvitados);
      setEnviado(true);
      setAnimation('');
      
      // Aquí podrías agregar el código para enviar los datos a un backend
      console.log('Datos actualizados:', updatedInvitados);
    }, 500);
  };

  // Filtrar invitados
  const filteredGuests = invitados.filter(invitado => {
    if (filter === 'todos') return true;
    if (filter === 'confirmados') return invitado.confirmado;
    if (filter === 'pendientes') return !invitado.confirmado;
    return invitado.grupo === filter;
  });

  // Estadísticas
  const totalInvitados = invitados.length;
  const confirmados = invitados.filter(i => i.confirmado && i.asistencia === 'si').length;
  const acompanantes = invitados.reduce((sum, i) => sum + (i.confirmado ? parseInt(i.acompanantes) : 0), 0);
  const totalAsistentes = confirmados + acompanantes;
  const pendientes = totalInvitados - invitados.filter(i => i.confirmado).length;

  // Resetear formulario
  const resetForm = () => {
    setEnviado(false);
    setFormData({
      nombre: '',
      email: '',
      asistencia: 'si',
      acompanantes: 0,
      alergias: '',
      mensaje: '',
      grupo: ''
    });
    setSelectedGuest(null);
    setSearchTerm('');
    setShowForm(false);
  };

  // Fotos de los novios (deberías reemplazar con tus propias imágenes)
  const fotosNovios = [
    { id: 1, src: "/img/05-img-costados-larga/1a.jpg", alt: 'Fabiola y Alejandro' },
    { id: 2, src: "/img/05-img-costados-larga/2a.jpg", alt: 'Los novios' },
    { id: 3, src: "/img/05-img-costados-larga/3a.jpg", alt: 'Momento especial' },
    { id: 4, src:  "/img/05-img-costados-larga/4a.jpg", alt: 'Juntos' }
  ];

  if (enviado) {
    return (
      <div className={`confirmacion-exitosa animate__animated animate__fadeIn`}>
        <div className="icono-exito animate__animated animate__bounceIn">✓</div>
        <h2>¡Confirmación Exitosa!</h2>
        <p>Gracias {formData.nombre} por confirmar tu asistencia.</p>
        <p>Nos vemos el 23 de Noviembre de 2025</p>
        
        <div className="resumen-asistencia">
          <div className="estadistica">
            <span className="numero">{confirmados}</span>
            <span className="texto">Invitados confirmados</span>
          </div>
          <div className="estadistica">
            <span className="numero">{totalAsistentes}</span>
            <span className="texto">Total asistentes</span>
          </div>
          <div className="estadistica">
            <span className="numero">{pendientes}</span>
            <span className="texto">Pendientes</span>
          </div>
        </div>
        
        <button onClick={resetForm} className="boton-volver">
          Volver al listado
        </button>
      </div>
    );
  }

  return (
    <div className="confirmacion-asistencia">
      {/* Slider de fotos de los novios */}
      <div className="slider-novios">
        <Slider {...sliderSettings}>
          {fotosNovios.map(foto => (
            <div key={foto.id} className="slide-item">
              <img src={foto.src} alt={foto.alt} />
              <div className="slide-caption">
                <h3>Fabiola & Alejandro</h3>
                <p>23.11.2025</p>
              </div>
            </div>
          ))}
        </Slider>
      </div>

      <div className="contenedor-principal">
        {/* Sección de estadísticas */}
        <div className="estadisticas-container">
          <div className="estadistica-card">
            <div className="estadistica-icon">👰</div>
            <div className="estadistica-texto">
              <span className="numero">{totalInvitados}</span>
              <span className="label">Invitados</span>
            </div>
          </div>
          <div className="estadistica-card confirmados">
            <div className="estadistica-icon">✓</div>
            <div className="estadistica-texto">
              <span className="numero">{confirmados}</span>
              <span className="label">Confirmados</span>
            </div>
          </div>
          <div className="estadistica-card acompanantes">
            <div className="estadistica-icon">👥</div>
            <div className="estadistica-texto">
              <span className="numero">{acompanantes}</span>
              <span className="label">Acompañantes</span>
            </div>
          </div>
          <div className="estadistica-card pendientes">
            <div className="estadistica-icon">?</div>
            <div className="estadistica-texto">
              <span className="numero">{pendientes}</span>
              <span className="label">Pendientes</span>
            </div>
          </div>
        </div>

        <div className="contenedor-secundario">
          {/* Formulario de confirmación */}
          <div className={`formulario-container ${showForm ? 'visible' : ''} animate__animated ${animation}`}>
            <h2>Confirmar Asistencia</h2>
            <p className="instrucciones">Por favor completa tus datos antes del 1 de Noviembre</p>
            
            <div className="buscador-invitados">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setSelectedGuest(null);
                }}
                placeholder="Busca tu nombre..."
                className="input-busqueda"
              />
              {suggestions.length > 0 && (
                <ul className="sugerencias">
                  {suggestions.map((invitado) => (
                    <li key={invitado.id} onClick={() => selectGuest(invitado)}>
                      {invitado.nombre} <span>({invitado.grupo})</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Nombre Completo *</label>
                <input 
                  type="text" 
                  name="nombre" 
                  value={formData.nombre} 
                  onChange={handleChange} 
                  required 
                  disabled={selectedGuest}
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
                  <label className={`opcion ${formData.asistencia === 'si' ? 'activa' : ''}`}>
                    <input 
                      type="radio" 
                      name="asistencia" 
                      value="si" 
                      checked={formData.asistencia === 'si'} 
                      onChange={handleChange} 
                    />
                    <span>¡Sí, estaré allí!</span>
                  </label>
                  
                  <label className={`opcion ${formData.asistencia === 'no' ? 'activa' : ''}`}>
                    <input 
                      type="radio" 
                      name="asistencia" 
                      value="no" 
                      checked={formData.asistencia === 'no'} 
                      onChange={handleChange} 
                    />
                    <span>No podré asistir</span>
                  </label>
                </div>
              </div>
              
              {formData.asistencia === 'si' && (
                <>
                  <div className="form-group">
                    <label>Número de acompañantes</label>
                    <div className="select-wrapper">
                      <select 
                        name="acompanantes" 
                        value={formData.acompanantes} 
                        onChange={handleChange}
                      >
                        {[0, 1, 2, 3, 4].map(num => (
                          <option key={num} value={num}>{num} acompañante{num !== 1 ? 's' : ''}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  
                  <div className="form-group">
                    <label>Alergias o restricciones alimentarias</label>
                    <div className="checkbox-group">
                      {['Ninguna', 'Vegetariano', 'Vegano', 'Celíaco', 'Alergia a mariscos', 'Otra'].map(opcion => (
                        <label key={opcion} className="checkbox-option">
                          <input
                            type="checkbox"
                            checked={formData.alergias.includes(opcion)}
                            onChange={() => {
                              const nuevasAlergias = formData.alergias.includes(opcion)
                                ? formData.alergias.filter(a => a !== opcion)
                                : [...formData.alergias.split(',').filter(a => a), opcion].join(',');
                              setFormData({...formData, alergias: nuevasAlergias});
                            }}
                          />
                          <span>{opcion}</span>
                        </label>
                      ))}
                    </div>
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
                  placeholder="Escribe un mensaje especial para Fabiola y Alejandro..."
                ></textarea>
              </div>
              
              <button type="submit" className="boton-confirmar">
                {selectedGuest?.confirmado ? 'Actualizar Confirmación' : 'Confirmar Asistencia'}
              </button>
            </form>
          </div>

          {/* Listado de invitados */}
          <div className="listado-container">
            <div className="filtros">
              <h2>Lista de Invitados</h2>
              <div className="select-wrapper">
                <select value={filter} onChange={(e) => setFilter(e.target.value)}>
                  <option value="todos">Todos los invitados</option>
                  <option value="confirmados">Confirmados</option>
                  <option value="pendientes">Pendientes</option>
                  {invitadosData.grupos.map(grupo => (
                    <option key={grupo.nombre} value={grupo.nombre}>{grupo.nombre}</option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="lista-invitados-compacta">
              {filteredGuests.length > 0 ? (
                <ul className="lista-compacta">
                  {filteredGuests.map(invitado => (
                    <li 
                      key={invitado.id} 
                      className={`invitado-item ${invitado.confirmado ? 'confirmado' : 'pendiente'} ${selectedGuest?.id === invitado.id ? 'seleccionado' : ''}`}
                      onClick={() => selectGuest(invitado)}
                    >
                      <div className="nombre-grupo-container">
                        <span className="nombre-invitado">{invitado.nombre}</span>
                        <span className="separador"> - </span>
                        <span className="grupo-invitado">{invitado.grupo}</span>
                      </div>
                      {invitado.confirmado && (
                        <span className={`estado-asistencia ${invitado.asistencia === 'si' ? 'asiste' : 'no-asiste'}`}>
                          {invitado.asistencia === 'si' ? 
                            `✓${invitado.acompanantes > 0 ? ` +${invitado.acompanantes}` : ''}` : 
                            '✗'}
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="sin-resultados">
                  <p>No hay invitados que coincidan con tu búsqueda</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmacionAsistencia;