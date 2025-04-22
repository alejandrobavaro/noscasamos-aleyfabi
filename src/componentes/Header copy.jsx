import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Cambiado a AuthContext
import { BsFillPersonPlusFill, BsBoxArrowRight, BsList } from "react-icons/bs";
import { Navbar, Nav, Container } from "react-bootstrap";
import "../assets/scss/_03-Componentes/_Header.scss";

const Header = ({ isDarkMode, toggleDarkMode }) => {
  const { nivelAcceso, logout } = useAuth(); // Cambiado para usar AuthContext
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("dark-mode", isDarkMode);
    
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isDarkMode]);

  const handleToggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <header className={`header encabezado ${scrolled ? 'scrolled' : ''}`}>
      <div className="baroque-line-top"></div>
      <Navbar expand="lg" className="navbar">
        <Container>
          <Navbar.Toggle aria-controls="basic-navbar-nav">
            <BsList className="menu-icon" onClick={handleToggleMobileMenu} />
          </Navbar.Toggle>

          <Navbar.Collapse
            id="basic-navbar-nav"
            className={`navbar-collapse ${isMobileMenuOpen ? "show" : ""}`}
          >
            <Nav className="ml-auto navbar-nav">
              <Nav.Link
                as={Link}
                to="/"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                INICIO
              </Nav.Link>
              
              <div className="baroque-divider"></div>
              
              <Nav.Link
                // as={Link}
                // to="/confirmar"
                // onClick={() => setIsMobileMenuOpen(false)}
              >
                CONFIRMAR ASISTENCIA
              </Nav.Link>

              <div className="baroque-divider"></div>

              <Nav.Link
                // as={Link}
                // to="/ubicacion"
                // onClick={() => setIsMobileMenuOpen(false)}
              >
                UBICACIÓN SALON
              </Nav.Link>

              <Navbar.Brand as={Link} to="/" className="logo-container">
                <img
                  src="../../img/02-logos/logo-bodaaleyfabi1d.png"
                  alt="Logo Boda Ale y Fabi"
                  className="logoHeader"
                />
              </Navbar.Brand>

              <div className="baroque-divider"></div>

              <Nav.Link
                // as={Link}
                // to="/playlist"
                // onClick={() => setIsMobileMenuOpen(false)}
              >
                PLAYLIST - VOTACION
              </Nav.Link>

              <Nav.Link
                // as={Link}
                // to="/galeria"
                // onClick={() => setIsMobileMenuOpen(false)}
              >
                SOCIAL GALERÍA - QR
              </Nav.Link>

              <div className="baroque-divider"></div>

              <div className="baroque-divider"></div>

              <Nav.Link
                // as={Link}
                // to="/mensajes"
                // onClick={() => setIsMobileMenuOpen(false)}
              >
                MENSAJES 
              </Nav.Link>
            </Nav>

            <Nav.Item className="auth-buttons-container">
              {nivelAcceso ? (
                <div className="auth-welcome-container">
                  <div className="auth-welcome">
                    <span>Hola,</span>
                    <span>{nivelAcceso}</span>
                  </div>
                  <Link
                    className="nav-linkHeader auth-link logout-link"
                    to="/"
                    onClick={() => {
                      logout();
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    <BsBoxArrowRight className="auth-icon" />
                  </Link>
                </div>
              ) : (
                <>
                  <Link className="nav-linkHeader auth-link" to="/admin">
                    <BsFillPersonPlusFill className="auth-icon" />
                  </Link>
                </>
              )}
            </Nav.Item>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div className="baroque-line-bottom"></div>
    </header>
  );
};

export default Header;