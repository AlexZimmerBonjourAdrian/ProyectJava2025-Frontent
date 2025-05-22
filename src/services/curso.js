import api from './api';

export const getCursoById = async (id, token) => {
  try {
    const response = await api.get(`/api/curso/${id}`, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAllCursos = async (token) => {
  try {
    const response = await api.get('/api/curso', {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};




