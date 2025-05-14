import React, { useState } from "react";
import "../assets/scss/_03-Componentes/_PPublico.scss";
import PPublicoMensajes from "./PPublicoMensajes";
import PPublicoLiveStream from "./PPublicoLiveStream";
import PPublicoContadorDias from "./PPublicoContadorDias";
import PPublicoNuestraHistoria from "./PPublicoNuestraHistoria";
import PPublicoNovedades from "./PPublicoNovedades";
import PPublicoGaleriaFotosHome from "./PPublicoGaleriaFotosHome";
import PPublicoQrSocialPost from "./PPublicoQrSocialPost";
import PPublicoCabinaFotografica from "./PPublicoCabinaFotografica";

function PPublico() {
  const [showCabinaFullscreen, setShowCabinaFullscreen] = useState(false);

  return (
    <div className="public-container">
      {showCabinaFullscreen ? (
        <PPublicoCabinaFotografica 
          onClose={() => setShowCabinaFullscreen(false)} 
          fullscreenMode={true}
        />
      ) : (
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
            <PPublicoQrSocialPost />
            <PPublicoLiveStream />

            <div className="cabina-button-container">
              <button 
                className="cabina-button"
                onClick={() => setShowCabinaFullscreen(true)}
              >
                <i className="bi bi-camera-fill"></i>
                <span>Cabina Fotográfica</span>
              </button>
            </div>
          </div>
        </main>
      )}
    </div>
  );
}

export default PPublico;