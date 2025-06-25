import React from "react";

export default function BotonContinuar({ onClick, style, children, className = "" }) {
  const baseStyle = {
    background: "#D6C16B",
    color: "#fff",
    border: "none",
    borderRadius: 20,
    padding: "10px 32px",
    fontWeight: "bold",
    fontSize: 16,
    margin: "16px 0",
    ...style,
  };

  return (
    <button
      onClick={onClick}
      className={className}
      style={baseStyle}
    >
      {children || "CONTINUAR DESDE DONDE LO DEJE"}
    </button>
  );
} 