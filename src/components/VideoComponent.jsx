import React from 'react';
import PropTypes from 'prop-types';
import './VideoComponent.css';

// Extrae el ID de YouTube de una URL
function getYoutubeId(url) {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url?.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
}

const VideoComponent = ({ videoUrl }) => {
  // Extraer el ID del video de YouTube
  let embedUrl = videoUrl;
  if (videoUrl && videoUrl.includes('youtube.com/watch?v=')) {
    const videoId = videoUrl.split('v=')[1].split('&')[0];
    embedUrl = `https://www.youtube.com/embed/${videoId}`;
  }

  return (
    <div className="video-responsive" style={{ width: '100%', maxWidth: 700, aspectRatio: '16/9', margin: '0 auto' }}>
      <iframe
        width="100%"
        height="400"
        src={embedUrl}
        title="Video de presentación"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
};

VideoComponent.propTypes = {
  videoUrl: PropTypes.string.isRequired,
};

export default VideoComponent;
