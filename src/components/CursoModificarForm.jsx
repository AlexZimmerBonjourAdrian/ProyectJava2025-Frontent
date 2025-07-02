import React, { useState, useEffect, useRef } from "react";
import { useDecryptToken } from "../App";
import { Messages } from 'primereact/messages';
import VideoPopUp from "./VideoPopUp";

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

const CursoModificarForm = () => {
  const msgs = useRef(null);
  const [cursoSeleccionado, setCursoSeleccionado] = useState("");
  const [cursos, setCursos] = useState([]);
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [videoLink, setVideoLink] = useState("");
  const [videos, setVideos] = useState([]);
  const [videoNombre, setVideoNombre] = useState("");
  const [linkPresentacion, setLinkPresentacion] = useState("");
  const [precio, setPrecio] = useState(0);
  const [activo, setActivo] = useState(true);
  const [showVideoPopUp, setShowVideoPopUp] = useState(false);
  

  const handleOpenPopUp = () => {
    const regex = /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})$/;
    if (videoLink.trim() !== "" && regex.test(videoLink.trim())) {
      msgs.current.clear();
      setShowVideoPopUp(true);
    }else{
      msgs.current.clear();
      msgs.current.show([
        { sticky: true, severity: 'error', summary: 'Error', detail: 'Ingrese una URL válida' },
      ]);
    }
  };
  const handleAddVideo = (videoData) => {
    setVideos([...videos, videoData]);
    setVideoLink("");
    setShowVideoPopUp(false);
  };

  const handleCancelPopUp = () => {
    setShowVideoPopUp(false);
  };

  const handleRemoveVideo = (index) => {
    setVideos(videos.filter((_, i) => i !== index));
  };


  const handleSelectCurso = (e) => {
    const id = e.target.value;
    setCursoSeleccionado(id);
    const curso = cursos.find(c => c.id.toString() === id);
    if (curso) {
      console.log(curso);
      setNombre(curso.nombre);
      setDescripcion(curso.descripcion);
      setVideos(curso.videos);
      setLinkPresentacion(curso.videoPresentacion);
      setPrecio(curso.precio);
      setActivo(curso.activo);
    } else {
      setNombre("");
      setDescripcion("");
      setVideos([]);
      setLinkPresentacion("");
    }
    setVideoLink("");
    setVideoNombre("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nombre || !descripcion || !linkPresentacion || precio <= 0 || videos.length === 0 || cursoSeleccionado === "") {
      msgs.current.clear();
      msgs.current.show([
        { sticky: true, severity: 'error', summary: 'Error', detail: 'Rellene todos los campos' },
      ]);
      return;
    }
    try {
      const token = useDecryptToken(localStorage.getItem('authToken'));
      const API_URL = import.meta.env.VITE_API_URL;
      const body = {
        nombre: nombre,
        descripcion: descripcion,
        precio: precio,
        videoPresentacion: linkPresentacion,
        videos: videos,
        activo: activo
      };
      console.log(JSON.stringify(body));
      console.log(JSON.stringify(cursoSeleccionado));
    
      fetch(`${API_URL}/api/curso/${cursoSeleccionado}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
      }).then(res => res.json())
      .then(data => {
        if (data.id) {
          msgs.current.clear();
          msgs.current.show([
            { sticky: true, severity: 'success', summary: 'Éxito', detail: 'Paquete modificado exitosamente' },
          ]);
          setNombre("");
          setDescripcion("");
          setPrecio(0);
          setLinkPresentacion("");
          setVideos([]);
          setActivo(true);
          setCursoSeleccionado("");
        } else {
          msgs.current.clear();
          msgs.current.show([
            { sticky: true, severity: 'error', summary: 'Error', detail: data.message || 'Error al modificar el paquete' },
          ]);
        }
      });
    } catch (error) {
        console.error("Error al modificar el paquete:", error);
        msgs.current.clear();
        msgs.current.show([
          { sticky: true, severity: 'error', summary: 'Error', detail: 'Error al modificar el paquete' },
        ]);
      }
    };

    useEffect(() => {
        const fetchCursos = async () => {
          try {
            const token = useDecryptToken(localStorage.getItem('authToken'));
            const API_URL = import.meta.env.VITE_API_URL;
            const response = await fetch(`${API_URL}/api/curso`, {
              headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
              },
            });
            const res = await response.json();
            setCursos(res);
          } catch (error) {
            console.error("Error fetching cursos:", error);
          }
        };
    
        fetchCursos();
      }, [cursoSeleccionado]);

  return (
    <div className="paquete-form-container">
      <div  style={{position: 'fixed', top: '2rem', zIndex: 1000, textAlign: 'center', width: '100%'}}>
        <Messages ref={msgs} style={{width: '70%'}}/>
      </div>
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
          {cursos.map((c) => (
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
            onClick={handleOpenPopUp}
            title="Añadir video"
            style={{ color: '#6b1839', fontWeight: 'bold' }}
          >
            <span>＋</span>
          </button>
        </div>
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
        <label className="paquete-form-label">Precio</label>
        <input
          className="paquete-form-input"
          type="number"
          value={precio}
          onChange={(e) => setPrecio(e.target.value)}
        />
        <label className="paquete-form-label">Activo</label>
        <input
          className="paquete-form-input"
          type="checkbox"
          checked={activo}
          onChange={(e) => setActivo(e.target.checked)}
        />
        <button className="paquete-form-submit" type="submit" style={styles.submitButton}>
          MODIFICAR
        </button>
      </form>
      {showVideoPopUp && (
        <VideoPopUp
          initialLink={videoLink}
          onCancel={handleCancelPopUp}
          onAdd={handleAddVideo}
        />
      )}
    </div>
  );
};

export default CursoModificarForm;
