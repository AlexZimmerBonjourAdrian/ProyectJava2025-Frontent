import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

export default function PagoPaypal(){
    const { user } = useAuth();

    // React (ejemplo simplificado)
    useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    const API_URL = import.meta.env.VITE_API_URL;

    if (token) {
        fetch(`${API_URL}/api/paypal/capturar?orderId=${token}`, {
            method: "POST",
            credentials: 'include'
        })
        .then(res => res.text())
        .then(console.log);
    }
    }, []);
    return (<p>Redirigiendo a PayPal...</p>)
}