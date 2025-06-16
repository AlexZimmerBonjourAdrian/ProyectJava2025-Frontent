import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function PagoMercadoPago() {
    const [estadoPago, setEstadoPago] = useState("procesando");
    const navigate = useNavigate();

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const paymentId = params.get("payment_id");
        const collectionStatus = params.get("collection_status");
        const API_URL = import.meta.env.VITE_API_URL;

        if (paymentId && collectionStatus === "approved") {
            fetch(`${API_URL}/api/mercado-pago/confirmar?payment_id=${paymentId}`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            .then(res => {
                if (!res.ok) throw new Error("Fallo al confirmar pago");
                return res.text();
            })
            .then(data => {
                console.log("Pago MP confirmado:", data);
                setEstadoPago("completado");
                setTimeout(() => navigate("/Carrito"), 3000);
            })
            .catch(err => {
                console.error("Error:", err);
                setEstadoPago("error");
            });
        } else {
            setEstadoPago("error");
        }
    }, []);

    return (
        <div style={{ textAlign: "center", marginTop: "2rem" }}>
            {estadoPago === "procesando" && <p>🔄 Confirmando pago, por favor espere...</p>}
            {estadoPago === "completado" && <p>✅ ¡Pago realizado con éxito! Redirigiendo al carrito...</p>}
            {estadoPago === "error" && <p>❌ Hubo un error con el pago. Verifica o intenta nuevamente.</p>}
        </div>
    );
}
