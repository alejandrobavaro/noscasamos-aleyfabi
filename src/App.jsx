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
import PAcceso from "./componentes/PAcceso";

//------------RUTAS PÚBLICAS--------------//
import PPublico from "./componentes/PPublico";
import PPublicoContacto from "./componentes/PPublicoContacto";
import PPublicoContactoForm from "./componentes/PPublicoContactoForm";


//------------RUTAS DE INVITADOS--------------//
import PInvitados from "./componentes/PInvitados";
import PinvitadosConfirmAsist from "./componentes/PinvitadosConfirmAsist";
import PInvitadosUbicacion from "./componentes/PInvitadosUbicacion";
import DressCode from "./componentes/DressCode";
import PInvitadoItinerario from "./componentes/PInvitadoItinerario";

//------------RUTAS DE ORGANIZACIÓN--------------//
import POrganizacion from "./componentes/POrganizacion";
import PInvitadosLista from "./componentes/PInvitadosLista";
import POrgMesas from "./componentes/POrgMesas";


//------------CONTEXTO DE AUTENTICACIÓN--------------//
import { AuthProvider } from "./context/AuthContext";

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
              <Route path="/" element={<PAcceso />} />

              {/* RUTAS PÚBLICAS (acceso sin autenticación) */}
              <Route path="/inicio" element={<PPublico />} />
              <Route path="/contacto" element={
                <div className="contacto-container">
                  <PPublicoContacto />
                  <PPublicoContactoForm />
                </div>
              } />
     

              {/* RUTAS DE INVITADOS */}
              <Route path="/invitados" element={<PInvitados />} />
              <Route path="/invitados/confirmar" element={<PinvitadosConfirmAsist />} />
              <Route path="/invitados/ubicacion" element={<PInvitadosUbicacion />} />
              <Route path="/invitados/dresscode" element={<DressCode />} />
              <Route path="/invitados/PInvitadoItinerario" element={<PInvitadoItinerario />} />

              {/* RUTAS DE ORGANIZACIÓN */}
              <Route path="/organizacion" element={<POrganizacion />} />
              <Route path="/organizacion/invitados" element={<PInvitadosLista />} />
              <Route path="/organizacion/POrgMesas" element={<POrgMesas />} />
         

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