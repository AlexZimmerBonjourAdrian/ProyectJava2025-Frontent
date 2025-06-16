import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useDecryptToken } from "../App";
import { useNavigate } from 'react-router-dom';

export default function PagoPaypal() {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [estadoPago, setEstadoPago] = useState("procesando"); // "procesando", "completado", "error"

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const paymentId = params.get("payment_id");
        const API_URL = import.meta.env.VITE_API_URL;

        if (paymentId) {
            fetch(`${API_URL}/api/compras/by-payment-id/${paymentId}`)
                .then(res => res.json())
                .then(compra => {
                    navigate("/resumen", { state: { compra } });
                });
        }
    }, []);

    return (
        <div style={{ textAlign: "center", marginTop: "2rem" }}>
            {estadoPago === "procesando" && <p>🔄 Procesando pago, por favor espere...</p>}
            {estadoPago === "completado" && <p>✅ ¡Pago realizado con éxito! Redirigiendo al carrito...</p>}
            {estadoPago === "error" && <p>❌ Hubo un problema al procesar el pago. Intenta nuevamente.</p>}
        </div>
    );
}
