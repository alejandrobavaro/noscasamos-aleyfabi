import React from 'react';
import "../assets/scss/_03-Componentes/_PPublicoCabinaFotograficaEffects.scss";

const EFFECTS = {
  confetti: { name: 'Confeti', colors: ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff'] },
  petals: { name: 'Pétalos', colors: ['#ff69b4', '#ff1493', '#db7093', '#ffb6c1'] }
};

const ConfettiEffect = () => (
  <div className="effects-confetti-container">
    {[...Array(80)].map((_, i) => {
      const style = {
        left: `${Math.random() * 100}%`,
        animationDuration: `${Math.random() * 3 + 2}s`,
        backgroundColor: EFFECTS.confetti.colors[Math.floor(Math.random() * EFFECTS.confetti.colors.length)],
        width: `${Math.random() * 8 + 4}px`,
        height: `${Math.random() * 8 + 4}px`,
        animationDelay: `${Math.random() * 0.5}s`
      };
      return <div key={`confetti-${i}`} className="effects-confetti-piece" style={style} />;
    })}
  </div>
);

const PetalsEffect = () => (
  <div className="effects-petals-container">
    {[...Array(25)].map((_, i) => {
      const style = {
        left: `${Math.random() * 100}%`,
        animationDuration: `${Math.random() * 5 + 3}s`,
        color: EFFECTS.petals.colors[Math.floor(Math.random() * EFFECTS.petals.colors.length)],
        fontSize: `${Math.random() * 18 + 12}px`,
        animationDelay: `${Math.random() * 2}s`
      };
      return (
        <div key={`petal-${i}`} className="effects-petal" style={style}>
          {Math.random() > 0.5 ? '🌸' : '🌺'}
        </div>
      );
    })}
  </div>
);

const PPublicoCabinaFotograficaEffects = ({ effect }) => {
  if (!effect) return null;

  return (
    <div className="effects-root">
      {effect === 'confetti' && <ConfettiEffect />}
      {effect === 'petals' && <PetalsEffect />}
    </div>
  );
};

export default PPublicoCabinaFotograficaEffects;