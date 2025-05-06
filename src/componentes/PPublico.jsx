import React from "react";
import Slider from "react-slick";
import "../assets/scss/_03-Componentes/_PPublico.scss";

function PPublico() {
  const loveStoryImages = [
    "/img/05-img-costados-larga/1a.jpg",
    "/img/05-img-costados-larga/2a.jpg",
    "/img/05-img-costados-larga/3a.jpg",
    "/img/05-img-costados-larga/4a.jpg",
    "/img/05-img-costados-larga/5a.jpg"
  ];

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    fade: true,
    cssEase: 'linear',
    arrows: false,
    pauseOnHover: true
  };

  const chapters = [
    {
      title: "Febrero 2023: El Destino nos Unió",
      image: "/img/05-img-costados-larga/1a.jpg",
      content: (
        <>
          <p>
            Todo comenzó en una cálida noche de verano. Fabiola estaba disfrutando de una cena con amigas 
            cuando Alejandro llegó al mismo restaurante con su grupo de amigos. Sus miradas se cruzaron 
            por casualidad cuando Fabiola se levantó para ir al baño y Alejandro, galante, le abrió la puerta.
          </p>
          <p>
            "Fue como si el tiempo se detuviera", recuerda Fabiola. "Había algo en su sonrisa que me hizo 
            sentir inmediatamente cómoda". Alejandro, por su parte, quedó cautivado por la risa contagiosa 
            de Fabiola y su manera genuina de ser.
          </p>
          <blockquote className="love-quote">
            "Esa noche supe que quería volver a verla. No podía dejar que se fuera sin al menos 
            conseguir su número" - Alejandro
          </blockquote>
        </>
      ),
      reverse: false
    },
    // ... otros capítulos de la misma manera
  ];

  return (
    <main className="love-story-container">
      {/* Hero Slider */}
      <div className="love-story-hero">
        <Slider {...sliderSettings}>
          {loveStoryImages.map((image, index) => (
            <div key={index} className="hero-slide">
              <img src={image} alt={`Nuestra historia ${index + 1}`} />
              <div className="slide-overlay"></div>
            </div>
          ))}
        </Slider>
      </div>


      {/* Historia principal */}
      <div className="love-story-content">
        {/* Introducción */}
        <section className="story-intro">
          <h2 className="section-title">
            <span className="decorative-line left-line"></span>
            Nuestra Historia
            <span className="decorative-line right-line"></span>
          </h2>
          <p className="intro-subtitle">
            "El amor no mira con los ojos, sino con el alma" - Shakespeare
          </p>
          <p className="intro-text">
            Esta es la historia de cómo dos almas destinadas a estar juntas se encontraron, 
            se enamoraron y decidieron pasar el resto de sus vidas como compañeros de aventuras.
          </p>
        </section>

        {/* Capítulos de la historia */}
        {chapters.map((chapter, index) => (
          <section key={index} className={`story-chapter ${chapter.reverse ? 'reverse-layout' : ''}`}>
            <div className="chapter-image">
              <img src={chapter.image} alt={chapter.title} />
            </div>
            <div className="chapter-text">
              <h3>{chapter.title}</h3>
              {chapter.content}
            </div>
          </section>
        ))}

        {/* Epílogo */}
        <section className="story-epilogue">
          <div className="epilogue-content">
            <h3>Y Así Continúa Nuestra Historia...</h3>
            <p>
              Esta es solo el comienzo de nuestro viaje juntos. El 23 de Noviembre de 2025, frente al mar 
              que tanto amamos, celebraremos nuestro amor con todos ustedes, nuestros seres queridos.
            </p>
            <div className="signature">
              <p>Con todo nuestro amor,</p>
              <p>Alejandro & Fabiola</p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

export default PPublico;