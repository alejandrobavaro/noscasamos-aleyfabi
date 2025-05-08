import React, { useState } from "react";
import "../assets/scss/_03-Componentes/_PPublicoNovedades.scss";

function PPublicoNovedades() {
  const [expandedNews, setExpandedNews] = useState(null);

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
        </>
      ),
      images: ["/img/03-img-cuadradas/1000063530.jpg", "/img/03-img-cuadradas/1000063530.jpg"],
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
            <img src="/img/03-img-cuadradas/1000063530.jpg" alt="Souvenirs" />
            <img src="/img/03-img-cuadradas/1000063530.jpg" alt="Souvenirs" />
          </div>
          <p>"Queríamos algo que realmente representara nuestro amor y que nuestros invitados conserven con cariño", explicó Alejandro.</p>
        </>
      ),
      images: ["/img/03-img-cuadradas/20230805_152855.jpg", "/img/03-img-cuadradas/1000063530.jpg"],
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
            <img src="/img/03-img-cuadradas/1000063530.jpg" alt="Prueba de vestuario" />
          </div>
          <p>"Queremos mantenerlo en secreto, pero estamos muy contentos con las elecciones", confesó Alejandro.</p>
        </>
      ),
      images: ["/img/03-img-cuadradas/20230723_122529.jpg"],
      category: "Preparativos"
    }
  ];

  return (
    <section className="news-feed">
      <h2 className="section-title">Últimas Noticias</h2>
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
                    Ver menos
                  </button>
                </div>
              ) : (
                <button 
                  className="expand-news"
                  onClick={() => setExpandedNews(news.id)}
                >
                  Leer más
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
  );
}

export default PPublicoNovedades;