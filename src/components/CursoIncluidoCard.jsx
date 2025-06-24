import React from "react";

const CursoIncluidoCard = ({ nombre, descripcion, imagen, onInfo, id, isVisto }) => {
  const defaultImage = `https://picsum.photos/seed/${id || nombre || 'curso'}/300/200`;
  const finalImage = imagen || defaultImage;

  const getButtonText = () => {
    if (isVisto) {
      return "RETOMAR VIDEO";
    }
    return "COMENZAR VIDEO";
  };

  const getButtonStyle = () => {
    const baseStyle = {
      fontWeight: 700,
      fontSize: 16,
      border: 'none',
      borderRadius: 22,
      padding: '8px 28px',
      cursor: 'pointer',
      float: 'right',
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      boxShadow: '0 2px 8px rgba(255,224,102,0.10)'
    };

    if (isVisto) {
      return {
        ...baseStyle,
        background: '#4ade80', // Verde para videos vistos
        color: '#fff'
      };
    }
    
    return {
      ...baseStyle,
      background: '#ffe066',
      color: '#5a2236'
    };
  };

  return (
    <div style={{ background: '#e98fae', borderRadius: 32, display: 'flex', alignItems: 'center', padding: 24, marginBottom: 28, boxShadow: '0 2px 12px rgba(233,143,174,0.10)' }}>
      <div style={{ width: 110, height: 110, background: '#ddd', borderRadius: 12, marginRight: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
        <img 
            src={finalImage} 
            alt={nombre || 'Imagen del curso'} 
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            onError={(e) => { e.target.onerror = null; e.target.src = defaultImage; }}
        />
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontWeight: 700, fontSize: 22, color: '#fff', marginBottom: 6 }}>{nombre}</div>
        <div style={{ color: '#fff', fontSize: 15, marginBottom: 10 }}>{descripcion}</div>
        <button onClick={onInfo} style={getButtonStyle()}>
          {getButtonText()} <span style={{ fontSize: 18, marginLeft: 4 }}>→</span>
        </button>
      </div>
    </div>
  );
};

export default CursoIncluidoCard; 