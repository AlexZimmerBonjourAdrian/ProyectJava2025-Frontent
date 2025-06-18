import React, { useState } from "react";
import { Card } from 'primereact/card';

const testimonios = [
  {
    nombre: "María González",
    texto: "Gracias a Sol, aprendí a gestionar mis emociones y ahora enfrento los desafíos diarios con mucha más confianza. ¡Recomiendo sus cursos a todos!"
  },
  {
    nombre: "Lucía Fernández",
    texto: "Las sesiones de coaching me ayudaron a mejorar mi concentración y a reducir el estrés. Siento que soy una mejor versión de mí misma."
  },
  {
    nombre: "Carla Ramírez",
    texto: "Nunca pensé que el coaching pudiera tener tanto impacto en mi vida. Ahora tengo herramientas para tomar mejores decisiones y ser más resiliente."
  },
  {
    nombre: "Sofía Martínez",
    texto: "El acompañamiento de Sol fue clave para aumentar mi autoestima y adaptarme a los cambios. ¡Una experiencia transformadora!"
  },
  {
    nombre: "Ana López",
    texto: "Me sentí muy acompañada en todo el proceso. Las herramientas que aprendí me sirven día a día."
  },
  {
    nombre: "Valeria Torres",
    texto: "Sol es una coach increíble, me ayudó a ver mi potencial y a confiar más en mí misma."
  }
];

const testimoniosPorPagina = 4;

const Testimonios = () => {
  const [pagina, setPagina] = useState(0);
  const totalPaginas = Math.ceil(testimonios.length / testimoniosPorPagina);
  const testimoniosAMostrar = testimonios.slice(pagina * testimoniosPorPagina, (pagina + 1) * testimoniosPorPagina);

  return (
    <section className="testimonios-section flex flex-col items-center justify-center mt-8 w-full">
      <h2 className="text-3xl mb-2 playfair-display font-bold text-[#F29AAE] text-center uppercase">TESTIMONIOS</h2>
      <p className="text-lg text-center font-serif font-medium mb-6 text-black">Los alumnos de la Couch Sol Fuentes te cuentan cómo han transformado sus vidas a nivel personal.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-6xl mb-4">
        {testimoniosAMostrar.map((t, idx) => (
          <Card key={idx} className="bg-[#FDE6EB] rounded-md p-4 flex flex-col items-start justify-start min-h-[260px] border-none shadow-none">
            <h3 className="font-bold mb-2 text-[#F29AAE] text-lg border-b border-[#F29AAE] w-full pb-1">{t.nombre}</h3>
            <p className="text-sm text-gray-700 font-normal mt-2">{t.texto}</p>
          </Card>
        ))}
      </div>
      {/* Paginación tipo carrusel */}
      <div className="flex items-center justify-center gap-2 mt-2">
        {Array.from({ length: totalPaginas }).map((_, i) => (
          <button
            key={i}
            className={`w-3 h-3 rounded-full ${i === pagina ? 'bg-[#F29AAE]' : 'bg-gray-300'} transition-all`}
            onClick={() => setPagina(i)}
            aria-label={`Ir a página ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default Testimonios; 