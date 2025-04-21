import React, { useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import "../assets/scss/_03-Componentes/_AplicaPersonaliza2.scss";

const AplicaPersonaliza2 = () => {
  const [imagenes, setImagenes] = useState([]);
  const [imagenSeleccionada, setImagenSeleccionada] = useState(null);
  const [modelo3D, setModelo3D] = useState(null);

  useEffect(() => {
    const fetchImagenes = async () => {
      try {
        const response = await fetch('/aplicaPersonaliza2.json');
        const data = await response.json();
        setImagenes(data.imagenes);
        
        // Establecer la imagen seleccionada por defecto
        if (data.imagenes && data.imagenes.length > 0) {
          setImagenSeleccionada(data.imagenes[0].caras);
        }
      } catch (error) {
        console.error('Error al cargar las imágenes:', error);
      }
    };
    fetchImagenes();
  }, []);

  // Cargar texturas de imágenes PNG
  const cargarTextura = (url) => new THREE.TextureLoader().load(url);

  // Cargar modelo OBJ
  const cargarModelo = (url) => {
    const loader = new OBJLoader();
    loader.load(url, (obj) => {
      setModelo3D(obj);
    }, undefined, (error) => {
      console.error('Error al cargar el modelo:', error);
    });
  };

  const RotatingBox = () => {
    const cuboRef = React.useRef();

    useFrame(() => {
      if (cuboRef.current) {
        cuboRef.current.rotation.y += 0.005;
      }
    });

    return (
      <mesh ref={cuboRef} castShadow receiveShadow>
        <boxGeometry args={[3, 3, 3]} />
        <meshPhysicalMaterial
          attach="material-0"
          map={cargarTextura(imagenSeleccionada.frente)}
          transparent
          opacity={0.9}
          roughness={0.4}
          metalness={0.3}
          clearcoat={1}
        />
        <meshPhysicalMaterial
          attach="material-1"
          map={cargarTextura(imagenSeleccionada.atras)}
          transparent
          opacity={0.9}
          roughness={0.4}
          metalness={0.3}
          clearcoat={1}
        />
        <meshPhysicalMaterial
          attach="material-2"
          map={cargarTextura(imagenSeleccionada.izquierda)}
          transparent
          opacity={0.9}
          roughness={0.4}
          metalness={0.3}
          clearcoat={1}
        />
        <meshPhysicalMaterial
          attach="material-3"
          map={cargarTextura(imagenSeleccionada.derecha)}
          transparent
          opacity={0.9}
          roughness={0.4}
          metalness={0.3}
          clearcoat={1}
        />
        <meshPhysicalMaterial
          attach="material-4"
          map={cargarTextura(imagenSeleccionada.arriba)}
          transparent
          opacity={0.9}
          roughness={0.4}
          metalness={0.3}
          clearcoat={1}
        />
        <meshPhysicalMaterial
          attach="material-5"
          map={cargarTextura(imagenSeleccionada.abajo)}
          transparent
          opacity={0.9}
          roughness={0.4}
          metalness={0.3}
          clearcoat={1}
        />
      </mesh>
    );
  };

  return (
    <div className="aplica-personaliza2-container">
      <h1 className="aplica-personaliza2-title">Visualización 3D de la Cartera</h1>

      {modelo3D ? (
        <div className="canvas-container">
          <Canvas shadows>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={0.8} castShadow />
            <spotLight position={[-5, 5, 10]} angle={0.3} penumbra={0.2} intensity={1} castShadow />

            {/* Renderizar el modelo 3D */}
            <primitive object={modelo3D} />

            <OrbitControls enableZoom={false} />
          </Canvas>
        </div>
      ) : (
        imagenSeleccionada && (
          <div className="canvas-container">
            <Canvas shadows>
              <ambientLight intensity={0.5} />
              <pointLight position={[10, 10, 10]} intensity={0.8} castShadow />
              <spotLight position={[-5, 5, 10]} angle={0.3} penumbra={0.2} intensity={1} castShadow />

              {/* Componente del cubo con animación de rotación */}
              <RotatingBox />

              <OrbitControls enableZoom={false} />
            </Canvas>
          </div>
        )
      )}

<div className="image-selector">
        <h3>Selecciona otra imagen:</h3>
        {imagenes.map((imagen) => (
          <button
            key={imagen.id}
            onClick={() => {
              setImagenSeleccionada(imagen.caras);
              cargarModelo(imagen.modelo); // Cargar el modelo desde el JSON
            }}
            className={`image-button ${imagenSeleccionada === imagen.caras ? 'selected' : ''}`}
          >
            {imagen.nombre}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AplicaPersonaliza2;
