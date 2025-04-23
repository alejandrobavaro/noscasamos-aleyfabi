import React, { useState } from "react";
import Slider from "react-slick";
import AvatarSelector from "./AvatarSelector";
import { FaFemale, FaMale, FaPalette, FaQuestionCircle, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import "../assets/scss/_03-Componentes/_DressCode.scss";

const DressCode = () => {
  const [activeTab, setActiveTab] = useState("dresscode");
  const [showTips, setShowTips] = useState(false);

  // Imágenes para el slider de inspiración
  const inspirationImages = [
    { src: "/img/dresscode/inspiracion1.jpg", alt: "Vestido largo vino con detalles dorados", caption: "Elegante vestido largo en tono vino" },
    { src: "/img/dresscode/inspiracion2.jpg", alt: "Traje azul marino con corbata dorada", caption: "Traje azul marino para caballeros" },
    { src: "/img/dresscode/inspiracion3.jpg", alt: "Conjunto verde botella con accesorios dorados", caption: "Conjunto en verde botella" },
    { src: "/img/dresscode/inspiracion4.jpg", alt: "Vestido de cóctel nude con chal", caption: "Vestido nude perfecto para jardín" },
    { src: "/img/dresscode/inspiracion5.jpg", alt: "Traje gris oscuro con camisa blanca", caption: "Look clásico para caballeros" }
  ];

  // Configuración del slider
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false
        }
      }
    ]
  };

  // Componentes personalizados para flechas del slider
  function SampleNextArrow(props) {
    const { onClick } = props;
    return (
      <button className="slick-arrow next" onClick={onClick}>
        <FaArrowRight />
      </button>
    );
  }

  function SamplePrevArrow(props) {
    const { onClick } = props;
    return (
      <button className="slick-arrow prev" onClick={onClick}>
        <FaArrowLeft />
      </button>
    );
  }

  return (
    <div className="dresscode-container">

      <div className="dresscode-header">
        <h1>Dress Code</h1>
        <p className="subtitle">Inspiración para tu look en nuestra boda</p>
        <div className="floral-divider"></div>
      </div>

      <div className="dresscode-tabs">
        <button 
          className={activeTab === "dresscode" ? "active" : ""}
          onClick={() => setActiveTab("dresscode")}
        >
          Código de Vestimenta
        </button>
        <button 
          className={activeTab === "inspiration" ? "active" : ""}
          onClick={() => setActiveTab("inspiration")}
        >
          Galería de Inspiración
        </button>
        <button 
          className={activeTab === "virtual" ? "active" : ""}
          onClick={() => setActiveTab("virtual")}
        >
          Probador Virtual
        </button>
      </div>

      {activeTab === "dresscode" && (
        <div className="dresscode-content">
          <div className="theme-section">
            <h2><FaPalette /> Tema: Elegante Soirée</h2>
            <p>Queremos crear una atmósfera sofisticada y armoniosa donde todos se sientan cómodos y elegantes.</p>
            
            <div className="theme-details">
              <div className="theme-card">
                <h3>Ambiente</h3>
                <p>Celebración nocturna en jardín con iluminación cálida y decoración natural.</p>
              </div>
              <div className="theme-card">
                <h3>Estilo</h3>
                <p>Elegante pero no formal rígido. Sofisticado con toques modernos.</p>
              </div>
            </div>
          </div>

          <div className="gender-sections">
            <div className="gender-section">
              <h3><FaFemale /> Damas</h3>
              <ul>
                <li>Vestido largo o de cóctel elegante (sin blanco)</li>
                <li>Tonos sugeridos: vino, dorado, nude o verde botella</li>
                <li>Tacones o sandalias elegantes (considerar terreno irregular)</li>
                <li>Accesorios discretos y elegantes</li>
                <li>Peinados: recogidos o semirecogidos sugeridos</li>
              </ul>
            </div>

            <div className="gender-section">
              <h3><FaMale /> Caballeros</h3>
              <ul>
                <li>Traje oscuro (azul marino, gris oscuro o negro)</li>
                <li>Corbata o corbatín opcional (tonos tierra o vino)</li>
                <li>Zapatos de vestir (evitar deportivos)</li>
                <li>Camisa de vestir (mangas largas preferiblemente)</li>
                <li>Preferiblemente sin jeans</li>
              </ul>
            </div>
          </div>

          <div className="color-palette">
            <h3>Nuestra Paleta de Colores</h3>
            <div className="colors">
              {[
                { hex: "#7A4F50", name: "Vino" },
                { hex: "#C2A78D", name: "Dorado" },
                { hex: "#5A2D2D", name: "Bordeaux" },
                { hex: "#F8F1E9", name: "Nude" },
                { hex: "#8C5E3D", name: "Tierra" }
              ].map((color, idx) => (
                <div key={idx} className="color-item">
                  <div className="color-box" style={{ backgroundColor: color.hex }}></div>
                  <span>{color.name}</span>
                </div>
              ))}
            </div>
            <p className="color-note">Estos tonos armonizarán con nuestra decoración y fotografía.</p>
          </div>

          <div className="weather-tip">
            <h3>Consejo para el clima</h3>
            <p>Noviembre en Mar del Plata puede ser fresco por la noche (18-22°C). Recomendamos traer un abrigo elegante o chal que complemente tu atuendo.</p>
          </div>
        </div>
      )}

        {activeTab === "inspiration" && (
        <div className="inspiration-content">
          <div className="inspiration-intro">
            <h2>Looks Inspiradores</h2>
            <p>Hemos seleccionado estas imágenes como referencia de estilos que armonizan con nuestro tema.</p>
          </div>
          
          {/* Slider integrado */}
          <div className="inspiration-slider">
            <Slider {...sliderSettings}>
              {inspirationImages.map((image, index) => (
                <div key={index} className="slider-item">
                  <div className="image-container">
                    <img src={image.src} alt={image.alt} />
                    <div className="image-caption">{image.caption}</div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
          
          <div className="inspiration-tips">
            <h3>Tips de Estilismo</h3>
            <ul>
              <li>Los tejidos fluidos y vaporosos funcionan bien para el ambiente de jardín</li>
              <li>Los detalles dorados o metalizados añaden elegancia</li>
              <li>Evitar estampados muy grandes o llamativos</li>
              <li>Prefiere telas naturales como seda, lino o algodón</li>
            </ul>
          </div>
        </div>
      )}

      {activeTab === "virtual" && (
        <div className="virtual-content">
          <div className="virtual-header">
            <h2>Probador Virtual</h2>
            <button 
              className="help-button"
              onClick={() => setShowTips(!showTips)}
            >
              <FaQuestionCircle /> {showTips ? "Ocultar ayuda" : "Mostrar ayuda"}
            </button>
          </div>
          
          {showTips && (
            <div className="virtual-tutorial">
              <h3>Guía para usar el Probador Virtual</h3>
              <div className="tutorial-steps">
                <div className="step">
                  <div className="step-number">1</div>
                  <p>Selecciona el género del avatar usando los botones superiores</p>
                </div>
                <div className="step">
                  <div className="step-number">2</div>
                  <p>Explora las diferentes categorías de prendas (superior, inferior, calzado, accesorios)</p>
                </div>
                <div className="step">
                  <div className="step-number">3</div>
                  <p>Haz clic en las prendas para probarlas en el avatar</p>
                </div>
                <div className="step">
                  <div className="step-number">4</div>
                  <p>Usa los selectores de color para cambiar los tonos de las prendas</p>
                </div>
                <div className="step">
                  <div className="step-number">5</div>
                  <p>Combina diferentes piezas hasta encontrar tu look ideal</p>
                </div>
              </div>
              <div className="tutorial-note">
                <p><strong>Nota:</strong> Este probador es solo una guía. Las prendas mostradas son representativas y no exactas.</p>
              </div>
            </div>
          )}
          
          <div className="avatar-section">
            <AvatarSelector />
          </div>
          
          <div className="virtual-tips">
            <h3>Consejos para tu look perfecto</h3>
            <ul>
              <li>Prueba combinaciones dentro de nuestra paleta de colores sugerida</li>
              <li>Considera la comodidad para bailar y moverte</li>
              <li>Recuerda que habrá fotografía profesional - elige looks fotogénicos</li>
              <li>Equilibra tu atuendo: si el superior es llamativo, el inferior puede ser más sobrio</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default DressCode;