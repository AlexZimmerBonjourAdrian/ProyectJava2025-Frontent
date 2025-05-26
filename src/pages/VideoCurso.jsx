import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getVideoById } from '../services/video';
import { useDecryptToken } from '../App';
import VideoComponent from '../components/VideoComponent';

const VideoCurso = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const videoId = location.state?.videoId;
  const [videoData, setVideoData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
  }, [videoId]);

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
        <h1 className="text-3xl font-bold mb-4 text-center text-primary-700 playfair-display">{videoData.title}</h1>
        <VideoComponent
          videoUrl={videoData.videoUrl}
          title={videoData.title}
          description={videoData.description}
          thumbnail={videoData.thumbnail}
          controls
        />
        <p className="text-lg text-gray-700 mb-6 text-center">{videoData.description}</p>
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
      </div>
    </section>
  );
};

export default VideoCurso;