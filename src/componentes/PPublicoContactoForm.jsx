import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../assets/scss/_03-Componentes/_PPublicoContactoForm1.scss";

const PPublicoContactoForm1 = () => {
  // Configuración del slider
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: false,
    fade: true,
    cssEase: 'linear',
    pauseOnHover: true
  };

  // Fotos de los novios (reemplaza con tus imágenes)
  const couplePhotos = [
    "/img/04-img-banners/banner1.png",
    "/img/04-img-banners/banner2.png",
    "/img/04-img-banners/banner3.png",
    "/img/04-img-banners/banner4.png",
    "/img/04-img-banners/banner5.png"
  ];

  return (
    <section className="compact-contact-section">
      <div className="compact-form-container">
        <h2 className="compact-form-title">
          <i className="bi bi-envelope-heart" /> Escríbenos{" "}
          <i className="bi bi-envelope-heart" />
        </h2>
        
        <form
          className="compact-contact-form"
          action="https://formspree.io/f/xbjnlgzz"
          target="_blank"
          method="post"
        >
          <div className="compact-form-group">
            <input
              type="text"
              id="nombre"
              name="nombre"
              placeholder="Tu nombre"
              required
              className="compact-input"
            />
          </div>
          
          <div className="compact-form-group">
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Tu correo electrónico"
              required
              className="compact-input"
            />
          </div>
          
          <div className="compact-form-group">
            <textarea
              id="mensaje"
              name="mensaje"
              rows={3}
              placeholder="Tu mensaje para nosotros..."
              required
              className="compact-textarea"
            />
          </div>
          
          <button type="submit" className="compact-submit-btn">
            Enviar <i className="bi bi-send" />
          </button>
        </form>

        <div className="couple-slider-container">
          <Slider {...sliderSettings} className="couple-slider">
            {couplePhotos.map((photo, index) => (
              <div key={index} className="slider-item">
                <img 
                  src={photo} 
                  alt={`Alejandro y Fabiola ${index + 1}`} 
                  className="couple-photo"
                />
                <div className="photo-overlay"></div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default PPublicoContactoForm1;