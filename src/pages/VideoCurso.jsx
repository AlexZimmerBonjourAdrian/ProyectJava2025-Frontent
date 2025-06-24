import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getVideoById } from '../services/video';
import { marcarVideoComoVisto, getArticuloClienteUsuario } from '../services/ArticuloCliente';
import { useDecryptToken } from '../App';
import VideoComponent from '../components/VideoComponent';
import './VideoCurso.css'; // Assuming you have a CSS file for styling

const VideoCurso = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { videoId, articuloClienteId } = location.state || {};
  const [videoData, setVideoData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [completado, setCompletado] = useState(false);
  const [completando, setCompletando] = useState(false);
  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    const fetchVideo = async () => {
      setLoading(true);
      setError(null);
      try {
        if (!videoId) {
          setError('No se proporcionó el video.');
          setLoading(false);
          return;
        }
        const encryptedToken = localStorage.getItem('authToken');
        const token = useDecryptToken(encryptedToken);
        if (!token) {
          setError('Usuario no autenticado');
          setLoading(false);
          return;
        }
        
        // Verificar si el video ya está marcado como visto
        if (articuloClienteId) {
          try {
            const articuloCliente = await getArticuloClienteUsuario(articuloClienteId, token);
            if (articuloCliente.videosVistos && articuloCliente.videosVistos.includes(videoId)) {
              setCompletado(true);
            }
          } catch (err) {
            console.log('Error al verificar estado del video:', err);
          }
        }
        
        const data = await getVideoById(videoId, token);
        setVideoData({
          ...data,
          videoUrl: data.videoUrl || data.link || data.url || data.embedUrl || '', // Normaliza aquí, incluye embedUrl por si el backend lo provee
        });
      } catch (err) {
        setError('No se pudo cargar el video');
      } finally {
        setLoading(false);
      }
    };
    fetchVideo();
  }, [videoId, articuloClienteId]);

  if (loading) {
    return (
      <section className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="text-lg text-gray-600 mt-16">Cargando video...</div>
      </section>
    );
  }
  if (error) {
    return (
      <section className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="text-lg text-red-600 mt-16">{error}</div>
        <button onClick={() => navigate(-1)} className="mt-8 px-4 py-2 bg-primary-600 text-white rounded">Volver</button>
      </section>
    );
  }
  if (!videoData || !videoData.videoUrl) {
    return (
      <section className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="text-lg text-red-600 mt-16">No se encontró el video o falta la URL del video.</div>
        <button onClick={() => navigate(-1)} className="mt-8 px-4 py-2 bg-primary-600 text-white rounded">Volver</button>
      </section>
    );
  }

  return (
    <section className="flex flex-col items-center justify-center min-h-[80vh] bg-gradient-to-b from-slate-50 to-slate-100/50 py-8 px-4">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-8">
        {/* El título y la descripción se pasan al VideoComponent */}
        <VideoComponent
          videoUrl={videoData.videoUrl}
          title={videoData.nombre || videoData.title}
          description={videoData.descripcion || videoData.description}
          thumbnail={videoData.thumbnail}
          controls
        />
        {/* Elimina el título y descripción duplicados aquí */}
        {videoData.recursos && videoData.recursos.length > 0 && (
          <div className="mb-2">
            <h2 className="text-xl font-semibold mb-2 text-primary-700">Recursos</h2>
            <ul className="list-disc pl-6">
              {videoData.recursos.map((recurso, idx) => (
                <li key={idx} className="mb-1">
                  <a
                    href={recurso.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-600 underline hover:text-primary-800 transition-colors"
                  >
                    {recurso.nombre}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
        {/* Botón para marcar como completado */}
        {articuloClienteId && (
          <div className="flex flex-col items-center my-4">
            <button
              className={`px-4 py-2 rounded text-white transition-colors ${completado ? 'bg-green-500' : 'bg-primary-600 hover:bg-primary-700'} ${completando ? 'opacity-60 cursor-not-allowed' : ''}`}
              disabled={completado || completando}
              onClick={async () => {
                setCompletando(true);
                setMensaje("");
                try {
                  const encryptedToken = localStorage.getItem('authToken');
                  const token = useDecryptToken(encryptedToken);
                  await marcarVideoComoVisto(articuloClienteId, videoId, token);
                  setCompletado(true);
                  setMensaje("¡Video marcado como completado!");
                } catch (e) {
                  setMensaje("Error al marcar como completado");
                } finally {
                  setCompletando(false);
                }
              }}
            >
              {completado ? 'Completado' : completando ? 'Marcando...' : 'Marcar como completado'}
            </button>
            {mensaje && <div className="mt-2 text-sm text-gray-700">{mensaje}</div>}
            <button
              className="mt-4 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded transition-colors"
              onClick={() => navigate('/curso', { state: { cursoId: articuloClienteId } })}
            >
              Volver a los videos del curso
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default VideoCurso;