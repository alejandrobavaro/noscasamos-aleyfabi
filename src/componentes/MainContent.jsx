import React from "react";
import Slider from "react-slick";
import "../assets/scss/_03-Componentes/_MainContent.scss";

function MainContent() {
  // Imágenes para la historia de amor
  const loveStoryImages = [
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
      {/* Carrusel con imágenes de la historia */}
      <div className="carouselContainer">
        <Slider {...settings}>
          {loveStoryImages.map((image, index) => (
            <div key={index} className="carouselItem">
              <img src={image} alt={`Historia de amor ${index + 1}`} />
            </div>
          ))}
        </Slider>
      </div>

      {/* Contenido principal - Historia de amor */}
      <div className="mainContentContainer">
        {/* Introducción */}
        <section className="storyIntro">
          <div className="sectionHeader">
            <h2 className="sectionTitle">
              Nuestra Historia
              <span className="sectionSubtitle">Un cuento de hadas hecho realidad</span>
            </h2>
          </div>
          <div className="introContent">
            <p className="storyText">
              Esta es la historia de cómo dos almas destinadas a estar juntas se encontraron, 
              se enamoraron y decidieron pasar el resto de sus vidas como compañeros de aventuras.
            </p>
          </div>
        </section>

        {/* Capítulo 1: El Encuentro */}
        <section className="storyChapter chapter1">
          <div className="chapterContent">
            <div className="chapterImage">
              <img src="/img/historia/encuentro-detalle.jpg" alt="Primer encuentro" />
            </div>
            <div className="chapterText">
              <h3 className="chapterTitle">Febrero 2023: El Destino nos Unió</h3>
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
              <blockquote className="loveQuote">
                "Esa noche supe que quería volver a verla. No podía dejar que se fuera sin al menos 
                conseguir su número" - Alejandro
              </blockquote>
            </div>
          </div>
        </section>

        {/* Capítulo 2: Primeras Citas */}
        <section className="storyChapter chapter2">
          <div className="chapterContent reverse">
            <div className="chapterText">
              <h3 className="chapterTitle">Marzo 2023: Descubriéndonos</h3>
              <p>
                Su primera cita fue en un pequeño café cerca del río. Hablaron durante horas, descubriendo 
                sus gustos en común por el jazz, los viajes y la cocina italiana. Alejandro sorprendió a 
                Fabiola con su conocimiento de vinos, mientras que ella lo cautivó con sus historias de 
                viajes por Europa.
              </p>
              <p>
                La segunda cita fue una aventura: Alejandro llevó a Fabiola a un mercado de antigüedades 
                donde buscaban el objeto más curioso. Fabiola encontró un viejo candelabro francés que 
                hoy luce en su hogar como símbolo de esos primeros momentos mágicos.
              </p>
              <div className="memoryBox">
                <p>Recuerdo favorito de Fabiola: "Cuando me llevó de sorpresa a ver el atardecer en 
                el mirador de la ciudad con un picnic que él mismo preparó"</p>
              </div>
            </div>
            <div className="chapterImage">
              <img src="/img/historia/primeras-citas.jpg" alt="Primeras citas" />
            </div>
          </div>
        </section>

        {/* Capítulo 3: El Amor Florece */}
        <section className="storyChapter chapter3">
          <div className="chapterContent">
            <div className="chapterImage">
              <img src="/img/historia/viaje-together.jpg" alt="Viaje juntos" />
            </div>
            <div className="chapterText">
              <h3 className="chapterTitle">Junio 2023: Nuestro Primer Viaje</h3>
              <p>
                Para el cumpleaños de Fabiola, Alejandro planeó una sorpresa: un fin de semana en la montaña. 
                Fue allí, caminando por senderos rodeados de naturaleza, donde ambos sintieron que esto era 
                algo serio, algo especial.
              </p>
              <p>
                "Recuerdo que hizo mucho frío esa noche", cuenta Alejandro, "y Fabiola se acurrucó contra mí 
                para calentarse. En ese momento supe que quería protegerla y hacerla feliz por el resto de 
                mis días".
              </p>
              <ul className="loveTimeline">
                <li>Julio 2023: Conocen a las familias</li>
                <li>Agosto 2023: Primera crisis superada juntos</li>
                <li>Octubre 2023: Se mudan juntos</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Capítulo 4: La Propuesta */}
        <section className="storyChapter chapter4">
          <div className="chapterContent reverse">
            <div className="chapterText">
              <h3 className="chapterTitle">Diciembre 2024: ¿Quieres Casarte Conmigo?</h3>
              <p>
                Alejandro planeó meticulosamente la propuesta durante meses. Sabía que Mendoza, con sus 
                viñedos y montañas, era el lugar perfecto. Contrató a un fotógrafo para capturar el momento 
                y reservó una cena privada en una bodega centenaria.
              </p>
              <p>
                "Estábamos paseando por los viñedos al atardecer", recuerda Fabiola con lágrimas en los ojos. 
                "De repente se detuvo, se arrodilló y sacó un anillo que había diseñado especialmente para mí. 
                No pude evitar decir que sí antes de que terminara de hablar".
              </p>
              <blockquote className="loveQuote">
                "Ese día entendí que el verdadero amor no es encontrar a alguien perfecto, sino encontrar a 
                alguien que te haga querer ser mejor cada día" - Fabiola
              </blockquote>
            </div>
            <div className="chapterImage">
              <img src="/img/historia/propuesta-mendoza.jpg" alt="Propuesta en Mendoza" />
            </div>
          </div>
        </section>

        {/* Capítulo 5: Planeando el Futuro */}
        <section className="storyChapter chapter5">
          <div className="chapterContent">
            <div className="chapterImage">
              <img src="/img/historia/casa-del-mar.jpg" alt="Casa del Mar" />
            </div>
            <div className="chapterText">
              <h3 className="chapterTitle">2025: Comienza la Aventura</h3>
              <p>
                La elección de "La Casa del Mar" como lugar para su boda no fue casual. Ambos comparten un 
                amor profundo por el océano y los atardeceres. "Queremos que nuestro matrimonio comience 
                donde el mar besa la tierra, como nuestro amor que une dos mundos", explica Alejandro.
              </p>
              <p>
                Ahora, mientras planean cada detalle de su boda, no pueden evitar emocionarse pensando en 
                todas las aventuras que vendrán después: construir un hogar, viajar por el mundo, y quizás 
                algún día, empezar una familia.
              </p>
              <div className="futurePromise">
                <p>"Prometemos amarnos, respetarnos y aventurarnos juntos por el resto de nuestras vidas"</p>
              </div>
            </div>
          </div>
        </section>

        {/* Epílogo */}
        <section className="storyEpilogue">
          <div className="epilogueContent">
            <h3 className="epilogueTitle">Y Así Continúa Nuestra Historia...</h3>
            <p>
              Esta es solo el comienzo de nuestro viaje juntos. El 23 de Noviembre de 2025, frente al mar 
              que tanto amamos, celebraremos nuestro amor con todos ustedes, nuestros seres queridos.
            </p>
            <p className="signature">
              Con todo nuestro amor,<br />
              Alejandro & Fabiola
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}

export default MainContent;