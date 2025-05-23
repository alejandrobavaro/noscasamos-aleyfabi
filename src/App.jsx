import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  unstable_HistoryRouter as HistoryRouter,
} from "react-router-dom";
import { createBrowserHistory } from "history";

//------------ESTILOS--------------//
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./assets/scss/_01-General/_BodyIndexApp.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./assets/scss/_01-General/_Toastify.scss";
import "react-toastify/dist/ReactToastify.css";

//------------COMPONENTES--------------//
import Header from "./componentes/Header";
import Footer from "./componentes/Footer";
import MainWhatsappIcon from "./componentes/MainWhatsappIcon";
import MainPublicidadSlider from "./componentes/MainPublicidadSlider";
import MainCabinaButton from "./componentes/MainCabinaButton";

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
import PInvitadosRegalos from "./componentes/PInvitadosRegalos";
import PInvitadosMenu from "./componentes/PInvitadosMenu";

//------------RUTAS DE ORGANIZACIÓN--------------//
import POrganizacion from "./componentes/POrganizacion";
import POrgListaInvitados from "./componentes/POrgListaInvitados";
import POrgAsignacionMesas from "./componentes/POrgAsignacionMesas";
import POrgTareasBoda from "./componentes/POrgTareasBoda";
import POrgInvitaciones from "./componentes/POrgInvitaciones";

//------------CONTEXTOS--------------//
import { AuthProvider } from "./context/AuthContext";

// Crear historia del navegador
const history = createBrowserHistory();

function App() {
  return (
    <AuthProvider>
      <HistoryRouter
        history={history}
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true,
        }}
      >
        <div className="app-container">
          <Header />

          <main className="main-content">
            <div className="content-wrapper">
              <Routes>
                {/* Ruta principal - Pantalla de acceso */}
                <Route path="/" element={<PAcceso />} />

                {/* RUTAS PÚBLICAS (acceso sin autenticación) */}
                <Route path="/inicio" element={<PPublico />} />
                <Route
                  path="/contacto"
                  element={
                    <div className="contacto-container">
                      <PPublicoContacto />
                      <PPublicoContactoForm />
                    </div>
                  }
                />

                {/* RUTAS DE INVITADOS */}
                <Route path="/invitados" element={<PInvitados />} />
                <Route
                  path="/invitados/confirmar"
                  element={<PinvitadosConfirmAsist />}
                />
                <Route
                  path="/invitados/ubicacion"
                  element={<PInvitadosUbicacion />}
                />
                <Route
                  path="/invitados/codigo-vestimenta"
                  element={<PInvitadosCodigoVestimenta />}
                />
                <Route
                  path="/invitados/itinerario"
                  element={<PInvitadoItinerario />}
                />
                <Route path="/invitados/menu" element={<PInvitadosMenu />} />
                <Route path="/invitados/regalos" element={<PInvitadosRegalos />} />

                {/* RUTAS DE ORGANIZACIÓN */}
                <Route path="/organizacion" element={<POrganizacion />} />
                <Route
                  path="/organizacion/invitados"
                  element={<POrgListaInvitados />}
                />
                <Route
                  path="/organizacion/mesas"
                  element={<POrgAsignacionMesas />}
                />
                <Route
                  path="/organizacion/tareasboda"
                  element={<POrgTareasBoda />}
                />
                <Route
                  path="/organizacion/invitaciones"
                  element={<POrgInvitaciones />}
                />

                {/* Redirección para rutas no encontradas */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </div>
          </main>

          <hr className="border border-0 opacity-20" />
          <MainPublicidadSlider />
          <Footer />
          <MainWhatsappIcon />
        </div>
      </HistoryRouter>
    </AuthProvider>
  );
}

export default App;