import React, { useEffect, useState } from "react";
import { getMisCursosUsuario } from "../services/ArticuloCliente";
import { decryptToken } from '../App';

export default function MisCursos() {
  const [cursos, setCursos] = useState([]);

  useEffect(() => {
    const fetchCursos = async () => {
      const token = decryptToken(localStorage.getItem('authToken'));
      if (!token) return;
      const articulos = await getMisCursosUsuario(token);
      setCursos(articulos);
    };
    fetchCursos();
  }, []);

  return (
    <div style={{ background: '#f5f7fa', minHeight: '100vh', padding: 32 }}>
      <h2 style={{ color: '#d4af37', fontWeight: 700, fontSize: 32, marginBottom: 32 }}>Mis Cursos</h2>
      {cursos.length === 0 && <div>No tienes cursos asignados.</div>}
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {cursos.map((art) => (
          <li key={art.id} style={{ background: '#fff', borderRadius: 12, marginBottom: 20, padding: 24, boxShadow: '0 2px 8px #eee' }}>
            <div style={{ fontWeight: 700, fontSize: 20, color: '#6d2941' }}>Curso #{art.articulo}</div>
            <div style={{ color: '#333', margin: '8px 0' }}>Estado: {art.estado}</div>
            <div style={{ color: '#333', marginBottom: 8 }}>Caducidad: {art.caducidad}</div>
            <button style={{ background: '#d4af37', color: '#fff', border: 'none', borderRadius: 8, padding: '8px 18px', fontWeight: 700, cursor: 'pointer' }}
              onClick={() => window.location.href = `/curso/${art.id}`}
            >Ir al curso</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
