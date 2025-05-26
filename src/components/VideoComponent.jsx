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

  if (!videoUrl) {
    return <div style={{ color: '#888', textAlign: 'center', padding: 40 }}>No hay video disponible.</div>;
  }

  return (
    <div className={`video-container ${className}`}>
      <div className="video-wrapper">
        {youtubeId ? (
          <iframe
            width="100%"
            height="450"
            src={`https://www.youtube.com/embed/${youtubeId}${autoPlay ? '?autoplay=1' : ''}`}
            title={title || "YouTube video player"}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{ borderRadius: 12, background: '#000' }}
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
            height="450"
          >
            Tu navegador no soporta el elemento de video.
          </video>
        )}
      </div>
      {title && <h2 style={{ marginTop: 16 }}>{title}</h2>}
      {description && <p style={{ marginTop: 8 }}>{description}</p>}
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
