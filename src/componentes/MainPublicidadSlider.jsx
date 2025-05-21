import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../assets/scss/_03-Componentes/_MainPublicidadSlider.scss";

const MainPublicidadSlider = () => {
  const sliderSettings = {
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
    <div className="advertisement-container">
      <div className="advertisement-content">
        <div className="slider-row">
          <div className="slider-wrapper">
            <Slider {...sliderSettings}>
              {banners.map((banner, index) => (
                <div key={`banner-${index}`} className="slider-item">
                  <img
                    src={banner}
                    alt={`Banner ${index + 1}`}
                    className="advertisement-image"
                  />
                </div>
              ))}
            </Slider>
          </div>

          <div className="slider-wrapper">
            <Slider {...sliderSettings}>
              {[...banners].reverse().map((banner, index) => (
                <div key={`reverse-banner-${index}`} className="slider-item">
                  <img
                    src={banner}
                    alt={`Banner ${banners.length - index}`}
                    className="advertisement-image"
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