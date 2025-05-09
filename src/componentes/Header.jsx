import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  BsBoxArrowRight,
  BsList,
  BsHouseDoor,
  BsCheckCircleFill,
  BsGeoAltFill,
  BsGiftFill,
  BsClockFill,
  BsPeopleFill,
  BsListCheck,
  BsGift,
  BsEggFried,
  BsEnvelope,
  BsCashStack
} from "react-icons/bs";
import { Navbar, Nav, Container } from "react-bootstrap";
import "../assets/scss/_03-Componentes/_Header.scss";

const Header = () => {
  const { nivelAcceso, login, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [tipoAcceso, setTipoAcceso] = useState(null);
  const [clave, setClave] = useState("");
  const [error, setError] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const handleToggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const handleAcceso = (tipo) => {
    if (tipo === "publico") {
      navigate("/inicio");
      return;
    }
    setTipoAcceso(tipo);
    setClave("");
    setError("");
  };

  const verificarClave = () => {
    const credenciales = {
      invitado: { clave: "invitado", ruta: "/invitados" },
      organizacion: { clave: "aleyfabi", ruta: "/organizacion" },
    };

    if (clave === credenciales[tipoAcceso]?.clave) {
      login(tipoAcceso);
      navigate(credenciales[tipoAcceso].ruta);
      setTipoAcceso(null);
    } else {
      setError("Clave incorrecta. Por favor intenta nuevamente.");
      setTimeout(() => setError(""), 3000);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") verificarClave();
  };

  const isInvitadosSection = location.pathname.startsWith("/invitados");
  const isOrganizacionSection = location.pathname.startsWith("/organizacion");

  return (
    <header className="header">
      <div className="baroque-line-top"></div>

      <Navbar expand="lg" className="navbar-custom">
        <Container className="header-container">
          <Navbar.Brand as={Link} to="/" className="logo-brand">
            <img
              src="../../img/02-logos/logo-bodaaleyfabi1d.png"
              alt="Logo Boda Ale y Fabi"
              className="logo-header"
            />
          </Navbar.Brand>

          {!nivelAcceso && (
            <div className="header-access-buttons">
              <div className="tarjetas-acceso">
                {[
                  {
                    tipo: "invitado",
                    icono: "bi-envelope",
                    titulo: "Invitados",
                    clase: "invitado",
                  },
                  {
                    tipo: "organizacion",
                    icono: "bi-lock",
                    titulo: "Organización",
                    clase: "organizacion",
                  },
                ].map((opcion) => (
                  <div
                    key={opcion.tipo}
                    className={`tarjeta-acceso-mini tarjeta-${opcion.clase}`}
                    onClick={() => handleAcceso(opcion.tipo)}
                  >
                    <i className={`bi ${opcion.icono}`}></i>
                    <span>{opcion.titulo}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tipoAcceso && (
            <div className="access-form-overlay">
              <div className="access-form-container">
                <div className="formulario-clave">
                  <div className="form-header">
                    <button className="btn-volver" onClick={() => setTipoAcceso(null)}>
                      <i className="bi bi-arrow-left"></i>
                    </button>
                    <h2>
                      Acceso{" "}
                      {tipoAcceso === "invitado" ? "Invitados" : "Organización"}
                    </h2>
                  </div>

                  <p className="instrucciones">
                    {tipoAcceso === "invitado"
                      ? "Ingresa la clave que recibiste en tu invitación"
                      : "Ingresa la clave de acceso privada"}
                  </p>

                  <div className="input-group">
                    <input
                      type="password"
                      value={clave}
                      onChange={(e) => setClave(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Introduce la clave"
                      autoFocus
                      className={error ? "input-error" : ""}
                    />
                    <button onClick={verificarClave} className="btn-verificar">
                      <i className="bi bi-arrow-right"></i>
                    </button>
                  </div>

                  {error && <p className="error-message">{error}</p>}
                </div>
              </div>
            </div>
          )}

          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            onClick={handleToggleMobileMenu}
            className="mobile-toggle"
          >
            <BsList className="menu-icon" />
          </Navbar.Toggle>

          <Navbar.Collapse
            id="basic-navbar-nav"
            className={`navbar-collapse-custom ${
              isMobileMenuOpen ? "show" : ""
            }`}
          >
            <Nav className="nav-links">
              {/* ... (resto del contenido del menú igual) ... */}
            </Nav>

            <div className="auth-section">
              {nivelAcceso && (
                <div className="auth-welcome">
                  <span>
                    Hola,{" "}
                    {nivelAcceso === "organizacion"
                      ? "Alejandro & Fabiola"
                      : "Invitado"}
                  </span>
                  <Link
                    to="/"
                    onClick={() => {
                      logout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="logout-btn"
                  >
                    <BsBoxArrowRight className="logout-icon" />
                  </Link>
                </div>
              )}
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div className="baroque-line-bottom"></div>
    </header>
  );
};

export default Header;