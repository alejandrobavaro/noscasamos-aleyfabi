import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "../assets/scss/_03-Componentes/_PPublicoGaleriaFotosHome.scss";

function PPublicoGaleriaFotos() {
  // Configuración del slider
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        }
      }
    ]
  };

  // Estado para las imágenes (puedes cargarlas dinámicamente después)
  const [fotos, setFotos] = useState([
    { id: 1, src: "/img/08-imagenes-galeria-home/id10-c10.png", category: "Books" },
    { id: 1, src: "/img/08-imagenes-galeria-home/id11-c11.png", category: "Viajes" },
    { id: 2, src: "/img/08-imagenes-galeria-home/id12-c12.png", category: "Ceremonia" },
    { id: 3, src: "/img/08-imagenes-galeria-home/id13-c13.png", category: "Recepcion" },
    { id: 4, src: "/img/08-imagenes-galeria-home/id14-c14.png", category: "Aventuras" },
    { id: 5, src: "/img/08-imagenes-galeria-home/id15-c15.png", category: "Vestuario" },
    { id: 6, src: "/img/08-imagenes-galeria-home/id16-c16.png", category: "Familia" },
    { id: 7, src: "/img/08-imagenes-galeria-home/id17-c17.png", category: "Fiesta" },
    { id: 8, src: "/img/08-imagenes-galeria-home/id18-c18.png", category: "Books 2" },
    { id: 9, src: "/img/08-imagenes-galeria-home/id19-c19.png", category: "Books 2" },

  ]);

  // Efecto para cargar imágenes dinámicamente (opcional)
  useEffect(() => {
    // Aquí podrías cargar las imágenes desde una API si lo necesitas
    // Ejemplo:
    // fetch('/api/fotos').then(res => res.json()).then(data => setFotos(data));
  }, []);

  return (
    <section className="galeria-fotos">
      <div className="galeria-header">
        <h2>Nuestra Galería</h2>
        <p>Momentos especiales capturados para siempre</p>
      </div>
      
      <div className="galeria-slider">
        <Slider {...sliderSettings}>
          {fotos.map((foto) => (
            <div key={foto.id} className="foto-container">
              <div className="foto-item">
                <img 
                  src={foto.src} 
                  alt={`Foto ${foto.id}`} 
                  className="foto-imagen"
                  onError={(e) => { 
                    e.target.src = '/img/placeholder-galeria.png'; 
                    e.target.alt = 'Imagen no disponible';
                  }}
                />
                <div className="foto-overlay">
                  <span className="foto-categoria">{foto.category}</span>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
      
      <div className="galeria-grid">
        {fotos.map((foto) => (
          <div key={`grid-${foto.id}`} className="grid-item">
            <img 
              src={foto.src} 
              alt={`Foto ${foto.id}`} 
              className="grid-imagen"
            />
            <div className="grid-overlay">
              <span className="grid-categoria">{foto.category}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default PPublicoGaleriaFotos;