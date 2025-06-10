import axios from 'axios';

const API_URL =
    import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

class PagoService {
    constructor() {
        this.api = axios.create({
            baseURL: API_URL,
            headers: {
                'Content-Type': 'application/json'
            }
        });

        // Interceptor para agregar el token de autenticación
        this.api.interceptors.request.use(
            (config) => {
                const token = localStorage.getItem('token');
                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                }
                return config;
            },
            (error) => {
                return Promise.reject(error);
            }
        );
    }

    // Obtener todos los pagos (solo admin)
    async getAllPagos() {
        try {
            const response = await this.api.get('/pagos');
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    // Obtener pago por ID (solo admin)
    async getPagoById(id) {
        try {
            const response = await this.api.get(`/pagos/${id}`);
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    // Crear nuevo pago (solo admin)
    async createPago(pagoData) {
        try {
            const response = await this.api.post('/pagos', pagoData);
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    // Actualizar pago (solo admin)
    async updatePago(id, pagoData) {
        try {
            const response = await this.api.put(`/pagos/${id}`, pagoData);
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    // Obtener pagos por email de usuario (solo admin)
    async getPagosByUsuarioEmail(usuarioEmail) {
        try {
            const response = await this.api.get(`/pagos/usuario/${usuarioEmail}`);
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    // Eliminar pago (solo admin)
    async deletePago(id) {
        try {
            await this.api.delete(`/pagos/${id}`);
            return true;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    // Capturar estado de pago PayPal (usuario autenticado)
    async capturarEstadoPagoPayPal(orderId) {
        try {
            const response = await this.api.post(`/pagos/paypal/${orderId}/capture`);
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    // Registrar pago (usuario autenticado)
    async registrarPago(pagoData) {
        try {
            const response = await this.api.post('/pagos/captura', {
                paymentId: pagoData.paymentId,
                status: pagoData.status,
                usuario: pagoData.usuario
            });
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    // Manejo de errores
    handleError(error) {
        if (error.response) {
            // El servidor respondió con un código de estado fuera del rango 2xx
            const message = error.response.data || 'Error en el servidor';
            throw new Error(message);
        } else if (error.request) {
            // La petición fue hecha pero no se recibió respuesta
            throw new Error('No se recibió respuesta del servidor');
        } else {
            // Algo sucedió al configurar la petición
            throw new Error('Error al configurar la petición');
        }
    }
}

export default new PagoService();