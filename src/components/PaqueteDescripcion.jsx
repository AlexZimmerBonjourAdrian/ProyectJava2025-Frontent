import React from "react";

const PaqueteDescripcion = ({ descripcion }) => (
  <div style={{ background: '#5a2236', color: '#fff', padding: '32px 0 24px 0', margin: '32px 0 0 0' }}>
    <div style={{ maxWidth: 800, margin: '0 auto' }}>
      <div style={{ color: '#ffe066', fontWeight: 700, fontSize: 20, marginBottom: 8, letterSpacing: 1 }}>DESCRIPCIÓN</div>
      <div style={{ fontSize: 17, lineHeight: 1.6 }}>{descripcion}</div>
    </div>
  </div>
);

export default PaqueteDescripcion; 