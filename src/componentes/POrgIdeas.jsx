import React from 'react';
import "../assets/scss/_03-Componentes/_POrgIdeas.scss";

const IDEAS_DATA = {
  categories: [
    {
      id: 'decoracion',
    
      ideas: [
        {
          title: 'Centros de mesa interactivos',
          description: 'Mesas con pantallas táctiles donde los invitados pueden dejar mensajes para la pareja o jugar juegos durante la recepción',
          image: '/images/ideas/centro-mesa-interactivo.jpg',
          cost: 'medium',
          complexity: 'high'
        },
        {
          title: 'Proyector con fotos',
          description: 'Proyector que muestra una presentación continua de fotos de la pareja durante diferentes etapas de su relación',
          image: '/images/ideas/proyector-fotos.jpg',
          cost: 'low',
          complexity: 'medium'
        },
        {
          title: 'Arco floral con luces LED',
          description: 'Arco floral para la ceremonia con luces LED programables que cambian de color según el momento del evento',
          image: '/images/ideas/arco-led.jpg',
          cost: 'high',
          complexity: 'medium'
        }
      ]
    },
    {
      id: 'entretenimiento',
   
      ideas: [
        {
          title: 'Pantalla interactiva para mensajes',
          description: 'Pantalla grande donde los invitados pueden enviar mensajes y fotos en tiempo real que se muestran durante la recepción',
          image: '/images/ideas/pantalla-interactiva.jpg',
          cost: 'medium',
          complexity: 'medium'
        },
        {
          title: 'Estación de fotos con props',
          description: 'Rincón fotográfico con accesorios temáticos y fondo personalizado para fotos divertidas',
          image: '/images/ideas/foto-props.jpg',
          cost: 'low',
          complexity: 'low'
        },
        {
          title: 'Juegos personalizados',
          description: 'Juegos de trivia sobre la pareja o bingo con momentos especiales de su relación',
          image: '/images/ideas/juegos-personalizados.jpg',
          cost: 'low',
          complexity: 'medium'
        }
      ]
    },
    {
      id: 'detalles',
 
      ideas: [
        {
          title: 'Souvenirs personalizados',
          description: 'Plantas o semillas con el nombre de la pareja y fecha de la boda para que los invitados cultiven en casa',
          image: '/images/ideas/souvenirs-plantas.jpg',
          cost: 'medium',
          complexity: 'low'
        },
        {
          title: 'Menú con historia',
          description: 'Menú que cuenta la historia de la relación a través de los platillos, cada uno representando un momento importante',
          image: '/images/ideas/menu-historia.jpg',
          cost: 'low',
          complexity: 'high'
        },
        {
          title: 'Libro de firmas digital',
          description: 'Tablet o pantalla donde los invitados pueden dejar mensajes y tomar fotos instantáneas que se guardan automáticamente',
          image: '/images/ideas/libro-digital.jpg',
          cost: 'high',
          complexity: 'medium'
        }
      ]
    },
    {
      id: 'tecnologia',

      ideas: [
        {
          title: 'Hashtag personalizado',
          description: 'Crear un hashtag único para redes sociales y mostrar fotos de los invitados en tiempo real durante la recepción',
          image: '/images/ideas/hashtag.jpg',
          cost: 'low',
          complexity: 'low'
        },
        {
          title: 'Streaming para invitados',
          description: 'Transmisión en vivo para invitados que no puedan asistir físicamente a la ceremonia',
          image: '/images/ideas/streaming.jpg',
          cost: 'medium',
          complexity: 'medium'
        },
        {
          title: 'Aplicación móvil',
          description: 'App con información de la boda, itinerario, mapa del lugar y opción para confirmar asistencia',
          image: '/images/ideas/app-boda.jpg',
          cost: 'high',
          complexity: 'high'
        }
      ]
    }
  ]
};

function POrgIdeas() {
  return (
    <div className="pantalla-organizacion">
      <div className="contenedor-organizacion">
        <div className="contenido-pestana">
          <div className="ideas-container">
            <div className="encabezado-boda">
              <h1>Ideas</h1>
           
          
            </div>
            
            {IDEAS_DATA.categories.map(category => (
              <div key={category.id} className="category-section">
                <h3>{category.name}</h3>
                <div className="ideas-grid">
                  {category.ideas.map((idea, index) => (
                    <div key={index} className="idea-card">
                      <div className="idea-image">
                        <img src={idea.image} alt={idea.title} />
                      </div>
                      <div className="idea-content">
                        <h4>{idea.title}</h4>
                        <p>{idea.description}</p>
                        <div className="idea-meta">
                          <span className={`cost ${idea.cost}`}>
                            {idea.cost === 'low' ? '$ Bajo costo' : 
                             idea.cost === 'medium' ? '$$ Costo medio' : '$$$ Alto costo'}
                          </span>
                          <span className={`complexity ${idea.complexity}`}>
                            {idea.complexity === 'low' ? 'Fácil implementación' : 
                             idea.complexity === 'medium' ? 'Media complejidad' : 'Alta complejidad'}
                          </span>
                        </div>
                  
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
            
    
          </div>
        </div>
      </div>
    </div>
  );
}

export default POrgIdeas;