import React from "react";
import "../assets/scss/_03-Componentes/_PPublico.scss";
import PPublicoMensajes from "./PPublicoMensajes";
import PPublicoLiveStream from "./PPublicoLiveStream";
import PPublicoContadorDias from "./PPublicoContadorDias";
import PPublicoNuestraHistoria from "./PPublicoNuestraHistoria";
import PPublicoNovedades from "./PPublicoNovedades";
import PPublicoGaleriaFotosHome from "./PPublicoGaleriaFotosHome";

function PPublico() {
  return (
    <div className="public-container">
      <main className="wedding-journal">
        <header className="journal-header">
        <PPublicoContadorDias />
        </header>

        <div className="journal-content">
        

          <PPublicoGaleriaFotosHome />
          <PPublicoNuestraHistoria />
          <PPublicoNovedades />
          <PPublicoLiveStream />

          <section className="compact-messages">
            <h2>Deja tu mensaje para los novios</h2>
            <PPublicoMensajes compact={true} />
          </section>
        </div>
      </main>
    </div>
  );
}

export default PPublico;