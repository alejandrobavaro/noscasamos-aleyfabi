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
    { id: 1, src: "/img/06-img-galeria3/id1-c1.png", category: "" },
    { id: 2, src: "/img/06-img-galeria3/id2-c2.png", category: "" },
    { id: 3, src: "/img/06-img-galeria3/id3-c3.png", category: "" },
    { id: 4, src: "/img/06-img-galeria3/id4-c4.png", category: "" },
    { id: 5, src: "/img/06-img-galeria3/id5-c5.png", category: "" },
    { id: 6, src: "/img/06-img-galeria3/id6-c6.png", category: "" },
    { id: 7, src: "/img/06-img-galeria3/id7-c7.png", category: "" },
    { id: 8, src: "/img/06-img-galeria3/id8-c8.png", category: "" },
    { id: 9, src: "/img/06-img-galeria3/id9-c9.png", category: "" },
    { id: 10, src: "/img/06-img-galeria3/id10-c10.png", category: "" },
    { id: 11, src: "/img/06-img-galeria3/id11-c11.png", category: ""},
    { id: 12, src: "/img/06-img-galeria3/id12-c12.png", category: "" },
    { id: 13, src: "/img/06-img-galeria3/id13-c13.png", category: "" },
    { id: 14, src: "/img/06-img-galeria3/id14-c14.png", category: "" },
    { id: 15, src: "/img/06-img-galeria3/id15-c15.png", category: "" },
    { id: 16, src: "/img/06-img-galeria3/id16-c16.png", category: "" },
    { id: 17, src: "/img/06-img-galeria3/id17-c17.png", category: "" },
    { id: 18, src: "/img/06-img-galeria3/id18-c18.png", category: "" },
    { id: 19, src: "/img/06-img-galeria3/id19-c19.png", category: "" },
    { id: 20, src: "/img/06-img-galeria3/id20-c20.png", category: "" },
  ]);

  // Efecto para cargar imágenes dinámicamente (opcional)
  useEffect(() => {
    // Aquí podrías cargar las imágenes desde una API si lo necesitas
    // Ejemplo:
    // fetch('/api/fotos').then(res => res.json()).then(data => setFotos(data));
  }, []);

  return (
    <section className="galeria-fotos">
   
      
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
      
      {/* <div className="galeria-grid">
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
      </div> */}
    </section>
  );
}

export default PPublicoGaleriaFotos;