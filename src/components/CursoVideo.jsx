import React from "react";

export default function CursoVideo({ 
  nombre = "NOMBRE DEL CURSO", 
  descripcion = "Descripcion del curso Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut congue massa ipsum, quis placerat mauris luctus vel. Maecenas ut felis vel orci ultrices",
  videoPresentacion,
  isCompletado = false 
}) {
  const getContainerStyle = () => {
    const baseStyle = {
      textAlign: "center", 
      marginBottom: 24,
      padding: "20px",
      borderRadius: "12px"
    };

    if (isCompletado) {
      return {
        ...baseStyle,
        background: "linear-gradient(135deg, #d4edda 0%, #c3e6cb 100%)",
        border: "3px solid #28a745"
      };
    }

    return baseStyle;
  };

  const getVideoBorderStyle = () => {
    return {
      border: isCompletado ? "3px solid #28a745" : "3px solid #D6C16B",
      margin: "24px auto", 
      width: 500, 
      height: 250, 
      display: "flex", 
      alignItems: "center", 
      justifyContent: "center", 
      background: "#ddd"
    };
  };

  return (
    <section style={getContainerStyle()}>
      <h1 style={{ fontWeight: "bold", fontSize: 36, color: "#5B2333" }}>{nombre}</h1>
      <h2 style={{ color: "#D6C16B", fontWeight: "bold", fontSize: 20 }}>CURSO</h2>
      <div style={getVideoBorderStyle()}>
        {videoPresentacion ? (
          <video width="100%" height="100%" controls style={{ objectFit: "cover" }}>
            <source src={videoPresentacion} type="video/mp4" />
            Tu navegador no soporta el video.
          </video>
        ) : (
          <div style={{ width: 0, height: 0, borderLeft: "40px solid white", borderTop: "25px solid transparent", borderBottom: "25px solid transparent" }} />
        )}
      </div>
      <p style={{ color: "#5B2333", fontWeight: 500, fontSize: 16, maxWidth: 700, margin: "0 auto" }}>
        {descripcion}
      </p>
      {isCompletado && (
        <div style={{ 
          marginTop: "16px", 
          padding: "8px 16px", 
          background: "#28a745", 
          color: "white", 
          borderRadius: "20px", 
          display: "inline-block",
          fontWeight: "bold"
        }}>
          ✓ CURSO TERMINADO
        </div>
      )}
    </section>
  );
} 