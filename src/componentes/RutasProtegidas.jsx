import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ContenidoPrincipal from '../componentes/ContenidoPrincipal/ContenidoPrincipal';
import AreaInvitados from '../componentes/AreaInvitados/AreaInvitados';
import PanelOrganizacion from '../componentes/PanelOrganizacion/PanelOrganizacion';
import PantallaAcceso from '../componentes/PantallaAcceso/PantallaAcceso';

function RutasProtegidas() {
  // En una implementación real, esto vendría de un contexto o estado global
  const [nivelAcceso, setNivelAcceso] = React.useState(null);

  return (
    <Routes>
      {/* Ruta pública */}
      <Route path="/inicio" element={<ContenidoPrincipal />} />
      
      {/* Ruta para invitados */}
      <Route 
        path="/invitados" 
        element={
          nivelAcceso === 'invitado' ? 
            <AreaInvitados /> : 
            <Navigate to="/" replace />
        } 
      />
      
      {/* Ruta para organización */}
      <Route 
        path="/organizacion" 
        element={
          nivelAcceso === 'organizacion' ? 
            <PanelOrganizacion /> : 
            <Navigate to="/" replace />
        } 
      />
      
      {/* Ruta raíz muestra pantalla de acceso */}
      <Route path="/" element={<PantallaAcceso />} />
    </Routes>
  );
}

export default RutasProtegidas;