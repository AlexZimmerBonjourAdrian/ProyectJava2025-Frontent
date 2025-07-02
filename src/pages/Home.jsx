import React from "react";
import { Link } from 'react-router-dom';
import VideoComponent from "../components/VideoComponent";
import './Home.css';
import { useAuth } from '../context/AuthContext';
import CursosIncluidos from '../components/HomeSections/CursosIncluidos';
import BeneficiosCoaching from '../components/HomeSections/BeneficiosCoaching';
import Testimonios from '../components/HomeSections/Testimonios';
import PreguntasFrecuentes from '../components/HomeSections/PreguntasFrecuentes';
import Bienvenida from '../components/HomeSections/Bienvenida';
import Footer from '../components/Footer';

const Home = () => {
    const { isLoggedIn, isAdmin, logout } = useAuth();
    
    return (
        <div>

        {/* Botones Mis Cursos y Carrito para admin en la esquina superior derecha */}
        {isAdmin && (
          <div style={{position: 'fixed', top: '24px', right: '40px', zIndex: 200}} className="flex gap-4 items-center">
            <Link to="/MisCursos" className="mis-cursos-link">
              <section className='container mis-cursos-container'>
                Mis Cursos
                <i className="pi pi-book"></i>
              </section>
            </Link>
            <Link to="/Carrito">
              <i className="pi pi-shopping-cart" style={{fontSize: '2rem'}}></i>
            </Link>
          </div>
        )}

        <main className="main min-h-screen bg-gray-50 flex items-center justify-right py-12 px-6 sm:px-8 lg:px-12">
            <div className="rectangle-container top-0 left-0">
                <div className="rect sm"></div>
                <div className="rect bg"></div>
            </div>

            <div className="nav-home">
                {isLoggedIn && (
                            <>
                              <Link to="/MisCursos" className="mis-cursos-link">
                                <section className='container mis-cursos-container'>
                                  Mis Cursos
                                  <i className="pi pi-book"></i>
                                </section>
                              </Link>
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
                    {isAdmin && (<>
                    <section className="admin-listado">

                        <Link to="/productos"> 
                            <button className="boton-dorado p-button-primary text-md px-6 py-3">
                                LISTADO DE PAQUETES 
                            </button>
                        </Link>
                    </section>
                    <section className="admin-section">
                        <h3 className="playfair-display">PAQUETES</h3>
                        <h3 className="playfair-display">CURSOS</h3>
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
                    </>)}
            </div>
        </main>
        <section className="services-section flex flex-col items-center justify-center mt-8">
            <h2 className="text-2xl mb-4 playfair-display">
                SESIONES PERSONALES<br /> CON UNA GENIO DEL COACHING
            </h2>
            <div className="compra-section">
                <Link to="session11">
                    <button className="boton-dorado p-button-primary text-md px-6 py-3">
                        ¡AGENDATE AHORA!
                    </button>
                </Link>
                <p className="playfair-display">POR ÚNICAMENTE <span className="price">$145</span></p>
            </div>

            <div className="rectangle-container">
                <div className="rect w-md"></div>
                <div className="rect w-lg"></div>
                <div className="rect w-sm"></div>
            </div>
        </section>

        <section className="video-section flex flex-col items-center justify-center mt-8">
            <VideoComponent videoUrl="https://www.youtube.com/watch?v=Wx-fWmQkwOA" />
        </section>

        {/* Renderizar para todos los usuarios */}
        <CursosIncluidos />
        <BeneficiosCoaching />
        <Bienvenida />
        <Testimonios />
        <PreguntasFrecuentes />
        <Footer />

        </div>
    )
}

export default Home;