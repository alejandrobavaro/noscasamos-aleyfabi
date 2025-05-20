import React from 'react';
import { User, Phone } from 'react-feather';
import "../assets/scss/_03-Componentes/_PPublicoCabinaFotograficaGuestForm.scss";

const PPublicoCabinaFotograficaGuestForm = ({ guestData, onGuestDataChange, onContinue }) => {
  const handleChange = (e) => {
    onGuestDataChange({
      ...guestData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="guest-form-modal">
      <div className="guest-form-content">
        <h2 className="guest-form-title">¡Antes de comenzar!</h2>
        <p className="guest-form-subtitle">Por favor ingresa tus datos para compartir las fotos</p>
        
        <div className="guest-form-group">
          <label className="form-label">
            <User size={16} className="form-icon" /> 
            <span>Tu nombre</span>
          </label>
          <input
            type="text"
            name="name"
            value={guestData.name}
            onChange={handleChange}
            placeholder="Ej: María González"
            className="form-input"
          />
        </div>
        
        <div className="guest-form-group">
          <label className="form-label">
            <Phone size={16} className="form-icon" /> 
            <span>WhatsApp (opcional)</span>
          </label>
          <input
            type="tel"
            name="phone"
            value={guestData.phone}
            onChange={handleChange}
            placeholder="Ej: 11 2345-6789"
            className="form-input"
          />
        </div>
        
        <button 
          className="guest-form-submit"
          onClick={onContinue}
          disabled={!guestData.name}
        >
          Continuar
        </button>
      </div>
    </div>
  );
};

export default PPublicoCabinaFotograficaGuestForm;