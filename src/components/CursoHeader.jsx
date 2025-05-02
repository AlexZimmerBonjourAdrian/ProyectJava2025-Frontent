import React from "react";

export default function CursoHeader() {
  return (
    <header style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 32 }}>
      <div>
        <span style={{ color: "#D6C16B", fontWeight: "bold", fontSize: 28, fontFamily: "serif" }}>SOL FUENTES</span>
      </div>
      <div>
        <button style={{ background: "none", border: "none", fontSize: 24, marginRight: 16 }}>←</button>
        <button style={{ background: "none", border: "none", fontSize: 24 }}>⌂</button>
      </div>
    </header>
  );
} 