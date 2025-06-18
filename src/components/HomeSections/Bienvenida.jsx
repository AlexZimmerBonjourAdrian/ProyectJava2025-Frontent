import React from "react";

const Bienvenida = () => (
  <section className="w-full flex flex-col md:flex-row items-center justify-center bg-[#e8eef2] py-8 px-4 md:px-12 rounded-xl my-8">
    <div className="flex flex-col md:flex-row items-center w-full max-w-4xl">
      <div className="flex-shrink-0 flex items-center justify-center w-full md:w-auto mb-4 md:mb-0 md:mr-8">
        {/* Carita sonriente estilo ícono grande */}
        <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="45" stroke="#222" strokeWidth="5" fill="white" />
          <circle cx="35" cy="43" r="6" fill="#222" />
          <circle cx="65" cy="43" r="6" fill="#222" />
          <path d="M35 65 Q50 80 65 65" stroke="#222" strokeWidth="5" fill="none" strokeLinecap="round" />
        </svg>
      </div>
      <div className="flex-1">
        <h2 className="text-3xl md:text-4xl font-bold mb-1" style={{ color: '#F29AAE', fontFamily: 'Playfair Display, serif' }}>Sol Fuentes:</h2>
        <h3 className="text-xl md:text-2xl font-bold mb-4" style={{ color: '#222' }}>DESBLOQUEA TU POTENCIAL, ALCANZA NUEVAS ALTURAS</h3>
        <p className="text-lg md:text-xl text-gray-800 font-normal leading-relaxed">
          "Te doy la bienvenida a este espacio de crecimiento y transformación personal. A través del coaching, exploraremos juntos tus objetivos, desbloquearemos tu potencial y construiremos el camino hacia tus sueños."
        </p>
      </div>
    </div>
  </section>
);

export default Bienvenida; 