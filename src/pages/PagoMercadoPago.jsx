import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useDecryptToken } from "../App";
import { useNavigate } from 'react-router-dom';
import { Toast } from 'primereact/toast';
import './Pago.css';

export default function PagoPaypal() {
    const { user } = useAuth();
    const token = useDecryptToken(localStorage.getItem('authToken'));
    const navigate = useNavigate();
    const [estadoPago, setEstadoPago] = useState("procesando"); // "procesando", "completado", "error"
    const toast = React.useRef(null);
    const [pagoInfo, setPagoInfo] = useState(null);
    const [error, setError] = useState(null);


    useEffect(() => {
        const query = new URLSearchParams(location.search);
        const paymentId = query.get("payment_id");
        const API_URL = import.meta.env.VITE_API_URL;
        
        if (paymentId) {
            fetch(`${API_URL}/api/mercado-pago/confirmar/${paymentId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            })
            .then(res => res.json())
            .then(data => {setPagoInfo(data)
                setEstadoPago("completado")
            })
            .catch(err => {
                console.error("Error obteniendo resumen:", err)
                setError(err.message)
                setEstadoPago("error")
                setTimeout(() => navigate("/carrito"), 4000);
            });
        }
    }, []);



    return (
        <div style={{ textAlign: "center", marginTop: "2rem" }}>
            {estadoPago === "procesando" && 
                <div className="pago-container">
                    <div className="pago-card">
                        <div className="loading-spinner">
                            <div className="spinner"></div>
                            <p>Procesando tu pago...</p>
                            <p>Ya casi es tuyo</p>
                        </div>
                    </div>
                </div>
            }

            {estadoPago === "completado" && 
                <div className="pago-container">
                    <Toast ref={toast} />
                    <div className="pago-card">
                        <h2 className="pago-title">
                            Pago realizado con éxito <span className="pago-icon">✔️</span>
                        </h2>
                        <div className="pago-divider" />
                        {pagoInfo.items.map((art, idx) => (
                            <div key={idx} className="pago-item">
                                <div className="pago-item-title">
                                    {art.nombre}
                                </div>
                                <div className="pago-item-details">
                                    <div>Descripción: {art.descripcion}</div>
                                    <div>vencimiento: {pagoInfo.vencimiento}</div>
                                </div>
                                <div className="pago-item-amount">
                                    Monto: $ {art.precio.toFixed(2)}
                                </div>
                            </div>
                        ))}
                        <div className="pago-divider" />
                        <div className="pago-total">
                            Total: ${pagoInfo.items.reduce((acc, art) => acc + art.precio, 0).toFixed(2)}
                        </div>
                        <div className="pago-footer">
                            Este comprobante no tiene nignuna valildez legal, su uso es únicamnete de referencia.
                        </div>
                    </div>
                </div>
            }

            {estadoPago === "error" && 
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
            }
        </div>
    );
}
