import React, { useState } from "react";
import Slider from "react-slick";
import PInvitadosProbadorRopaAvatar from "./PInvitadosProbadorRopaAvatar";
import { FaFemale, FaMale, FaPalette, FaQuestionCircle, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import "../assets/scss/_03-Componentes/_PInvitadosCodigoVestimenta.scss";

const PInvitadosCodigoVestimenta = () => {
  const [activeTab, setActiveTab] = useState("PInvitadosCodigoVestimenta");
  const [showTips, setShowTips] = useState(false);

  const inspirationImages = [
    { src: "/img/11-codigovestimenta/inspiraciondama1.jpeg", alt: "Vestido largo vino con detalles dorados", caption: "Elegante vestido largo en tono vino" },
    { src: "/img/11-codigovestimenta/inspiracionhombre1.jpeg", alt: "Traje azul marino con corbata dorada", caption: "Traje azul marino para caballeros" },
    { src: "/img/11-codigovestimenta/inspiraciondama2.jpeg", alt: "Vestido largo de fiesta", caption: "Elegante vestido largo" },
    { src: "/img/11-codigovestimenta/inspiracionhombre2.jpeg", alt: "Traje gris oscuro con camisa blanca", caption: "Look clásico para caballeros" }
  ];

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
    <div className="pantalla-vestimenta">
      <div className="contenedor-vestimenta">
        <div className="encabezado-boda">
          <h1>Código de Vestimenta <i className="bi bi-gift-fill"></i></h1>
          <h2>Fabiola y Alejandro</h2>
          <p className="mensaje-bienvenida">
            Inspiración para tu look en nuestra boda
          </p>
        </div>

        <div className="tabs-vestimenta">
          <button 
            className={activeTab === "PInvitadosCodigoVestimenta" ? "active" : ""}
            onClick={() => setActiveTab("PInvitadosCodigoVestimenta")}
          >
            Código de Vestimenta
          </button>
          <button 
            className={activeTab === "virtual" ? "active" : ""}
            onClick={() => setActiveTab("virtual")}
          >
            Probador Virtual
          </button>
        </div>

        {activeTab === "PInvitadosCodigoVestimenta" && (
          <div className="contenido-vestimenta">
            <div className="seccion-tema">
              <h2><FaPalette /> Elegante Soirée</h2>
              <p>Queremos crear una atmósfera sofisticada donde todos se sientan cómodos y elegantes.</p>
              
              <div className="tarjetas-tema">
                <div className="tarjeta-tema">
                  <h3>Ambiente</h3>
                  <p>Celebración nocturna en jardín con iluminación cálida y decoración natural.</p>
                </div>
                <div className="tarjeta-tema">
                  <h3>Estilo</h3>
                  <p>Elegante pero no formal rígido. Sofisticado con toques modernos.</p>
                </div>
              </div>
            </div>

            <div className="seccion-generos">
              <div className="genero-card opcion-confirmar">
                <h3><FaFemale /> Damas</h3>
                <ul>
                  <li>Vestido largo o de cóctel elegante (sin blanco)</li>
                  <li>Tonos sugeridos: vino, dorado, nude o verde botella</li>
                  <li>Tacones o sandalias elegantes</li>
                  <li>Accesorios discretos y elegantes</li>
                  <li>Peinados: recogidos o semirecogidos</li>
                </ul>
              </div>

              <div className="genero-card opcion-ubicacion">
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

            <div className="seccion-inspiracion">
              <h2><i className="bi bi-stars"></i> Galería de Inspiración</h2>
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
            </div>

            <div className="seccion-consejos opcion-itinerario">
              <h3><i className="bi bi-cloud-sun"></i> Consejo para el clima</h3>
              <p>Noviembre en Mar del Plata puede ser fresco por la noche (18-22°C). Recomendamos traer un abrigo elegante o chal que complemente tu atuendo.</p>
            </div>
          </div>
        )}

        {activeTab === "virtual" && (
          <div className="contenido-virtual">
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
                    <p>Selecciona el género del avatar</p>
                  </div>
                  <div className="step">
                    <div className="step-number">2</div>
                    <p>Explora las diferentes categorías de prendas</p>
                  </div>
                  <div className="step">
                    <div className="step-number">3</div>
                    <p>Haz clic en las prendas para probarlas</p>
                  </div>
                  <div className="step">
                    <div className="step-number">4</div>
                    <p>Usa los selectores de color</p>
                  </div>
                  <div className="step">
                    <div className="step-number">5</div>
                    <p>Combina diferentes piezas</p>
                  </div>
                </div>
                <div className="tutorial-note">
                  <p><strong>Nota:</strong> Este probador es solo una guía. Las prendas mostradas son representativas.</p>
                </div>
              </div>
            )}
            
            <div className="avatar-section">
              <PInvitadosProbadorRopaAvatar />
            </div>
            
            <div className="virtual-tips opcion-dresscode">
              <h3>Consejos para tu look perfecto</h3>
              <ul>
                <li>Prueba combinaciones dentro de nuestra paleta de colores</li>
                <li>Considera la comodidad para bailar y moverte</li>
                <li>Recuerda que habrá fotografía profesional</li>
                <li>Equilibra tu atuendo</li>
              </ul>
            </div>
          </div>
        )}

        <div className="seccion-hashtag">
          <p>Compartí tus fotos usando nuestro hashtag</p>
          <h3>#BodaAlejandroYFabiola</h3>
          <div className="corazon-animado">❤️</div>
        </div>
      </div>
    </div>
  );
};

export default PInvitadosCodigoVestimenta;