import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
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
  const { nivelAcceso, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const handleToggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

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
              {/* Botón de Inicio siempre visible */}
              <Nav.Link
                as={Link}
                to="/"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <BsHouseDoor className="menu-item-icon" />
              </Nav.Link>

              {/* Menú completo para invitados */}
              {(nivelAcceso === "invitado" || isInvitadosSection) && (
                <>
                  <div className="baroque-divider"></div>
                  <Nav.Link
                    as={Link}
                    to="/invitados"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <i className="bi bi-people menu-item-icon"></i>
                  </Nav.Link>

                  <div className="baroque-divider"></div>
                  <Nav.Link
                    as={Link}
                    to="/invitados/confirmar" 
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <BsCheckCircleFill className="menu-item-icon" />
                    CONFIRMAR ASISTENCIA
                  </Nav.Link>

                  <div className="baroque-divider"></div>
                  <Nav.Link
                    as={Link}
                    to="/invitados/ubicacion"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <BsGeoAltFill className="menu-item-icon" />
                    UBICACIÓN
                  </Nav.Link>

                  <div className="baroque-divider"></div>
                  <Nav.Link
                    as={Link}
                    to="/invitados/codigo-vestimenta"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <BsGiftFill className="menu-item-icon" />
                    CÓDIGO VESTIMENTA
                  </Nav.Link>

                  <div className="baroque-divider"></div>
                  <Nav.Link
                    as={Link}
                    to="/invitados/itinerario"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <BsClockFill className="menu-item-icon" />
                    ITINERARIO
                  </Nav.Link>
                </>
              )}
              {/* Menú completo para organización */}
              {(nivelAcceso === "organizacion" || isOrganizacionSection) && (
                <>
                  <div className="baroque-divider"></div>
                  <Nav.Link
                    as={Link}
                    to="/organizacion"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <i className="bi bi-clipboard-data menu-item-icon"></i>
                  </Nav.Link>

                  <div className="baroque-divider"></div>
                  <Nav.Link
                    as={Link}
                    to="/organizacion/invitados"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <BsPeopleFill className="menu-item-icon" />
                    LISTA INVITADOS
                  </Nav.Link>

                  <div className="baroque-divider"></div>
                  <Nav.Link
                    as={Link}
                    to="/organizacion/mesas"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <i className="bi bi-people menu-item-icon"></i>
                    MESAS
                  </Nav.Link>

                  <div className="baroque-divider"></div>
                  <Nav.Link
                    as={Link}
                    to="/organizacion/checklist"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <BsListCheck className="menu-item-icon" />
                    TAREAS
                  </Nav.Link>

                  <div className="baroque-divider"></div>
                  <Nav.Link
                    as={Link}
                    to="/organizacion/invitaciones"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <BsEnvelope className="menu-item-icon" />
                    INVITACIONES
                  </Nav.Link>

                  <div className="baroque-divider"></div>
                  <Nav.Link
                    as={Link}
                    to="/organizacion/regalos"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <BsGift className="menu-item-icon" />
                    REGALOS
                  </Nav.Link>

                  <div className="baroque-divider"></div>
                  <Nav.Link
                    as={Link}
                    to="/organizacion/catering"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <BsEggFried className="menu-item-icon" />
                    CATERING
                  </Nav.Link>

                  <div className="baroque-divider"></div>
                  <Nav.Link
                    as={Link}
                    to="/organizacion/presupuesto"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <BsCashStack className="menu-item-icon" />
                    PRESUPUESTO
                  </Nav.Link>
                </>
              )}
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