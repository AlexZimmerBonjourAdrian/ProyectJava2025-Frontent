import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useDecryptToken } from "../App";
import { useNavigate } from 'react-router-dom';
import { Toast } from 'primereact/toast';
import './Pago.css';

export default function PagoPaypal() {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [estadoPago, setEstadoPago] = useState("procesando"); // "procesando", "completado", "error"
    const toast = React.useRef(null);
    const [pagoInfo, setPagoInfo] = useState(null);
    const [error, setError] = useState(null);


    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const paymentId = params.get("payment_id");
        const API_URL = import.meta.env.VITE_API_URL;

        if (paymentId) {
            fetch(`${API_URL}/api/compras/by-payment-id/${paymentId}`)
                .then(res => {
                    if (!res.ok) {
                        throw new Error("No se encontró la compra.");
                    }
                    return res.json();
                })
                .then(compra => {
                    setEstadoPago("completado");
                    setPagoInfo(compra); // Este estado no está definido todavía, lo vemos abajo.
                    // navigate("/resumen", { state: { compra } }); ← si vas a mostrar el resumen aquí, no navegues.
                })
                .catch(err => {
                    setEstadoPago("error");
                    setError(err.message);
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
