import React from "react";

const CursoIncluidoCard = ({ nombre, descripcion, imagen, onInfo }) => (
  <div style={{ background: '#e98fae', borderRadius: 32, display: 'flex', alignItems: 'center', padding: 24, marginBottom: 28, boxShadow: '0 2px 12px rgba(233,143,174,0.10)' }}>
    <div style={{ width: 110, height: 110, background: '#ddd', borderRadius: 12, marginRight: 28, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {imagen ? <img src={imagen} alt="Imagen curso" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 10 }} /> : <div style={{ width: '100%', height: '100%', color: '#aaa', fontSize: 22 }}>Imagen</div>}
    </div>
    <div style={{ flex: 1 }}>
      <div style={{ fontWeight: 700, fontSize: 22, color: '#fff', marginBottom: 6 }}>{nombre}</div>
      <div style={{ color: '#fff', fontSize: 15, marginBottom: 10 }}>{descripcion}</div>
      <button onClick={onInfo} style={{ background: '#ffe066', color: '#5a2236', fontWeight: 700, fontSize: 16, border: 'none', borderRadius: 22, padding: '8px 28px', cursor: 'pointer', float: 'right', display: 'flex', alignItems: 'center', gap: 8, boxShadow: '0 2px 8px rgba(255,224,102,0.10)' }}>
        MÁS INFO <span style={{ fontSize: 18, marginLeft: 4 }}>→</span>
      </button>
    </div>
  </div>
);

export default CursoIncluidoCard; 