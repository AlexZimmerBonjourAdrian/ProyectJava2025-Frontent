import React from "react";

export default function ModuloItem({ titulo, descripcion, documento, onVer }) {
  return (
    <div style={{
      background: "#F29CA4",
      borderRadius: 24,
      padding: 24,
      display: "flex",
      alignItems: "center",
      marginBottom: 24,
    }}>
      <div style={{
        width: 100, height: 100, background: "#ddd", marginRight: 24, display: "flex", alignItems: "center", justifyContent: "center"
      }}>
        <span style={{ color: "#aaa" }}>IMG</span>
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ color: "#fff", fontWeight: "bold", fontSize: 18 }}>{titulo}</div>
        <div style={{ color: "#fff", fontSize: 14, marginBottom: 8 }}>{descripcion}</div>
        <div style={{ color: "#fff", fontSize: 14, borderBottom: "2px solid #5B2333", marginBottom: 8 }}>{documento}</div>
        <button
          onClick={onVer}
          style={{
            background: "#D6C16B",
            color: "#fff",
            border: "none",
            borderRadius: 20,
            padding: "8px 32px",
            fontWeight: "bold",
            fontSize: 16,
            float: "right"
          }}
        >
          IR A VER
        </button>
      </div>
    </div>
  );
} 