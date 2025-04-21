import React from 'react';

const GeneradorImagenes = () => {
  const bases = ['base1', 'base2', 'base3', 'base4', 'base5'];
  const colores = ['color1', 'color2', 'color3', 'color4'];
  const texturas = ['textura1', 'textura2', 'textura3'];
  const materiales = ['cuero', 'sintético', 'tela', 'nylon'];

  const generarNombresImagenes = () => {
    const nombres = [];

    bases.forEach(base => {
      colores.forEach(color => {
        texturas.forEach(textura => {
          materiales.forEach(material => {
            nombres.push(`${base}-${color}-${textura}-${material}.jpeg`);
          });
        });
      });
    });

    // Crear un archivo de texto con los nombres
    const blob = new Blob([nombres.join('\n')], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'nombres_imagenes.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div>
      <h1>Generador de Nombres de Imágenes</h1>
      <button onClick={generarNombresImagenes}>Generar Nombres</button>
    </div>
  );
};

export default GeneradorImagenes;
