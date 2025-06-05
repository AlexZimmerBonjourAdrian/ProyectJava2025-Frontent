import React, { useEffect, useState } from "react";
import { getMisCursosUsuario } from "../services/ArticuloCliente";
import { useAuth } from '../context/AuthContext';
import CursoHeader from "../components/CursoHeader";
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
        const cursosCompletos = await Promise.all(
          articulos.map(async (art) => {
            try {
              const curso = await getCursoById(art.articulo, token);
              return {
                ...curso,
                articuloClienteId: art.id,
                estado: art.estado,
                caducidad: art.caducidad
              };
            } catch (error) {
              console.error(`Error al obtener el curso ${art.articulo}:`, error);
              return null;
            }
          })
        );
        
        // Filtrar cualquier curso nulo (que falló al cargar)
        const cursosFiltrados = cursosCompletos.filter(curso => curso !== null);
        setCursos(cursosFiltrados);
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
          <div 
            key={curso.articuloClienteId} 
            style={{ 
              background: '#5a2236', 
              borderRadius: 12, 
              display: 'flex', 
              alignItems: 'flex-start', 
              padding: 32, 
              marginBottom: 36, 
              boxShadow: '0 4px 16px rgba(90,34,54,0.15)',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              cursor: 'pointer'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(90,34,54,0.2)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 16px rgba(90,34,54,0.15)';
            }}
          >
            <div style={{ 
              width: 140, 
              height: 140, 
              background: curso.imagen ? `url(${curso.imagen})` : '#eee', 
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              borderRadius: 8, 
              marginRight: 32, 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
            }}>
              {!curso.imagen && <span style={{ color: '#aaa', fontSize: 22 }}>IMG</span>}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, fontSize: 24, color: '#fff', marginBottom: 8 }}>
                {curso.nombre || 'Nombre del curso'}
              </div>
              <div style={{ color: '#e98fae', fontStyle: 'italic', fontSize: 16, marginBottom: 10 }}>
                {curso.autor || 'Autor del curso'}
              </div>
              <div style={{ 
                color: '#fff', 
                fontSize: 15, 
                marginBottom: 12,
                maxHeight: '60px',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: 3,
                WebkitBoxOrient: 'vertical'
              }}>
                {curso.descripcion || 'Sin descripción.'}
              </div>
              <div style={{ 
                color: '#e98fae', 
                fontSize: 15, 
                marginBottom: 16,
                display: 'flex',
                gap: '20px'
              }}>
                <span><strong>Estado:</strong> {curso.estado}</span> 
                <span><strong>Caducidad:</strong> {new Date(curso.caducidad).toLocaleDateString()}</span>
              </div>
              <button 
                style={{ 
                  background: '#e98fae', 
                  color: '#fff', 
                  fontWeight: 700, 
                  fontSize: 16, 
                  border: 'none', 
                  borderRadius: 8, 
                  padding: '12px 32px', 
                  cursor: 'pointer', 
                  marginTop: 8,
                  transition: 'background 0.2s ease',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                }}
                onMouseOver={(e) => e.currentTarget.style.background = '#d47a99'}
                onMouseOut={(e) => e.currentTarget.style.background = '#e98fae'}
                onClick={() => navigate('/curso', { state: { cursoId: curso.articuloClienteId } })}
              >
                IR AL CURSO
              </button>
            </div>
          </div>
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
