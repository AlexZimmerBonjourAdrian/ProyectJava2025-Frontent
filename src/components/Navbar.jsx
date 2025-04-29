import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const styles = {
    navbar: {
      backgroundColor: '#1a1a2e',
      padding: '1rem',
      color: '#ffffff'
    },
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    brand: {
      color: '#ffffff',
      textDecoration: 'none',
      fontSize: '1.2rem',
      fontWeight: 'bold'
    },
    nav: {
      display: 'flex',
      gap: '2rem'
    },
    link: {
      color: '#ffffff',
      textDecoration: 'none',
      fontSize: '0.9rem',
      opacity: '0.8',
      transition: 'opacity 0.2s',
      ':hover': {
        opacity: '1'
      }
    }
  };

  return (
    <nav style={styles.navbar}>
      <div style={styles.container}>
        <Link to="/" style={styles.brand}>Mi Aplicación</Link>
        <div style={styles.nav}>
          <Link to="/" style={styles.link}>Inicio</Link>
          <Link to="/about" style={styles.link}>Acerca de</Link>
          <Link to="/VideoCurso" style={styles.link}>Video Curso</Link>
          <Link to="/login" style={styles.link}>Iniciar Sesión</Link>
          <Link to="/register" style={styles.link}>Registrarse</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 