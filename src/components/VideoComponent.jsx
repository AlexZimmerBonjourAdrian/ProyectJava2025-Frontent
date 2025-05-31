import React from 'react';
import PropTypes from 'prop-types';

// Extrae el ID de YouTube de una URL
function getYoutubeId(url) {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url?.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
}

const VideoComponent = ({ 
  videoUrl, 
  title, 
  description, 
  thumbnail,
  autoPlay = false,
  controls = true,
  className = ''
}) => {
  const youtubeId = getYoutubeId(videoUrl);

  // Extrae el primer link a PDF de la descripción
  let pdfUrl = null;
  if (description) {
    const match = description.match(/https?:\/\/[^\s]+\.pdf/);
    if (match) pdfUrl = match[0];
  }

  // Estilos para el área de video y textos
  const videoAreaStyle = {
    width: 600,
    height: 320,
    background: '#ddd',
    borderRadius: 8,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    margin: '0 auto'
  };

  const playIconStyle = {
    width: 0,
    height: 0,
    borderTop: '40px solid transparent',
    borderBottom: '40px solid transparent',
    borderLeft: '60px solid #fff',
    marginLeft: 20
  };

  const titleStyle = {
    marginTop: 48,
    fontSize: 40,
    fontWeight: 700,
    color: '#d4af37',
    textAlign: 'center',
    fontFamily: 'serif'
  };

  const descStyle = {
    marginTop: 12,
    fontSize: 18,
    color: '#e88c9a',
    textAlign: 'center',
    maxWidth: 700,
    fontFamily: 'serif'
  };

  if (!videoUrl) {
    // Área gris con ícono de play
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 500, padding: 24 }}>
        <div style={videoAreaStyle}>
          <div style={playIconStyle}></div>
        </div>
        {title && <h2 style={titleStyle}>{title}</h2>}
        {description && <p style={descStyle}>{description}</p>}
        {pdfUrl && (
          <a href={pdfUrl} target="_blank" rel="noopener noreferrer" style={{ marginTop: 24, color: '#d4af37', fontWeight: 700, fontSize: 20, textDecoration: 'underline', letterSpacing: 1 }}>
            📄 Ver material PDF
          </a>
        )}
      </div>
    );
  }

  return (
    <div className={`video-container ${className}`} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 500, padding: 24 }}>
      <div className="video-wrapper" style={{ ...videoAreaStyle, padding: 0, background: '#ddd' }}>
        {youtubeId ? (
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${youtubeId}${autoPlay ? '?autoplay=1' : ''}`}
            title={title || "YouTube video player"}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{ borderRadius: 8, background: '#ddd', width: '100%', height: '100%' }}
          ></iframe>
        ) : (
          <video
            src={videoUrl}
            poster={thumbnail}
            controls={controls}
            autoPlay={autoPlay}
            playsInline
            className="video-player"
            width="100%"
            height="100%"
            style={{ borderRadius: 8, background: '#ddd', width: '100%', height: '100%' }}
          >
            Tu navegador no soporta el elemento de video.
          </video>
        )}
      </div>
      {title && <h2 style={titleStyle}>{title}</h2>}
      {description && <p style={descStyle}>{description}</p>}
      {pdfUrl && (
        <a href={pdfUrl} target="_blank" rel="noopener noreferrer" style={{ marginTop: 24, color: '#d4af37', fontWeight: 700, fontSize: 20, textDecoration: 'underline', letterSpacing: 1 }}>
          📄 Ver material PDF
        </a>
      )}
    </div>
  );
};

VideoComponent.propTypes = {
  videoUrl: PropTypes.string.isRequired,
  title: PropTypes.string,
  description: PropTypes.string,
  thumbnail: PropTypes.string,
  autoPlay: PropTypes.bool,
  controls: PropTypes.bool,
  className: PropTypes.string
};

export default VideoComponent;
