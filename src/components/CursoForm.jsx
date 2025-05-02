import React, { useState } from "react";
import "./PaqueteForm.css";

const CursoForm = () => {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [videoLink, setVideoLink] = useState("");
  const [videos, setVideos] = useState([]);
  const [linkPresentacion, setLinkPresentacion] = useState("");

  const handleAddVideo = () => {
    if (videoLink.trim() !== "") {
      setVideos([...videos, videoLink]);
      setVideoLink("");
    }
  };

  const handleRemoveVideo = (index) => {
    setVideos(videos.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí iría la lógica para crear el curso
    alert("Curso creado!");
  };

  return (
    <div className="paquete-form-container">
      <form className="paquete-form" onSubmit={handleSubmit}>
        <h2 className="paquete-form-title">
          <span className="paquete-form-title-main">NUEVO CURSO</span>
        </h2>
        <label className="paquete-form-label">Nombre</label>
        <input
          className="paquete-form-input"
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />
        <label className="paquete-form-label">Descripción</label>
        <textarea
          className="paquete-form-textarea"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          required
        />
        <label className="paquete-form-label">Link video:</label>
        <div className="paquete-form-cursos-select-row">
          <input
            className="paquete-form-input"
            type="url"
            placeholder="https://www.youtube.com/watch?"
            value={videoLink}
            onChange={(e) => setVideoLink(e.target.value)}
          />
          <button
            type="button"
            className="paquete-form-add-btn"
            onClick={handleAddVideo}
            title="Añadir video"
            style={{ color: '#6b1839', fontWeight: 'bold' }}
          >
            <span>＋</span>
          </button>
        </div>
        <div className="paquete-form-cursos-list">
          {videos.map((video, idx) => (
            <div className="paquete-form-curso-item" key={idx}>
              <span style={{ fontSize: '0.95rem' }}>Nombre video</span>
              <button
                type="button"
                className="paquete-form-remove-btn"
                onClick={() => handleRemoveVideo(idx)}
                title="Eliminar video"
              >
                <span>－</span>
              </button>
            </div>
          ))}
        </div>
        <label className="paquete-form-label">Link presentación</label>
        <input
          className="paquete-form-input"
          type="url"
          placeholder="https://www.youtube.com/watch?"
          value={linkPresentacion}
          onChange={(e) => setLinkPresentacion(e.target.value)}
        />
        <button className="paquete-form-submit" type="submit">
          Crear Curso
        </button>
      </form>
    </div>
  );
};

export default CursoForm;
