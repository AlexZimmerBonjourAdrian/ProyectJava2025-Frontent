/**
Para despues de iniciar sesión, se puede usar el token almacenado en localStorage para hacer peticiones a la API.

const token = decryptToken(localStorage.getItem('authToken'));

fetch('http://localhost:8080/profile', {
    method: 'GET',
    headers: {
        'Authorization': `Bearer ${token}`, // 👈 acá va el token
        'Content-Type': 'application/json'
    }
})
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';

const Register = () => {
    const [formData, setFormData] = useState({
        nombre: '',
        apellido: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleFieldChange = (fieldName, value) => {
        setFormData(prev => ({
            ...prev,
            [fieldName]: value
        }));
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        if (!formData.nombre || !formData.apellido || !formData.email || !formData.password || !formData.confirmPassword) {
            return;
        }
        if (formData.password !== formData.confirmPassword) {
            return;
        }
        
        setLoading(true);
        try {
            console.log('Register attempt:', formData);
            await new Promise(resolve => setTimeout(resolve, 1000));
            navigate('/login');
        } catch (error) {
            console.error('Error en el registro:', error);
        } finally {
            setLoading(false);
        }
    };

    const styles = {
        mainContainer: {
            minHeight: '100vh',
            backgroundColor: '#F5F7FA',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        },
        header: {
            width: '100%',
            padding: '1rem 2rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
        },
        logo: {
            color: '#D4AF37',
            fontSize: '1.8rem',
            fontWeight: 'bold',
            fontStyle: 'italic',
            textDecoration: 'none'
        },
        homeIcon: {
            color: '#D4AF37',
            fontSize: '1.5rem',
            cursor: 'pointer'
        },
        formContainer: {
            width: '90%',
            maxWidth: '450px',
            margin: '2rem auto',
            backgroundColor: '#FFFFFF',
            borderRadius: '20px',
            border: '2px solid #D4AF37',
            padding: '2rem',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
        },
        title: {
            color: '#333333',
            textAlign: 'center',
            fontSize: '1.8rem',
            fontWeight: 'bold',
            marginBottom: '2rem'
        },
        formRow: {
            display: 'flex',
            gap: '1rem',
            marginBottom: '1rem'
        },
        inputGroup: {
            flex: 1,
            marginBottom: '1rem'
        },
        label: {
            display: 'block',
            marginBottom: '0.5rem',
            color: '#333333',
            fontSize: '0.9rem'
        },
        input: {
            width: '100%',
            padding: '0.75rem',
            borderRadius: '8px',
            border: '1px solid #D4AF37',
            backgroundColor: '#FFFFFF'
        },
        registerButton: {
            width: '100%',
            padding: '0.75rem',
            backgroundColor: '#D4AF37',
            border: 'none',
            borderRadius: '8px',
            color: '#FFFFFF',
            fontWeight: 'bold',
            cursor: 'pointer',
            fontSize: '1rem',
            marginTop: '1rem'
        },
        loginLink: {
            textAlign: 'center',
            marginTop: '1rem',
            fontSize: '0.9rem'
        },
        loginLinkText: {
            color: '#D4AF37',
            textDecoration: 'none',
            cursor: 'pointer'
        },
        footer: {
            textAlign: 'center',
            padding: '1rem',
            marginTop: 'auto',
            width: '100%'
        }
    };

    return (
        <div style={styles.mainContainer}>
            <header style={styles.header}>
              
            </header>

            <div style={styles.formContainer}>
                <h1 style={styles.title}>CREAR CUENTA</h1>
                <form onSubmit={handleRegister}>
                    <div style={styles.formRow}>
                        <div style={styles.inputGroup}>
                            <label htmlFor="nombre" style={styles.label}>Nombre</label>
                            <InputText
                                id="nombre"
                                value={formData.nombre}
                                onChange={(e) => handleFieldChange('nombre', e.target.value)}
                                className="w-full"
                                style={styles.input}
                                required
                            />
                        </div>
                        <div style={styles.inputGroup}>
                            <label htmlFor="apellido" style={styles.label}>Apellido</label>
                            <InputText
                                id="apellido"
                                value={formData.apellido}
                                onChange={(e) => handleFieldChange('apellido', e.target.value)}
                                className="w-full"
                                style={styles.input}
                                required
                            />
                        </div>
                    </div>

                    <div style={styles.inputGroup}>
                        <label htmlFor="email" style={styles.label}>Email</label>
                        <InputText
                            id="email"
                            value={formData.email}
                            onChange={(e) => handleFieldChange('email', e.target.value)}
                            className="w-full"
                            style={styles.input}
                            required
                        />
                    </div>

                    <div style={styles.formRow}>
                        <div style={styles.inputGroup}>
                            <label htmlFor="password" style={styles.label}>Contraseña</label>
                            <Password
                                id="password"
                                value={formData.password}
                                onChange={(e) => handleFieldChange('password', e.target.value)}
                                toggleMask
                                feedback={false}
                                className="w-full"
                                inputClassName="w-full"
                                style={styles.input}
                                required
                            />
                        </div>
                        <div style={styles.inputGroup}>
                            <label htmlFor="confirmPassword" style={styles.label}>Repetir Contraseña</label>
                            <Password
                                id="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={(e) => handleFieldChange('confirmPassword', e.target.value)}
                                toggleMask
                                feedback={false}
                                className="w-full"
                                inputClassName="w-full"
                                style={styles.input}
                                required
                            />
                        </div>
                    </div>

                    <Button
                        type="submit"
                        label="REGISTRARSE"
                        loading={loading}
                        style={styles.registerButton}
                    />

                    <div style={styles.loginLink}>
                        <span>¿Ya tienes una cuenta? </span>
                        <span 
                            onClick={() => navigate('/login')}
                            style={styles.loginLinkText}
                        >
                            Iniciar sesión
                        </span>
                    </div>
                </form>
            </div>

            <footer style={styles.footer}>
                <p style={{ margin: 0, color: '#666666' }}>© Solariana 2025</p>
            </footer>
        </div>
    );
};

export default Register;
