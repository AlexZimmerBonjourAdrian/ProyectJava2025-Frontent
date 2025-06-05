import React from "react";
import "../styles/global.css";
import "./CursoHeader.css";

export default function CursoHeader() {
  return (
    <header className="curso-header">
      <div>
        <span className="curso-logo">SOL FUENTES</span>
      </div>
      <div>
        <button className="curso-nav-buttons">←</button>
        <button className="curso-nav-buttons">⌂</button>
      </div>
    </header>
  );
} 