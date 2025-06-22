import React from 'react';
import PropTypes from 'prop-types';
import './VideoComponent.css';

const VideoComponent = ({ videoUrl, poster }) => {
  const isYoutube = videoUrl && (videoUrl.includes('youtube.com') || videoUrl.includes('youtu.be'));
  const defaultPoster = poster || `https://picsum.photos/seed/${videoUrl}/700/400`;

  if (isYoutube) {
    let videoId = '';
    if (videoUrl.includes('youtube.com/watch?v=')) {
      videoId = videoUrl.split('v=')[1].split('&')[0];
    } else if (videoUrl.includes('youtu.be/')) {
      videoId = videoUrl.split('youtu.be/')[1].split('?')[0];
    }
    const embedUrl = `https://www.youtube.com/embed/${videoId}`;
    
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
  }

  return (
    <div className="video-responsive" style={{ width: '100%', maxWidth: 700, margin: '0 auto' }}>
      <video
        width="100%"
        height="auto"
        controls
        poster={defaultPoster}
        src={videoUrl}
      >
        Tu navegador no soporta el video.
      </video>
    </div>
  );
};

VideoComponent.propTypes = {
  videoUrl: PropTypes.string.isRequired,
  poster: PropTypes.string,
};

export default VideoComponent;
