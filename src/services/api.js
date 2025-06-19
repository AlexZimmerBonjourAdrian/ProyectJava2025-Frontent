import axios from 'axios';

const API_URL =
    import.meta.env.VITE_API_URL || 'http://localhost:8080';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptor para manejar errores
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            // El servidor respondió con un código de estado fuera del rango 2xx
            if (error.response.status === 403) {
                console.error('Error de permisos:', error.response.data);
            } else if (error.response.status === 401) {
                console.error('Error de autenticación:', error.response.data);
                // Limpiar el token si está expirado o es inválido
                localStorage.removeItem('authToken');
            }
        } else if (error.request) {
            // La petición fue hecha pero no se recibió respuesta
            console.error('No se recibió respuesta del servidor:', error.request);
        } else {
            // Algo sucedió en la configuración de la petición
            console.error('Error en la configuración de la petición:', error.message);
        }
        return Promise.reject(error);
    }
);

export const getData = async() => {
    try {
        const response = await api.get('/api/data');
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};

export const postData = async(data) => {
    try {
        const response = await api.post('/api/data', data);
        return response.data;
    } catch (error) {
        console.error('Error posting data:', error);
        throw error;
    }
};

export default api;