import api from './api';

// Crear un paquete (POST, solo admin)
export const createPaquete = async (reqPaquete, token) => {
  const response = await api.post('/api/paquete', reqPaquete, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  return response.data;
};

// Obtener todos los paquetes (admin/user)
export const getAllPaquetes = async (token) => {
  const response = await api.get('/api/paquete', {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  return response.data;
};

// Obtener un paquete por id (admin/user)
export const getPaqueteById = async (id, token) => {
  const response = await api.get(`/api/paquete/${id}`, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  return response.data;
};

// Obtener los cursos de un paquete (admin/user)
export const getCursosDelPaquete = async (id, token) => {
  const response = await api.get(`/api/paquete/${id}/cursos`, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  return response.data;
};

// Actualizar un paquete (PUT, solo admin)
export const updatePaquete = async (id, reqPaquete, token) => {
  const response = await api.put(`/api/paquete/${id}`, reqPaquete, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  return response.data;
};

// Actualizar cursos de un paquete (PUT, solo admin)
export const updateVideosCurso = async (id, cursoId, token) => {
  const response = await api.put(`/api/paquete/${id}/cursos/${cursoId}`, {}, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  return response.data;
};

// Eliminar un paquete (DELETE, solo admin)
export const deletePaquete = async (id, token) => {
  const response = await api.delete(`/api/paquete/${id}`, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  return response.status === 200;
};
