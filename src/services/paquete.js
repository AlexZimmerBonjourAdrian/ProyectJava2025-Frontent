import api from './api';

// Crear un paquete (POST, solo admin)
export const createPaquete = async (reqPaquete, token) => {
  const response = await api.post('/api/paquetes', reqPaquete, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  return response.data;
};

// Obtener todos los paquetes (admin/user)
export const getAllPaquetes = async (token) => {
  try {
    const response = await api.get('http://localhost:8080/api/paquetes', {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 403) {
      throw new Error('No tienes permisos para ver los paquetes.');
    }
    if (error.response && error.response.status === 404) {
      return [];
    }
    throw error;
  }
};

// Obtener un paquete por id (admin/user)
export const getPaqueteById = async (id, token) => {
  try {
    const response = await api.get(`/api/paquete/${id}`, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 403) {
      throw new Error('No tienes permisos para ver este paquete.');
    }
    if (error.response && error.response.status === 404) {
      return null;
    }
    throw error;
  }
};

// Obtener los cursos de un paquete (admin/user)
export const getCursosDelPaquete = async (id, token) => {
  try {
    const response = await api.get(`/api/paquetes/${id}/cursos`, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 403) {
      throw new Error('No tienes permisos para ver los cursos de este paquete.');
    }
    if (error.response && error.response.status === 404) {
      return [];
    }
    throw error;
  }
};

// Actualizar un paquete (PUT, solo admin)
export const updatePaquete = async (id, reqPaquete, token) => {
  const response = await api.put(`/api/paquetes/${id}`, reqPaquete, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  return response.data;
};

// Actualizar cursos de un paquete (PUT, solo admin)
export const updateVideosCurso = async (id, cursoId, token) => {
  const response = await api.put(`/api/paquetes/${id}/cursos/${cursoId}`, {}, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  return response.data;
};

// Eliminar un paquete (DELETE, solo admin)
export const deletePaquete = async (id, token) => {
  const response = await api.delete(`/api/paquetes/${id}`, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  return response.status === 200;
};
