import React from "react";

const cursos = [
  {
    nombre: "Gestión de las Emociones",
    img: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=facearea&w=400&q=80"
  },
  {
    nombre: "Mejora de la Concentración",
    img: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=facearea&w=400&q=80"
  },
  {
    nombre: "Mejora de la Salud Mental",
    img: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=facearea&w=400&q=80"
  },
  {
    nombre: "Aumento de la Autoconciencia",
    img: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=facearea&w=400&q=80"
  },
  {
    nombre: "Reducción de la Rumia Mental",
    img: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=facearea&w=400&q=80"
  },
  {
    nombre: "Mejora de las Relaciones Interpersonales",
    img: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=facearea&w=400&q=80"
  },
  {
    nombre: "Mayor Resiliencia",
    img: "https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=facearea&w=400&q=80"
  },
  {
    nombre: "Desarrollo de la Paciencia",
    img: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=facearea&w=400&q=80"
  }
];

const cardClass = "bg-[#e8eef2] border-2 border-gold rounded-md shadow-md flex flex-col items-center justify-center p-2 min-h-[140px]";

const CursosIncluidos = () => (
  <section className="w-full flex flex-col items-center justify-center mt-8">
    {/* Fondo rosa y grilla de cursos */}
    <div className="w-full bg-[#F29AAE] py-8 px-2 relative">
      {/* Esquinas decorativas */}
      <div className="absolute top-0 left-0 w-8 h-8 border-t-8 border-l-8 border-white rounded-tl-lg"></div>
      <div className="absolute top-0 right-0 w-8 h-8 border-t-8 border-r-8 border-white rounded-tr-lg"></div>
      <div className="absolute bottom-0 left-0 w-8 h-8 border-b-8 border-l-8 border-white rounded-bl-lg"></div>
      <div className="absolute bottom-0 right-0 w-8 h-8 border-b-8 border-r-8 border-white rounded-br-lg"></div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
        {cursos.map((curso, idx) => (
          <div key={idx} className={cardClass}>
            <img src={curso.img} alt={curso.nombre} className="w-full h-24 object-cover rounded mb-2 border-b border-gold" />
            <span className="text-center text-base font-semibold text-gray-800">{curso.nombre}</span>
          </div>
        ))}
      </div>
    </div>
    {/* Franja inferior */}
    <div className="w-full bg-[#e8eef2] flex items-center justify-center py-8 px-2 border-t border-gold">
      <div className="flex items-center gap-4 max-w-5xl w-full">
        {/* Ícono medalla */}
        <div className="flex flex-col items-center mr-4">
          <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="28" cy="28" r="26" stroke="#CCA43B" strokeWidth="3" fill="white" />
            <path d="M18 38L28 32L38 38" stroke="#222" strokeWidth="2" fill="none" />
            <circle cx="28" cy="25" r="7" stroke="#222" strokeWidth="2" fill="none" />
            <path d="M25 24.5h2.5v-2.5h2v2.5H32v2h-2.5v2.5h-2v-2.5H25v-2z" fill="#222" />
          </svg>
          <span className="text-xs text-gray-500 mt-1">Matric. te lo confirma</span>
        </div>
        <div className="flex-1 text-center">
          <span className="text-2xl md:text-3xl font-serif font-bold text-black">Cursos valorados en <span className="text-gold">$10.000</span></span>
        </div>
      </div>
    </div>
  </section>
);

export default CursosIncluidos; 