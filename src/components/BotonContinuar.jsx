import React from "react";

export default function BotonContinuar({ onClick, style, children }) {
  return (
    <button
      onClick={onClick}
      style={{
        background: "#D6C16B",
        color: "#fff",
        border: "none",
        borderRadius: 20,
        padding: "10px 32px",
        fontWeight: "bold",
        fontSize: 16,
        margin: "16px 0",
        ...style,
      }}
    >
      {children || "CONTINUAR DESDE DONDE LO DEJE"}
    </button>
  );
} 