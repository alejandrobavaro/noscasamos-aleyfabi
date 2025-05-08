import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthProvider } from './context/SesionAuthContext';
import { PersonalizarAvatarProvider } from './context/PersonalizarAvatarContext'; 

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <PersonalizarAvatarProvider>
        <App />
      </PersonalizarAvatarProvider>
    </AuthProvider>
  </React.StrictMode>
);