import React, { useState } from "react";
import "./PaqueteForm.css";

const styles = {
  addButton: {
    color: '#6b1839',
    fontWeight: 'bold'
  },
  removeButton: {
    color: '#6b1839',
    fontWeight: 'bold'
  },
  submitButton: {
    background: '#c7a740',
    color: '#fff'
  }
};

const cursosMock = [
  {
    id: 1,
    nombre: "Curso de React",
    descripcion: "Aprende React desde cero.",
    videos: [
      { link: "https://www.youtube.com/watch?v=react1", nombre: "Intro React" }
    ],
    linkPresentacion: "https://www.youtube.com/watch?v=reactIntro"
  },
  {
    id: 2,
    nombre: "Curso de Node.js",
    descripcion: "Aprende Node.js desde cero.",
    videos: [
      { link: "https://www.youtube.com/watch?v=node1", nombre: "Intro Node" }
    ],
    linkPresentacion: "https://www.youtube.com/watch?v=nodeIntro"
  }
];

const CursoModificarForm = () => {
  const [cursoSeleccionado, setCursoSeleccionado] = useState("");
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [videoLink, setVideoLink] = useState("");
  const [videos, setVideos] = useState([]);
  const [videoNombre, setVideoNombre] = useState("");
  const [linkPresentacion, setLinkPresentacion] = useState("");

  const handleSelectCurso = (e) => {
    const id = e.target.value;
    setCursoSeleccionado(id);
    const curso = cursosMock.find(c => c.id.toString() === id);
    if (curso) {
      setNombre(curso.nombre);
      setDescripcion(curso.descripcion);
      setVideos(curso.videos);
      setLinkPresentacion(curso.linkPresentacion);
    } else {
      setNombre("");
      setDescripcion("");
      setVideos([]);
      setLinkPresentacion("");
    }
    setVideoLink("");
    setVideoNombre("");
  };

  const handleAddVideo = () => {
    if (videoLink.trim() && videoNombre.trim()) {
      setVideos([...videos, { link: videoLink, nombre: videoNombre }]);
      setVideoLink("");
      setVideoNombre("");
    }
  };

  const handleRemoveVideo = (index) => {
    setVideos(videos.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí iría la lógica para modificar el curso
    alert("Curso modificado!");
  };

  return (
    <div className="paquete-form-container">
      <form className="paquete-form" onSubmit={handleSubmit}>
        <h2 className="paquete-form-title">
          <span className="paquete-form-title-main">MODIFICAR CURSO</span>
        </h2>
        <label className="paquete-form-label">Seleccionar curso</label>
        <select
          className="paquete-form-input"
          value={cursoSeleccionado}
          onChange={handleSelectCurso}
        >
          <option value="">Selecciona un curso</option>
          {cursosMock.map((c) => (
            <option key={c.id} value={c.id}>{c.nombre}</option>
          ))}
        </select>
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
            style={styles.addButton}
          >
            <span>＋</span>
          </button>
          <button
            type="button"
            className="paquete-form-remove-btn"
            onClick={() => setVideoLink('')}
            title="Limpiar campo video"
            style={styles.removeButton}
          >
            <span>－</span>
          </button>
        </div>
        <input
          className="paquete-form-input"
          type="text"
          placeholder="Nombre video"
          value={videoNombre}
          onChange={(e) => setVideoNombre(e.target.value)}
        />
        <div className="paquete-form-cursos-list">
          {videos.map((video, idx) => (
            <div className="paquete-form-curso-item" key={idx}>
              <span>{video.nombre}</span>
              <button
                type="button"
                className="paquete-form-remove-btn"
                onClick={() => handleRemoveVideo(idx)}
                title="Eliminar video"
                style={styles.removeButton}
              >
                <span>−</span>
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
        <button className="paquete-form-submit" type="submit" style={styles.submitButton}>
          MODIFICAR
        </button>
      </form>
    </div>
  );
};

export default CursoModificarForm;
