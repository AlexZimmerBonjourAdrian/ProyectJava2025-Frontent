import React from "react";
import { Link } from 'react-router-dom';
import VideoComponent from "../components/VideoComponent";
import './Home.css';
import { useAuth } from '../context/AuthContext';

const Home = () => {
    const { isLoggedIn, isAdmin, logout } = useAuth();
    
    return (
        <div>

        <main className="main min-h-screen bg-gray-50 flex items-center justify-right py-12 px-6 sm:px-8 lg:px-12">
            <div className='container'>
                <div className='nav'>
                      
                    {isLoggedIn && (
                        <>
                            <Link to="/Carrito">
                                <i className="pi pi-shopping-cart"></i>
                            </Link>
                            <Link to="/login" onClick={logout}>
                                <section className='container log-out'>
                                    Cerrar Sesion
                                    <i className="pi pi-sign-out"></i>
                                </section>
                            </Link>
                        </>
                    )}
            
                    {!isLoggedIn && (
                        <>
                            <Link to="/login">Iniciar Sesión</Link>
                            <Link to="/register">Registrarse</Link>
                        </>
                    )}
                </div>
            </div>
            
            <div className="rectangle-container top-0 left-0">
                <div className="rect sm"></div>
                <div className="rect bg"></div>
            </div>
            
            <div className="w-full max-w-[1800px] mx-auto flex flex-col items-center justify-center text-center">
                <h1 className="heading playfair-display text-center">
                    SOL FUENTES
                </h1>
                <p className="sub-title lato-light text-lg sm:text-xl lg:text-2xl text-gray-600 mb-8 text-center max-w-2xl mx-auto">
                    Coaching que cambia la vida
                </p>
                    {!isAdmin && (
                        <Link to="/productos"> 
                            <button className="boton-dorado p-button-primary text-md px-6 py-3">
                                YA QUIERO EMPEZAR!
                            </button>
                        </Link>
                    )}
                    {isAdmin && (
                    <section className="admin-section">
                        <h3 className="playfair-display">PAQUETES</h3>
                        <h3 className="playfair-display">CURSOS</h3>
                        <Link to="/productos"> 
                            <button className="boton-dorado p-button-primary text-md px-6 py-3">
                                LISTADO DE PAQUETES 
                            </button>
                        </Link>
                        <Link to="/productos">
                            <button className="boton-dorado p-button-primary text-md px-6 py-3">
                                LISTADO DE CURSOS
                            </button>
                        </Link>
                        <Link to="/AgregarPaquete">
                            <button className="boton-dorado p-button-primary text-md px-6 py-3">
                                NUEVO PAQUETE
                            </button>
                        </Link>
                        <Link to="/AgregarCurso">
                            <button className="boton-dorado p-button-primary text-md px-6 py-3">
                                NUEVO CURSO
                            </button>
                        </Link>
                        <Link to="/ModificarPaquete">
                            <button className="boton-dorado p-button-primary text-md px-6 py-3">
                                MODIFICAR PAQUETE
                            </button>
                        </Link>
                        <Link to="/ModificarCurso">
                            <button className="boton-dorado p-button-primary text-md px-6 py-3">
                                MODIFICAR CURSO
                            </button>
                        </Link>
                    </section>
                    )}
            </div>
        </main>


        <section className="video-section flex flex-col items-center justify-center mt-8">
            <VideoComponent className="video"/>
        </section>


        <section className="services-section flex flex-col items-center justify-center mt-8">
            <h2 className="text-2xl mb-4 playfair-display">
                SESIONES PERSONALES<br /> CON UNA GENIO DEL COACHING
            </h2>
            <div className="compra-section">
                <button className="boton-dorado p-button-primary text-md px-6 py-3">
                    ¡AGENDATE AHORA!
                </button>
                <p className="playfair-display">POR ÚNICAMENTE <span className="price">$145</span></p>
            </div>

            <div className="rectangle-container">
                <div className="rect w-md"></div>
                <div className="rect w-lg"></div>
                <div className="rect w-sm"></div>
            </div>
        </section>
        </div>
    )
}

export default Home;