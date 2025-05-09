import React from "react";
import "../assets/scss/_03-Componentes/_PPublicoContacto.scss";

const PPublicoContacto = () => {
  return (
    <section className="contact-logo-section">
      <div className="unified-contact-container">
        <div className="unified-logo-social">
          <div className="unified-logo">
            <img
              src="/img/02-logos/logo-bodaaleyfabi1d.png"
              alt="Logo Boda Alejandro y Fabiola"
              className="unified-logo-img"
            />
          </div>

          <div className="unified-social">
            <h3 className="unified-social-title">
              <i className="bi bi-heart-fill" /> Síguenos <i className="bi bi-heart-fill" />
            </h3>
            <div className="unified-social-icons">
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="unified-social-link"
              >
                <i className="bi bi-facebook" />
                <span>Facebook</span>
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="unified-social-link"
              >
                <i className="bi bi-instagram" />
                <span>Instagram</span>
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="unified-social-link"
              >
                <i className="bi bi-youtube" />
                <span>YouTube</span>
              </a>
              <a
                href="mailto:#"
                className="unified-social-link"
              >
                <i className="bi bi-envelope-heart" />
                <span>Escríbenos</span>
              </a>
            </div>
          </div>
        </div>

        <div className="unified-contact-banner">
          <img
            src="/img/03-img-banners/banner2.png"
            alt="Boda Alejandro y Fabiola"
            className="unified-banner-img"
          />
        </div>
      </div>
    </section>
  );
};

export default PPublicoContacto;