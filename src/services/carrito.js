import api from './api';

const carritoService = {
    // Crear un carrito nuevo
    crearCarrito: async(request, token) => {
        try {
            console.log('Creando nuevo carrito:', request);
            const response = await api.post('/api/carrito', request, {
                headers: token ? { Authorization: `Bearer ${token}` } : {},
            });
            console.log('Carrito creado exitosamente:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error al crear carrito:', error);
            throw error;
        }
    },

    // Actualizar un carrito existente
    actualizarCarrito: async(id, request, token) => {
        try {
            console.log(`Actualizando carrito ${id}:`, request);
            const response = await api.put(`/api/carrito/${id}`, request, {
                headers: token ? { Authorization: `Bearer ${token}` } : {},
            });
            console.log('Carrito actualizado exitosamente:', response.data);
            return response.data;
        } catch (error) {
            console.error(`Error al actualizar carrito ${id}:`, error);
            throw error;
        }
    },

    // Eliminar un carrito
    eliminarCarrito: async(id, token) => {
        try {
            console.log(`Eliminando carrito ${id}`);
            const response = await api.delete(`/api/carrito/${id}`, {
                headers: token ? { Authorization: `Bearer ${token}` } : {},
            });
            console.log(`Carrito ${id} eliminado exitosamente`);
            return response.status === 200;
        } catch (error) {
            console.error(`Error al eliminar carrito ${id}:`, error);
            throw error;
        }
    },

    // Agregar un artículo al carrito
    agregarArticulo: async(carritoId, articuloId, token) => {
        try {
            console.log(`Agregando artículo ${articuloId} al carrito ${carritoId}`);
            const response = await api.post(`/api/carrito/${carritoId}/items/${articuloId}`, {}, {
                headers: token ? { Authorization: `Bearer ${token}` } : {},
            });
            console.log('Artículo agregado exitosamente:', response.data);
            return response.data;
        } catch (error) {
            console.error(`Error al agregar artículo ${articuloId} al carrito ${carritoId}:`, error);
            throw error;
        }
    },

    // Quitar un artículo del carrito
    quitarArticulo: async(carritoId, articuloId, token) => {
        try {
            console.log(`Quitando artículo ${articuloId} del carrito ${carritoId}`);
            const response = await api.delete(`/api/carrito/${carritoId}/items/${articuloId}`, {
                headers: token ? { Authorization: `Bearer ${token}` } : {},
            });
            console.log('Artículo quitado exitosamente:', response.data);
            return response.data;
        } catch (error) {
            console.error(`Error al quitar artículo ${articuloId} del carrito ${carritoId}:`, error);
            throw error;
        }
    },

    // Cerrar un carrito
    cerrarCarrito: async(id, token) => {
        try {
            console.log(`Cerrando carrito ${id}`);
            const response = await api.put(`/api/carrito/${id}/cerrar`, {}, {
                headers: token ? { Authorization: `Bearer ${token}` } : {},
            });
            console.log('Carrito cerrado exitosamente:', response.data);
            return response.data;
        } catch (error) {
            console.error(`Error al cerrar carrito ${id}:`, error);
            throw error;
        }
    },

    // Obtener el carrito del usuario logueado
    obtenerCarritoUsuario: async(token) => {
        try {
            console.log('Obteniendo carrito del usuario logueado');
            const response = await api.get('/api/carrito/me', {
                headers: token ? { Authorization: `Bearer ${token}` } : {},
            });
            console.log('Carrito del usuario obtenido exitosamente:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error al obtener carrito del usuario:', error);
            throw error;
        }
    },

    // Obtener un carrito por ID
    obtenerCarrito: async(id, token) => {
        try {
            console.log(`Obteniendo carrito ${id}`);
            const response = await api.get(`/api/carrito/${id}`, {
                headers: token ? { Authorization: `Bearer ${token}` } : {},
            });
            console.log('Carrito obtenido exitosamente:', response.data);
            return response.data;
        } catch (error) {
            console.error(`Error al obtener carrito ${id}:`, error);
            throw error;
        }
    },

    // Obtener el total del carrito
    obtenerTotalCarrito: async(id, token) => {
        try {
            console.log(`Obteniendo total del carrito ${id}`);
            const response = await api.get(`/api/carrito/${id}/total`, {
                headers: token ? { Authorization: `Bearer ${token}` } : {},
            });
            console.log(`Total del carrito ${id}:`, response.data);
            return response.data;
        } catch (error) {
            console.error(`Error al obtener total del carrito ${id}:`, error);
            throw error;
        }
    }
};

export { carritoService };
export default carritoService;