import React from 'react';
import PropTypes from 'prop-types';

const VideoComponent = ({ 
  videoUrl, 
  title, 
  description, 
  thumbnail,
  autoPlay = false,
  controls = true,
  className = ''
}) => {
  return (
    <div className={`video-container ${className}`}>
      <div className="video-wrapper">
        <video
          src={videoUrl}
          poster={thumbnail}
          controls={controls}
          autoPlay={autoPlay}
          playsInline
          className="video-player"
        >
          Tu navegador no soporta el elemento de video.
        </video>
      </div>
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
