import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../assets/scss/_03-Componentes/_MainPublicidadSlider.scss";

const MainPublicidadSlider = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  };

  const banners = [
    "/img/03-img-banners/banner1.png",
    "/img/03-img-banners/banner2.png",
    "/img/03-img-banners/banner3.png",
    "/img/03-img-banners/banner4.png",
    "/img/03-img-banners/banner5.png",
    ];

  return (
    <div className="gridPadrePublicidad1">
      <div className="publicidad-grid-contenedor">
        <div className="publicidad-grid fila-publicidad">
          <div className="publicidad-container">
            <Slider {...settings}>
              {banners.map((banner, index) => (
                <div key={index} className="slide-item">
                  <img
                    src={banner}
                    alt={`Banner ${index + 1}`}
                    className="imagen-publicidad objetoCentrado1"
                  />
                </div>
              ))}
            </Slider>
          </div>
          <div className="publicidad-container">
            <Slider {...settings}>
              {banners
                .slice()
                .reverse()
                .map((banner, index) => (
                  <div key={index} className="slide-item">
                    <img
                      src={banner}
                      alt={`Banner ${banners.length - index}`}
                      className="imagen-publicidad objetoCentrado1"
                    />
                  </div>
                ))}
            </Slider>
          </div>
        </div>

       
      </div>
    </div>
  );
};

export default MainPublicidadSlider;
