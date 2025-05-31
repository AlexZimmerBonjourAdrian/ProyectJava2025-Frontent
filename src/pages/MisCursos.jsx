import React, { useEffect, useState } from "react";
import { getMisCursosUsuario } from "../services/ArticuloCliente";
import { useDecryptToken } from '../App';
import CursoHeader from "../components/CursoHeader";
import Footer from "../components/Footer";
import "../styles/global.css";
import { useNavigate } from 'react-router-dom';

export default function MisCursos() {
  const [cursos, setCursos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCursos = async () => {
      const token = useDecryptToken(localStorage.getItem('authToken'));
      if (!token) return;
      const articulos = await getMisCursosUsuario(token);
      // Traer datos completos de cada curso asignado
      const { getCursoById } = await import('../services/curso');
      const cursosCompletos = await Promise.all(
        articulos.map(async (art) => {
          const curso = await getCursoById(art.articulo, token);
          return {
            ...curso,
            articuloClienteId: art.id,
            estado: art.estado,
            caducidad: art.caducidad
          };
        })
      );
      setCursos(cursosCompletos);
    };
    fetchCursos();
  }, []);

  return (
    <div style={{ background: '#f5f7fa', minHeight: '100vh' }}>
      <CursoHeader />
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '48px 0 0 0' }}>
        {cursos.length === 0 && <div style={{textAlign:'center', color:'#6d2941', fontWeight:700, fontSize:24}}>No tienes cursos asignados.</div>}
        {cursos.map((curso) => (
          <div key={curso.articuloClienteId} style={{ background: '#5a2236', borderRadius: 12, display: 'flex', alignItems: 'flex-start', padding: 32, marginBottom: 36, boxShadow: '0 2px 12px rgba(90,34,54,0.10)' }}>
            <div style={{ width: 140, height: 140, background: '#eee', borderRadius: 8, marginRight: 32, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ color: '#aaa', fontSize: 22 }}>IMG</span>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, fontSize: 22, color: '#fff', marginBottom: 6 }}>{curso.nombre || 'Nombre del curso'}</div>
              <div style={{ color: '#fff', fontStyle: 'italic', fontSize: 15, marginBottom: 8 }}>Autor del curso</div>
              <div style={{ color: '#fff', fontSize: 15, marginBottom: 10 }}>{curso.descripcion || 'Sin descripción.'}</div>
              <div style={{ color: '#fff', fontSize: 15, marginBottom: 10 }}>Estado: {curso.estado} | Caducidad: {curso.caducidad}</div>
              <button style={{ background: '#e98fae', color: '#fff', fontWeight: 700, fontSize: 16, border: 'none', borderRadius: 8, padding: '10px 32px', cursor: 'pointer', marginTop: 8 }}
                onClick={() => navigate('/curso', { state: { cursoId: curso.articuloClienteId } })}
              >IR AL CURSO</button>
            </div>
          </div>
        ))}
      </div>
      <div style={{ background: '#e98fae', marginTop: 60, padding: '48px 0', textAlign: 'center' }}>
        <div style={{ color: '#fff', fontWeight: 700, fontSize: 38, marginBottom: 24 }}>
          ¿QUIERES APRENDER ALGO NUEVO?
        </div>
        <button style={{ background: '#d4af37', color: '#5a2236', fontWeight: 700, fontSize: 18, border: 'none', borderRadius: 22, padding: '14px 38px', cursor: 'pointer', marginTop: 8 }}>
          ADQUIERE UN NUEVO CURSO
        </button>
      </div>
      <Footer />
    </div>
  );
}
