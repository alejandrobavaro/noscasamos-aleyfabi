import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

//------------ESTILOS--------------//
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./assets/scss/_01-General/_BodyIndexApp.scss";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css"; 
import "./assets/scss/_01-General/_Toastify.scss"; 

//------------COMPONENTES--------------//
import Header from "./componentes/Header";
import Footer from "./componentes/Footer";
import MainWhatsappIcon from "./componentes/MainWhatsappIcon";
import MainPublicidadSlider from "./componentes/MainPublicidadSlider";

//------------PANTALLA DE ACCESO--------------//
import PantallaAcceso from "./componentes/PantallaAcceso";

//------------RUTAS PÚBLICAS--------------//
import MainContent from "./componentes/MainContent";
import ContactoLogoRedes from "./componentes/ContactoLogoRedes";
import ContactoFormularioSlider from "./componentes/ContactoFormularioSlider";
import Clientes from "./componentes/Clientes";
import Servicio from "./componentes/Servicio";

//------------RUTAS DE INVITADOS--------------//
import AreaInvitados from "./componentes/AreaInvitados";
import ConfirmacionAsistencia from "./componentes/ConfirmacionAsistencia";
import UbicacionInvitados from "./componentes/UbicacionInvitados";
import DressCode from "./componentes/DressCode";
import Itinerario from "./componentes/Itinerario";

//------------RUTAS DE ORGANIZACIÓN--------------//
import PanelOrganizacion from "./componentes/PanelOrganizacion";
import ListaInvitados from "./componentes/ListaInvitados";
import AsignacionMesas from "./componentes/AsignacionMesas";
import TareasBoda from "./componentes/TareasBoda";

//------------CONTEXTO DE AUTENTICACIÓN--------------//
import { AuthProvider } from "./context/AuthContext"; // Eliminamos useAuth de aquí

function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  useEffect(() => {
    document.body.className = isDarkMode ? "dark-mode" : "light-mode";
  }, [isDarkMode]);

  return (
    <AuthProvider>
      <Router>
        <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />

        <div className="main-content">
          <div className="content centered">
            <Routes>
              {/* Ruta principal - Pantalla de acceso */}
              <Route path="/" element={<PantallaAcceso />} />

              {/* RUTAS PÚBLICAS (acceso sin autenticación) */}
              <Route path="/inicio" element={<MainContent />} />
              <Route path="/contacto" element={
                <>
                  <ContactoLogoRedes />
                  <ContactoFormularioSlider />
                </>
              } />
              <Route path="/clientes" element={<Clientes />} />
              <Route path="/servicio" element={<Servicio />} />

              {/* 
                Rutas protegidas ahora manejadas por cada componente interno
                Cada componente protegido manejará su propia lógica de autenticación
                usando useAuth()
              */}
              <Route path="/invitados" element={<AreaInvitados />} />
              <Route path="/invitados/confirmar" element={<ConfirmacionAsistencia />} />
              <Route path="/invitados/ubicacion" element={<UbicacionInvitados />} />
              <Route path="/invitados/dresscode" element={<DressCode />} />
              <Route path="/invitados/itinerario" element={<Itinerario />} />


              <Route path="/organizacion" element={<PanelOrganizacion />} />
              <Route path="/organizacion/invitados" element={<ListaInvitados />} />
              <Route path="/organizacion/mesas" element={<AsignacionMesas />} />
              <Route path="/organizacion/tareas" element={<TareasBoda />} />

              {/* Redirección para rutas no encontradas */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </div>

        <hr className="border border-0 opacity-20" />
        <MainPublicidadSlider />
        <Footer />
        <MainWhatsappIcon />
      </Router>
    </AuthProvider>
  );
}

export default App;