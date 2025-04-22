import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { BsBoxArrowRight, BsList } from "react-icons/bs";
import { Navbar, Nav, Container } from "react-bootstrap";
import "../assets/scss/_03-Componentes/_Header.scss";

const Header = ({ isDarkMode, toggleDarkMode }) => {
  const { nivelAcceso, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("dark-mode", isDarkMode);
  }, [isDarkMode]);

  const handleToggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <header className="header">
      <div className="baroque-line-top"></div>
    
      <Navbar expand="lg" className="navbar-custom">
     

      <Navbar.Brand as={Link} to="/" className="logo-brand header-container">
            <img
              src="../../img/02-logos/logo-bodaaleyfabi1d.png"
              alt="Logo Boda Ale y Fabi"
              className="logo-header"
            />
          </Navbar.Brand>

          <Nav.Link as={Link} to="/" onClick={() => setIsMobileMenuOpen(false)}>
                INICIO
              </Nav.Link>


        <Container className="header-container">
          <Navbar.Toggle 
            aria-controls="basic-navbar-nav" 
            className="mobile-toggle"
            onClick={handleToggleMobileMenu}
          >
            <BsList className="menu-icon" />
          </Navbar.Toggle>


       

       

          <Navbar.Collapse id="basic-navbar-nav" className={`navbar-collapse-custom ${isMobileMenuOpen ? "show" : ""}`}>
            <Nav className="nav-links">

            
           

              {nivelAcceso === 'invitado' && (
                <>
                  <div className="baroque-divider"></div>
                  <Nav.Link as={Link} to="/invitados/confirmar" onClick={() => setIsMobileMenuOpen(false)}>
                    CONFIRMAR
                  </Nav.Link>


             


                  <div className="baroque-divider"></div>
                  <Nav.Link as={Link} to="/invitados/ubicacion" onClick={() => setIsMobileMenuOpen(false)}>
                    UBICACIÓN
                  </Nav.Link>
                </>
              )}

              {nivelAcceso === 'organizacion' && (
                <>
                  <div className="baroque-divider"></div>
                  <Nav.Link as={Link} to="/organizacion/invitados" onClick={() => setIsMobileMenuOpen(false)}>
                    INVITADOS
                  </Nav.Link>
                </>
              )}
            </Nav>


          


            <div className="auth-section">
              {nivelAcceso ? (
                <div className="auth-welcome">
                  <span>Hola, {nivelAcceso}</span>
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
                <Link to="/admin" className="access-btn">
                  ACCESO
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