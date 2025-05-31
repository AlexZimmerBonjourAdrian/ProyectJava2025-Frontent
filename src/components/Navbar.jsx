import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsLoggedIn(true);
      // Aquí podrías obtener el nombre del usuario desde el token o hacer una llamada a la API
      // Por ahora usaremos un nombre de ejemplo
      setUserName('Usuario');
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setIsLoggedIn(false);
    setUserName('');
  };

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
      transition: 'opacity 0.2s, color 0.2s',
      ':hover': {
        opacity: '1'
      }
    },
    activeLink: {
      color: '#D4AF37',
      opacity: '1'
    },
    userSection: {
      display: 'flex',
      alignItems: 'center',
      gap: '1rem'
    },
    userName: {
      color: '#D4AF37',
      marginRight: '1rem'
    },
    logoutButton: {
      background: 'none',
      border: 'none',
      color: '#ffffff',
      cursor: 'pointer',
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
        <Link to="/" style={styles.brand}>SOL FUENTES</Link>
        <div style={styles.nav}>
          <Link to="/" style={styles.link}>Inicio</Link>
          <Link to="/VideoCurso" style={styles.link}>Video Curso</Link>
          <Link to="/VentaCurso" style={styles.link}>Venta</Link>
          <Link to="/productos" style={styles.link}>Productos</Link>
          <Link to="/session11" style={{...styles.link, color: '#D4AF37'}}>Sesión 11</Link>
          <Link to="/AgregarPaquete" style={styles.link}>Agregar Paquete</Link>
          <Link to="/AgregarCurso" style={styles.link}>Agregar Curso</Link>
          <Link to="/ModificarPaquete" style={styles.link}>Modificar Paquete</Link>
          <Link to="/ModificarCurso" style={styles.link}>Modificar Curso</Link>
          <Link to="/Pago" style={styles.link}>Pago</Link>
          <Link to="/Carrito" style={styles.link}>
            <span role="img" aria-label="carrito" style={{marginRight: 4}}>🛒</span>Carrito
          </Link>
          <Link to="/Paquete" style={styles.link}>Paquete</Link>
          <Link to="/MisCursos" style={styles.link}>Mis Cursos</Link>
          <div style={{borderLeft: '1px solid rgba(255,255,255,0.2)', height: '20px', margin: '0 0.5rem'}} />
          {isLoggedIn ? (
            <div style={styles.userSection}>
              <span style={styles.userName}>{userName}</span>
              <button onClick={handleLogout} style={styles.logoutButton}>Cerrar Sesión</button>
            </div>
          ) : (
            <>
              <Link to="/login" style={styles.link}>Iniciar Sesión</Link>
              <Link to="/register" style={styles.link}>Registrarse</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;