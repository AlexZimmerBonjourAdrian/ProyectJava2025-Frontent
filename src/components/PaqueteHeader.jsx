import React from "react";

const PaqueteHeader = ({ nombre, subtitulo, imagen, onAddToCart }) => (
  <div style={{ textAlign: 'center', marginBottom: 32 }}>
    <h1 style={{ fontFamily: 'Playfair Display, serif', fontWeight: 700, fontSize: 38, color: '#5a2236', margin: '0 0 0.2em 0' }}>{nombre}</h1>
    <div style={{ color: '#bfa046', fontWeight: 700, fontSize: 22, marginBottom: 18 }}>{subtitulo}</div>
    <div style={{ border: '3px solid #bfa046', borderRadius: 4, width: 420, height: 180, margin: '0 auto 24px auto', background: '#ddd', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {imagen ? <img src={imagen} alt="Imagen paquete" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 2 }} /> : <div style={{ width: '100%', height: '100%', color: '#aaa', fontSize: 32 }}>Imagen</div>}
    </div>
    <button onClick={onAddToCart} style={{ background: '#bfa046', color: '#fff', fontWeight: 700, fontSize: 20, border: 'none', borderRadius: 22, padding: '12px 36px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10, margin: '0 auto', boxShadow: '0 2px 8px rgba(191,160,70,0.10)' }}>
      <span role="img" aria-label="carrito">🛒</span> AÑADIR AL CARRITO <span role="img" aria-label="carrito">🛒</span>
    </button>
  </div>
);

export default PaqueteHeader; 