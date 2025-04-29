import React from 'react';
import { Link } from 'react-router-dom';
import ServiceCard from '../components/ServiceCard';
import './Session11.css';

const Session11 = () => {
    const services = [
        {
            title: "TERAPIA HOLÍSTICA INTEGRAL",
            description: "Indagamos cual es la situación en la cual la persona quiere trabajar o resolver, puede ser desde el estrés, la ansiedad o el autoconocimiento para encontrar el sentido.",
            modalidad: "Modalidad presencial u online"
        },
        {
            title: "BIODESCODIFICACIÓN NEUROEMOCIONAL",
            description: "Es una terapia basada en la Neurociencia, en la cual buscamos el origen del conflicto y lo descodificamos mediante una serie de recursos tales como situaciones pendientes emocionales, línea generacional.",
            modalidad: "Modalidad presencial u online"
        },
        {
            title: "TALLER RECONECTANDO CON NUESTRA ENERGÍA FEMENINA SANACIÓN DE ÚTERO",
            description: "• Activaremos y conectaremos con nuestra energía femenina para recuperar nuestro poder creador y magnetismo.\n• Haremos un ritual para honrar a nuestras ancestras y sanar la línea matriarcal (traer fotos de generaciones pasadas y rituales).\n• Energía energética y emocional mediante relaciones sexuales y relaciones toxicas.\n• Sanar el útero sagrado y la memoria de nuestras experiencias.\n• Ver la línea generacional y como nos afecta siendo y conectando con tu energía femenina.",
            modalidad: "Modalidad presencial u online"
        }
    ];

    return (
        <div className="sessions-container">
            <header className="sessions-header">
                <div className="brand-container">
                    <span className="brand">SOL FUENTES</span>
                    <Link to="/" className="home-icon">
                        <i className="pi pi-home"></i>
                    </Link>
                </div>
            </header>

            <main className="sessions-main">
                <h1 className="main-title">SESIONES PERSONALES</h1>
                <h2 className="subtitle">REENCUNETRATE CONTIGO MISMA</h2>

                <div className="services-grid">
                    {services.map((service, index) => (
                        <ServiceCard
                            key={index}
                            title={service.title}
                            description={service.description}
                            modalidad={service.modalidad}
                            imageUrl={service.imageUrl}
                        />
                    ))}
                </div>

                <div className="contact-section">
                    <a href="https://wa.me/tunumero" className="whatsapp-button">
                        <i className="pi pi-whatsapp"></i>
                        Agendate conmigo
                    </a>
                </div>

                <footer className="sessions-footer">
                    <p>© Solariana 2025</p>
                </footer>
            </main>
        </div>
    );
};

export default Session11;



