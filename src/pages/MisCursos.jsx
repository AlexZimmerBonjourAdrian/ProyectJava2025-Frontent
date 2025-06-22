import React, { useEffect, useState } from "react";
import { getMisCursosUsuario } from "../services/ArticuloCliente";
import { useAuth } from '../context/AuthContext';
import CursoHeader from "../components/CursoHeader";
import CursoIncluidoCard from "../components/CursoIncluidoCard";
import Footer from "../components/Footer";
import "../styles/global.css";
import { useNavigate } from 'react-router-dom';
import CryptoJS from 'crypto-js';

export default function MisCursos() {
  const [cursos, setCursos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  
  useEffect(() => {
    // Verificar si el usuario está logueado
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }
    
    const fetchCursos = async () => {
      setIsLoading(true);
      try {
        const encryptedToken = localStorage.getItem('authToken');
        if (!encryptedToken) {
          console.error('No se encontró token de autenticación');
          navigate('/login');
          return;
        }
        
        // Decrypt the token
        const bytes = CryptoJS.AES.decrypt(encryptedToken, import.meta.env.VITE_SECRET_KEY);
        const token = bytes.toString(CryptoJS.enc.Utf8);
        
        if (!token) {
          console.error('Token inválido');
          navigate('/login');
          return;
        }
        
        // Obtener los artículos del cliente (cursos asignados)
        const articulos = await getMisCursosUsuario(token);
        
        if (!articulos || articulos.length === 0) {
          console.log('No se encontraron cursos para este usuario');
          setCursos([]);
          setIsLoading(false);
          return;
        }
        
        // Traer datos completos de cada curso asignado
        const { getCursoById } = await import('../services/curso');
        
        // Log the articulos to debug
        console.log('Artículos recibidos:', articulos);
        
        const cursosCompletos = await Promise.all(
          articulos.map(async (art) => {
            try {
              // Check if art.articulo is valid
              if (!art.articulo) {
                console.error('ID de artículo no válido:', art);
                return {
                  nombre: 'Curso no disponible',
                  descripcion: 'No se pudo cargar la información del curso.',
                  autor: 'Desconocido',
                  articuloClienteId: art.id,
                  estado: art.estado || 'Desconocido',
                  caducidad: art.caducidad || new Date().toISOString()
                };
              }
              
              // Try to get the course details
              const curso = await getCursoById(art.articulo, token);
              return {
                ...curso,
                articuloClienteId: art.id,
                estado: art.estado,
                caducidad: art.caducidad
              };
            } catch (error) {
              console.error(`Error al obtener el curso ${art.articulo}:`, error);
              // Return a placeholder object instead of null
              return {
                nombre: 'Curso no disponible',
                descripcion: 'No se pudo cargar la información del curso.',
                autor: 'Desconocido',
                articuloClienteId: art.id,
                estado: art.estado || 'Desconocido',
                caducidad: art.caducidad || new Date().toISOString()
              };
            }
          })
        );
        
        // No filtramos cursos nulos, ya que ahora devolvemos objetos de placeholder
        // en lugar de null cuando hay un error
        setCursos(cursosCompletos);
      } catch (error) {
        console.error('Error al cargar los cursos:', error);
        setError('No se pudieron cargar tus cursos. Por favor, intenta de nuevo más tarde.');
        setCursos([]);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchCursos();
  }, [navigate, isLoggedIn]);

  return (
    <div style={{ background: '#f5f7fa', minHeight: '100vh' }}>
      <CursoHeader />
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '80px 20px 0' }}>
        <h1 style={{ color: '#5a2236', textAlign: 'center', marginBottom: '30px', fontSize: '32px', fontWeight: 'bold' }}>
          Mis Cursos
        </h1>
        
        {isLoading && (
          <div style={{
            textAlign: 'center',
            color: '#6d2941',
            padding: '40px',
            background: 'white',
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
          }}>
            <div style={{ fontSize: '20px', marginBottom: '10px' }}>Cargando tus cursos...</div>
            <div style={{ 
              width: '50px', 
              height: '50px', 
              border: '5px solid #e98fae',
              borderTopColor: '#5a2236',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
              margin: '0 auto'
            }}></div>
            <style>{`
              @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
              }
            `}</style>
          </div>
        )}
        
        {!isLoading && error && (
          <div style={{
            textAlign: 'center',
            color: '#d32f2f',
            fontWeight: 700,
            fontSize: 18,
            padding: '40px',
            background: 'white',
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
          }}>
            {error}
          </div>
        )}
        
        {!isLoading && !error && cursos.length === 0 && (
          <div style={{
            textAlign: 'center',
            color: '#6d2941',
            fontWeight: 700,
            fontSize: 24,
            padding: '40px',
            background: 'white',
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
          }}>
            No tienes cursos asignados.
          </div>
        )}
        
        {cursos.map((curso) => (
          <CursoIncluidoCard
            key={curso.articuloClienteId}
            id={curso.articuloClienteId}
            nombre={curso.nombre}
            descripcion={curso.descripcion}
            imagen={curso.imagen}
            onInfo={() => navigate('/curso', { state: { cursoId: curso.articuloClienteId } })}
          />
        ))}
      </div>
      
      <div style={{ background: '#e98fae', marginTop: 60, padding: '48px 20px', textAlign: 'center' }}>
        <div style={{ color: '#fff', fontWeight: 700, fontSize: 38, marginBottom: 24 }}>
          ¿QUIERES APRENDER ALGO NUEVO?
        </div>
        <button 
          style={{ 
            background: '#d4af37', 
            color: '#5a2236', 
            fontWeight: 700, 
            fontSize: 18, 
            border: 'none', 
            borderRadius: 22, 
            padding: '14px 38px', 
            cursor: 'pointer', 
            marginTop: 8,
            transition: 'transform 0.2s ease, background 0.2s ease',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'scale(1.05)';
            e.currentTarget.style.background = '#e5c04c';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.background = '#d4af37';
          }}
          onClick={() => navigate('/')}
        >
          ADQUIERE UN NUEVO CURSO
        </button>
      </div>
      <Footer />
    </div>
  );
}
