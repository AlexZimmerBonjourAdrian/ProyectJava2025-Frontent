import React from 'react';
import PropTypes from 'prop-types';

const ServiceCard = ({ title, description, modalidad, imageUrl }) => {
    return (
        <div className="service-card">
            <h3 className="service-title">{title}</h3>
            {imageUrl ? (
                <img src={imageUrl} alt={title} className="service-image" />
            ) : (
                <div className="service-image-placeholder"></div>
            )}
            <p className="service-description">{description}</p>
            <p className="service-modalidad">{modalidad}</p>
        </div>
    );
};

ServiceCard.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    modalidad: PropTypes.string.isRequired,
    imageUrl: PropTypes.string
};

export default ServiceCard; 