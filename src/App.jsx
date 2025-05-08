import React from "react";
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
import PInvitadosCodigoVestimenta from "./componentes/PInvitadosCodigoVestimenta";
import PInvitadoItinerario from "./componentes/PInvitadoItinerario";
import PInvitadosProbadorRopaAvatar from "./componentes/PInvitadosProbadorRopaAvatar";

//------------RUTAS DE ORGANIZACIÓN--------------//
import POrganizacion from "./componentes/POrganizacion";
import PInvitadosLista from "./componentes/PInvitadosLista";
import POrgMesas from "./componentes/POrgMesas";
import POrgChecklistBoda from "./componentes/POrgChecklistBoda";
import POrgRegalos from "./componentes/POrgRegalos";
import POrgCatering from "./componentes/POrgCatering";
import POrgPresupuesto from "./componentes/POrgPresupuesto";
import POrgInvitaciones from "./componentes/POrgInvitaciones";

//------------CONTEXTOS--------------//
import { AuthProvider } from "./context/AuthContext";
import { PersonalizarAvatarProvider } from "./context/PersonalizarAvatarContext";

function App() {
  return (
    <AuthProvider>
      <PersonalizarAvatarProvider>
        <Router>
          <Header />

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
                <Route path="/invitados/codigo-vestimenta" element={<PInvitadosCodigoVestimenta />} />
                <Route path="/invitados/codigo-vestimenta/probador" element={<PInvitadosProbadorRopaAvatar />} />
                <Route path="/invitados/itinerario" element={<PInvitadoItinerario />} />

                {/* RUTAS DE ORGANIZACIÓN */}
                <Route path="/organizacion" element={<POrganizacion />} />
                <Route path="/organizacion/invitados" element={<PInvitadosLista />} />
                <Route path="/organizacion/mesas" element={<POrgMesas />} />
                <Route path="/organizacion/checklist" element={<POrgChecklistBoda />} />
                <Route path="/organizacion/regalos" element={<POrgRegalos />} />
                <Route path="/organizacion/catering" element={<POrgCatering />} />
                <Route path="/organizacion/presupuesto" element={<POrgPresupuesto />} />
                <Route path="/organizacion/invitaciones" element={<POrgInvitaciones />} />
           
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
      </PersonalizarAvatarProvider>
    </AuthProvider>
  );
}

export default App;