import React, { useEffect, useState } from "react";
import { useDecryptToken } from "../App";

const modalStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  background: 'rgba(0,0,0,0.25)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1000
};

const boxStyle = {
  background: '#e9eff3',
  border: '2px solid #c7a740',
  borderRadius: '18px',
  padding: '28px 24px',
  minWidth: '350px',
  maxWidth: '95vw',
  boxShadow: '0 2px 16px rgba(0,0,0,0.10)'
};

const labelStyle = {
  fontWeight: 500,
  color: '#222',
  marginBottom: 4,
  marginTop: 10
};

const inputStyle = {
  width: '100%',
  padding: '8px 12px',
  border: '1.5px solid #c7a740',
  borderRadius: '12px',
  fontSize: '1rem',
  marginBottom: 8,
  background: '#fff',
  color: '#222',
  outline: 'none'
};

const textareaStyle = {
  ...inputStyle,
  minHeight: 60,
  resize: 'vertical'
};

const btnRowStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  gap: 12,
  marginTop: 12
};

const btnStyle = {
  flex: 1,
  padding: '10px 0',
  border: 'none',
  borderRadius: '12px',
  fontWeight: 'bold',
  fontSize: '1.1rem',
  cursor: 'pointer',
  background: '#e9bfc7',
  color: '#fff',
  margin: 0
};

const btnAddStyle = {
  ...btnStyle,
  background: '#e9bfc7',
  color: '#fff'
};
const btnCancelStyle = {
  ...btnStyle,
  background: '#e9bfc7',
  color: '#fff',
  opacity: 0.7
};

const VideoPopUp = ({ initialLink, onCancel, onAdd }) => {
  const [link, setLink] = useState(initialLink || "");
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");

  useEffect(() => {
    if (initialLink) {
      const id = initialLink.split('v=')[1];
      const token = useDecryptToken(localStorage.getItem('authToken'));
      const API_URL = import.meta.env.VITE_API_URL;
      fetch(`${API_URL}/api/youtube/video?id=${id}`, {
          method: 'GET',
          headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
          }
      }).then(res => res.json())
      .then(data => {
          setNombre(data.snippet.title);
          setDescripcion(data.snippet.description);
      })
    }
  },[]);

  const handleAdd = () => {
    if (link.trim() && nombre.trim()) {
      onAdd({ link, nombre, descripcion });
    }
  };

  return (
    <div style={modalStyle}>
      <div style={boxStyle}>
        <div style={{ marginBottom: 10, fontWeight: 600, color: '#c7a740', fontSize: '1.1rem' }}>
          Link: <span style={{ color: '#222', fontWeight: 400 }}>{link.length > 30 ? link.slice(0, 30) + '...' : link}</span>
        </div>
        <label style={labelStyle}>Nombre</label>
        <input
          style={inputStyle}
          type="text"
          value={nombre}
          onChange={e => setNombre(e.target.value)}
          placeholder="Nombre del video"
        />
        <label style={labelStyle}>Descripcion</label>
        <textarea
          style={textareaStyle}
          value={descripcion}
          onChange={e => setDescripcion(e.target.value)}
          placeholder="Descripción del video"
        />
        <div style={btnRowStyle}>
          <button type="button" style={btnCancelStyle} onClick={onCancel}>CANCELAR</button>
          <button type="button" style={btnAddStyle} onClick={handleAdd}>AGREGAR</button>
        </div>
      </div>
    </div>
  );
};

export default VideoPopUp;
