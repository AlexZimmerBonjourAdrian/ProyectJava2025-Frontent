import React from "react";
import VideoComponent from "../components/VideoComponent";
import './Index.css';

const Index = () => {
    return (
        <div>

        <main className="main min-h-screen bg-gray-50 flex items-center justify-right py-12 px-6 sm:px-8 lg:px-12">
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
                <button className="compra-button p-button-primary text-md px-6 py-3">
                    YA QUIERO EMPEZAR!
                </button>
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
                <button className="compra-button p-button-primary text-md px-6 py-3">
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

export default Index;