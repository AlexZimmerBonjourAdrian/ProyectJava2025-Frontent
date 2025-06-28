/**
Para despues de iniciar sesión, se puede usar el token almacenado en localStorage para hacer peticiones a la API.

const token = decryptToken(localStorage.getItem('authToken'));
const API_URL = import.meta.env.VITE_API_URL;

fetch(`${API_URL}/api/profile`, {
    method: 'GET',
    headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
    }
})
 */

import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { encryptToken } from '../App';
import { use } from 'react';
import { useAuth } from '../context/AuthContext';

const API_URL = import.meta.env.VITE_API_URL;

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";
    const { login } = useAuth();

    const handleFieldChange = (fieldName, value) => {
        setFormData(prev => ({
            ...prev,
            [fieldName]: value
        }));
    };

    useEffect(() => {
        localStorage.removeItem('authToken');
        console.log('logged out');
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();
        if (!formData.email || !formData.password) {
            return;
        }
        setLoading(true);
        try {
            fetch(
                `${API_URL}/api/seguridad/login`, 
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                })
            .then(response => response.json())
            .then(data => {
                if (data.nombre) {
                    const token = data.token;
                    login(data.token);
                    navigate(from, { replace: true });
                }
            })
            .catch(error => {
                console.error('Error en la solicitud:', error);
            });
        } catch (error) {
            console.error('Error en la solicitud:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-content-center align-items-center min-h-screen bg-gray-100">
            <Card className="border-gold" style={{ borderRadius: '20px', maxWidth: '400px', width: '100%', margin: 'auto' }}>
                <div className="text-center mb-4">
                    <h1 className="text-2xl font-bold text-gold mb-4">INICIAR SESIÓN</h1>
                </div>
                <form onSubmit={handleLogin} className="p-fluid">
                    <div className="field mb-3">
                        <label htmlFor="email" className="block mb-2 text-gold">Email</label>
                        <InputText
                            id="email"
                            value={formData.email}
                            onChange={(e) => handleFieldChange('email', e.target.value)}
                            className="w-full p-inputtext-custom"
                            required
                        />
                    </div>
                    <div className="field mb-3">
                        <label htmlFor="password" className="block mb-2 text-gold">Contraseña</label>
                        <Password
                            id="password"
                            value={formData.password}
                            onChange={(e) => handleFieldChange('password', e.target.value)}
                            toggleMask
                            feedback={false}
                            className="w-full"
                            inputClassName="p-inputtext-custom"
                            required
                        />
                    </div>
                    <Button
                        type="submit"
                        label="Login"
                        loading={loading}
                        className="boton-dorado p-button-rounded mt-3 text-lg"
                        style={{ width: '100%' }}
                    />
                    <div className="text-center mt-4">
                        <span>¿No tienes una cuenta? </span>
                        <a 
                            href="#" 
                            onClick={(e) => {
                                e.preventDefault();
                                navigate('/register');
                            }}
                            className="text-gold font-medium"
                        >
                            Registrarse
                        </a>
                    </div>
                </form>
            </Card>
        </div>
    );
};

export default Login;
