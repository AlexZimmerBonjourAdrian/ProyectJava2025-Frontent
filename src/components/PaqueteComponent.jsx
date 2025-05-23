import React, { useEffect, useState } from "react";
import { getAllPaquetes } from "../services/paquete";
import { decryptToken } from '../App';
import PaqueteHeader from "./PaqueteHeader";
import PaqueteDescripcion from "./PaqueteDescripcion";
import CursoIncluidoCard from "./CursoIncluidoCard";
import PaqueteFooter from "./PaqueteFooter";

const PaqueteComponent = () => {
  const [paquetes, setPaquetes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPaquetes = async () => {
      setLoading(true);
      setError(null);
      try {
        const encryptedToken = localStorage.getItem('authToken');
        const token = decryptToken(encryptedToken);
        if (!token) {
          setError('Usuario no autenticado');
          setLoading(false);
          return;
        }
        const data = await getAllPaquetes(token);
        setPaquetes(data);
      } catch (err) {
        setError(err.message || 'Error al cargar los paquetes');
      } finally {
        setLoading(false);
      }
    };
    fetchPaquetes();
  }, []);

  const handleAddToCart = () => {
    alert("Añadido al carrito!");
  };
  const handleInfo = (nombre) => {
    alert(`Más info sobre: ${nombre}`);
  };

  if (loading) return <div style={{textAlign:'center', marginTop:40}}>Cargando paquetes...</div>;
  if (error) return <div style={{textAlign:'center', marginTop:40, color:'red'}}>{error}</div>;
  if (!Array.isArray(paquetes) || paquetes.length === 0) {
    return <div style={{textAlign:'center', marginTop:40, color:'#5a2236', fontWeight:700, fontSize:24}}>No existen paquetes en el sistema.</div>;
  }

  return (
    <div style={{ background: '#e9eef2', minHeight: '100vh', paddingBottom: 40 }}>
      {/* Header y nombre */}
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '32px 0 0 0' }}>
        <h1 style={{ fontWeight:700, fontSize:32, color:'#5a2236', marginBottom:12 }}>PAQUETES DISPONIBLES</h1>
      </div>
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '32px 0 0 0' }}>
        {paquetes.map((paquete, idx) => (
          <div key={paquete.id || idx} style={{ background:'#fff', borderRadius:12, marginBottom:32, boxShadow:'0 2px 12px rgba(90,34,54,0.10)', padding:32 }}>
            <PaqueteHeader nombre={paquete.nombre} subtitulo={paquete.descripcion} imagen={null} onAddToCart={handleAddToCart} />
            <PaqueteDescripcion descripcion={paquete.descripcion} />
            <div style={{ fontWeight: 700, fontSize: 18, color: '#5a2236', marginBottom: 12, marginTop: 18 }}>CURSOS INCLUIDOS</div>
            {Array.isArray(paquete.cursos) && paquete.cursos.length > 0 ? (
              paquete.cursos.map((curso, cidx) => (
                <CursoIncluidoCard key={curso.id || cidx} nombre={curso.nombre} descripcion={curso.descripcion} imagen={curso.imagen} onInfo={() => handleInfo(curso.nombre)} />
              ))
            ) : (
              <div style={{ color:'#888', fontStyle:'italic' }}>No hay cursos en este paquete.</div>
            )}
          </div>
        ))}
      </div>
      <PaqueteFooter onAddToCart={handleAddToCart} />
    </div>
  );
};

export default PaqueteComponent;
