import React from "react";

const beneficios = [
  "Reducción del Estrés",
  "Gestión de las Emociones",
  "Mejora de la Concentración",
  "Mejora de la Salud Mental",
  "Aumento de la Autoconciencia",
  "Reducción de la Rumia Mental",
  "Mejora de las Relaciones Interpersonales",
  "Mayor Resiliencia",
  "Desarrollo de la Paciencia",
  "Capacidad para tomar mejores decisiones",
  "Aumento de la adaptabilidad",
  "Mejora tu autoestima para desarrollar confianza"
];

const imagenes = [
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=facearea&w=100&q=80",
  "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=facearea&w=100&q=80",
  "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=facearea&w=100&q=80"
];

const BeneficiosCoaching = () => (
  <section className="beneficios-coaching-section flex flex-col items-center justify-center mt-8 w-full">
    <h2 className="text-3xl mb-4 playfair-display text-gold text-center font-bold uppercase tracking-wide">CAMINANDO JUNTAS A UNA MEJOR TU</h2>
    <div className="flex flex-col md:flex-row items-center justify-center w-full max-w-5xl">
      {/* Imagen decorativa a la izquierda */}
      <div className="flex flex-col gap-2 items-center mr-4">
        {imagenes.map((src, idx) => (
          <img key={idx} src={src} alt="coaching" className="rounded-md w-20 h-20 object-cover mb-2" />
        ))}
      </div>
      {/* Lista de beneficios */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-1">
        <ul className="list-none pl-0">
          {beneficios.slice(0, 6).map((b, idx) => (
            <li key={idx} className="flex items-start mb-1 text-black text-base font-normal">
              <span className="text-[#F29AAE] font-bold mr-2">&#9656;</span>
              {b}
            </li>
          ))}
        </ul>
        <ul className="list-none pl-0">
          {beneficios.slice(6).map((b, idx) => (
            <li key={idx} className="flex items-start mb-1 text-black text-base font-normal">
              <span className="text-[#F29AAE] font-bold mr-2">&#9656;</span>
              {b}
            </li>
          ))}
        </ul>
      </div>
    </div>
  </section>
);

export default BeneficiosCoaching; 