import React from "react";
import "../assets/scss/_03-Componentes/_PPublico.scss";
import PPublicoMensajes from "./PPublicoMensajes";
import PPublicoLiveStream from "./PPublicoLiveStream";
import PPublicoContadorDias from "./PPublicoContadorDias";
import PPublicoNuestraHistoria from "./PPublicoNuestraHistoria";
import PPublicoNovedades from "./PPublicoNovedades"; // Cambiado para coincidir con la exportación
import PPublicoGaleriaFotosHome from "./PPublicoGaleriaFotosHome";

function PPublico() {
  return (
    <div className="public-container">
      <main className="wedding-journal">
        <header className="journal-header">
          <PPublicoContadorDias />
        </header>

        <div className="journal-content">
        

        
     
          <PPublicoNovedades />
          <section className="compact-messages">
            <PPublicoMensajes compact={true} />
          </section>
          <PPublicoGaleriaFotosHome />
          <PPublicoNuestraHistoria />
          <PPublicoLiveStream />
        </div>
      </main>
    </div>
  );
}

export default PPublico;