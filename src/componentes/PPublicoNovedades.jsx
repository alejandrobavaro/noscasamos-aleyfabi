import React, { useState } from "react";
import "../assets/scss/_03-Componentes/_PPublicoNovedades.scss";

function PPublicoNovedades() {
  // Estado para la revista
  const [currentPage, setCurrentPage] = useState(0);
  
  // Estado para noticias expandibles
  const [expandedNews, setExpandedNews] = useState(null);

  // Contenido de la revista - 7 páginas completas
  const magazinePages = [
    {
      title: "La Propuesta",
      date: "Abril 2025",
      image: "/img/06-img-galeria3/id12-c12.png",
      content: (
        <>
          <p>El 29 de abril de 2025, en una playa privada al atardecer, Alejandro preparó una sorpresa que Fabiola nunca olvidará.</p>
          <blockquote>
            "Cuando vi todas las velas y los pétalos de rosa, supe que algo especial estaba por pasar"
            <cite>- Fabiola</cite>
          </blockquote>
          <p>Con el mar como testigo y un anillo diseñado especialmente para ella, Alejandro se arrodilló y pidió a Fabiola que fuera su esposa.</p>
        </>
      ),
      gallery: ["/img/06-img-galeria3/id10-c10.png", "/img/06-img-galeria3/id11-c11.png", "/img/06-img-galeria3/id13-c13.png"],
      category: "Historia"
    },
    {
      title: "Nuestra Historia",
      date: "Mayo 2025",
      image: "/img/06-img-galeria3/id8-c8.png",
      content: (
        <>
          <h4>Cómo nos conocimos</h4>
          <p>Todo comenzó en la universidad, donde ambos estudiaban arquitectura. Compartíamos mesa en la biblioteca sin saber que años después compartiríamos nuestra vida.</p>
          
          <h4>Primera cita</h4>
          <p>Un pequeño café del centro se convirtió en el escenario de nuestra primera cita oficial, donde hablamos por horas sin darnos cuenta del tiempo.</p>
          
          <h4>El momento clave</h4>
          <p>Fue durante un viaje a la montaña, cuando quedamos atrapados por la lluvia en una cabaña, que supimos que esto era algo especial.</p>
        </>
      ),
      gallery: ["/img/06-img-galeria3/id1-c1.png", "/img/06-img-galeria3/id2-c2.png", "/img/06-img-galeria3/id3-c3.png"],
      category: "Historia"
    },
    {
      title: "La Planeación",
      date: "Junio 2025",
      image: "/img/06-img-galeria3/id4-c4.png",
      content: (
        <>
          <p>Después de meses de buscar el lugar perfecto, finalmente elegimos la Hacienda Santa María para nuestra boda. Un lugar lleno de historia y encanto que refleja perfectamente nuestro estilo.</p>
          
          <div className="planning-details">
            <div className="detail-item">
              <h5>Fecha Elegida</h5>
              <p>15 de Diciembre, 2025</p>
            </div>
            <div className="detail-item">
              <h5>Invitados</h5>
              <p>150 personas cercanas</p>
            </div>
            <div className="detail-item">
              <h5>Tema</h5>
              <p>"Vintage Elegante"</p>
            </div>
          </div>
          
          <p>Queremos que cada detalle cuente nuestra historia y haga que nuestros invitados se sientan parte especial de este día.</p>
        </>
      ),
      gallery: ["/img/06-img-galeria3/id5-c5.png", "/img/06-img-galeria3/id6-c6.png", "/img/06-img-galeria3/id7-c7.png"],
      category: "Preparativos"
    },
    {
      title: "El Vestido",
      date: "Julio 2025",
      image: "/img/revista/vestido.jpg",
      content: (
        <>
          <p>Después de probar más de 30 vestidos en 5 boutiques diferentes, Fabiola encontró "el indicado" en una pequeña diseñadora local.</p>
          <blockquote>
            "Cuando me lo probé, supe inmediatamente que era el vestido de mis sueños. No quiero revelar muchos detalles, pero tiene un detalle de encaje que perteneció a mi abuela"
            <cite>- Fabiola</cite>
          </blockquote>
          <p>El vestido combina elementos clásicos con toques modernos, perfecto para la ceremonia en la hacienda.</p>
        </>
      ),
      gallery: ["/img/revista/vestido1.jpg", "/img/revista/vestido2.jpg"],
      category: "Preparativos"
    },
    {
      title: "Los Anillos",
      date: "Agosto 2025",
      image: "/img/revista/anillos.jpg",
      content: (
        <>
          <p>Trabajamos con un joyero local para diseñar anillos que representen nuestra unión. Alejandro eligió un diseño clásico en oro blanco, mientras que Fabiola optó por un anillo con un diamante rodeado de zafiros.</p>
          
          <div className="ring-specs">
            <div>
              <h5>Anillo de Alejandro</h5>
              <p>Oro blanco 18k con grabado interior</p>
            </div>
            <div>
              <h5>Anillo de Fabiola</h5>
              <p>Diamante central de 0.75ct con zafiros</p>
            </div>
          </div>
          
          <p>Ambos anillos llevan grabadas las coordenadas del lugar donde nos comprometimos y la fecha de nuestra boda.</p>
        </>
      ),
      gallery: ["/img/revista/anillos1.jpg", "/img/revista/anillos2.jpg"],
      category: "Detalles"
    },
    {
      title: "El Menú",
      date: "Septiembre 2025",
      image: "/img/revista/menu.jpg",
      content: (
        <>
          <p>Después de extensas catas, hemos seleccionado un menú que combina lo mejor de la gastronomía local con nuestros platillos favoritos.</p>
          
          <h5>Entradas</h5>
          <ul>
            <li>Tartaletas de hongos silvestres</li>
            <li>Canapés de salmón ahumado</li>
            <li>Bolitas de queso de cabra</li>
          </ul>
          
          <h5>Plato Principal</h5>
          <p>Opción 1: Filete Wellington con reducción de vino tinto<br/>
          Opción 2: Risotto de hongos con trufa (vegetariano)</p>
          
          <h5>Postre</h5>
          <p>Pastel de tres leches con frambuesas frescas</p>
          
          <p>Todos los ingredientes serán locales y de temporada, seleccionados cuidadosamente por nuestro chef.</p>
        </>
      ),
      gallery: ["/img/revista/menu1.jpg", "/img/revista/menu2.jpg"],
      category: "Detalles"
    },
    {
      title: "La Luna de Miel",
      date: "Octubre 2025",
      image: "/img/revista/lunademiel.jpg",
      content: (
        <>
          <p>¡Nos vamos a Italia! Pasaremos dos semanas recorriendo la Toscana y la Costa Amalfitana.</p>
          
          <h5>Itinerario</h5>
          <ul>
            <li>3 noches en Florencia</li>
            <li>4 noches en una villa en la campiña toscana</li>
            <li>3 noches en Positano</li>
            <li>4 noches en Capri</li>
          </ul>
          
          <p>Hemos planeado visitas a viñedos, cenas románticas con vista al mar y mucho tiempo para relajarnos y disfrutar de nuestra nueva vida como esposos.</p>
          <blockquote>
            "Elegimos Italia porque ambos amamos su cultura, gastronomía y paisajes. Será el broche de oro perfecto para nuestro comienzo"
            <cite>- Ambos</cite>
          </blockquote>
        </>
      ),
      gallery: ["/img/revista/lunademiel1.jpg", "/img/revista/lunademiel2.jpg", "/img/revista/lunademiel3.jpg"],
      category: "Futuro"
    }
  ];

  // Noticias expandibles
  const newsItems = [
    {
      id: 1,
      title: "Sesión de Fotos Previas",
      date: "15 Oct 2024",
      excerpt: "Los novios realizaron su primera sesión fotográfica oficial",
      content: (
        <>
          <p>Alejandro y Fabiola compartieron una maravillosa jornada de fotos en los jardines de la quinta familiar. La sesión incluyó looks formales e informales, capturando la esencia de su amor.</p>
          <div className="news-gallery">
            <img src="/img/novedades/foto1.jpg" alt="Sesión de fotos" />
            <img src="/img/novedades/foto2.jpg" alt="Sesión de fotos" />
          </div>
          <p>"Fue un día mágico donde pudimos relajarnos y ser nosotros mismos frente a cámara", comentó Fabiola emocionada.</p>
          <p>El fotógrafo, Juan Pérez, comentó: "Fue una sesión muy especial porque su conexión es evidente y eso se nota en cada foto".</p>
        </>
      ),
      images: ["/img/04-img-galeria1/1000063530.jpg", "/img/04-img-galeria1/1000063530.jpg"],
      category: "Preparativos"
    },
    {
      id: 2,
      title: "Souvenirs Artesanales",
      date: "1 Nov 2024",
      excerpt: "Los novios revelan los souvenirs personalizados",
      content: (
        <>
          <p>Después de meses de diseño, los novios mostraron los souvenirs que preparan para sus invitados. Cada pieza fue hecha a mano con materiales nobles.</p>
          <div className="news-gallery">
            <img src="/img/04-img-galeria1/1000063530.jpg" alt="Souvenirs" />
            <img src="/img/04-img-galeria1/1000063530.jpg" alt="Souvenirs" />
          </div>
          <p>"Queríamos algo que realmente representara nuestro amor y que nuestros invitados conserven con cariño", explicó Alejandro.</p>
          <p>Los souvenirs incluyen mini esculturas de cerámica que representan el lugar donde se conocieron, cada una con el nombre del invitado grabado.</p>
          <p>Fabiola agregó: "Trabajamos con artesanos locales para apoyar a la comunidad y darle un toque más personal".</p>
        </>
      ),
      images: ["/img/04-img-galeria1/20230805_152855.jpg", "/img/04-img-galeria1/1000063530.jpg"],
      category: "Detalles"
    },
    {
      id: 3,
      title: "Prueba de Vestuario",
      date: "20 Nov 2024",
      excerpt: "Los novios seleccionan sus trajes de ceremonia",
      content: (
        <>
          <p>La emocionante prueba de vestuario reveló los elegantes trajes que lucirán en el gran día. Fabiola optó por un diseño clásico con detalles modernos.</p>
          <div className="news-gallery">
            <img src="/img/04-img-galeria1/1000063530.jpg" alt="Prueba de vestuario" />
          </div>
          <p>"Queremos mantenerlo en secreto, pero estamos muy contentos con las elecciones", confesó Alejandro.</p>
          <p>El diseñador de moda, Carlos Mendez, quien está a cargo de los trajes, comentó: "Hemos trabajado por meses para crear piezas únicas que reflejen sus personalidades y el estilo de la boda".</p>
          <p>Fabiola agregó: "Es importante para mí que mi vestido sea cómodo además de hermoso, porque quiero bailar toda la noche".</p>
        </>
      ),
      images: ["/img/04-img-galeria1/20230723_122529.jpg"],
      category: "Preparativos"
    }
  ];

  return (
    <div className="novedades-container">
      {/* Sección de Revista */}
      <section className="wedding-magazine">
        <h2>Nuestra Boda</h2>
        <p className="magazine-subtitle">Un recorrido por nuestra historia y los preparativos</p>
        
        <div className="magazine-container">
          <div className="magazine-page">
            <div className="page-image" style={{ backgroundImage: `url(${magazinePages[currentPage].image})` }}>
              <div className="page-header">
                <h3>{magazinePages[currentPage].title}</h3>
                <span className="page-date">{magazinePages[currentPage].date}</span>
                <span className="page-category">{magazinePages[currentPage].category}</span>
              </div>
            </div>
            
            <div className="page-content">
              {magazinePages[currentPage].content}
              
              {magazinePages[currentPage].gallery && (
                <div className="page-gallery">
                  {magazinePages[currentPage].gallery.map((img, i) => (
                    <img key={i} src={img} alt="" className="gallery-thumbnail" />
                  ))}
                </div>
              )}
            </div>
          </div>
          
          <div className="magazine-controls">
            <button 
              disabled={currentPage === 0}
              onClick={() => setCurrentPage(p => p - 1)}
              className="magazine-button"
            >
              &larr; Anterior
            </button>
            
            <div className="page-indicator">
              <span>Página {currentPage + 1} de {magazinePages.length}</span>
              <div className="page-dots">
                {magazinePages.map((_, index) => (
                  <span 
                    key={index} 
                    className={`dot ${currentPage === index ? 'active' : ''}`}
                    onClick={() => setCurrentPage(index)}
                  />
                ))}
              </div>
            </div>
            
            <button 
              disabled={currentPage === magazinePages.length - 1}
              onClick={() => setCurrentPage(p => p + 1)}
              className="magazine-button"
            >
              Siguiente &rarr;
            </button>
          </div>
        </div>
      </section>

      {/* Sección de Noticias */}
      <section className="news-feed">
        <h2 className="section-title">Últimas Noticias</h2>
        <p className="section-subtitle">Mantente al día con los últimos preparativos</p>
        <div className="news-grid">
          {newsItems.map(news => (
            <article 
              key={news.id} 
              className={`news-card ${expandedNews === news.id ? 'expanded' : ''}`}
            >
              <div className="news-card-content">
                <span className="news-category">{news.category}</span>
                <h3>{news.title}</h3>
                <time>{news.date}</time>
                <p className="excerpt">{news.excerpt}</p>
                
                {expandedNews === news.id ? (
                  <div className="full-content">
                    {news.content}
                    <button 
                      className="collapse-news"
                      onClick={() => setExpandedNews(null)}
                    >
                      &uarr; Ver menos
                    </button>
                  </div>
                ) : (
                  <button 
                    className="expand-news"
                    onClick={() => setExpandedNews(news.id)}
                  >
                    &darr; Leer más
                  </button>
                )}
              </div>
              {news.images.length > 0 && (
                <div className="news-thumbnail">
                  <img src={news.images[0]} alt={news.title} />
                </div>
              )}
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

export default PPublicoNovedades;