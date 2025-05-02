import React from 'react';
import '../styles/global.css';

const PagoComponent = ({
  articulos = [
    {
      paquete: 'Meditacion para todos.',
      cursos: [
        {
          nombre: 'Introduccion a la meditacion',
          autora: 'Sol',
          fecha: '25-05-2025',
        },
        {
          nombre: 'Meditacion avanzada',
          autora: 'Sol',
          fecha: '25-05-2025',
        }
      ],
      monto: 10.00
    }
  ]
}) => {
  // Calcular el total
  const total = articulos.reduce((acc, art) => acc + (art.monto || 0), 0);

  return (
    <div className="pago-container">
      <div className="pago-card">
        <h2 className="pago-title">
          Pago realizado con exito <span className="pago-icon">✔️</span>
        </h2>
        <div className="pago-divider" />
        {articulos.map((art, idx) => (
          <div key={idx} className="pago-item">
            {art.paquete && (
              <div className="pago-item-title">
                Paquete: {art.paquete}
              </div>
            )}
            <div className="pago-item-courses">
              {art.cursos.map((curso, cidx) => (
                <div key={cidx} className="pago-item-course">
                  <div className="pago-item-course-title">Curso: {curso.nombre}</div>
                  <div className="pago-item-course-author">Autora: <span className="pago-item-course-author-span">{curso.autora}</span></div>
                  <div className="pago-item-course-date">Fecha Pago: <span className="pago-item-course-date-span">{curso.fecha}</span></div>
                </div>
              ))}
            </div>
            <div className="pago-item-amount">
              Monto:$ {art.monto.toFixed(2)}
            </div>
          </div>
        ))}
        <div className="pago-divider" />
        <div className="pago-footer">
          Se ha enviado un correo con la facturación de su compra, ¡Muchas gracias y disfrute su compra!
        </div>
      </div>
    </div>
  );
};

export default PagoComponent;
