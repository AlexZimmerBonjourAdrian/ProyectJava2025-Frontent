import React, { useState } from "react";
import "./PaqueteForm.css";

const PaqueteForm = () => {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [cursoSeleccionado, setCursoSeleccionado] = useState("");
  const [cursos, setCursos] = useState([]);
  const [link, setLink] = useState("");

  const handleAddCurso = () => {
    if (cursoSeleccionado && !cursos.includes(cursoSeleccionado)) {
      setCursos([...cursos, cursoSeleccionado]);
      setCursoSeleccionado("");
    }
  };

  const handleRemoveCurso = (index) => {
    setCursos(cursos.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí iría la lógica para crear el paquete
    alert("Paquete creado!");
  };

  // Simulación de cursos disponibles
  const cursosDisponibles = [
    "Curso de React",
    "Curso de Node.js",
    "Curso de CSS",
    "Curso de JavaScript"
  ];

  return (
    <div className="paquete-form-container">
      <form className="paquete-form" onSubmit={handleSubmit}>
        <h2 className="paquete-form-title">
          <span className="paquete-form-title-main">NUEVO PAQUETE</span>
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
        <label className="paquete-form-label">Cursos</label>
        <div className="paquete-form-cursos-select-row">
          <select
            className="paquete-form-select"
            value={cursoSeleccionado}
            onChange={(e) => setCursoSeleccionado(e.target.value)}
          >
            <option value="">Selecciona un curso</option>
            {cursosDisponibles.map((curso, idx) => (
              <option key={idx} value={curso}>{curso}</option>
            ))}
          </select>
          <button
            type="button"
            className="paquete-form-add-btn"
            onClick={handleAddCurso}
            title="Añadir"
          >
            <span>+</span>
          </button>
        </div>
        <div className="paquete-form-cursos-list">
          {cursos.map((curso, idx) => (
            <div className="paquete-form-curso-item" key={idx}>
              <span>{curso}</span>
              <button
                type="button"
                className="paquete-form-remove-btn"
                onClick={() => handleRemoveCurso(idx)}
                title="Eliminar"
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
          value={link}
          onChange={(e) => setLink(e.target.value)}
        />
        <button className="paquete-form-submit" type="submit">
          Crear Paquete
        </button>
      </form>
    </div>
  );
};

export default PaqueteForm;
