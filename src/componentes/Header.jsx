import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  BsBoxArrowRight,
  BsList,
  BsHouseDoor,
  BsCheckCircleFill,
  BsGeoAltFill,
  BsSuitHeartFill,
  BsClockFill,
  BsPeopleFill,
  BsListCheck,
  BsGift,
  BsEggFried,
  BsEnvelope,
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
    <header className="app-header">
      <div className="header-decoration-top"></div>

      <Navbar expand="lg" className="header-navbar">
        <Container className="header-container">
          <Navbar.Brand as={Link} to="/" className="header-logo">
            <img
              src="../../img/02-logos/logo-bodaaleyfabi1d.png"
              alt="Logo Boda Ale y Fabi"
              className="logo-image"
            />
          </Navbar.Brand>

          {!nivelAcceso && (
            <div className="access-buttons">
              <div className="access-cards">
                {[
                  {
                    tipo: "invitado",
                    icono: "bi-envelope",
                    titulo: "Invitados",
                    clase: "guest",
                  },
                  {
                    tipo: "organizacion",
                    icono: "bi-lock",
                    titulo: "Organización",
                    clase: "organizer",
                  },
                ].map((opcion) => (
                  <div
                    key={opcion.tipo}
                    className={`access-card ${opcion.clase}-card`}
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
            <div className="access-modal">
              <div className="access-form">
                <div className="form-content">
                  <div className="form-header">
                    <button
                      className="back-button"
                      onClick={() => setTipoAcceso(null)}
                    >
                      <i className="bi bi-arrow-left"></i>
                    </button>
                    <h2>
                      Acceso{" "}
                      {tipoAcceso === "invitado" ? "Invitados" : "Organización"}
                    </h2>
                  </div>

                  <p className="form-instructions">
                    {tipoAcceso === "invitado"
                      ? "Ingresa la clave que recibiste en tu invitación"
                      : "Ingresa la clave de acceso privada"}
                  </p>

                  <div className="input-container">
                    <input
                      type="password"
                      value={clave}
                      onChange={(e) => setClave(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Introduce la clave"
                      autoFocus
                      className={error ? "error-input" : ""}
                    />
                    <button onClick={verificarClave} className="submit-button">
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
            className="menu-toggle"
          >
            <BsList className="menu-icon" />
          </Navbar.Toggle>

          <Navbar.Collapse
            id="basic-navbar-nav"
            className={`navbar-menu ${isMobileMenuOpen ? "open" : ""}`}
          >
            <Nav className="nav-links">
              {(nivelAcceso === "invitado" || isInvitadosSection) && (
                <>
                  <div className="nav-divider"></div>
                  <Nav.Link
                    as={Link}
                    to="/"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="nav-link"
                  >
                    <BsHouseDoor className="nav-icon" />
                    <span>Inicio</span>
                  </Nav.Link>

                  <div className="nav-divider"></div>
                  <Nav.Link
                    as={Link}
                    to="/invitados/confirmar"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="nav-link"
                  >
                    <BsCheckCircleFill className="nav-icon" />
                    <span>Confirmar Asistencia</span>
                  </Nav.Link>

                  <div className="nav-divider"></div>
                  <Nav.Link
                    as={Link}
                    to="/invitados/ubicacion"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="nav-link"
                  >
                    <BsGeoAltFill className="nav-icon" />
                    <span>Ubicación Salon</span>
                  </Nav.Link>

                  <div className="nav-divider"></div>
                  <Nav.Link
                    as={Link}
                    to="/invitados/codigo-vestimenta"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="nav-link"
                  >
                    <BsSuitHeartFill className="nav-icon" />
                    <span>Código Vestimenta</span>
                  </Nav.Link>

                  <div className="nav-divider"></div>
                  <Nav.Link
                    as={Link}
                    to="/invitados/itinerario"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="nav-link"
                  >
                    <BsClockFill className="nav-icon" />
                    <span>Itinerario Boda</span>
                  </Nav.Link>

                  <div className="nav-divider"></div>
                  <Nav.Link
                    as={Link}
                    to="/invitados/menu"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="nav-link"
                  >
                    <BsEggFried className="nav-icon" />
                    <span>Menu Comida</span>
                  </Nav.Link>

                  <div className="nav-divider"></div>
                  <Nav.Link
                    as={Link}
                    to="/invitados/regalos"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="nav-link"
                  >
                    <BsGift className="nav-icon" />
                    <span>Lista Regalos</span>
                  </Nav.Link>
                </>
              )}

              {(nivelAcceso === "organizacion" || isOrganizacionSection) && (
                <>
                  <Nav.Link
                    as={Link}
                    to="/organizacion"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="nav-link"
                  >
                    {/* Contenido de organización */}
                  </Nav.Link>

                  <div className="nav-divider"></div>
                  <Nav.Link
                    as={Link}
                    to="/organizacion/tareasboda"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="nav-link"
                  >
                    <BsListCheck className="nav-icon" />
                    <span>Tareas Boda</span>
                  </Nav.Link>

                  <div className="nav-divider"></div>
                  <Nav.Link
                    as={Link}
                    to="/organizacion/invitados"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="nav-link"
                  >
                    <BsPeopleFill className="nav-icon" />
                    <span>Lista Invitados</span>
                  </Nav.Link>

                  <div className="nav-divider"></div>
                  <Nav.Link
                    as={Link}
                    to="/organizacion/invitaciones"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="nav-link"
                  >
                    <BsEnvelope className="nav-icon" />
                    <span>Tarjeta de Invitacion</span>
                  </Nav.Link>

                  <div className="nav-divider"></div>
                  <Nav.Link
                    as={Link}
                    to="/organizacion/mesas"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="nav-link"
                  >
                    <i className="bi bi-people nav-icon"></i>
                    <span>Asignación Mesas</span>
                  </Nav.Link>
                </>
              )}
            </Nav>

            <div className="user-section">
              {nivelAcceso && (
                <div className="user-info">
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
                    className="logout-button"
                  >
                    <BsBoxArrowRight className="logout-icon" />
                  </Link>
                </div>
              )}
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div className="header-decoration-bottom"></div>
    </header>
  );
};

export default Header;