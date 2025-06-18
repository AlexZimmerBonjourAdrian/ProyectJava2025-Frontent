import React, { useState } from "react";

const preguntas = [
  {
    pregunta: "¿Cuáles son las formas de pago?",
    respuesta: "Aceptamos tarjetas de crédito, débito y transferencias bancarias."
  },
  {
    pregunta: "¿Cuándo puedo acceder a los cursos?",
    respuesta: "Puedes acceder a los cursos inmediatamente después de la compra."
  },
  {
    pregunta: "¿Necesito conocimiento previos para los cursos?",
    respuesta: "No, los cursos están diseñados para todos los niveles."
  },
  {
    pregunta: "¿Tendré sesiones con el Coucher?",
    respuesta: "Sí, tendrás acceso a sesiones personalizadas según el paquete elegido."
  }
];

const PreguntasFrecuentes = () => {
  const [abierta, setAbierta] = useState(null);

  return (
    <section className="preguntas-frecuentes-section flex flex-col items-center justify-center mt-8 mb-8 w-full">
      <h2 className="text-xl md:text-2xl mb-4 font-bold text-center" style={{ color: '#222', fontFamily: 'serif' }}>
        ¿Tienes dudas? Respondemos a las mas comunes.
      </h2>
      <div className="w-full max-w-2xl bg-white rounded-xl divide-y divide-gray-200 shadow-sm">
        {preguntas.map((p, idx) => (
          <div key={idx} className="py-2 px-2 md:px-4 cursor-pointer select-none transition-colors">
            <div
              className="flex items-center gap-2"
              onClick={() => setAbierta(abierta === idx ? null : idx)}
            >
              <span className="text-gold font-bold text-xl w-6 flex items-center justify-center">
                {abierta === idx ? <span>-</span> : <span>+</span>}
              </span>
              <span className="text-gold font-medium text-base md:text-lg">
                {p.pregunta}
              </span>
            </div>
            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${abierta === idx ? 'max-h-40 mt-2' : 'max-h-0'} pl-8`}
              style={{ color: '#444', fontSize: '1rem' }}
            >
              {abierta === idx && (
                <div>{p.respuesta}</div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PreguntasFrecuentes; 