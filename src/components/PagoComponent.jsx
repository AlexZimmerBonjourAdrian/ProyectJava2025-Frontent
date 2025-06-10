import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import pagoService from '../services/pagoService';
import { Toast } from 'primereact/toast';
import '../styles/global.css';
import './PagoComponent.css';

const PagoComponent = () => {
    const [pagoInfo, setPagoInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const location = useLocation();
    const navigate = useNavigate();
    const toast = React.useRef(null);

    useEffect(() => {
        const procesarPago = async () => {
            try {
                // Obtener orderId de la URL
                const params = new URLSearchParams(location.search);
                const orderId = params.get('token');

                if (!orderId) {
                    throw new Error('No se encontró el ID de la orden');
                }

                // 1. Verificar estado del pago con PayPal
                const estado = await pagoService.capturarEstadoPagoPayPal(orderId);
                
                if (estado === 'COMPLETED') {
                    // 2. Registrar el pago en nuestro sistema
                    await pagoService.registrarPago({
                        paymentId: orderId,
                        status: estado,
                        usuario: localStorage.getItem('userEmail')
                    });

                    // 3. Obtener detalles del pago
                    const pagoDetalles = await pagoService.getPagoById(orderId);
                    
                    // 4. Actualizar el estado con la información del pago
                    setPagoInfo({
                        ...pagoDetalles,
                        fecha: new Date().toLocaleDateString(),
                        estado: 'APROBADO'
                    });

                    // 5. Mostrar mensaje de éxito
                    toast.current.show({
                        severity: 'success',
                        summary: 'Pago Exitoso',
                        detail: 'Tu pago ha sido procesado correctamente',
                        life: 5000
                    });

                    // 6. Redirigir a la página de éxito después de 5 segundos
                    setTimeout(() => {
                        navigate('/payment/success', { 
                            state: { 
                                pagoInfo: pagoDetalles,
                                orderId
                            }
                        });
                    }, 5000);

                } else {
                    throw new Error('El pago no se completó correctamente');
                }
            } catch (error) {
                console.error('Error al procesar el pago:', error);
                setError(error.message);
                toast.current.show({
                    severity: 'error',
                    summary: 'Error',
                    detail: error.message || 'Error al procesar el pago',
                    life: 5000
                });
                
                // Redirigir al carrito después de 5 segundos
                setTimeout(() => {
                    navigate('/carrito');
                }, 5000);
            } finally {
                setLoading(false);
            }
        };

        procesarPago();
    }, [location, navigate]);

    if (loading) {
        return (
            <div className="pago-container">
                <div className="pago-card">
                    <div className="loading-spinner">
                        <div className="spinner"></div>
                        <p>Procesando tu pago...</p>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="pago-container">
                <div className="pago-card error">
                    <h2 className="pago-title">
                        Error en el pago <span className="pago-icon">❌</span>
                    </h2>
                    <div className="pago-divider" />
                    <p className="error-message">{error}</p>
                    <div className="pago-footer">
                        Serás redirigido al carrito en unos segundos...
                    </div>
                </div>
            </div>
        );
    }

    if (!pagoInfo) {
        return (
            <div className="pago-container">
                <div className="pago-card">
                    <h2 className="pago-title">
                        Pago en proceso <span className="pago-icon">⏳</span>
                    </h2>
                    <div className="pago-divider" />
                    <p>Verificando el estado de tu pago...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="pago-container">
            <Toast ref={toast} />
            <div className="pago-card">
                <h2 className="pago-title">
                    Pago realizado con éxito <span className="pago-icon">✔️</span>
                </h2>
                <div className="pago-divider" />
                {pagoInfo.articulos.map((art, idx) => (
                    <div key={idx} className="pago-item">
                        <div className="pago-item-title">
                            {art.nombre}
                        </div>
                        <div className="pago-item-details">
                            <div>Autor: {art.autor}</div>
                            <div>Fecha: {pagoInfo.fecha}</div>
                        </div>
                        <div className="pago-item-amount">
                            Monto: $ {art.precio.toFixed(2)}
                        </div>
                    </div>
                ))}
                <div className="pago-divider" />
                <div className="pago-total">
                    Total: $ {pagoInfo.total.toFixed(2)}
                </div>
                <div className="pago-footer">
                    Se ha enviado un correo con la facturación de su compra.
                    Serás redirigido en unos segundos...
                </div>
            </div>
        </div>
    );
};

export default PagoComponent;
