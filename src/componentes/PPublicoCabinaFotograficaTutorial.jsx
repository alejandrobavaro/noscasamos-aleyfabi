import React from 'react';
import "../assets/scss/_03-Componentes/_PPublicoCabinaFotograficaTutorial.scss";

const TUTORIAL_STEPS = [
  {
    title: "Permite el acceso a la cámara",
    description: "Cuando se te solicite, permite que la aplicación use tu cámara."
  },
  {
    title: "Selecciona un filtro divertido",
    description: "Elige entre filtros y máscaras para tus fotos."
  },
  {
    title: "Presiona el botón para fotos",
    description: "Se tomarán 3 fotos automáticamente."
  },
  {
    title: "¡Sonríe y diviértete!",
    description: "Las fotos se guardarán automáticamente."
  }
];

const PPublicoCabinaFotograficaTutorial = ({ onStart }) => {
  return (
    <div className="tutorial-wrapper">
      <div className="tutorial-card">
        <h2 className="tutorial-title">¿Cómo usar la cabina fotográfica?</h2>
        <div className="steps-container">
          {TUTORIAL_STEPS.map((step, index) => (
            <div key={index} className="step-item">
              <div className="step-badge">{index + 1}</div>
              <div className="step-info">
                <h3 className="step-title">{step.title}</h3>
                <p className="step-description">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
        <button className="start-btn" onClick={onStart}>
          Comenzar
        </button>
      </div>
    </div>
  );
};

export default PPublicoCabinaFotograficaTutorial;