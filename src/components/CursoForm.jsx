import React, { useState, useRef } from "react";
import VideoPopUp from "./VideoPopUp";
import { Messages } from 'primereact/messages';
import { useDecryptToken } from "../App";

const CursoForm = () => {
  const msgs = useRef(null);
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [videoLink, setVideoLink] = useState("");
  const [videos, setVideos] = useState([]);
  const [linkPresentacion, setLinkPresentacion] = useState("");
  const [precio, setPrecio] = useState(0);
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nombre || !descripcion || !videoLink || !linkPresentacion || precio <= 0 || videos.length === 0) {
            msgs.current.clear();
            msgs.current.show([
                { sticky: true, severity: 'error', summary: 'Error', detail: 'Rellene todos los campos' },
            ]);
            return;
        }

     try{
      const token = useDecryptToken(localStorage.getItem('authToken'));
      const API_URL = import.meta.env.VITE_API_URL;
      const body = {
        nombre: nombre,
        descripcion: descripcion,
        videos: videos,
        linkPresentacion: linkPresentacion,
        precio: precio
      }
      fetch(`${API_URL}/api/curso`, {
          method: 'POST',
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
              { sticky: true, severity: 'success', summary: 'Éxito', detail: 'Curso creado exitosamente' },
            ]);
            setNombre("");
            setDescripcion("");
            setVideoLink("");
            setVideos([]);
            setLinkPresentacion("");
            setPrecio(0);
          }else{
            msgs.current.clear();
            msgs.current.show([
              { sticky: true, severity: 'error', summary: 'Error', detail: 'Error al crear el curso' },
            ]);
          }
      })
    }catch(error){
      console.log(error);
    }
  };

  return (
    <div className="paquete-form-container">
      <div  style={{position: 'fixed', top: '2rem', zIndex: 1000, textAlign: 'center', width: '100%'}}>
        <Messages ref={msgs} style={{width: '70%'}}/>
      </div>

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
        />
        <label className="paquete-form-label">Descripción</label>
        <textarea
          className="paquete-form-textarea"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
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
              <span style={{ fontSize: '0.95rem' }}>{video.nombre || 'Nombre video'}</span>
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
        <label className="paquete-form-label">Precio</label>
        <input
          className="paquete-form-input"
          type="number"
          value={precio}
          onChange={(e) => setPrecio(e.target.value)}
        />
        <button className="paquete-form-submit" type="submit">
          Crear Curso
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

export default CursoForm;
