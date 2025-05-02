import React from "react";
import CursoHeader from "../components/CursoHeader";
import CursoVideo from "../components/CursoVideo";
import BotonContinuar from "../components/BotonContinuar";
import ModuloLista from "../components/ModuloLista";
import Footer from "../components/Footer";

export default function Curso() {
  return (
    <div style={{ background: "#eaf0f1", minHeight: "100vh", padding: 24 }}>
      <CursoHeader />
      <CursoVideo />
      <BotonContinuar />
      <ModuloLista />
      <div style={{ background: "#5B2333", borderRadius: 20, padding: 24, margin: "32px 0" }}>
        <BotonContinuar style={{ background: "#F29CA4", color: "#5B2333" }} />
      </div>
      <Footer />
    </div>
  );
}
