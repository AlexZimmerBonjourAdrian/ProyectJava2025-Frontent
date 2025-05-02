import React, { useState } from "react";
import "./PaqueteForm.css";

const paquetesMock = [
  { id: 1, nombre: "Paquete React", descripcion: "Paquete de cursos de React", cursos: ["Curso de React", "Curso de JavaScript"], link: "https://www.youtube.com/watch?v=react" },
  { id: 2, nombre: "Paquete Node", descripcion: "Paquete de cursos de Node.js", cursos: ["Curso de Node.js"], link: "https://www.youtube.com/watch?v=node" }
];

const cursosDisponibles = [
  "Curso de React",
  "Curso de Node.js",
  "Curso de CSS",
  "Curso de JavaScript"
];

const PaqueteModificarForm = () => {
  const [paqueteSeleccionado, setPaqueteSeleccionado] = useState("");
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [cursoSeleccionado, setCursoSeleccionado] = useState("");
  const [cursos, setCursos] = useState([]);
  const [link, setLink] = useState("");

  const handleSelectPaquete = (e) => {
    const id = e.target.value;
    setPaqueteSeleccionado(id);
    const paquete = paquetesMock.find(p => p.id.toString() === id);
    if (paquete) {
      setNombre(paquete.nombre);
      setDescripcion(paquete.descripcion);
      setCursos(paquete.cursos);
      setLink(paquete.link);
    } else {
      setNombre("");
      setDescripcion("");
      setCursos([]);
      setLink("");
    }
  };

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
    // Aquí iría la lógica para modificar el paquete
    alert("Paquete modificado!");
  };

  return (
    <div className="paquete-form-container">
      <form className="paquete-form" onSubmit={handleSubmit}>
        <h2 className="paquete-form-title">
          <span className="paquete-form-title-main">MODIFICAR PAQUETE</span>
        </h2>
        <label className="paquete-form-label">Seleccionar curso</label>
        <select
          className="paquete-form-input"
          value={paqueteSeleccionado}
          onChange={handleSelectPaquete}
        >
          <option value="">Selecciona un paquete</option>
          {paquetesMock.map((p) => (
            <option key={p.id} value={p.id}>{p.nombre}</option>
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
        <button className="paquete-form-submit" type="submit" style={{ background: '#c7a740', color: '#fff' }}>
          MODIFICAR
        </button>
      </form>
    </div>
  );
};

export default PaqueteModificarForm;
