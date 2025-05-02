import React from "react";

export default function CursoVideo() {
  return (
    <section style={{ textAlign: "center", marginBottom: 24 }}>
      <h1 style={{ fontWeight: "bold", fontSize: 36, color: "#5B2333" }}>NOMBRE DEL CURSO</h1>
      <h2 style={{ color: "#D6C16B", fontWeight: "bold", fontSize: 20 }}>CURSO</h2>
      <div style={{ border: "3px solid #D6C16B", margin: "24px auto", width: 500, height: 250, display: "flex", alignItems: "center", justifyContent: "center", background: "#ddd" }}>
        <div style={{ width: 0, height: 0, borderLeft: "40px solid white", borderTop: "25px solid transparent", borderBottom: "25px solid transparent" }} />
      </div>
      <p style={{ color: "#5B2333", fontWeight: 500, fontSize: 16, maxWidth: 700, margin: "0 auto" }}>
        Descripcion del curso Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut congue massa ipsum, quis placerat mauris luctus vel. Maecenas ut felis vel orci ultrices
      </p>
    </section>
  );
} 