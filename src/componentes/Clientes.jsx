import React, { useState, useEffect } from "react";
import "../assets/scss/_03-Componentes/_Clientes.scss";

const Clientes = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("TODOS");

  useEffect(() => {
    fetch("/clientes1.json")
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

  return (
    <div className="clientes-data">
      <div className="clientes-search-filter-container">
        <div className="clientes-filters">
          <div className="clientes-category-buttons">
            {/* Si decides agregar los botones de categoría nuevamente */}
          </div>
        </div>

        <div className="clientes-search-bar">
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
        <div className="clientes-data-container">
          {filteredData.map((item) => (
            <div key={item.id} className="clientes-data-item">
              <h3>
                <strong>{item.id} - </strong>
                {item.nombre.toLowerCase()}
              </h3>
              <img
                src={item["imagen portada"]}
                className="clientes-image"
                alt={item.nombre}
              />
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
                    <td><strong>Recomendación:</strong></td>
                    <td>{item.recomendacion}</td>
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
                  <tr>
                    <td><strong>Sitio Web:</strong></td>
                    <td>
                      <a href={item.sitio_web} target="_blank" rel="noopener noreferrer">
                        {item.sitio_web}
                      </a>
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

export default Clientes;
