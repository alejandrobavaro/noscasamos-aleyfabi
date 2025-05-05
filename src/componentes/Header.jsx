import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { BsBoxArrowRight, BsList } from "react-icons/bs";
import { Navbar, Nav, Container } from "react-bootstrap";
import "../assets/scss/_03-Componentes/_Header.scss";

const Header = ({ isDarkMode, toggleDarkMode }) => {
  const { nivelAcceso, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleToggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <header className="header">
      <div className="baroque-line-top"></div>
      
      <Navbar expand="lg" className="navbar-custom">
        <Container className="header-container">
          {/* Logo y toggle móvil */}
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

          {/* Menú principal */}
          <Navbar.Collapse id="basic-navbar-nav" className={`navbar-collapse-custom ${isMobileMenuOpen ? "show" : ""}`}>
            <Nav className="nav-links">
              {/* Sección Pública (siempre visible) */}
              <Nav.Link as={Link} to="/inicio" onClick={() => setIsMobileMenuOpen(false)}>
                NUESTRA HISTORIA
              </Nav.Link>
              
              <div className="baroque-divider"></div>
              
              <Nav.Link as={Link} to="/contacto" onClick={() => setIsMobileMenuOpen(false)}>
                CONTACTO
              </Nav.Link>

              {/* Sección Invitados */}
              {nivelAcceso === 'invitado' && (
                <>
                  <div className="baroque-divider"></div>
                  <Nav.Link as={Link} to="/invitados" onClick={() => setIsMobileMenuOpen(false)}>
                    ÁREA INVITADOS
                  </Nav.Link>
                  
                  <div className="baroque-divider"></div>
                  <Nav.Link as={Link} to="/invitados/confirmar" onClick={() => setIsMobileMenuOpen(false)}>
                    CONFIRMAR ASISTENCIA
                  </Nav.Link>
                  
                  <div className="baroque-divider"></div>
                  <Nav.Link as={Link} to="/invitados/ubicacion" onClick={() => setIsMobileMenuOpen(false)}>
                    UBICACIÓN
                  </Nav.Link>
                </>
              )}

              {/* Sección Organización */}
              {nivelAcceso === 'organizacion' && (
                <>
                  <div className="baroque-divider"></div>
                  <Nav.Link as={Link} to="/organizacion" onClick={() => setIsMobileMenuOpen(false)}>
                    PANEL ORGANIZACIÓN
                  </Nav.Link>
                  
                  <div className="baroque-divider"></div>
                  <Nav.Link as={Link} to="/organizacion/invitados" onClick={() => setIsMobileMenuOpen(false)}>
                    LISTA INVITADOS
                  </Nav.Link>
                  
                  <div className="baroque-divider"></div>
                  <Nav.Link as={Link} to="/organizacion/POrgMesas" onClick={() => setIsMobileMenuOpen(false)}>
                    ASIGNAR Mesas
                  </Nav.Link>
                </>
              )}
            </Nav>

            {/* Sección de autenticación */}
            <div className="auth-section">
              {nivelAcceso ? (
                <div className="auth-welcome">
                  <span>Hola, {nivelAcceso === 'organizacion' ? 'Alejandro & Fabiola' : 'Invitado'}</span>
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
              ) : (
                <Link to="/" className="access-btn">
                  ACCESO INVITADOS
                </Link>
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