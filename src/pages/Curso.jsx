import React from "react";
import CursoHeader from "../components/CursoHeader";
import CursoVideo from "../components/CursoVideo";
import BotonContinuar from "../components/BotonContinuar";
import ModuloLista from "../components/ModuloLista";
import Footer from "../components/Footer";
import "../styles/global.css";
import "./Curso.css";

export default function Curso() {
  return (
    <div className="curso-container">
      
      <CursoVideo />
      <BotonContinuar />
      <ModuloLista />
      <div className="curso-section">
        <BotonContinuar className="curso-button" />
      </div>
      <Footer />
    </div>
  );
}
