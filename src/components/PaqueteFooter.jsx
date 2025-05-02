import React from "react";

const PaqueteFooter = ({ onAddToCart }) => (
  <div style={{ textAlign: 'center', margin: '40px 0 0 0' }}>
    <button onClick={onAddToCart} style={{ background: '#5a2236', color: '#fff', fontWeight: 700, fontSize: 20, border: 'none', borderRadius: 22, padding: '12px 36px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10, margin: '0 auto 18px auto', boxShadow: '0 2px 8px rgba(90,34,54,0.10)' }}>
      <span role="img" aria-label="carrito">🛒</span> AÑADIR AL CARRITO <span role="img" aria-label="carrito">🛒</span>
    </button>
    <div style={{ color: '#5a2236', fontFamily: 'serif', fontSize: 15, marginTop: 10 }}>
      © Solariana 2025
    </div>
  </div>
);

export default PaqueteFooter; 