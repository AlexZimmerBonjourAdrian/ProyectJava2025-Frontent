import React from 'react';
import VideoComponent from '../components/VideoComponent';
import './VideoCurso.css';

const VideoCurso = () => {
    const videoData = {
        videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4", // Video de ejemplo
        title: "Introducción al Curso",
        description: "Bienvenido al curso. En este video aprenderás los conceptos básicos.",
        thumbnail: "https://picsum.photos/800/450", // Imagen de ejemplo
        recursos: [
            {
                nombre: "Material de apoyo",
                url: "https://ejemplo.com/material.pdf"
            },
            {
                nombre: "Ejercicios prácticos",
                url: "https://ejemplo.com/ejercicios.pdf"
            }
        ]
    };

    return (
        <div className="video-curso-container">
            <div className="video-section">
                <div className="video-header">
                    <h2 className="video-title">{videoData.title}</h2>
                    <p className="video-description">{videoData.description}</p>
                </div>

                <VideoComponent
                    videoUrl={videoData.videoUrl}
                    title={videoData.title}
                    description={videoData.description}
                    thumbnail={videoData.thumbnail}
                />

                <div className="recursos-section">
                    <h3 className="recursos-title">Recursos Adicionales</h3>
                    <ul className="recursos-list">
                        {videoData.recursos.map((recurso, index) => (
                            <li key={index} className="recurso-item">
                                <a 
                                    href={recurso.url} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="recurso-link"
                                >
                                    <i className="pi pi-file-pdf"></i>
                                    {recurso.nombre}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default VideoCurso; 