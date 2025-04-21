import React from "react";
import "../assets/scss/_03-Componentes/_Footer.scss";
import { BsInstagram, BsYoutube, BsFacebook, BsTwitter } from "react-icons/bs";

function Footer() {
  return (
    <footer className="footer">
      <div className="baroque-line-top"></div>
      
      <div className="footer-content">
        {/* Logos laterales */}
        <div className="footer-logo-container">
          <img 
         src="/img/02-logos/logofooter1a.png"
            alt="Logo decorativo" 
            className="footer-logo"
          />
        </div>
        
        {/* Redes sociales */}
        <div className="social-links-container">
          <div className="social-links">
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
              <BsInstagram className="social-icon" />
              <span>Instagram</span>
            </a>
            <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer">
              <BsYoutube className="social-icon" />
              <span>YouTube</span>
            </a>
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
              <BsFacebook className="social-icon" />
              <span>Facebook</span>
            </a>
            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
              <BsTwitter className="social-icon" />
              <span>Twitter</span>
            </a>
          </div>
        </div>
        
        {/* Logo derecho */}
        <div className="footer-logo-container">
          <img 
      src="/img/02-logos/logofooter1a.png"
            alt="Logo decorativo" 
            className="footer-logo"
          />
        </div>
      </div>
      
      <div className="baroque-line-bottom"></div>
      
      {/* Copyright */}
      <div className="copyright-container">
        <div className="copyright-content">
          <a 
            href="https://alejandrobavaro.github.io/gondraworld-dev/" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            <span className="copyright-icon">✧</span>
            <span>Gondra World Dev</span>
            <span className="copyright-icon">✧</span>
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;