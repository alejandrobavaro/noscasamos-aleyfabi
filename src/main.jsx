import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthProvider } from './context/SesionAuthContext';
import { ProbadorRopaProvider } from './context/ProbadorRopaContext'; // Cambiado de PersonalizarAvatarProvider

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <ProbadorRopaProvider> {/* Cambiado aquí */}
        <App />
      </ProbadorRopaProvider> {/* Cambiado aquí */}
    </AuthProvider>
  </React.StrictMode>
);