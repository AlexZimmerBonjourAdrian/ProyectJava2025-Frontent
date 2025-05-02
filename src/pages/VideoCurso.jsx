import React from 'react';
import { Link } from 'react-router-dom';
import VideoComponent from '../components/VideoComponent';

const VideoCurso = () => {
    const videoData = {
        videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4", // Video de ejemplo
        title: "0. Introducción a la meditación",
        description: "Se presentarán todas las técnicas de meditación con el objetivo de conseguir un estado de relajación y plenitud antes de iniciar el largo viaje que nos depara.",
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
            <div className="header-container">
                <div className="header-left">
                    <Link to="/" className="back-button">
                        <i className="pi pi-arrow-left"></i>
                    </Link>
                    <span className="header-title">SOL FUENTES</span>
                </div>
                <Link to="/" className="home-icon">
                    <i className="pi pi-home"></i>
                </Link>
            </div>

            <div className="video-section">
                <VideoComponent
                    videoUrl={videoData.videoUrl}
                    title={videoData.title}
                    description={videoData.description}
                    thumbnail={videoData.thumbnail}
                />

                <h2 className="video-title">{videoData.title}</h2>
                <p className="video-description">{videoData.description}</p>

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