import React from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "../assets/scss/_03-Componentes/_MainContent.scss";

function MainContent() {
  const weddingImages = [
    "/img/05-img-costados-larga/1a.jpg",
    "/img/05-img-costados-larga/2a.jpg",
    "/img/05-img-costados-larga/3a.jpg",
    "/img/05-img-costados-larga/4a.jpg",
    "/img/05-img-costados-larga/5a.jpg"
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    fade: true,
    cssEase: 'linear'
  };

  return (
    <main className="mainContent">
      <div className="carouselContainer">
        <Slider {...settings}>
          {weddingImages.map((image, index) => (
            <div key={index} className="carouselItem">
              <img src={image} alt={`Imagen boda ${index + 1}`} />
            </div>
          ))}
        </Slider>
      </div>

      <div className="mainContentContainer">
        <section className="weddingSection">
          <div className="sectionHeader">
            <h2 className="sectionTitle">
              Nuestra Historia de Amor
              <span className="sectionSubtitle">El comienzo de nuestro viaje juntos</span>
            </h2>
          </div>
          <div className="sectionRow">
            <div className="gridItem weddingItem">
              <div className="weddingText">
                <h3 className="weddingSubtitle">
                  <span className="subtitleLine">Cuando el destino nos unió</span>
                </h3>
                <img
                  src="../../img/boda/historia.jpg"
                  alt="Alejandro y Fabiola"
                />
                <p className="weddingDescription">
                  "El amor no se mira con los ojos, sino con el alma". Desde aquel primer encuentro, 
                  supimos que nuestro camino estaría juntos. Cada risa, cada mirada, cada momento 
                  compartido ha sido un regalo que nos llevó a este día tan especial.
                </p>
                <div className="poemContainer">
                  <p className="poemText">
                    "Dos almas que se encuentran<br />
                    Como el mar y la orilla<br />
                    Unidos por siempre<br />
                    En esta hermosa vida"
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="infoSection">
          <div className="sectionHeader">
            <h2 className="sectionTitle">
              Detalles de la Celebración
              <span className="sectionSubtitle">Todo lo que necesitas saber</span>
            </h2>
          </div>
          <div className="sectionRow">
            <div className="gridItem infoItem">
              <div className="infoText">
                <h3 className="infoSubtitle">
                  <span className="subtitleLine">La Ceremonia</span>
                </h3>
                <img
                  src="../../img/boda/ceremonia.jpg"
                  alt="Ceremonia"
                />
                <div className="infoDetails">
                  <p><strong>Fecha:</strong> 23 de Noviembre 2025</p>
                  <p><strong>Hora:</strong> 20:00 hs</p>
                  <p><strong>Lugar:</strong> Casa del Mar, Villa García Uriburu</p>
                  <p><strong>Dresscode:</strong> Elegante soirée</p>
                </div>
                <div className="buttonContainer">
                  <Link to="/ubicacion" className="weddingButton">Ver ubicación</Link>
                </div>
              </div>
            </div>

            <div className="gridItem infoItem">
              <div className="infoText">
                <h3 className="infoSubtitle">
                  <span className="subtitleLine">La Recepción</span>
                </h3>
                <img
                  src="../../img/boda/recepcion.jpg"
                  alt="Recepción"
                />
                <p className="infoDescription">
                  Después de la ceremonia, los esperamos para celebrar juntos 
                  hasta las 4:00 am. Habrá cena, barra libre, música y mucha diversión.
                  ¡No olviden sus zapatos de baile!
                </p>
                <div className="poemContainer">
                  <p className="poemText">
                    "Bailaremos bajo las estrellas<br />
                    Celebrando este amor sin igual<br />
                    Que la música nos lleve<br />
                    En esta noche mágica y especial"
                  </p>
                </div>
              </div>
            </div>

            <div className="gridItem infoItem">
              <div className="infoText">
                <h3 className="infoSubtitle">
                  <span className="subtitleLine">Casa del Mar</span>
                </h3>
                <img
                  src="../../img/boda/lugar.jpg"
                  alt="Casa del Mar"
                />
                <p className="infoDescription">
                  Un lugar mágico frente al mar, donde la elegancia se mezcla con la naturaleza. 
                  Sus jardines y salones han sido testigos de historias de amor como la nuestra, 
                  y ahora será el escenario perfecto para nuestro comienzo.
                </p>
                <div className="buttonContainer">
                  <Link to="/galeria" className="weddingButton">Ver más fotos</Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="rsvpSection">
          <div className="sectionHeader">
            <h2 className="sectionTitle">
              Confirma tu asistencia
              <span className="sectionSubtitle">Esperamos celebrar contigo</span>
            </h2>
          </div>
          <div className="rsvpItem">
            <img
              className="weddingImage"
              src="../../img/boda/confirmacion.jpg"
              alt="Confirmación"
            />
            <p className="rsvpText">
              Nos encantaría contar con tu presencia en este día tan especial. 
              Por favor confirma tu asistencia antes del 1 de Noviembre.
            </p>
            <div className="buttonContainer">
              <Link to="/confirmar" className="weddingButton">Confirmar ahora</Link>
            </div>
          </div>
        </section>

        <section className="giftsSection">
          <div className="sectionHeader">
            <h2 className="sectionTitle">
              Nuestra Mesa de Regalos
              <span className="sectionSubtitle">Un gesto de amor y aprecio</span>
            </h2>
          </div>
          <div className="sectionRow">
            <div className="gridItem giftItem">
              <div className="giftText">
                <h3 className="giftSubtitle">
                  <span className="subtitleLine">Su presencia es nuestro mejor regalo</span>
                </h3>
                <img
                  src="../../img/boda/regalos.jpg"
                  alt="Regalos"
                />
                <p className="giftDescription">
                  Si desean hacernos un obsequio, hemos creado una lista de regalos 
                  en las tiendas que frecuentamos. Sin embargo, lo más importante 
                  es poder compartir este día con ustedes.
                </p>
                <div className="poemContainer">
                  <p className="poemText">
                    "No hay regalo más valioso<br />
                    Que tu amor y compañía<br />
                    Celebrar juntos este día<br />
                    Es la mayor alegría"
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="hashtagSection">
          <div className="sectionHeader">
            <h2 className="sectionTitle">
              Comparte tus fotos
              <span className="sectionSubtitle">Atesoramos cada momento</span>
            </h2>
          </div>
          <div className="hashtagContent">
            <p className="hashtagText">
              Usa nuestro hashtag <strong>#BodaAlejandroYFabiola</strong> en tus redes sociales 
              para que podamos ver y guardar todos los momentos especiales de este día.
            </p>
            <div className="socialIcons">
              {/* Aquí irían los iconos de redes sociales */}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

export default MainContent;