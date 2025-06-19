import api from './api';

export const getCursoById = async(id, token) => {
    try {
        // Check if id is valid
        if (!id) {
            console.error('ID de curso no válido:', id);
            throw new Error('ID de curso no válido');
        }

        // Try to get the course
        const response = await api.get(`/api/curso/${id}`, {
            headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
        return response.data;
    } catch (error) {
        // Log the error with more details
        console.error(`Error al obtener el curso con ID ${id}:`, error.response ? error.response.status : 'No response', error.response ? error.response.data : 'No data');

        // If it's a 404 error, we can try an alternative endpoint
        if (error.response && error.response.status === 404) {
            try {
                // Try an alternative endpoint if the main one fails
                const alternativeResponse = await api.get(`/api/articulo/${id}`, {
                    headers: token ? { Authorization: `Bearer ${token}` } : {},
                });
                return alternativeResponse.data;
            } catch (altError) {
                console.error(`Error al intentar endpoint alternativo para ID ${id}:`, altError);
                throw error; // Throw the original error if the alternative also fails
            }
        }

        throw error;
    }
};

export const getAllCursos = async(token) => {
    try {
        const response = await api.get('/api/curso', {
            headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};