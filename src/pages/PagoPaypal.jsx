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
        const token = useDecryptToken(localStorage.getItem('authToken'));
        const orden = params.get("token");
        const API_URL = import.meta.env.VITE_API_URL;

        if (token && orden) {
            fetch(`${API_URL}/api/paypal/capturar?orderId=${orden}`, {
                method: "POST",
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            })
            .then(res => {
                if (!res.ok) throw new Error("Falló la captura");
                return res.text();
            })
            .then(data => {
                console.log("Pago capturado:", data);
                setEstadoPago("completado");

                // Redirige al carrito después de 3 segundos
                setTimeout(() => {
                    navigate("/Carrito");
                }, 3000);
            })
            .catch(err => {
                console.error("Error al capturar orden:", err);
                setEstadoPago("error");
            });
        } else {
            setEstadoPago("error");
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
