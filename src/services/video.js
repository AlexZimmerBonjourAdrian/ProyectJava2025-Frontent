import api from './api';

// Obtener todos los videos (requiere token de admin)
export const getAllVideos = async (token) => {
  const response = await api.get('/api/videos', {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  return response.data;
};

// Obtener un video por ID (requiere token de admin)
export const getVideoById = async (id, token) => {
  const response = await api.get(`/api/videos/${id}`, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  return response.data;
};

// Obtener detalles de YouTube de un video por ID (requiere token de admin)
export const getYoutubeVideoDetails = async (id, token) => {
  const response = await api.get(`/api/videos/${id}/youtube`, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  return response.data;
};

// Obtener solo info básica de YouTube de un video por ID (requiere token de admin)
export const getYoutubeVideoInfo = async (id, token) => {
  const response = await api.get(`/api/videos/${id}/youtube/info`, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  return response.data;
};
