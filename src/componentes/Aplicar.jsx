import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick"; // Importa Slider
import "../assets/scss/_03-Componentes/_Aplicar.scss";

const Aplicar = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("TODOS");

  useEffect(() => {
    fetch("/aplicar.json")
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        console.log("Datos cargados:", data);
      })
      .catch((error) => console.error("Error al cargar los datos:", error));
  }, []);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setSearchTerm("");
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredData = data.filter((item) => {
    const matchesCategory =
      selectedCategory === "TODOS" || item.categoria === selectedCategory;
    const matchesSearchTerm =
      searchTerm === "" ||
      item.nombre.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesCategory && matchesSearchTerm;
  });

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 300, // Aumentar el valor para hacer la transición más lenta o disminuir para hacerla más rápida.
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true, // Para activar el autoplay
    autoplaySpeed: 2000, // Tiempo en milisegundos entre cada cambio (2 segundos)
  };
  
  return (
    <div className="aplica-data">
      <div className="aplica-search-filter-container">
        <div className="aplica-search-bar">
          <input
            type="text"
            placeholder="Buscar..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
      </div>

      {filteredData.length === 0 ? (
        <h4>No se encontraron resultados en la búsqueda. Verifique.</h4>
      ) : (
        <div className="aplica-data-container">
          {filteredData.map((item) => (
            <div key={item.id} className="aplica-data-item">
              <h3>
                <strong>{item.id} - </strong>
                <Link to={`/aplicar/${item.id}`}>{item.nombre}</Link>
              </h3>
              <Slider {...sliderSettings}>
                {item["imagenes slider"].map((imagen, index) => (
                  <div key={index}>
                    <img
                      src={imagen}
                      className="aplica-image"
                      alt={`${item.nombre} ${index + 1}`}
                    />
                  </div>
                ))}
              </Slider>
              <table>
                <tbody>
                  <tr>
                    <td><strong>Categoría:</strong></td>
                    <td>{item.categoria}</td>
                  </tr>
                  <tr>
                    <td><strong>Tipo:</strong></td>
                    <td>{item.tipo}</td>
                  </tr>
                  <tr>
                    <td><strong>Precio:</strong></td>
                    <td>{item.precio}</td>
                  </tr>
                  <tr>
                    <td><strong>Complejidad:</strong></td>
                    <td>{item.complejidad}</td>
                  </tr>
                  <tr>
                    <td><strong>Finalizados:</strong></td>
                    <td>{item.finalizados}</td>
                  </tr>
                  <tr>
                    <td><strong>Comentarios:</strong></td>
                    <td>
                      <ul>
                        {item.comentarios.map((comentario, index) => (
                          <li key={index}>{comentario}</li>
                        ))}
                      </ul>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Aplicar;
