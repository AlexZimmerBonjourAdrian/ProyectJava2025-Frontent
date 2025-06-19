import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function CursoIncluidoCard({ curso }) {
    const navigate = useNavigate();
    const defaultImage = `https://picsum.photos/300/300?random=${curso.articuloClienteId || Math.random()}`;

    return (
        <div 
            className="curso-card"
            style={{ 
                background: '#5a2236', 
                borderRadius: 12, 
                display: 'flex', 
                alignItems: 'flex-start', 
                padding: 24, 
                marginBottom: 24,
                gap: '24px',
                cursor: curso.nombre !== 'Curso no disponible' ? 'pointer' : 'default'
            }}
            onClick={() => {
                if (curso.nombre !== 'Curso no disponible') {
                    navigate('/curso', { state: { cursoId: curso.articuloClienteId } });
                }
            }}
        >
            {/* Imagen del curso */}
            <div style={{ 
                width: 140, 
                height: 140, 
                flexShrink: 0,
                background: '#f5f5f5',
                borderRadius: 8,
                overflow: 'hidden'
            }}>
                <img 
                    src={curso.imagen || defaultImage}
                    alt={curso.nombre}
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                    }}
                    onError={(e) => e.target.src = defaultImage}
                />
            </div>

            {/* Contenido del curso */}
            <div style={{ flex: 1 }}>
                {/* Título y subtítulo */}
                <div style={{ 
                    fontFamily: "'Playfair Display', serif",
                    color: '#fff',
                    marginBottom: 4
                }}>
                    <h3 style={{ 
                        fontSize: '24px',
                        fontWeight: 'bold',
                        margin: 0,
                        marginBottom: '4px'
                    }}>
                        {curso.nombre}
                    </h3>
                    <p style={{ 
                        fontSize: '16px',
                        margin: 0,
                        color: '#e98fae',
                        fontStyle: 'italic'
                    }}>
                        {curso.autor}
                    </p>
                </div>

                {/* Descripción */}
                <p style={{ 
                    color: '#fff',
                    fontSize: '14px',
                    lineHeight: '1.5',
                    margin: '12px 0',
                    opacity: 0.9
                }}>
                    {curso.descripcion}
                </p>

                {/* Progreso */}
                <div style={{ 
                    color: '#e98fae',
                    fontSize: '14px',
                    marginBottom: '16px'
                }}>
                    {curso.estado === 'En progreso' && `${curso.unidadesCompletadas || 4} de ${curso.unidadesTotales || 5} unidades completadas`}
                </div>

                {/* Botón */}
                <button 
                    style={{ 
                        background: '#e98fae',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '6px',
                        padding: '8px 24px',
                        fontSize: '14px',
                        fontWeight: 'bold',
                        cursor: curso.nombre !== 'Curso no disponible' ? 'pointer' : 'not-allowed',
                        opacity: curso.nombre === 'Curso no disponible' ? 0.7 : 1
                    }}
                    disabled={curso.nombre === 'Curso no disponible'}
                >
                    IR AL CURSO
                </button>
            </div>
        </div>
    );
} 