import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthProvider } from './context/SesionAuthContext';
import { AplicaPersonaliza3CapasPersonalizacionProvider } from './context/AplicaPersonaliza3CapasPersonalizacionContext'; 


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <AplicaPersonaliza3CapasPersonalizacionProvider> 

        <App />
      
      </AplicaPersonaliza3CapasPersonalizacionProvider>
    </AuthProvider>
  </React.StrictMode>
);
