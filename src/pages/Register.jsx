/**
import { useDecryptToken } from "../App";

const token = decryptToken(localStorage.getItem('authToken'));

fetch(`${API_URL}/profile`, {
    method: 'GET',
    headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
    }
})
 */

import React, { useState, useRef } from 'react';
import { useDecryptToken } from "../App";
import { useNavigate } from 'react-router-dom';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Messages } from 'primereact/messages';
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
    const msgs = useRef(null);
    
    
    const handleFieldChange = (fieldName, value) => {
        setFormData(prev => ({
            ...prev,
            [fieldName]: value
        }));
    };
    
    const handleRegister = async (e) => {
        e.preventDefault();
        if (!formData.nombre || !formData.apellido || !formData.email || !formData.password || !formData.confirmPassword) {
            msgs.current.clear();
            msgs.current.show([
                { sticky: true, severity: 'error', summary: 'Error', detail: 'Rellene todos los campos' },
            ]);
            return;
        }
        if (formData.password !== formData.confirmPassword) {
            msgs.current.clear();
            msgs.current.show([
                { sticky: true, severity: 'error', summary: 'Error', detail: 'Las contraseñas deben coincidir' },
            ]);
            return;
        }
        
        setLoading(true);
        try {
            const token = useDecryptToken(localStorage.getItem('authToken'));
            const API_URL = import.meta.env.VITE_API_URL;
            fetch(`${API_URL}/api/usuarios`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            })
            .then(res => {
                if (res.ok) {
                    msgs.current.clear();
                    msgs.current.show([
                        { sticky: true, severity: 'success', summary: 'Éxito', detail: 'usuario creado exitosamente' },
                    ]);
                    setFormData({
                        nombre: '',
                        apellido: '',
                        email: '',
                        password: '',
                        confirmPassword: ''
                    })
                    navigate('/');
                }else{
                    msgs.current.clear();
                    msgs.current.show([
                        { sticky: true, severity: 'error', summary: 'Error', detail: 'Error al crear el curso' },
                    ]);
                }
            })
        } catch (error) {
            msgs.current.clear();
            msgs.current.show([
                { sticky: true, severity: 'error', summary: 'Error', detail: 'Error al crear el curso' },
            ]);
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
            <div  style={{position: 'fixed', top: '2rem', zIndex: 1000, textAlign: 'center', width: '100%'}}>
                    <Messages ref={msgs} style={{width: '70%'}}/>
            </div>
            <header style={styles.header} />              
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
