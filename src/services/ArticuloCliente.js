import api from './api';

// Obtener los cursos del usuario autenticado (DTO)
export const getMisCursosUsuario = async(token) => {
    const response = await api.get('/api/articulos_cliente/usuario/mis-cursos', {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
    return response.data;
};

// Obtener un ArticuloCliente del usuario por id (DTO)
export const getArticuloClienteUsuario = async(id, token) => {
    const response = await api.get(`/api/articulos_cliente/usuario/${id}`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
    return response.data;
};

// Obtener todos los ArticuloCliente (solo admin/User)
export const getAllArticulosCliente = async(token) => {
    const response = await api.get('/api/articulos_cliente', {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
    return response.data;
};

// Obtener un ArticuloCliente por id (solo admin/User)
export const getArticuloCliente = async(id, token) => {
    const response = await api.get(`/api/articulos_cliente/${id}`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
    return response.data;
};

// Crear un ArticuloCliente usando el DTO esencial (usuario)
export const crearArticuloClienteDesdeDTO = async(dto, token) => {
    const response = await api.post('/api/articulos_cliente/usuario', dto, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
    return response.data;
};

// Completar un ArticuloCliente (usuario/admin)
export const completarArticuloCliente = async(id, token) => {
    const response = await api.put(`/api/articulos_cliente/completar/${id}`, {}, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
    return response.data;
};

// Reiniciar un ArticuloCliente (usuario/admin)
export const reiniciarArticuloCliente = async(id, token) => {
    const response = await api.put(`/api/articulos_cliente/reiniciar/${id}`, {}, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
    return response.data;
};

// Marcar un video como visto
export const marcarVideoComoVisto = async(articuloClienteId, videoId, token) => {
    const response = await api.put(`/api/articulos_cliente/${articuloClienteId}/marcar-visto/${videoId}`, {}, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
    return response.data;
};

// Crear un ArticuloCliente (admin)
export const createArticuloCliente = async(articuloCliente, token) => {
    const response = await api.post('/api/articulos_cliente', articuloCliente, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
    return response.data;
};

// Actualizar un ArticuloCliente (admin)
export const updateArticuloCliente = async(id, articuloCliente, token) => {
    const response = await api.put(`/api/articulos_cliente/${id}`, articuloCliente, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
    return response.data;
};

// Eliminar un ArticuloCliente (admin)
export const deleteArticuloCliente = async(id, token) => {
    const response = await api.delete(`/api/articulos_cliente/${id}`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
    return response.data;
};