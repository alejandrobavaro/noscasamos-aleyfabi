import React, { useState } from "react";
import Slider from "react-slick";
import "../assets/scss/_03-Componentes/_PPublicoNuestraHistoria.scss";

function PPublicoNuestraHistoria() {
  // Configuración del slider (se mantiene igual)
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    fade: true,
    cssEase: "linear",
    arrows: false,
    pauseOnHover: true,
  };

  const [showFullStory, setShowFullStory] = useState(false);

  // Capítulos de la historia (completa)
  const chapters = [
    {
      // title: "Febrero 2023: El Destino nos Unió",
      image: "/img/03-img-banners/banner6.png",
      content: (
        <>
          <p>
            Todo comenzó en una cálida noche de verano. Fabiola estaba
            disfrutando de una cena con amigas cuando Alejandro llegó al mismo
            restaurante con su grupo de amigos. Sus miradas se cruzaron por
            casualidad cuando Fabiola se levantó para ir al baño y Alejandro,
            galante, le abrió la puerta.
          </p>
          <p>
            "Fue como si el tiempo se detuviera", recuerda Fabiola. "Había algo
            en su sonrisa que me hizo sentir inmediatamente cómoda". Alejandro,
            por su parte, quedó cautivado por la risa contagiosa de Fabiola y su
            manera genuina de ser.
          </p>
          <blockquote className="love-quote">
            "Esa noche supe que quería volver a verla. No podía dejar que se
            fuera sin al menos conseguir su número" - Alejandro
          </blockquote>
        </>
      ),
      reverse: false,
    },
    {
      // title: "Marzo 2023: Nuestra Primera Cita",
      image: "/img/03-img-banners/banner2.png",
      content: (
        <>
          <p>
            Su primera cita fue en un pequeño café escondido en el centro de la
            ciudad. Lo que estaba planeado como un encuentro de una hora se
            convirtió en una tarde entera de conversación sin fin. Descubrieron
            que ambos amaban el jazz, los perros y los viajes espontáneos.
          </p>
          <p>
            "Cuando me acompañó a mi casa, no quiso darme un beso. Me dijo que
            prefería esperar para estar seguro de que no era solo emoción del
            momento", cuenta Fabiola entre risas. "Eso me conquistó
            completamente".
          </p>
          <blockquote className="love-quote">
            "Nunca había conocido a alguien con quien pudiera hablar tan
            naturalmente. Con Fabi, las palabras simplemente fluían" - Alejandro
          </blockquote>
        </>
      ),
      reverse: true,
    },
    {
      // title: "Julio 2023: El Viaje que lo Cambió Todo",
      image: "/img/03-img-banners/banner3.png",
      content: (
        <>
          <p>
            Un fin de semana en la montaña marcó un antes y después. Una tormenta
            inesperada los dejó atrapados en una cabaña sin electricidad, con
            solo velas y vino para pasar la noche. Fue allí donde Alejandro le
            confesó a Fabiola que se estaba enamorando de ella.
          </p>
          <p>
            "Recuerdo que dibujaba corazones en el vaho de la ventana mientras
            llovía afuera", relata Fabiola. "Esa noche supe que esto era algo
            especial, algo que valía la pena cuidar".
          </p>
          <div className="animated-hearts">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="heart" style={{ animationDelay: `${i * 0.2}s` }}>❤</div>
            ))}
          </div>
        </>
      ),
      reverse: false,
    },
    {
      // title: "Diciembre 2023: La Primera Navidad Juntos",
      image: "/img/03-img-banners/banner5.png",
      content: (
        <>
          <p>
            Celebrar las fiestas con ambas familias fue un desafío que superaron
            con creces. Alejandro preparó el pavo siguiendo la receta secreta de
            la abuela de Fabiola, mientras que ella aprendió a hacer los
            pastelitos tradicionales de la familia de Alejandro.
          </p>
          <p>
            "Fue hermoso ver cómo nuestras familias se conectaban", dice
            Alejandro. "Mis padres la adoran, y sus padres... bueno, al menos ya
            no me miran con sospecha", bromea.
          </p>
          <blockquote className="love-quote">
            "Esa Navidad recibí muchos regalos, pero el mejor fue despertar cada
            mañana a su lado" - Fabiola
          </blockquote>
        </>
      ),
      reverse: true,
    },
    {
      // title: "Junio 2024: La Propuesta",
      image: "/img/03-img-banners/banner4.png",
      content: (
        <>
          <p>
            Alejandro planeó la propuesta durante meses. Contrató a un fotógrafo
            escondido y llevó a Fabiola al mismo restaurante donde se conocieron.
            Justo cuando el sol se ponía, se arrodilló frente a ella con un
            anillo que había diseñado especialmente.
          </p>
          <p>
            "Lo único que no planeé fue llorar tanto que apenas podía hablar",
            confiesa Alejandro. "Por suerte, ella dijo que sí antes de que yo
            pudiera terminar mi discurso preparado".
          </p>
          <div className="sparkle-animation">
            {[...Array(15)].map((_, i) => (
              <div key={i} className="sparkle" style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`
              }}></div>
            ))}
          </div>
        </>
      ),
      reverse: false,
    },
  ];

  return (
    <>
      {/* Portada principal */}
      <section className="featured-story">
        <Slider {...sliderSettings}>
          {chapters.slice(0, 3).map((chapter, index) => (
            <div key={index} className="featured-slide">
              <img src={chapter.image} alt={chapter.title} />
              <div className="slide-caption">
                <div className="caption-content">
                  <h2>{chapter.title}</h2>
                  <button 
                    className="read-more"
                    onClick={() => setShowFullStory(true)}
                  >
                    Nuestra historia... 
                  </button>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </section>

      {/* Historia completa (modal) */}
      {showFullStory && (
        <div className="story-modal">
          <div className="modal-content">
            <button 
              className="close-modal"
              onClick={() => setShowFullStory(false)}
            >
              &times;
            </button>
            
            <div className="love-story-content">
              <section className="story-intro">
                <h2>Nuestra Historia de Amor</h2>
                <p className="intro-text">
                  Esta es la historia de cómo dos almas destinadas a estar juntas se
                  encontraron, se enamoraron y decidieron pasar el resto de sus vidas
                  como compañeros de aventuras.
                </p>
              </section>

              {chapters.map((chapter, index) => (
                <section 
                  key={index}
                  className={`story-chapter ${chapter.reverse ? 'reverse-layout' : ''}`}
                >
                  <div className="chapter-image">
                    <img src={chapter.image} alt={chapter.title} />
                  </div>
                  <div className="chapter-text">
                    <h3>{chapter.title}</h3>
                    {chapter.content}
                  </div>
                </section>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default PPublicoNuestraHistoria;